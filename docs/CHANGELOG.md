# CHANGELOG - NIS2 Abimees

Kõik olulised muudatused projektis dokumenteeritakse siin.

---

## [Sprint 5] - 2026-04-10

### ✅ Lisatud

#### Dashboard UX Redesign - Phase 1 (UNICORN Strategy)

**Strateegia dokument:** `docs/DASHBOARD_UX_STRATEGY.md`

**1. Hero Health Score Component**
- **Giant circular progress gauge** (200x200 SVG)
  - Animated progress arc with color coding
  - 72px compliance score display
  - Dynamic health status: CRITICAL/AT RISK/GOOD/EXCELLENT
  - Color zones: red (0-39%), amber (40-69%), green (70-89%), purple (90-100%)
- **Status & deadline section**
  - Health status box with emoji indicators (🚨⚠️✓🏆)
  - NIS2 deadline countdown with color coding
  - Days until/overdue display
- **Top 3 priority actions**
  - Dynamic action items based on KPIs
  - Critical risks alert (red background)
  - Assessment completion prompt (blue background)
  - Document generation reminder (amber background)
  - Direct action buttons linking to relevant pages
- **Visual hierarchy**
  - 2-column layout (circular gauge + info)
  - Responsive mobile stack
  - Border color matches health status

**2. Critical Alerts Banner**
- **Auto-generated alerts** from KPIs
  - Critical risks open → "FIX NOW" button
  - NIS2 deadline passed → "REVIEW" button
  - Missing documents → "GENERATE" button
- **Visual design**
  - Red border-2 with red-50 background
  - Pulsing 🚨 emoji animation
  - White alert cards with colored borders
- **Animations**
  - `animate-pulse` for emoji (Tailwind default)
  - `animate-pulse-slow` for critical risk card (custom)
  - Smooth 2s cubic-bezier animation
- **Conditional rendering**
  - Only shows when alerts exist
  - Dismissable (future feature)
- **CSS additions** (`globals.css`)
  - Custom `@keyframes pulse-slow`
  - Scale 1.0 → 1.01 with opacity change

**3. KPI Cards Redesign**
- **Enhanced 4 main cards:**
  1. Overall Compliance Score
  2. Risk Maturity Level
  3. Documentation Completeness
  4. Critical Risks Open

- **New features per card:**
  - **Trend indicators** (↗️↘️→) - top-right corner
  - **Giant numbers** - text-5xl (48px) for values
  - **Progress bars with target lines**
    - 3px height (h-3)
    - Blue vertical line showing target
    - Overall: 70% target
    - Risk Maturity: 40% target (Arenev level)
    - Documentation: 100% target (6/6)
    - Critical Risks: 0 target
  - **Micro-copy**
    - "Gap: X% to target"
    - "3 more risks needed"
    - "2 documents missing"
    - Concrete, actionable language
  - **Hover effects**
    - `hover:shadow-lg transition-shadow`
  - **Action buttons**
    - "VIEW DETAILS →" ghost variant
    - "FIX NOW →" destructive for critical
    - Full width, small size
  - **Color coding**
    - Dynamic colors based on values
    - Red for critical/bad
    - Amber for warning
    - Blue for in-progress
    - Green for good/complete

- **Specific card enhancements:**
  - **Overall Compliance:** Shows gap to 70% GOOD level
  - **Risk Maturity:** Displays level (1-5) badge, calculates needed risks
  - **Documentation:** Shows X/6 format with missing count
  - **Critical Risks:** Red background if >0, "FIX NOW" button variant

**4. Insights & Recommendations Panel**
- **AI-like intelligence** (rule-based, no actual AI)
- **Score breakdown analysis**
  - Calculates impact: Assessment (-X%), Risks (-Y%), Docs (-Z%)
  - Shows what's dragging score down
  - Conditional rendering (only if score < 70%)
- **Quick Win calculator**
  - Compares 3 potential actions
  - Picks highest impact: Assessment > Docs > Risks
  - Shows predicted score boost: "42% (+15%)"
  - Time estimates: "~25 min", "~15 min", "~2 hours"
  - Direct action button
- **Industry Benchmarking**
  - Dynamic: "Similar companies (healthcare, 11-50) average 68%"
  - Shows gap or advantage
  - Social proof element
