import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

// Helper function to map employee count number to range string
function getEmployeeCountRange(count: number): string {
  if (count <= 10) return '1-10';
  if (count <= 50) return '11-50';
  if (count <= 250) return '51-250';
  if (count <= 500) return '251-500';
  return '500+';
}

// GET - Get dashboard data
export async function GET(req: NextRequest) {
  try {
    // Build organization object from company data or defaults
    const organization = {
      id: storage.dashboard.organization.id,
      name: storage.company?.name || storage.dashboard.organization.name,
      sector: storage.company?.industry || storage.dashboard.organization.sector,
      employeeCount: storage.company?.employeeCount
        ? getEmployeeCountRange(storage.company.employeeCount)
        : storage.dashboard.organization.employeeCount,
      revenue: storage.dashboard.organization.revenue,
      nis2Applicable: storage.dashboard.organization.nis2Applicable,
      nis2Category: storage.company?.nis2Category || storage.dashboard.organization.nis2Category,
      createdAt: storage.dashboard.organization.createdAt,
    };

    // Calculate action items stats
    const actionItems = storage.dashboard.actionItems;
    const actionItemsStats = {
      total: actionItems.length,
      completed: actionItems.filter((item: any) => item.status === 'completed').length,
      pending: actionItems.filter((item: any) => item.status === 'pending').length,
      critical: actionItems.filter((item: any) => item.priority === 'critical').length,
    };

    // Calculate KPIs
    const assessment = storage.assessment;

    // Calculate documents stats from storage.documents
    const documents = {
      total: storage.documents.length,
      approved: storage.documents.filter(d => d.status === 'approved').length,
      draft: storage.documents.filter(d => d.status === 'draft').length,
      archived: storage.documents.filter(d => d.status === 'archived').length,
    };

    const risks = storage.dashboard.risks;

    // Overall compliance score (weighted average)
    const assessmentWeight = 0.4;
    const documentsWeight = 0.3;
    const risksWeight = 0.3;

    const assessmentScore = (assessment.progress / assessment.total) * 100;
    const documentsScore = documents.total > 0 ? (documents.approved / documents.total) * 100 : 0;
    const risksScore = risks.total > 0 ? (risks.mitigated / risks.total) * 100 : 0;

    const overallComplianceScore = Math.round(
      assessmentScore * assessmentWeight +
      documentsScore * documentsWeight +
      risksScore * risksWeight
    );

    // Risk maturity level
    const risksMitigatedPercentage = risks.total > 0 ? (risks.mitigated / risks.total) * 100 : 0;
    let riskMaturityLevel = 'Algne';
    if (risksMitigatedPercentage >= 80) riskMaturityLevel = 'Optimeeritud';
    else if (risksMitigatedPercentage >= 60) riskMaturityLevel = 'Küps';
    else if (risksMitigatedPercentage >= 40) riskMaturityLevel = 'Arenev';
    else if (risksMitigatedPercentage >= 20) riskMaturityLevel = 'Põhine';

    // Documentation completeness
    const requiredDocuments = 6; // Total templates
    const documentationCompleteness = Math.round((documents.total / requiredDocuments) * 100);

    // Critical risks status
    const criticalRisksOpen = risks.critical;
    const criticalRisksStatus = criticalRisksOpen === 0 ? 'Lahendatud' : `${criticalRisksOpen} avatud`;

    // Compliance deadline (NIS2 deadline: October 17, 2024)
    const deadline = new Date('2024-10-17');
    const today = new Date();
    const daysUntilDeadline = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const deadlineStatus = daysUntilDeadline < 0 ? 'Möödunud' : daysUntilDeadline < 30 ? 'Kriitiline' : daysUntilDeadline < 90 ? 'Läheneb' : 'OK';

    const kpis = {
      overallComplianceScore,
      riskMaturityLevel,
      risksMitigatedPercentage: Math.round(risksMitigatedPercentage),
      documentationCompleteness,
      criticalRisksOpen,
      criticalRisksStatus,
      daysUntilDeadline,
      deadlineStatus,
      assessmentCompletionPercentage: Math.round((assessment.progress / assessment.total) * 100),
      documentsApprovedPercentage: documents.total > 0 ? Math.round((documents.approved / documents.total) * 100) : 0,
    };

    return NextResponse.json(
      {
        dashboard: {
          ...storage.dashboard,
          organization,
          assessment,
          documents,
          risks,
          actionItemsStats,
          kpis,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Dashboard GET error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// PATCH - Update dashboard data (for testing/demo purposes)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    // Update organization if provided
    if (body.organization) {
      storage.dashboard.organization = {
        ...storage.dashboard.organization,
        ...body.organization,
      };
    }

    // Update assessment if provided
    if (body.assessment) {
      storage.dashboard.assessment = {
        ...storage.dashboard.assessment,
        ...body.assessment,
      };
    }

    // Update documents if provided
    if (body.documents) {
      storage.dashboard.documents = {
        ...storage.dashboard.documents,
        ...body.documents,
      };
    }

    // Update risks if provided
    if (body.risks) {
      storage.dashboard.risks = {
        ...storage.dashboard.risks,
        ...body.risks,
      };
    }

    // Update action items if provided
    if (body.actionItems) {
      storage.dashboard.actionItems = body.actionItems;
    }

    // Calculate action items stats
    const actionItems = storage.dashboard.actionItems;
    const actionItemsStats = {
      total: actionItems.length,
      completed: actionItems.filter((item: any) => item.status === 'completed').length,
      pending: actionItems.filter((item: any) => item.status === 'pending').length,
      critical: actionItems.filter((item: any) => item.priority === 'critical').length,
    };

    return NextResponse.json(
      {
        dashboard: {
          ...storage.dashboard,
          actionItemsStats,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Dashboard PATCH error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// POST - Complete an action item
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { actionItemId } = body;

    if (!actionItemId) {
      return NextResponse.json({ error: 'Action item ID on kohustuslik' }, { status: 400 });
    }

    // Find action item
    const itemIndex = storage.dashboard.actionItems.findIndex((item: any) => item.id === actionItemId);

    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Action item ei leitud' }, { status: 404 });
    }

    // Mark as completed
    storage.dashboard.actionItems[itemIndex].status = 'completed';

    // Calculate action items stats
    const actionItems = storage.dashboard.actionItems;
    const actionItemsStats = {
      total: actionItems.length,
      completed: actionItems.filter((item: any) => item.status === 'completed').length,
      pending: actionItems.filter((item: any) => item.status === 'pending').length,
      critical: actionItems.filter((item: any) => item.priority === 'critical').length,
    };

    return NextResponse.json(
      {
        dashboard: {
          ...storage.dashboard,
          actionItemsStats,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Dashboard POST error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}
