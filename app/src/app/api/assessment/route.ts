import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

// Validation schemas
const createAssessmentSchema = z.object({
  organizationId: z.string(),
});

const updateAssessmentSchema = z.object({
  assessmentId: z.string(),
  answers: z.record(z.string()),
  progress: z.number().min(0).max(40),
});

// GET - Get assessment for organization
export async function GET(req: NextRequest) {
  try {
    // TEMPORARY: Auth disabled for testing
    const session = {
      user: {
        email: 'test@test.ee',
      },
    };

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

    // Get latest assessment
    const assessment = await prisma.assessment.findFirst({
      where: { organizationId: user.organization.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ assessment }, { status: 200 });
  } catch (error) {
    console.error('Assessment GET error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// POST - Create new assessment
export async function POST(req: NextRequest) {
  try {
    // TEMPORARY: Auth disabled for testing
    const session = {
      user: {
        email: 'test@test.ee',
      },
    };

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

    // Create new assessment
    const assessment = await prisma.assessment.create({
      data: {
        organizationId: user.organization.id,
        status: 'in_progress',
        progress: 0,
        answers: {},
      },
    });

    return NextResponse.json({ assessment }, { status: 201 });
  } catch (error) {
    console.error('Assessment POST error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// PATCH - Update assessment (save answers)
export async function PATCH(req: NextRequest) {
  try {
    // TEMPORARY: Auth disabled for testing
    const session = {
      user: {
        email: 'test@test.ee',
      },
    };

    const body = await req.json();

    // Validate input
    const validatedFields = updateAssessmentSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: validatedFields.error.errors[0].message },
        { status: 400 }
      );
    }

    const { assessmentId, answers, progress } = validatedFields.data;

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

    // Check if assessment belongs to user's organization
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
    });

    if (!assessment || assessment.organizationId !== user.organization.id) {
      return NextResponse.json(
        { error: 'Hinnangut ei leitud' },
        { status: 404 }
      );
    }

    // Check if completed (all 40 questions answered)
    const isCompleted = progress === 40;

    // Calculate score if completed
    let score = null;
    if (isCompleted) {
      // Import score calculation
      const { calculateTotalScore } = await import('@/data/assessment-questions');
      score = calculateTotalScore(answers);
    }

    // Update assessment
    const updatedAssessment = await prisma.assessment.update({
      where: { id: assessmentId },
      data: {
        answers,
        progress,
        status: isCompleted ? 'completed' : 'in_progress',
        score: isCompleted ? score : null,
        completedAt: isCompleted ? new Date() : null,
      },
    });

    return NextResponse.json({ assessment: updatedAssessment }, { status: 200 });
  } catch (error) {
    console.error('Assessment PATCH error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}