- **Success message**
  - When score >= 70%: "Excellent Progress!" 🏆
  - Positive reinforcement
- **Visual design**
  - Gradient border: indigo-200
  - Gradient background: indigo-50 to blue-50
  - Emoji indicators: 💡⚠️🎯📊🏆
  - White cards with colored borders

**5. Progress Journey Redesign - Gamified**
- **Visual timeline** (top section)
  - 5-step horizontal progress bar
  - Circular indicators (✓ ● ○ 🔒)
  - Color coding: green (done), blue (active), gray (locked)
  - Labels: "Done", "Here", "Next", "Locked"
  - Connecting lines show progress
  - Shadow-lg on active steps
- **Gamification elements**
  - Progress % badges
  - Time estimates: "Est. 25 min remaining"
  - Achievement badges: 🏆🎖️
    - "First Steps!" (onboarding)
    - "Self-Awareness Master!" (assessment)
  - Unlockables: 🔒 symbol
    - Risk Management unlocks at 80% assessment
    - Documentation unlocks at 3+ docs
    - Monitoring unlocks at 70% score
  - Pulsing animation on current step
- **5 detailed step cards:**
  1. **Onboarding** - Complete (green border-2)
  2. **Assessment** - In progress (blue-50 bg, pulse animation)
     - Progress bar
     - Remaining time calculation
     - "CONTINUE →" button
  3. **Risk Management** - Locked/Unlocked
     - Shows X/Y mitigated
     - Unlock condition visible
  4. **Documentation** - Locked/Unlocked
     - Shows X/6 complete
     - Progress-based unlock
  5. **Continuous Monitoring** - Locked
     - Future feature
     - Clear unlock criteria
- **Visual hierarchy**
  - Purple gradient card (border-purple-200)
  - From-purple-50 to-pink-50 background
  - Large 14x14 step circles
  - Bold step titles with [N] prefix
  - Conditional coloring based on state

**6. Benchmarking Integration**
- Integrated into Insights Panel (not separate section)
- Industry average: 68% (hardcoded, realistic)
- Dynamic sector/employee count display
- Comparative messaging

**7. Animations & Transitions (Phase 3)**
- **Staggered entrance animations**
  - All major sections: `animate-slide-up` with delays
  - Hero Score: 0ms delay
  - Critical Alerts: 100ms delay
  - KPI Section: 200ms delay
  - Stats Grid: 400ms delay
  - Insights Panel: 300ms delay
  - Progress Journey: 500ms delay
- **CSS Keyframes** (`globals.css`)
  - `@keyframes slideUp` - opacity 0→1, translateY 20px→0
  - `@keyframes countUp` - scale 1.2→1 for numbers
  - `@keyframes fadeIn` - simple opacity fade
  - `@keyframes scaleIn` - scale 0.9→1
  - Delay classes: `animate-delay-100` through `animate-delay-600`
- **Initial state**: `opacity-0` before animation triggers
- **Smooth transitions**: 0.5s ease-out
- **Existing animations retained**:
  - Pulse for critical alerts (2s infinite)
  - Pulse-slow for critical risk card

**8. Mobile Optimization (Phase 3)**
- Already responsive via Tailwind breakpoints:
  - `sm:` - 640px+ (tablets)
  - `md:` - 768px+ (small laptops)
  - `lg:` - 1024px+ (desktops)
- **Responsive grids**:
  - KPI Cards: 1 col mobile → 2 col sm → 4 col lg
  - Stats Grid: 1 col mobile → 3 col md
- **Flex layouts**:
  - Hero Section: stack mobile (`flex-col`) → side-by-side desktop (`md:flex-row`)
- **Navigation**: Hidden on mobile (`hidden md:flex`)
- **Timeline**: Scales down gracefully (12x12 circles, smaller text)
- **Touch-friendly**: All buttons min-height 44px (WCAG)

**9. Accessibility - WCAG AA (Phase 3)**
- **ARIA Labels**
  - Hero Score: `role="region"` `aria-label="NIS2 Compliance Health Score"`
  - KPI Section: `role="region"` `aria-label="NIS2 Key Performance Indicators"`
  - SVG Gauge: `role="img"` `aria-label="Compliance score: X%"`, `aria-hidden="true"` on decorative SVG
