import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Get all risks for organization
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

    // Get all risks for organization
    const risks = await prisma.risk.findMany({
      where: { organizationId: user.organization.id },
      orderBy: [
        { riskLevel: 'desc' }, // Kõrgemad riskid enne
        { riskId: 'asc' },
      ],
    });

    return NextResponse.json({ risks }, { status: 200 });
  } catch (error) {
    console.error('Risks GET error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// POST - Create new risk
export async function POST(req: NextRequest) {
  try {
    // TEMPORARY: Auth disabled for testing
    const session = {
      user: {
        email: 'test@test.ee',
      },
    };

    const body = await req.json();
    const {
      riskId,
      title,
      description,
      category,
      likelihood,
      impact,
      currentMeasures,
      recommendations,
      mitigationActions,
      completedActions,
      owner,
      status,
      dueDate,
    } = body;

    // Validate required fields
    if (!riskId || !title || !category || !likelihood || !impact) {
      return NextResponse.json(
        { error: 'Kohustuslikud väljad: riskId, title, category, likelihood, impact' },
        { status: 400 }
      );
    }

    // Validate likelihood and impact (1-5)
    if (likelihood < 1 || likelihood > 5 || impact < 1 || impact > 5) {
      return NextResponse.json(
        { error: 'Tõenäosus ja mõju peavad olema vahemikus 1-5' },
        { status: 400 }
      );
    }

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

    // Check if riskId already exists
    const existingRisk = await prisma.risk.findFirst({
      where: {
        organizationId: user.organization.id,
        riskId,
      },
    });

    if (existingRisk) {
      return NextResponse.json(
        { error: 'Selle ID-ga risk on juba olemas' },
        { status: 400 }
      );
    }

    // Calculate risk level
    const riskLevel = likelihood * impact;

    // Create risk
    const risk = await prisma.risk.create({
      data: {
        organizationId: user.organization.id,
        riskId,
        title,
        description: description || '',
        category,
        likelihood,
        impact,
        riskLevel,
        currentMeasures,
        recommendations,
        mitigationActions,
        completedActions,
        owner,
        status: status || 'identified',
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    return NextResponse.json({ risk }, { status: 201 });
  } catch (error) {
    console.error('Risk POST error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}
