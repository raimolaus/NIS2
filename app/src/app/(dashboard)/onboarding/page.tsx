'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Badge,
  Progress,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Separator,
} from '@/components/ui';

// Zod validation schema
const organizationSchema = z.object({
  name: z.string().min(2, 'Nimi peab olema vähemalt 2 tähemärki'),
  registrationCode: z.string().min(5, 'Sisestage registrikood'),
  sector: z.string().min(1, 'Valige sektor'),
  subsector: z.string().optional(),
  employeeCount: z.string().min(1, 'Valige töötajate arv'),
  revenue: z.string().min(1, 'Valige käive'),

  // Contact info
  contactEmail: z.string().email('Vigane e-posti aadress'),
  contactPhone: z.string().min(6, 'Sisestage telefon'),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),

  // Responsible persons
  ceoName: z.string().min(2, 'Sisestage juhataja nimi'),
  ceoEmail: z.string().email('Vigane e-posti aadress'),

  securityOfficerName: z.string().optional(),
  securityOfficerEmail: z.string().email('Vigane e-posti aadress').optional().or(z.literal('')),
});

type OrganizationFormData = z.infer<typeof organizationSchema>;

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [nis2Result, setNis2Result] = useState<{
    applicable: boolean;
    category?: 'essential' | 'important';
    reason?: string;
  } | null>(null);

  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: '',
      registrationCode: '',
      sector: '',
      subsector: '',
      employeeCount: '',
      revenue: '',
      contactEmail: '',
      contactPhone: '',
      address: '',
      city: '',
      postalCode: '',
      ceoName: '',
      ceoEmail: '',
      securityOfficerName: '',
      securityOfficerEmail: '',
    },
  });

  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const sectors = [
    { value: 'healthcare', label: 'Tervishoid' },
    { value: 'energy', label: 'Energeetika' },
    { value: 'transport', label: 'Transport' },
    { value: 'government', label: 'Avalik sektor' },
    { value: 'finance', label: 'Finantsteenused' },
    { value: 'it_services', label: 'IT teenused' },
    { value: 'manufacturing', label: 'Tootmine' },
    { value: 'logistics', label: 'Logistika' },
    { value: 'water', label: 'Veevarustus' },
    { value: 'digital_infrastructure', label: 'Digitaalne infrastruktuur' },
    { value: 'other', label: 'Muu' },
  ];

  const employeeCounts = [
    { value: '1-10', label: '1-10 töötajat' },
    { value: '11-50', label: '11-50 töötajat' },
    { value: '51-250', label: '51-250 töötajat' },
    { value: '251+', label: '251+ töötajat' },
  ];

  const revenues = [
    { value: '<€1M', label: 'Alla 1 miljon €' },
    { value: '€1-10M', label: '1-10 miljonit €' },
    { value: '€10-50M', label: '10-50 miljonit €' },
    { value: '>€50M', label: 'Üle 50 miljoni €' },
  ];

  const checkNIS2Applicability = (data: OrganizationFormData) => {
    // Simple logic for NIS2 applicability
    const isMediumOrLarge = ['11-50', '51-250', '251+'].includes(data.employeeCount);
    const hasRevenue = ['€1-10M', '€10-50M', '>€50M'].includes(data.revenue);
    const isCriticalSector = ['healthcare', 'energy', 'transport', 'finance', 'digital_infrastructure'].includes(data.sector);

    if (isMediumOrLarge && hasRevenue && isCriticalSector) {
      return {
        applicable: true,
        category: data.employeeCount === '251+' || data.revenue === '>€50M'
          ? 'essential' as const
          : 'important' as const,
        reason: 'Teie organisatsioon vastab NIS2 direktiivi suuruse ja sektori kriteeriumidele.',
      };
    }

    return {
      applicable: false,
      reason: 'Teie organisatsioon ei vasta NIS2 direktiivi kohaldamise kriteeriumidele (suurus või sektor).',
    };
  };

  const handleNextStep = async () => {
    setError('');

    if (currentStep === 1) {
      // Validate step 1 fields
      const step1Fields = ['name', 'registrationCode', 'sector', 'employeeCount', 'revenue'] as const;
      const result = await form.trigger(step1Fields);
      if (result) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      // Validate step 2 fields
      const step2Fields = ['contactEmail', 'contactPhone', 'ceoName', 'ceoEmail'] as const;
      const result = await form.trigger(step2Fields);
      if (result) {
        // Check NIS2 applicability
        const formData = form.getValues();
        const result = checkNIS2Applicability(formData);
        setNis2Result(result);
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      // Submit
      await handleSubmit(form.getValues());
    }
  };

  const handleSubmit = async (data: OrganizationFormData) => {
    setLoading(true);
    setError('');

    try {
      // Mock API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In real app, this would call /api/organization
      // const res = await fetch('/api/organization', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      // Success - redirect to dashboard
      router.push('/dashboard?onboarded=true');
    } catch (err) {
      setError('Midagi läks valesti. Palun proovige uuesti.');
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">N2</span>
            </div>
            <span className="font-bold text-xl">NIS2 Abimees</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Samm {currentStep} / {totalSteps}</span>
              <span className="text-sm text-muted-foreground">~5 minutit</span>
            </div>
            <Progress value={progressPercentage} />
          </div>

          {/* Error Message */}
          {error && (
            <Card className="mb-6 border-destructive bg-destructive/10">
              <CardContent className="pt-6">
                <p className="text-destructive font-medium">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Step Content */}
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              {/* Step 1: Organization Info */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <Badge className="w-fit mb-2">Organisatsiooni info</Badge>
                    <CardTitle>Rääkige meile oma organisatsioonist</CardTitle>
                    <CardDescription>
                      Põhiandmed, mis aitavad meil hinnata NIS2 kohalduvust
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organisatsiooni nimi *</FormLabel>
                          <FormControl>
                            <Input placeholder="Näiteks: OÜ NIS2 Testimine" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="registrationCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Registrikood *</FormLabel>
                          <FormControl>
                            <Input placeholder="12345678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sector"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tegevussektor *</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            >
                              <option value="">Vali sektor...</option>
                              {sectors.map(s => (
                                <option key={s.value} value={s.value}>{s.label}</option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="employeeCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Töötajate arv *</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            >
                              <option value="">Vali vahemik...</option>
                              {employeeCounts.map(e => (
                                <option key={e.value} value={e.value}>{e.label}</option>
                              ))}
                            </select>
                          </FormControl>
                          <FormDescription>
                            Organisatsiooni suurus on üks NIS2 kriteeriume
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="revenue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Aastakäive *</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            >
                              <option value="">Vali vahemik...</option>
                              {revenues.map(r => (
                                <option key={r.value} value={r.value}>{r.label}</option>
                              ))}
                            </select>
                          </FormControl>
                          <FormDescription>
                            Käive on teine NIS2 kohalduvuse kriteerium
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Contact & Responsible Persons */}
              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant="secondary">Kontaktandmed</Badge>
                    <CardTitle>Kontaktandmed ja vastutajad</CardTitle>
                    <CardDescription>
                      Info vajalike isikute ja kontaktide kohta
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Üldised kontaktandmed</h3>

                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-post *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="info@firma.ee" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefon *</FormLabel>
                            <FormControl>
                              <Input placeholder="+372 1234 5678" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-semibold">Juhataja (CEO)</h3>

                      <FormField
                        control={form.control}
                        name="ceoName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nimi *</FormLabel>
                            <FormControl>
                              <Input placeholder="Mari Maasikas" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ceoEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-post *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="ceo@firma.ee" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-semibold">Infoturbe vastutaja (valikuline)</h3>
                      <p className="text-sm text-muted-foreground">
                        NIS2 nõuab vastutava isiku määramist. Võite selle ka hiljem lisada.
                      </p>

                      <FormField
                        control={form.control}
                        name="securityOfficerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nimi</FormLabel>
                            <FormControl>
                              <Input placeholder="Kalle Turvaline" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="securityOfficerEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-post</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="security@firma.ee" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: NIS2 Result */}
              {currentStep === 3 && nis2Result && (
                <Card>
                  <CardHeader>
                    <Badge className="w-fit mb-2" variant={nis2Result.applicable ? "warning" : "secondary"}>
                      NIS2 Tulemus
                    </Badge>
                    <CardTitle>
                      {nis2Result.applicable ? 'NIS2 kohaldub teie organisatsioonile' : 'NIS2 ei kohaldu'}
                    </CardTitle>
                    <CardDescription>{nis2Result.reason}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {nis2Result.applicable ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="warning">✓ NIS2 kohaldub</Badge>
                          <Badge variant="secondary">
                            {nis2Result.category === 'essential' ? 'Oluline üksus' : 'Tähtis üksus'}
                          </Badge>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h3 className="font-semibold text-blue-900 mb-2">Mis see tähendab?</h3>
                          <ul className="text-sm text-blue-700 space-y-2">
                            <li>• Peate järgima NIS2 direktiivi nõudeid</li>
                            <li>• Tähtaeg: oktoober 2024</li>
                            <li>• Meie platvorm aitab teil nõuetele vastata</li>
                          </ul>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h3 className="font-semibold text-green-900 mb-2">Järgmised sammud:</h3>
                          <ol className="text-sm text-green-700 space-y-2">
                            <li>1. Teeme 40-küsimuse enesehindamise</li>
                            <li>2. Genereerime vajalikud dokumendid</li>
                            <li>3. Loome tegevuskava lünkade kõrvaldamiseks</li>
                          </ol>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <h3 className="font-semibold mb-2">Mis edasi?</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Kuigi NIS2 ei kohaldu, soovitame siiski järgida head infoturbe praktikat.
                            Meie platvorm aitab teil sellega.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Võite kasutada kõiki meie tööriistu oma infoturbe parendamiseks.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1 || loading}
                >
                  Tagasi
                </Button>

                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={loading}
                >
                  {loading ? 'Salvestan...' : currentStep === 3 ? 'Lõpeta' : 'Edasi'}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
