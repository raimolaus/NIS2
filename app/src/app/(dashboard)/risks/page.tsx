'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Separator,
  Input,
  Label,
  Textarea,
  Progress,
} from '@/components/ui';

interface Risk {
  id: string;
  riskId: string;
  title: string;
  description: string;
  category: 'technical' | 'organizational' | 'compliance';
  likelihood: number;
  impact: number;
  riskLevel: number;
  currentMeasures: string | null;
  recommendations: string | null;
  mitigationActions: string | null;
  completedActions: string | null;
  owner: string | null;
  status: 'identified' | 'in_progress' | 'mitigated' | 'accepted';
  dueDate: string | null;
  mitigatedAt: string | null;
  createdAt: string;
}

export default function RisksPage() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newRisk, setNewRisk] = useState({
    riskId: '',
    title: '',
    description: '',
    category: 'technical' as const,
    likelihood: 3,
    impact: 3,
    currentMeasures: '',
    recommendations: '',
    mitigationActions: '',
    completedActions: '',
    owner: '',
    status: 'identified' as const,
    dueDate: '',
  });

  // Fetch risks on component mount
  useEffect(() => {
    fetchRisks();
  }, []);

  const fetchRisks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/risks-mock');

      if (!response.ok) {
        throw new Error('Riske ei õnnestunud laadida');
      }

      const data = await response.json();
      setRisks(data.risks || []);
    } catch (error) {
      console.error('Error fetching risks:', error);
      alert('Viga riskide laadimisel. Kontrolli konsoolisõnumeid.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRisks = async () => {
    setGenerating(true);

    // Mock AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const baseIndex = risks.length;
    const newGeneratedRisks: Risk[] = [
      {
        id: `${baseIndex + 1}`,
        riskId: `RISK-${String(baseIndex + 1).padStart(2, '0')}`,
        title: 'Isikuandmete leke',
        description: 'Ebapiisavad andmekaitse meetmed võivad põhjustada klientide isikuandmete lekkimise, mis toob kaasa GDPR trahvid ja reputatsiooni kahju.',
        category: 'compliance',
        likelihood: 3,
        impact: 5,
        riskLevel: 15,
        currentMeasures: null,
        recommendations: 'Krüpteerimine, juurdepääsukontroll, regulaarne audiit, DLP süsteemid',
        mitigationActions: null,
        completedActions: null,
        owner: null,
        status: 'identified',
        dueDate: null,
        mitigatedAt: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: `${baseIndex + 2}`,
        riskId: `RISK-${String(baseIndex + 2).padStart(2, '0')}`,
        title: 'Phishing rünnakud',
        description: 'Töötajad võivad langeda phishing e-kirjade ohvriks, mis võimaldab ründajatel pääseda ligi ettevõtte süsteemidele ja andmetele.',
        category: 'technical',
        likelihood: 5,
        impact: 4,
        riskLevel: 20,
        currentMeasures: null,
        recommendations: 'Töötajate koolitus, e-posti filtrid, MFA rakendamine, simulatsioon testid',
        mitigationActions: null,
        completedActions: null,
        owner: null,
        status: 'identified',
        dueDate: null,
        mitigatedAt: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: `${baseIndex + 3}`,
        riskId: `RISK-${String(baseIndex + 3).padStart(2, '0')}`,
        title: 'Varundamise puudumine',
        description: 'Kriitiliste süsteemide ja andmete ebapiisav või puuduv varundamine võib põhjustada andmekao ransomware rünnaku või riistvarikatkestuse korral.',
        category: 'technical',
        likelihood: 3,
        impact: 5,
        riskLevel: 15,
        currentMeasures: null,
        recommendations: '3-2-1 varundamise strateegia, automaatsed varukoopad, taastamise testimine',
        mitigationActions: null,
        completedActions: null,
        owner: null,
        status: 'identified',
        dueDate: null,
        mitigatedAt: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: `${baseIndex + 4}`,
        riskId: `RISK-${String(baseIndex + 4).padStart(2, '0')}`,
        title: 'Turvapoliitika puudumine',
        description: 'Organisatsioonil puudub dokumenteeritud infoturbe poliitika ja protseduurid, mis põhjustab ebajärjekindlat turvapraktikat.',
        category: 'organizational',
        likelihood: 4,
        impact: 3,
        riskLevel: 12,
        currentMeasures: null,
        recommendations: 'Koostada turvapoliitika, määrata vastutajad, läbi viia riskianalüüs',
        mitigationActions: null,
        completedActions: null,
        owner: null,
        status: 'identified',
        dueDate: null,
        mitigatedAt: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: `${baseIndex + 5}`,
        riskId: `RISK-${String(baseIndex + 5).padStart(2, '0')}`,
        title: 'Nõrkade paroolide kasutamine',
        description: 'Töötajad kasutavad lihtsaid paroole ja sama parooli mitmes süsteemis, mis võimaldab kergesti juurdepääsu süsteemidele.',
        category: 'technical',
        likelihood: 5,
        impact: 3,
        riskLevel: 15,
        currentMeasures: null,
        recommendations: 'Paroolipoliitika, MFA kohustuslik, paroolihaldur, regulaarne parooli vahetus',
        mitigationActions: null,
        completedActions: null,
        owner: null,
        status: 'identified',
        dueDate: null,
        mitigatedAt: null,
        createdAt: new Date().toISOString(),
      },
    ];

    setRisks([...risks, ...newGeneratedRisks]);
    setGenerating(false);
  };

  const handleAddRisk = async () => {
    if (!newRisk.riskId || !newRisk.title) return;

    try {
      const response = await fetch('/api/risks-mock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          riskId: newRisk.riskId,
          title: newRisk.title,
          description: newRisk.description,
          category: newRisk.category,
          likelihood: newRisk.likelihood,
          impact: newRisk.impact,
          currentMeasures: newRisk.currentMeasures || null,
          recommendations: newRisk.recommendations || null,
          mitigationActions: newRisk.mitigationActions || null,
          completedActions: newRisk.completedActions || null,
          owner: newRisk.owner || null,
          status: newRisk.status,
          dueDate: newRisk.dueDate || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Riski lisamine ebaõnnestus');
      }

      const data = await response.json();
      setRisks([...risks, data.risk]);
      setShowAddModal(false);
      setNewRisk({
        riskId: '',
        title: '',
        description: '',
        category: 'technical',
        likelihood: 3,
        impact: 3,
        currentMeasures: '',
        recommendations: '',
        mitigationActions: '',
        completedActions: '',
        owner: '',
        status: 'identified',
        dueDate: '',
      });
    } catch (error) {
      console.error('Error adding risk:', error);
      alert(error instanceof Error ? error.message : 'Viga riski lisamisel');
    }
  };

  const handleUpdateRisk = async (id: string, updates: Partial<Risk>) => {
    try {
      const response = await fetch(`/api/risks-mock/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Riski uuendamine ebaõnnestus');
      }

      const data = await response.json();
      setRisks(risks.map(r => r.id === id ? data.risk : r));
    } catch (error) {
      console.error('Error updating risk:', error);
      alert(error instanceof Error ? error.message : 'Viga riski uuendamisel');
    }
  };

  const handleDeleteRisk = async (id: string) => {
    if (!confirm('Kas oled kindel, et soovid selle riski kustutada?')) {
      return;
    }

    try {
      const response = await fetch(`/api/risks-mock/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Riski kustutamine ebaõnnestus');
      }

      setRisks(risks.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting risk:', error);
      alert(error instanceof Error ? error.message : 'Viga riski kustutamisel');
    }
  };

  const getNextRiskId = () => {
    if (risks.length === 0) return 'RISK-01';
    const maxNum = Math.max(
      ...risks.map(r => parseInt(r.riskId.replace('RISK-', '')) || 0)
    );
    return `RISK-${String(maxNum + 1).padStart(2, '0')}`;
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      technical: 'Tehniline',
      organizational: 'Organisatsiooniline',
      compliance: 'Vastavus',
    };
    return labels[category] || category;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      identified: 'Tuvastatud',
      in_progress: 'Töös',
      mitigated: 'Maandatud',
      accepted: 'Aktsepteeritud',
    };
    return labels[status] || status;
  };

  const getPriorityBadge = (riskLevel: number) => {
    if (riskLevel >= 17) return <Badge variant="destructive">Kriitiline</Badge>;
    if (riskLevel >= 10) return <Badge className="bg-orange-500 text-white border-orange-500">Kõrge</Badge>;
    if (riskLevel >= 5) return <Badge variant="warning">Keskmine</Badge>;
    return <Badge variant="success">Madal</Badge>;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'mitigated') return <Badge variant="success">Maandatud</Badge>;
    if (status === 'in_progress') return <Badge className="bg-blue-500 text-white border-blue-500">Töös</Badge>;
    if (status === 'accepted') return <Badge variant="secondary">Aktsepteeritud</Badge>;
    return <Badge variant="warning">Tuvastatud</Badge>;
  };

  const getRiskCardGradient = (riskLevel: number) => {
    if (riskLevel >= 17) return 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-red-200';
    if (riskLevel >= 10) return 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200';
    if (riskLevel >= 5) return 'bg-gradient-to-br from-yellow-50 to-lime-50 dark:from-yellow-950 dark:to-lime-950 border-yellow-200';
    return 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200';
  };

  const totalRisks = risks.length;
  const criticalHighRisks = risks.filter(r => r.riskLevel >= 10).length;
  const inProgressRisks = risks.filter(r => r.status === 'in_progress').length;
  const mitigatedRisks = risks.filter(r => r.status === 'mitigated').length;

  // Calculate percentages for KPI cards
  const mitigationRate = totalRisks > 0 ? Math.round((mitigatedRisks / totalRisks) * 100) : 0;
  const criticalRate = totalRisks > 0 ? Math.round((criticalHighRisks / totalRisks) * 100) : 0;

  // Get highest priority risk for AI panel
  const highestPriorityRisk = risks
    .filter(r => r.status !== 'mitigated')
    .sort((a, b) => b.riskLevel - a.riskLevel)[0];

  // Create risk matrix data (5x5 grid)
  const riskMatrix: number[][] = Array(5).fill(0).map(() => Array(5).fill(0));
  risks.forEach(risk => {
    const row = 5 - risk.impact; // Invert so impact 5 is at top
    const col = risk.likelihood - 1;
    if (row >= 0 && row < 5 && col >= 0 && col < 5) {
      riskMatrix[row][col]++;
    }
  });

  const getMatrixCellColor = (likelihood: number, impact: number) => {
    const riskLevel = likelihood * impact;
    if (riskLevel >= 17) return 'bg-red-500 hover:bg-red-600';
    if (riskLevel >= 10) return 'bg-orange-500 hover:bg-orange-600';
    if (riskLevel >= 5) return 'bg-yellow-500 hover:bg-yellow-600';
    return 'bg-green-500 hover:bg-green-600';
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Riskihaldus</h1>
          <p className="text-muted-foreground">
            Tuvasta, hinda ja halda organisatsiooni infoturberiske
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleGenerateRisks}
            disabled={generating}
            variant="outline"
            className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
          >
            {generating ? 'Genereerin...' : '✨ Genereeri riskid AI-ga'}
          </Button>
          <Button
            onClick={() => {
              setNewRisk({ ...newRisk, riskId: getNextRiskId() });
              setShowAddModal(true);
            }}
          >
            + Lisa uus risk
          </Button>
        </div>
      </div>

      {/* Enhanced KPI Cards - Dashboard Style */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {/* Total Risks */}
        <Card className="hover:shadow-lg transition-shadow opacity-0 animate-slide-up border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kokku riske</CardTitle>
            <span className="text-2xl">📊</span>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2">{totalRisks}</div>
            <div className="relative h-3 bg-muted rounded-full mb-2">
              <div
                className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all"
                style={{ width: `${Math.min(totalRisks * 10, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {totalRisks > 0 ? '↗️ Aktiivselt jälgitud' : 'Alusta riskihaldusega'}
            </p>
          </CardContent>
        </Card>

        {/* Critical/High Risks */}
        <Card className="hover:shadow-lg transition-shadow opacity-0 animate-slide-up border-2" style={{ animationDelay: '100ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kriitiline / Kõrge</CardTitle>
            <span className="text-2xl">🔴</span>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2 text-red-600">{criticalHighRisks}</div>
            <div className="relative h-3 bg-muted rounded-full mb-2">
              <div
                className="absolute h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full transition-all"
                style={{ width: `${criticalRate}%` }}
              />
              {/* Target line at 0% (goal is 0 critical risks) */}
              <div className="absolute left-0 h-full w-0.5 bg-green-500" />
            </div>
            <p className="text-xs text-muted-foreground">
              {criticalHighRisks === 0 ? '✓ Suurepärane! 0 kriitilist riski' : `⚠️ Kohese tähelepanu vajab ${criticalHighRisks} riski`}
            </p>
          </CardContent>
        </Card>

        {/* In Progress */}
        <Card className="hover:shadow-lg transition-shadow opacity-0 animate-slide-up border-2" style={{ animationDelay: '200ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Töös</CardTitle>
            <span className="text-2xl">🔄</span>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2 text-blue-600">{inProgressRisks}</div>
            <div className="relative h-3 bg-muted rounded-full mb-2">
              <div
                className="absolute h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                style={{ width: `${totalRisks > 0 ? (inProgressRisks / totalRisks) * 100 : 0}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {inProgressRisks > 0 ? '⚡ Aktiivne maandamine' : 'Alusta riskide maandamist'}
            </p>
          </CardContent>
        </Card>

        {/* Mitigated */}
        <Card className="hover:shadow-lg transition-shadow opacity-0 animate-slide-up border-2" style={{ animationDelay: '300ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maandatud</CardTitle>
            <span className="text-2xl">✅</span>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2 text-green-600">{mitigatedRisks}</div>
            <div className="relative h-3 bg-muted rounded-full mb-2">
              <div
                className="absolute h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all"
                style={{ width: `${mitigationRate}%` }}
              />
              {/* Target line at 100% */}
              <div className="absolute right-0 h-full w-0.5 bg-green-500" />
            </div>
            <p className="text-xs text-muted-foreground">
              {mitigationRate === 100 ? '🎉 100% maandatud!' : `Gap: ${totalRisks - mitigatedRisks} to 100%`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 5x5 Risk Matrix */}
      {risks.length > 0 && (
        <Card className="mb-6 opacity-0 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🎯</span>
              5×5 Riskimaatriks
            </CardTitle>
            <CardDescription>
              Interaktiivne riskide visualiseerimine - klikka lahtrile, et näha selles kategoorias olevaid riske
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              {/* Y-axis label (Impact) */}
              <div className="flex flex-col justify-center">
                <div className="transform -rotate-90 text-sm font-semibold text-muted-foreground whitespace-nowrap">
                  Mõju (Impact) →
                </div>
              </div>

              {/* Matrix */}
              <div className="flex-1">
                <div className="grid grid-cols-5 gap-2 mb-2">
                  {[5, 4, 3, 2, 1].map(impact => (
                    [1, 2, 3, 4, 5].map(likelihood => {
                      const row = 5 - impact;
                      const col = likelihood - 1;
                      const count = riskMatrix[row][col];
                      const riskLevel = likelihood * impact;

                      return (
                        <div
                          key={`${impact}-${likelihood}`}
                          className={`
                            aspect-square rounded-lg flex flex-col items-center justify-center
                            cursor-pointer transition-all border-2 border-transparent
                            hover:border-primary hover:scale-105
                            ${getMatrixCellColor(likelihood, impact)}
                            ${count === 0 ? 'opacity-30' : 'opacity-100'}
                          `}
                          title={`Tõenäosus: ${likelihood}, Mõju: ${impact}, Riskitase: ${riskLevel}`}
                        >
                          <div className="text-white font-bold text-2xl">{count}</div>
                          <div className="text-white text-xs opacity-80">{riskLevel}</div>
                        </div>
                      );
                    })
                  ))}
                </div>

                {/* X-axis label (Likelihood) */}
                <div className="text-sm font-semibold text-muted-foreground text-center mt-2">
                  ← Tõenäosus (Likelihood)
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded" />
                    <span>Madal (1-4)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded" />
                    <span>Keskmine (5-9)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded" />
                    <span>Kõrge (10-16)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded" />
                    <span>Kriitiline (17-25)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Smart Prioritization Panel */}
      {highestPriorityRisk && (
        <Card className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-2 border-purple-200 opacity-0 animate-slide-up" style={{ animationDelay: '500ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🎯</span>
              AI Smart Prioritization
            </CardTitle>
            <CardDescription>
              AI analüüsis teie riske ja soovitab järgmist prioriteeti
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="font-mono">{highestPriorityRisk.riskId}</Badge>
                    {getPriorityBadge(highestPriorityRisk.riskLevel)}
                    <Badge className="bg-purple-600 text-white">PRIORITY #1</Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{highestPriorityRisk.title}</h3>
                  <p className="text-sm text-muted-foreground">{highestPriorityRisk.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm mb-3">
                <div>
                  <span className="text-muted-foreground">Riskitase:</span>
                  <span className="font-bold ml-2">{highestPriorityRisk.riskLevel}/25</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Tõenäosus:</span>
                  <span className="font-bold ml-2">{highestPriorityRisk.likelihood}/5</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Mõju:</span>
                  <span className="font-bold ml-2">{highestPriorityRisk.impact}/5</span>
                </div>
              </div>
              {highestPriorityRisk.recommendations && (
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded mb-3">
                  <p className="text-xs font-semibold mb-1">💡 AI Soovitus:</p>
                  <p className="text-sm">{highestPriorityRisk.recommendations}</p>
                </div>
              )}
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => {
                  setEditingId(highestPriorityRisk.id);
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }}
              >
                ⚡ Alusta selle riski maandamist
              </Button>
            </div>

            {/* Quick Win Strategy */}
            <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <span>💪</span>
                Quick Win Strategy
              </h4>
              <p className="text-xs text-muted-foreground">
                Alusta kõige kriitilisema riskiga ({highestPriorityRisk.riskId}) - selle maandamine vähendab kogu riskitaset kõige enam ja näitab kiireimat mõju.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Separator className="my-6" />

      {/* Loading state */}
      {loading ? (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <div className="text-6xl mb-4">⏳</div>
            <h3 className="text-xl font-semibold mb-2">
              Laadin riske...
            </h3>
          </CardContent>
        </Card>
      ) : risks.length === 0 ? (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">
              Riske pole veel lisatud
            </h3>
            <p className="text-muted-foreground mb-6">
              Alusta riskihaldusega, lisades esimese riski või lase AI-l need genereerida
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => {
                  setNewRisk({ ...newRisk, riskId: getNextRiskId() });
                  setShowAddModal(true);
                }}
              >
                + Lisa esimene risk
              </Button>
              <Button
                variant="outline"
                onClick={handleGenerateRisks}
                className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
              >
                ✨ Genereeri AI-ga
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {risks.map((risk, idx) => (
            <Card
              key={risk.id}
              className={`hover:shadow-lg transition-shadow border-2 opacity-0 animate-slide-up ${getRiskCardGradient(risk.riskLevel)}`}
              style={{ animationDelay: `${Math.min(idx * 50, 600)}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="font-mono">
                        {risk.riskId}
                      </Badge>
                      <Badge variant="secondary">
                        {getCategoryLabel(risk.category)}
                      </Badge>
                      {getPriorityBadge(risk.riskLevel)}
                      {getStatusBadge(risk.status)}
                    </div>
                    <CardTitle className="text-xl mb-2">{risk.title}</CardTitle>
                    <CardDescription>{risk.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingId(editingId === risk.id ? null : risk.id)}
                    >
                      {editingId === risk.id ? '✓' : '✏️'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRisk(risk.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      🗑️
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Risk Matrix */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Tõenäosus</Label>
                    {editingId === risk.id ? (
                      <select
                        value={risk.likelihood}
                        onChange={e => handleUpdateRisk(risk.id, { likelihood: parseInt(e.target.value) })}
                        className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md"
                      >
                        {[1, 2, 3, 4, 5].map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="text-2xl font-bold mt-1">{risk.likelihood}</div>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Mõju</Label>
                    {editingId === risk.id ? (
                      <select
                        value={risk.impact}
                        onChange={e => handleUpdateRisk(risk.id, { impact: parseInt(e.target.value) })}
                        className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md"
                      >
                        {[1, 2, 3, 4, 5].map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="text-2xl font-bold mt-1">{risk.impact}</div>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Riskitase</Label>
                    <div className="text-2xl font-bold mt-1">{risk.riskLevel}</div>
                  </div>
                </div>

                <Separator />

                {/* Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Vastutaja</Label>
                    {editingId === risk.id ? (
                      <Input
                        value={risk.owner || ''}
                        onChange={e => handleUpdateRisk(risk.id, { owner: e.target.value })}
                        placeholder="CISO, IT juht..."
                        className="mt-1"
                      />
                    ) : (
                      <div className="text-sm mt-1">{risk.owner || '-'}</div>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Olek</Label>
                    {editingId === risk.id ? (
                      <select
                        value={risk.status}
                        onChange={e => handleUpdateRisk(risk.id, { status: e.target.value as Risk['status'] })}
                        className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md"
                      >
                        <option value="identified">Tuvastatud</option>
                        <option value="in_progress">Töös</option>
                        <option value="mitigated">Maandatud</option>
                        <option value="accepted">Aktsepteeritud</option>
                      </select>
                    ) : (
                      <div className="text-sm mt-1">{getStatusLabel(risk.status)}</div>
                    )}
                  </div>
                </div>

                {risk.currentMeasures && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Praegused turvameetmed</Label>
                    <p className="text-sm mt-1">{risk.currentMeasures}</p>
                  </div>
                )}

                {risk.recommendations && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Soovitused</Label>
                    <p className="text-sm mt-1">{risk.recommendations}</p>
                  </div>
                )}

                {/* Mitigation Actions - Show when status is in_progress or mitigated */}
                {(risk.status === 'in_progress' || risk.status === 'mitigated') && (
                  <>
                    <Separator />
                    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 rounded-lg p-4 space-y-3">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                        🎯 Maandamismeetmed
                      </h4>
                      {editingId === risk.id ? (
                        <Textarea
                          value={risk.mitigationActions || ''}
                          onChange={e => handleUpdateRisk(risk.id, { mitigationActions: e.target.value })}
                          placeholder="Kirjelda maandamismeetmeid (nt. MFA rakendamine, varundamise seadistamine...)"
                          rows={3}
                          className="bg-white dark:bg-slate-900"
                        />
                      ) : (
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          {risk.mitigationActions || 'Maandamismeetmeid ei ole veel määratud'}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Completed Actions - Show when status is mitigated */}
                {risk.status === 'mitigated' && (
                  <div className="bg-green-50 dark:bg-green-950 border border-green-200 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 flex items-center gap-2">
                      ✅ Tehtud tegevused
                    </h4>
                    {editingId === risk.id ? (
                      <Textarea
                        value={risk.completedActions || ''}
                        onChange={e => handleUpdateRisk(risk.id, { completedActions: e.target.value })}
                        placeholder="Kirjelda läbiviidud tegevusi ja tulemusi..."
                        rows={3}
                        className="bg-white dark:bg-slate-900"
                      />
                    ) : (
                      <p className="text-sm text-green-800 dark:text-green-200">
                        {risk.completedActions || 'Tehtud tegevusi ei ole veel dokumenteeritud'}
                      </p>
                    )}
                    {risk.mitigatedAt && (
                      <p className="text-xs text-green-600 dark:text-green-400">
                        Maandatud: {new Date(risk.mitigatedAt).toLocaleDateString('et-EE')}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Help text */}
      <Card className="mt-8 bg-blue-50 dark:bg-blue-950 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="text-3xl">💡</div>
            <div>
              <h3 className="font-semibold mb-2">Kuidas riskihaldus töötab?</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Tuvasta riskid käsitsi või lase AI-l need genereerida</li>
                <li>• Hinda iga riski tõenäosust (1-5) ja mõju (1-5)</li>
                <li>• Riskitase = Tõenäosus × Mõju (max 25)</li>
                <li>• Määra vastutaja ja jälgi riski maandamise olekut</li>
                <li>• Prioriteedi: Kriitiline (17+), Kõrge (10-16), Keskmine (5-9), Madal (1-4)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Risk Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Lisa uus risk</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddModal(false)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="riskId">Riski ID *</Label>
                  <Input
                    id="riskId"
                    value={newRisk.riskId}
                    onChange={e => setNewRisk({ ...newRisk, riskId: e.target.value })}
                    placeholder="RISK-01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategooria *</Label>
                  <select
                    id="category"
                    value={newRisk.category}
                    onChange={e => setNewRisk({ ...newRisk, category: e.target.value as Risk['category'] })}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md"
                  >
                    <option value="technical">Tehniline</option>
                    <option value="organizational">Organisatsiooniline</option>
                    <option value="compliance">Vastavus</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Riski nimetus *</Label>
                <Input
                  id="title"
                  value={newRisk.title}
                  onChange={e => setNewRisk({ ...newRisk, title: e.target.value })}
                  placeholder="Nt. Volitamata juurdepääs süsteemidele"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Kirjeldus</Label>
                <Textarea
                  id="description"
                  value={newRisk.description}
                  onChange={e => setNewRisk({ ...newRisk, description: e.target.value })}
                  rows={3}
                  placeholder="Detailne riski kirjeldus..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="likelihood">Tõenäosus (1-5) *</Label>
                  <select
                    id="likelihood"
                    value={newRisk.likelihood}
                    onChange={e => setNewRisk({ ...newRisk, likelihood: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md"
                  >
                    <option value="1">1 - Väga madal</option>
                    <option value="2">2 - Madal</option>
                    <option value="3">3 - Keskmine</option>
                    <option value="4">4 - Kõrge</option>
                    <option value="5">5 - Väga kõrge</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="impact">Mõju (1-5) *</Label>
                  <select
                    id="impact"
                    value={newRisk.impact}
                    onChange={e => setNewRisk({ ...newRisk, impact: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md"
                  >
                    <option value="1">1 - Väga väike</option>
                    <option value="2">2 - Väike</option>
                    <option value="3">3 - Keskmine</option>
                    <option value="4">4 - Kõrge</option>
                    <option value="5">5 - Kriitiline</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="owner">Vastutaja</Label>
                <Input
                  id="owner"
                  value={newRisk.owner}
                  onChange={e => setNewRisk({ ...newRisk, owner: e.target.value })}
                  placeholder="CISO, IT juht, jne"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentMeasures">Praegused turvameetmed</Label>
                <Textarea
                  id="currentMeasures"
                  value={newRisk.currentMeasures}
                  onChange={e => setNewRisk({ ...newRisk, currentMeasures: e.target.value })}
                  rows={2}
                  placeholder="Kirjelda, millised meetmed on juba rakendatud..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recommendations">Soovitused</Label>
                <Textarea
                  id="recommendations"
                  value={newRisk.recommendations}
                  onChange={e => setNewRisk({ ...newRisk, recommendations: e.target.value })}
                  rows={2}
                  placeholder="Soovitused riski maandamiseks..."
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="mitigationActions">Maandamismeetmed</Label>
                <Textarea
                  id="mitigationActions"
                  value={newRisk.mitigationActions}
                  onChange={e => setNewRisk({ ...newRisk, mitigationActions: e.target.value })}
                  rows={2}
                  placeholder="Konkreetsed tegevused riski maandamiseks..."
                />
                <p className="text-xs text-muted-foreground">
                  Kuvatakse kui olek on "Töös" või "Maandatud"
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="completedActions">Tehtud tegevused</Label>
                <Textarea
                  id="completedActions"
                  value={newRisk.completedActions}
                  onChange={e => setNewRisk({ ...newRisk, completedActions: e.target.value })}
                  rows={2}
                  placeholder="Kirjelda läbiviidud tegevusi ja tulemusi..."
                />
                <p className="text-xs text-muted-foreground">
                  Kuvatakse kui olek on "Maandatud"
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleAddRisk}
                  disabled={!newRisk.riskId || !newRisk.title}
                  className="flex-1"
                >
                  Lisa risk
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Tühista
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
