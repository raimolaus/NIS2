import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Get specific risk
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // Get risk
    const risk = await prisma.risk.findUnique({
      where: { id },
    });

    if (!risk) {
      return NextResponse.json(
        { error: 'Riski ei leitud' },
        { status: 404 }
      );
    }

    // Check if risk belongs to user's organization
    if (risk.organizationId !== user.organization.id) {
      return NextResponse.json(
        { error: 'Juurdepääs keelatud' },
        { status: 403 }
      );
    }

    return NextResponse.json({ risk }, { status: 200 });
  } catch (error) {
    console.error('Risk GET error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// PATCH - Update risk
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

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

    // Get risk
    const risk = await prisma.risk.findUnique({
      where: { id },
    });

    if (!risk) {
      return NextResponse.json(
        { error: 'Riski ei leitud' },
        { status: 404 }
      );
    }

    // Check if risk belongs to user's organization
    if (risk.organizationId !== user.organization.id) {
      return NextResponse.json(
        { error: 'Juurdepääs keelatud' },
        { status: 403 }
      );
    }

    // Calculate new risk level if likelihood or impact changed
    const likelihood = body.likelihood ?? risk.likelihood;
    const impact = body.impact ?? risk.impact;
    const riskLevel = likelihood * impact;

    // Update risk
    const updatedRisk = await prisma.risk.update({
      where: { id },
      data: {
        ...body,
        riskLevel,
        // If status changed to mitigated, set mitigatedAt
        ...(body.status === 'mitigated' && !risk.mitigatedAt && {
          mitigatedAt: new Date(),
        }),
        // If dueDate provided, convert to Date
        ...(body.dueDate && {
          dueDate: new Date(body.dueDate),
        }),
      },
    });

    return NextResponse.json({ risk: updatedRisk }, { status: 200 });
  } catch (error) {
    console.error('Risk PATCH error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// DELETE - Delete risk
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // Get risk
    const risk = await prisma.risk.findUnique({
      where: { id },
    });

    if (!risk) {
      return NextResponse.json(
        { error: 'Riski ei leitud' },
        { status: 404 }
      );
    }

    // Check if risk belongs to user's organization
    if (risk.organizationId !== user.organization.id) {
      return NextResponse.json(
        { error: 'Juurdepääs keelatud' },
        { status: 403 }
      );
    }

    // Delete risk
    await prisma.risk.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Risk kustutatud' }, { status: 200 });
  } catch (error) {
    console.error('Risk DELETE error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}
