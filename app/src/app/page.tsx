import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header/Nav */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">N2</span>
            </div>
            <span className="font-bold text-xl">NIS2 Abimees</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-700 hover:text-primary-600">
              Võimalused
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-primary-600">
              Hinnad
            </a>
            <a href="#faq" className="text-gray-700 hover:text-primary-600">
              KKK
            </a>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-primary-600 hover:text-primary-700"
            >
              Dashboard (Demo)
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Alusta tasuta
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            Kas teie organisatsioon on{' '}
            <span className="text-primary-600">NIS2 nõuetega</span> valmis?
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            AI juhendab sind läbi protsessi 30 minutiga. Lihtsalt. Kiirelt. Taskukohaselt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/signup"
              className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-lg font-semibold"
            >
              Alusta tasuta
            </Link>
            <a
              href="#demo"
              className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition text-lg font-semibold"
            >
              Vaata demo
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Tasuta 30 päeva
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Krediitkaarti ei küsita
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Kõik dokumendid kaasas
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Miks NIS2 Abimees?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Abi</h3>
              <p className="text-gray-600">
                Räägib lihtsas eesti keeles, mitte IT žargoonis. Üks küsimus korraga.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">⏱️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Kiire</h3>
              <p className="text-gray-600">
                30-45 minutit ja esimene hindamine valmis. Mitte nädalaid ega kuid.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Odav</h3>
              <p className="text-gray-600">
                Alates €49/kuu. Konsultandid maksavad €10,000+
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Kuidas see töötab?
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Lihtne 3-sammuline protsess, mis viib sind NIS2 vastavuseni
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Täida profiil</h3>
              <p className="text-gray-600">
                8 lihtsat küsimust sinu organisatsiooni kohta. AI analüüsib, kas NIS2 kehtib sinu kohta.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Tee enesehindamine</h3>
              <p className="text-gray-600">
                30-45 minutit AI-ga vestlemist. Saad täpse ülevaate, kus sul on puudujääke.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Saa dokumendid</h3>
              <p className="text-gray-600">
                AI genereerib sulle vajalikud dokumendid ja tegevusplaani. Lae alla ja kasuta kohe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Lihtne ja läbipaistev hinnad
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Vali endale sobiv pakett. Alusta tasuta, upgrade'i kui oled valmis.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* FREE Plan */}
            <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Tasuta</h3>
                <div className="text-4xl font-bold mb-2">€0</div>
                <p className="text-gray-600">Igavesti tasuta</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Organisatsiooni profiil</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">NIS2 kohaldatavuse kontroll</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">AI vestlus (20 sõnumit/kuu)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Enesehindamine (demo)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-400">Dokumentide salvestamine</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-400">Tegevusplaan</span>
                </li>
              </ul>
              <Link
                href="/signup"
                className="block w-full text-center px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Alusta tasuta
              </Link>
            </div>

            {/* STARTER Plan */}
            <div className="bg-primary-50 rounded-xl p-8 border-2 border-primary-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Soovitatud
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="text-4xl font-bold mb-2">€49</div>
                <p className="text-gray-600">kuu kohta</p>
                <p className="text-sm text-gray-500 mt-2">või €490/aasta (säästa 17%)</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 font-semibold">Kõik tasuta funktsioonid +</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Piiramatu AI vestlus</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Täielik enesehindamine</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">3 põhidokumenti (PDF + DOCX)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Tegevusplaani jälgimine</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Email tugi (48h)</span>
                </li>
              </ul>
              <Link
                href="/signup"
                className="block w-full text-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                Alusta 30-päevast tasuta prooviperioodi
              </Link>
              <p className="text-center text-sm text-gray-600 mt-3">
                Krediitkaarti ei küsita
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Suurem organisatsioon? Vajad mitut asukohta või meeskonnaliikmeid?
            </p>
            <a
              href="mailto:info@nis2abimees.ee"
              className="inline-block px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition font-semibold"
            >
              Võta meiega ühendust
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <p className="text-primary-100">Odavam kui konsultandid</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">30 min</div>
              <p className="text-primary-100">Keskmine aeg esimeseks hindamiseks</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-primary-100">Eestikeelne tugi</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Korduma kippuvad küsimused
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Leiad vastused kõige sagedamini esitatud küsimustele
          </p>
          <div className="max-w-3xl mx-auto space-y-6">
            <details className="bg-white rounded-lg p-6 shadow-sm group">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                Kas NIS2 direktiiv kehtib minu organisatsiooni kohta?
                <span className="text-primary-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                NIS2 direktiiv kehtib organisatsioonidele, mis tegutsevad kriitilistes sektorites (tervishoid, energeetika, transport, finantsteenused jne) ja on keskmise suurusega või suuremad (50+ töötajat või 10M+ käive). Meie platvorm aitab sul automaatselt kindlaks määrata, kas direktiiv kehtib sinu organisatsiooni kohta.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm group">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                Kui kaua võtab aega NIS2 nõuetele vastavuse saavutamine?
                <span className="text-primary-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                Esimene enesehindamine ja dokumentide genereerimine võtab meie platvormil 30-45 minutit. Päris vastavuse saavutamine sõltub sinu praegusest olukorrast - see võib võtta mõnest nädalast mitmete kuudeni. Meie AI aitab sul koostada realistliku tegevusplaani ja samm-sammult nõuetele vastavust saavutada.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm group">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                Kas ma saan dokumendid alla laadida ja ise kasutada?
                <span className="text-primary-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                Jah! STARTER paketiga saad kõik genereeritud dokumendid alla laadida nii PDF kui ka Word (DOCX) formaadis. Saad neid ise muuta ja kasutada oma organisatsioonis. Dokumendid on kohandatud sinu organisatsiooni profiili ja NIS2 nõuetega.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm group">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                Kas ma vajan IT-tausta, et seda kasutada?
                <span className="text-primary-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                Ei! Meie platvorm on disainitud spetsiaalselt inimestele, kellel pole IT-tausta. AI räägib sinuga lihtsas eesti keeles, ilma tehnilise žargoonita. Kõik küsimused on selged ja arusaadavad. Kui midagi on ebaselge, saad AI-lt kohe abi küsida.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm group">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                Mis juhtub pärast tasuta prooviperioodi lõppu?
                <span className="text-primary-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                30 päeva tasuta prooviperioodi jooksul saad kasutada kõiki STARTER paketi funktsioone. Kui sa ei tühista prooviperioodi lõppemisest vähemalt 24h enne, siis hakkame võtma €49/kuu. Saad igal ajal tühistada - ei mingeid pikaajalisi lepinguid ega peente trükitähtedega tingimusi.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm group">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                Kas minu andmed on kaitstud ja konfidentsiaalsed?
                <span className="text-primary-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                Jah! Kõik sinu andmed on krüpteeritud ja talletatakse turvaliselt Euroopa Liidu serverites (Supabase). Kasutame Anthropic Claude AI-d, mis ei treenita sinu andmetel. Sinu organisatsiooni info ja dokumendid ei ole kunagi kellegagi jagatud. Loeme privaatsust väga tõsiselt.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm group">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                Kas saate aidata ka juurutamisel ja konsultatsiooniga?
                <span className="text-primary-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-gray-600 mt-4">
                Hetkel pakume email tuge (48h vastamise aeg). Kui vajad rohkem personaalset abi või konsultatsiooni, võta meiega otse ühendust - saame pakkuda täiendavaid teenuseid vastavalt sinu vajadustele.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Valmis alustama?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Proovi 30 päeva tasuta. Krediitkaarti ei küsita.
          </p>
          <a
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition text-lg font-semibold"
          >
            Alusta kohe
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N2</span>
                </div>
                <span className="font-bold text-white">NIS2 Abimees</span>
              </div>
              <p className="text-sm">
                AI-toega infoturbe ja vastavuse juhtimise platvorm
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Toode</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white">Võimalused</a></li>
                <li><a href="#pricing" className="hover:text-white">Hinnad</a></li>
                <li><a href="#faq" className="hover:text-white">KKK</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Ettevõte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-white">Meist</a></li>
                <li><a href="/contact" className="hover:text-white">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/terms" className="hover:text-white">Tingimused</a></li>
                <li><a href="/privacy" className="hover:text-white">Privaatsus</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            <p>&copy; 2026 NIS2 Abimees. Kõik õigused kaitstud.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
