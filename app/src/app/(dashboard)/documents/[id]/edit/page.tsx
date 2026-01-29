'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';

interface Document {
  id: string;
  title: string;
  type: string;
  version: string;
  status: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function DocumentEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [document, setDocument] = useState<Document | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [docId, setDocId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  useEffect(() => {
    params.then((p) => {
      setDocId(p.id);
      loadDocument(p.id);
    });
  }, [params]);

  const loadDocument = async (id: string) => {
    try {
      const res = await fetch(`/api/documents/${id}`);
      if (res.ok) {
        const data = await res.json();
        setDocument(data.document);
        setContent(data.document.content);
      } else {
        alert('Dokumenti ei leitud');
        router.push('/documents');
      }
    } catch (error) {
      console.error('Failed to load document:', error);
      alert('Laadimine ebaõnnestus');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!docId) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/documents/${docId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (res.ok) {
        alert('Dokument salvestatud!');
        router.push(`/documents/${docId}`);
      } else {
        alert('Salvestamine ebaõnnestus');
      }
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Salvestamine ebaõnnestus');
    } finally {
      setSaving(false);
    }
  };

  const handleAIAssist = async () => {
    if (!aiPrompt.trim()) {
      alert('Palun sisesta küsimus või juhend AI assistendile');
      return;
    }

    setAiLoading(true);
    setAiResponse('');

    try {
      const res = await fetch('/api/documents/ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          prompt: aiPrompt,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiResponse(data.response);
      } else {
        alert('AI assistent ebaõnnestus');
      }
    } catch (error) {
      console.error('AI assist failed:', error);
      alert('AI assistent ebaõnnestus');
    } finally {
      setAiLoading(false);
    }
  };

  const applyAISuggestion = () => {
    if (aiResponse) {
      setContent(aiResponse);
      setAiResponse('');
      setAiPrompt('');
      alert('AI ettepanek rakendatud!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Laen...</div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Dokumenti ei leitud</div>
      </div>
    );
  }

  const htmlContent = marked(content);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={`/documents/${docId}`}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                ← Tagasi
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Muuda: {document.title}</h1>
                <p className="text-sm text-gray-600">
                  Versioon {document.version}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition"
              >
                {showPreview ? '📝 Redigeerimine' : '👁️ Eelvaade'}
              </button>
              <button
                onClick={() => setShowAI(!showAI)}
                className="px-4 py-2 border border-primary-600 text-primary-600 text-sm font-semibold rounded-lg hover:bg-primary-50 transition"
              >
                🤖 AI Abi
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
              >
                {saving ? 'Salvestan...' : '💾 Salvesta'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Main editor area */}
          <div className="flex-1">
            {showPreview ? (
              <div className="bg-white rounded-lg shadow-lg p-12">
                <div
                  className="prose prose-lg max-w-none text-gray-900
                           prose-headings:text-gray-900
                           prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:border-b prose-h1:border-gray-300 prose-h1:pb-4 prose-h1:text-gray-900
                           prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-gray-900
                           prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-gray-800
                           prose-p:text-gray-800 prose-p:leading-relaxed
                           prose-strong:text-gray-900 prose-strong:font-semibold
                           prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                           prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                           prose-li:text-gray-800 prose-li:my-1
                           prose-table:my-6 prose-table:border-collapse prose-table:w-full
                           prose-thead:bg-gray-100
                           prose-th:bg-gray-100 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:border prose-th:border-gray-300 prose-th:text-gray-900
                           prose-td:p-3 prose-td:border prose-td:border-gray-300 prose-td:text-gray-800
                           [&_*]:text-gray-800"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dokumendi sisu (Markdown)
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Kasuta Markdown vormingut: # päis, ## alapäis, **paks tekst**, - loetelu
                  </p>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-[calc(100vh-280px)] px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                  placeholder="Dokumendi sisu..."
                />
              </div>
            )}
          </div>

          {/* AI Assistant sidebar */}
          {showAI && (
            <div className="w-96 bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">AI Assistent</h2>
                <button
                  onClick={() => setShowAI(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mida soovid muuta?
                  </label>
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="w-full h-32 px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                    placeholder="Näiteks: 'Tee 2. peatükk sujuvamaks' või 'Paranda õigekirja' või 'Lisa rohkem detaile turvaanalüüsi kohta'"
                  />
                </div>

                <button
                  onClick={handleAIAssist}
                  disabled={aiLoading || !aiPrompt.trim()}
                  className="w-full px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
                >
                  {aiLoading ? 'AI mõtleb...' : '✨ Genereeri ettepanek'}
                </button>

                {aiResponse && (
                  <div className="mt-4 space-y-3">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-blue-900 mb-2">
                        AI ettepanek:
                      </h3>
                      <div className="text-sm text-blue-800 max-h-96 overflow-y-auto">
                        <pre className="whitespace-pre-wrap font-mono text-xs">
                          {aiResponse}
                        </pre>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={applyAISuggestion}
                        className="flex-1 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition"
                      >
                        ✓ Rakenda
                      </button>
                      <button
                        onClick={() => {
                          setAiResponse('');
                          setAiPrompt('');
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition"
                      >
                        ✕ Loobu
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Kiirtegevused:
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setAiPrompt('Paranda õigekirjavead ja grammatika')}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      📝 Paranda õigekiri
                    </button>
                    <button
                      onClick={() => setAiPrompt('Tee tekst lihtsamaks ja arusaadavamaks')}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      ✏️ Lihtsusta teksti
                    </button>
                    <button
                      onClick={() => setAiPrompt('Tee tekst formaalsemaks ja professionaalsemaks')}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      👔 Formaalse stiili
                    </button>
                    <button
                      onClick={() => setAiPrompt('Lisa rohkem detaile ja selgitusi')}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      📚 Lisa detaile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
