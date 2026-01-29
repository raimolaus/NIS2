import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import Link from 'next/link';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ onboarded?: string }>;
}) {
  // TEMPORARY: Auth disabled for testing
  // const session = await auth();
  // if (!session?.user?.email) {
  //   redirect('/login');
  // }

  // Mock session for testing
  const session = {
    user: {
      email: 'test@test.ee',
      name: 'Test User',
    },
  };

  // MOCK DATA - Database disabled for testing
  const org = {
    id: 'mock-org-id',
    name: 'Test Organisatsioon',
    sector: 'healthcare',
    employeeCount: '11-50',
    revenue: '€1-10M',
    nis2Applicable: true,
    nis2Category: 'important',
    assessments: [],
  };

  const latestAssessment = org.assessments?.[0];

  // Fetch user with organization
  // const user = await prisma.user.findUnique({
  //   where: { email: session.user.email },
  //   include: {
  //     organization: {
  //       include: {
  //         assessments: {
  //           orderBy: { createdAt: 'desc' },
  //           take: 1,
  //         },
  //       },
  //     },
  //   },
  // });

  // If no organization, redirect to onboarding
  // if (!user?.organization) {
  //   redirect('/onboarding');
  // }

  // const org = user.organization;
  // const latestAssessment = org.assessments?.[0];

  // Show onboarding success message
  const params = await searchParams;
  const showOnboardingSuccess = params.onboarded === 'true';

  // Format sector for display
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">N2</span>
              </div>
              <span className="font-bold text-xl">NIS2 Abimees</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-primary-600 font-semibold border-b-2 border-primary-600 pb-1"
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
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Profiil
              </Link>
            </nav>
          </div>

          {/* User menu */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700 hidden sm:block">Tere, {session.user.name}!</span>
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Logi välja
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">{org.name}</h1>
            <p className="text-gray-600 mt-1">
              {sectorLabels[org.sector] || org.sector} · {org.employeeCount} töötajat
            </p>
          </div>
          <Link
            href="/profile"
            className="px-4 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition font-semibold"
          >
            Vaata profiili
          </Link>
        </div>

        {/* Onboarding success message */}
        {showOnboardingSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            ✓ Profiil edukalt täidetud! Nüüd saad alustada NIS2 enesehindamisega.
          </div>
        )}

        {/* NIS2 Status Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">NIS2 Kohaldatavus</h2>
              {org.nis2Applicable ? (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                      ✓ NIS2 kohaldub
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                      {org.nis2Category === 'essential'
                        ? 'Oluline üksus'
                        : 'Tähtis üksus'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Teie organisatsioon on NIS2 direktiivi kohaldamisala all.
                    Kohustuslik nõuete täitmine: 2024 oktoober.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Järgmine samm
                    </h3>
                    <p className="text-blue-700 text-sm mb-3">
                      Teeme enesehindamise, et näha, kus te praegu olete NIS2 nõuete
                      täitmisega. See võtab umbes 30-45 minutit.
                    </p>
                    <Link
                      href="/assessment"
                      className="inline-block px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition"
                    >
                      Alusta enesehindamist
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                      NIS2 ei kohaldu
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Teie organisatsiooni suuruse ja sektori põhjal ei ole NIS2 direktiiv
                    teile kohustuslik. Siiski soovitame järgida head
                    infoturbe praktikat.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quick stats with progress bars */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-gray-500 text-sm font-medium">NIS2 Vastavus</div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">
              {latestAssessment?.score ?? 0}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div
                className={`h-2 rounded-full ${
                  (latestAssessment?.score ?? 0) >= 80
                    ? 'bg-green-500'
                    : (latestAssessment?.score ?? 0) >= 60
                    ? 'bg-yellow-500'
                    : (latestAssessment?.score ?? 0) >= 40
                    ? 'bg-orange-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${latestAssessment?.score ?? 0}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600">
              {latestAssessment?.status === 'completed'
                ? `Enesehindamine lõpetatud`
                : latestAssessment?.status === 'in_progress'
                ? `Pooleli (${latestAssessment.progress}/40)`
                : 'Enesehindamine alustamata'}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-gray-500 text-sm font-medium">Dokumendid</div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl">📄</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">0<span className="text-xl text-gray-400">/3</span></div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="text-sm text-gray-600">Pole veel loodud</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-gray-500 text-sm font-medium">Tegevusplaan</div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xl">✓</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">0<span className="text-xl text-gray-400">/0</span></div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="text-sm text-gray-600">Ülesandeid pole veel</div>
          </div>
        </div>

        {/* Assessment Section Scores - Only show if completed */}
        {latestAssessment?.status === 'completed' && latestAssessment.answers && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Enesehindamise tulemused valdkonniti</h2>
            <p className="text-sm text-gray-600 mb-6">
              Vastavuse skoor 6 peamises valdkonnas (Microsoft Defender Score stiilis)
            </p>
            <div className="space-y-4">
              {[
                { id: 'organization', name: 'Organisatsioon ja juhtimine', icon: '🏢' },
                { id: 'risk', name: 'Riskihaldus ja varahaldus', icon: '⚖️' },
                { id: 'security', name: 'Tehnilised turvameetmed', icon: '🔐' },
                { id: 'incidents', name: 'Intsidentide haldus', icon: '🚨' },
                { id: 'backup', name: 'Varundamine ja taastamine', icon: '💾' },
                { id: 'people', name: 'Töötajad ja koolitused', icon: '👥' },
              ].map((section) => {
                // Calculate score for this section
                const { calculateSectionScore } = require('@/data/assessment-questions');
                const score = calculateSectionScore(section.id, latestAssessment.answers as Record<string, string>);
                const getScoreColor = (score: number) => {
                  if (score >= 80) return 'bg-green-500';
                  if (score >= 60) return 'bg-yellow-500';
                  if (score >= 40) return 'bg-orange-500';
                  return 'bg-red-500';
                };

                return (
                  <div key={section.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{section.name}</span>
                        <span className="text-sm font-bold text-gray-900">{score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${getScoreColor(score)}`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-6 border-t">
              <Link
                href="/assessment"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                → Vaata detailseid tulemusi
              </Link>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Kiirtoimingud</h2>
          <p className="text-primary-100 mb-6">
            Vali, millega soovid alustada
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/assessment"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition group"
            >
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-semibold text-lg mb-2 group-hover:underline">
                Enesehindamine
              </h3>
              <p className="text-sm text-primary-100">
                40 küsimust, 30-45 min
              </p>
            </Link>

            <Link
              href="/documents"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition group"
            >
              <div className="text-3xl mb-3">📄</div>
              <h3 className="font-semibold text-lg mb-2 group-hover:underline">
                Dokumendid
              </h3>
              <p className="text-sm text-primary-100">
                Genereeri NIS2 dokumente
              </p>
            </Link>

            <Link
              href="/profile"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition group"
            >
              <div className="text-3xl mb-3">⚙️</div>
              <h3 className="font-semibold text-lg mb-2 group-hover:underline">
                Profiil
              </h3>
              <p className="text-sm text-primary-100">
                Organisatsiooni andmed
              </p>
            </Link>

            <Link
              href="/chat"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition group"
            >
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-semibold text-lg mb-2 group-hover:underline">
                AI Vestlus
              </h3>
              <p className="text-sm text-primary-100">
                Küsi NIS2 kohta
              </p>
            </Link>
          </div>
        </div>

        {/* Ülesanded */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Sinu tee NIS2 vastavuseni</h2>
            <div className="text-sm text-gray-500">1/5 tehtud</div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Täida organisatsiooni profiil</div>
                <div className="text-sm text-gray-600 mt-1">Valmis! Hea töö!</div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded hover:bg-blue-100 transition cursor-pointer">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Tee NIS2 enesehindamine</div>
                <div className="text-sm text-gray-600 mt-1">40 küsimust, 30-45 minutit</div>
                <Link
                  href="/assessment"
                  className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                >
                  Alusta →
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 border-l-4 border-gray-300 rounded opacity-60">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-700">Genereeri infoturbepoliitika</div>
                <div className="text-sm text-gray-500 mt-1">Saadaval pärast enesehindamist</div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 border-l-4 border-gray-300 rounded opacity-60">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-700">Genereeri riskihinnang</div>
                <div className="text-sm text-gray-500 mt-1">Saadaval pärast enesehindamist</div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 border-l-4 border-gray-300 rounded opacity-60">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-700">Loo tegevusplaan</div>
                <div className="text-sm text-gray-500 mt-1">Saadaval pärast dokumente</div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-gray-700">Üldine progress</span>
              <span className="text-gray-600">20%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all" style={{ width: '20%' }}></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
