import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

// Validation schema
const organizationSchema = z.object({
  sector: z.string().min(1, 'Valdkond on kohustuslik'),
  subsector: z.string().optional(),
  employeeCount: z.string().min(1, 'Töötajate arv on kohustuslik'),
  revenue: z.string().min(1, 'Käive on kohustuslik'),
  itSystems: z.array(z.string()).min(1, 'Vali vähemalt üks IT süsteem'),
  securityProcedures: z.string().min(1, 'Turvaprotseduurid on kohustuslikud'),
  hasSecurityOfficer: z.string().min(1, 'Infoturbe vastutaja väli on kohustuslik'),
  processesPersonalData: z.string().min(1, 'Isikuandmete töötlemise väli on kohustuslik'),
});

// NIS2 applicability logic
function determineNIS2Applicability(data: {
  sector: string;
  employeeCount: string;
  revenue: string;
}): { applicable: boolean; category: string | null } {
  const isLarge =
    data.employeeCount === '51-250' ||
    data.employeeCount === '251+' ||
    data.revenue === '>10M';

  // Essential sectors (always applicable)
  const essentialSectors = ['healthcare', 'energy', 'transport', 'finance', 'water', 'digital_infrastructure'];

  if (essentialSectors.includes(data.sector)) {
    return { applicable: true, category: isLarge ? 'essential' : 'important' };
  }

  // Important sectors (applicable if large)
  const importantSectors = ['government', 'it_services', 'manufacturing', 'logistics'];

  if (importantSectors.includes(data.sector) && isLarge) {
    return { applicable: true, category: 'important' };
  }

  // Default: not applicable
  return { applicable: false, category: null };
}

export async function POST(req: NextRequest) {
  try {
    // TEMPORARY: Auth disabled for testing
    // const session = await auth();
    // if (!session?.user?.email) {
    //   return NextResponse.json({ error: 'Pole autoriseeritud' }, { status: 401 });
    // }

    // Mock session for testing
    const session = {
      user: {
        email: 'test@test.ee',
        name: 'Test User',
      },
    };

    const body = await req.json();

    // Validate input
    const validatedFields = organizationSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: validatedFields.error.errors[0].message },
        { status: 400 }
      );
    }

    const data = validatedFields.data;

    // Get or create user (for testing)
    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { organization: true },
    });

    if (!user) {
      // Create test user if not exists
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name,
        },
        include: { organization: true },
      });
    }

    // Determine NIS2 applicability
    const nis2 = determineNIS2Applicability({
      sector: data.sector,
      employeeCount: data.employeeCount,
      revenue: data.revenue,
    });

    // Calculate trial end date (30 days from now)
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 30);

    // Create or update organization
    const organization = user.organization
      ? await prisma.organization.update({
          where: { id: user.organization.id },
          data: {
            name: user.name || 'Organisatsioon',
            sector: data.sector,
            subsector: data.subsector || null,
            employeeCount: data.employeeCount,
            revenue: data.revenue,
            itSystems: data.itSystems,
            securityProcedures: data.securityProcedures,
            hasSecurityOfficer: data.hasSecurityOfficer,
            processesPersonalData: data.processesPersonalData,
            nis2Applicable: nis2.applicable,
            nis2Category: nis2.category,
            profileConfirmed: true,
          },
        })
      : await prisma.organization.create({
          data: {
            userId: user.id,
            name: user.name || 'Organisatsioon',
            sector: data.sector,
            subsector: data.subsector || null,
            employeeCount: data.employeeCount,
            revenue: data.revenue,
            itSystems: data.itSystems,
            securityProcedures: data.securityProcedures,
            hasSecurityOfficer: data.hasSecurityOfficer,
            processesPersonalData: data.processesPersonalData,
            nis2Applicable: nis2.applicable,
            nis2Category: nis2.category,
            plan: 'free',
            trialEndsAt,
            profileConfirmed: true,
          },
        });

    return NextResponse.json(
      {
        message: 'Organisatsiooni profiil salvestatud',
        organization: {
          id: organization.id,
          name: organization.name,
          nis2Applicable: organization.nis2Applicable,
          nis2Category: organization.nis2Category,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Organization creation error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// GET endpoint to fetch organization
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Pole autoriseeritud' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { organization: true },
    });

    if (!user || !user.organization) {
      return NextResponse.json({ error: 'Organisatsiooni ei leitud' }, { status: 404 });
    }

    return NextResponse.json({ organization: user.organization }, { status: 200 });
  } catch (error) {
    console.error('Organization fetch error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}
