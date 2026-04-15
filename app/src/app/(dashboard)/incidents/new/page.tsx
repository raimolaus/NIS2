'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Textarea,
  Badge,
  Spinner,
  Toaster,
} from '@/components/ui';

type IncidentType = 'availability' | 'integrity' | 'confidentiality' | 'authenticity';
type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';

export default function NewIncidentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<IncidentType>('availability');
  const [severity, setSeverity] = useState<SeverityLevel>('medium');
  const [affectedSystems, setAffectedSystems] = useState('');
  const [affectedUsers, setAffectedUsers] = useState('');
  const [dataImpact, setDataImpact] = useState(false);
  const [crossBorder, setCrossBorder] = useState(false);
  const [discoveredAt, setDiscoveredAt] = useState('');
  const [reportedBy, setReportedBy] = useState('');

  // Auto-severity state
  const [suggestedSeverity, setSuggestedSeverity] = useState<SeverityLevel | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/incidents-mock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          type,
          severity,
          affectedSystems: affectedSystems.split('\n').filter(s => s.trim()),
          affectedUsers: affectedUsers ? parseInt(affectedUsers) : null,
          dataImpact,
          crossBorder,
          discoveredAt: discoveredAt || undefined,
          reportedBy: reportedBy || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Midagi läks valesti');
      }

      toast({
        title: 'Intsident registreeritud!',
        description: data.requiresNIS2Reporting
          ? `${data.message}. NIS2 raporteerimise tähtajad on määratud.`
          : data.message,
      });

      // Redirect to incidents list or detail page
      router.push('/incidents');
    } catch (error) {
      console.error('Incident registration error:', error);
      toast({
        title: 'Viga',
        description: error instanceof Error ? error.message : 'Midagi läks valesti',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to get severity badge color
  const getSeverityColor = (sev: SeverityLevel) => {
    switch (sev) {
      case 'critical':
        return 'bg-red-600 text-white';
      case 'high':
        return 'bg-orange-600 text-white';
      case 'medium':
        return 'bg-yellow-600 text-white';
      case 'low':
        return 'bg-blue-600 text-white';
    }
  };

  // Helper to get type label
  const getTypeLabel = (t: IncidentType) => {
    switch (t) {
      case 'availability':
        return 'Kättesaadavus';
      case 'integrity':
        return 'Terviklikkus';
      case 'confidentiality':
        return 'Konfidentsiaalsus';
      case 'authenticity':
        return 'Autentsus';
    }
  };

  // Calculate suggested severity based on impact assessment
  const calculateSuggestedSeverity = (): SeverityLevel => {
    const systemsCount = affectedSystems.split('\n').filter(s => s.trim()).length;
    const usersCount = affectedUsers ? parseInt(affectedUsers) : 0;

    // Critical: 5+ systems OR 1000+ users OR (data impact AND cross-border) OR (confidentiality type AND data impact)
    if (
      systemsCount >= 5 ||
      usersCount >= 1000 ||
      (dataImpact && crossBorder) ||
      (type === 'confidentiality' && dataImpact)
    ) {
      return 'critical';
    }

    // High: 3+ systems OR 100+ users OR data impact OR cross-border OR availability type
    if (
      systemsCount >= 3 ||
      usersCount >= 100 ||
      dataImpact ||
      crossBorder ||
      type === 'availability'
    ) {
      return 'high';
    }

    // Medium: 1-2 systems OR 10-99 users OR integrity/authenticity type
    if (
      systemsCount >= 1 ||
      usersCount >= 10 ||
      type === 'integrity' ||
      type === 'authenticity'
    ) {
      return 'medium';
    }

    // Low: everything else
    return 'low';
  };

  // Auto-calculate severity when impact assessment changes
  useEffect(() => {
    const suggested = calculateSuggestedSeverity();
    setSuggestedSeverity(suggested);
  }, [affectedSystems, affectedUsers, dataImpact, crossBorder, type]);

  const applySuggestedSeverity = () => {
    if (suggestedSeverity) {
      setSeverity(suggestedSeverity);
      toast({
        title: 'Raskusaste rakendatud',
        description: `Automaatne raskusaste "${suggestedSeverity === 'critical' ? 'Kriitiline' : suggestedSeverity === 'high' ? 'Kõrge' : suggestedSeverity === 'medium' ? 'Keskmine' : 'Madal'}" on rakendatud.`,
      });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Uue intsidendi registreerimine</h1>
        <p className="text-muted-foreground mt-2">
          Registreeri uus turvaolukorra rikkumine vastavalt NIS2 direktiivile
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Põhiandmed</CardTitle>
            <CardDescription>
              Intsidendi esmased andmed ja kirjeldus
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Pealkiri *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nt: DDoS rünnak põhiteenusele"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Kirjeldus *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailne intsidendi kirjeldus: mis juhtus, millal, kuidas avastati..."
                rows={5}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reportedBy">Teataja</Label>
                <Input
                  id="reportedBy"
                  value={reportedBy}
                  onChange={(e) => setReportedBy(e.target.value)}
                  placeholder="Nt: Jaan Tamm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Jäta tühjaks kui soovid kasutada vaikimisi väärtust
                </p>
              </div>

              <div>
                <Label htmlFor="discoveredAt">Avastamise aeg</Label>
                <Input
                  id="discoveredAt"
                  type="datetime-local"
                  value={discoveredAt}
                  onChange={(e) => setDiscoveredAt(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Jäta tühjaks kui avastati praegu
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Klassifikatsioon</CardTitle>
            <CardDescription>
              Intsidendi tüüp ja raskusaste vastavalt NIS2 artiklile 23
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Intsidendi tüüp *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {(['availability', 'integrity', 'confidentiality', 'authenticity'] as IncidentType[]).map((t) => (
                  <Button
                    key={t}
                    type="button"
                    variant={type === t ? 'default' : 'outline'}
                    onClick={() => setType(t)}
                    className="justify-start"
                  >
                    {getTypeLabel(t)}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <strong>Kättesaadavus:</strong> Teenuse katkestus, DDoS<br />
                <strong>Terviklikkus:</strong> Andmete muutmine, manipuleerimine<br />
                <strong>Konfidentsiaalsus:</strong> Andmeleke, volitamata juurdepääs<br />
                <strong>Autentsus:</strong> Identiteedivargus, volitamata tegevused
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Raskusaste *</Label>
                {suggestedSeverity && suggestedSeverity !== severity && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={applySuggestedSeverity}
                    className="text-xs"
                  >
                    💡 Rakenda soovitatud:{' '}
                    <Badge className={`${getSeverityColor(suggestedSeverity)} ml-2`}>
                      {suggestedSeverity === 'critical' ? 'Kriitiline' : suggestedSeverity === 'high' ? 'Kõrge' : suggestedSeverity === 'medium' ? 'Keskmine' : 'Madal'}
                    </Badge>
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {(['critical', 'high', 'medium', 'low'] as SeverityLevel[]).map((sev) => (
                  <Button
                    key={sev}
                    type="button"
                    variant={severity === sev ? 'default' : 'outline'}
                    onClick={() => setSeverity(sev)}
                    className={`justify-start ${suggestedSeverity === sev && severity !== sev ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
                  >
                    <Badge className={`${getSeverityColor(sev)} mr-2`}>
                      {sev === 'critical' ? 'Kriitiline' : sev === 'high' ? 'Kõrge' : sev === 'medium' ? 'Keskmine' : 'Madal'}
                    </Badge>
                    {suggestedSeverity === sev && severity !== sev && (
                      <span className="ml-auto text-xs">💡</span>
                    )}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <strong>Kriitiline:</strong> Täielik teenuse katkestus, suur andmeleke<br />
                <strong>Kõrge:</strong> Oluline mõju teenusele või andmetele<br />
                <strong>Keskmine:</strong> Osaliline mõju<br />
                <strong>Madal:</strong> Minimaalne mõju
              </p>
              {suggestedSeverity && (
                <p className="text-xs text-blue-600 mt-2">
                  ℹ️ Mõju hindamise põhjal soovitame kasutada raskusastet: <strong>{suggestedSeverity === 'critical' ? 'Kriitiline' : suggestedSeverity === 'high' ? 'Kõrge' : suggestedSeverity === 'medium' ? 'Keskmine' : 'Madal'}</strong>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Mõju hindamine</CardTitle>
            <CardDescription>
              Hinda intsidendi mõju süsteemidele ja kasutajatele
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="affectedSystems">Mõjutatud süsteemid</Label>
              <Textarea
                id="affectedSystems"
                value={affectedSystems}
                onChange={(e) => setAffectedSystems(e.target.value)}
                placeholder="Üks süsteem rea kohta, nt:&#10;Veebiserver&#10;Andmebaasiserver&#10;E-posti süsteem"
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Kirjuta iga süsteem eraldi reale
              </p>
            </div>

            <div>
              <Label htmlFor="affectedUsers">Mõjutatud kasutajate arv</Label>
              <Input
                id="affectedUsers"
                type="number"
                value={affectedUsers}
                onChange={(e) => setAffectedUsers(e.target.value)}
                placeholder="Nt: 150"
                min="0"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="dataImpact"
                  checked={dataImpact}
                  onChange={(e) => setDataImpact(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="dataImpact" className="font-normal cursor-pointer">
                  <strong>Andmete kahjustus või leke</strong>
                  <p className="text-xs text-muted-foreground">
                    Kas intsident hõlmab isikuandmete või tundliku teabe kahjustamist/lekkimist?
                  </p>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="crossBorder"
                  checked={crossBorder}
                  onChange={(e) => setCrossBorder(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="crossBorder" className="font-normal cursor-pointer">
                  <strong>Piiriülene mõju</strong>
                  <p className="text-xs text-muted-foreground">
                    Kas intsident mõjutab ka teiste liikmesriikide teenuseid või kasutajaid?
                  </p>
                </Label>
              </div>
            </div>

            {(severity === 'critical' || (severity === 'high' && (dataImpact || crossBorder))) && (
              <div className="bg-orange-50 border border-orange-200 rounded-md p-4 mt-4">
                <div className="flex items-start">
                  <svg
                    className="h-5 w-5 text-orange-600 mt-0.5 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-semibold text-orange-800">
                      NIS2 raporteerimise kohustus
                    </h4>
                    <p className="text-sm text-orange-700 mt-1">
                      See intsident nõuab CERT.EE-le raporteerimist järgmiste tähtaegadega:
                    </p>
                    <ul className="text-sm text-orange-700 mt-2 space-y-1 list-disc list-inside">
                      <li><strong>Varajane hoiatus:</strong> 24 tunni jooksul avastamisest</li>
                      <li><strong>Intsidenditeatatis:</strong> 72 tunni jooksul</li>
                      <li><strong>Lõpparuanne:</strong> 1 kuu jooksul</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Tühista
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Registreerin...
              </>
            ) : (
              '🚨 Registreeri intsident'
            )}
          </Button>
        </div>
      </form>

      <Toaster />
    </div>
  );
}
