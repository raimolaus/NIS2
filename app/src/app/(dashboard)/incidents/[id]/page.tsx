'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Spinner,
  Toaster,
  Separator,
  Input,
  Label,
  Textarea,
} from '@/components/ui';

interface Incident {
  id: string;
  organizationId: string;
  title: string;
  description: string;
  type: 'availability' | 'integrity' | 'confidentiality' | 'authenticity';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'new' | 'investigating' | 'contained' | 'resolved' | 'reported' | 'closed';
  discoveredAt: string;
  reportedAt: string | null;
  containedAt: string | null;
  resolvedAt: string | null;
  affectedSystems: string[];
  affectedUsers: number | null;
  dataImpact: boolean;
  crossBorder: boolean;
  earlyWarningDeadline: string | null;
  notificationDeadline: string | null;
  finalReportDeadline: string | null;
  earlyWarningSent: boolean;
  notificationSent: boolean;
  finalReportSent: boolean;
  evidence: Array<{
    id: string;
    type: 'log' | 'screenshot' | 'document' | 'other';
    description: string;
    fileUrl: string | null;
    collectedAt: string;
  }>;
  rootCause: string | null;
  lessonsLearned: string | null;
  preventiveMeasures: string | null;
  certCaseNumber: string | null;
  reportedBy: string;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function IncidentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  // Evidence collection state
  const [showEvidenceForm, setShowEvidenceForm] = useState(false);
  const [evidenceType, setEvidenceType] = useState<'log' | 'screenshot' | 'document' | 'other'>('log');
  const [evidenceDescription, setEvidenceDescription] = useState('');
  const [isAddingEvidence, setIsAddingEvidence] = useState(false);

  useEffect(() => {
    fetchIncident();
  }, [params.id]);

  const fetchIncident = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/incidents-mock');
      const data = await response.json();

