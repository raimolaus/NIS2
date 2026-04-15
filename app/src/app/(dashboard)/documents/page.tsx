'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Separator,
  Progress,
  Toaster,
  ToastAction,
  Spinner,
} from '@/components/ui';
import { useToast } from '@/hooks/use-toast';

// Mock document templates
const DOCUMENT_TEMPLATES = [
  {
    type: 'policy',
    title: 'Infoturbepoliitika',
    titleEn: 'Information Security Policy',
    description: 'Organisatsiooni infoturbe eesmärgid, põhimõtted ja vastutused',
    icon: '📋',
    plan: 'starter' as const,
    priority: 1,
    estimatedTime: '2-3h',
    importance: 'critical' as const,
  },
  {
    type: 'risk_assessment',
    title: 'Riskihinnang',
    titleEn: 'Risk Assessment',
    description: 'IT süsteemide ja andmete riskianalüüs ning turvameetmed',
    icon: '⚖️',
    plan: 'starter' as const,
    priority: 2,
    estimatedTime: '3-4h',
    importance: 'critical' as const,
  },
  {
    type: 'incident_response',
    title: 'Intsidentide haldus',
    titleEn: 'Incident Response Plan',
    description: 'Turvaingidentide tuvastamine, reageerimine ja taastamine',
    icon: '🚨',
    plan: 'starter' as const,
    priority: 3,
    estimatedTime: '2-3h',
    importance: 'critical' as const,
  },
  {
    type: 'business_continuity',
    title: 'Tegevuse jätkuvuse plaan',
    titleEn: 'Business Continuity Plan',
    description: 'Kriitiliste protsesside jätkamine kriisiolukordades',
    icon: '🔄',
    plan: 'professional' as const,
    priority: 4,
    estimatedTime: '4-5h',
    importance: 'high' as const,
  },
  {
    type: 'supply_chain',
    title: 'Tarneahela turvalisus',
    titleEn: 'Supply Chain Security',
    description: 'Kolmandate osapoolte ja tarnijate turvanõuded',
    icon: '🔗',
    plan: 'professional' as const,
    priority: 5,
    estimatedTime: '2-3h',
    importance: 'high' as const,
  },
  {
    type: 'training',
    title: 'Koolitusprogramm',
    titleEn: 'Training Program',
    description: 'Töötajate infoturbe teadlikkuse tõstmine',
    icon: '🎓',
    plan: 'professional' as const,
    priority: 6,
    estimatedTime: '3-4h',
    importance: 'medium' as const,
  },
  {
    type: 'data_protection',
    title: 'Andmekaitse kord',
    titleEn: 'Data Protection Policy',
    description: 'Isikuandmete töötlemine vastavalt GDPR ja NIS2 nõuetele',
    icon: '🔒',
    plan: 'professional' as const,
    priority: 7,
    estimatedTime: '3-4h',
    importance: 'critical' as const,
  },
  {
    type: 'backup_recovery',
    title: 'Varundamise ja taastamise plaan',
    titleEn: 'Backup & Recovery Plan',
    description: 'Andmete varukoopiate tegemine ja kiire taastamine',
    icon: '💾',
    plan: 'starter' as const,
    priority: 8,
    estimatedTime: '2-3h',
    importance: 'critical' as const,
  },
  {
    type: 'access_control',
    title: 'Ligipääsukontrolli poliitika',
    titleEn: 'Access Control Policy',
    description: 'Kasutajate õigused, MFA ja autentimise reeglid',
    icon: '🔐',
    plan: 'professional' as const,
    priority: 9,
    estimatedTime: '2-3h',
    importance: 'high' as const,
  },
  {
    type: 'network_security',
    title: 'Võrguturvalisuse plaan',
    titleEn: 'Network Security Plan',
    description: 'Tulemüürid, IDS/IPS, võrgusegmenteerimine',
    icon: '🛡️',
    plan: 'professional' as const,
    priority: 10,
    estimatedTime: '4-5h',
    importance: 'high' as const,
  },
];

interface Document {
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
}

