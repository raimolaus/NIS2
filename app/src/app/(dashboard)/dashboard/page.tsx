'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Progress,
  Separator
} from '@/components/ui';
import { ThemeToggle } from '@/components/ThemeToggle';
import { IncidentDeadlineAlerts } from '@/components/IncidentDeadlineAlerts';

interface DashboardData {
  organization: {
    id: string;
    name: string;
    sector: string;
    employeeCount: string;
    revenue: string;
    nis2Applicable: boolean;
    nis2Category: string;
  };
  assessment: {
    score: number;
    progress: number;
    total: number;
    completedAt: string | null;
    status: string;
  };
  documents: {
    total: number;
    approved: number;
    draft: number;
    archived: number;
  };
  risks: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    mitigated: number;
  };
  actionItems: Array<{
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string | null;
    category: string;
  }>;
  actionItemsStats: {
    total: number;
    completed: number;
    pending: number;
    critical: number;
  };
  kpis: {
    overallComplianceScore: number;
    riskMaturityLevel: string;
    risksMitigatedPercentage: number;
    documentationCompleteness: number;
    criticalRisksOpen: number;
    criticalRisksStatus: string;
    daysUntilDeadline: number;
    deadlineStatus: string;
    assessmentCompletionPercentage: number;
    documentsApprovedPercentage: number;
  };
}

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // TEMPORARY: Mock session for testing (no auth yet)
  const session = {
    user: {
      email: 'test@test.ee',
      name: 'Test User',
    },
  };

  // Show onboarding success message
  const showOnboardingSuccess = searchParams.get('onboarded') === 'true';

  // Format sector for display
  const sectorLabels: Record<string, string> = {
    healthcare: 'Tervishoid',
    energy: 'Energeetika',
    transport: 'Transport',
    government: 'Avalik sektor',
    finance: 'Finantsteenused',
    it_services: 'IT teenused',
    manufacturing: 'Tootmine',
    logistics: 'Logistika',
    water: 'Veevarustus',
    digital_infrastructure: 'Digitaalne infrastruktuur',
    other: 'Muu',
  };

  // Load dashboard data
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard-mock');

      if (!response.ok) {
        throw new Error('Dashboard laadimine ebaõnnestus');
      }

      const data = await response.json();
      setDashboard(data.dashboard);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      alert('Viga dashboard laadi misel');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading || !dashboard) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">N2</span>
              </div>
              <span className="font-bold text-xl">NIS2 Abimees</span>
            </Link>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <div className="text-6xl mb-4">⏳</div>
              <h3 className="text-xl font-semibold mb-2">
                Laadin dashboard'i...
              </h3>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const { organization: org, assessment, documents, risks, actionItemsStats, kpis } = dashboard;
  const completionPercentage = Math.round((assessment.progress / assessment.total) * 100);

  // Helper function to get health status
  const getHealthStatus = (score: number) => {
    if (score >= 90) return { label: 'EXCELLENT', color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-500' };
    if (score >= 70) return { label: 'GOOD', color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-500' };
    if (score >= 40) return { label: 'AT RISK', color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-500' };
    return { label: 'CRITICAL', color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-500' };
  };

  const healthStatus = getHealthStatus(kpis.overallComplianceScore);

  // Get stroke color for circular progress
  const getStrokeColor = (score: number) => {
    if (score >= 90) return '#8B5CF6'; // purple
    if (score >= 70) return '#10B981'; // green
    if (score >= 40) return '#F59E0B'; // amber
    return '#EF4444'; // red
  };

  return (
    <>
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">{org.name}</h1>
            <p className="text-muted-foreground mt-1">
              {sectorLabels[org.sector] || org.sector} · {org.employeeCount} töötajat · {org.revenue}
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/profile">Muuda profiili</Link>
          </Button>
        </div>

        {/* Onboarding Success Message */}
        {showOnboardingSuccess && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <p className="text-green-700 font-medium">
                ✓ Profiil edukalt täidetud! Nüüd saad alustada NIS2 enesehindamisega.
              </p>
            </CardContent>
          </Card>
        )}

        {/* HERO: Compliance Health Score */}
        <Card
          className={`mb-6 border-2 ${healthStatus.border} opacity-0 animate-slide-up`}
          role="region"
          aria-label="NIS2 Compliance Health Score"
        >
          <CardHeader className="text-center pb-3">
            <CardTitle className="text-2xl">NIS2 COMPLIANCE HEALTH SCORE</CardTitle>
            <CardDescription>Sinu organisatsiooni üldine vastavuse tase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Circular Progress Gauge */}
              <div className="relative flex items-center justify-center" role="img" aria-label={`Compliance score: ${kpis.overallComplianceScore}%`}>
                <svg className="transform -rotate-90" width="200" height="200" aria-hidden="true">
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-gray-200"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    stroke={getStrokeColor(kpis.overallComplianceScore)}
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 85}`}
                    strokeDashoffset={`${2 * Math.PI * 85 * (1 - kpis.overallComplianceScore / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className={`text-6xl font-bold ${healthStatus.color}`}>
                    {kpis.overallComplianceScore}%
                  </div>
                  <Badge variant={
                    healthStatus.label === 'EXCELLENT' ? 'default' :
                    healthStatus.label === 'GOOD' ? 'success' :
                    healthStatus.label === 'AT RISK' ? 'warning' :
                    'destructive'
                  } className="mt-2">
                    {healthStatus.label}
                  </Badge>
                </div>
              </div>

              {/* Status & Priorities */}
              <div className="flex-1 space-y-4">
                {/* Status */}
                <div className={`p-4 rounded-lg ${healthStatus.bg} border ${healthStatus.border}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">
                      {healthStatus.label === 'CRITICAL' ? '🚨' :
                       healthStatus.label === 'AT RISK' ? '⚠️' :
                       healthStatus.label === 'GOOD' ? '✓' : '🏆'}
                    </span>
                    <h3 className={`font-bold text-lg ${healthStatus.color}`}>
                      Status: {healthStatus.label === 'CRITICAL' ? 'VAJAB KIIRET TEGEVUST' :
                               healthStatus.label === 'AT RISK' ? 'VAJAB TÄHELEPANU' :
                               healthStatus.label === 'GOOD' ? 'HEA TASE' :
                               'SUUREPÄRANE!'}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {healthStatus.label === 'CRITICAL' ? 'Sinu vastavuse tase on kriitiliselt madal. Alusta kohe!' :
                     healthStatus.label === 'AT RISK' ? 'Sul on veel tööd teha vastavuse saavutamiseks.' :
                     healthStatus.label === 'GOOD' ? 'Tubli! Jätka samas vaimus.' :
                     'Väga hea! Sa oled NIS2 nõuete täitmisel eeskujuks.'}
                  </p>
                </div>

                {/* NIS2 Deadline */}
                <div className={`p-4 rounded-lg ${
                  kpis.deadlineStatus === 'Möödunud' || kpis.deadlineStatus === 'Kriitiline'
                    ? 'bg-red-50 border border-red-200'
                    : kpis.deadlineStatus === 'Läheneb'
                    ? 'bg-amber-50 border border-amber-200'
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        NIS2 Tähtaeg
                      </p>
                      <p className={`text-xl font-bold ${
                        kpis.deadlineStatus === 'Möödunud' || kpis.deadlineStatus === 'Kriitiline'
                          ? 'text-red-600'
                          : kpis.deadlineStatus === 'Läheneb'
                          ? 'text-amber-600'
                          : 'text-gray-700'
                      }`}>
                        {kpis.daysUntilDeadline < 0
                          ? `${Math.abs(kpis.daysUntilDeadline)} päeva tagasi`
                          : `${kpis.daysUntilDeadline} päeva jäänud`
                        }
                      </p>
                    </div>
                    <Badge variant={
                      kpis.deadlineStatus === 'Möödunud' || kpis.deadlineStatus === 'Kriitiline'
                        ? 'destructive'
                        : kpis.deadlineStatus === 'Läheneb'
                        ? 'warning'
                        : 'secondary'
                    }>
                      {kpis.deadlineStatus}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    17. oktoober 2024
                  </p>
                </div>

                {/* Top Priorities */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Esmatähtsad Tegevused:
                  </h4>
                  {kpis.criticalRisksOpen > 0 && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <span className="text-red-600 font-bold">→</span>
                      <div className="flex-1">
                        <p className="font-medium text-red-900">
                          {kpis.criticalRisksOpen} kriitiline risk vajab maandamist
                        </p>
                        <Link href="/risks">
                          <Button size="sm" variant="destructive" className="mt-2">
                            Vaata riske →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                  {assessment.status !== 'completed' && (
                    <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="text-blue-600 font-bold">→</span>
                      <div className="flex-1">
                        <p className="font-medium text-blue-900">
                          Lõpeta enesehindamine ({100 - completionPercentage}% puudu)
                        </p>
                        <Link href="/assessment">
                          <Button size="sm" className="mt-2">
                            Jätka hindamist →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                  {documents.total < 6 && (
                    <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <span className="text-amber-600 font-bold">→</span>
                      <div className="flex-1">
                        <p className="font-medium text-amber-900">
                          {6 - documents.total} dokumenti vajab loomist
                        </p>
                        <Link href="/documents">
                          <Button size="sm" variant="outline" className="mt-2">
                            Genereeri dokumendid →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CRITICAL ALERTS BANNER */}
        {(kpis.criticalRisksOpen > 0 || kpis.daysUntilDeadline < 0 || documents.total < 6) && (
          <Card className="mb-6 border-2 border-red-500 dark:border-red-800 bg-red-50 dark:bg-red-950/30 opacity-0 animate-slide-up animate-delay-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-pulse">🚨</span>
                  <CardTitle className="text-red-900">CRITICAL ACTIONS REQUIRED</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {kpis.criticalRisksOpen > 0 && (
                <div className="flex items-center justify-between p-4 bg-white border-2 border-red-300 rounded-lg animate-pulse-slow">
                  <div className="flex items-center gap-3">
                    <span className="text-red-600 text-2xl font-bold">!</span>
                    <div>
                      <p className="font-semibold text-red-900">
                        {kpis.criticalRisksOpen} Critical Risk{kpis.criticalRisksOpen > 1 ? 's' : ''} Need{kpis.criticalRisksOpen === 1 ? 's' : ''} Mitigation
                      </p>
                      <p className="text-sm text-red-700">
                        Immediate action required to reduce compliance exposure
                      </p>
                    </div>
                  </div>
                  <Link href="/risks">
                    <Button variant="destructive" size="sm">
                      FIX NOW →
                    </Button>
                  </Link>
                </div>
              )}

              {kpis.daysUntilDeadline < 0 && (
                <div className="flex items-center justify-between p-4 bg-white border-2 border-red-300 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-red-600 text-2xl font-bold">!</span>
                    <div>
                      <p className="font-semibold text-red-900">
                        NIS2 Deadline Passed ({Math.abs(kpis.daysUntilDeadline)} days)
                      </p>
                      <p className="text-sm text-red-700">
                        Your organization is overdue for NIS2 compliance
                      </p>
                    </div>
                  </div>
                  <Link href="/assessment">
                    <Button variant="destructive" size="sm">
                      REVIEW →
                    </Button>
                  </Link>
                </div>
              )}

              {documents.total < 6 && (
                <div className="flex items-center justify-between p-4 bg-white border-2 border-amber-300 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-600 text-2xl font-bold">!</span>
                    <div>
                      <p className="font-semibold text-amber-900">
                        {6 - documents.total}/{6} Documents Missing
                      </p>
                      <p className="text-sm text-amber-700">
                        Required documentation is incomplete
                      </p>
                    </div>
                  </div>
                  <Link href="/documents">
                    <Button variant="outline" size="sm" className="border-amber-600 text-amber-900 hover:bg-amber-100">
                      GENERATE →
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Incident Deadline Alerts */}
        <div className="mb-6 opacity-0 animate-slide-up animate-delay-150">
          <IncidentDeadlineAlerts />
        </div>

        {/* NIS2 Status Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>NIS2 Kohaldatavus</CardTitle>
          </CardHeader>
          <CardContent>
            {org.nis2Applicable ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="warning">✓ NIS2 kohaldub</Badge>
                  <Badge variant="secondary">
                    {org.nis2Category === 'essential' ? 'Oluline üksus' : 'Tähtis üksus'}
                  </Badge>
                </div>

                <p className="text-muted-foreground">
                  Teie organisatsioon on NIS2 direktiivi kohaldamisala all.
                  Kohustuslik nõuete täitmine: oktoober 2024.
                </p>

                <Separator />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Järgmine samm
                  </h3>
                  <p className="text-blue-700 text-sm mb-3">
                    Teeme enesehindamise, et näha kus te praegu olete NIS2 nõuete täitmisega.
                    See võtab umbes 30-45 minutit.
                  </p>
                  <Button asChild>
                    <Link href="/assessment">Alusta enesehindamist</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Badge variant="secondary">NIS2 ei kohaldu</Badge>
                <p className="text-muted-foreground">
                  Teie organisatsiooni suuruse ja sektori põhjal ei ole NIS2 direktiiv
                  teile kohustuslik. Siiski soovitame järgida head infoturbe praktikat.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* NIS2 Compliance KPIs */}
        <Card className="mb-6 opacity-0 animate-slide-up animate-delay-200" role="region" aria-label="NIS2 Key Performance Indicators">
          <CardHeader>
            <CardTitle>NIS2 Vastavuse Näitajad (KPIs)</CardTitle>
            <CardDescription>Jälgi oma organisatsiooni NIS2 vastavust reaalajas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Overall Compliance Score */}
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription className="text-xs font-semibold uppercase tracking-wide">
                      Üldine vastavus
                    </CardDescription>
                    <span className="text-lg" title="Trend">
                      {dashboard.kpis.overallComplianceScore >= 70 ? '↗️' :
                       dashboard.kpis.overallComplianceScore >= 40 ? '→' : '↘️'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2 mb-3">
                    <span className={`text-5xl font-bold ${
                      dashboard.kpis.overallComplianceScore >= 80 ? 'text-green-600' :
                      dashboard.kpis.overallComplianceScore >= 60 ? 'text-blue-600' :
                      dashboard.kpis.overallComplianceScore >= 40 ? 'text-amber-600' :
                      'text-red-600'
                    }`}>
                      {dashboard.kpis.overallComplianceScore}
                    </span>
                    <span className="text-2xl font-semibold text-muted-foreground mb-1">%</span>
                  </div>

                  {/* Progress bar with target line */}
                  <div className="relative mb-3">
                    <Progress value={dashboard.kpis.overallComplianceScore} className="h-3" />
                    {/* Target line at 70% */}
                    <div className="absolute top-0 h-3 w-0.5 bg-blue-600" style={{left: '70%'}} title="Target: 70%"></div>
                  </div>

                  {/* Micro-copy */}
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Target: <span className="text-blue-600">70%</span> (GOOD level)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Gap: {Math.max(0, 70 - dashboard.kpis.overallComplianceScore)}% to target
                    </p>
                  </div>

                  <Link href="/assessment" className="block mt-3">
                    <Button size="sm" variant="ghost" className="w-full text-xs">
                      VIEW DETAILS →
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Risk Maturity Level */}
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription className="text-xs font-semibold uppercase tracking-wide">
                      Riskijuhtimise küpsus
                    </CardDescription>
                    <span className="text-lg" title="Trend">
                      {dashboard.kpis.risksMitigatedPercentage >= 40 ? '↗️' : '→'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-3">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {dashboard.kpis.riskMaturityLevel}
                    </div>
                    <Badge variant={
                      dashboard.kpis.riskMaturityLevel === 'Optimeeritud' ? 'success' :
                      dashboard.kpis.riskMaturityLevel === 'Küps' ? 'default' :
                      dashboard.kpis.riskMaturityLevel === 'Arenev' ? 'warning' :
                      'secondary'
                    } className="text-xs">
                      Level {
                        dashboard.kpis.riskMaturityLevel === 'Algne' ? '1' :
                        dashboard.kpis.riskMaturityLevel === 'Põhine' ? '2' :
                        dashboard.kpis.riskMaturityLevel === 'Arenev' ? '3' :
                        dashboard.kpis.riskMaturityLevel === 'Küps' ? '4' : '5'
                      }/5
                    </Badge>
                  </div>

                  {/* Visual bar */}
                  <div className="relative mb-3">
                    <Progress value={dashboard.kpis.risksMitigatedPercentage} className="h-3" />
                    {/* Target line at 40% (Arenev) */}
                    <div className="absolute top-0 h-3 w-0.5 bg-blue-600" style={{left: '40%'}} title="Target: Arenev (40%)"></div>
                  </div>

                  {/* Micro-copy */}
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Target: <span className="text-blue-600">ARENEV</span> (40%)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {dashboard.kpis.risksMitigatedPercentage >= 40
                        ? `Tänan! ${dashboard.kpis.risksMitigatedPercentage}% maandatud`
                        : `${Math.ceil((40 - dashboard.kpis.risksMitigatedPercentage) / 10)} more risks needed`}
                    </p>
                  </div>

                  <Link href="/risks" className="block mt-3">
                    <Button size="sm" variant="ghost" className="w-full text-xs">
                      VIEW DETAILS →
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Documentation Completeness */}
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription className="text-xs font-semibold uppercase tracking-wide">
                      Dokumentatsioon
                    </CardDescription>
                    <span className="text-lg" title="Trend">
                      {dashboard.kpis.documentationCompleteness >= 50 ? '↗️' : '→'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2 mb-3">
                    <span className={`text-5xl font-bold ${
                      dashboard.kpis.documentationCompleteness === 100 ? 'text-green-600' :
                      dashboard.kpis.documentationCompleteness >= 50 ? 'text-blue-600' :
                      'text-amber-600'
                    }`}>
                      {documents.total}
                    </span>
                    <span className="text-2xl font-semibold text-muted-foreground mb-1">/6</span>
                  </div>

                  {/* Progress bar */}
                  <div className="relative mb-3">
                    <Progress value={dashboard.kpis.documentationCompleteness} className="h-3" />
                    {/* Target line at 100% */}
                    <div className="absolute top-0 h-3 w-0.5 bg-green-600" style={{left: '100%'}} title="Target: 6/6"></div>
                  </div>

                  {/* Micro-copy */}
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Target: <span className="text-green-600">6/6</span> documents
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {6 - documents.total === 0
                        ? '✓ All documents complete!'
                        : `${6 - documents.total} document${6 - documents.total > 1 ? 's' : ''} missing`}
                    </p>
                  </div>

                  <Link href="/documents" className="block mt-3">
                    <Button size="sm" variant="ghost" className="w-full text-xs">
                      VIEW DETAILS →
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Critical Risks */}
              <Card className={`border-2 hover:shadow-lg transition-shadow ${
                dashboard.kpis.criticalRisksOpen > 0 ? 'border-red-300 bg-red-50' : ''
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription className="text-xs font-semibold uppercase tracking-wide">
                      Kriitilised riskid
                    </CardDescription>
                    <span className="text-lg" title="Status">
                      {dashboard.kpis.criticalRisksOpen === 0 ? '✓' : '⚠️'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2 mb-3">
                    <span className={`text-5xl font-bold ${
                      dashboard.kpis.criticalRisksOpen === 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {dashboard.kpis.criticalRisksOpen}
                    </span>
                    <span className="text-2xl font-semibold text-muted-foreground mb-1">open</span>
                  </div>

                  {/* Status badge */}
                  <div className="mb-3">
                    <Badge variant={dashboard.kpis.criticalRisksOpen === 0 ? 'success' : 'destructive'} className="text-xs">
                      {dashboard.kpis.criticalRisksStatus}
                    </Badge>
                  </div>

                  {/* Micro-copy */}
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Target: <span className="text-green-600">0</span> critical risks
                    </p>
                    <p className={`text-xs ${
                      dashboard.kpis.criticalRisksOpen === 0 ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {dashboard.kpis.criticalRisksOpen === 0
                        ? '✓ All critical risks mitigated!'
                        : 'Immediate action required'}
                    </p>
                  </div>

                  <Link href="/risks" className="block mt-3">
                    <Button
                      size="sm"
                      variant={dashboard.kpis.criticalRisksOpen > 0 ? 'destructive' : 'ghost'}
                      className="w-full text-xs"
                    >
                      {dashboard.kpis.criticalRisksOpen > 0 ? 'FIX NOW →' : 'VIEW DETAILS →'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <Separator className="my-4" />

            {/* Additional KPIs Row */}
            <div className="grid sm:grid-cols-3 gap-4">
              {/* Assessment Completion */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Enesehindamine</span>
                  <Badge variant="outline">{dashboard.kpis.assessmentCompletionPercentage}%</Badge>
                </div>
                <Progress value={dashboard.kpis.assessmentCompletionPercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {assessment.progress}/40 küsimust
                </p>
              </div>

              {/* Documents Approved */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Kinnitatud dokumendid</span>
                  <Badge variant="outline">{dashboard.kpis.documentsApprovedPercentage}%</Badge>
                </div>
                <Progress value={dashboard.kpis.documentsApprovedPercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {documents.approved}/{documents.total} dokumendist
                </p>
              </div>

              {/* Compliance Deadline */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">NIS2 tähtaeg</span>
                  <Badge variant={
                    dashboard.kpis.deadlineStatus === 'Möödunud' ? 'destructive' :
                    dashboard.kpis.deadlineStatus === 'Kriitiline' ? 'destructive' :
                    dashboard.kpis.deadlineStatus === 'Läheneb' ? 'warning' :
                    'secondary'
                  }>
                    {dashboard.kpis.deadlineStatus}
                  </Badge>
                </div>
                <p className="text-sm font-semibold">
                  {dashboard.kpis.daysUntilDeadline < 0 ?
                    `${Math.abs(dashboard.kpis.daysUntilDeadline)} päeva tagasi` :
                    `${dashboard.kpis.daysUntilDeadline} päeva jäänud`
                  }
                </p>
                <p className="text-xs text-muted-foreground">
                  Tähtaeg: 17. oktoober 2024
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* INSIGHTS & RECOMMENDATIONS PANEL */}
        <Card className="mb-6 border-2 border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 opacity-0 animate-slide-up animate-delay-300">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <CardTitle className="text-indigo-900 dark:text-indigo-100">INSIGHTS & RECOMMENDATIONS</CardTitle>
            </div>
            <CardDescription>Smart analysis of your compliance status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Main insight - Score analysis */}
            {kpis.overallComplianceScore < 70 && (
              <div className="p-4 bg-white rounded-lg border border-amber-200">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-900 mb-2">
                      Your compliance score ({kpis.overallComplianceScore}%) is below target level (70%)
                    </p>
                    <p className="text-sm text-amber-800 mb-3">Here's the breakdown:</p>
                    <div className="space-y-2 text-sm">
                      {kpis.assessmentCompletionPercentage < 100 && (
                        <div className="flex items-center gap-2">
                          <span className="text-amber-600">•</span>
                          <span className="text-amber-900">
                            Assessment incomplete (-{Math.round((100 - kpis.assessmentCompletionPercentage) * 0.4)}%)
                          </span>
                        </div>
                      )}
                      {kpis.criticalRisksOpen > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-red-600">•</span>
                          <span className="text-amber-900">
                            Critical risks open (-{Math.round(kpis.criticalRisksOpen * 5)}%)
                          </span>
                        </div>
                      )}
                      {kpis.documentationCompleteness < 100 && (
                        <div className="flex items-center gap-2">
                          <span className="text-amber-600">•</span>
                          <span className="text-amber-900">
                            Documentation missing (-{Math.round((100 - kpis.documentationCompleteness) * 0.3)}%)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Win recommendation */}
            {(() => {
              // Calculate the best quick win
              const assessmentGain = (100 - kpis.assessmentCompletionPercentage) * 0.4;
              const docsGain = (100 - kpis.documentationCompleteness) * 0.3;
              const risksGain = kpis.risksMitigatedPercentage < 100 ? (100 - kpis.risksMitigatedPercentage) * 0.3 : 0;

              let quickWin = null;
              if (assessmentGain > docsGain && assessmentGain > risksGain && kpis.assessmentCompletionPercentage < 100) {
                quickWin = {
                  action: 'Complete the assessment',
                  gain: Math.round(assessmentGain),
                  newScore: Math.min(100, kpis.overallComplianceScore + Math.round(assessmentGain)),
                  time: '~25 min',
                  link: '/assessment'
                };
              } else if (docsGain > risksGain && kpis.documentationCompleteness < 100) {
                quickWin = {
                  action: 'Generate missing documents',
                  gain: Math.round(docsGain),
                  newScore: Math.min(100, kpis.overallComplianceScore + Math.round(docsGain)),
                  time: '~15 min',
                  link: '/documents'
                };
              } else if (kpis.criticalRisksOpen > 0) {
                quickWin = {
                  action: 'Mitigate critical risks',
                  gain: Math.round(kpis.criticalRisksOpen * 5),
                  newScore: Math.min(100, kpis.overallComplianceScore + Math.round(kpis.criticalRisksOpen * 5)),
                  time: '~2 hours',
                  link: '/risks'
                };
              }

              return quickWin ? (
                <div className="p-4 bg-white rounded-lg border-2 border-blue-300">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎯</span>
                    <div className="flex-1">
                      <p className="font-semibold text-blue-900 mb-2">Quick Win</p>
                      <p className="text-sm text-blue-800 mb-3">
                        {quickWin.action} to boost your score to{' '}
                        <span className="font-bold text-blue-600">{quickWin.newScore}%</span>{' '}
                        <span className="text-green-600">(+{quickWin.gain}%)</span> in {quickWin.time}
                      </p>
                      <Link href={quickWin.link}>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Take Action →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null;
            })()}

            {/* Benchmarking insight */}
            <div className="p-4 bg-white rounded-lg border border-indigo-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div className="flex-1">
                  <p className="font-semibold text-indigo-900 mb-2">Industry Benchmark</p>
                  <p className="text-sm text-indigo-800">
                    Similar companies ({sectorLabels[org.sector] || org.sector}, {org.employeeCount} employees)
                    average <span className="font-bold text-indigo-600">68% compliance</span>
                  </p>
                  {kpis.overallComplianceScore < 68 ? (
                    <p className="text-xs text-amber-700 mt-2">
                      You're currently {68 - kpis.overallComplianceScore}% below industry average
                    </p>
                  ) : (
                    <p className="text-xs text-green-700 mt-2">
                      ✓ You're {kpis.overallComplianceScore - 68}% above industry average!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Success message when doing well */}
            {kpis.overallComplianceScore >= 70 && (
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🏆</span>
                  <div className="flex-1">
                    <p className="font-bold text-green-900 text-lg mb-1">Excellent Progress!</p>
                    <p className="text-sm text-green-800">
                      You've reached {kpis.overallComplianceScore}% compliance - well above the target level.
                      Keep up the great work maintaining your NIS2 compliance.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-6 opacity-0 animate-slide-up animate-delay-400">
          {/* Assessment Progress */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Enesehindamine
              </CardTitle>
              <span className="text-2xl">📊</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{assessment.progress}/{assessment.total}</div>
              <Progress value={completionPercentage} className="mb-2" />
              <p className="text-xs text-muted-foreground">
                {completionPercentage}% vastatud
              </p>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Dokumendid
              </CardTitle>
              <span className="text-2xl">📄</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{documents.total}</div>
              <div className="flex gap-2 text-xs">
                <Badge variant="success">{documents.approved} kinnitatud</Badge>
                <Badge variant="secondary">{documents.draft} mustand</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tegevuskava
              </CardTitle>
              <span className="text-2xl">✅</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                {actionItemsStats.completed}/{actionItemsStats.total}
              </div>
              <Progress
                value={(actionItemsStats.completed / actionItemsStats.total) * 100}
                className="mb-2"
              />
              <p className="text-xs text-muted-foreground">
                {actionItemsStats.pending} ootab täitmist
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Kiirtoimingud</CardTitle>
            <CardDescription>Alusta oma NIS2 vastavuse teekonda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/assessment">
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-2">📋</div>
                    <h3 className="font-semibold mb-1">Enesehindamine</h3>
                    <p className="text-xs text-muted-foreground">
                      Hinda oma praegust seisu
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/documents">
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-2">📑</div>
                    <h3 className="font-semibold mb-1">Genereeri dokumendid</h3>
                    <p className="text-xs text-muted-foreground">
                      Poliitikad ja protseduurid
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/risks">
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-2">⚠️</div>
                    <h3 className="font-semibold mb-1">Riskihaldus</h3>
                    <p className="text-xs text-muted-foreground">
                      Tuvasta ja halda riske
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/chat">
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-2">💬</div>
                    <h3 className="font-semibold mb-1">AI Abi</h3>
                    <p className="text-xs text-muted-foreground">
                      Küsi NIS2 kohta
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* COMPLIANCE JOURNEY - GAMIFIED */}
        <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 opacity-0 animate-slide-up animate-delay-500">
          <CardHeader>
            <CardTitle className="text-purple-900 dark:text-purple-100">YOUR PATH TO NIS2 COMPLIANCE</CardTitle>
            <CardDescription>Complete all 5 stages to achieve full compliance 🏆</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Visual Progress Timeline */}
            <div className="mb-8">
              <div className="flex items-center justify-between max-w-3xl mx-auto">
                {/* Step indicators */}
                <div className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      ✓
                    </div>
                    <span className="text-xs mt-1 font-medium text-green-700">Done</span>
                  </div>
                  <div className="flex-1 h-1 bg-green-500"></div>
                </div>
                <div className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg ${
                      assessment.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-500 text-white animate-pulse'
                    }`}>
                      {assessment.status === 'completed' ? '✓' : '●'}
                    </div>
                    <span className={`text-xs mt-1 font-medium ${
                      assessment.status === 'completed' ? 'text-green-700' : 'text-blue-700'
                    }`}>
                      {assessment.status === 'completed' ? 'Done' : 'Here'}
                    </span>
                  </div>
                  <div className={`flex-1 h-1 ${
                    assessment.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                </div>
                <div className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      documents.total >= 3
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-300 text-gray-500'
                    }`}>
                      {documents.total >= 6 ? '✓' : '○'}
                    </div>
                    <span className="text-xs mt-1 font-medium text-gray-600">Next</span>
                  </div>
                  <div className="flex-1 h-1 bg-gray-300"></div>
                </div>
                <div className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold text-lg">
                      ○
                    </div>
                    <span className="text-xs mt-1 font-medium text-gray-600">Locked</span>
                  </div>
                  <div className="flex-1 h-1 bg-gray-300"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold text-lg">
                    ○
                  </div>
                  <span className="text-xs mt-1 font-medium text-gray-600">Locked</span>
                </div>
              </div>
            </div>

            {/* Detailed Steps */}
            <div className="space-y-4">
              {/* Step 1 - Onboarding */}
              <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl">
                      ✓
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">[1] Onboarding</h3>
                      <Badge variant="success">100% complete</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Profile filled. NIS2 directive applies to your organization.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-green-700">
                      <span>🏆</span>
                      <span className="font-medium">Achievement unlocked: First Steps!</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 - Assessment */}
              <div className={`p-4 rounded-lg border-2 ${
                assessment.status === 'completed'
                  ? 'bg-white border-green-300'
                  : 'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                      assessment.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-500 text-white animate-pulse'
                    }`}>
                      {assessment.status === 'completed' ? '✓' : '●'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">[2] Assessment</h3>
                      <Badge variant={assessment.status === 'completed' ? 'success' : 'default'}>
                        {completionPercentage}% complete
                      </Badge>
                    </div>
                    {assessment.status === 'completed' ? (
                      <>
                        <p className="text-sm text-muted-foreground mb-2">
                          Completed! Your score: {assessment.score}%
                        </p>
                        <div className="flex items-center gap-2 text-xs text-green-700">
                          <span>🎖️</span>
                          <span className="font-medium">Achievement unlocked: Self-Awareness Master!</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-3">
                          <Progress value={completionPercentage} className="h-2 mb-1" />
                          <p className="text-xs text-muted-foreground">
                            {assessment.progress}/40 questions answered
                          </p>
                        </div>
                        <p className="text-sm text-blue-700 mb-3">
                          🎯 Est. {Math.ceil((40 - assessment.progress) * 1.5)} min remaining
                        </p>
                        <Link href="/assessment">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            CONTINUE →
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 3 - Risk Management */}
              <div className={`p-4 rounded-lg border-2 ${
                assessment.status === 'completed' && risks.total > 0
                  ? 'bg-white border-blue-300'
                  : 'bg-gray-50 border-gray-300'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                      assessment.status === 'completed' && risks.total > 0
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-500'
                    }`}>
                      {risks.mitigated > 0 ? '●' : assessment.status === 'completed' ? '○' : '🔒'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-bold text-lg ${
                        assessment.status !== 'completed' ? 'text-muted-foreground' : ''
                      }`}>
                        [3] Risk Management {assessment.status !== 'completed' ? '🔒' : ''}
                      </h3>
                      {risks.total > 0 && (
                        <Badge variant="outline">
                          {risks.mitigated}/{risks.total} mitigated
                        </Badge>
                      )}
                    </div>
                    {assessment.status !== 'completed' ? (
                      <p className="text-sm text-muted-foreground">
                        Unlocks when assessment reaches 80%
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground mb-2">
                          Identify and mitigate cybersecurity risks
                        </p>
                        <Link href="/risks">
                          <Button size="sm" variant="outline">
                            Manage Risks →
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 4 - Documentation */}
              <div className={`p-4 rounded-lg border-2 ${
                documents.total >= 3
                  ? 'bg-white border-blue-300'
                  : 'bg-gray-50 border-gray-300'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                      documents.total >= 6
                        ? 'bg-green-500 text-white'
                        : documents.total >= 3
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-500'
                    }`}>
                      {documents.total >= 6 ? '✓' : documents.total >= 3 ? '●' : '🔒'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-bold text-lg ${
                        documents.total < 3 ? 'text-muted-foreground' : ''
                      }`}>
                        [4] Documentation {documents.total < 3 ? '🔒' : ''}
                      </h3>
                      <Badge variant={documents.total >= 6 ? 'success' : 'outline'}>
                        {documents.total}/6 complete
                      </Badge>
                    </div>
                    {documents.total < 3 ? (
                      <p className="text-sm text-muted-foreground">
                        Unlocks when you have 3+ documents
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground mb-2">
                          Generate and approve required compliance documents
                        </p>
                        <Link href="/documents">
                          <Button size="sm" variant="outline">
                            Manage Documents →
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 5 - Monitoring */}
              <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center text-2xl">
                      🔒
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg text-muted-foreground">[5] Continuous Monitoring 🔒</h3>
                      <Badge variant="outline">Locked</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Unlocks when compliance score reaches 70%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
  );
}
