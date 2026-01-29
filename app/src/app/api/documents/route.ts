import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Get all documents for organization
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

    // Get all documents for organization
    const documents = await prisma.document.findMany({
      where: { organizationId: user.organization.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ documents }, { status: 200 });
  } catch (error) {
    console.error('Documents GET error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}