export default function DocumentsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'approved' | 'archived'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'status'>('date');

  // Fetch documents on mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/documents-mock');

      if (!response.ok) {
        throw new Error('Dokumente ei õnnestunud laadida');
      }

      const data = await response.json();
      setDocuments(data.documents || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      alert('Viga dokumentide laadimisel. Kontrolli konsoolisõnumeid.');
    } finally {
      setLoading(false);
    }
  };

  const getDocument = (type: string) => {
    return documents.find((d) => d.type === type);
  };

  const handleGenerate = async (type: string) => {
    setGenerating(type);

    try {
      // Get template info
      const template = DOCUMENT_TEMPLATES.find(t => t.type === type);
      if (!template) {
        throw new Error('Malli ei leitud');
      }

      // Call the new generate endpoint with company data auto-fill
      const response = await fetch('/api/documents-mock/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateType: type,
          title: template.title,
          includeAssessmentData: type === 'risk_assessment', // Include assessment data for risk documents
        }),
      });

      if (!response.ok) {
        const error = await response.json();

        // Handle missing company data error
        if (error.errorCode === 'COMPANY_DATA_MISSING') {
          toast({
            title: "Ettevõtte andmed puuduvad",
            description: error.error,
            variant: "destructive",
            action: (
              <ToastAction altText="Mine profiili lehele" onClick={() => router.push('/company')}>
                Mine profiili lehele
              </ToastAction>
            ),
          });
          return;
        }

        throw new Error(error.error || 'Dokumendi genereerimine ebaõnnestus');
      }

      const data = await response.json();
      const generatedDoc = data.document;

      // Update local state
      const existingDoc = getDocument(type);
      if (existingDoc) {
        setDocuments(docs => docs.map(d => d.type === type ? generatedDoc : d));
      } else {
        setDocuments(docs => [...docs, generatedDoc]);
      }

      // Show success message and navigate to document
      const actionText = data.action === 'updated' ? 'uuendatud' : 'loodud';
      toast({
        title: `Dokument ${actionText}!`,
        description: `Dokument "${generatedDoc.title}" on ${actionText} ettevõtte andmetega.`,
        action: (
          <ToastAction altText="Vaata dokumenti" onClick={() => router.push(`/documents/${generatedDoc.id}`)}>
            Vaata
          </ToastAction>
        ),
      });
    } catch (error) {
      console.error('Error generating document:', error);
      toast({
        title: "Viga",
        description: error instanceof Error ? error.message : 'Viga dokumendi genereerimisel',
        variant: "destructive",
      });
    } finally {
      setGenerating(null);
    }
  };

  const documentCount = documents.length;
  const approvedCount = documents.filter(d => d.status === 'approved').length;
  const draftCount = documents.filter(d => d.status === 'draft').length;
  const completionPercent = Math.round((documentCount / DOCUMENT_TEMPLATES.length) * 100);
  const missingCount = DOCUMENT_TEMPLATES.length - documentCount;

  // Get next priority document to create
  const nextPriority = DOCUMENT_TEMPLATES
    .filter(t => !getDocument(t.type))
    .sort((a, b) => a.priority - b.priority)[0];

  // Filter and sort templates
  const filteredTemplates = DOCUMENT_TEMPLATES.filter(template => {
    const doc = getDocument(template.type);

    // Filter by status
    if (statusFilter === 'all') return true;
    if (statusFilter === 'draft') return doc?.status === 'draft';
    if (statusFilter === 'approved') return doc?.status === 'approved';
    if (statusFilter === 'archived') return doc?.status === 'archived';
    return true;
  }).sort((a, b) => {
    const docA = getDocument(a.type);
    const docB = getDocument(b.type);

    // Sort logic
    if (sortBy === 'name') {
      return a.title.localeCompare(b.title, 'et');
    }
    if (sortBy === 'date') {
      const dateA = docA ? new Date(docA.createdAt).getTime() : 0;
      const dateB = docB ? new Date(docB.createdAt).getTime() : 0;
      return dateB - dateA; // Newest first
    }
    if (sortBy === 'status') {
      const statusOrder = { approved: 0, draft: 1, archived: 2 };
      const statusA = docA ? statusOrder[docA.status] || 3 : 3;
      const statusB = docB ? statusOrder[docB.status] || 3 : 3;
      return statusA - statusB;
    }
    return 0;
  });

  return (
    <>
      {/* Page Header */}
      <div className="mb-6 opacity-0 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">NIS2 Dokumendid</h1>
        <p className="text-muted-foreground">
          Genereeri ja halda NIS2 direktiivi kohustuslikke dokumente
        </p>
      </div>

      {/* Enhanced KPI Cards - Dashboard Style */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Completion Score */}
        <Card className="hover:shadow-lg transition-shadow opacity-0 animate-slide-up border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Komplektsus
            </CardTitle>
            <span className="text-2xl">📊</span>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2">{completionPercent}%</div>
            <div className="relative h-3 bg-muted rounded-full mb-2">
              <div
                className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all"
                style={{ width: `${completionPercent}%` }}
              />
              {/* Target line at 100% */}
              <div className="absolute right-0 h-full w-0.5 bg-green-500" />
            </div>
            <p className="text-xs text-muted-foreground">
              {completionPercent < 100 ? `Gap: ${missingCount} docs to 100%` : '✓ All documents created'}
            </p>
            <Button size="sm" variant="ghost" className="w-full mt-2 h-8 text-xs" asChild>
              <Link href="#templates">VIEW DETAILS →</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Total Documents */}
        <Card className="hover:shadow-lg transition-shadow opacity-0 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Kokku dokumente
            </CardTitle>
            <span className="text-2xl">📄</span>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2">{documentCount}</div>
            <p className="text-xs text-muted-foreground mb-3">
              {DOCUMENT_TEMPLATES.length} malli saadaval
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Trend:</span>
              <span className="text-green-600">↗️</span>
            </div>
          </CardContent>
        </Card>

        {/* Approved */}
        <Card className="hover:shadow-lg transition-shadow opacity-0 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Kinnitatud
            </CardTitle>
            <span className="text-2xl">✅</span>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2 text-green-600">{approvedCount}</div>
            <div className="relative h-3 bg-muted rounded-full mb-2">
              <div
                className="absolute h-full bg-green-500 rounded-full transition-all"
                style={{ width: `${(approvedCount / DOCUMENT_TEMPLATES.length) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {approvedCount === DOCUMENT_TEMPLATES.length ? 'Perfect compliance!' : `${DOCUMENT_TEMPLATES.length - approvedCount} need approval`}
            </p>
          </CardContent>
        </Card>

        {/* Drafts */}
        <Card className="hover:shadow-lg transition-shadow opacity-0 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Mustandid
            </CardTitle>
            <span className="text-2xl">📝</span>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2 text-amber-600">{draftCount}</div>
            <p className="text-xs text-muted-foreground mb-3">
              Vajab läbivaatamist
            </p>
            {draftCount > 0 && (
              <Button size="sm" variant="outline" className="w-full h-8 text-xs border-amber-600 text-amber-700 hover:bg-amber-50">
                REVIEW NOW →
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Document Completeness Timeline */}
      <Card className="mb-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 border-2 border-primary/20 opacity-0 animate-slide-up" style={{ animationDelay: '400ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🎯</span>
            Document Journey Progress
          </CardTitle>
          <CardDescription>
            Your path to complete NIS2 documentation compliance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Visual Timeline */}
          <div className="flex items-center justify-between mb-4">
            {DOCUMENT_TEMPLATES.slice(0, 8).map((template, idx) => {
              const doc = getDocument(template.type);
              const isCompleted = !!doc;
              const isApproved = doc?.status === 'approved';

              return (
                <div key={template.type} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                      ${isApproved ? 'bg-green-500 text-white' :
                        isCompleted ? 'bg-amber-500 text-white' :
                        'bg-gray-200 dark:bg-gray-700 text-gray-400'}
                      transition-all
                    `}>
                      {isApproved ? '✓' : isCompleted ? template.icon : idx + 1}
                    </div>
                    <p className="text-xs mt-2 text-center max-w-[50px] line-clamp-2">
                      {template.title.split(' ').slice(0, 2).join(' ')}
                    </p>
                  </div>
                  {idx < 7 && (
                    <div className={`
                      h-1 w-8 mx-0.5
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-3 bg-white dark:bg-slate-900 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
              <p className="text-xs text-muted-foreground">✓ Completed</p>
            </div>
            <div className="text-center p-3 bg-white dark:bg-slate-900 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">{draftCount}</div>
              <p className="text-xs text-muted-foreground">📝 In Progress</p>
            </div>
            <div className="text-center p-3 bg-white dark:bg-slate-900 rounded-lg">
              <div className="text-2xl font-bold text-gray-400">{missingCount}</div>
              <p className="text-xs text-muted-foreground">🔒 Not Started</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights & Priority Queue */}
      {nextPriority && (
        <Card className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-2 border-purple-200 dark:border-purple-800 opacity-0 animate-slide-up" style={{ animationDelay: '500ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>💡</span>
              AI Recommendations & Priority Queue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Next Priority */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{nextPriority.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{nextPriority.title}</h3>
                    <Badge variant="destructive" className="text-xs">PRIORITY #{nextPriority.priority}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {nextPriority.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span>⏱️ Est. time: {nextPriority.estimatedTime}</span>
                    <span>📌 {nextPriority.importance === 'critical' ? '🔴 Critical' : nextPriority.importance === 'high' ? '🟠 High' : '🟡 Medium'}</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleGenerate(nextPriority.type)}
                    disabled={generating === nextPriority.type}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {generating === nextPriority.type ? (
                      <>
                        <Spinner className="mr-2 h-4 w-4" />
                        Genereerin...
                      </>
                    ) : (
                      '✨ Generate This Document First'
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Wins */}
            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <span>🎯</span> Quick Win Strategy
              </p>
              <p className="text-xs text-muted-foreground">
                Start with "{nextPriority.title}" - it's critical for compliance and has dependencies with other documents. Completing this unlocks faster progress on the remaining {missingCount - 1} documents.
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
              Laadin dokumente...
            </h3>
          </CardContent>
        </Card>
      ) : (
        <>
          <div id="templates" className="mb-4">
            <h2 className="text-2xl font-bold">Document Templates</h2>
            <p className="text-sm text-muted-foreground">Choose a template to generate or manage</p>
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Olek:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                >
                  Kõik
                </Button>
                <Button
                  size="sm"
                  variant={statusFilter === 'draft' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('draft')}
                >
                  Mustand
                </Button>
                <Button
                  size="sm"
                  variant={statusFilter === 'approved' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('approved')}
                >
                  Kinnitatud
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sorteeri:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={sortBy === 'date' ? 'default' : 'outline'}
                  onClick={() => setSortBy('date')}
                >
                  Kuupäev
                </Button>
                <Button
                  size="sm"
                  variant={sortBy === 'name' ? 'default' : 'outline'}
                  onClick={() => setSortBy('name')}
                >
                  Nimi
                </Button>
                <Button
                  size="sm"
                  variant={sortBy === 'status' ? 'default' : 'outline'}
                  onClick={() => setSortBy('status')}
                >
                  Olek
                </Button>
              </div>
            </div>
          </div>

          {/* Documents grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template, idx) => {
              const doc = getDocument(template.type);
              const isGenerating = generating === template.type;
              const isProfessional = template.plan === 'professional';
              const isApproved = doc?.status === 'approved';
              const isDraft = doc?.status === 'draft';

              return (
                <Card
                  key={template.type}
                  className={`
                    hover:shadow-xl hover:-translate-y-1 transition-all duration-300 opacity-0 animate-slide-up
                    ${isApproved ? 'border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950' :
                      isDraft ? 'border-2 border-amber-500 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950' :
                      'hover:border-primary'}
                  `}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{template.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">
                              {template.title}
                            </CardTitle>
                            {template.priority <= 3 && (
                              <Badge variant="destructive" className="text-xs h-5">
                                P{template.priority}
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-xs mt-1">
                            {template.titleEn}
                          </CardDescription>
                        </div>
                      </div>
                    </div>

                    <CardDescription className="line-clamp-2">
                      {template.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {/* Status */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {doc ? (
                        <>
                          <Badge
                            variant={isApproved ? 'success' : 'warning'}
                            className="font-semibold"
                          >
                            {isApproved ? '✓ Kinnitatud' : '📝 Mustand'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            v{doc.version}
                          </span>
                        </>
                      ) : (
                        <Badge variant="secondary" className="bg-gray-200 dark:bg-gray-800">
                          🔒 Ei ole loodud
                        </Badge>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>⏱️ {template.estimatedTime}</span>
                      <span>•</span>
                      <Badge
                        variant={isProfessional ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {isProfessional ? 'PRO' : 'STARTER'}
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      {doc ? (
                        <>
                          <Button size="sm" className="flex-1" asChild>
                            <Link href={`/documents/${doc.id}`}>
                              {isApproved ? '👁️ View' : '✏️ Edit'}
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleGenerate(template.type)}
                            disabled={isGenerating}
                            className="hover:border-primary"
                          >
                            {isGenerating ? '...' : '🔄'}
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                          onClick={() => handleGenerate(template.type)}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <Spinner className="mr-2 h-4 w-4" />
                              Genereerin...
                            </>
                          ) : (
                            '✨ Genereeri'
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Help text */}
          <Card className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="text-3xl">💡</div>
                <div>
                  <h3 className="font-semibold mb-2">Kuidas see töötab?</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Vajuta "Genereeri" nuppu AI-põhise dokumendi loomiseks</li>
                    <li>• AI kasutab teie enesehindamise vastuseid ja organisatsiooni andmeid</li>
                    <li>• Saate dokumenti vaadata, redigeerida ja kinnitada</li>
                    <li>• Kinnitatud dokumendid on allalaetavad PDF ja DOCX formaadis</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
      <Toaster />
    </>
  );
}
