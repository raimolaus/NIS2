// Shared in-memory storage for mock data
// This allows different API endpoints to share state

export interface CompanyData {
  name: string;
  regCode: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  industry: string;
  employeeCount: number;
  nis2Category: 'essential' | 'important' | 'not_applicable';
  ceo: { name: string; email: string; phone: string };
  ciso: { name: string; email: string; phone: string };
  itManager: { name: string; email: string; phone: string };
  dataProtectionOfficer: { name: string; email: string; phone: string };
  systems: string[];
  description: string;
  updatedAt: string | null;
}

export interface Document {
  id: string;
  title: string;
  type: string;
  version: string;
  status: 'draft' | 'approved' | 'archived';
  content: string;
  contentJson: any;
  fileUrl: string | null;
  approvedAt: string | null;
  approvedBy: string | null;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
  // Snapshot of company data when document was generated
  companySnapshot?: CompanyData | null;
}

export interface Assessment {
  id: string;
  organizationId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  total: number;
  answers: Record<string, string>;
  score: number | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Incident {
  id: string;
  organizationId: string;
  title: string;
  description: string;
  // NIS2 Article 23 - Incident types
  type: 'availability' | 'integrity' | 'confidentiality' | 'authenticity';
  // Severity assessment
  severity: 'critical' | 'high' | 'medium' | 'low';
  // Status workflow
  status: 'new' | 'investigating' | 'contained' | 'resolved' | 'reported' | 'closed';
  // Timeline
  discoveredAt: string;
  reportedAt: string | null;
  containedAt: string | null;
  resolvedAt: string | null;
  // Impact assessment
  affectedSystems: string[];
  affectedUsers: number | null;
  dataImpact: boolean;
  crossBorder: boolean;
  // NIS2 reporting deadlines
  earlyWarningDeadline: string | null; // T+24h
  notificationDeadline: string | null; // T+72h
  finalReportDeadline: string | null; // T+1 month
  // Reporting status
  earlyWarningSent: boolean;
  notificationSent: boolean;
  finalReportSent: boolean;
  // Evidence
  evidence: Array<{
    id: string;
    type: 'log' | 'screenshot' | 'document' | 'other';
    description: string;
    fileUrl: string | null;
    collectedAt: string;
  }>;
  // Root cause analysis
  rootCause: string | null;
  lessonsLearned: string | null;
  preventiveMeasures: string | null;
  // CERT.EE
  certCaseNumber: string | null;
  // Metadata
  reportedBy: string;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
}

export const storage = {
  company: null as CompanyData | null,
  assessment: {
    id: '1',
    organizationId: 'mock-org-id',
    status: 'not_started' as const,
    progress: 0,
    total: 40,
    answers: {},
    score: null,
    completedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as Assessment,
  documents: [
    {
      id: '1',
      title: 'Infoturbepoliitika',
      type: 'policy',
      version: '1.0',
      status: 'approved' as const,
      content: '# Infoturbepoliitika\n\nOrganisatsiooni infoturbe eesmärgid, põhimõtted ja vastutused...',
      contentJson: null,
      fileUrl: null,
      approvedAt: new Date('2024-01-20').toISOString(),
      approvedBy: 'IT juht',
      createdAt: new Date('2024-01-15').toISOString(),
      updatedAt: new Date('2024-01-20').toISOString(),
      organizationId: 'mock-org-id',
    },
    {
      id: '2',
      title: 'Riskihinnang',
      type: 'risk_assessment',
      version: '1.0',
      status: 'draft' as const,
      content: '# Riskihinnang\n\nIT süsteemide ja andmete riskianalüüs ning turvameetmed...',
      contentJson: null,
      fileUrl: null,
      approvedAt: null,
      approvedBy: null,
      createdAt: new Date('2024-02-01').toISOString(),
      updatedAt: new Date('2024-02-01').toISOString(),
      organizationId: 'mock-org-id',
    },
    {
      id: '3',
      title: 'Intsidentide haldus',
      type: 'incident_response',
      version: '1.0',
      status: 'draft' as const,
      content: '# Intsidentide haldus\n\nTurvaingidentide tuvastamine, reageerimine ja taastamine...',
      contentJson: null,
      fileUrl: null,
      approvedAt: null,
      approvedBy: null,
      createdAt: new Date('2024-02-10').toISOString(),
      updatedAt: new Date('2024-02-10').toISOString(),
      organizationId: 'mock-org-id',
    },
  ] as Document[],
  dashboard: {
    organization: {
      id: 'mock-org-id',
      name: 'Test Organisatsioon OÜ',
      sector: 'healthcare',
      employeeCount: '11-50',
      revenue: '€1-10M',
      nis2Applicable: true,
      nis2Category: 'important',
      createdAt: new Date().toISOString(),
    },
    complianceScore: {
      current: 65,
      previous: 58,
      trend: 'up',
      lastUpdated: new Date().toISOString(),
    },
    criticalTasks: [
      {
        id: '1',
        title: 'Turvapoliitika dokumenteerimine',
        priority: 'high',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'in_progress',
        progress: 60,
      },
      {
        id: '2',
        title: 'Intsidentide reageerimise plaan',
        priority: 'critical',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'not_started',
        progress: 0,
      },
      {
        id: '3',
        title: 'Varundamise testimine',
        priority: 'medium',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'in_progress',
        progress: 30,
      },
    ],
    recentActivities: [
      {
        id: '1',
        type: 'assessment',
        title: 'Enesehindamine lõpetatud',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        user: 'Test User',
      },
      {
        id: '2',
        type: 'document',
        title: 'Turvapoliitika dokument genereeritud',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        user: 'Test User',
      },
      {
        id: '3',
        type: 'risk',
        title: 'Uus risk lisatud: Andmeleke oht',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        user: 'Test User',
      },
    ],
    upcomingDeadlines: [
      {
        id: '1',
        title: 'NIS2 vastavuse auditeerimise tähtaeg',
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'audit',
      },
      {
        id: '2',
        title: 'Töötajate turvakoolitus',
        date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'training',
      },
    ],
    actionItems: [
      {
        id: '1',
        title: 'Lõpeta enesehindamine',
        description: 'Sul on 15/40 küsimust vastatud',
        status: 'pending',
        priority: 'high',
        dueDate: null,
        category: 'assessment',
      },
      {
        id: '2',
        title: 'Kinnita Infoturbepoliitika dokument',
        description: 'Mustand on valmis, vajab kinnitamist',
        status: 'pending',
        priority: 'high',
        dueDate: null,
        category: 'documents',
      },
      {
        id: '3',
        title: 'Maanda kriitilised riskid',
        description: '1 kriitiline risk vajab maandamist',
        status: 'pending',
        priority: 'critical',
        dueDate: null,
        category: 'risks',
      },
      {
        id: '4',
        title: 'Täienda riskihinnangut',
        description: 'Lisa maandamismeetmed tuvastatud riskidele',
        status: 'pending',
        priority: 'medium',
        dueDate: null,
        category: 'risks',
      },
      {
        id: '5',
        title: 'Genereeri puuduvad dokumendid',
        description: '3 dokumenti on veel loomata',
        status: 'pending',
        priority: 'medium',
        dueDate: null,
        category: 'documents',
      },
      {
        id: '6',
        title: 'Vaata üle organisatsiooni andmed',
        description: 'Kontrolli, et kõik andmed on õiged',
        status: 'completed',
        priority: 'low',
        dueDate: null,
        category: 'organization',
      },
    ],
    risks: {
      total: 4,
      critical: 1,
      high: 2,
      medium: 1,
      low: 0,
      mitigated: 1,
    },
  },
  incidents: [] as Incident[],
};
