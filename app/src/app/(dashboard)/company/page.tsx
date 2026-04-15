'use client';

import { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
  Separator,
  Badge,
} from '@/components/ui';

interface CompanyData {
  // Basic Info
  name: string;
  regCode: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;

  // Contact
  phone: string;
  email: string;
  website: string;

  // Business
  industry: string;
  employeeCount: number;
  nis2Category: 'essential' | 'important' | 'not_applicable';

  // Key Personnel
  ceo: { name: string; email: string; phone: string };
  ciso: { name: string; email: string; phone: string };
  itManager: { name: string; email: string; phone: string };
  dataProtectionOfficer: { name: string; email: string; phone: string };

  // IT Systems
  systems: string[];

  // Additional
  description: string;
  updatedAt: string | null;
}

const defaultData: CompanyData = {
  name: '',
  regCode: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'Eesti',
  phone: '',
  email: '',
  website: '',
  industry: '',
  employeeCount: 0,
  nis2Category: 'not_applicable',
  ceo: { name: '', email: '', phone: '' },
  ciso: { name: '', email: '', phone: '' },
  itManager: { name: '', email: '', phone: '' },
  dataProtectionOfficer: { name: '', email: '', phone: '' },
  systems: [],
  description: '',
  updatedAt: null,
};

export default function CompanyPage() {
  const [data, setData] = useState<CompanyData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newSystem, setNewSystem] = useState('');

  useEffect(() => {
    loadCompanyData();
  }, []);

  const loadCompanyData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/company-mock');

      if (response.ok) {
        const result = await response.json();
        if (result.company) {
          setData(result.company);
        }
      }
    } catch (error) {
      console.error('Error loading company data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const response = await fetch('/api/company-mock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Salvestamine ebaõnnestus');
      }

      const result = await response.json();
      setData(result.company);
      alert('✓ Ettevõtte andmed salvestatud!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Viga salvestamisel. Palun proovi uuesti.');
    } finally {
      setSaving(false);
    }
  };

  const addSystem = () => {
    if (newSystem.trim() && !data.systems.includes(newSystem.trim())) {
      setData({ ...data, systems: [...data.systems, newSystem.trim()] });
      setNewSystem('');
    }
  };

  const removeSystem = (system: string) => {
    setData({ ...data, systems: data.systems.filter(s => s !== system) });
  };

  const completionPercent = Math.round(
    (Object.entries(data).filter(([key, value]) => {
      if (key === 'systems') return value.length > 0;
      if (key === 'updatedAt') return true;
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(v => v !== '');
      }
      return value !== '' && value !== 0;
    }).length / (Object.keys(data).length - 1)) * 100
  );

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <div className="text-6xl mb-4">⏳</div>
            <h3 className="text-xl font-semibold">Laadin andmeid...</h3>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 opacity-0 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Ettevõtte profiil</h1>
        <p className="text-muted-foreground">
          Organisatsiooni andmed dokumendite automaatseks täitmiseks
        </p>
      </div>

      {/* Completion Banner */}
      <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 border-2 border-primary/20 opacity-0 animate-slide-up">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg">Profiili komplektsus</h3>
              <p className="text-sm text-muted-foreground">
                {completionPercent}% andmetest on täidetud
              </p>
            </div>
            <div className="text-5xl font-bold text-primary">{completionPercent}%</div>
          </div>
          <div className="relative h-3 bg-muted rounded-full">
            <div
              className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all"
              style={{ width: `${completionPercent}%` }}
            />
            <div className="absolute right-0 h-full w-0.5 bg-green-500" />
          </div>
          {completionPercent < 100 && (
            <p className="text-xs text-amber-600 mt-2">
              ⚠️ Täitke kõik väljad, et dokumendid saaksid automaatselt täidetud
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card className="opacity-0 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🏢</span>
              Põhiandmed
            </CardTitle>
            <CardDescription>Ettevõtte nimi ja registriandmed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ettevõtte nimi *</Label>
              <Input
                id="name"
                value={data.name}
                onChange={e => setData({ ...data, name: e.target.value })}
                placeholder="OÜ Näidis Ettevõte"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regCode">Äriregistri kood *</Label>
              <Input
                id="regCode"
                value={data.regCode}
                onChange={e => setData({ ...data, regCode: e.target.value })}
                placeholder="12345678"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Aadress *</Label>
              <Input
                id="address"
                value={data.address}
                onChange={e => setData({ ...data, address: e.target.value })}
                placeholder="Tallinna tn 1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Linn *</Label>
                <Input
                  id="city"
                  value={data.city}
                  onChange={e => setData({ ...data, city: e.target.value })}
                  placeholder="Tallinn"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postiindeks *</Label>
                <Input
                  id="postalCode"
                  value={data.postalCode}
                  onChange={e => setData({ ...data, postalCode: e.target.value })}
                  placeholder="10111"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Riik</Label>
              <Input
                id="country"
                value={data.country}
                onChange={e => setData({ ...data, country: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="opacity-0 animate-slide-up" style={{ animationDelay: '150ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📞</span>
              Kontaktandmed
            </CardTitle>
            <CardDescription>Üldised kontaktandmed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon *</Label>
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={e => setData({ ...data, phone: e.target.value })}
                placeholder="+372 1234 5678"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-post *</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={e => setData({ ...data, email: e.target.value })}
                placeholder="info@ettevote.ee"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Veebileht</Label>
              <Input
                id="website"
                type="url"
                value={data.website}
                onChange={e => setData({ ...data, website: e.target.value })}
                placeholder="https://www.ettevote.ee"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="industry">Tegevusvaldkond *</Label>
              <Input
                id="industry"
                value={data.industry}
                onChange={e => setData({ ...data, industry: e.target.value })}
                placeholder="IT teenused, Finantsteenused, jne"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeCount">Töötajate arv</Label>
              <Input
                id="employeeCount"
                type="number"
                value={data.employeeCount || ''}
                onChange={e => setData({ ...data, employeeCount: parseInt(e.target.value) || 0 })}
                placeholder="50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nis2Category">NIS2 kategooria</Label>
              <select
                id="nis2Category"
                value={data.nis2Category}
                onChange={e => setData({ ...data, nis2Category: e.target.value as CompanyData['nis2Category'] })}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="not_applicable">Ei kohaldu</option>
                <option value="essential">Essential Entity (Oluline üksus)</option>
                <option value="important">Important Entity (Oluline üksus)</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Personnel - Full Width */}
      <Card className="mt-6 opacity-0 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>👥</span>
            Vastutavad isikud
          </CardTitle>
          <CardDescription>Organisatsiooni võtmeisikud (kasutatakse dokumentides allkirjadeks ja kontaktideks)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* CEO */}
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <h3 className="font-semibold flex items-center gap-2">
                <span>👔</span>
                Juhatuse liige / Tegevjuht
              </h3>
              <div className="space-y-2">
                <Label className="text-xs">Nimi *</Label>
                <Input
                  value={data.ceo.name}
                  onChange={e => setData({ ...data, ceo: { ...data.ceo, name: e.target.value } })}
                  placeholder="Mari Maasikas"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">E-post *</Label>
                <Input
                  type="email"
                  value={data.ceo.email}
                  onChange={e => setData({ ...data, ceo: { ...data.ceo, email: e.target.value } })}
                  placeholder="mari@ettevote.ee"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Telefon</Label>
                <Input
                  type="tel"
                  value={data.ceo.phone}
                  onChange={e => setData({ ...data, ceo: { ...data.ceo, phone: e.target.value } })}
                  placeholder="+372 1234 5678"
                />
              </div>
            </div>

            {/* CISO */}
            <div className="space-y-3 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <h3 className="font-semibold flex items-center gap-2">
                <span>🔒</span>
                CISO (Chief Information Security Officer)
              </h3>
              <div className="space-y-2">
                <Label className="text-xs">Nimi *</Label>
                <Input
                  value={data.ciso.name}
                  onChange={e => setData({ ...data, ciso: { ...data.ciso, name: e.target.value } })}
                  placeholder="Jaan Tamm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">E-post *</Label>
                <Input
                  type="email"
                  value={data.ciso.email}
                  onChange={e => setData({ ...data, ciso: { ...data.ciso, email: e.target.value } })}
                  placeholder="jaan@ettevote.ee"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Telefon</Label>
                <Input
                  type="tel"
                  value={data.ciso.phone}
                  onChange={e => setData({ ...data, ciso: { ...data.ciso, phone: e.target.value } })}
                  placeholder="+372 1234 5679"
                />
              </div>
            </div>

            {/* IT Manager */}
            <div className="space-y-3 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <h3 className="font-semibold flex items-center gap-2">
                <span>💻</span>
                IT juht
              </h3>
              <div className="space-y-2">
                <Label className="text-xs">Nimi</Label>
                <Input
                  value={data.itManager.name}
                  onChange={e => setData({ ...data, itManager: { ...data.itManager, name: e.target.value } })}
                  placeholder="Kalle Kask"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">E-post</Label>
                <Input
                  type="email"
                  value={data.itManager.email}
                  onChange={e => setData({ ...data, itManager: { ...data.itManager, email: e.target.value } })}
                  placeholder="kalle@ettevote.ee"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Telefon</Label>
                <Input
                  type="tel"
                  value={data.itManager.phone}
                  onChange={e => setData({ ...data, itManager: { ...data.itManager, phone: e.target.value } })}
                  placeholder="+372 1234 5680"
                />
              </div>
            </div>

            {/* DPO */}
            <div className="space-y-3 p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
              <h3 className="font-semibold flex items-center gap-2">
                <span>🛡️</span>
                Andmekaitsespetsialist (DPO)
              </h3>
              <div className="space-y-2">
                <Label className="text-xs">Nimi</Label>
                <Input
                  value={data.dataProtectionOfficer.name}
                  onChange={e => setData({ ...data, dataProtectionOfficer: { ...data.dataProtectionOfficer, name: e.target.value } })}
                  placeholder="Liis Lepp"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">E-post</Label>
                <Input
                  type="email"
                  value={data.dataProtectionOfficer.email}
                  onChange={e => setData({ ...data, dataProtectionOfficer: { ...data.dataProtectionOfficer, email: e.target.value } })}
                  placeholder="liis@ettevote.ee"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Telefon</Label>
                <Input
                  type="tel"
                  value={data.dataProtectionOfficer.phone}
                  onChange={e => setData({ ...data, dataProtectionOfficer: { ...data.dataProtectionOfficer, phone: e.target.value } })}
                  placeholder="+372 1234 5681"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* IT Systems */}
      <Card className="mt-6 opacity-0 animate-slide-up" style={{ animationDelay: '250ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>💾</span>
            Kasutatavad infosüsteemid
          </CardTitle>
          <CardDescription>Loetelu organisatsioonis kasutatavatest IT süsteemidest ja teenustest</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSystem}
              onChange={e => setNewSystem(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && addSystem()}
              placeholder="Nt: Microsoft 365, Salesforce, AWS..."
            />
            <Button onClick={addSystem} type="button">Lisa</Button>
          </div>

          {data.systems.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.systems.map((system, idx) => (
                <Badge key={idx} variant="secondary" className="px-3 py-1 text-sm">
                  {system}
                  <button
                    onClick={() => removeSystem(system)}
                    className="ml-2 hover:text-destructive"
                  >
                    ✕
                  </button>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Süsteeme pole veel lisatud
            </p>
          )}
        </CardContent>
      </Card>

      {/* Description */}
      <Card className="mt-6 opacity-0 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📝</span>
            Organisatsiooni kirjeldus
          </CardTitle>
          <CardDescription>Lühike ülevaade ettevõtte tegevusest</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={data.description}
            onChange={e => setData({ ...data, description: e.target.value })}
            rows={4}
            placeholder="Kirjeldage oma ettevõtte põhitegevust, teenuseid ja eesmärke..."
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="mt-6 flex gap-4 opacity-0 animate-slide-up" style={{ animationDelay: '350ms' }}>
        <Button
          size="lg"
          onClick={handleSave}
          disabled={saving}
          className="flex-1"
        >
          {saving ? 'Salvestan...' : '💾 Salvesta andmed'}
        </Button>
        {data.updatedAt && (
          <Badge variant="outline" className="self-center px-4 py-2">
            Viimati uuendatud: {new Date(data.updatedAt).toLocaleDateString('et-EE')}
          </Badge>
        )}
      </div>

      {/* Info Banner */}
      <Card className="mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 opacity-0 animate-slide-up" style={{ animationDelay: '400ms' }}>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="font-semibold mb-2">Kuidas neid andmeid kasutatakse?</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Dokumendid täidetakse automaatselt ettevõtte andmetega (nimi, aadress, kontaktid)</li>
                <li>• Allkirjastajad lisatakse dokumentide päistesse (CEO, CISO)</li>
                <li>• Infosüsteemide loetelu kasutatakse riskihinnangutes ja poliitikas</li>
                <li>• Andmed on alati muudetavad ja uuendatavad</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
