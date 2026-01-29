import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';
import { chatCompletion } from '@/lib/ai/claude';
import { getSystemPrompt } from '@/lib/ai/prompts';
import { z } from 'zod';

// Validation schema
const chatSchema = z.object({
  message: z.string().min(1, 'Sõnum on kohustuslik'),
  conversationId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // TEMPORARY: Auth disabled for testing
    // const session = await auth();
    // if (!session?.user?.email) {
    //   return NextResponse.json({ error: 'Pole autoriseeritud' }, { status: 401 });
    // }

    // Mock session for testing
    const session = {
      user: {
        email: 'test@test.ee',
        name: 'Test User',
      },
    };

    const body = await req.json();

    // Validate input
    const validatedFields = chatSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: validatedFields.error.errors[0].message },
        { status: 400 }
      );
    }

    const { message, conversationId } = validatedFields.data;

    // Get user with organization
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { organization: true },
    });

    if (!user || !user.organization) {
      return NextResponse.json(
        { error: 'Organisatsiooni ei leitud' },
        { status: 404 }
      );
    }

    // Get conversation history if conversationId provided
    let conversation;
    let previousMessages: any[] = [];

    if (conversationId) {
      conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
            take: 10, // last 10 messages
          },
        },
      });

      if (conversation) {
        previousMessages = conversation.messages;
      }
    }

    // Create system prompt with organization context
    const systemPrompt = getSystemPrompt({
      name: user.organization.name,
      sector: user.organization.sector,
      employeeCount: user.organization.employeeCount,
      nis2Applicable: user.organization.nis2Applicable,
      nis2Category: user.organization.nis2Category,
    });

    // Build messages array
    const messages = [
      ...previousMessages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user' as const, content: message },
    ];

    // Call Claude API (or use mock if API key not available)
    let response;

    if (!process.env.ANTHROPIC_API_KEY) {
      // Mock response for testing when API key is not available
      const sector = user.organization?.sector || 'tundmatu';
      const employeeCount = user.organization?.employeeCount || 'tundmatu arv';

      const mockResponses = [
        'Tere! Olen NIS2 Abimees. Aitan sind NIS2 direktiivi nouetega vastavusse joudmisel. Mis kusimusega saan sind aidata?',
        'Suureparane kusimus! NIS2 direktiiv kohaldub teie organisatsioonile, kuna tegutsete ' + sector + ' sektoris ja teil on ' + employeeCount + ' tootajat. Alustan enesehindamisega - kas olete valmis?',
        'Vaga hea! Alustame. Esimene kusimus: Kas teie organisatsioonil on maaratud infoturbe vastutaja? See on NIS2 artikli 20 noue.',
        'Sain aru. Jargmine kusimus: Kas teil on dokumenteeritud infoturbepoliitika? See on oluline, kuna NIS2 nouab selget riskijuhtimise raamistikku.',
        'Tanan vastamast! Ma analuusin teie vastuseid ja koostan ulevaate. Hetkel naen moningaid valdkondi, kus on vaja taiendusi teha.',
      ];

      const randomIndex = Math.floor(Math.random() * mockResponses.length);
      response = {
        content: mockResponses[randomIndex],
        usage: { output_tokens: 100 },
        id: 'mock-' + Date.now(),
      };
    } else {
      // Real Claude API call
      response = await chatCompletion({
        messages,
        systemPrompt,
        temperature: 0.7,
      });
    }

    // Create or get conversation
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          userId: user.id,
          title: message.slice(0, 50), // first 50 chars as title
        },
      });
    }

    // Save messages to database
    await prisma.message.createMany({
      data: [
        {
          conversationId: conversation.id,
          role: 'user',
          content: message,
        },
        {
          conversationId: conversation.id,
          role: 'assistant',
          content: response.content,
          tokens: response.usage.output_tokens,
          model: 'claude-3-5-sonnet-20241022',
        },
      ],
    });

    return NextResponse.json(
      {
        conversationId: conversation.id,
        response: response.content,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}