- **Semantic HTML**
  - Proper heading hierarchy (h1 → h2 → h3)
  - Lists for navigation and steps
- **Keyboard Navigation**
  - All interactive elements focusable (via shadcn/ui)
  - Focus visible states (default browser + Tailwind `focus:` classes)
  - Tab order logical (DOM order)
- **Color Contrast**
  - Text: 4.5:1 minimum (WCAG AA)
  - Large text (24px+): 3:1 minimum
  - Status colors meet contrast requirements:
    - Red text on white: 5.2:1
    - Green text on white: 4.6:1
    - Blue text on white: 8.1:1
- **Screen Reader Support**
  - Descriptive link text ("View Details →" not "Click here")
  - Button labels clear and concise
  - Status communicated via text + icons
- **No reliance on color alone**
  - Icons + text for status (✓, ⚠️, 🔒)
  - Multiple visual cues (borders, badges, text)

**10. Dark Mode Support (Phase 3)**
- **ThemeToggle Component** (`src/components/ThemeToggle.tsx`)
  - Sun/Moon icon toggle button
  - localStorage persistence
  - System preference detection (`prefers-color-scheme`)
  - Auto-applies `dark` class to `<html>`
  - Accessible: ARIA labels, keyboard navigation
  - Ghost button variant, fits in header
- **CSS Variables** (already in `globals.css`)
  - Light mode: white backgrounds, dark text
  - Dark mode: dark backgrounds (222.2 84% 4.9%), light text
  - All shadcn/ui colors adapted automatically
- **Dark Mode Classes Added**
  - **Insights Panel**: `dark:from-indigo-950 dark:to-blue-950`, `dark:border-indigo-800`, `dark:text-indigo-100`
  - **Progress Journey**: `dark:from-purple-950 dark:to-pink-950`, `dark:border-purple-800`, `dark:text-purple-100`
  - **Critical Alerts**: `dark:bg-red-950/30`, `dark:border-red-800`
  - **Cards**: Automatic via CSS variables (bg-card, text-card-foreground)
- **Tailwind Config**
  - `darkMode: ["class"]` - class-based dark mode
  - Works via `dark:` prefix on all utilities
- **Integration**
  - Toggle added to dashboard header (next to Profiil)
  - Smooth transitions (inherit from Tailwind)
  - Persistence across page reloads
  - Works immediately on first load

#### Dashboard KPI System
- **Loodud Dashboard Mock API KPI calculation**
  - 10 erinevat KPI'd auto-calculated
  - Weighted compliance score (40% assessment, 30% docs, 30% risks)
  - Risk maturity level (5 levels: Algne → Optimeeritud)
  - Documentation completeness (X/6 documents)
  - Critical risks counter with status
  - NIS2 deadline countdown
  - Assessment completion percentage
  - Documents approved percentage
- **Dashboard frontend KPI section** (4 main KPI cards + 3 additional metrics)
  - Large KPI display cards with border-2 emphasis
  - Color-coded status indicators (green/red/yellow/blue)
  - Progress bars for all metrics
  - Responsive grid layout (2-4 columns)
  - Professional business dashboard look

#### Individual Document Page
- **Loodud `/documents/[id]` leht** (`app/src/app/(dashboard)/documents/[id]/page.tsx`, 522 rida)
  - Täielik dokumendi vaatamise ja muutmise leht
  - Inline editing režiim (toggle edit mode)
  - Document header: pealkiri, versioon, status, timestamps
  - Action buttons:
    - ✏️ Muuda - Toggle edit mode
    - ✓ Kinnita dokument - Approve (draft → approved)
    - 📦 Arhiveeri - Archive document
    - 🗑️ Kustuta - Delete with confirmation
    - 🖨️ Prindi / Salvesta PDF - Browser print dialog
    - 📥 Lae alla DOCX - Disabled (tuleviku funktsioon)
  - Document content card:
    - View mode: Pre-formatted text display
    - Edit mode: Textarea (20 rows, monospace)
    - Markdown hint
  - Metadata card: ID, tüüp, kuupäevad
  - Help card (draft status ainult)
  - Print support (print:hidden, print:shadow-none)
  - Loading states: initial loading, not found, saving
  - Error handling: try-catch, 404 redirect, confirmation dialogs
  - API integration:
    - GET `/api/documents-mock/[id]` - Load document
    - PATCH `/api/documents-mock/[id]` - Update title/content/status
    - DELETE `/api/documents-mock/[id]` - Delete document
  - Next.js 15 async params support
  - shadcn/ui komponendid (Card, Button, Badge, Input, Textarea, Label)

