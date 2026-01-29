import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { generateTemplate } from '@/lib/documents/templates';
import { DOCUMENT_TEMPLATES } from '@/lib/documents/types';
import type { DocumentType } from '@/lib/documents/types';

export async function POST(req: NextRequest) {
  try {
    // TEMPORARY: Auth disabled for testing
    const session = {
      user: {
        email: 'test@test.ee',
      },
    };

    const { type } = await req.json();

    // Validate document type
    const template = DOCUMENT_TEMPLATES.find((t) => t.type === type);
    if (!template) {
      return NextResponse.json(
        { error: 'Vale dokumendi tüüp' },
        { status: 400 }
      );
    }

    // Get user with organization
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

    // TEMPORARY: Plan checks disabled - no payment integration yet
    // if (org.plan === 'free') {
    //   return NextResponse.json(
    //     { error: 'Dokumentide genereerimine nõuab STARTER või PROFESSIONAL paketti' },
    //     { status: 403 }
    //   );
    // }

    // if (template.plan === 'professional' && org.plan !== 'professional') {
    //   return NextResponse.json(
    //     { error: 'See dokument on saadaval ainult PROFESSIONAL paketis' },
    //     { status: 403 }
    //   );
    // }

    // Check required fields
    const missingFields = template.requiredFields.filter(
      (field) => !org[field as keyof typeof org]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Täida esmalt profiili andmed: ${missingFields.join(', ')}`,
          missingFields,
        },
        { status: 400 }
      );
    }

    // Get latest completed assessment (if exists)
    const assessment = org.assessments[0] || null;

    // Generate document content
    const content = generateTemplate(type as DocumentType, {
      org,
      assessment,
      date: new Date().toLocaleDateString('et-EE'),
      version: '1.0',
    });

    // Check if document already exists
    const existingDoc = await prisma.document.findFirst({
      where: {
        organizationId: org.id,
        type,
      },
    });

    let document;

    if (existingDoc) {
      // Update existing document
      const currentVersion = parseFloat(existingDoc.version);
      const newVersion = (currentVersion + 0.1).toFixed(1);

      document = await prisma.document.update({
        where: { id: existingDoc.id },
        data: {
          content,
          version: newVersion,
          status: 'draft',
        },
      });
    } else {
      // Create new document
      document = await prisma.document.create({
        data: {
          organizationId: org.id,
          type,
          title: template.title,
          content,
          version: '1.0',
          status: 'draft',
        },
      });
    }

    return NextResponse.json({ document }, { status: 200 });
  } catch (error) {
    console.error('Document generation error:', error);
    return NextResponse.json(
      { error: 'Dokumendi genereerimine ebaõnnestus' },
      { status: 500 }
    );
  }
}
