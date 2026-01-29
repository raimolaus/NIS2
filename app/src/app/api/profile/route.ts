import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

// Validation schema - ignore unknown fields
const updateProfileSchema = z
  .object({
    // Basic info
    name: z.string().min(1, 'Nimi on kohustuslik'),

    // Rekvisiidid
    registrationCode: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    postalCode: z.string().optional().nullable(),
    contactPhone: z.string().optional().nullable(),
    contactEmail: z.string().email('Vale email formaat').optional().nullable().or(z.literal('')),

    // Vastutavad isikud
    ceoName: z.string().optional().nullable(),
    ceoEmail: z.string().email('Vale email formaat').optional().nullable().or(z.literal('')),
    ceoPhone: z.string().optional().nullable(),

    securityOfficerName: z.string().optional().nullable(),
    securityOfficerEmail: z.string().email('Vale email formaat').optional().nullable().or(z.literal('')),
    securityOfficerPhone: z.string().optional().nullable(),

    dataProtectionOfficerName: z.string().optional().nullable(),
    dataProtectionOfficerEmail: z.string().email('Vale email formaat').optional().nullable().or(z.literal('')),
    dataProtectionOfficerPhone: z.string().optional().nullable(),

    // Organizational info
    sector: z.string(),
    subsector: z.string().optional().nullable(),
    employeeCount: z.string(),
    revenue: z.string(),
    itSystems: z.array(z.string()),
    securityProcedures: z.string().optional().nullable(),
    hasSecurityOfficer: z.string().optional().nullable(),
    processesPersonalData: z.string().optional().nullable(),
  })
  .passthrough(); // Ignore unknown fields like id, createdAt, etc.

// GET - Get organization profile
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

    return NextResponse.json({ organization: user.organization }, { status: 200 });
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// PATCH - Update organization profile
export async function PATCH(req: NextRequest) {
  try {
    // TEMPORARY: Auth disabled for testing
    const session = {
      user: {
        email: 'test@test.ee',
      },
    };

    const body = await req.json();

    // Validate input
    const validatedFields = updateProfileSchema.safeParse(body);

    if (!validatedFields.success) {
      console.error('Validation error:', validatedFields.error);
      return NextResponse.json(
        { error: validatedFields.error.errors[0].message, details: validatedFields.error.errors },
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

    // Extract only the fields we want to update (exclude id, createdAt, etc.)
    const {
      id,
      userId,
      createdAt,
      updatedAt,
      nis2Applicable,
      nis2Category,
      plan,
      stripeCustomerId,
      stripeSubscriptionId,
      trialEndsAt,
      subscriptionStatus,
      profileConfirmed,
      ...updateData
    } = validatedFields.data as any;

    // Update organization
    const updatedOrg = await prisma.organization.update({
      where: { id: user.organization.id },
      data: {
        ...updateData,
        // Convert empty strings to null for email fields
        contactEmail: updateData.contactEmail || null,
        ceoEmail: updateData.ceoEmail || null,
        securityOfficerEmail: updateData.securityOfficerEmail || null,
        dataProtectionOfficerEmail: updateData.dataProtectionOfficerEmail || null,
      },
    });

    return NextResponse.json({ organization: updatedOrg }, { status: 200 });
  } catch (error) {
    console.error('Profile PATCH error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}
