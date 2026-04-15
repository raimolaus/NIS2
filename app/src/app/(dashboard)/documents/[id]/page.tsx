'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Textarea,
  Input,
  Label,
} from '@/components/ui';

interface CompanyData {
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
  companySnapshot?: CompanyData | null;
}

export default function DocumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [documentId, setDocumentId] = useState<string | null>(null);

  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Edit form state
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // Company data for version control
  const [currentCompanyData, setCurrentCompanyData] = useState<CompanyData | null>(null);
  const [isDocumentOutdated, setIsDocumentOutdated] = useState(false);

  // Resolve params and load document
  useEffect(() => {
    params.then((p) => {
      setDocumentId(p.id);
      loadDocument(p.id);
    });
  }, [params]);

  // Load current company data and check if document is outdated
  useEffect(() => {
    const loadCompanyData = async () => {
      try {
        const response = await fetch('/api/company-mock');
        if (response.ok) {
          const data = await response.json();
          setCurrentCompanyData(data.company);

          // Check if document is outdated
          if (document && document.companySnapshot && data.company) {
            const isOutdated = checkIfCompanyDataChanged(
              document.companySnapshot,
              data.company
            );
            setIsDocumentOutdated(isOutdated);
          }
        }
      } catch (error) {
        console.error('Error loading company data:', error);
      }
    };

    loadCompanyData();
  }, [document]);

  // Helper function to check if company data has changed
  const checkIfCompanyDataChanged = (
    snapshot: CompanyData,
    current: CompanyData
  ): boolean => {
    // Check critical fields that affect document content
    return (
      snapshot.name !== current.name ||
      snapshot.regCode !== current.regCode ||
      snapshot.address !== current.address ||
      snapshot.ceo?.name !== current.ceo?.name ||
      snapshot.ciso?.name !== current.ciso?.name ||
      snapshot.itManager?.name !== current.itManager?.name ||
      snapshot.dataProtectionOfficer?.name !== current.dataProtectionOfficer?.name ||
      JSON.stringify(snapshot.systems) !== JSON.stringify(current.systems)
    );
  };

  const loadDocument = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/documents-mock/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          alert('Dokumenti ei leitud');
          router.push('/documents');
          return;
        }
        throw new Error('Dokumendi laadimine ebaõnnestus');
      }

      const data = await response.json();
      setDocument(data.document);
      setEditTitle(data.document.title);
      setEditContent(data.document.content);
    } catch (error) {
      console.error('Error loading document:', error);
      alert('Viga dokumendi laadimisel');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!document || !documentId) return;

    try {
      setSaving(true);

      const response = await fetch(`/api/documents-mock/${documentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Salvestamine ebaõnnestus');
      }

      const data = await response.json();
      setDocument(data.document);
      setEditMode(false);
      alert('Dokument edukalt salvestatud!');
    } catch (error) {
      console.error('Error saving document:', error);
      alert('Viga dokumendi salvestamisel');
    } finally {
      setSaving(false);
    }
  };

  const handleApprove = async () => {
    if (!document || !documentId) return;

    if (!confirm('Kas oled kindel, et soovid selle dokumendi kinnitada?')) {
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`/api/documents-mock/${documentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'approved',
        }),
      });

      if (!response.ok) {
        throw new Error('Kinnitamine ebaõnnestus');
      }

      const data = await response.json();
      setDocument(data.document);
      alert('Dokument edukalt kinnitatud!');
    } catch (error) {
      console.error('Error approving document:', error);
      alert('Viga dokumendi kinnitamisel');
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async () => {
    if (!document || !documentId) return;

    if (!confirm('Kas oled kindel, et soovid selle dokumendi arhiveerida?')) {
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`/api/documents-mock/${documentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'archived',
        }),
      });

      if (!response.ok) {
        throw new Error('Arhiveerimine ebaõnnestus');
      }

      const data = await response.json();
      setDocument(data.document);
      alert('Dokument arhiveeritud');
    } catch (error) {
      console.error('Error archiving document:', error);
      alert('Viga dokumendi arhiveerimisel');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!document || !documentId) return;

    if (!confirm('Kas oled kindel, et soovid selle dokumendi kustutada? Seda ei saa tagasi võtta.')) {
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`/api/documents-mock/${documentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Kustutamine ebaõnnestus');
      }

      alert('Dokument kustutatud');
      router.push('/documents');
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Viga dokumendi kustutamisel');
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (!document) return;
    setEditTitle(document.title);
    setEditContent(document.content);
    setEditMode(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRegenerate = async () => {
    if (!document || !documentId) return;

    if (!confirm('Kas oled kindel? See genereerib dokumendi uuesti värskete ettevõtte andmetega. Praegune sisu kirjutatakse üle.')) {
      return;
    }

    try {
      setSaving(true);

      const response = await fetch('/api/documents-mock/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateType: document.type,
          title: document.title,
          includeAssessmentData: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Genereerimine ebaõnnestus');
      }

      // Reload document
      await loadDocument(documentId);
      setIsDocumentOutdated(false);
      alert('Dokument edukalt regenereeritud värskete ettevõtte andmetega!');
    } catch (error) {
      console.error('Error regenerating document:', error);
      alert('Viga dokumendi genereerimisel');
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link href="/documents" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">N2</span>
              </div>
              <span className="font-bold text-xl">NIS2 Abimees</span>
            </Link>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <div className="text-6xl mb-4">⏳</div>
              <h3 className="text-xl font-semibold mb-2">
                Laadin dokumenti...
              </h3>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // Not found
  if (!document) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link href="/documents" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">N2</span>
              </div>
              <span className="font-bold text-xl">NIS2 Abimees</span>
            </Link>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-xl font-semibold mb-2">
                Dokumenti ei leitud
              </h3>
              <Button asChild className="mt-4">
                <Link href="/documents">Tagasi dokumentide lehele</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/documents" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">N2</span>
              </div>
              <span className="font-bold text-xl">NIS2 Abimees</span>
            </Link>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">← Tagasi</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Document Header */}
        <Card className="mb-6 print:shadow-none">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {editMode ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="title">Dokumendi pealkiri</Label>
                      <Input
                        id="title"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="text-2xl font-bold h-auto py-2"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <CardTitle className="text-3xl mb-2">{document.title}</CardTitle>
                    <CardDescription>
                      Versioon {document.version} • Loodud {new Date(document.createdAt).toLocaleDateString('et-EE')}
                    </CardDescription>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <Badge
                  variant={
                    document.status === 'approved'
                      ? 'success'
                      : document.status === 'draft'
                      ? 'warning'
                      : 'secondary'
                  }
                  className="w-fit"
                >
                  {document.status === 'approved' && '✓ Kinnitatud'}
                  {document.status === 'draft' && '📝 Mustand'}
                  {document.status === 'archived' && '📦 Arhiveeritud'}
                </Badge>
                <Badge variant="outline" className="w-fit">
                  v{document.version}
                </Badge>
              </div>
            </div>

            {document.approvedAt && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
                <span className="font-semibold">Kinnitatud:</span>{' '}
                {new Date(document.approvedAt).toLocaleDateString('et-EE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            )}
          </CardHeader>

          <CardContent className="print:hidden">
            <div className="flex gap-2 flex-wrap">
              {!editMode && document.status !== 'archived' && (
                <>
                  <Button
                    onClick={() => setEditMode(true)}
                    variant="outline"
                  >
                    ✏️ Muuda
                  </Button>
                  {document.status === 'draft' && (
                    <Button
                      onClick={handleApprove}
                      disabled={saving}
                    >
                      {saving ? 'Kinnitan...' : '✓ Kinnita dokument'}
                    </Button>
                  )}
                  <Button
                    onClick={handleArchive}
                    variant="outline"
                    disabled={saving}
                  >
                    📦 Arhiveeri
                  </Button>
                </>
              )}
              {editMode && (
                <>
                  <Button
                    onClick={handleSave}
                    disabled={saving || !editTitle.trim() || !editContent.trim()}
                  >
                    {saving ? 'Salvestan...' : '💾 Salvesta'}
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    variant="outline"
                    disabled={saving}
                  >
                    Tühista
                  </Button>
                </>
              )}
              <Button
                onClick={handleDelete}
                variant="destructive"
                disabled={saving}
              >
                🗑️ Kustuta
              </Button>
              {document.status === 'approved' && !editMode && (
                <>
                  <Button variant="outline" onClick={handlePrint}>
                    🖨️ Prindi / Salvesta PDF
                  </Button>
                  <Button variant="outline" disabled>
                    📥 Lae alla DOCX
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Outdated Document Warning Banner */}
        {isDocumentOutdated && document?.companySnapshot && !editMode && (
          <Card className="mt-6 bg-amber-50 border-amber-300 dark:bg-amber-950 dark:border-amber-800 print:hidden">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="text-4xl">⚠️</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    Ettevõtte andmed on muutunud
                  </h3>
                  <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                    Käesolev dokument on genereeritud vanade ettevõtte andmetega. Pärast dokumendi loomist on muudetud ettevõtte nime, kontakte või muid olulisi andmeid. Soovitame dokumendi regenereerida värskete andmetega.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleRegenerate}
                      disabled={saving}
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      {saving ? '🔄 Genereerin...' : '🔄 Regenereeri dokument'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-amber-300"
                    >
                      <Link href="/company">Vaata ettevõtte andmeid</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Separator className="my-6 print:hidden" />

        {/* Document Content */}
        <Card className="print:shadow-none">
          <CardHeader className="print:hidden">
            <CardTitle>Dokumendi sisu</CardTitle>
            <CardDescription>
              {editMode
                ? 'Muuda dokumendi sisu. Markdown formaat on toetatud.'
                : 'Dokumendi täistekst'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {editMode ? (
              <div>
                <Label htmlFor="content">Sisu (Markdown)</Label>
                <Textarea
                  id="content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={20}
                  className="font-mono"
                  placeholder="# Pealkiri&#10;&#10;Sisu tuleb siia..."
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Kasuta Markdown süntaksit: # pealkiri, **bold**, *italic*, jne.
                </p>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg print:bg-transparent print:p-0">
                  {document.content}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Metadata */}
        <Card className="mt-6 print:hidden">
          <CardHeader>
            <CardTitle className="text-lg">Metaandmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Dokumendi ID:</span>
                <p className="text-muted-foreground">{document.id}</p>
              </div>
              <div>
                <span className="font-semibold">Dokumendi tüüp:</span>
                <p className="text-muted-foreground">{document.type}</p>
              </div>
              <div>
                <span className="font-semibold">Loodud:</span>
                <p className="text-muted-foreground">
                  {new Date(document.createdAt).toLocaleString('et-EE')}
                </p>
              </div>
              <div>
                <span className="font-semibold">Uuendatud:</span>
                <p className="text-muted-foreground">
                  {new Date(document.updatedAt).toLocaleString('et-EE')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Card */}
        {document.status === 'draft' && !editMode && (
          <Card className="mt-6 bg-blue-50 border-blue-200 print:hidden">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="text-3xl">💡</div>
                <div>
                  <h3 className="font-semibold mb-2">Järgmised sammud</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Vaata dokumendi sisu üle ja muuda vajadusel</li>
                    <li>• Kui dokument on valmis, vajuta "Kinnita dokument"</li>
                    <li>• Kinnitatud dokumente saab printida või salvestada PDF-ina</li>
                    <li>• Arhiveeritud dokumente saab taastada vajaduse korral</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Print footer */}
        <div className="hidden print:block mt-8 text-sm text-muted-foreground text-center">
          <Separator className="mb-4" />
          <p>Dokument genereeritud NIS2 Abimees platvormil</p>
          <p>{new Date(document.createdAt).toLocaleDateString('et-EE')}</p>
        </div>
      </main>
    </div>
  );
}
