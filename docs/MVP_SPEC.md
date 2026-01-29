# NIS2 ABIMEES - MVP SPETSIFIKATSIOON
## Versioon 1.1 - Esimesed 3-6 kuud

**Kuupäev:** 8. jaanuar 2026
**Eesmärk:** Esimesed 50 maksavat klienti (€49/kuu)
**Timeline:** 3-6 kuud
**Budget:** €5k-15k (bootstrap mode)

---

## 📍 PRAEGUNE STAATUS (8. jaanuar 2026)

**Sprint 1: Foundation** ✅ VALMIS
- Next.js 15 + TypeScript projekt seadistatud
- Prisma + Supabase andmebaas
- NextAuth.js autentimine (ajutiselt välja lülitatud testimiseks)
- Landing page + Signup/Login
- Dashboard põhistruktuur

**Sprint 2: Onboarding + Profiil** ✅ VALMIS
- 8-sammuline onboarding küsimustik
- Button-based UI (auto-advance funktsioon)
- 11 sektorit toetatud
- NIS2 kohaldatavuse automaatne määramine
- Profiilileht (vaatamine + muutmine)
- Dashboard näitab organisatsiooni infot

**Järgmisena:**
- Sprint 3: AI Vestlus (Claude API integratsioon)
- Parandused:
  - 8. sammu salvestamise viga
  - Radio buttons → tavalised nupud (UX parandus)

---

## 📋 SISUKORD

