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

export default function DocumentViewPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [docId, setDocId] = useState<string | null>(null);

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

  const handleApprove = async () => {
    if (!docId) return;

    try {
      const res = await fetch(`/api/documents/${docId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (res.ok) {
        const data = await res.json();
        setDocument(data.document);
        alert('Dokument kinnitatud!');
      }
    } catch (error) {
      console.error('Failed to approve:', error);
      alert('Kinnitamine ebaõnnestus');
    }
  };

  const handlePrint = () => {
    window.print();
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

  // Convert Markdown to HTML
  const htmlContent = marked(document.content);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/documents"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                ← Tagasi dokumentidele
              </Link>
              <div>
                <h1 className="text-xl font-bold">{document.title}</h1>
                <p className="text-sm text-gray-600">
                  Versioon {document.version} •{' '}
                  <span
                    className={`${
                      document.status === 'approved'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {document.status === 'approved' ? 'Kinnitatud' : 'Mustand'}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {document.status === 'draft' && (
                <button
                  onClick={handleApprove}
                  className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition"
                >
                  ✓ Kinnita dokument
                </button>
              )}
              <button
                onClick={handlePrint}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition"
              >
                🖨️ Prindi / Salvesta PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Document content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-12 print:shadow-none print:p-0">
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
                     prose-hr:my-8 prose-hr:border-gray-300
                     prose-blockquote:border-l-4 prose-blockquote:border-primary-600 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700
                     prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-code:text-gray-900
                     [&_*]:text-gray-800"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>

        {/* Print-only footer */}
        <div className="hidden print:block mt-8 text-sm text-gray-600 text-center">
          <p>Dokument genereeritud NIS2 Abimees platvormil</p>
          <p>{new Date(document.createdAt).toLocaleDateString('et-EE')}</p>
        </div>
      </main>
    </div>
  );
}