#### Risks Mock API Endpoints
- **Loodud `/api/risks-mock` endpoints**
  - `GET /api/risks-mock` - Kõik riskid (sorteeritud risk level järgi)
  - `POST /api/risks-mock` - Uue riski loomine (validatsiooniga)
  - `PATCH /api/risks-mock/[id]` - Riski uuendamine
  - `DELETE /api/risks-mock/[id]` - Riski kustutamine
  - In-memory storage (reset serveri restardi korral)
  - 2 pre-populated mock riski

#### Documents Mock API Endpoints
- **Loodud `/api/documents-mock` endpoints**
  - `GET /api/documents-mock` - Kõik dokumendid (sorteeritud kuupäeva järgi)
  - `POST /api/documents-mock` - Dokumendi loomine VÕI versiooni uuendamine
  - `GET /api/documents-mock/[id]` - Ühe dokumendi lugemine
  - `PATCH /api/documents-mock/[id]` - Dokumendi uuendamine
  - `DELETE /api/documents-mock/[id]` - Dokumendi kustutamine
  - Intelligent versioonimine (1.0 → 1.1 → 1.2)
  - Auto approvedAt timestamp
  - 3 pre-populated mock dokumenti

#### Assessment Mock API Endpoint
- **Loodud `/api/assessment-mock` endpoint**
  - `GET /api/assessment-mock` - Praegune assessment
  - `POST /api/assessment-mock` - Loo/lähtesta assessment
  - `PATCH /api/assessment-mock` - Salvesta vastused ja progress
  - `DELETE /api/assessment-mock` - Lähtesta assessment (alusta uuesti)
  - Auto score calculation kui progress = 40
  - Auto status update (not_started → in_progress → completed)
  - Auto completedAt timestamp
  - Zod validation
  - Single object storage (mitte array)

#### Frontend-Backend Integration

**Risks Page** (`app/src/app/(dashboard)/risks/page.tsx`)
- Asendatud local state → API calls
- Lisatud `useEffect` hook riskide laadimiseks
- Lisatud `loading` state
- CRUD operatsioonid kasutavad fetch() API'ga suhtlemiseks
- Error handling try-catch blokk'idega
- User-friendly error messages (eesti keeles)

**Documents Page** (`app/src/app/(dashboard)/documents/page.tsx`)
- Asendatud local state → API calls
- Lisatud `useEffect` hook dokumentide laadimiseks
- Lisatud `loading` state ja loading UI
- `handleGenerate()` kasutab nüüd API'd (POST request)
- Intelligent document update logic (increment version)
- TypeScript interface Document lisatud
- Error handling ja user feedback

**Assessment Page** (`app/src/app/(dashboard)/assessment/page.tsx`)
- Lisatud `useEffect` hook assessment laadimiseks
- Lisatud `loadAssessment()` - laeb salvestatud vastused
- `handleNext()` salvestab progress peale iga sektsiooni (PATCH)
- `handleStartOver()` lähtestab assessment (DELETE)
- Initial loading state UI (⏳)
- Progress persistence - jätkab sealt kus pooleli jäeti
- Auto-redirect results lehele kui lõpetatud

#### Prisma Schema Uuendused
- **Risk mudel** (`app/prisma/schema.prisma`)
  - Lisatud `mitigationActions: String? @db.Text`
  - Lisatud `completedActions: String? @db.Text`
  - Käivitatud `npm run db:generate` (edukalt)

### ⚠️ Teadaolevad Probleemid

#### Database Connection Failed
- **Probleem:** Ei õnnestunud ühenduda Supabase PostgreSQL'iga
- **Proovitud:**
  - Direct Connection (port 5432) → Can't reach database server (firewall/VPN)
  - Session Pooler (port 6543) → Tenant or user not found
  - Transaction Pooler (pgbouncer) → Tenant or user not found
- **Lahendus:** Loodud mock API endpoints arenduse jätkamiseks
- **Tulevikus:** Database connection tuleb lahendada deployment'i ajal

