import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// GET - Get specific document
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

    // Get document
    const document = await prisma.document.findUnique({
      where: { id },
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Dokumenti ei leitud' },
        { status: 404 }
      );
    }

    // Check if document belongs to user's organization
    if (document.organizationId !== user.organization.id) {
      return NextResponse.json(
        { error: 'Juurdepääs keelatud' },
        { status: 403 }
      );
    }

    return NextResponse.json({ document }, { status: 200 });
  } catch (error) {
    console.error('Document GET error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// PATCH - Update document (status, content, etc.)
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

    // Get document
    const document = await prisma.document.findUnique({
      where: { id },
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Dokumenti ei leitud' },
        { status: 404 }
      );
    }

    // Check if document belongs to user's organization
    if (document.organizationId !== user.organization.id) {
      return NextResponse.json(
        { error: 'Juurdepääs keelatud' },
        { status: 403 }
      );
    }

    // Update document
    const updatedDocument = await prisma.document.update({
      where: { id },
      data: {
        ...body,
        // If approving, set approvedAt and approvedBy
        ...(body.status === 'approved' && {
          approvedAt: new Date(),
          approvedBy: user.name || user.email,
        }),
      },
    });

    return NextResponse.json({ document: updatedDocument }, { status: 200 });
  } catch (error) {
    console.error('Document PATCH error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}
