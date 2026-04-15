import { NextRequest, NextResponse } from 'next/server';

// In-memory mock storage
let mockRisks: any[] = [
  {
    id: '1',
    riskId: 'RISK-01',
    title: 'Volitamata juurdepääs süsteemidele',
    description: 'Nõrk parooli poliitika võib võimaldada volitamata isikutel pääseda ligi kriitiliste süsteemide juurde.',
    category: 'technical',
    likelihood: 4,
    impact: 5,
    riskLevel: 20,
    currentMeasures: 'Põhiline parooli poliitika olemas',
    recommendations: 'Rakendada MFA, tugevdada parooli nõudeid, kasutada parooli halduri',
    mitigationActions: 'MFA rakendamine kõigile kasutajatele, parooli pikkuse nõue 12+ tähemärki',
    completedActions: null,
    owner: 'IT juht',
    status: 'identified',
    dueDate: null,
    mitigatedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    organizationId: 'mock-org-id',
  },
  {
    id: '2',
    riskId: 'RISK-02',
    title: 'Andmete kadumine varundamise puudumisel',
    description: 'Regulaarse varundamise puudumine võib põhjustada kriitiliste andmete pöördumatut kaotust.',
    category: 'technical',
    likelihood: 3,
    impact: 5,
    riskLevel: 15,
    currentMeasures: 'Mõned süsteemid varundatakse käsitsi',
    recommendations: 'Automatiseerida varundamine, testida taastamist regulaarselt',
    mitigationActions: 'Automatiseeritud varundamise süsteemi rakendamine, igapäevased varundused',
    completedActions: 'Varundamise tarkvara valitud ja ostetud',
    owner: 'IT juht',
    status: 'in_progress',
    dueDate: '2024-12-31',
    mitigatedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    organizationId: 'mock-org-id',
  },
];

// GET - Get all risks
export async function GET(req: NextRequest) {
  try {
    // Sort by risk level (highest first)
    const sorted = [...mockRisks].sort((a, b) => b.riskLevel - a.riskLevel);

    return NextResponse.json({ risks: sorted }, { status: 200 });
  } catch (error) {
    console.error('Risks GET error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}

// POST - Create new risk
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      riskId,
      title,
      description,
      category,
      likelihood,
      impact,
      currentMeasures,
      recommendations,
      mitigationActions,
      completedActions,
      owner,
      status,
      dueDate,
    } = body;

    // Validate required fields
    if (!riskId || !title || !category || !likelihood || !impact) {
      return NextResponse.json(
        { error: 'Kohustuslikud väljad: riskId, title, category, likelihood, impact' },
        { status: 400 }
      );
    }

    // Check if riskId already exists
    const existingRisk = mockRisks.find((r) => r.riskId === riskId);
    if (existingRisk) {
      return NextResponse.json(
        { error: 'Selle ID-ga risk on juba olemas' },
        { status: 400 }
      );
    }

    // Calculate risk level
    const riskLevel = likelihood * impact;

    // Create new risk
    const newRisk = {
      id: String(mockRisks.length + 1),
      riskId,
      title,
      description: description || '',
      category,
      likelihood,
      impact,
      riskLevel,
      currentMeasures: currentMeasures || null,
      recommendations: recommendations || null,
      mitigationActions: mitigationActions || null,
      completedActions: completedActions || null,
      owner: owner || null,
      status: status || 'identified',
      dueDate: dueDate || null,
      mitigatedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      organizationId: 'mock-org-id',
    };

    mockRisks.push(newRisk);

    return NextResponse.json({ risk: newRisk }, { status: 201 });
  } catch (error) {
    console.error('Risk POST error:', error);
    return NextResponse.json({ error: 'Midagi läks valesti' }, { status: 500 });
  }
}