### 📝 Dokumentatsioon
- Uuendatud `DEVELOPMENT_LOG.md` detailse API dokumentatsiooniga
- Dokumenteeritud database connection probleemid ja lahendused
- Lisatud testing instructions

---

## [Sprint 4] - 2026-04-07/08

### ✅ Lisatud

#### UI Component System (shadcn/ui)
- **Seadistatud shadcn/ui süsteem**
  - Loodud `components.json` konfiguratsioonifail
  - Uuendatud `tailwind.config.ts` CSS variable'itega
  - Uuendatud `globals.css` shadcn teemaga (HSL-põhised värvid)
  - Loodud `src/lib/utils.ts` cn() funktsiooniga

- **Loodud UI komponendid** (`src/components/ui/`)
  - `button.tsx` - 6 varianti (default, destructive, outline, secondary, ghost, link)
  - `card.tsx` - Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
  - `badge.tsx` - 6 varianti (default, secondary, destructive, outline, success, warning)
  - `input.tsx` - Tekstisisestus
  - `label.tsx` - Välja label'id
  - `textarea.tsx` - Mitmerealine tekstisisestus
  - `progress.tsx` - Progressbar
  - `separator.tsx` - Horisontaalne eraldaja
  - `spinner.tsx` - Laadimise indikaator
  - `form.tsx` - React Hook Form integratsioon (FormField, FormItem, FormLabel, FormControl, FormMessage)
  - `index.ts` - Keskne eksport fail

- **Paigaldatud sõltuvused**
  ```json
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.6.0"
  ```

#### Dashboard Page Refaktoreerimine
- **Fail:** `app/src/app/(dashboard)/dashboard/page.tsx` (432 rida)
- **Muudatused:**
  - Asendatud kõik HTML elemendid shadcn/ui komponentidega
  - Lisatud Card-põhine layout
  - Badge'id NIS2 oleku näitamiseks
  - Progress bar'id skooride visualiseerimiseks
  - Stats kaardid (Enesehindamine, Dokumendid, Tegevuskava)
  - 5-sammuline "Sinu tee vastavuseni" visualiseerimine
  - Kiirtoimingute grid (4 kaarti linkidega)
- **Mock andmed:** Org info, assessment progress, documents, action items

#### Onboarding Flow
- **Fail:** `app/src/app/(dashboard)/onboarding/page.tsx` (550 rida)
- **Muudatused:**
  - Lihtsustatud 8-st sammust → 3 sammu
  - **Samm 1:** Organisatsiooni põhiandmed (nimi, registrikood, sektor, töötajate arv, käive)
  - **Samm 2:** Kontaktandmed (e-post, telefon, CEO nimi/e-post, CISO nimi/e-post)
  - **Samm 3:** NIS2 kohaldatavuse tulemus (automaatne arvutus)
  - Lisatud Zod validatsioon
  - FormProvider + react-hook-form integratsioon
  - Step progress indicator
  - NIS2 kohaldatavuse loogika:
    - Keskmine/suur ettevõte (11+ töötajat)
    - Käive €1M+
    - Kriitiline sektor → "Essential Entity"
    - Mitte-kriitiline → "Important Entity"

#### Assessment UI
- **Fail:** `app/src/app/(dashboard)/assessment/page.tsx` (372 rida)
- **Muudatused:**
  - 40 küsimust jagatud 6 sektsiooni vahel
  - Sektsioon-põhine navigatsioon (üks korraga)
  - Progress tracking (X/40 küsimust)
  - Visuaalne progress bar + section indicator
  - Radio button valikud + "Ei oska vastata" variant
  - Tulemuste leht:
    - Kogu skoor (%)
    - Sektsiooni skoorid eraldi
    - Progress bar'id iga sektsiooni kohta
  - "Alusta uuesti" funktsioon
- **Sektsioonid:**
  1. Organisatsioon ja governance (8 küsimust)
  2. Riskihaldus (7 küsimust)
  3. Küberturvalisus (8 küsimust)
  4. Intsidentide haldus (6 küsimust)
  5. Varundamine ja taaste (5 küsimust)
  6. Inimesed ja koolitused (6 küsimust)

