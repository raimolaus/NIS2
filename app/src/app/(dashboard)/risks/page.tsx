'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Risk {
  id: string;
  riskId: string;
  title: string;
  description: string;
  category: string;
  likelihood: number;
  impact: number;
  riskLevel: number;
  currentMeasures: string | null;
  recommendations: string | null;
  owner: string | null;
  status: string;
  dueDate: string | null;
  mitigatedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function RisksPage() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRisk, setNewRisk] = useState({
    riskId: '',
    title: '',
    description: '',
    category: 'technical',
    likelihood: 3,
    impact: 3,
    currentMeasures: '',
    recommendations: '',
    owner: '',
    status: 'identified',
    dueDate: '',
  });

  useEffect(() => {
    loadRisks();
  }, []);

  const loadRisks = async () => {
    try {
      const res = await fetch('/api/risks');
      if (res.ok) {
        const data = await res.json();
        setRisks(data.risks);
      }
    } catch (error) {
      console.error('Failed to load risks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRisk = async () => {
    try {
      const res = await fetch('/api/risks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRisk),
      });

      if (res.ok) {
        const data = await res.json();
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
          owner: '',
          status: 'identified',
          dueDate: '',
        });
        alert('Risk lisatud!');
      } else {
        const error = await res.json();
        alert(error.error || 'Lisamine ebaõnnestus');
      }
    } catch (error) {
      console.error('Failed to add risk:', error);
      alert('Lisamine ebaõnnestus');
    }
  };

  const handleUpdateRisk = async (id: string, updates: Partial<Risk>) => {
    try {
      const res = await fetch(`/api/risks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        const data = await res.json();
        setRisks(risks.map((r) => (r.id === id ? data.risk : r)));
        setEditingId(null);
      } else {
        alert('Uuendamine ebaõnnestus');
      }
    } catch (error) {
      console.error('Failed to update risk:', error);
      alert('Uuendamine ebaõnnestus');
    }
  };

  const handleDeleteRisk = async (id: string) => {
    if (!confirm('Kas oled kindel, et soovid selle riski kustutada?')) {
      return;
    }

    try {
      const res = await fetch(`/api/risks/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setRisks(risks.filter((r) => r.id !== id));
        alert('Risk kustutatud!');
      } else {
        alert('Kustutamine ebaõnnestus');
      }
    } catch (error) {
      console.error('Failed to delete risk:', error);
      alert('Kustutamine ebaõnnestus');
    }
  };

  const handleGenerateRisks = async () => {
    if (!confirm('AI genereerib ~9 riski (3 kategooriast). Kas jätkame?')) {
      return;
    }

    setGenerating(true);
    try {
      const res = await fetch('/api/risks/generate', {
        method: 'POST',
      });

      if (res.ok) {
        const data = await res.json();
        alert(`${data.risks.length} riski genereeritud!`);
        await loadRisks(); // Reload all risks
      } else {
        const error = await res.json();
        alert(error.error || 'Genereerimine ebaõnnestus');
      }
    } catch (error) {
      console.error('Failed to generate risks:', error);
      alert('Genereerimine ebaõnnestus');
    } finally {
      setGenerating(false);
    }
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

  const getPriorityLabel = (riskLevel: number) => {
    if (riskLevel >= 17) return { label: 'Kriitiline', color: 'bg-red-600 text-white' };
    if (riskLevel >= 10) return { label: 'Kõrge', color: 'bg-orange-500 text-white' };
    if (riskLevel >= 5) return { label: 'Keskmine', color: 'bg-yellow-500 text-white' };
    return { label: 'Madal', color: 'bg-green-500 text-white' };
  };

  const getNextRiskId = () => {
    if (risks.length === 0) return 'RISK-01';
    const maxNum = Math.max(
      ...risks.map((r) => parseInt(r.riskId.replace('RISK-', '')) || 0)
    );
    return `RISK-${String(maxNum + 1).padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Laen...</div>
      </div>
    );
  }

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
                <span className="font-bold text-xl text-gray-900">NIS2 Abimees</span>
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
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Dokumendid
                </Link>
                <Link
                  href="/risks"
                  className="text-primary-600 font-semibold border-b-2 border-primary-600 pb-1"
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Riskihaldus</h1>
            <p className="text-gray-600">
              Halda organisatsiooni infoturberiske
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleGenerateRisks}
              disabled={generating}
              className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              {generating ? 'AI genereerib...' : '✨ Genereeri riskid AI-ga'}
            </button>
            <button
              onClick={() => {
                setNewRisk({ ...newRisk, riskId: getNextRiskId() });
                setShowAddModal(true);
              }}
              className="px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition"
            >
              + Lisa uus risk
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Kokku riske</div>
            <div className="text-2xl font-bold text-gray-900">{risks.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Kriitiline / Kõrge</div>
            <div className="text-2xl font-bold text-red-600">
              {risks.filter((r) => r.riskLevel >= 10).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Töös</div>
            <div className="text-2xl font-bold text-blue-600">
              {risks.filter((r) => r.status === 'in_progress').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Maandatud</div>
            <div className="text-2xl font-bold text-green-600">
              {risks.filter((r) => r.status === 'mitigated').length}
            </div>
          </div>
        </div>

        {/* Risks table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {risks.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Riske pole veel lisatud
              </h3>
              <p className="text-gray-600 mb-6">
                Alusta riskihaldusega, lisades esimese riski
              </p>
              <button
                onClick={() => {
                  setNewRisk({ ...newRisk, riskId: getNextRiskId() });
                  setShowAddModal(true);
                }}
                className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition"
              >
                + Lisa esimene risk
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      Risk
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      Kategooria
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
                      Tõenäosus
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
                      Mõju
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
                      Riskitase
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      Prioriteet
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      Vastutaja
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      Olek
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
                      Toimingud
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {risks.map((risk) => {
                    const priority = getPriorityLabel(risk.riskLevel);
                    return (
                      <tr key={risk.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {risk.riskId}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-gray-900">
                            {risk.title}
                          </div>
                          {risk.description && (
                            <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {risk.description}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {getCategoryLabel(risk.category)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {editingId === risk.id ? (
                            <select
                              value={risk.likelihood}
                              onChange={(e) =>
                                handleUpdateRisk(risk.id, {
                                  likelihood: parseInt(e.target.value),
                                })
                              }
                              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded bg-white text-gray-900"
                            >
                              {[1, 2, 3, 4, 5].map((n) => (
                                <option key={n} value={n}>
                                  {n}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-sm font-medium text-gray-900">
                              {risk.likelihood}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {editingId === risk.id ? (
                            <select
                              value={risk.impact}
                              onChange={(e) =>
                                handleUpdateRisk(risk.id, {
                                  impact: parseInt(e.target.value),
                                })
                              }
                              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded bg-white text-gray-900"
                            >
                              {[1, 2, 3, 4, 5].map((n) => (
                                <option key={n} value={n}>
                                  {n}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-sm font-medium text-gray-900">
                              {risk.impact}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-sm font-bold text-gray-900">
                            {risk.riskLevel}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-semibold ${priority.color}`}
                          >
                            {priority.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {editingId === risk.id ? (
                            <input
                              type="text"
                              value={risk.owner || ''}
                              onChange={(e) =>
                                handleUpdateRisk(risk.id, {
                                  owner: e.target.value,
                                })
                              }
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-white text-gray-900"
                              placeholder="CISO"
                            />
                          ) : (
                            <span className="text-sm text-gray-700">
                              {risk.owner || '-'}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {editingId === risk.id ? (
                            <select
                              value={risk.status}
                              onChange={(e) =>
                                handleUpdateRisk(risk.id, {
                                  status: e.target.value,
                                })
                              }
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-white text-gray-900"
                            >
                              <option value="identified">Tuvastatud</option>
                              <option value="in_progress">Töös</option>
                              <option value="mitigated">Maandatud</option>
                              <option value="accepted">Aktsepteeritud</option>
                            </select>
                          ) : (
                            <span className="text-sm text-gray-700">
                              {getStatusLabel(risk.status)}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {editingId === risk.id ? (
                              <button
                                onClick={() => setEditingId(null)}
                                className="text-green-600 hover:text-green-700 text-sm font-medium"
                              >
                                ✓
                              </button>
                            ) : (
                              <button
                                onClick={() => setEditingId(risk.id)}
                                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                              >
                                ✏️
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteRisk(risk.id)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Add Risk Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Lisa uus risk</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Riski ID *
                    </label>
                    <input
                      type="text"
                      value={newRisk.riskId}
                      onChange={(e) =>
                        setNewRisk({ ...newRisk, riskId: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                      placeholder="RISK-01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategooria *
                    </label>
                    <select
                      value={newRisk.category}
                      onChange={(e) =>
                        setNewRisk({ ...newRisk, category: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    >
                      <option value="technical">Tehniline</option>
                      <option value="organizational">Organisatsiooniline</option>
                      <option value="compliance">Vastavus</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Riski nimetus *
                  </label>
                  <input
                    type="text"
                    value={newRisk.title}
                    onChange={(e) =>
                      setNewRisk({ ...newRisk, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    placeholder="Nt. Volitamata juurdepääs süsteemidele"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kirjeldus
                  </label>
                  <textarea
                    value={newRisk.description}
                    onChange={(e) =>
                      setNewRisk({ ...newRisk, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    placeholder="Detailne riski kirjeldus..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tõenäosus (1-5) *
                    </label>
                    <select
                      value={newRisk.likelihood}
                      onChange={(e) =>
                        setNewRisk({
                          ...newRisk,
                          likelihood: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    >
                      <option value="1">1 - Väga madal</option>
                      <option value="2">2 - Madal</option>
                      <option value="3">3 - Keskmine</option>
                      <option value="4">4 - Kõrge</option>
                      <option value="5">5 - Väga kõrge</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mõju (1-5) *
                    </label>
                    <select
                      value={newRisk.impact}
                      onChange={(e) =>
                        setNewRisk({
                          ...newRisk,
                          impact: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    >
                      <option value="1">1 - Väga väike</option>
                      <option value="2">2 - Väike</option>
                      <option value="3">3 - Keskmine</option>
                      <option value="4">4 - Kõrge</option>
                      <option value="5">5 - Kriitiline</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vastutaja
                  </label>
                  <input
                    type="text"
                    value={newRisk.owner}
                    onChange={(e) =>
                      setNewRisk({ ...newRisk, owner: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    placeholder="CISO, IT juht, jne"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Praegused turvameetmed
                  </label>
                  <textarea
                    value={newRisk.currentMeasures}
                    onChange={(e) =>
                      setNewRisk({ ...newRisk, currentMeasures: e.target.value })
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    placeholder="Kirjelda, millised meetmed on juba rakendatud..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Soovitused
                  </label>
                  <textarea
                    value={newRisk.recommendations}
                    onChange={(e) =>
                      setNewRisk({ ...newRisk, recommendations: e.target.value })
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    placeholder="Soovitused riski maandamiseks..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddRisk}
                    disabled={!newRisk.riskId || !newRisk.title}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Lisa risk
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                  >
                    Tühista
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
