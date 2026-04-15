import { NextRequest, NextResponse } from 'next/server';

// GET - Get single document by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch all documents
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/documents-mock`);
    const { documents } = await response.json();

    // Find the document
    const document = documents.find((d: any) => d.id === id);

    if (!document) {
      return NextResponse.json(
        { error: 'Dokumenti ei leitud' },
        { status: 404 }
      );
    }

    return NextResponse.json({ document }, { status: 200 });
  } catch (error) {
    console.error('Document GET error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// PATCH - Update document
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Fetch all documents
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/documents-mock`);
    const { documents } = await response.json();

    // Find the document
    const docIndex = documents.findIndex((d: any) => d.id === id);

    if (docIndex === -1) {
      return NextResponse.json(
        { error: 'Dokumenti ei leitud' },
        { status: 404 }
      );
    }

    const document = documents[docIndex];

    // Update document
    const updatedDocument = {
      ...document,
      ...body,
      // Auto-set approvedAt when status changes to approved
      approvedAt: body.status === 'approved' && !document.approvedAt
        ? new Date().toISOString()
        : (body.status === 'approved' ? document.approvedAt : null),
      // Clear approvedAt if status changes from approved
      ...(body.status && body.status !== 'approved' && document.status === 'approved'
        ? { approvedAt: null, approvedBy: null }
        : {}),
      updatedAt: new Date().toISOString(),
    };

    // Note: In-memory storage will reset on server restart
    // This is just for demo purposes
    documents[docIndex] = updatedDocument;

    return NextResponse.json({ document: updatedDocument }, { status: 200 });
  } catch (error) {
    console.error('Document PATCH error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// DELETE - Delete document
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch all documents
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/documents-mock`);
    const { documents } = await response.json();

    // Find the document
    const docIndex = documents.findIndex((d: any) => d.id === id);

    if (docIndex === -1) {
      return NextResponse.json(
        { error: 'Dokumenti ei leitud' },
        { status: 404 }
      );
    }

    // Remove from array
    documents.splice(docIndex, 1);

    return NextResponse.json({ message: 'Dokument kustutatud' }, { status: 200 });
  } catch (error) {
    console.error('Document DELETE error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}
