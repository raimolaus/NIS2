'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface FormData {
  sector: string;
  subsector: string;
  employeeCount: string;
  revenue: string;
  itSystems: string[];
  securityProcedures: string;
  hasSecurityOfficer: string;
  processesPersonalData: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<FormData>({
    sector: '',
    subsector: '',
    employeeCount: '',
    revenue: '',
    itSystems: [],
    securityProcedures: '',
    hasSecurityOfficer: '',
    processesPersonalData: '',
  });

  const totalSteps = 8;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (dataToSubmit?: FormData) => {
    setError('');
    setLoading(true);

    const submitData = dataToSubmit || formData;

    try {
      const res = await fetch('/api/organization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Midagi läks valesti');
        setLoading(false);
        return;
      }

      // Success - redirect to dashboard
      router.push('/dashboard?onboarded=true');
    } catch (err) {
      setError('Midagi läks valesti');
      setLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.sector !== '';
      case 2:
        // Subsector optional for some sectors
        return true;
      case 3:
        return formData.employeeCount !== '';
      case 4:
        return formData.revenue !== '';
      case 5:
        return formData.itSystems.length > 0;
      case 6:
        return formData.securityProcedures !== '';
      case 7:
        return formData.hasSecurityOfficer !== '';
      case 8:
        return formData.processesPersonalData !== '';
      default:
        return false;
    }
  };

  const handleITSystemToggle = (system: string) => {
    setFormData((prev) => ({
      ...prev,
      itSystems: prev.itSystems.includes(system)
        ? prev.itSystems.filter((s) => s !== system)
        : [...prev.itSystems, system],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80">
            <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">N2</span>
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
            <span className="text-sm font-medium text-gray-700">
              Samm {currentStep} / {totalSteps}
            </span>
            <span className="text-sm text-gray-500">~5 minutit</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Step 1: Sector */}
          {currentStep === 1 && (
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                  Organisatsiooni profiil
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Mis sektoris te tegutsete?</h2>
              <p className="text-gray-600 mb-6">
                Valige peamine tegevusvaldkond, mis kirjeldab teie organisatsiooni.
              </p>

              <div className="space-y-3">
                {[
                  { value: 'healthcare', label: 'Tervishoid' },
                  { value: 'energy', label: 'Energeetika' },
                  { value: 'transport', label: 'Transport' },
                  { value: 'government', label: 'Avalik sektor / Valitsusasutus' },
                  { value: 'finance', label: 'Finantsteenused' },
                  { value: 'it_services', label: 'IT teenused' },
                  { value: 'manufacturing', label: 'Tootmine' },
                  { value: 'logistics', label: 'Logistika / Laondus' },
                  { value: 'water', label: 'Veevarustus ja kanalisatsioon' },
                  { value: 'digital_infrastructure', label: 'Digitaalne infrastruktuur' },
                  { value: 'other', label: 'Muu' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, sector: option.value, subsector: '' });
                      setTimeout(() => {
                        if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
                      }, 300);
                    }}
                    className={`w-full flex items-center p-4 border-2 rounded-lg cursor-pointer transition text-left ${
                      formData.sector === option.value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Subsector (conditional) */}
          {currentStep === 2 && (
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                  Organisatsiooni profiil
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Täpsustage oma tegevusala</h2>
              <p className="text-gray-600 mb-6">
                {formData.sector === 'healthcare' && 'Milline tervishoid teenus te olete?'}
                {formData.sector === 'other' && 'Kirjeldage lühidalt oma tegevusala'}
                {!['healthcare', 'other'].includes(formData.sector) &&
                  'See samm on valikuline, võite jätkata edasi'}
              </p>

              {formData.sector === 'healthcare' && (
                <div className="space-y-3">
                  {[
                    { value: 'general_practitioner', label: 'Perearst' },
                    { value: 'pharmacy', label: 'Apteek' },
                    { value: 'clinic', label: 'Erakliinik' },
                    { value: 'hospital', label: 'Haigla' },
                    { value: 'other', label: 'Muu' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, subsector: option.value });
                        setTimeout(() => {
                          if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
                        }, 300);
                      }}
                      className={`w-full flex items-center p-4 border-2 rounded-lg cursor-pointer transition text-left ${
                        formData.subsector === option.value
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-medium text-gray-900">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {formData.sector === 'other' && (
                <input
                  type="text"
                  value={formData.subsector || ''}
                  onChange={(e) => setFormData({ ...formData, subsector: e.target.value })}
                  placeholder="Näiteks: konsultatsioon, katusekate paigaldus..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-900 bg-white"
                />
              )}

              {!['healthcare', 'other'].includes(formData.sector) && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Pole vaja täpsustada, jätkake edasi</p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Employee Count */}
          {currentStep === 3 && (
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                  Organisatsiooni suurus
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Mitu töötajat teil on?</h2>
              <p className="text-gray-600 mb-6">
                Organisatsiooni suurus on üks NIS2 kohaldatavuse kriteeriumitest.
              </p>

              <div className="space-y-3">
                {[
                  { value: '1-10', label: '1-10 töötajat' },
                  { value: '11-50', label: '11-50 töötajat' },
                  { value: '51-250', label: '51-250 töötajat' },
                  { value: '251+', label: '251+ töötajat' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, employeeCount: option.value });
                      setTimeout(() => {
                        if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
                      }, 300);
                    }}
                    className={`w-full flex items-center p-4 border-2 rounded-lg cursor-pointer transition text-left ${
                      formData.employeeCount === option.value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Revenue */}
          {currentStep === 4 && (
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                  Organisatsiooni suurus
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Kas teie käive on üle 10 miljoni euro aastas?
              </h2>
              <p className="text-gray-600 mb-6">
                Aastakäive on samuti NIS2 kohaldatavuse kriteerium.
              </p>

              <div className="space-y-3">
                {[
                  { value: '>10M', label: 'Jah, üle 10 miljoni euro' },
                  { value: '<10M', label: 'Ei, alla 10 miljoni euro' },
                  { value: 'unknown', label: 'Ei tea täpselt' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, revenue: option.value });
                      setTimeout(() => {
                        if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
                      }, 300);
                    }}
                    className={`w-full flex items-center p-4 border-2 rounded-lg cursor-pointer transition text-left ${
                      formData.revenue === option.value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: IT Systems */}
          {currentStep === 5 && (
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  IT infrastruktuur
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Milliseid IT süsteeme kasutate?</h2>
              <p className="text-gray-600 mb-6">Valige kõik, mis teie organisatsioonis kasutusel on.</p>

              <div className="space-y-3">
                {[
                  { value: 'email', label: 'Email (Google Workspace / Microsoft 365)' },
                  { value: 'accounting', label: 'Raamatupidamistarkvar' },
                  { value: 'erp', label: 'ERP süsteem' },
                  { value: 'crm', label: 'CRM süsteem' },
                  { value: 'document_management', label: 'Dokumendihaldus' },
                  { value: 'database', label: 'Andmebaasid (kliendid, patsiendid jne)' },
                  { value: 'website', label: 'Veebileht / E-pood' },
                  { value: 'cloud_services', label: 'Pilve teenused (AWS, Azure jne)' },
                  { value: 'none', label: 'Ei kasuta IT süsteeme' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                      formData.itSystems.includes(option.value)
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.itSystems.includes(option.value)}
                      onChange={() => handleITSystemToggle(option.value)}
                      className="mr-3 h-4 w-4"
                    />
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Security Procedures */}
          {currentStep === 6 && (
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                  Infoturve praegune seis
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Kas teil on kirjalik infoturbepoliitika?
              </h2>
              <p className="text-gray-600 mb-6">
                Infoturbepoliitika on NIS2 kohustuslik nõue.
              </p>

              <div className="space-y-3">
                {[
                  { value: 'documented_approved', label: 'Jah, kinnitatud juhtkonna poolt' },
                  {
                    value: 'documented_not_approved',
                    label: 'Jah, aga pole veel kinnitatud',
                  },
                  { value: 'not_documented', label: 'Ei, pole alustatud' },
                  { value: 'unknown', label: 'Ei tea' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, securityProcedures: option.value });
                      setTimeout(() => {
                        if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
                      }, 300);
                    }}
                    className={`w-full flex items-center p-4 border-2 rounded-lg cursor-pointer transition text-left ${
                      formData.securityProcedures === option.value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Security Officer */}
          {currentStep === 7 && (
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                  Infoturve praegune seis
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Kas teil on määratud infoturbe vastutaja?
              </h2>
              <p className="text-gray-600 mb-6">
                NIS2 nõuab, et organisatsioonil oleks selgelt määratud infoturbe eest vastutav isik.
              </p>

              <div className="space-y-3">
                {[
                  { value: 'yes_dedicated', label: 'Jah, eraldi infoturbe spetsialist' },
                  { value: 'yes_part_time', label: 'Jah, keegi tegeleb sellega osaliselt' },
                  { value: 'no', label: 'Ei, pole määratud' },
                  { value: 'unknown', label: 'Ei tea' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, hasSecurityOfficer: option.value });
                      setTimeout(() => {
                        if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
                      }, 300);
                    }}
                    className={`w-full flex items-center p-4 border-2 rounded-lg cursor-pointer transition text-left ${
                      formData.hasSecurityOfficer === option.value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 8: Personal Data */}
          {currentStep === 8 && (
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                  Andmekaitse
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Kas te töötlete isikuandmeid?
              </h2>
              <p className="text-gray-600 mb-6">
                Isikuandmete töötlemine toob kaasa täiendavaid GDPR ja NIS2 nõudeid.
              </p>

              <div className="space-y-3">
                {[
                  { value: 'yes_extensive', label: 'Jah, mahukalt (nt terviseandmed, finantsandmed)' },
                  { value: 'yes_limited', label: 'Jah, vähesel määral (nt kontaktandmed)' },
                  { value: 'no', label: 'Ei' },
                  { value: 'unknown', label: 'Ei tea' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      const updatedData = { ...formData, processesPersonalData: option.value };
                      setFormData(updatedData);
                      // Last step - submit after short delay with the updated data
                      setTimeout(() => {
                        handleSubmit(updatedData);
                      }, 300);
                    }}
                    className={`w-full flex items-center p-4 border-2 rounded-lg cursor-pointer transition text-left ${
                      formData.processesPersonalData === option.value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation - only show for IT Systems step (checkboxes) and text input */}
          {(currentStep === 2 && ['other'].includes(formData.sector)) || currentStep === 5 ? (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-6 py-2 text-gray-700 font-semibold hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
              >
                Tagasi
              </button>

              <button
                onClick={handleNext}
                disabled={!isStepValid() || loading}
                className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Salvestan...' : 'Edasi'}
              </button>
            </div>
          ) : (
            <div className="mt-8 pt-6 border-t text-center">
              <p className="text-sm text-gray-500">Valige vastus jätkamiseks</p>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