1. [MVP Scope](#mvp-scope)
2. [Kasutajastsenaariod](#kasutajastsenaariod)
3. [Feature Checklist](#feature-checklist)
4. [Tehnoloogia Stack](#tehnoloogia-stack)
5. [Andmemudel](#andmemudel)
6. [UI/UX Disain](#uiux-disain)
7. [AI Implementatsioon](#ai-implementatsioon)
8. [Arenduse Roadmap](#arenduse-roadmap)
9. [Testimine ja QA](#testimine-ja-qa)
10. [Go-to-Market](#go-to-market)
11. [Budget ja Ressursid](#budget-ja-ressursid)

---

## 🎯 MVP SCOPE

### MIS ON MVP-s? ✅

**Põhifunktsioonid:**
1. Organisatsiooni profiilimine (8 küsimust, 5-10 min)
2. AI vestlus (eesti keel, tekst-põhine)
3. NIS2 enesehindamine (30-45 min)
4. Dokumentide genereerimine:
   - Infoturbepoliitika
   - Riskihinnang
   - Tegevusplaan (PDF)
5. Dashboard (vastavuse skoor, progressi näitamine)
6. Kasutajakonto (üks kasutaja per org)
7. Profiilihaldus (vaatamine, muutmine, kinnitamine)

**Hinnapaketid:**
- 🆓 FREE (demo, ei salvesta)
- 💼 STARTER (€49/kuu)

**Keeled:**
- 🇪🇪 Ainult eesti keel

**Platvorm:**
- 🌐 Web-only (desktop + mobile responsive)

---

### MIS EI OLE MVP-s? ❌

**Jäetakse teise faasi:**
- ❌ Varade register (liiga keeruline MVP-ks)
- ❌ Riskiregister (genereerime ainult riskihinnangu dokumendi)
- ❌ Tarnijate register
- ❌ Audiitori portaal
- ❌ Integratsioonid (M365, Google)
- ❌ Meeskonna ligipääs (rohkem kui 1 kasutaja)
- ❌ Audio/voice
- ❌ Mitmekeelsus
- ❌ Mobile app (native)
- ❌ Advanced analytics
- ❌ Email teavitused (ainult in-app)
- ❌ Mitme asukoha haldus

**Miks jätame välja?**
- Kiirus: tahame turul olla 3 kuuga
- Fookus: valideerime põhihüpoteesi (AI + enesehindamine = väärtus)
- Ressursid: piiratud aeg ja raha

---

## 👤 KASUTAJASTSENAARIOD

### PERSONA: Dr. Kati (Perearst)

**Taust:**
- 48-aastane perearst
- Perearsti praktika: 3 arsti, 8 õde
- IT teadmised: baastase
- Kasutab: retseptikeskus, Google Workspace, raamatupidamine
- Hirm: NIS2 trahvid, ei tea, mis teha

---

### STSENAARIUM 1: Esimene kasutuskord (30 min)

#### 1. LANDING PAGE → SIGNUP

**Landing:**
```
┌────────────────────────────────────────┐
│  NIS2 ABIMEES                          │
│                                        │
│  Kas teie perearsti praktika on        │
│  NIS2 nõuetega valmis?                 │
│                                        │
│  ✅ AI juhendab sind läbi protsessi    │
│  ✅ Kõik dokumendid valmis 1 tunniga   │
│  ✅ Alates €49/kuu                     │
│                                        │
│  [Alusta tasuta] [Vaata demo]         │
│                                        │
│  Usaldavad meid: [logos]               │
└────────────────────────────────────────┘
```

**Signup (minimal):**
```
Email: kati@perearst.ee
Parool: ********
Organisatsiooni nimi: Dr. Kati Perearst OÜ

[Loo konto]

✓ 30-päevane tasuta prooviperiood
✓ Krediitkaarti ei küsita
```

---

#### 2. ONBOARDING (5-10 min)

**Tervitus:**
```
┌────────────────────────────────────────┐
│  👋 Tere tulemast!                     │
│                                        │
│  Täida organisatsiooni profiil, et     │
│  saada teada, kas NIS2 direktiiv       │
│  kohaldub teile.                       │
│                                        │
│  See võtab umbes 5-10 minutit.         │
│                                        │
│  [Alustame!]                           │
└────────────────────────────────────────┘
```

**SAMM 1/8 - SEKTOR**
```
┌────────────────────────────────────────┐
│  [1/8] 📋 SEKTOR                       │
├────────────────────────────────────────┤
│                                        │
│  Mis valdkonnas teie organisatsioon    │
│  tegutseb?                             │
│                                        │
│  [Tervishoid]                          │
│  [Energeetika]                         │
│  [Transport]                           │
│  [Finantsteenused]                     │
│  [Avalik sektor]                       │
│  [IT teenused]                         │
│  [Tootmine]                            │
│  [Logistika]                           │
│  [Veevarustus]                         │
│  [Digitaalne infrastruktuur]           │
│  [Muu]                                 │
│                                        │
│  Progress: ████░░░░░░░░░░░░  8%       │
└────────────────────────────────────────┘
```
*MÄRKUS: Nupu klikkimisel liigub automaatselt edasi järgmise sammu juurde (auto-advance, 300ms delay)*

**SAMM 2/8 - TÄPSUSTUS** (näidatakse ainult kui SEKTOR = Tervishoid)
```
┌────────────────────────────────────────┐
│  [2/8] 🏥 TÄPSUSTUS                    │
├────────────────────────────────────────┤
│                                        │
│  Täpsustage oma tervishoiu valdkond:   │
│                                        │
│  [Perearst]                            │
│  [Apteek]                              │
│  [Erakliinik]                          │
│  [Haigla]                              │
│  [Muu]                                 │
│                                        │
│  Progress: ████████░░░░░░░░  17%      │
│  [← Tagasi]                            │
└────────────────────────────────────────┘
```

**SAMM 3/8 - TÖÖTAJAD**
```
┌────────────────────────────────────────┐
│  [3/8] 👥 TÖÖTAJAD                     │
├────────────────────────────────────────┤
│                                        │
│  Mitu töötajat teie organisatsioonil   │
│  on?                                   │
│                                        │
│  [1-10]                                │
│  [11-50]                               │
│  [51-250]                              │
│  [251+]                                │
│                                        │
│  Progress: ████████████░░░░  33%      │
│  [← Tagasi]                            │
└────────────────────────────────────────┘
```

**SAMM 4/8 - KÄIVE**
```
┌────────────────────────────────────────┐
│  [4/8] 💰 KÄIVE                        │
├────────────────────────────────────────┤
│                                        │
│  Milline on teie aastane käive?        │
│                                        │
│  [Alla 10 miljoni euro]                │
│  [Üle 10 miljoni euro]                 │
│  [Ei tea]                              │
│                                        │
│  Progress: ████████████████░  50%     │
│  [← Tagasi]                            │
└────────────────────────────────────────┘
```

**SAMM 5/8 - IT SÜSTEEMID**
```
┌────────────────────────────────────────┐
│  [5/8] 💻 IT SÜSTEEMID                 │
├────────────────────────────────────────┤
│                                        │
│  Milliseid IT süsteeme kasutate?       │
│  (võite valida mitu)                   │
│                                        │
│  ☐ Email (Google Workspace / M365)    │
│  ☐ Raamatupidamistarkvar               │
│  ☐ ERP süsteem                         │
│  ☐ CRM süsteem                         │
│  ☐ Dokumendihaldus                     │
│  ☐ Andmebaasid                         │
│  ☐ Veebileht / E-pood                  │
│  ☐ Pilve teenused                      │
│  ☐ Ei kasuta IT süsteeme               │
│                                        │
│  Progress: ████████████████████  67%  │
│  [← Tagasi]  [Edasi →]                │
└────────────────────────────────────────┘
```
*MÄRKUS: Checkboxid - ainult siin on "Edasi" nupp, sest saab valida mitu*

**SAMM 6/8 - TURVAPROTSEDUURID**
```
┌────────────────────────────────────────┐
│  [6/8] 🔒 TURVAPROTSEDUURID            │
├────────────────────────────────────────┤
│                                        │
│  Kas teil on infoturbepoliitika või    │
│  turvaprotseduurid?                    │
│                                        │
│  [Dokumenteeritud ja kinnitatud]       │
│  [Dokumenteeritud, aga ei ole          │
│   kinnitatud]                          │
│  [Pole alustatud]                      │
│  [Ei tea]                              │
│                                        │
│  Progress: ████████████████████░  75% │
│  [← Tagasi]                            │
└────────────────────────────────────────┘
```

**SAMM 7/8 - INFOTURBE VASTUTAJA**
```
┌────────────────────────────────────────┐
│  [7/8] 👤 INFOTURBE VASTUTAJA          │
├────────────────────────────────────────┤
│                                        │
│  Kas teil on määratud infoturbe        │
│  vastutaja?                            │
│                                        │
│  [Jah, eraldi spetsialist]             │
│  [Jah, keegi tegeleb osaliselt]        │
│  [Ei, pole määratud]                   │
│  [Ei tea]                              │
│                                        │
│  Progress: ████████████████████░░  83%│
│  [← Tagasi]                            │
└────────────────────────────────────────┘
```

**SAMM 8/8 - ISIKUANDMED**
```
┌────────────────────────────────────────┐
│  [8/8] 📊 ISIKUANDMED                  │
├────────────────────────────────────────┤
│                                        │
│  Kas töötlete isikuandmeid?            │
│                                        │
│  [Jah, mahukalt]                       │
│  [Jah, vähesel määral]                 │
│  [Ei]                                  │
│  [Ei tea]                              │
│                                        │
│  Progress: ████████████████████████100%│
│  [← Tagasi]                            │
└────────────────────────────────────────┘
```
*MÄRKUS: Viimane samm - nupu klikkimisel salvestatakse automaatselt ja suunatakse dashboard'ile*

**Profiil salvestatud - suunatakse Dashboard'ile:**
```
✓ Profiil edukalt salvestatud!

Suuname teid dashboard'ile...
(redirect → /dashboard?onboarded=true)
```

**Dashboard näitab kokkuvõtet:**
```
┌─────────────────────────────────────────────┐
│  Dr. Kati Perearst OÜ              [Kati ▾] │
├─────────────────────────────────────────────┤
│  🎉 Profiil edukalt täidetud!               │
│     Nüüd saad alustada NIS2 enesehindamisega│
├─────────────────────────────────────────────┤
│                                              │
│  📊 NIS2 VASTAVUS                           │
│  ████████████░░░░░░░░ 62%                  │
│                                              │
│  ✅ NIS2 kohaldub - Oluline üksus           │
│                                              │
│  Teie organisatsioon on NIS2 direktiivi     │
│  kohaldamisala all. Kohustuslik nõuete      │
│  täitmine: 2024 oktoober.                   │
│                                              │
│  📋 JÄRGMINE SAMM                           │
│  Teeme enesehindamise, et näha, kus te      │
│  praegu olete. See võtab umbes 30-45 minutit│
│                                              │
│  [Alusta enesehindamist]                    │
│                                              │
│  [Vaata profiili] - Uus nupp!               │
└─────────────────────────────────────────────┘
```

---

#### 3. DASHBOARD (esimene vaade)

```
┌─────────────────────────────────────────────┐
│  Dr. Kati Perearst OÜ              [Kati ▾] │
├─────────────────────────────────────────────┤
│                                              │
│  📊 NIS2 VASTAVUS                           │
│  ░░░░░░░░░░░░░░░░░░░░  0%                  │
│                                              │
│  ⏳ Enesehindamine alustamata               │
│                                              │
│  [Alusta enesehindamist] 💬                │
│                                              │
├─────────────────────────────────────────────┤
│  📋 ÜLESANDED                               │
│  ○ Täida organisatsiooni profiil ✅         │
│  ○ Tee NIS2 enesehindamine                  │
│  ○ Genereeri infoturbepoliitika             │
│  ○ Genereeri riskihinnang                   │
│  ○ Loo tegevusplaan                         │
└─────────────────────────────────────────────┘
```

---

#### 4. PROFIILILEHT (uus!)

**Navigatsioon:** Dashboard → "Vaata profiili" nupp

```
┌─────────────────────────────────────────────┐
│  ← Tagasi dashboard'ile       [N2] NIS2     │
│                                   Abimees    │
├─────────────────────────────────────────────┤
│  ORGANISATSIOONI PROFIIL     [Muuda profiili]│
│                                              │
│  ⚠️  Profiil pole veel kinnitatud (kui ei   │
│      ole kinnitatud)                         │
├─────────────────────────────────────────────┤
│  📋 PÕHIANDMED                               │
│  Organisatsiooni nimi: Dr. Kati Perearst OÜ │
│  Sektor: Tervishoid                          │
│  Täpsustus: Perearst                         │
│  Töötajate arv: 11-50                        │
│  Aastakäive: Alla 10 miljoni euro            │
├─────────────────────────────────────────────┤
│  💻 IT SÜSTEEMID                             │
│  [Email] [Raamatupidamistarkvar]            │
│  [Dokumendihaldus]                           │
├─────────────────────────────────────────────┤
│  🔒 INFOTURBE SEIS                           │
│  Infoturbepoliitika: Pole alustatud          │
│  Infoturbe vastutaja: Keegi tegeleb osaliselt│
│  Isikuandmete töötlemine: Jah, mahukalt      │
├─────────────────────────────────────────────┤
│  ✅ NIS2 KOHALDATAVUS                        │
│  ✓ NIS2 kohaldub - Oluline üksus            │
│  Teie organisatsioon on NIS2 direktiivi      │
│  kohaldamisala all.                          │
└─────────────────────────────────────────────┘

Funktsioonid:
- Vaata kõiki profiilist andmeid
- [Muuda profiili] nupp viib tagasi onboarding'ule
- Seal saab andmeid uuesti täita/muuta
- Muudatused salvestatakse kohe
```

---

#### 5. ENESEHINDAMINE (30-45 min)

**AI Chat liides:**

```
┌─────────────────────────────────────────────┐
│  💬 NIS2 Enesehindamine                     │
├─────────────────────────────────────────────┤
│                                              │
│  AI: Alustame! Esitan sulle küsimusi        │
│      6 valdkonnas:                           │
│                                              │
│      1. Organisatsioon (5 küs.)             │
│      2. Riskijuhtimine (8 küs.)             │
│      3. Turvameetmed (12 küs.)              │
│      4. Intsidendid (6 küs.)                │
│      5. Varundamine (4 küs.)                │
│      6. Töötajad (5 küs.)                   │
│                                              │
│      Kokku: 40 küsimust                     │
│                                              │
│  [Alusta]                                   │
└─────────────────────────────────────────────┘

(kasutaja klikib "Alusta")

AI: 1. ORGANISATSIOON
    
    Esimene küsimus:
    Kas teil on määratud inimene, kes vastutab
    infoturbe eest?
    
    ○ Jah, on määratud ja tema nimi on: [___]
    ○ Jah, aga pole ametlikult määratud
    ○ Ei, aga keegi tegeleb sellega
    ○ Ei, keegi ei tegele

[Vasta] [Ei tea]

(kasutaja valib: "Ei, aga keegi tegeleb sellega")

AI: Olen aru saanud. 
    
    NIS2 nõuab, et organisatsioonil oleks
    selgelt määratud vastutaja.
    
    💡 SOOVITUS:
    Määrake üks töötaja (võib olla juht ise)
    infoturbe vastutajaks. Dokumenteerige see
    töölepingus või eraldi volituses.
    
    ✓ Lisan selle tegevusplaani.
    
    [Järgmine küsimus]

AI: 2. küsimus:
    
    Kas teil on kirjalik infoturbepoliitika?
    
    ○ Jah, kinnitatud ja kehtiv [Lisa fail]
    ○ Jah, aga pole juhtkonna poolt kinnitatud
    ○ Töös, aga pole lõpetatud
    ○ Ei, pole alustatud

[Vasta]

(kasutaja valib: "Ei, pole alustatud")

AI: Selge!
    
    NIS2 nõuab kirjalikku infoturbepoliitikat,
    mis on juhtkonna poolt kinnitatud.
    
    💡 HEA UUDIS:
    Pärast enesehindamist genereerin ma sulle
    infoturbepoliitika mustandi, mille saad
    üle vaadata ja kinnitada.
    
    ✓ Märgitud puudujäägiks.
    
    [Järgmine küsimus]

(... jätkub kuni 40 küsimust läbi)

AI: 🎉 Enesehindamine valmis!
    
    Annan sulle kohe ülevaate tulemustest...
```

---

#### 6. TULEMUSED JA RAPORT

```
┌─────────────────────────────────────────────┐
│  📊 ENESEHINDAMISE TULEMUSED                │
├─────────────────────────────────────────────┤
│                                              │
│  VASTAVUSE SKOOR                            │
│  ████████████░░░░░░░░ 62/100               │
│                                              │
│  TUGEVUSED 💪                               │
│  ✅ Töötajate koolitamine (100%)            │
│  ✅ Varundamine (80%)                       │
│  ✅ Antiviirus (100%)                       │
│                                              │
│  PUUDUJÄÄGID 🔴                             │
│  ❌ Infoturbepoliitika puudub               │
│  ❌ Infoturbe vastutaja määramata           │
│  ❌ Riskihinnang puudub                     │
│  ❌ Intsidendi plaan puudub                 │
│  ❌ 2FA ei ole kasutusel                    │
│  ⚠️  Paroolide poliitika nõrk              │
│  ⚠️  Logide arhiveerimine puudulik         │
│                                              │
│  📋 TEGEVUSPLAAN                            │
│  12 ülesannet prioritiseeritud              │
│                                              │
│  📄 DOKUMENDID                              │
│  3 dokumenti genereeritud                   │
│                                              │
│  [Vaata raportit] [Alusta parandusi]       │
└─────────────────────────────────────────────┘

(kasutaja klikib "Vaata raportit")

→ Genereeritakse PDF:
  - Enesehindamise raport (5 lk)
  - Tegevusplaan (2 lk)
  
[Lae alla PDF]

(kasutaja klikib "Alusta parandusi")

→ Liigume tegevusplaani
```

---

#### 7. TEGEVUSPLAAN

```
┌─────────────────────────────────────────────┐
│  📋 TEGEVUSPLAAN (12 ülesannet)             │
├─────────────────────────────────────────────┤
│                                              │
│  🔴 KÕRGE PRIORITEET (teha kohe)           │
│                                              │
│  ☐ 1. Määra infoturbe vastutaja            │
│     Tähtaeg: 7 päeva                        │
│     Keerukus: Lihtne                        │
│     [Vaata detaile]                         │
│                                              │
│  ☐ 2. Kinnita infoturbepoliitika           │
│     Tähtaeg: 14 päeva                       │
│     Keerukus: Keskmine                      │
│     [Genereeri dokument] 📄                │
│                                              │
│  ☐ 3. Aktiveeri 2FA kõigile kasutajatele   │
│     Tähtaeg: 14 päeva                       │
│     Keerukus: Lihtne                        │
│     [Vaata juhiseid]                        │
│                                              │
│  🟠 KESKMINE PRIORITEET (teha 30 päeva)    │
│  ...                                        │
│                                              │
│  🟢 MADAL PRIORITEET (teha 90 päeva)       │
│  ...                                        │
│                                              │
└─────────────────────────────────────────────┘

(kasutaja klikib "Genereeri dokument" ülesande 2 juures)

AI: Loon sulle infoturbepoliitika mustandi...
    
    ⏳ Genereerimine (10 sek)
    
    ✓ Valmis!
    
    📄 Infoturbepoliitika v1.0 (mustand)
    
    Dokument põhineb:
    - Sinu organisatsiooni profiilil
    - NIS2 nõuetel
    - Eesti õigusaktidel
    - Best practice'del
    
    [Vaata dokumenti] [Lae alla Word] [Lae alla PDF]

(kasutaja vaatab dokumenti)

→ Näitab Word'i eelvaadet brauseris

[Kinnita dokument] [Muuda] [Räägi AI-ga]

(kui kasutaja klikib "Kinnita dokument")

AI: ✓ Infoturbepoliitika v1.0 kinnitatud!
    
    See dokument on nüüd ametlik.
    Soovin sulle teada anda uuendustest tulevikus.
    
    ✅ Ülesanne #2 täidetud!
    
    📊 Progress: 1/12 (8%)
```

---

#### 8. DASHBOARD (pärast enesehindamist)

```
┌─────────────────────────────────────────────┐
│  Dr. Kati Perearst OÜ              [Kati ▾] │
├─────────────────────────────────────────────┤
│                                              │
│  📊 NIS2 VASTAVUS                           │
│  ████████████░░░░░░░░ 62%                  │
│                                              │
│  ✅ Enesehindamine tehtud                   │
│  🔴 5 kriitilist puudujääki                 │
│  🟠 4 keskmisel tasemel probleemi           │
│  🟢 3 väheolulist parandust                 │
│                                              │
├─────────────────────────────────────────────┤
│  📋 TEGEVUSPLAAN                            │
│  Tehtud: 1/12 (8%)                          │
│                                              │
│  Täna teha:                                 │
│  ☐ Määra infoturbe vastutaja               │
│  ☐ Aktiveeri 2FA                            │
│                                              │
│  [Vaata kõiki ülesandeid]                  │
│                                              │
├─────────────────────────────────────────────┤
│  📄 DOKUMENDID (3)                          │
│  ✅ Infoturbepoliitika v1.0                │
│  ⏳ Riskihinnang (mustand)                 │
│  ⏳ Tegevusplaan (mustand)                 │
│                                              │
│  [Vaata kõiki dokumente]                   │
│                                              │
├─────────────────────────────────────────────┤
│  💬 KÜSI AI-LT                              │
│  "Kuidas ma 2FA aktiveerin?"                │
│  "Kas ma olen nüüd nõuetega vastavuses?"    │
│                                              │
│  [Alusta vestlust]                          │
└─────────────────────────────────────────────┘
```

---

#### 9. AI VESTLUS (jooksev abi)

**Näide 1: Küsimus**

```
Kati: Kuidas ma 2FA aktiveerin Google Workspace'is?

AI: Hea küsimus! 
    
    Google Workspace'is 2FA (kahe-etapilise
    kinnitamise) sisselülitamine:
    
    1. Mine admin.google.com
    2. Vali Security → 2-Step Verification
    3. Kliki "Get Started"
    4. Vali "Enforce 2SV"
    5. Määra tähtaeg (nt 7 päeva)
    
    📎 Juhend: [link]
    
    💡 NB! Teavita töötajaid ette, et nad
    saaksid oma telefonid valmis panna.
    
    Kas saan veel kuidagi aidata?
```

**Näide 2: Uuendus**

```
Kati: Lisasime eile uue õe meeskonda

AI: Suurepärane! Täpsustan:
    
    - Nimi: [___]
    - Email: [___]
    - Kas ta saab ligipääsu retsepti süsteemile? (Jah/Ei)
    - Kas ta on läbinud infoturbe koolituse? (Jah/Ei)
    
    See on oluline NIS2 jaoks, sest:
    - Kõik töötajad peavad olema koolitatud
    - Ligipääsud peavad olema dokumenteeritud
```

**Näide 3: Järelkontroll**

```
AI: 🔔 Meeldetuletus
    
    Nädal on möödas! Kuidas läheb ülesandega:
    "Määra infoturbe vastutaja"?
    
    Kas oled selle ära teinud?
    
    [Jah, tehtud] [Veel töös] [Aita mind]
```

---

### STSENAARIUM 2: Tasuline konto (päev 30)

**Tasuta periood läbi:**

```
AI: ⏰ Teade
    
    Su 30-päevane tasuta prooviperiood lõpeb
    homme!
    
    Oled seni teinud:
    ✅ Enesehindamine
    ✅ 3 dokumenti
    ✅ 3/12 ülesannet täidetud
    
    📊 Vastavus: 62% → 78% (+16%!)
    
    Jätka NIS2 Abimeesega:
    
    💼 STARTER - €49/kuu
    ✓ Kõik funktsioonid
    ✓ Piiramatu AI vestlus
    ✓ Kõik dokumendid
    ✓ Tegevusplaani jälgimine
    ✓ Email tugi
    
    [Vali STARTER] [Vaata hindu]
    
    Või jätka TASUTA versiooniga:
    ○ Ainult vaatamine
    ○ Ei saa uuendada dokumente
    ○ Piiratud AI (10 sõnumit/kuu)
```

**Makse:**

```
┌─────────────────────────────────────────────┐
│  💳 MAKSEINFO                               │
├─────────────────────────────────────────────┤
│                                              │
│  PAKETT: STARTER                            │
│  Hind: €49/kuu                              │
│                                              │
│  [Stripe Payment Form]                      │
│                                              │
│  Kaardi number: [________________]          │
│  Aegumiskuupäev: [__/__]                   │
│  CVV: [___]                                 │
│                                              │
│  ✓ Maksan igakuiselt €49                   │
│  ✓ Tühistan igal ajal (ei küsita põhjust)  │
│  ✓ Esimene arve: täna                       │
│                                              │
│  [Kinnita tellimus]                         │
│                                              │
│  🔒 Turvaline makse (Stripe)                │
└─────────────────────────────────────────────┘

(pärast makset)

AI: 🎉 Tere tulemast NIS2 Abimees STARTER'isse!
    
    Su konto on nüüd aktiivne.
    
    📧 Saatsime kinnituse emailile.
    
    [Jätka]
```

---

## ✅ FEATURE CHECKLIST

**MÄRKUS:** ✅ = Valmis, ⏳ = Pooleli, ❌ = Pole alustatud

### AUTENTIMINE JA KASUTAJA

- [x] **Signup** ✅
  - [x] Email + parool
  - [ ] Email verification (valikuline MVP-s) ❌
  - [x] Organisatsiooni nimi
  - [x] 30-päevane trial (FREE)

- [x] **Login** ✅
  - [x] Email + parool
  - [ ] "Unusta parool" ❌
  - [x] Session management
  - [x] **Auth ajutiselt välja lülitatud testimiseks (mock session)**

- [ ] **Profiil** ❌
  - [ ] Kasutaja nimi
  - [ ] Email muutmine
  - [ ] Parooli muutmine
  - [ ] Kustuta konto

---

### ORGANISATSIOONI PROFIIL

- [x] **Onboarding küsimustik** ✅
  - [x] 8-sammuline protsess (uuendatud!)
  - [x] Sektor - 11 valdkonda (button selection)
  - [x] Subsector - tervishoid täpsustus (conditional)
  - [x] Töötajate arv (button selection)
  - [x] Käive (button selection)
  - [x] IT süsteemid (checkboxes, multi-select)
  - [x] Turvaprotseduurid (button selection)
  - [x] Infoturbe vastutaja (button selection) 🆕
  - [x] Isikuandmete töötlemine (button selection) 🆕
  - [x] Auto-advance UI (300ms delay pärast nupuvalimist)
  - [x] Progress bar (näitab X/8 sammu)
  - [x] "Tagasi" nupp (kõigil sammudel peale esimest)

- [x] **NIS2 kohaldatavuse tuvastamine** ✅
  - [x] Automaatne arvutus (server-side)
  - [x] 11 sektorit toetatud
  - [x] Essential vs Important kategooria
  - [x] Selgitus kasutajale (dashboard)

- [x] **Profiili muutmine** ✅
  - [x] Profiilileht (vaatamine) 🆕
  - [x] "Muuda profiili" nupp → onboarding
  - [x] Redigeerimine igal ajal
  - [x] profileConfirmed flag (andmebaasis)
  - [ ] AI teavitab mõjust dokumentidele ❌ (tulevikus)

---

### AI VESTLUS

- [ ] **Chat UI**
  - [ ] Sõnumite ajalugu
  - [ ] Streaming responses (real-time typing)
  - [ ] Markdown support
  - [ ] Code blocks (tulevikus)
  - [ ] Link'id ja nupud

- [ ] **Conversation management**
  - [ ] Uus vestlus
  - [ ] Vestluste ajalugu (külgpaan)
  - [ ] Vestluse kustutamine
  - [ ] Vestluse ümber nimetamine

- [ ] **AI võimekused**
  - [ ] Küsimustele vastamine
  - [ ] Faktide ekstrakteerimine
  - [ ] Soovituste andmine
  - [ ] Dokumentide genereerimine
  - [ ] Meeldetuletused

---

### ENESEHINDAMINE

- [ ] **Küsimustik**
  - [ ] 6 sektsiooni
  - [ ] 40 küsimust
  - [ ] Vastusevariandid (radio)
  - [ ] "Ei tea" option
  - [ ] Progressi näitamine (X/40)
  - [ ] Salvestamine (draft mode)

- [ ] **AI selgitused**
  - [ ] Miks see küsimus oluline on?
  - [ ] NIS2 viide (artikkel, lõik)
  - [ ] Näited

- [ ] **Tulemused**
  - [ ] Skoor (0-100)
  - [ ] Tugevuste loend
  - [ ] Puudujääkide loend
  - [ ] Visualiseerimine (progress bar)

- [ ] **Raport (PDF)**
  - [ ] Kokkuvõte
  - [ ] Detailne analüüs
  - [ ] Soovitused
  - [ ] Genereerimine ja allalaadimine

---

### DOKUMENTIDE GENEREERIMINE

- [ ] **Infoturbepoliitika**
  - [ ] Template põhineb NIS2 + org profiilil
  - [ ] Genereeritakse AI poolt (Claude)
  - [ ] Eelvaade brauseris
  - [ ] Eksport: DOCX, PDF

- [ ] **Riskihinnang**
  - [ ] Põhineb enesehindamise vastustel
  - [ ] Riskide loend + hinnangud
  - [ ] Soovitused
  - [ ] Eksport: DOCX, PDF

- [ ] **Tegevusplaan**
  - [ ] Ülesanded prioritiseeritud
  - [ ] Tähtajad
  - [ ] Vastutajad (kasutaja täidab)
  - [ ] Eksport: PDF

- [ ] **Dokumentide haldus**
  - [ ] Draft / Approved olekud
  - [ ] Versioonid (v1.0, v1.1 jne)
  - [ ] Kinnitamine kasutaja poolt
  - [ ] Allalaadimine

---

### TEGEVUSPLAAN

- [ ] **Ülesannete loend**
  - [ ] Prioriteet (kõrge/kesk/madal)
  - [ ] Olek (ootel/töös/tehtud)
  - [ ] Tähtaeg
  - [ ] Kirjeldus
  - [ ] Soovitused (AI)

- [ ] **Ülesande detailvaade**
  - [ ] Täielik kirjeldus
  - [ ] NIS2 viide
  - [ ] Juhised (kuidas teha?)
  - [ ] Link'id ressurssidele

- [ ] **Ülesande täitmine**
  - [ ] Märgi tehtuks
  - [ ] Lisa kommentaar
  - [ ] Lisa tõend (valikuline MVP-s)

- [ ] **Progressi jälgimine**
  - [ ] X/12 tehtud
  - [ ] Progress bar
  - [ ] Dashboard'il nähtav

---

### DASHBOARD

- [ ] **Ülevaade**
  - [ ] Vastavuse skoor (%)
  - [ ] Progress bar (visuaalne)
  - [ ] Kriitiliste probleemide arv

- [ ] **Kiirülesanded**
  - [ ] "Täna teha" (3 ülesannet)
  - [ ] Tähtaja lähedased

- [ ] **Dokumendid**
  - [ ] Viimati muudetud (3)
  - [ ] Link'id dokumentidele

- [ ] **AI vestlus**
  - [ ] Kiirligipääs
  - [ ] Soovitatud küsimused

---

### MAKSED JA TELLIMINE

- [ ] **Hinnapaketid**
  - [ ] FREE (info page)
  - [ ] STARTER (€49/kuu)

- [ ] **Stripe integratsioon**
  - [ ] Checkout flow
  - [ ] Subscription management
  - [ ] Arvete genereerimine
  - [ ] Webhook'id (payment.succeeded jne)

- [ ] **Billing page**
  - [ ] Praegune pakett
  - [ ] Järgmine maksu kuupäev
  - [ ] Makseviis (muuda)
  - [ ] Arvete ajalugu
  - [ ] Tühista tellimus

---

### MUUD

- [ ] **Email teavitused (valikuline MVP-s)**
  - [ ] Tere tulemast email
  - [ ] Trial lõpeb (3 päeva enne)
  - [ ] Makse kinnitused

- [ ] **Landing page**
  - [ ] Hero section
  - [ ] Kasutused/eelised
  - [ ] Hinnad
  - [ ] FAQ
  - [ ] CTA (Call-to-Action)

- [ ] **Legal**
  - [ ] Terms of Service
  - [ ] Privacy Policy
  - [ ] Cookie consent

- [ ] **Mobile responsive**
  - [ ] Dashboard
  - [ ] Chat
  - [ ] Dokumentide vaatamine

---

## 🛠️ TEHNOLOOGIA STACK

### FRONTEND

```javascript
Framework: Next.js 15 (App Router)
Language: TypeScript
UI Library: shadcn/ui (Radix UI primitives)
Styling: Tailwind CSS
Icons: Lucide React
State: Zustand (global) + React Query (server state)
Forms: React Hook Form + Zod validation
Markdown: react-markdown
Charts: Recharts (kui vaja)
PDF Viewer: react-pdf
```

**Miks Next.js?**
- Server + client components
- API routes (serverless)
- SEO-friendly
- Kiire arendus
- Vercel hosting (lihtne deploy)

**Miks shadcn/ui?**
- Kopeeri-kleebi komponendid
- Täielik kontroll (ei ole NPM package)
- Radix UI baasil (accessibility)
- Tailwind-native

---

### BACKEND

```javascript
Runtime: Node.js 22 LTS
Framework: Next.js API Routes (serverless)
Database ORM: Prisma
Validation: Zod
Auth: NextAuth.js (credentials provider)
```

**Alternatiiv (kui Next.js API ei sobi):**
```
Express.js + tRPC
```

---

### DATABASE

```
Primary: PostgreSQL 16 (Supabase)
Cache: Redis (Upstash) - valikuline MVP-s
File storage: Supabase Storage (S3-compatible)
```

**Miks Supabase?**
- Tasuta tier (piisab MVP-ks)
- Postgres + Auth + Storage koos
- Automaatne backup
- Real-time (tulevikus)
- Row Level Security

---

### AI

```
LLM: Claude 3.5 Sonnet (Anthropic API)
Model: claude-3-5-sonnet-20241022
Max tokens: 8192 (vastus)
Temperature: 0.7 (kreatiivne, aga mitte liiga)
```

**API key management:**
- Salvestatud keskkonnamuutujana (.env)
- Rate limiting (100 requests/min)
- Error handling (retry logic)

**Cost optimization:**
- Caching (identsed küsimused)
- Context minimization (ainult vajalik info)
- Streaming (kasutaja kogemus)

**Anthropic hinnakiri (2026):**
- Input: $3 / 1M tokens
- Output: $15 / 1M tokens

**Hinnangulised kulud per klient:**
- Onboarding: ~5k tokens = $0.05
- Enesehindamine: ~30k tokens = $0.50
- Dokumendi genereerimine: ~10k tokens × 3 = $1.50
- Igakuine vestlus: ~20k tokens = $1.00

**Kokku per klient/kuu: ~$3** (€2.70)

Gross margin: (€49 - €2.70) / €49 = **94.5%** 🔥

---

### DOCUMENT GENERATION

```javascript
DOCX: docxtemplater (templates + mustache)
PDF: 
  Option 1: Puppeteer (HTML → PDF, parim kvaliteet)
  Option 2: jsPDF (kiirem, väiksem kontroll)
  Option 3: react-pdf (React komponendid)
  
Recommendation: Puppeteer (MVP)
```

**Dokumendi template näide:**

```html
<!-- infoturbepoliitika.html -->
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial; font-size: 12pt; }
    h1 { color: #333; }
    .section { margin: 20px 0; }
  </style>
</head>
<body>
  <h1>{{organisationName}} Infoturbepoliitika</h1>
  <p>Versioon: {{version}}</p>
  <p>Kuupäev: {{date}}</p>
  
  <div class="section">
    <h2>1. Eesmärk</h2>
    <p>{{purpose}}</p>
  </div>
  
  <!-- ... -->
</body>
</html>
```

**Genereerimise protsess:**
1. AI genereerib sisu (JSON)
2. Template mootor täidab HTML
3. Puppeteer renderib PDF
4. Salvesta Supabase Storage
5. Anna kasutajale allalaadimise link

---

### INFRASTRUCTURE

```
Hosting: Vercel (frontend + API routes)
Database: Supabase (Postgres)
File Storage: Supabase Storage
Cache: Upstash Redis (valikuline)
CDN: Vercel Edge Network
SSL: Automatic (Vercel)
Domain: namecheap.com / .ee domain
```

**Vercel pricing:**
- Free tier: OK MVP-ks
- Pro ($20/kuu): kui >100GB bandwidth

**Supabase pricing:**
- Free tier: 500MB database, 1GB storage
- Pro ($25/kuu): 8GB database, 100GB storage

**Anthropic API:**
- Pay-as-you-go

**Stripe:**
- 1.4% + €0.25 per makse (Euroopa kaardid)

---

### MONITORING & ANALYTICS

```
Error tracking: Sentry (free tier)
Logging: Vercel Logs (või BetterStack)
Analytics: PostHog (free tier) VÕI Plausible
Uptime: UptimeRobot (free)
```

---

### DEV TOOLS

```
Version control: Git + GitHub
Package manager: pnpm (kiirem kui npm)
Linting: ESLint + Prettier
Type checking: TypeScript strict mode
Testing: Vitest (unit) + Playwright (e2e) - valikuline MVP-s
CI/CD: GitHub Actions + Vercel
```

---

### REPOSITORY STRUKTUUR

```
nis2-abimees/
├── .github/
│   └── workflows/
│       └── ci.yml
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   ├── images/
│   └── fonts/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx       # Dashboard
│   │   │   ├── profile/
│   │   │   ├── assessment/
│   │   │   ├── documents/
│   │   │   ├── action-plan/
│   │   │   └── chat/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── chat/
│   │   │   ├── assessment/
│   │   │   ├── documents/
│   │   │   └── webhooks/
│   │   ├── layout.tsx
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── ui/                # shadcn components
│   │   ├── chat/
│   │   ├── dashboard/
│   │   └── documents/
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── claude.ts      # Claude API client
│   │   │   ├── prompts.ts     # Prompt library
│   │   │   └── parser.ts      # Response parsing
│   │   ├── db/
│   │   │   └── prisma.ts
│   │   ├── auth/
│   │   │   └── next-auth.ts
│   │   ├── documents/
│   │   │   ├── generator.ts   # PDF/DOCX generation
│   │   │   └── templates/
│   │   └── utils.ts
│   ├── hooks/
│   ├── types/
│   └── config/
├── .env.example
├── .env.local
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

---

## 📊 ANDMEMUDEL (Prisma Schema)

```prisma
// schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// KASUTAJA
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String
  name          String?
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  organization  Organization?
  conversations Conversation[]
  actionItems   ActionItem[]
}

// ORGANISATSIOON
model Organization {
  id            String   @id @default(cuid())
  name          String
  
  // Profiil
  sector        String   // "healthcare", "manufacturing", etc.
  subsector     String?  // "general_practitioner", "pharmacy", etc.
  employeeCount String   // "1-10", "11-50", etc.
  revenue       String   // "<10M", ">10M"
  itSystems     String[] // ["email", "erp", "patient_db"]
  
  // NIS2
  nis2Applicable Boolean  @default(false)
  nis2Category   String?  // "essential", "important"
  
  // Subscription
  plan          String   @default("free") // "free", "starter"
  stripeCustomerId String?
  stripeSubscriptionId String?
  trialEndsAt   DateTime?
  subscriptionStatus String? // "active", "canceled", "past_due"
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  userId        String   @unique
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  assessments   Assessment[]
  documents     Document[]
  actionPlan    ActionItem[]
}

// ENESEHINDAMINE
model Assessment {
  id              String   @id @default(cuid())
  
  // Status
  status          String   @default("in_progress") // "in_progress", "completed"
  progress        Int      @default(0) // 0-40 (number of answered questions)
  score           Int?     // 0-100 (final score)
  
  // Vastused (JSON)
  answers         Json     @default("{}")
  // { "q1": "option_a", "q2": "option_c", ... }
  
  // Tulemused
  strengths       String[] @default([])
  weaknesses      String[] @default([])
  recommendations Json?    // AI generated recommendations
  
  completedAt     DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  organizationId  String
  organization    Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  
  report          Document? @relation("AssessmentReport")
}

// DOKUMENDID
model Document {
  id              String   @id @default(cuid())
  
  title           String
  type            String   // "policy", "risk_assessment", "action_plan"
  version         String   @default("1.0")
  status          String   @default("draft") // "draft", "approved", "archived"
  
  // Sisu
  content         String   @db.Text // Markdown or HTML
  contentJson     Json?    // Structured content
  
  // Files
  fileUrl         String?  // URL to PDF/DOCX in storage
  
  approvedAt      DateTime?
  approvedBy      String?  // User ID or name
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  organizationId  String
  organization    Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  
  assessmentId    String?  @unique
  assessment      Assessment? @relation("AssessmentReport", fields: [assessmentId], references: [id])
}

// TEGEVUSPLAAN
model ActionItem {
  id              String   @id @default(cuid())
  
  title           String
  description     String   @db.Text
  
  priority        String   // "high", "medium", "low"
  status          String   @default("pending") // "pending", "in_progress", "completed"
  
  dueDate         DateTime?
  assignee        String?  // kasutaja nimi või ID
  
  // NIS2 viide
  nis2Reference   String?  // "Article 21, Section 2"
  
  // Juhised
  instructions    String?  @db.Text
  resourceLinks   String[] @default([])
  
  // Tõendid
  evidenceUrl     String?
  notes           String?  @db.Text
  
  completedAt     DateTime?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  organizationId  String
  organization    Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  
  completedBy     String?
  completedByUser User?    @relation(fields: [completedBy], references: [id])
}

// AI VESTLUSED
model Conversation {
  id              String   @id @default(cuid())
  
  title           String   @default("Uus vestlus")
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  messages        Message[]
}

model Message {
  id              String   @id @default(cuid())
  
  role            String   // "user", "assistant"
  content         String   @db.Text
  
  // Metadata
  tokens          Int?     // token count (for billing)
  model           String?  // "claude-3-5-sonnet-20241022"
  
  createdAt       DateTime @default(now())
  
  conversationId  String
  conversation    Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
}

// AUDIT LOG (tulevikus)
// model AuditLog {
//   id        String   @id @default(cuid())
//   action    String   // "document_approved", "assessment_completed"
//   details   Json
//   userId    String
//   createdAt DateTime @default(now())
// }
```

---

## 🎨 UI/UX DISAIN

### DESIGN SYSTEM

**Värvid (Tailwind):**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... (blue)
          600: '#0284c7',
          700: '#0369a1',
        },
        success: {
          // green
        },
        warning: {
          // yellow/orange
        },
        danger: {
          // red
        },
      }
    }
  }
}
```

**Typography:**
```
Headings: font-bold, text-2xl/3xl/4xl
Body: font-normal, text-base
Small: text-sm
Tiny: text-xs

Font: System font stack (fast loading)
```

**Spacing:**
```
Consistent: 4px grid (space-1 = 4px, space-2 = 8px, ...)
```

**Components (shadcn/ui):**
- Button
- Card
- Dialog (Modal)
- Dropdown Menu
- Form (Input, Textarea, Select)
- Progress Bar
- Badge
- Alert
- Tabs
- Tooltip

---

### KEY SCREENS (Wireframes)

#### 1. LANDING PAGE

```
┌──────────────────────────────────────────┐
│  [Logo] NIS2 ABIMEES      [Login] [Demo] │
├──────────────────────────────────────────┤
│                                           │
│         HERO SECTION                      │
│  ┌─────────────────────────────────────┐ │
│  │ Kas teie organisatsioon on NIS2     │ │
│  │ nõuetega valmis?                    │ │
│  │                                     │ │
│  │ AI juhendab sind läbi protsessi     │ │
│  │ 30 minutiga.                        │ │
│  │                                     │ │
│  │ [Alusta tasuta] [Vaata demo ▶]     │ │
│  │                                     │ │
│  │ ✓ Tasuta 30 päeva                  │ │
│  │ ✓ Krediitkaarti ei küsita          │ │
│  │ ✓ Kõik dokumendid kaasas            │ │
│  └─────────────────────────────────────┘ │
│                                           │
│         [Screenshot / Video]              │
│                                           │
├──────────────────────────────────────────┤
│         EELISED                           │
│  ┌──────┐  ┌──────┐  ┌──────┐           │
│  │ 🤖   │  │ ⏱️    │  │ 💰   │           │
│  │ AI   │  │Kiire │  │Odav  │           │
│  │ Abi  │  │30min │  │€49   │           │
│  └──────┘  └──────┘  └──────┘           │
├──────────────────────────────────────────┤
│         KUIDAS TÖÖTAB?                    │
│  1. Profiil (5 min)                      │
│  2. Enesehindamine (30 min)              │
│  3. Dokumendid valmis! (1h)              │
├──────────────────────────────────────────┤
│         HINNAD                            │
│  FREE vs STARTER                          │
├──────────────────────────────────────────┤
│         FAQ                               │
├──────────────────────────────────────────┤
│  [Footer: Links, Contact, Legal]         │
└──────────────────────────────────────────┘
```

#### 2. DASHBOARD

```
┌──────────────────────────────────────────┐
│  [Logo]  Dashboard  Chat  Docs  [Kati▾]  │
├──────────────────────────────────────────┤
│  ┌────────────────────────────────────┐  │
│  │ 📊 NIS2 VASTAVUS                   │  │
│  │ ████████████░░░░░░░░ 62%          │  │
│  │ ✅ Enesehindamine tehtud           │  │
│  │ 🔴 5 kriitilist probleemi          │  │
│  └────────────────────────────────────┘  │
│  ┌─────────────┐  ┌──────────────────┐  │
│  │📋 TEGEVUSED │  │ 📄 DOKUMENDID    │  │
│  │ 1/12 tehtud │  │ 3 dokumenti      │  │
│  │ [Vaata]     │  │ [Vaata]          │  │
│  └─────────────┘  └──────────────────┘  │
│  ┌────────────────────────────────────┐  │
│  │ 💬 KÜSI AI-LT                      │  │
│  │ "Kuidas ma 2FA aktiveerin?"        │  │
│  │ [Alusta vestlust]                  │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

#### 3. CHAT

```
┌──────────────────────────────────────────┐
│  [Logo]  Dashboard  Chat  Docs  [Kati▾]  │
├──────────────────────────────────────────┤
│ ┌────────┐┌──────────────────────────┐  │
│ │Vestlused││  💬 AI Vestlus           │  │
│ │────────││──────────────────────────│  │
│ │► Täna  ││                          │  │
│ │  Uus   ││  Kasutaja: Tere!         │  │
│ │────────││                          │  │
│ │  Eile  ││  AI: Tere! Kuidas        │  │
│ │  2FA   ││  saan sind aidata?       │  │
│ │────────││                          │  │
│ │+ Uus   ││  Kasutaja: Kuidas ma     │  │
│ │         ││  2FA aktiveerin?         │  │
│ │         ││                          │  │
│ │         ││  AI: [typing...]         │  │
│ │         ││                          │  │
│ │         ││──────────────────────────│  │
│ │         ││  [Kirjuta sõnum...]  [→]│  │
│ └────────┘└──────────────────────────┘  │
└──────────────────────────────────────────┘
```

#### 4. DOKUMENDID

```
┌──────────────────────────────────────────┐
│  [Logo]  Dashboard  Chat  Docs  [Kati▾]  │
├──────────────────────────────────────────┤
│  📄 DOKUMENDID                            │
│  ┌────────────────────────────────────┐  │
│  │ ✅ Infoturbepoliitika v1.0         │  │
│  │    Kinnitatud: 2026-01-05          │  │
│  │    [Vaata] [Lae alla] [Redigeeri] │  │
│  └────────────────────────────────────┘  │
│  ┌────────────────────────────────────┐  │
│  │ ⏳ Riskihinnang (mustand)           │  │
│  │    Loodud: 2026-01-08              │  │
│  │    [Vaata] [Kinnita] [Redigeeri]  │  │
│  └────────────────────────────────────┘  │
│  ┌────────────────────────────────────┐  │
│  │ 📋 Tegevusplaan                     │  │
│  │    Loodud: 2026-01-08              │  │
│  │    [Vaata] [Lae alla PDF]         │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

---

### MOBILE RESPONSIVE

**Breakpoints:**
```
sm: 640px  (mobile)
md: 768px  (tablet)
lg: 1024px (desktop)
xl: 1280px (large desktop)
```

**Mobile adjustments:**
- Hamburger menu
- Stacked cards (not side-by-side)
- Simplified navigation
- Larger touch targets (min 44px)

---

## 🤖 AI IMPLEMENTATSIOON

### CLAUDE API CLIENT

```typescript
// src/lib/ai/claude.ts

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function chatCompletion({
  messages,
  systemPrompt,
  temperature = 0.7,
  maxTokens = 4096,
}: {
  messages: { role: 'user' | 'assistant'; content: string }[];
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}) {
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: maxTokens,
    temperature,
    system: systemPrompt,
    messages,
  });

  return {
    content: response.content[0].text,
    usage: response.usage,
    id: response.id,
  };
}

export async function chatCompletionStream({
  messages,
  systemPrompt,
  onChunk,
}: {
  messages: { role: 'user' | 'assistant'; content: string }[];
  systemPrompt?: string;
  onChunk: (text: string) => void;
}) {
  const stream = await anthropic.messages.stream({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4096,
    system: systemPrompt,
    messages,
  });

  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
      onChunk(chunk.delta.text);
    }
  }

  const finalMessage = await stream.finalMessage();
  return {
    content: finalMessage.content[0].text,
    usage: finalMessage.usage,
  };
}
```

---

### PROMPT LIBRARY

```typescript
// src/lib/ai/prompts.ts

export const SYSTEM_PROMPT = `
Sa oled NIS2 Abimees - AI assistent, kes aitab organisatsioonidel
täita NIS2 direktiivi nõudeid.

PÕHIPRINTSIIBID:
- Räägi lihtsas eesti keeles (mitte IT žargooni)
- Esita üks küsimus korraga
- Selgita alati, MIKS miski on oluline (NIS2 kontekst)
- Ära tee oletusi - küsi alati kasutajalt kinnitust
- Ole sõbralik ja julgustav

PRAEGUNE KONTEKST:
- Organisatsioon: {{orgName}}
- Sektor: {{sector}}
- Töötajad: {{employeeCount}}

Kasutaja kirjutas: "{{userMessage}}"

Vasta kasutajale abivalmilt.
`;

export const ASSESSMENT_PROMPT = `
Sa viid läbi NIS2 enesehindamise küsimustikku.

REEGID:
- Esita täpselt 1 küsimus korraga
- Anna 3-5 vastusevarianti (radio buttons)
- Selgita lühidalt, miks see küsimus on oluline
- Viita NIS2 artiklile/lõikele
- Kui kasutaja on segaduses, anna näide

KÜSIMUSTIKU STRUKTUUR:
1. Organisatsioon (5 küsimust)
2. Riskijuhtimine (8 küsimust)
3. Tehnilised turvameetmed (12 küsimust)
4. Intsidendid (6 küsimust)
5. Varundamine (4 küsimust)
6. Töötajad (5 küsimust)

Praegu oled osas: {{currentSection}}
Küsimus nr: {{currentQuestion}}/40

Esita järgmine küsimus.
`;

export const DOCUMENT_GENERATION_PROMPT = `
Genereeri {{documentType}} (eesti keeles) järgmise info põhjal:

ORGANISATSIOON:
{{orgProfile}}

ENESEHINDAMISE TULEMUSED:
{{assessmentResults}}

NÕUDED:
- Eesti keel
- Lihtne ja loetav (mitte juriidiline keel)
- NIS2-ga vastavuses
- Maksimum 5 lehekülge
- Sisaldab kõiki kohustuslikke sektsioone

STRUKTUUR ({{documentType}}):
{{requiredSections}}

Tagasta dokument Markdown formaadis.
`;

export const FACT_EXTRACTION_PROMPT = `
Kasutaja ütles: "{{userMessage}}"

Ekstrakteeri faktid JSON formaadis:

{
  "facts": [
    {
      "type": "system|person|process|risk",
      "entity": "nimi",
      "attributes": {...},
      "confidence": 0.0-1.0
    }
  ],
  "clarificationNeeded": ["küsimus1", "küsimus2"],
  "suggestedActions": ["tegevus1", "tegevus2"]
}

Kui kasutaja info on ebamäärane, küsi täpsustusi.
`;
```

---

### CONVERSATION FLOW

```typescript
// src/lib/ai/conversation.ts

export async function handleUserMessage({
  userId,
  organizationId,
  message,
  conversationId,
}: {
  userId: string;
  organizationId: string;
  message: string;
  conversationId?: string;
}) {
  // 1. Lae kontekst
  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
  });

  const previousMessages = conversationId
    ? await prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
        take: 10, // viimased 10 sõnumit
      })
    : [];

  // 2. Koosta system prompt
  const systemPrompt = SYSTEM_PROMPT
    .replace('{{orgName}}', org.name)
    .replace('{{sector}}', org.sector)
    .replace('{{employeeCount}}', org.employeeCount)
    .replace('{{userMessage}}', message);

  // 3. Koosta messages array
  const messages = [
    ...previousMessages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    { role: 'user' as const, content: message },
  ];

  // 4. Claude API call
  const response = await chatCompletion({
    messages,
    systemPrompt,
    temperature: 0.7,
  });

  // 5. Salvesta vestlus
  if (!conversationId) {
    const conversation = await prisma.conversation.create({
      data: {
        userId,
        title: message.slice(0, 50), // esimesed 50 tähte
      },
    });
    conversationId = conversation.id;
  }

  await prisma.message.createMany({
    data: [
      {
        conversationId,
        role: 'user',
        content: message,
      },
      {
        conversationId,
        role: 'assistant',
        content: response.content,
        tokens: response.usage.output_tokens,
        model: 'claude-3-5-sonnet-20241022',
      },
    ],
  });

  return {
    conversationId,
    response: response.content,
  };
}
```

---

### STREAMING RESPONSE (real-time typing)

```typescript
// API Route: /api/chat/stream

export async function POST(req: Request) {
  const { message, conversationId } = await req.json();

  const stream = new ReadableStream({
    async start(controller) {
      await chatCompletionStream({
        messages: [{ role: 'user', content: message }],
        systemPrompt: SYSTEM_PROMPT,
        onChunk: (text) => {
          controller.enqueue(new TextEncoder().encode(text));
        },
      });

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}
```

**Frontend (React):**

```tsx
const [response, setResponse] = useState('');

async function sendMessage() {
  const res = await fetch('/api/chat/stream', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    setResponse((prev) => prev + chunk); // real-time update!
  }
}
```

---

## 📅 ARENDUSE ROADMAP

### SPRINT 1: Foundation (2 nädalat) ✅ VALMIS

**Eesmärk:** Projekt seadistatud, auth töötab

- [x] Repository setup (Next.js + TypeScript)
- [x] Database schema (Prisma)
- [x] Supabase setup
- [x] NextAuth.js integratsioon
- [x] Landing page (basic)
- [x] Signup / Login flow
- [x] Dashboard (empty, aga navigatsioon töötab)
- [x] Deploy Vercel'i (staging)

**Deliverable:** ✅ Saad sisse logida ja näed tühja dashboard'i

**Kuupäev:** Valmis 8. jaanuar 2026

---

### SPRINT 2: Onboarding + Profiil (2 nädalat) ✅ VALMIS

**Eesmärk:** Kasutaja saab organisatsiooni profiili täita

- [x] Onboarding küsimustik UI (8 sammu!)
  - [x] Button-based selection (mitte radio buttons)
  - [x] Auto-advance functionality (300ms delay)
  - [x] Progress bar
  - [x] 11 sektorit (mitte ainult tervishoid)
  - [x] Conditional subsector (tervishoid)
  - [x] 2 uut küsimust (infoturbe vastutaja, isikuandmed)
- [x] Organisatsiooni profiili salvestamine
- [x] NIS2 kohaldatavuse loogika
  - [x] Essential sectors: 6 sektorit
  - [x] Important sectors: 4 sektorit
  - [x] Suuruse põhine kategooria määramine
- [x] Dashboard näitab profiilist infot
- [x] Profiilileht (vaatamine + muutmine) 🆕
- [x] profileConfirmed flag 🆕
- [x] Auth ajutiselt välja lülitatud (mock session) 🆕
- [ ] AI vestlus (basic hello world) - järgmine sprint
- [ ] Claude API integratsioon (test) - järgmine sprint

**Deliverable:** ✅ Kasutaja täidab 8 küsimust, dashboard näitab kokkuvõtet, saab profiili vaadata ja muuta

**Kuupäev:** Valmis 8. jaanuar 2026

**Parandamist vajavad:**
- ⚠️  8. sammu salvestamine (viga backendis)
- ⚠️  Radio buttons asendamine tavaliste nuppudega (UX parandus)

---

### SPRINT 3: AI Vestlus (2 nädalat)

**Eesmärk:** AI vestlus töötab, kasutaja saab küsida

- [ ] Chat UI (messages, input)
- [ ] API route: /api/chat
- [ ] Conversation management (DB)
- [ ] Claude integration (streaming)
- [ ] System prompt + context
- [ ] Vestluste ajalugu (külgpaan)

**Deliverable:** Kasutaja saab AI-ga rääkida, vestlused salvestatakse

---

### SPRINT 4: Enesehindamine (3 nädalat)

**Eesmärk:** 40-küsimuseline enesehindamine töötab

- [ ] 40 küsimust (JSON andmed)
- [ ] Assessment UI (stepper, progress)
- [ ] AI juhendamine (selgitused)
- [ ] Vastuste salvestamine (progressive save)
- [ ] Tulemuste arvutamine (skoor)
- [ ] Tulemuste UI (dashboard)

**Deliverable:** Kasutaja teeb enesehindamise läbi, näeb skoori

---

### SPRINT 5: Dokumentide genereerimine (2 nädalat)

**Eesmärk:** AI genereerib 3 dokumenti

- [ ] Dokumendi genereerimise loogika
- [ ] Template'id (HTML)
- [ ] Puppeteer integratsioon (PDF)
- [ ] DOCX genereerimine
- [ ] Supabase Storage upload
- [ ] Dokumentide lehele UI
- [ ] Download funktsioon

**Deliverable:** Pärast enesehindamist genereeritakse 3 dokumenti (PDF + DOCX)

---

### SPRINT 6: Tegevusplaan (2 nädalat)

**Eesmärk:** Tegevusplaan kuvatakse ja saab täita

- [ ] Tegevusplaani genereerimine (AI)
- [ ] Ülesannete list UI
- [ ] Ülesande detailvaade
- [ ] Märgi tehtuks funktsioon
- [ ] Progressi jälgimine
- [ ] Dashboard integratsioon

**Deliverable:** Kasutaja näeb 12 ülesannet, saab neid täita

---

### SPRINT 7: Maksed (1 nädal)

**Eesmärk:** Stripe integratsioon, kasutaja saab maksta

- [ ] Stripe account setup
- [ ] Stripe Checkout integratsioon
- [ ] Webhook'id (payment.succeeded)
- [ ] Subscription management (DB)
- [ ] Billing page UI
- [ ] Trial logic (30 päeva)
- [ ] Tellimine / tühistamine

**Deliverable:** Kasutaja saab €49/kuu eest maksta

---

### SPRINT 8: Polish & Launch (2 nädalat)

**Eesmärk:** MVP valmis, lanseeritav

- [ ] Bug fixes
- [ ] Mobile responsive (test kõigil ekraanidel)
- [ ] Performance optimization (lighthouse)
- [ ] SEO (meta tags, sitemap)
- [ ] Legal pages (ToS, Privacy)
- [ ] Error handling (Sentry)
- [ ] Onboarding tutorial (valikuline)
- [ ] Production deploy

**Deliverable:** MVP on live'is, valmis esimesteks klientideks

---

**KOKKU: 16 nädalat (~4 kuud)**

---

## 🧪 TESTIMINE JA QA

### UNIT TESTING (valikuline MVP-s)

```
Framework: Vitest
Coverage: 50%+ (kriitilised funktsioonid)

Prioriteedid:
- AI prompts parsing
- Scoring logic
- Document generation
- Payment webhooks
```

### E2E TESTING (valikuline MVP-s)

```
Framework: Playwright
Tests:
- Signup flow
- Onboarding flow
- Assessment completion
- Document download
- Payment flow (Stripe test mode)
```

### MANUAL TESTING (kohustuslik!)

**Checklist:**
- [ ] Signup / Login (Chrome, Firefox, Safari)
- [ ] Mobile responsive (iPhone, Android)
- [ ] Onboarding (5 küsimust)
- [ ] AI vestlus (10 sõnumit)
- [ ] Enesehindamine (täida läbi)
- [ ] Dokumentide allalaadimine (PDF, DOCX)
- [ ] Tegevusplaan (märgi 1 ülesanne tehtuks)
- [ ] Makse (Stripe test card)
- [ ] Trial lõppemine (force expire)

---

## 📢 GO-TO-MARKET

### FAAS 1: PRE-LAUNCH (2 nädalat enne)

**Eesmärk:** Genereerida huvi, koguda lead'e

**Tegevused:**
1. **Landing page live**
   - Waitlist signup
   - Testimonial'id (kui on)
   - Demo video (valikuline)

2. **LinkedIn outreach**
   - Otsene sõnumid perearst headedele
   - Grupid: Eesti Perearstide Selts
   - Postitused: NIS2 teadlikkus

3. **Content marketing**
   - Blog post: "NIS2 - Mida perearst peab teadma?"
   - Checklist: "10 sammu NIS2 vastavuseni"
   - Jaga LinkedIn, Facebook, email

4. **Pilootkliendid**
   - Leia 5 perearsti
   - Paku tasuta early access
   - Koguge feedback'i

**Eesmärk:** 50+ waitlist registreerumist

---

### FAAS 2: LAUNCH (1. kuu)

**Eesmärk:** Esimesed 10 maksavat klienti

**Tegevused:**
1. **Product Hunt launch**
   - Valmista ette materjalid
   - Palu supporterite toetust
   - Eesmärk: Top 5 päeva jooksul

2. **PR**
   - Pressiteade: Eesti meedia (Digigeenius, Geenius, e24)
   - Artikkel: "AI aitab Eesti ettevõtteid NIS2 nõuetega"

3. **Otsene müük**
   - Cold outreach: 100 perearsti (LinkedIn, email)
   - Personaliseeritud sõnumid
   - Follow-up: 3 päeva pärast

4. **SEO**
   - Blog posts: "NIS2 nõuded Eestis"
   - Keywords: "nis2 eesti", "nis2 perearst", "infoturve audit"

**Metrics:**
- 500+ külastajat landing page'il
- 50+ signups
- 10+ maksavat klienti
- CAC: <€150

---

### FAAS 3: SKALEERUMINE (kuud 2-6)

**Eesmärk:** 50 maksavat klienti

**Tegevused:**
1. **Paid ads**
   - Google Ads: "NIS2 nõuded"
   - Facebook Ads: Target perearst grupid
   - Budget: €500/kuu

2. **Partnerlused**
   - IT-konsultandid (pakume 20% komisjoni)
   - Auditeerijad (referral fee)
   - Raamatupidamisfirmad (integratsioon?)

3. **Word-of-mouth**
   - Referral programm: too sõber, saa 1 kuu tasuta
   - Testimonial'id landing page'il

4. **Content**
   - Weekly blog posts
   - Case studies (anonymized)
   - Video tutorials (YouTube)

**Metrics:**
- 50 maksavat klienti (€2450 MRR)
- Churn: <10%
- NPS: >50

---

### CHANNEL STRATEEGIA (prioritiseeritud)

**1. SEO (Organic) - Kõrge prioriteet**
- Madal kulu
- Pikaajaline
- Usaldusväärsus

**2. LinkedIn Outreach - Kõrge prioriteet**
- Personaalne
- B2B
- Perearst grupid

**3. Partnerlused - Keskmine prioriteet**
- Win-win
- Usaldus (läbi partneri)

**4. Paid Ads - Madal prioriteet (MVP faasis)**
- Kallis
- Vajalik valideeritud product-market fit

---

## 💰 BUDGET JA RESSURSID

### ARENDUSKULUD (MVP)

**Tools & Services:**
```
Domain (.ee):          €10/aasta
Vercel (Pro):          €20/kuu × 4 = €80
Supabase (Free):       €0 (piisab MVP-ks)
Anthropic API:         €100 (esimesed testid)
Stripe:                €0 (pay-as-you-go)
Sentry (Free):         €0
Email (SendGrid Free): €0

KOKKU (4 kuud):        ~€300
```

**Arendaja:**
```
Variant A: Ise (Claude Code abil)
    Kulu: €0
    Aeg: 500h (full-time 3 kuud)

Variant B: Freelancer
    Kulu: €5000-10,000 (€25-50/h × 200-400h)
    Aeg: 3-4 kuud

Variant C: Agency
    Kulu: €20,000+
    Aeg: 3-6 kuud
```

**Disain:**
```
Variant A: shadcn/ui (ready-made)
    Kulu: €0
    
Variant B: Freelance designer
    Kulu: €1000-2000
```

---

### GO-TO-MARKET KULUD (kuud 1-6)

```
Landing page copy:        €0 (ise + Claude)
LinkedIn Ads (test):      €200
Google Ads (test):        €300
Content writing:          €0 (ise + Claude)
PR (pressiteade):         €0-500
Pilootklientide soodustus: €0 (tasuta trial)

KOKKU:                    ~€500-1000
```

---

### TOTAL BUDGET (MVP + 6 kuud)

```
Minimaalne (bootstrap):
€300 (services) + €500 (marketing) = €800

Optimaalne (freelancer):
€300 + €7500 (dev) + €1000 (marketing) = €8800

Enterprise (agency):
€300 + €20,000 + €1000 = €21,300
```

**Soovitus MVP-ks:** €800-2000 (tee ise, minimaalse turundusega)

---

### RESSURSID (üksi või meeskond?)

**Solo founder (sina + Claude Code):**
```
Pros:
+ Madal kulu
+ Kiire otsustamine
+ 100% ownership

Cons:
- Aeglasem arendus
- Pole keda ideid testida
- Kõik oskused peavad olemas olema
```

**Kaasasutaja / arendaja:**
```
Pros:
+ Kiirem arendus
+ Skill'ide jagamine
+ Motivatsioon

Cons:
- Equity sharing (50/50?)
- Vaja leida õige inimene
- Kommunikatsioon overhead
```

**Freelancer:**
```
Pros:
+ Flexible
+ Spetsiifiline skill
+ Madalam risk kui täiskohaga palkamine

Cons:
- Kallim kui ise
- Väiksem commitment
- Võib olla kommunikatsioonikeerulisem
```

**Minu soovitus MVP-ks:**
Solo + Claude Code + 1-2 beta testerit (perearst sõbrad)

---

## 📊 SUCCESS METRICS (MVP)

### PRODUCT METRICS

**Activation:**
- Signup → Profile completed: >70%
- Profile → Assessment started: >60%
- Assessment started → Completed: >80%
- Assessment → Document generated: >90%

**Engagement:**
- AI messages/user/week: >10
- Documents downloaded/user: >2
- Action items completed: >20%

**Retention:**
- Day 7 retention: >50%
- Day 30 retention: >30%
- Trial → Paid conversion: >10%

---

### BUSINESS METRICS

**Revenue:**
- Month 1: 10 customers × €49 = €490 MRR
- Month 3: 30 customers = €1,470 MRR
- Month 6: 50 customers = €2,450 MRR

**Unit economics:**
- CAC: <€150
- LTV: €1,058 (STARTER, 24 months)
- LTV/CAC: >7:1
- Payback: <4 months

**Costs:**
- AI cost/customer: ~€3/kuu
- Hosting: €20/kuu (fixed)
- Gross margin: >90%

---

### QUALITATIVE METRICS

**Customer satisfaction:**
- NPS: >40 (good for MVP)
- CSAT: >4.0/5
- Support tickets: <2/week

**Feedback:**
- Feature requests captured
- Bug reports resolved <48h
- Customer interviews: 5/month

---

## ✅ MVP DEFINITION OF DONE

MVP on valmis, kui:

- [ ] Kasutaja saab:
  - [ ] Luua konto
  - [ ] Täita organisatsiooni profiil (5 min)
  - [ ] Teha NIS2 enesehindamine läbi (30-45 min)
  - [ ] Saada AI-lt abi (vestlus töötab)
  - [ ] Genereerida 3 dokumenti (PDF + DOCX)
  - [ ] Vaadata tegevusplaani (12 ülesannet)
  - [ ] Maksta €49/kuu (Stripe)

- [ ] Rakendus on:
  - [ ] Live'is (production URL)
  - [ ] Mobile responsive
  - [ ] GDPR-compliant (privacy policy, data storage EU)
  - [ ] Bug-free (kriitilised vead parandatud)

- [ ] On olemas:
  - [ ] Landing page
  - [ ] Legal pages (ToS, Privacy)
  - [ ] Email notifications (welcome, trial ending)

- [ ] Monitooring:
  - [ ] Sentry error tracking
  - [ ] Plausible analytics

- [ ] Marketing:
  - [ ] SEO seadistatud (meta tags, sitemap)
  - [ ] Google Analytics (või Plausible)
  - [ ] LinkedIn presence

---

## 🚀 LAUNCH CHECKLIST

**2 nädalat enne:**
- [ ] Beta testing (5 kasutajat)
- [ ] Bug fixes
- [ ] Landing page copywriting
- [ ] Demo video
- [ ] Testimonial'id (kui on)

**1 nädal enne:**
- [ ] Final testing (E2E)
- [ ] Legal review (ToS, Privacy)
- [ ] Backup strategy
- [ ] Monitoring seadistatud
- [ ] Email templates valmis

**Launch päev:**
- [ ] Production deploy
- [ ] DNS seadistused
- [ ] Stripe live mode
- [ ] Social media posts (LinkedIn, Facebook)
- [ ] Product Hunt submit
- [ ] Pressiteade (meedia)
- [ ] Email waitlist'ile

**Päev pärast:**
- [ ] Monitor errors (Sentry)
- [ ] Vasta feedback'ile
- [ ] Fix critical bugs ASAP
- [ ] Collect metrics

---

## 📖 KOKKUVÕTE

**NIS2 Abimees MVP** on:
- ✅ Fookuseeritud (enesehindamine + dokumendid)
- ✅ Lihtne (5 min onboarding)
- ✅ Kasulik (lahendab reaalse probleemi)
- ✅ Skaleeritav (AI + SaaS)
- ✅ Taskukohane (€49/kuu)

**Edu võtmed:**
1. **Kiirus** - Tee MVP 3-4 kuuga
2. **Valideerimine** - 10 maksavat klienti esimese 2 kuuga
3. **Feedback** - Kuula kliente, iteréeri
4. **Fookus** - Ära ehita liiga palju (resist feature creep!)

**Järgmised sammud:**
1. ✅ **Vision on valmis** (PRODUCT_VISION.md)
2. ✅ **MVP spec on valmis** (MVP_SPEC.md)
3. 🚀 **Alusta arendust!**
   - Sprint 1: Foundation
   - Kasuta Claude Code abilisena
4. 🎯 **Valideer turgu paralleelselt**
   - Räägi perearst idega
   - Koguge feedback'i

---

**Edu sinu projektiga! 🚀**

---

**Versioon:** 1.0  
**Kuupäev:** 8. jaanuar 2026  
**Staatus:** Ready for development  
**Järgmine ülevaade:** Pärast Sprint 4 (reassess scope)

---

_"The best way to predict the future is to build it."_ - Alan Kay
