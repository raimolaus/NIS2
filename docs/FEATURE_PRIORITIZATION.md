# FEATURE PRIORITISEERIMINE - NIS2 ABIMEES
## MoSCoW Meetod, Roadmap ja Otsuste Põhjendused

**Versioon:** 1.0  
**Kuupäev:** 8. jaanuar 2026  
**Eesmärk:** Selge prioritiseerimisraamistik feature'ite arendamiseks

---

## 📋 SISUKORD

1. [Prioritiseerimise Printsiibid](#prioritiseerimise-printsiibid)
2. [MoSCoW Framework](#moscow-framework)
3. [MVP Features (MUST HAVE)](#mvp-features-must-have)
4. [Post-MVP Features (SHOULD/COULD)](#post-mvp-features)
5. [Nice-to-Have (WON'T HAVE MVP)](#nice-to-have)
6. [Feature Scoring Matrix](#feature-scoring-matrix)
7. [Arenduse Timeline](#arenduse-timeline)
8. [Otsuste Põhjendused](#otsuste-põhjendused)

---

## 🎯 PRIORITISEERIMISE PRINTSIIBID

### Põhimõtted

**1. Value-First**
```
Fookus: Mis loob KÕIGE ROHKEM väärtust kasutajale?

Näide:
✅ AI juhendamine (kriitiline väärtus)
❌ Dark mode (nice-to-have, ei muuda põhiväärtust)
```

**2. Speed-to-Market**
```
Fookus: Mis võimaldab kõige KIIREMINI turule jõuda?

Näide:
✅ Lihtne auth (email + parool)
❌ OAuth (Google, Microsoft) - võtab 2x rohkem aega
```

**3. Learn-First**
```
Fookus: Mis aitab kõige KIIREMINI õppida kasutajatelt?

Näide:
✅ Minimal dashboard (näeme, mida kasutajad vaatavad)
❌ Complex analytics (liiga varajane)
```

**4. Technical Simplicity**
```
Fookus: Mis on kõige LIHTSAM implementeerida?

Näide:
✅ PDF genereerimine (Puppeteer, lihtne)
❌ Real-time collaboration (keeruline, WebSockets)
```

---

### Prioritiseerimise Küsimused

Iga feature'i kohta küsi:

**1. Kas see on MVP jaoks KRIITILNE?**
```
Kui see puudub, kas toode TÖÖTAB?
- Jah → MUST HAVE
- Ei → SHOULD/COULD/WON'T
```

**2. Kas see loob CORE VALUE?**
```
Kas see on osa value proposition'ist?
- Jah → High priority
- Ei → Lower priority
```

**3. Kui KAUA see võtab?**
```
Kui kaua arendada (päevades)?
- 1-3 päeva → võib lisada
- 5+ päeva → edasi lükata, kui mitte MUST
```

**4. Kas kasutajad seda NÕUAVAD?**
```
Kas oleme kuulnud seda pilootklientidelt?
- Jah (3+ inimest) → prioritiseeri
- Ei (ainult meie idee) → maybe later
```

**5. Kas see BLOKEERIB midagi muud?**
```
Kas teised feature'd sõltuvad sellest?
- Jah → tee enne
- Ei → võib oodata
```

---

## 🚦 MOSCOW FRAMEWORK

### Definitsioonid

**MUST HAVE** 🔴
```
Ilma selleta toode EI TÖÖTA või ei ole müüdav.
Non-negotiable MVP jaoks.

Näide: AI vestlus, enesehindamine, dokumentide genereerimine
```

**SHOULD HAVE** 🟠
```
Oluline, aga mitte kriitiline. 
MVP võib töötada ilma, aga UX kannatab.

Näide: Email teavitused, tegevusplaani jälgimine
```

**COULD HAVE** 🟡
```
Kena, aga mitte vajalik.
Lisame, kui on aega/ressurssi üle.

Näide: Dark mode, eksport Excel'i
```

**WON'T HAVE (NOW)** ⚪
```
Mitte praegu. Tulevikus võib-olla.
Consciously deferred.

Näide: Mobile app, real-time collaboration, API
```

---

## 🔴 MVP FEATURES (MUST HAVE)

### 1. AUTENTIMINE & KASUTAJA

#### 1.1 Signup / Login
```
Priority: MUST HAVE
Effort: 2 päeva
Value: Critical (ei saa ilma)

Features:
✅ Email + parool registreerimine
✅ Email verification (lihtne)
✅ Login
✅ Logout
✅ "Forgot password" flow

❌ OAuth (Google, Microsoft) → POST-MVP
❌ 2FA → POST-MVP
❌ SSO → WON'T HAVE (MVP)

Why?
- Lihtne implementeerida (NextAuth.js)
- Piisav MVP jaoks
- OAuth võtab 2x kauem
```

#### 1.2 Kasutaja Profiil
```
Priority: MUST HAVE
Effort: 1 päev
Value: Critical

Features:
✅ Nimi
✅ Email (muutmine)
✅ Parooli muutmine
✅ Konto kustutamine

❌ Profiilipilt → COULD HAVE
❌ Timezone → WON'T HAVE
❌ Language preference → WON'T HAVE (ainult eesti MVP)

Why?
- Vajalik GDPR compliance jaoks (kustutamine)
- Lihtne teha
```

---

### 2. ORGANISATSIOONI PROFIIL

#### 2.1 Onboarding Küsimustik
```
Priority: MUST HAVE
Effort: 3 päeva
Value: Critical (ilma ei saa NIS2 klassifikatsiooni)

Features:
✅ 5 põhiküsimust:
   1. Valdkond
   2. Töötajate arv
   3. Käive
   4. IT süsteemid
   5. Olemasolevad turvaprotseduurid

✅ Lihtne UI (üks küsimus korraga)
✅ Progress bar
✅ NIS2 kohaldatavuse automaatne tuvastamine

❌ Multi-step with save → SHOULD HAVE (MVP: lõpeta läbi korraga)
❌ Skip questions → WON'T HAVE (kõik on kohustuslikud)

Why?
- Vajame seda AI konteksti jaoks
- Kasutaja peab teadma, kas NIS2 kohaldub
- 5 küsimust on optimum (mitte liiga palju, aga piisavalt)
```

#### 2.2 Profiili Muutmine
```
Priority: SHOULD HAVE (MVP: lihtne versioon)
Effort: 1 päev
Value: Medium

Features:
✅ Redigeerimise vorm (kõik 5 küsimust)
✅ Salvesta muudatused

❌ AI re-analysis (automaatne) → POST-MVP
❌ Change history → WON'T HAVE

Why?
- Organisatsioonid muutuvad (töötajate arv kasvab)
- Lihtne implementeerida (lihtne vorm)
```

---

### 3. AI VESTLUS

#### 3.1 Chat Interface
```
Priority: MUST HAVE
Effort: 5 päeva
Value: Critical (core feature!)

Features:
✅ Chat UI (messages list + input)
✅ Streaming responses (real-time typing)
✅ Markdown support
✅ Message history (current session)
✅ "New conversation" button

❌ Code highlighting → COULD HAVE
❌ Image support → WON'T HAVE
❌ Voice input → WON'T HAVE (MVP)

Why?
- Core value proposition (AI juhendab)
- Streaming = better UX (tundub kiirem)
- Markdown = structured responses
```

#### 3.2 Conversation Management
```
Priority: SHOULD HAVE
Effort: 2 päeva
Value: Medium-High

Features:
✅ Vestluste ajalugu (sidebar)
✅ Uue vestluse alustamine
✅ Vestluse kustutamine

❌ Vestluse ümber nimetamine → COULD HAVE
❌ Vestluse jagamine → WON'T HAVE
❌ Export vestlust → WON'T HAVE

Why?
- Kasutajad tulevad tagasi (vajame ajalugu)
- Lihtne implementeerida (DB query)
- Sidebar pattern on standard
```

#### 3.3 AI Võimekused
```
Priority: MUST HAVE
Effort: 7 päeva (kõige keerulisem!)
Value: Critical

Features:
✅ Küsimustele vastamine
✅ Konteksti mäletamine (conversation history)
✅ Organisatsiooni kontekst (profiil, assessment)
✅ NIS2 viited (artiklid, lõigud)
✅ Soovituste andmine

❌ Proaktiivne jälgimine → POST-MVP
❌ Meeldetuletused (push) → POST-MVP
❌ Multi-language → WON'T HAVE (MVP: ainult eesti)

Why?
- See ON toode (AI assistant)
- Kontekst = personaliseeritud vastused
- NIS2 viited = usaldusväärsus
```

---

### 4. ENESEHINDAMINE

#### 4.1 Küsimustik
```
Priority: MUST HAVE
Effort: 5 päeva
Value: Critical

Features:
✅ 40 küsimust (6 sektsiooni)
✅ Lihtne UI (üks küsimus korraga)
✅ Vastusevariandid (radio buttons)
✅ "Ei tea" option
✅ Progress bar (X/40)
✅ Draft mode (salvesta osaliselt)

❌ Tõendite üleslaadimine → POST-MVP
❌ Multi-user assessment → WON'T HAVE
❌ Custom questions → WON'T HAVE

Why?
- Core feature (MVP peamine väärtus)
- 40 küsimust = põhjalik, aga mitte liiga pikk
- Draft mode = kasutaja võib teha pausid
```

#### 4.2 AI Selgitused
```
Priority: MUST HAVE
Effort: 3 päeva (AI prompting)
Value: High

Features:
✅ Miks see küsimus oluline? (AI generated)
✅ NIS2 viide (Artikkel X, Lõik Y)
✅ Näide (kui asjakohane)

❌ Video explanations → WON'T HAVE
❌ Interactive examples → COULD HAVE

Why?
- Eristab meid (mitte lihtsalt checklist)
- Harib kasutajat (väärtus ka ilma ostmata)
```

#### 4.3 Tulemused & Raport
```
Priority: MUST HAVE
Effort: 4 päeva
Value: Critical

Features:
✅ Skoor (0-100)
✅ Tugevused (loend)
✅ Puudujäägid (loend)
✅ Visualiseerimine (progress bar)
✅ PDF raport (allalaadimine)

❌ Detailed breakdown per section → COULD HAVE
❌ Comparison to industry → WON'T HAVE
❌ Interactive charts → COULD HAVE

Why?
- Kasutaja tahab teada "kus ma olen?"
- PDF = tangible deliverable
- Lihtne visualiseerimine piisab MVP jaoks
```

---

### 5. DOKUMENTIDE GENEREERIMINE

#### 5.1 Infoturbepoliitika
```
Priority: MUST HAVE
Effort: 4 päeva
Value: Critical

Features:
✅ AI genereerib mustandit (Claude)
✅ Template põhineb NIS2 + org profiilil
✅ Eelvaade brauseris (read-only)
✅ Eksport: PDF, DOCX

❌ In-browser editing → POST-MVP
❌ Version comparison → WON'T HAVE
❌ Collaboration → WON'T HAVE

Why?
- NIS2 nõuab kirjalikku poliitikat
- AI = biggest value add (ei pea ise kirjutama)
- Eksport = kasutaja saab kohe kasutada
```

#### 5.2 Riskihinnang
```
Priority: MUST HAVE
Effort: 3 päeva
Value: Critical

Features:
✅ Põhineb enesehindamise vastustel
✅ Riskide loend + hinnangud (mõju, tõenäosus)
✅ Soovitused (AI generated)
✅ Eksport: PDF, DOCX

❌ Risk matrix visualization → COULD HAVE
❌ Custom risks (kasutaja lisab) → POST-MVP

Why?
- NIS2 nõuab riskihindamist
- Lihtsam kui täielik riskiregister (POST-MVP)
```

#### 5.3 Tegevusplaan
```
Priority: MUST HAVE
Effort: 3 päeva
Value: High

Features:
✅ Ülesanded prioritiseeritud
✅ Tähtajad (AI suggested)
✅ Eksport: PDF

❌ Interactive checklist (mark as done) → SHOULD HAVE
❌ Reminders → POST-MVP
❌ Assignment to users → WON'T HAVE (MVP: 1 kasutaja)

Why?
- Kasutaja vajab "järgmisi samme"
- PDF piisab MVP jaoks (action plan on dokument)
```

---

### 6. DASHBOARD

#### 6.1 Põhivaade
```
Priority: MUST HAVE
Effort: 3 päeva
Value: High

Features:
✅ Vastavuse skoor (% + progress bar)
✅ Enesehindamise olek
✅ Kriitiliste probleemide arv
✅ Quick actions (3 nuppu)

❌ Detailed charts → COULD HAVE
❌ Trends over time → WON'T HAVE
❌ Notifications center → POST-MVP

Why?
- Esimene vaade pärast login'it
- Peab olema lihtne ja selge
- MVP: minimalistlik (ei overload)
```

#### 6.2 Navigatsioon
```
Priority: MUST HAVE
Effort: 2 päeva
Value: Critical

Features:
✅ Sidebar / Top nav
✅ Dashboard, Chat, Dokumendid, Profiil
✅ Mobile responsive (hamburger menu)

❌ Breadcrumbs → COULD HAVE
❌ Search → WON'T HAVE (MVP: vähe sisu)

Why?
- Vajame navigeerimist
- Lihtne nav patern (standard)
```

---

### 7. MAKSED

#### 7.1 Stripe Integratsioon
```
Priority: MUST HAVE
Effort: 3 päeva
Value: Critical (revenue!)

Features:
✅ Checkout flow (Stripe Checkout)
✅ Subscription management
✅ Webhook'id (payment.succeeded, subscription.deleted)
✅ Trial logic (30 päeva FREE)

❌ Invoice customization → WON'T HAVE
❌ Multiple payment methods → WON'T HAVE (MVP: ainult card)
❌ Coupon codes → COULD HAVE

Why?
- Ilma makseta pole äri!
- Stripe Checkout = lihtne (hosted)
- Trial = lower barrier
```

#### 7.2 Billing Page
```
Priority: SHOULD HAVE
Effort: 2 päeva
Value: Medium

Features:
✅ Praegune pakett
✅ Järgmine maksu kuupäev
✅ Makseviis (muuda)
✅ Tühista tellimus

❌ Invoice history → COULD HAVE
❌ Usage stats → WON'T HAVE

Why?
- Kasutajad peavad saama tellimust hallata
- Lihtne Stripe API'ga
```

---

### 8. LEGAL & COMPLIANCE

#### 8.1 Legal Pages
```
Priority: MUST HAVE
Effort: 2 päeva
Value: Critical (GDPR!)

Features:
✅ Terms of Service
✅ Privacy Policy
✅ Cookie consent banner

❌ Multi-language → WON'T HAVE (MVP: eesti)
❌ Detailed cookie settings → COULD HAVE

Why?
- GDPR nõuab
- Stripe nõuab (ToS)
- Kasutajad usaldavad rohkem
```

---

## 🟠 POST-MVP FEATURES (SHOULD/COULD)

### SHOULD HAVE (Faas 2: Month 4-6)

#### Tegevusplaani Jälgimine
```
Priority: SHOULD HAVE
Effort: 3 päeva
Value: High

Features:
- Interactive checklist (web'is)
- Märgi ülesanne tehtuks
- Progress tracking
- Tõendite üleslaadimine (valikuline)

Why prioritise?
- Suurendab engagement'it
- Continuous value (mitte ainult üks audit)
- Lower churn

Why not MVP?
- PDF tegevusplaan piisab alguses
- Lisame kui on feedback klientidelt
```

---

#### Email Teavitused
```
Priority: SHOULD HAVE
Effort: 2 päeva
Value: Medium

Features:
- Welcome email
- Trial ending (3 päeva enne)
- Makse kinnitused
- Monthly report (progress)

Why prioritise?
- Retention (meeldetuletused)
- Communication

Why not MVP?
- In-app teavitused piisavad alguses
- Email infra võtab aega (SendGrid, templates)
```

---

#### Audiitori Portaal (Basic)
```
Priority: SHOULD HAVE
Effort: 4 päeva
Value: Medium-High

Features:
- Read-only ligipääs auditorile
- Ajaliselt piiratud (30 päeva)
- Kõik dokumendid + registrid nähtavad
- Leiud/kommentaarid (valikuline)

Why prioritise?
- NIS2 nõuab auditeid
- Eristab meid (konsultandid ei paku seda)

Why not MVP?
- MVP: ekspordi dokumendid + saada emailiga
- Audiitor portal on nice-to-have, aga mitte MVP kriitilised
```

---

### COULD HAVE (Faas 3: Month 7-12)

#### Varade Register
```
Priority: COULD HAVE
Effort: 5 päeva
Value: Medium

Features:
- IT süsteemide register
- Seadmed, pilveteenused
- Kriitilistsus, omanikud
- CRUD operations

Why later?
- MVP: AI ekstrakteerib varad vestlustest
- Täielik register on keeruline
- Lisame kui kasutajad küsivad
```

---

#### Riskiregister
```
Priority: COULD HAVE
Effort: 5 päeva
Value: Medium

Features:
- Riskide CRUD
- Mõju × Tõenäosus = Riski tase
- Risk matrix visualization
- Meetmete jälgimine

Why later?
- MVP: Riskihinnang dokument piisab
- Register on advanced feature
- Suuremad organisatsioonid vajavad
```

---

#### Dark Mode
```
Priority: COULD HAVE
Effort: 1 päev
Value: Low-Medium

Features:
- Dark theme toggle
- Persistent preference

Why later?
- Ei loo core value
- Lihtne lisada (Tailwind)
- Kasutajad küsivad sageli
```

---

#### Mitmekeelsus
```
Priority: COULD HAVE (Faas 3)
Effort: 5 päeva (per keel)
Value: Medium (kasvab skaleerides)

Languages:
- Eesti (MVP) ✅
- Inglise (Faas 2)
- Vene (Faas 2)
- Läti, Leedu (Faas 3)

Why later?
- MVP: Eesti turg (300-500 potential customers)
- i18n framework võtab aega (next-intl)
- Baltics expansion = kuud 6-12
```

---

## ⚪ NICE-TO-HAVE (WON'T HAVE MVP)

### Integratsioonid

#### Microsoft 365
```
Priority: WON'T HAVE (MVP)
Effort: 7 päeva
Value: High (aga ainult suurematel)

Features:
- Kasutajate import (Azure AD)
- Seadmete import (Intune)
- Sisse logimise logid
- 2FA olek

Why not MVP?
- Keeruline (OAuth, Graph API)
- Vajab Microsoft partner staatust
- Lisame Faas 3 (kui on nõudlus)
```

#### Google Workspace
```
Priority: WON'T HAVE (MVP)
Effort: 5 päeva
Value: Medium

Why not MVP?
- Same as Microsoft
- Vähem levinud Eestis (tervishoiu sektoris)
```

---

### Advanced Features

#### Mobile App (Native)
```
Priority: WON'T HAVE (aasta 1)
Effort: 30+ päeva
Value: Low-Medium

Why not?
- Web responsive piisab
- 90% kasutajad on desktop'is (work context)
- Kallis arendada (iOS + Android)
```

#### API (Public)
```
Priority: WON'T HAVE (MVP)
Effort: 10 päeva
Value: Low (MVP), High (Enterprise)

Why not MVP?
- Kellele? (ei ole partnereid veel)
- Security complexity
- Lisame Faas 4 (Enterprise tier)
```

#### Real-time Collaboration
```
Priority: WON'T HAVE (aasta 1)
Effort: 15+ päeva
Value: Low (MVP: 1 kasutaja per org)

Features:
- Multi-user editing (Google Docs style)
- Presence (kes on online)
- Comments/mentions

Why not?
- MVP: 1 kasutaja per organisatsioon
- Keeruline (WebSockets, CRDT)
- Lisame Faas 4 (kui on PROFESSIONAL tier)
```

#### AI Voice / Audio
```
Priority: WON'T HAVE (aasta 1)
Effort: 10 päeva
Value: Low

Why not?
- Text is sufficient
- Voice = tech complexity
- Kasutajad ei küsinud
```

---

## 📊 FEATURE SCORING MATRIX

### Scoring Kriteeriumid

**Value (1-10):**
```
10 = Critical (ilma ei saa)
7-9 = High (strong value add)
4-6 = Medium (nice to have)
1-3 = Low (marginal)
```

**Effort (1-10):**
```
10 = Very hard (10+ päeva)
7-9 = Hard (5-9 päeva)
4-6 = Medium (2-4 päeva)
1-3 = Easy (0-1 päev)
```

**Impact (Value / Effort):**
```
High: >2.0
Medium: 1.0-2.0
Low: <1.0
```

---

### MVP Features (Scored)

| Feature | Value | Effort | Impact | Priority |
|---------|-------|--------|--------|----------|
| **Auth (Email+PW)** | 10 | 2 | 5.0 | MUST |
| **Onboarding** | 10 | 3 | 3.3 | MUST |
| **AI Chat** | 10 | 7 | 1.4 | MUST |
| **Enesehindamine** | 10 | 5 | 2.0 | MUST |
| **AI Selgitused** | 9 | 3 | 3.0 | MUST |
| **Tulemused** | 10 | 4 | 2.5 | MUST |
| **Dokumendi Gen (Poliitika)** | 10 | 4 | 2.5 | MUST |
| **Riskihinnang** | 9 | 3 | 3.0 | MUST |
| **Tegevusplaan (PDF)** | 8 | 3 | 2.7 | MUST |
| **Dashboard** | 9 | 3 | 3.0 | MUST |
| **Stripe Checkout** | 10 | 3 | 3.3 | MUST |
| **Billing Page** | 7 | 2 | 3.5 | SHOULD |
| **Legal Pages** | 10 | 2 | 5.0 | MUST |

---

### Post-MVP Features (Scored)

| Feature | Value | Effort | Impact | Phase |
|---------|-------|--------|--------|-------|
| **Tegevusplaani Tracking** | 8 | 3 | 2.7 | SHOULD (F2) |
| **Email Notifs** | 7 | 2 | 3.5 | SHOULD (F2) |
| **Audiitor Portal** | 7 | 4 | 1.8 | SHOULD (F2) |
| **Varade Register** | 6 | 5 | 1.2 | COULD (F3) |
| **Riskiregister** | 6 | 5 | 1.2 | COULD (F3) |
| **Dark Mode** | 4 | 1 | 4.0 | COULD (F3) |
| **Microsoft 365 Integ** | 8 | 7 | 1.1 | WON'T (F3) |
| **Google Workspace** | 7 | 5 | 1.4 | WON'T (F3) |
| **Mobile App** | 5 | 30 | 0.2 | WON'T |
| **API** | 4 | 10 | 0.4 | WON'T (F4) |
| **Real-time Collab** | 5 | 15 | 0.3 | WON'T |

---

## 📅 ARENDUSE TIMELINE

### Sprint Structure (2-week sprints)

```
Sprint 1-2: Foundation (4 weeks)
├─ Auth + User management
├─ Onboarding
├─ Basic AI chat
└─ Dashboard skeleton

Sprint 3-4: Core Features (4 weeks)
├─ Enesehindamine (küsimustik)
├─ AI selgitused
├─ Tulemused + raport
└─ Chat improvements

Sprint 5-6: Documents (4 weeks)
├─ Dokumendi genereerimine (3 tüüpi)
├─ PDF/DOCX eksport
├─ Eelvaade
└─ Salvestamine + versioonid

Sprint 7: Payments + Polish (2 weeks)
├─ Stripe integratsioon
├─ Billing page
├─ Legal pages
└─ Bug fixes

Sprint 8: Launch Prep (2 weeks)
├─ Mobile responsive polish
├─ Performance optimization
├─ Security audit
├─ Beta testing
└─ Production deploy

TOTAL: 16 weeks (~4 months)
```

---

### Post-MVP Roadmap

**Faas 2 (kuud 5-6):**
```
✅ Tegevusplaani tracking
✅ Email teavitused
✅ Audiitor portal (basic)
✅ Inglise keel
✅ Vene keel
```

**Faas 3 (kuud 7-12):**
```
✅ Varade register
✅ Riskiregister
✅ Integratsioonid (M365, Google)
✅ PROFESSIONAL tier features
✅ Läti, Leedu keel
✅ Advanced analytics
```

**Faas 4 (aasta 2):**
```
✅ API (public)
✅ ENTERPRISE tier
✅ White-label
✅ Multi-standard (ISO 27001, GDPR)
✅ Marketplace
```

---

## 🧠 OTSUSTE PÕHJENDUSED

### Miks Need MUST HAVE?

#### 1. AI Chat on CORE feature
```
Põhjendus:
- Value proposition: "AI juhendab"
- Eristab meid spreadsheet-based lahendustest
- Kasutajad ootavad conversational interface

Alternatiivid:
❌ Form-based (igav, aeglane)
❌ Wizard (limiteeritud)

Otsus: MUST HAVE ✅
```

#### 2. PDF eksport on MUST (mitte in-app editing)
```
Põhjendus:
- Kasutajad tahavad dokumenti VÄLJA viia
- Auditorid tahavad PDF/DOCX (mitte web link)
- Lihtsam implementeerida (Puppeteer)

Alternatiivid:
❌ In-app editor (keeruline, võtab 2x kauem)
❌ Ainult web view (ei rahulda vajadust)

Otsus: MUST HAVE (eksport), WON'T HAVE (editing) ✅
```

#### 3. Email+Parool auth (mitte OAuth)
```
Põhjendus:
- Lihtne implementeerida (NextAuth.js)
- Töötab kohe
- OAuth võtab 2x kauem (4 päeva vs 2)

Alternatiivid:
❌ Ainult OAuth (blokeerib teste)
❌ Magic link (kasutajad ei usalda)

Otsus: MUST HAVE (Email+PW), POST-MVP (OAuth) ✅
```

---

### Miks Need WON'T HAVE (MVP)?

#### 1. Mobile App (native)
```
Põhjendus:
- Web responsive piisab (90% kasutajad on desktop)
- Native app = 30+ päeva arendust
- Maintenance overhead (2 platvormi)
- MVP peab olema KIIRE

Tõendid:
- Sarnased B2B SaaS: Notion, Linear, Figma
  → Kõik alustasid web-only
  → Mobile app tuli 2-3 aastat hiljem

Otsus: WON'T HAVE (aasta 1) ✅
```

#### 2. Real-time Collaboration
```
Põhjendus:
- MVP: 1 kasutaja per org (STARTER)
- Keeruline implementeerida (WebSockets, CRDT)
- Ei ole core value (NIS2 compliance, mitte collaboration)

Stsenaarium:
"Kui kasutaja tahab kolleegiga jagada?"
→ Vastus: Ekspordi PDF ja saada emailiga
→ Piisav MVP jaoks

Otsus: WON'T HAVE (aasta 1) ✅
```

#### 3. Integratsioonid (M365, Google)
```
Põhjendus:
- MVP: 50 klienti, manuaalne input ok
- Integratsioonid võtavad aega (7+ päeva each)
- Vajab teste (test accounts, OAuth approvals)
- Lisame kui on nõudlus (Faas 3)

Valideerimise loogika:
"Kas kliendid maksavad €49/kuu ILMA integratsioonideta?"
→ Kui JAH → integrations ei ole MVP
→ Kui EI → peame ümber mõtlema

Hüpotees: JAH (nad maksavad AI + dokumentide eest)

Otsus: WON'T HAVE (MVP), SHOULD HAVE (Faas 3) ✅
```

---

### Feature Creep Vältimine

**Red Flags:**

🚩 "Aga oleks cool kui..."
```
Vastus: Jah, aga kas see on KRIITILNE MVP jaoks?
```

🚩 "Konkurent X teeb seda..."
```
Vastus: Kas meie sihtklient vajab seda?
```

🚩 "See võtab ainult 2 päeva..."
```
Vastus: 2 päeva × 10 feature't = 20 päeva = 1 kuu delay
```

---

### Decision Framework

**Kui keegi pakub uut feature't:**

```
1. Kuula ideed
2. Küsi: "Kas see on MUST HAVE MVP jaoks?"
   - Jah → lisa backlog'i, hinda effort
   - Ei → lisa "POST-MVP" listi
3. Kui vaidlus, kasuta Scoring Matrix:
   - Value / Effort > 2.0 → consider
   - Value / Effort < 2.0 → defer
4. Otsusta kohe (ei jäta "maybe" state'i)
5. Dokumenteeri põhjendus (siin dokumendis)
```

---

## ✅ SUMMARY & ACTION ITEMS

### MVP Core (Must-Have)

```
✅ Auth (Email+PW)
✅ Onboarding (5 questions)
✅ AI Chat (streaming)
✅ Enesehindamine (40 questions)
✅ AI Selgitused
✅ Tulemused (score + report PDF)
✅ 3 Dokumenti (Poliitika, Riskihinnang, Tegevusplaan)
✅ PDF/DOCX eksport
✅ Dashboard (minimal)
✅ Stripe (checkout + billing)
✅ Legal pages

TOTAL EFFORT: ~60 päeva arendust
TIMELINE: 16 nädalat (4 kuud)
```

---

### Post-MVP (Faas 2-3)

```
📋 Tegevusplaani tracking (interactive)
📧 Email teavitused
👨‍💼 Audiitor portal
📊 Varade register
⚠️ Riskiregister
🔌 Integratsioonid (M365, Google)
🌍 Mitmekeelsus (inglise, vene)
```

---

### Won't Have (aasta 1)

```
❌ Mobile app (native)
❌ Real-time collaboration
❌ API (public)
❌ AI Voice
❌ Advanced analytics
```

---

### Key Learnings

**1. Simplicity wins**
```
Lihtne MVP > keeruline "täielik" lahendus
50% features = 80% value
```

**2. Speed to market matters**
```
4 kuud MVP vs 12 kuud "perfect"
MVP = valideerime hüpoteese
Perfect = raiskame aega
```

**3. Listen, but don't build everything**
```
Kliendi soov ≠ MUST HAVE
Filtreeri läbi Value/Effort
```

**4. Focus on core value**
```
AI + dokumendid = core
Kõik muu = support
```

---

### Next Steps

**Arenduse alustamisel:**
- [ ] Loo GitHub project board
- [ ] Iga feature = issue
- [ ] Prioritiseeri backlog
- [ ] Weekly review (kas need on ikka õiged?)

**Iga sprint lõpus:**
- [ ] Demo stakeholder'itele
- [ ] Feedback → re-prioritiseeri
- [ ] Update see dokument

**MVP launch pärast:**
- [ ] Customer interviews (mis puudu?)
- [ ] Usage analytics (mida kasutavad?)
- [ ] Feedback → Faas 2 roadmap

---

**Dokument valmis! 🎯**

Feature'id on prioritiseeritud, põhjendused on olemas, roadmap on selge. Nüüd järgmine dokument!

---

**Versioon:** 1.0  
**Kuupäev:** 8. jaanuar 2026  
**Järgmine ülevaade:** Pärast MVP launch (reassess based on feedback)
