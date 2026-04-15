import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

// GET - Get all documents
export async function GET(req: NextRequest) {
  try {
    // Sort by creation date (newest first)
    const sorted = [...storage.documents].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ documents: sorted }, { status: 200 });
  } catch (error) {
    console.error('Documents GET error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// POST - Create or update document
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      type,
      version,
      status,
      content,
      contentJson,
      fileUrl,
      approvedBy,
    } = body;

    // Validate required fields
    if (!title || !type) {
      return NextResponse.json(
        { error: 'Kohustuslikud väljad: title, type' },
        { status: 400 }
      );
    }

    // Check if document with this type already exists
    const existingDocIndex = storage.documents.findIndex((d) => d.type === type);

    if (existingDocIndex !== -1) {
      // Update existing document (increment version)
      const existingDoc = storage.documents[existingDocIndex];
      const newVersion = version || `${parseFloat(existingDoc.version) + 0.1}`.substring(0, 3);

      const updatedDocument = {
        ...existingDoc,
        title: title || existingDoc.title,
        version: newVersion,
        status: status || existingDoc.status,
        content: content || existingDoc.content,
        contentJson: contentJson !== undefined ? contentJson : existingDoc.contentJson,
        fileUrl: fileUrl !== undefined ? fileUrl : existingDoc.fileUrl,
        approvedAt: status === 'approved' && !existingDoc.approvedAt
          ? new Date().toISOString()
          : (status === 'approved' ? existingDoc.approvedAt : null),
        approvedBy: status === 'approved' && approvedBy
          ? approvedBy
          : (status === 'approved' ? existingDoc.approvedBy : null),
        updatedAt: new Date().toISOString(),
      };

      storage.documents[existingDocIndex] = updatedDocument;

      return NextResponse.json({ document: updatedDocument }, { status: 200 });
    } else {
      // Create new document
      const newDocument = {
        id: String(storage.documents.length + 1),
        title,
        type,
        version: version || '1.0',
        status: status || 'draft',
        content: content || '',
        contentJson: contentJson || null,
        fileUrl: fileUrl || null,
        approvedAt: status === 'approved' ? new Date().toISOString() : null,
        approvedBy: status === 'approved' && approvedBy ? approvedBy : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        organizationId: 'mock-org-id',
      };

      storage.documents.push(newDocument);

      return NextResponse.json({ document: newDocument }, { status: 201 });
    }
  } catch (error) {
    console.error('Document POST error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}
