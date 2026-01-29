import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    // TEMPORARY: Auth disabled for testing
    const session = {
      user: {
        email: 'test@test.ee',
      },
    };

    // Get user with organization and assessment
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        organization: {
          include: {
            assessments: {
              orderBy: { createdAt: 'desc' },
              take: 1,
              where: { status: 'completed' },
            },
          },
        },
      },
    });

    if (!user || !user.organization) {
      return NextResponse.json(
        { error: 'Organisatsiooni ei leitud' },
        { status: 404 }
      );
    }

    const org = user.organization;
    const assessment = org.assessments[0] || null;

    // Check if API key exists
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY pole seadistatud. Lisa see .env.local faili.' },
        { status: 500 }
      );
    }

    // Generate risks using AI
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `Sa oled NIS2 direktiivi ekspert ja aitad organisatsioonidel tuvastada infoturberiske.

**Organisatsiooni info:**
- Nimi: ${org.name}
- Sektor: ${org.sector}
- Töötajate arv: ${org.employeeCount}
- IT süsteemid: ${org.itSystems.join(', ')}
${assessment ? `- Enesehindamise skoor: ${assessment.score}%` : ''}

**Ülesanne:**
Genereeri 3 infoturbe riski igast kategooriast (kokku 9 riski):
1. **Technical** - tehnilised riskid (nt. volitamata juurdepääs, pahavara, andmekadu)
2. **Organizational** - organisatoorsed riskid (nt. töötajate teadlikkus, dokumentatsiooni puudumine)
3. **Compliance** - vastavuse riskid (nt. NIS2 nõuded, GDPR)

**Formaat (JSON array):**
Tagasta AINULT JSON array, ilma selgitusteta:

[
  {
    "category": "technical",
    "title": "Riski nimetus",
    "description": "Lühike kirjeldus (2-3 lauset)",
    "likelihood": 3,
    "impact": 4,
    "currentMeasures": "Praegused meetmed (kui on)",
    "recommendations": "Soovitused maandamiseks (3-5 punkti)"
  },
  ...
]

**Nõuded:**
- likelihood: 1-5 (1=väga madal, 5=väga kõrge)
- impact: 1-5 (1=väga väike, 5=kriitiline)
- Arvesta organisatsiooni sektorit ja süsteeme
${assessment ? `- Arvesta enesehindamise tulemust (${assessment.score}% - ${assessment.score < 60 ? 'madal' : assessment.score < 80 ? 'keskmine' : 'kõrge'} tase)` : ''}
- Ole konkreetne ja praktiline
- Kirjuta eesti keeles

Genereeri riskid:`,
        },
      ],
    });

    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    // Parse JSON from response
    let risks;
    try {
      // Extract JSON from markdown code block if present
      const jsonMatch = responseText.match(/```json\n?([\s\S]*?)\n?```/) ||
                        responseText.match(/\[[\s\S]*\]/);
      const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : responseText;
      risks = JSON.parse(jsonText);
    } catch (error) {
      console.error('Failed to parse AI response:', responseText);
      return NextResponse.json(
        { error: 'AI vastuse parsimine ebaõnnestus' },
        { status: 500 }
      );
    }

    if (!Array.isArray(risks)) {
      return NextResponse.json(
        { error: 'AI tagastas vale formaadi' },
        { status: 500 }
      );
    }

    // Get existing risk count to generate IDs
    const existingRisks = await prisma.risk.findMany({
      where: { organizationId: org.id },
      orderBy: { riskId: 'desc' },
      take: 1,
    });

    let nextRiskNum = 1;
    if (existingRisks.length > 0) {
      const lastId = existingRisks[0].riskId;
      const match = lastId.match(/RISK-(\d+)/);
      if (match) {
        nextRiskNum = parseInt(match[1]) + 1;
      }
    }

    // Create risks in database
    const createdRisks = [];
    for (const risk of risks) {
      const riskId = `RISK-${String(nextRiskNum).padStart(2, '0')}`;
      nextRiskNum++;

      const riskLevel = risk.likelihood * risk.impact;

      const createdRisk = await prisma.risk.create({
        data: {
          organizationId: org.id,
          riskId,
          title: risk.title,
          description: risk.description || '',
          category: risk.category,
          likelihood: risk.likelihood,
          impact: risk.impact,
          riskLevel,
          currentMeasures: risk.currentMeasures || null,
          recommendations: risk.recommendations || null,
          owner: null,
          status: 'identified',
        },
      });

      createdRisks.push(createdRisk);
    }

    return NextResponse.json(
      {
        message: `${createdRisks.length} riski genereeritud`,
        risks: createdRisks,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Risk generation error:', error);

    if (error.status === 401) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY on vale või puudub' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Riskide genereerimine ebaõnnestus: ' + (error.message || 'Tundmatu viga') },
      { status: 500 }
    );
  }
}
