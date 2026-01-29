'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DOCUMENT_TEMPLATES } from '@/lib/documents/types';
import type { Organization, Document } from '@prisma/client';

export default function DocumentsPage() {
  const [org, setOrg] = useState<Organization | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [orgRes, docsRes] = await Promise.all([
        fetch('/api/profile'),
        fetch('/api/documents'),
      ]);

      const orgData = await orgRes.json();
      const docsData = await docsRes.json();

      if (orgData.organization) setOrg(orgData.organization);
      if (docsData.documents) setDocuments(docsData.documents);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (type: string) => {
    if (!org) return;

    // TEMPORARY: Plan checks disabled - no payment integration yet
    // const template = DOCUMENT_TEMPLATES.find((t) => t.type === type);
    // if (!template) return;

    // if (org.plan === 'free') {
    //   alert('Uuenda STARTER või PROFESSIONAL plaanile dokumentide genereerimiseks');
    //   return;
    // }

    // if (template.plan === 'professional' && org.plan !== 'professional') {
    //   alert('See dokument on saadaval ainult PROFESSIONAL paketis');
    //   return;
    // }

    setGenerating(type);
    try {
      const res = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });

      if (res.ok) {
        const data = await res.json();
        setDocuments((prev) => [...prev.filter((d) => d.type !== type), data.document]);
        alert('Dokument edukalt genereeritud!');
      } else {
        const error = await res.json();
        alert(error.error || 'Genereerimine ebaõnnestus');
      }
    } catch (error) {
      console.error('Failed to generate:', error);
      alert('Genereerimine ebaõnnestus');
    } finally {
      setGenerating(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Laen...</div>
      </div>
    );
  }

  const getDocument = (type: string) => {
    return documents.find((d) => d.type === type);
  };

  const canGenerate = (templatePlan: 'starter' | 'professional') => {
    // TEMPORARY: All documents available - no payment integration yet
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N2</span>
                </div>
                <span className="font-bold text-xl">NIS2 Abimees</span>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Dashboard
                </Link>
                <Link
                  href="/assessment"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Enesehindamine
                </Link>
                <Link
                  href="/documents"
                  className="text-primary-600 font-semibold border-b-2 border-primary-600 pb-1"
                >
                  Dokumendid
                </Link>
                <Link
                  href="/risks"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Riskihaldus
                </Link>
                <Link
                  href="/chat"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  AI Vestlus
                </Link>
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Profiil
                </Link>
              </nav>
            </div>
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Tagasi
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">NIS2 Dokumendid</h1>
          <p className="text-gray-600">
            Genereeri ja halda NIS2 direktiivi kohustuslikke dokumente
          </p>
        </div>

        {/* Documents grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCUMENT_TEMPLATES.map((template) => {
            const doc = getDocument(template.type);
            const isAvailable = canGenerate(template.plan);
            const isGenerating = generating === template.type;

            return (
              <div
                key={template.type}
                className={`bg-white rounded-lg shadow hover:shadow-lg transition ${
                  !isAvailable ? 'opacity-60' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{template.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {template.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {template.titleEn}
                        </p>
                      </div>
                    </div>
                    {!isAvailable && (
                      <div className="text-gray-400">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Status */}
                  <div className="mb-4">
                    {doc ? (
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            doc.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {doc.status === 'approved' ? '✓ Kinnitatud' : '📝 Mustand'}
                        </span>
                        <span className="text-xs text-gray-500">
                          v{doc.version}
                        </span>
                      </div>
                    ) : (
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                        Ei ole loodud
                      </span>
                    )}
                  </div>

                  {/* Plan badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        template.plan === 'starter'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {template.plan === 'starter' ? 'STARTER+' : 'PROFESSIONAL'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {doc ? (
                      <>
                        <Link
                          href={`/documents/${doc.id}`}
                          className="flex-1 px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition text-center"
                        >
                          Vaata
                        </Link>
                        <button
                          onClick={() => handleGenerate(template.type)}
                          disabled={isGenerating}
                          className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                        >
                          {isGenerating ? 'Genereerin...' : '🔄 Uuenda'}
                        </button>
                        <Link
                          href={`/documents/${doc.id}/edit`}
                          className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition text-center"
                        >
                          ✏️ Muuda
                        </Link>
                      </>
                    ) : (
                      <button
                        onClick={() => handleGenerate(template.type)}
                        disabled={!isAvailable || isGenerating}
                        className="flex-1 px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGenerating ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Genereerin...
                          </span>
                        ) : !isAvailable ? (
                          `🔒 ${template.plan === 'professional' ? 'PROFESSIONAL' : 'STARTER'} pakett`
                        ) : (
                          'Genereeri dokument'
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}
