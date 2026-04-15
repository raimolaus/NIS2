import { NextRequest, NextResponse } from 'next/server';
import { storage, Incident } from '@/lib/storage';

// Helper function to calculate NIS2 deadlines
function calculateDeadlines(discoveredAt: string) {
  const discovered = new Date(discoveredAt);

  return {
    earlyWarningDeadline: new Date(discovered.getTime() + 24 * 60 * 60 * 1000).toISOString(), // T+24h
    notificationDeadline: new Date(discovered.getTime() + 72 * 60 * 60 * 1000).toISOString(), // T+72h
    finalReportDeadline: new Date(discovered.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(), // T+30 days
  };
}

// Helper function to determine if incident requires NIS2 reporting
function requiresNIS2Reporting(severity: string, dataImpact: boolean, crossBorder: boolean): boolean {
  // Critical incidents always require reporting
  if (severity === 'critical') return true;

  // High severity with data impact or cross-border implications
  if (severity === 'high' && (dataImpact || crossBorder)) return true;

  return false;
}

// GET - List all incidents
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const severity = searchParams.get('severity');

    let incidents = storage.incidents;

    // Filter by status
    if (status && status !== 'all') {
      incidents = incidents.filter(i => i.status === status);
    }

    // Filter by severity
    if (severity && severity !== 'all') {
      incidents = incidents.filter(i => i.severity === severity);
    }

    // Sort by most recent first
    incidents = incidents.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ incidents }, { status: 200 });
  } catch (error) {
    console.error('Incidents GET error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// POST - Create new incident
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      type,
      severity,
      affectedSystems,
      affectedUsers,
      dataImpact,
      crossBorder,
      discoveredAt,
      reportedBy,
    } = body;

    // Validation
    if (!title || !description || !type || !severity) {
      return NextResponse.json(
        { error: 'Kohustuslikud väljad puuduvad' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const incidentDiscoveredAt = discoveredAt || now;

    // Calculate NIS2 deadlines
    const deadlines = calculateDeadlines(incidentDiscoveredAt);
    const requiresReporting = requiresNIS2Reporting(severity, dataImpact || false, crossBorder || false);

    const newIncident: Incident = {
      id: String(storage.incidents.length + 1),
      organizationId: 'mock-org-id',
      title,
      description,
      type,
      severity,
      status: 'new',
      discoveredAt: incidentDiscoveredAt,
      reportedAt: now,
      containedAt: null,
      resolvedAt: null,
      affectedSystems: affectedSystems || [],
      affectedUsers: affectedUsers || null,
      dataImpact: dataImpact || false,
      crossBorder: crossBorder || false,
      earlyWarningDeadline: requiresReporting ? deadlines.earlyWarningDeadline : null,
      notificationDeadline: requiresReporting ? deadlines.notificationDeadline : null,
      finalReportDeadline: requiresReporting ? deadlines.finalReportDeadline : null,
      earlyWarningSent: false,
      notificationSent: false,
      finalReportSent: false,
      evidence: [],
      rootCause: null,
      lessonsLearned: null,
      preventiveMeasures: null,
      certCaseNumber: null,
      reportedBy: reportedBy || 'Test User',
      assignedTo: null,
      createdAt: now,
      updatedAt: now,
    };

    storage.incidents.push(newIncident);

    return NextResponse.json(
      {
        incident: newIncident,
        message: 'Intsident edukalt registreeritud',
        requiresNIS2Reporting,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Incident POST error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// PATCH - Update incident
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Incident ID on kohustuslik' }, { status: 400 });
    }

    const incidentIndex = storage.incidents.findIndex(i => i.id === id);

    if (incidentIndex === -1) {
      return NextResponse.json({ error: 'Intsidenti ei leitud' }, { status: 404 });
    }

    // Update incident
    storage.incidents[incidentIndex] = {
      ...storage.incidents[incidentIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    // If status changed to contained, set containedAt
    if (updates.status === 'contained' && !storage.incidents[incidentIndex].containedAt) {
      storage.incidents[incidentIndex].containedAt = new Date().toISOString();
    }

    // If status changed to resolved, set resolvedAt
    if (updates.status === 'resolved' && !storage.incidents[incidentIndex].resolvedAt) {
      storage.incidents[incidentIndex].resolvedAt = new Date().toISOString();
    }

    return NextResponse.json(
      {
        incident: storage.incidents[incidentIndex],
        message: 'Intsident uuendatud',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Incident PATCH error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// DELETE - Delete incident
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Incident ID on kohustuslik' }, { status: 400 });
    }

    const incidentIndex = storage.incidents.findIndex(i => i.id === id);

    if (incidentIndex === -1) {
      return NextResponse.json({ error: 'Intsidenti ei leitud' }, { status: 404 });
    }

    storage.incidents.splice(incidentIndex, 1);

    return NextResponse.json({ message: 'Intsident kustutatud' }, { status: 200 });
  } catch (error) {
    console.error('Incident DELETE error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}