      if (response.ok) {
        const foundIncident = data.incidents.find((inc: Incident) => inc.id === params.id);
        if (foundIncident) {
          setIncident(foundIncident);
        } else {
          toast({
            title: 'Viga',
            description: 'Intsidenti ei leitud',
            variant: 'destructive',
          });
          router.push('/incidents');
        }
      }
    } catch (error) {
      console.error('Error fetching incident:', error);
      toast({
        title: 'Viga',
        description: 'Midagi läks valesti',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateReport = async (reportType: 'early-warning' | 'notification' | 'final') => {
    if (!incident) return;

    setIsGenerating(reportType);
    try {
      const response = await fetch('/api/incidents-mock/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incidentId: incident.id,
          reportType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Midagi läks valesti');
      }

      // Create a downloadable file
      const blob = new Blob([data.content], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = data.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: 'Raport genereeritud!',
        description: `${data.reportTitle} on edukalt genereeritud ja alla laetud.`,
      });

      // Refresh incident to update report status
      fetchIncident();
    } catch (error) {
      console.error('Report generation error:', error);
      toast({
        title: 'Viga',
        description: error instanceof Error ? error.message : 'Midagi läks valesti',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(null);
    }
  };

  const handleAddEvidence = async () => {
    if (!incident || !evidenceDescription.trim()) {
      toast({
        title: 'Viga',
        description: 'Palun lisa tõendi kirjeldus',
        variant: 'destructive',
      });
      return;
    }

    setIsAddingEvidence(true);
    try {
      const newEvidence = {
        id: String(Date.now()),
        type: evidenceType,
        description: evidenceDescription,
        fileUrl: null,
        collectedAt: new Date().toISOString(),
      };

      const response = await fetch('/api/incidents-mock', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: incident.id,
          evidence: [...incident.evidence, newEvidence],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Midagi läks valesti');
      }

      toast({
        title: 'Tõend lisatud!',
        description: 'Tõend on edukalt lisatud intsidendile.',
      });

      // Reset form and refresh incident
      setEvidenceDescription('');
      setShowEvidenceForm(false);
      fetchIncident();
    } catch (error) {
      console.error('Evidence addition error:', error);
      toast({
        title: 'Viga',
        description: error instanceof Error ? error.message : 'Midagi läks valesti',
        variant: 'destructive',
      });
    } finally {
      setIsAddingEvidence(false);
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-600 text-white">Kriitiline</Badge>;
      case 'high':
        return <Badge className="bg-orange-600 text-white">Kõrge</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-600 text-white">Keskmine</Badge>;
      case 'low':
        return <Badge className="bg-blue-600 text-white">Madal</Badge>;
      default:
        return <Badge>{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-purple-600 text-white">Uus</Badge>;
      case 'investigating':
        return <Badge className="bg-blue-600 text-white">Uurimisel</Badge>;
      case 'contained':
        return <Badge className="bg-yellow-600 text-white">Piiratud</Badge>;
      case 'resolved':
        return <Badge className="bg-green-600 text-white">Lahendatud</Badge>;
      case 'reported':
        return <Badge className="bg-indigo-600 text-white">Raporteeritud</Badge>;
      case 'closed':
        return <Badge className="bg-gray-600 text-white">Suletud</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'availability':
        return <Badge variant="outline">Kättesaadavus</Badge>;
      case 'integrity':
        return <Badge variant="outline">Terviklikkus</Badge>;
      case 'confidentiality':
        return <Badge variant="outline">Konfidentsiaalsus</Badge>;
      case 'authenticity':
        return <Badge variant="outline">Autentsus</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('et-EE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getDeadlineStatus = (deadline: string | null) => {
    if (!deadline) return null;

    const now = new Date();
    const deadlineDate = new Date(deadline);
    const hoursRemaining = (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursRemaining < 0) {
      return { text: 'Tähtaeg möödas', color: 'text-red-600', bgColor: 'bg-red-50 border-red-200', urgent: true };
    } else if (hoursRemaining < 6) {
      return { text: `${Math.round(hoursRemaining)}h jäänud`, color: 'text-orange-600', bgColor: 'bg-orange-50 border-orange-200', urgent: true };
    } else if (hoursRemaining < 24) {
      return { text: `${Math.round(hoursRemaining)}h jäänud`, color: 'text-yellow-600', bgColor: 'bg-yellow-50 border-yellow-200', urgent: false };
    } else {
      const daysRemaining = Math.round(hoursRemaining / 24);
      return { text: `${daysRemaining}p jäänud`, color: 'text-gray-600', bgColor: 'bg-gray-50 border-gray-200', urgent: false };
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (!incident) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/incidents" className="text-sm text-muted-foreground hover:text-foreground mb-2 inline-block">
          ← Tagasi intsidentide juurde
        </Link>
        <div className="flex justify-between items-start mt-2">
          <div>
            <h1 className="text-3xl font-bold">{incident.title}</h1>
            <div className="flex gap-2 mt-2">
              {getSeverityBadge(incident.severity)}
              {getStatusBadge(incident.status)}
              {getTypeBadge(incident.type)}
              {incident.dataImpact && (
                <Badge variant="outline" className="border-red-300 text-red-700">
                  Andmeleke
                </Badge>
              )}
              {incident.crossBorder && (
                <Badge variant="outline" className="border-orange-300 text-orange-700">
                  Piiriülene
                </Badge>
              )}
            </div>
          </div>
          {incident.certCaseNumber && (
            <div className="text-right">
              <div className="text-sm text-muted-foreground">CERT.EE juhtum</div>
              <div className="text-lg font-semibold">{incident.certCaseNumber}</div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Kirjeldus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{incident.description}</p>
            </CardContent>
          </Card>

          {/* Visual Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Intsidendi elutsükkel</CardTitle>
              <CardDescription>Visuaalne ajatelg kõigi oluliste sündmustega</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-8 space-y-6">
                {/* Timeline line */}
                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200"></div>

                {/* Discovered */}
                <div className="relative">
                  <div className="absolute left-[-2rem] top-1 w-6 h-6 rounded-full bg-purple-600 border-4 border-background flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🔍</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-purple-900">Avastatud</span>
                      <span className="text-xs text-muted-foreground">{formatDate(incident.discoveredAt)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Intsident tuvastati ja registreeriti</p>
                  </div>
                </div>

                {/* Reported */}
                {incident.reportedAt ? (
                  <div className="relative">
                    <div className="absolute left-[-2rem] top-1 w-6 h-6 rounded-full bg-blue-600 border-4 border-background flex items-center justify-center">
                      <span className="text-white text-xs font-bold">📢</span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-blue-900">Raporteeritud</span>
                        <span className="text-xs text-muted-foreground">{formatDate(incident.reportedAt)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">CERT.EE-le raporteerimise protsess algatatud</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative opacity-50">
                    <div className="absolute left-[-2rem] top-1 w-6 h-6 rounded-full bg-gray-300 border-4 border-background"></div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Raporteerimist ootel</span>
                    </div>
                  </div>
                )}

                {/* Contained */}
                {incident.containedAt ? (
                  <div className="relative">
                    <div className="absolute left-[-2rem] top-1 w-6 h-6 rounded-full bg-yellow-600 border-4 border-background flex items-center justify-center">
                      <span className="text-white text-xs font-bold">🛡️</span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-yellow-900">Piiratud</span>
                        <span className="text-xs text-muted-foreground">{formatDate(incident.containedAt)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Intsident lokaliseeritud ja kahjulik tegevus peatatud</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative opacity-50">
                    <div className="absolute left-[-2rem] top-1 w-6 h-6 rounded-full bg-gray-300 border-4 border-background"></div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Piiramist ootel</span>
                    </div>
                  </div>
                )}

                {/* Resolved */}
                {incident.resolvedAt ? (
                  <div className="relative">
                    <div className="absolute left-[-2rem] top-1 w-6 h-6 rounded-full bg-green-600 border-4 border-background flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-green-900">Lahendatud</span>
                        <span className="text-xs text-muted-foreground">{formatDate(incident.resolvedAt)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Intsident täielikult lahendatud ja teenused taastatud</p>
                      <div className="mt-2 text-xs text-green-700 font-medium">
                        Lahendusaeg: {Math.round((new Date(incident.resolvedAt).getTime() - new Date(incident.discoveredAt).getTime()) / (1000 * 60 * 60))}h
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative opacity-50">
                    <div className="absolute left-[-2rem] top-1 w-6 h-6 rounded-full bg-gray-300 border-4 border-background"></div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Lahendamist ootel</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Current status indicator */}
              <div className="mt-6 p-3 bg-gray-50 rounded-md border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Praegune olek:</span>
                  {getStatusBadge(incident.status)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Mõju</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {incident.affectedSystems.length > 0 && (
                <div>
                  <div className="text-sm font-medium mb-1">Mõjutatud süsteemid:</div>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {incident.affectedSystems.map((system, idx) => (
                      <li key={idx}>{system}</li>
                    ))}
                  </ul>
                </div>
              )}
              {incident.affectedUsers && (
                <div>
                  <div className="text-sm font-medium">Mõjutatud kasutajaid:</div>
                  <div className="text-sm text-muted-foreground">{incident.affectedUsers.toLocaleString('et-EE')}</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Evidence Collection */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tõendid</CardTitle>
                  <CardDescription>Kogutud tõendid ja dokumentatsioon</CardDescription>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowEvidenceForm(!showEvidenceForm)}
                >
                  {showEvidenceForm ? 'Tühista' : '+ Lisa tõend'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Add Evidence Form */}
              {showEvidenceForm && (
                <div className="mb-4 p-4 border rounded-md bg-gray-50">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="evidenceType">Tõendi tüüp</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {(['log', 'screenshot', 'document', 'other'] as const).map((type) => (
                          <Button
                            key={type}
                            type="button"
                            size="sm"
                            variant={evidenceType === type ? 'default' : 'outline'}
                            onClick={() => setEvidenceType(type)}
                          >
                            {type === 'log' ? '📝 Log' :
                             type === 'screenshot' ? '📸 Screenshot' :
                             type === 'document' ? '📄 Dokument' :
                             '📎 Muu'}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="evidenceDescription">Kirjeldus *</Label>
                      <Textarea
                        id="evidenceDescription"
                        value={evidenceDescription}
                        onChange={(e) => setEvidenceDescription(e.target.value)}
                        placeholder="Kirjelda tõendit: mida see sisaldab, millal ja kust koguti..."
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleAddEvidence}
                        disabled={isAddingEvidence || !evidenceDescription.trim()}
                      >
                        {isAddingEvidence ? (
                          <>
                            <Spinner className="mr-2 h-3 w-3" />
                            Lisan...
                          </>
                        ) : (
                          '✓ Lisa tõend'
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setShowEvidenceForm(false);
                          setEvidenceDescription('');
                        }}
                      >
                        Tühista
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Evidence List */}
              {incident.evidence.length > 0 ? (
                <div className="space-y-3">
                  {incident.evidence.map((ev, idx) => (
                    <div key={ev.id} className="border rounded-md p-3 hover:bg-gray-50">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {ev.type === 'log' ? '📝 Log' :
                               ev.type === 'screenshot' ? '📸 Screenshot' :
                               ev.type === 'document' ? '📄 Dokument' :
                               '📎 Muu'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(ev.collectedAt)}
                            </span>
                          </div>
                          <p className="text-sm">{ev.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="text-4xl mb-2">📋</div>
                  <p className="text-sm">Tõendeid pole veel kogutud</p>
                  <p className="text-xs mt-1">Kliki "Lisa tõend" et alustada tõendite kogumist</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* NIS2 Reporting */}
          {(incident.earlyWarningDeadline || incident.notificationDeadline || incident.finalReportDeadline) && (
            <Card>
              <CardHeader>
                <CardTitle>NIS2 Raporteerimise tähtajad</CardTitle>
                <CardDescription>CERT.EE raportid</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Early Warning */}
                {incident.earlyWarningDeadline && (
                  <div className={`border rounded-md p-3 ${getDeadlineStatus(incident.earlyWarningDeadline)?.bgColor || ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold">Varajane hoiatus</h4>
                      {incident.earlyWarningSent ? (
                        <Badge className="bg-green-600 text-white">✓ Saadetud</Badge>
                      ) : (
                        <Badge className={getDeadlineStatus(incident.earlyWarningDeadline)?.color}>
                          {getDeadlineStatus(incident.earlyWarningDeadline)?.text}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Tähtaeg: {formatDate(incident.earlyWarningDeadline)}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => generateReport('early-warning')}
                      disabled={isGenerating !== null}
                      className="w-full"
                    >
                      {isGenerating === 'early-warning' ? (
                        <>
                          <Spinner className="mr-2 h-3 w-3" />
                          Genereerin...
                        </>
                      ) : (
                        '📄 Genereeri raport'
                      )}
                    </Button>
                  </div>
                )}

                {/* Notification */}
                {incident.notificationDeadline && (
                  <div className={`border rounded-md p-3 ${getDeadlineStatus(incident.notificationDeadline)?.bgColor || ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold">Intsidenditeatatis</h4>
                      {incident.notificationSent ? (
                        <Badge className="bg-green-600 text-white">✓ Saadetud</Badge>
                      ) : (
                        <Badge className={getDeadlineStatus(incident.notificationDeadline)?.color}>
                          {getDeadlineStatus(incident.notificationDeadline)?.text}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Tähtaeg: {formatDate(incident.notificationDeadline)}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => generateReport('notification')}
                      disabled={isGenerating !== null}
                      className="w-full"
                    >
                      {isGenerating === 'notification' ? (
                        <>
                          <Spinner className="mr-2 h-3 w-3" />
                          Genereerin...
                        </>
                      ) : (
                        '📄 Genereeri raport'
                      )}
                    </Button>
                  </div>
                )}

                {/* Final Report */}
                {incident.finalReportDeadline && (
                  <div className={`border rounded-md p-3 ${getDeadlineStatus(incident.finalReportDeadline)?.bgColor || ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold">Lõpparuanne</h4>
                      {incident.finalReportSent ? (
                        <Badge className="bg-green-600 text-white">✓ Saadetud</Badge>
                      ) : (
                        <Badge className={getDeadlineStatus(incident.finalReportDeadline)?.color}>
                          {getDeadlineStatus(incident.finalReportDeadline)?.text}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Tähtaeg: {formatDate(incident.finalReportDeadline)}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => generateReport('final')}
                      disabled={isGenerating !== null}
                      className="w-full"
                    >
                      {isGenerating === 'final' ? (
                        <>
                          <Spinner className="mr-2 h-3 w-3" />
                          Genereerin...
                        </>
                      ) : (
                        '📄 Genereeri raport'
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Metaandmed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Teataja:</span> {incident.reportedBy}
              </div>
              {incident.assignedTo && (
                <div>
                  <span className="font-medium">Määratud:</span> {incident.assignedTo}
                </div>
              )}
              <div>
                <span className="font-medium">Loodud:</span> {formatDate(incident.createdAt)}
              </div>
              <div>
                <span className="font-medium">Uuendatud:</span> {formatDate(incident.updatedAt)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
