import { NextRequest, NextResponse } from 'next/server';

// Import the same mock storage (in real app, this would be a shared module)
// For now, we'll just access the parent route's storage through API calls

// PATCH - Update risk
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Get all risks first
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/risks-mock`);
    const { risks } = await response.json();

    // Find the risk
    const riskIndex = risks.findIndex((r: any) => r.id === id);

    if (riskIndex === -1) {
      return NextResponse.json(
        { error: 'Riski ei leitud' },
        { status: 404 }
      );
    }

    const risk = risks[riskIndex];

    // Calculate new risk level if likelihood or impact changed
    const likelihood = body.likelihood ?? risk.likelihood;
    const impact = body.impact ?? risk.impact;
    const riskLevel = likelihood * impact;

    // Update risk
    const updatedRisk = {
      ...risk,
      ...body,
      riskLevel,
      // If status changed to mitigated, set mitigatedAt
      mitigatedAt: body.status === 'mitigated' && !risk.mitigatedAt
        ? new Date().toISOString()
        : (body.status === 'mitigated' ? risk.mitigatedAt : null),
      updatedAt: new Date().toISOString(),
    };

    // Note: In-memory storage will reset on server restart
    // This is just for demo purposes
    risks[riskIndex] = updatedRisk;

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

    // Get all risks
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/risks-mock`);
    const { risks } = await response.json();

    // Find the risk
    const riskIndex = risks.findIndex((r: any) => r.id === id);

    if (riskIndex === -1) {
      return NextResponse.json(
        { error: 'Riski ei leitud' },
        { status: 404 }
      );
    }

    // Remove from array
    risks.splice(riskIndex, 1);

    return NextResponse.json({ message: 'Risk kustutatud' }, { status: 200 });
  } catch (error) {
    console.error('Risk DELETE error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}
