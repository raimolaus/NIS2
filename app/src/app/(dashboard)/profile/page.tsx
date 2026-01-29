'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Organization {
  id: string;
  name: string;
  registrationCode?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  contactPhone?: string;
  contactEmail?: string;
  ceoName?: string;
  ceoEmail?: string;
  ceoPhone?: string;
  securityOfficerName?: string;
  securityOfficerEmail?: string;
  securityOfficerPhone?: string;
  dataProtectionOfficerName?: string;
  dataProtectionOfficerEmail?: string;
  dataProtectionOfficerPhone?: string;
  sector: string;
  subsector?: string;
  employeeCount: string;
  revenue: string;
  itSystems: string[];
  securityProcedures?: string;
  hasSecurityOfficer?: string;
  processesPersonalData?: string;
  nis2Applicable: boolean;
  nis2Category?: string;
}

type EditingSection = 'company' | 'contact' | 'ceo' | 'security' | 'dataProtection' | 'business' | null;

export default function ProfilePage() {
  const router = useRouter();
  const [org, setOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSection, setEditingSection] = useState<EditingSection>(null);
  const [formData, setFormData] = useState<Partial<Organization>>({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      const data = await res.json();
      if (data.organization) {
        setOrg(data.organization);
        setFormData(data.organization);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (section: EditingSection) => {
    setEditingSection(section);
    setFormData(org || {});
  };

  const handleCancel = () => {
    setEditingSection(null);
    setFormData(org || {});
  };

  const handleSave = async () => {
    if (!org) return;

    setSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setOrg(data.organization);
        setEditingSection(null);
      } else {
        const error = await res.json();
        alert(error.error || 'Salvestamine ebaõnnestus');
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
      alert('Salvestamine ebaõnnestus');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof Organization, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Laen...</div>
      </div>
    );
  }

  if (!org) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Organisatsiooni ei leitud</div>
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
                  className="text-gray-600 hover:text-gray-900 transition"
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
                  className="text-primary-600 font-semibold border-b-2 border-primary-600 pb-1"
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
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Organisatsiooni profiil</h1>

        <div className="space-y-6">
          {/* Ettevõtte rekvisiidid */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Ettevõtte rekvisiidid</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Kasutatakse dokumentide koostamisel
                </p>
              </div>
              {editingSection !== 'company' && (
                <button
                  onClick={() => handleEdit('company')}
                  className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Muuda
                </button>
              )}
            </div>
            <div className="p-6">
              {editingSection === 'company' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ettevõtte nimi *
                    </label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Registrikood
                    </label>
                    <input
                      type="text"
                      value={formData.registrationCode || ''}
                      onChange={(e) => handleChange('registrationCode', e.target.value)}
                      placeholder="12345678"
                      className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Aadress
                    </label>
                    <input
                      type="text"
                      value={formData.address || ''}
                      onChange={(e) => handleChange('address', e.target.value)}
                      placeholder="Tänavaaadress"
                      className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Linn
                      </label>
                      <input
                        type="text"
                        value={formData.city || ''}
                        onChange={(e) => handleChange('city', e.target.value)}
                        placeholder="Tallinn"
                        className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postiindeks
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode || ''}
                        onChange={(e) => handleChange('postalCode', e.target.value)}
                        placeholder="10115"
                        className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
                    >
                      {saving ? 'Salvestan...' : 'Salvesta'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Tühista
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Ettevõtte nimi</p>
                    <p className="font-medium text-gray-900">{org.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Registrikood</p>
                    <p className="font-medium text-gray-900">
                      {org.registrationCode || <span className="text-gray-400">Ei ole lisatud</span>}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Aadress</p>
                    <p className="font-medium text-gray-900">
                      {org.address || <span className="text-gray-400">Ei ole lisatud</span>}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Linn ja postiindeks</p>
                    <p className="font-medium text-gray-900">
                      {org.city && org.postalCode
                        ? `${org.city}, ${org.postalCode}`
                        : org.city || org.postalCode || <span className="text-gray-400">Ei ole lisatud</span>}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Kontaktandmed */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Kontaktandmed</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Üldised kontaktandmed
                </p>
              </div>
              {editingSection !== 'contact' && (
                <button
                  onClick={() => handleEdit('contact')}
                  className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Muuda
                </button>
              )}
            </div>
            <div className="p-6">
              {editingSection === 'contact' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <input
                      type="text"
                      value={formData.contactPhone || ''}
                      onChange={(e) => handleChange('contactPhone', e.target.value)}
                      placeholder="+372 1234 5678"
                      className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.contactEmail || ''}
                      onChange={(e) => handleChange('contactEmail', e.target.value)}
                      placeholder="info@ettevotte.ee"
                      className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
                    >
                      {saving ? 'Salvestan...' : 'Salvesta'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Tühista
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Telefon</p>
                    <p className="font-medium text-gray-900">
                      {org.contactPhone || <span className="text-gray-400">Ei ole lisatud</span>}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-gray-900">
                      {org.contactEmail || <span className="text-gray-400">Ei ole lisatud</span>}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Juhataja / Direktor */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Juhataja / Direktor</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Organisatsiooni esindaja
                </p>
              </div>
              {editingSection !== 'ceo' && (
                <button
                  onClick={() => handleEdit('ceo')}
                  className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Muuda
                </button>
              )}
            </div>
            <div className="p-6">
              {editingSection === 'ceo' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nimi
                    </label>
                    <input
                      type="text"
                      value={formData.ceoName || ''}
                      onChange={(e) => handleChange('ceoName', e.target.value)}
                      placeholder="Eesnimi Perekonnanimi"
                      className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.ceoEmail || ''}
                      onChange={(e) => handleChange('ceoEmail', e.target.value)}
                      placeholder="juhataja@ettevotte.ee"
                      className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <input
                      type="text"
                      value={formData.ceoPhone || ''}
                      onChange={(e) => handleChange('ceoPhone', e.target.value)}
                      placeholder="+372 1234 5678"
                      className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
                    >
                      {saving ? 'Salvestan...' : 'Salvesta'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Tühista
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nimi</p>
                    <p className="font-medium text-gray-900">
                      {org.ceoName || <span className="text-gray-400">Ei ole lisatud</span>}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-gray-900">
                      {org.ceoEmail || <span className="text-gray-400">Ei ole lisatud</span>}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Telefon</p>
                    <p className="font-medium text-gray-900">
                      {org.ceoPhone || <span className="text-gray-400">Ei ole lisatud</span>}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Infoturbe vastutaja */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Infoturbe vastutaja</h2>
                <p className="text-sm text-gray-600 mt-1">
                  NIS2 infoturbe juht (CISO)
                </p>
              </div>
              {editingSection !== 'security' && (
                <button
                  onClick={() => handleEdit('security')}
                  className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Muuda
                </button>
              )}
            </div>
            <div className="p-6">
              {editingSection === 'security' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nimi
                    </label>
                    <input
                      type="text"
                      value={formData.securityOfficerName || ''}
                      onChange={(e) => handleChange('securityOfficerName', e.target.value)}
                      placeholder="Eesnimi Perekonnanimi"
                      className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.securityOfficerEmail || ''}
                      onChange={(e) => handleChange('securityOfficerEmail', e.target.value)}
                      placeholder="security@ettevotte.ee"
                      className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <input
                      type="text"
                      value={formData.securityOfficerPhone || ''}
                      onChange={(e) => handleChange('securityOfficerPhone', e.target.value)}
                      placeholder="+372 1234 5678"
                      className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
                    >
                      {saving ? 'Salvestan...' : 'Salvesta'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Tühista
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nimi</p>
                    <p className="font-medium text-gray-900">
                      {org.securityOfficerName || <span className="text-gray-400">Ei ole lisatud</span>}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-gray-900">
                      {org.securityOfficerEmail || <span className="text-gray-400">Ei ole lisatud</span>}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Telefon</p>
                    <p className="font-medium text-gray-900">
                      {org.securityOfficerPhone || <span className="text-gray-400">Ei ole lisatud</span>}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Andmekaitse vastutaja */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Andmekaitse vastutaja (DPO)</h2>
                <p className="text-sm text-gray-600 mt-1">
                  GDPR isikuandmete kaitse vastutaja
                </p>
              </div>
              {editingSection !== 'dataProtection' && (
                <button
                  onClick={() => handleEdit('dataProtection')}
                  className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Muuda
                </button>
              )}
            </div>
            <div className="p-6">
              {editingSection === 'dataProtection' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nimi
                    </label>
                    <input
                      type="text"
                      value={formData.dataProtectionOfficerName || ''}
                      onChange={(e) => handleChange('dataProtectionOfficerName', e.target.value)}
                      placeholder="Eesnimi Perekonnanimi"
                      className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.dataProtectionOfficerEmail || ''}
                      onChange={(e) => handleChange('dataProtectionOfficerEmail', e.target.value)}
                      placeholder="dpo@ettevotte.ee"
                      className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <input
                      type="text"
                      value={formData.dataProtectionOfficerPhone || ''}
                      onChange={(e) => handleChange('dataProtectionOfficerPhone', e.target.value)}
                      placeholder="+372 1234 5678"
                      className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
                    >
                      {saving ? 'Salvestan...' : 'Salvesta'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Tühista
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nimi</p>
                    <p className="font-medium text-gray-900">
                      {org.dataProtectionOfficerName || <span className="text-gray-400">Ei ole lisatud</span>}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-gray-900">
                      {org.dataProtectionOfficerEmail || <span className="text-gray-400">Ei ole lisatud</span>}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Telefon</p>
                    <p className="font-medium text-gray-900">
                      {org.dataProtectionOfficerPhone || <span className="text-gray-400">Ei ole lisatud</span>}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Organisatsiooni andmed (read-only section) */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Organisatsiooni andmed</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Kogutud onboarding küsimustikust
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Sektor</p>
                  <p className="font-medium text-gray-900">
                    {sectorLabels[org.sector] || org.sector}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Töötajate arv</p>
                  <p className="font-medium text-gray-900">{org.employeeCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">NIS2 kohaldatavus</p>
                  <p className="font-medium text-gray-900">
                    {org.nis2Applicable ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                        ✓ NIS2 kohaldub ({org.nis2Category === 'essential' ? 'Oluline üksus' : 'Tähtis üksus'})
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                        NIS2 ei kohaldu
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