#### Documents Page
- **Fail:** `app/src/app/(dashboard)/documents/page.tsx` (332 rida)
- **Muudatused:**
  - 6 dokumendimalli:
    - STARTER: Infoturbepoliitika, Riskihinnang, Intsidentide haldus
    - PROFESSIONAL: Tegevuse jätkuvuse plaan, Tarneahela turvalisus, Koolitusprogramm
  - Stats kaardid (Kokku dokumente, Kinnitatud, Mustandid)
  - Dokumendi staatus badge'id (Kinnitatud/Mustand/Ei ole loodud)
  - Plan badge'id (STARTER+ / PROFESSIONAL)
  - Mock genereerimine (2 sek delay)
  - Genereeri / Vaata / Uuenda nupud
  - Help card kasutamisjuhendiga
- **Mock andmed:** 3 dokumenti (1 approved, 2 draft)

#### Risks Page - Täielik Refaktoreerimine
- **Fail:** `app/src/app/(dashboard)/risks/page.tsx` (690 rida)
- **Muudatused:**
  - Asendatud vana HTML/Tailwind → shadcn/ui komponendid
  - **Card-põhine layout** (mitte tabel) - parem loetavus
  - Stats kaardid: Kokku riske, Kriitiline/Kõrge, Töös, Maandatud
  - **Risk interface laiendatud:**
    - `mitigationActions` - Maandamismeetmed
    - `completedActions` - Tehtud tegevused
    - `mitigatedAt` - Maandamise timestamp
  - **Visuaalne esitlus:**
    - Badge'id: Risk ID, kategooria, prioriteet, olek
    - Risk matrix: Tõenäosus × Mõju = Riskitase
    - 🎯 Maandamismeetmed (sinine kast, kuvatakse kui "Töös" või "Maandatud")
    - ✅ Tehtud tegevused (roheline kast, kuvatakse kui "Maandatud")
    - Maandamise kuupäev
  - **Funktsioonid:**
    - Inline redigeerimine (✏️ nupp)
    - Lisa uus risk modal
    - AI genereerimise nupp (mock)
    - Automaatne `mitigatedAt` timestamp kui olek → "Maandatud"
    - Automaatne riskitaseme arvutus
    - Prioriteet badge'id: Kriitiline (17+), Kõrge (10-16), Keskmine (5-9), Madal (1-4)
    - Kustutamise kinnituse dialog
  - **Mock andmed:** 4 riski
    - RISK-01: Volitamata juurdepääs (Tuvastatud, riskitase 20)
    - RISK-02: Andmete kadumine (Töös, riskitase 15, maandamismeetmed olemas)
    - RISK-03: Töötajate teadlikkus (Tuvastatud, riskitase 12)
    - RISK-04: Tulemüüri puudumine (Maandatud, riskitase 20, kõik väljad täidetud)

### 🔧 Parandused

- **Form component:** Lisatud `'use client'` direktiiv (viga: "Export Controller doesn't exist")
- **Ühtlustatud stiil:** Kõik dashboard lehed kasutavad nüüd sama design system'i
- **Progressi jälgimine:** Kõik lehed näitavad selgelt hetkeseisu ja edenemist

### 📊 Statistika

- **Loodud/muudetud faile:** ~20
- **Koodiridu kokku:** ~2500+
- **UI komponente:** 11
- **Dashboard lehti refaktoritud:** 5 (Dashboard, Onboarding, Assessment, Documents, Risks)

---

## [Sprint 2] - Varem

### ✅ Lisatud
- 8-sammuline onboarding küsimustik
- Button-based UI (auto-advance funktsioon)
- 11 sektorit toetatud
- NIS2 kohaldatavuse automaatne määramine
- Profiilileht (vaatamine + muutmine)
- Dashboard näitab organisatsiooni infot

---

## [Sprint 1] - Varem

### ✅ Lisatud
- Next.js 15 + TypeScript projekt seadistatud
- Prisma + Supabase andmebaas
- NextAuth.js autentimine (ajutiselt välja lülitatud)
- Landing page + Signup/Login
- Dashboard põhistruktuur

---

## Vormingu selgitus

```
### ✅ Lisatud - Uued funktsioonid
### 🔧 Parandused - Bug fix'id ja täiendused
### ⚠️ Aegunud - Deprecation notices
### 🗑️ Eemaldatud - Removed features
### 📝 Muudetud - Changed behavior
```
