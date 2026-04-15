import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { generateDocument } from '@/lib/document-generator';

/**
 * POST /api/documents-mock/generate
 * Generates a new document with auto-filled company data
 *
 * Body:
 * {
 *   "templateType": "policy" | "risk_assessment" | "incident_response" | etc,
 *   "title": "Document Title",
 *   "includeAssessmentData": boolean (optional)
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { templateType, title, includeAssessmentData } = body;

    // Validate required fields
    if (!templateType) {
      return NextResponse.json(
        { error: 'templateType on kohustuslik' },
        { status: 400 }
      );
    }

    // Check if company data exists
    if (!storage.company) {
      return NextResponse.json(
        {
          error: 'Ettevõtte andmed puuduvad. Palun täitke esmalt ettevõtte profiil.',
          errorCode: 'COMPANY_DATA_MISSING'
        },
        { status: 400 }
      );
    }

    // Generate document content
    const content = generateDocument({
      templateType,
      companyData: storage.company,
      assessmentData: includeAssessmentData ? storage.assessment : undefined,
    });

    // Check if document with this type already exists
    const existingDocIndex = storage.documents.findIndex((d) => d.type === templateType);

    if (existingDocIndex !== -1) {
      // Update existing document with new generated content
      const existingDoc = storage.documents[existingDocIndex];
      const newVersion = `${parseFloat(existingDoc.version) + 0.1}`.substring(0, 3);

      const updatedDocument = {
        ...existingDoc,
        title: title || existingDoc.title,
        version: newVersion,
        content,
        status: 'draft' as const,
        approvedAt: null, // Reset approval when regenerated
        approvedBy: null,
        updatedAt: new Date().toISOString(),
        companySnapshot: { ...storage.company }, // Save snapshot
      };

      storage.documents[existingDocIndex] = updatedDocument;

      return NextResponse.json({
        document: updatedDocument,
        message: 'Dokument uuendatud ettevõtte andmetega',
        action: 'updated'
      }, { status: 200 });
    } else {
      // Create new document
      const newDocument = {
        id: String(storage.documents.length + 1),
        title: title || `Generated ${templateType}`,
        type: templateType,
        version: '1.0',
        status: 'draft' as const,
        content,
        contentJson: null,
        fileUrl: null,
        approvedAt: null,
        approvedBy: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        organizationId: 'mock-org-id',
        companySnapshot: { ...storage.company }, // Save snapshot
      };

      storage.documents.push(newDocument);

      return NextResponse.json({
        document: newDocument,
        message: 'Dokument genereeritud ettevõtte andmetega',
        action: 'created'
      }, { status: 201 });
    }
  } catch (error) {
    console.error('Document generation error:', error);
    return NextResponse.json({
      error: 'Dokumendi genereerimine ebaõnnestus',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
