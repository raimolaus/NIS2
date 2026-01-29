# NIS2 ABIMEES - TOOTE VISIOON
## AI-toega infoturbe ja vastavuse juhtimise platvorm

**Versioon:** 1.0  
**Kuupäev:** 8. jaanuar 2026  
**Sihtturg:** Euroopa (algus: Eesti)

---

## 📋 SISUKORD

1. [Ülevaade](#ülevaade)
2. [Probleemi kirjeldus](#probleemi-kirjeldus)
3. [Lahendus](#lahendus)
4. [Sihtkasutajad](#sihtkasutajad)
5. [Võtmeväärtused](#võtmeväärtused)
6. [Toote põhifunktsioonid](#toote-põhifunktsioonid)
7. [Tehniline arhitektuur](#tehniline-arhitektuur)
8. [AI rolli ja võimekused](#ai-rolli-ja-võimekused)
9. [Ärimudel](#ärimudel)
10. [Roadmap (3-5 aastat)](#roadmap)
11. [Konkurentsieelised](#konkurentsieelised)
12. [Riskid ja väljakutsed](#riskid-ja-väljakutsed)

---

## 🎯 ÜLEVAADE

**NIS2 Abimees** on AI-toega veebipõhine platvorm, mis aitab väikestel ja keskmistel organisatsioonidel (ilma CISO või infoturbe meeskonnata) täita NIS2 direktiivi ja muude infoturbe standardite nõudeid.

### Põhiline erinevus teistest lahendustest:

❌ **Traditsioonilised lahendused:**
- Tehniline keel ja keerulised vormid
- Staatiline dokumentide hoidla
- Ühekordne audit või hindamine
- IT-spetsialistidele mõeldud

✅ **NIS2 Abimees:**
- Loomulikus keeles suhtlus AI-ga
- Elav, pidevalt uuenev süsteem
- AI jälgib muutusi ja hoiatab
- Mõeldud mitte-IT kasutajatele

---

## 🔴 PROBLEEMI KIRJELDUS

### Regulatiivne taust

**NIS2 direktiiv** (EU 2022/2555) on küberturbe raamistik, mis:
- Kehtib alates 2024. aasta oktooberist
- Hõlmab tuhandeid organisatsioone üle Euroopa
- Nõuab ranget vastavust ja dokumenteerimist
- Toob kaasa karmid trahvid (kuni €10M või 2% käibest)

### Mõjutatud organisatsioonid

**Kriitilised sektorid:**
- Tervishoiu (haiglad, kliinikud, perearstid, apteegid)
- Energia (elektri-, gaasi-, soojusettevõtted)
- Transport (lennujaamad, sadamad, raudteed)
- Pangandus ja finantsinfrastruktuur
- Digitaalne infrastruktuur (pilve-, DNS-teenused)
- Avalik haldus
- Kosmos

**Olulised sektorid:**
- Postiteenused
- Jäätmekäitlus
- Toiduainetetööstus
- Keemia
- Tootmine (meditsiiniseadmed, autod, elektroonika)
- Digiteenused

**Kriteeriumid:**
- Keskmised ja suured ettevõtted (50+ töötajat VÕI €10M+ käive)
- Asuvad EL-is
- Osutavad kriitilist või olulist teenust

### Põhiprobleem

**90% NIS2 kohustlastest:**
- ❌ Ei oma IT- ega infoturbe kompetentsi
- ❌ Puudub CISO või infoturbejuht
- ❌ Ei tea, kust alustada
- ❌ Ei oska hinnata, mis on "piisav"
- ❌ Kardavad karmeid trahve

**Olemasolevad lahendused:**
- 💰 Liiga kallid (konsultandid €150-250/h)
- 🤓 Liiga tehnilised (ISMS, ISO 27001 tööriistad)
- 📋 Liiga ükskordse auditi-kesksed
- 🏢 Mõeldud suurettevõtetele

### Valupunktid

**"Ma ei tea, mida ma pean tegema"**
- Standardite keel on arusaamatu
- Nõuete tõlgendamine on keeruline

**"Mul pole aega ega ressurssi"**
- Väike meeskond, palju ülesandeid
- IT pole põhitegevus

**"Kardán trahve ja auditeid"**
- Hirm, et midagi on puudu
- Ei tea, kas olen "piisavalt" teinud

**"Kõik muutub pidevalt"**
- Uued töötajad, tarnijad, süsteemid
- Dokumendid vananevad

---

## 💡 LAHENDUS

### Kontseptsioon

**NIS2 Abimees** on AI-assistent, mis:

1. **Räägib inimkeelt** (mitte IT žargooni)
2. **Küsib lihtsaid küsimusi** (üks korraga)
3. **Jälgib pidevalt** (mitte üks audit aastas)
4. **Hoiatab muutuste eest** (enne probleemi)
5. **Genereerib dokumendid** (kasutaja kinnitab)
6. **Juhib parandustegevusi** (action plan)

### Kuidas see töötab?

```
┌─────────────────────────────────────────┐
│  1. PROFIILIMINE (esimene 10 min)      │
│     AI küsib: "Mis valdkonnas          │
│     tegutsete? Mitu töötajat?"         │
│     → Tuvastab NIS2 kohaldatavuse      │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  2. ENESEHINDAMINE                      │
│     AI juhendab läbi küsimustiku       │
│     Kasutaja vastab lihtsas keeles     │
│     → AI tuvastab lüngad               │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  3. DOKUMENTIDE GENEREERIMINE           │
│     AI loob automaatselt:              │
│     - Infoturbe poliitika              │
│     - Riskihinnang                     │
│     - Tegevusplaan                     │
│     Kasutaja kinnitab ja täiendab      │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  4. PIDEV JÄLGIMINE                     │
│     AI: "Lisasite uue töötaja?"        │
│     AI: "Uuendasite tarkvara?"         │
│     → Automaatsed uuendused            │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  5. AUDIT-READY                         │
│     Audiitor saab ligipääsu            │
│     Kõik on dokumenteeritud            │
│     Audittrail olemas                  │
└─────────────────────────────────────────┘
```

---

## 👥 SIHTKASUTAJAD

### Primaarne sihtgrupp

**Väikesed ja keskmised NIS2 kohuslased ilma CISO-ta:**

**Tervishoiu sektor:**
- 🏥 Perearstid ja perearsti praktikad
- 💊 Apteegid ja apteegikettid
- 🦷 Eraarstid ja väikeklinikud
- 🏥 Väiksemad haiglad

**Tootmine ja tööstus:**
- 🏭 Keskmised tootmisettevõtted
- 🔧 Tehaseseadmete tootjad
- 📦 Pakendusettevõtted

**Logistika:**
- 🚚 Veoettevõtted
- 📦 Laopindade haldajad
- ✈️ Lennujaama teenindajad

**Kommunaalteenused:**
- 💧 Vee-ettevõtted
- ⚡ Kohalikud energiaettevõtted
- ♨️ Kaugkütte ettevõtted

**Avalik sektor:**
- 🏛️ Kohalikud omavalitsused
- 🏫 Haridusasutused
- 📚 Raamatukogud

**Digiteenused:**
- 💻 Väiksemad SaaS firmad
- 🌐 Veebiettevõtted
- 📱 App arendajad

### Ühised tunnused

✅ **50-500 töötajat**  
✅ **€10M-€100M käive**  
✅ **Puudub CISO või IT turvajuht**  
✅ **IT pole põhitegevus**  
✅ **NIS2 kohustatud**  
✅ **Maksevõimeline (€50-200/kuu)**  

### Persona näited

**👩‍⚕️ Dr. Kati (Perearst, 48a)**
- Perearsti praktika, 3 arsti, 8 õde
- Kasutab retsepti süsteemi ja Google Workspace
- IT teadmised: baastase
- Hirm: trahvid, andmeleke
- Soov: "Lihtsalt olla korras"

**👨‍💼 Mati (Apteegiketi juht, 52a)**
- 12 apteeki, 45 töötajat
- Kasutab müügisüsteemi, raamatupidamist
- IT teadmised: keskmine
- Hirm: ei tea, kas kõik apteegid on vastavuses
- Soov: "Ülevaade kõigist asukohtadest"

**👷‍♂️ Toomas (Tehase direktor, 45a)**
- Tootmisettevõte, 120 töötajat
- Kasutab ERP, IoT seadmeid
- IT teadmised: madal
- Hirm: tootmine seiskub küberrünnaku tõttu
- Soov: "Näita mulle, mis ohtlik on"

---

## 🌟 VÕTMEVÄÄRTUSED

### Kasutajale

1. **Lihtsus**
   - Räägib inimkeelt
   - Ei nõua IT teadmisi
   - Üks küsimus korraga

2. **Kiirus**
   - Esimene hindamine 30 minutiga
   - Dokumendid valmis 1 tunniga
   - Mitte nädalaid/kuid

3. **Jätkusuutlikkus**
   - Mitte ühekordne projekt
   - Pidev jälgimine
   - Automaatsed uuendused

4. **Kindlustunne**
   - Teab, et on "korras"
   - Valmis auditiks
   - Tõendid olemas

5. **Taskukohane**
   - €49-149/kuu (mitte €10k+ konsultandid)
   - ROI: esimene kuu

### Ärile

1. **Skaleeritav**
   - SaaS mudel
   - Automatiseeritud onboarding
   - Vähe käsitööd

2. **Korduv tulu**
   - Abonnemendipõhine
   - Kõrge retention (90%+)
   - Upsell võimalused

3. **Laiendatav**
   - Alustame NIS2-ga
   - Laiendame ISO 27001, GDPR jne
   - Euroopa turud

4. **Partnerlused**
   - IT-konsultandid
   - Audiitorid
   - Tarkvaraarendajad

---

## 🛠️ TOOTE PÕHIFUNKTSIOONID (FULL SCOPE)

### 1. ORGANISATSIOONI PROFIIL

**Põhiandmed:**
- Organisatsiooni nimi, registrikood
- Sektor ja tegevusvaldkond
- Asukoht(ad)
- Töötajate arv
- Käive
- Kontaktandmed

**NIS2 klassifikatsioon:**
- Kriitiline / Oluline sektor
- Kohaldatavuse tuvastamine
- Riigipõhised erisused

**Standardite valik:**
- ✅ NIS2 (vaikimisi)
- ⬜ ISO/IEC 27001
- ⬜ GDPR
- ⬜ Eesti ISKE
- ⬜ Riigipõhised standardid (Läti, Leedu, Saksamaa BSI)

---

### 2. AI KONTSEPTSIOON (Keskne Loogika)

**AI on pidev abistaja, mitte tööriist**

#### Suhtlusviisid:

**a) Tekstiline vestlus (põhiline)**
```
Kasutaja: "Ostsime uue raamatupidamise tarkvara"

AI: "Suurepärane! Mõned küsimused:
     1. Mis tarkvara see on?
     2. Kas see on pilves või teie serveris?
     3. Kas andmed on krüpteeritud?"

Kasutaja: "Merit Aktiva, pilves"

AI: "✓ Lisan varade registrisse.
     Kas olete Merit Aktivaga lepingu sõlminud?
     NIS2 nõuab tarnijate riskihindamist."
```

**b) Audio/voice (tulevikus)**
- Dikteerimisrežiim
- Voice-to-text
- Taustal kuulamine (valikuline)

#### AI põhiülesanded:

**1. Teadmiste kogumine**
- Kuulab kasutajat
- Esitab täpsustavaid küsimusi
- Ekstraktib fakte

**2. Analüüs ja mõju hindamine**
- Võrdleb nõuetega
- Tuvastab lüngad
- Hindab riske

**3. Dokumentide genereerimine**
- Loob mustandeid
- Täidab malle
- Järgib standardeid

**4. Muudatuste jälgimine**
- Tuvastab muutused (uued töötajad, süsteemid)
- Hindab mõju (kas dokumente tuleb uuendada?)
- Teavitab kasutajat

**5. Proaktiivne hoiatamine**
```
AI: "⚠️ Teie raamatupidamise tarkvara leping aegub 30 päeva pärast.
     Kas olete uue lepingu läbirääkimistel?
     NIS2 nõuab teenuse katkematust."
```

**6. Nõustamine**
- Vastab küsimustele
- Selgitab standardeid
- Jagab best practice'e

---

### 3. ANDMETE ELUTSÜKKEL

#### Faktide olekud:

```
┌──────────────────────────────────────┐
│  UNVERIFIED FACT                     │
│  AI tuvastis teabe                   │
│  Allikas: vestlus / integratsioon    │
│  ⏳ Vajab kinnitust                  │
└──────────────────────────────────────┘
         ↓ (kasutaja kinnitab)
┌──────────────────────────────────────┐
│  VERIFIED FACT                       │
│  Kasutaja kinnitas                   │
│  Kuupäev: 2026-01-08                 │
│  ✅ Kasutatakse dokumentides         │
└──────────────────────────────────────┘
```

#### Dokumentide olekud:

```
DRAFT
├─ AI võib muuta vabalt
├─ Kasutaja võib muuta
└─ Ei ole ametlik

PENDING APPROVAL
├─ AI tegi muudatusettepaneku
├─ Vajab kasutaja heakskiitu
└─ Nähtav, aga mitte kehtiv

APPROVED
├─ Kasutaja kinnitas
├─ AI ei muuda (ainult ettepanekud)
├─ Versioneeritud
└─ Ametlik dokument

ARCHIVED
├─ Aegunud versioon
├─ Säilitatakse auditeeritavuse jaoks
└─ Ei ole enam aktiivne
```

---

### 4. VARADE REGISTER

**Registreeritavad varad:**

**a) IT süsteemid**
- Nimi ja kirjeldus
- Tarnija
- Kriitilistsus (madal / keskmine / kõrge)
- Asukoht (pilv / oma server)
- Ligipääs (kes saab kasutada)
- Varundamine (jah/ei, sagedus)

**b) Seadmed**
- Serverid
- Arvutid ja sülearvutid
- Mobiilseadmed
- Võrguseadmed (ruuter, switch)
- IoT seadmed

**c) Pilveteenused**
- Microsoft 365, Google Workspace
- Dropbox, OneDrive
- AWS, Azure
- SaaS rakendused

**d) Tarkvara**
- Operatsioonisüsteemid
- Rakendused
- Litsentsid

**e) Andmed**
- Isikuandmed
- Ärisaladused
- Finantsteave
- Tervisandmed

#### AI roll varade halduses:

```
Kasutaja: "Meil on Google Workspace"

AI: "✓ Lisasin varade registrisse.
     Küsimused:
     1. Mitu kasutajat on?
     2. Kas kasutate 2FA (kaheastmelist autentimist)?
     3. Kas andmed on Euroopa serverites?"

→ AI genereerib riskihinnangu:
  "Google Workspace: keskmine risk
   - 2FA puudub → SOOVITUS: aktiveeri
   - Andmed USA-s → KONTROLLIDA: GDPR vastavus"
```

---

### 5. RISKIREGISTER

**Riski elemendid:**

- **Riski kirjeldus** (inimkeeles)
- **Seotud varad** (link varade registrisse)
- **Oht** (mis võib juhtuda?)
- **Haavatavus** (mis võimaldab ohtu?)
- **Mõju** (madal / keskmine / kõrge)
- **Tõenäosus** (madal / keskmine / kõrge)
- **Riski tase** = mõju × tõenäosus
- **Meetmed** (kuidas leevendada?)
- **Vastutaja**
- **Tähtaeg**
- **Olek** (avatud / töös / suletud)

**NIS2 kohustuslikud riskikategooriad:**
- Küberrünnakud
- Andmeleke
- Teenuse katkestus
- Tarneahela ohud
- Inimlikud vead
- Füüsilised ohud
- Looduskatastroofid

#### AI roll riskijuhtimises:

**1. Automaatne tuvastamine**
```
Kasutaja lisab: "Microsoft 365, 2FA puudub"

AI genereerib riski:
"Risk: Nõrk autentimine
 Oht: Kontode ülevõtmine
 Haavatavus: 2FA puudub
 Mõju: Kõrge (andmeleke)
 Tõenäosus: Keskmine
 → Riski tase: KÕRGE"
```

**2. Pidev monitooring**
```
AI: "⚠️ Uudis: Microsoft 365 turvaprobleem!
     Soovitan uuendada paroole ja aktiveerida 2FA.
     Kas alustan tegevusplaani?"
```

**3. Meede­te soovitamine**
```
AI: "Teie risk: 'Nõrk autentimine'
     Soovitan:
     1. Aktiveeri 2FA kõigile kasutajatele (€0, 1h)
     2. Kohusta tugevad paroolid (€0, 30min)
     3. Koolita töötajaid (€200, 2h)
     
     Kas koosta tegevusplaani?"
```

---

### 6. TARNIJATE REGISTER

**NIS2 nõuab tarnijate riskijuhtimist!**

**Registreeritavad tarnijad:**

**a) IT teenusepakkujad**
- Pilve­teenused (AWS, Azure, Google)
- SaaS tarnijad
- Hosting pakkujad

**b) Tarkvara arendajad**
- ERP, CRM süsteemid
- Eritellimustarkvara
- Mobiilirakendused

**c) IT tugi ja konsultandid**

**d) Riistvara tarnijad**

#### Tarnija andmed:

- Nimi, registrikood, kontaktid
- Teenuse kirjeldus
- Lepingu algus ja lõpp
- Kriitilisus
- Andmete töötlemine (jah/ei)
- Asukoht (EL / väljaspool)
- Sertifikaadid (ISO 27001, SOC2)
- Viimane audit

#### AI roll:

**1. Automaatne lisamine**
```
Kasutaja: "Kasutame Microsofti"

AI: "✓ Lisasin tarnijate registrisse:
     Microsoft (USA)
     Teenus: Microsoft 365
     Kriitilisus: Kõrge
     
     ⚠️ USA-s asuv tarnija → 
     NIS2 nõuab andmekaitselepingu (DPA)"
```

**2. Lepingute jälgimine**
```
AI: "⏰ Teie leping Google Workspace'iga lõpeb 30 päeva pärast.
     Soovitan:
     1. Alusta uuendamist
     2. Küsi uuendatud turbetingimusi
     3. Uuenda riskihinnangut"
```

**3. Turvainfon kogumine**
```
AI: "Microsoft avaldas uue turvaraportiga.
     Soovite, et lisan selle tarnija profiilile?"
```

#### Tarnija portaal (tulevikus):

Tarnijad saavad:
- Lisada oma sertifikaate
- Jagada turvateateid
- Vastata turvakü­simustikele

Tarnijad EI saa:
- Näha kliendi dokumente
- Muuta kliendi andmeid

---

### 7. DOKUMENTIDE HALDUS

**Dokumenditüübid:**

#### A) Kohustuslikud poliitikad (NIS2):
1. **Infoturbepoliitika**
   - Üldised põhimõtted
   - Kohaldamisala
   - Vastutused

2. **Riskijuhtimise poliitika**
   - Metoodika
   - Protsess
   - Roller

3. **Intsidentide haldus**
   - Tuvastamine
   - Reageerimine
   - Teatamine

4. **Varundamine ja taastamine**
   - Varundusplaanid
   - Taastamise protseduurid
   - Testimine

5. **Ligipääsukontroll**
   - Kasutajate haldus
   - Õigused
   - Autentimine

6. **Tarneahela turvalisus**
   - Tarnijate hindamine
   - Lepingulised nõuded
   - Monitooring

7. **Krüptograafia**
   - Krüptimise standardid
   - Võtmete haldus

8. **Töötajate teadlikkus**
   - Koolitusprogramm
   - Testimine

#### B) Protseduurid ja juhendid:
- Kasutaja lisamine/eemaldamine
- Parooli vahetus
- Turvaintsidendi raporteerimine
- Varundamise kontroll
- jne.

#### C) Auditidokumendid:
- Enesehindamise raport
- Välisaudiitori raport
- Tegevusplaan
- Tõendid

#### Dokumentide funktsioonid:

**1. Versioonihaldus**
```
Infoturbepoliitika
├─ v1.0 (2025-01-15) - Algversioon [Archived]
├─ v1.1 (2025-06-10) - Täiendatud riskid [Archived]
└─ v2.0 (2026-01-08) - NIS2 uuendus [Active]
```

**2. Audittrail**
```
Muudatus: Infoturbepoliitika v2.0
Kuupäev: 2026-01-08 14:23
Tegi: AI Kontseptsioon
Põhjus: "NIS2 nõuab tarneahela turvalisust"
Muudatus: "Lisatud punkt 7: Tarnijate riskihaldus"
Kinnitaja: Kati (2026-01-08 15:10)
```

**3. AI-genereeritud mustandid**
```
AI: "Koostasin teile infoturbepoliitika mustandit.
     
     📄 [Vaata dokumenti]
     
     Mustand põhineb:
     - Teie organisatsiooni profiilil
     - NIS2 nõuetel
     - Best practice'del
     
     Palun vaadake üle ja kinnitage või tehke muudatusi."
```

**4. Kinnitamine ja lukustamine**
```
Kasutaja: "Kinnita dokument"

AI: "✓ Infoturbepoliitika v2.0 on kinnitatud.
     
     Dokument on nüüd lukustatud.
     Ma teen edaspidi ainult muudatusettepanekuid,
     mida saate kinnitada või tagasi lükata."
```

**5. Muudatusettepanekud**
```
AI: "📝 Muudatusettepanek: Infoturbepoliitika
     
     Põhjus: Lisasite uue tarnija (Salesforce)
     
     Muudatus: Lisa punkt 7.3:
     'Salesforce'i andmekaitse ja turbemeetmed 
     vaadatakse üle kord kvartalis.'
     
     [Kinnita] [Keeldu] [Muuda]"
```

---

### 8. AUDITITE FUNKTSIOONID

#### A) ENESEHINDAMINE (self-assessment)

**Eesmärk:** Organisatsioon hindab ise oma vastavust

**Protsess:**

```
1. VALI STANDARD
   Kasutaja: "Tahan teha NIS2 enesehindamise"
   AI: "Alustame! See võtab umbes 30-60 minutit."

2. KÜSIMUSTIK
   AI esitab küsimusi gruppide kaupa:
   
   📋 ORGANISATSIOON (5 küsimust)
   📋 RISKIJUHTIMINE (12 küsimust)
   📋 TEHNILISED MEETMED (15 küsimust)
   📋 ORGANISATSIOONILISED MEETMED (10 küsimused)
   📋 INTSIDENTIDE HALDUS (8 küsimust)
   📋 TARNEAHEL (7 küsimust)

3. VASTAMINE
   AI: "Kas teil on kirjalik infoturbepoliitika?"
   
   Vastusevariandid:
   ○ Jah, kinnitatud ja kehtiv
   ○ Jah, aga aegunud
   ○ Töös, aga mitte kinnitatud
   ○ Ei, pole alustatud
   ○ Ei tea
   
   [Valikuline] Lisa tõend (fail/link)
   [Valikuline] Kommentaar

4. AI SELGITAB
   AI: "Miks see oluline on?
        NIS2 nõuab dokumenteeritud infoturbepoliitikat,
        mis on juhtkonna poolt kinnitatud ja töötajatele
        kommunikeeritud."

5. TULEMUSTE ANALÜÜS
   AI: "✓ Enesehindamine valmis!
        
        📊 Teie skoor: 67/100
        
        🟢 Tugevused:
        - Varundamine on hästi korraldatud
        - Töötajad on koolitatud
        
        🔴 Puudujäägid:
        - Infoturbepoliitika puudub
        - 2FA ei ole kasutusel
        - Tarnijate lepingutes puuduvad turbenõuded
        
        📋 Genereeritud dokumendid:
        - Enesehindamise raport
        - Tegevusplaan (12 ülesannet)
        
        [Vaata raportit] [Alusta tegevusplaani]"
```

#### B) VÄLISAUDIT (external audit)

**Eesmärk:** Audiitor kontrollib vastavust

**Funktsioonid:**

**1. Auditipakett**
```
AI: "Kogusin teile auditi paketti:
     
     📁 DOKUMENDID
     ├─ Infoturbepoliitika v2.0
     ├─ Riskihinnang 2026
     ├─ Tegevusplaan
     ├─ Intsidentilogid
     └─ Koolituste tõendid
     
     📁 REGISTRID
     ├─ Varade register (export Excel)
     ├─ Riskiregister (export Excel)
     └─ Tarnijate register (export Excel)
     
     📁 TÕENDID
     ├─ Lepingud
     ├─ Sertifikaadid
     └─ Logifailid
     
     [Genereeri ZIP] [Jaga audiitorile]"
```

**2. Audiitori ligipääs**
```
Kasutaja: "Anna auditorile ligipääs"

AI: "Loon audiitori konto.
     
     Email: audiitor@auditfirma.ee
     Nimi: Mari Tamm
     Ligipääs: Ainult lugemiseks
     Kehtib: 2026-01-08 kuni 2026-02-08 (30 päeva)
     
     Audiitor näeb:
     ✓ Kõiki dokumente
     ✓ Registreid
     ✓ Tegevusplaani
     
     Audiitor EI näe:
     ✗ Teie vestlusi AI-ga
     ✗ Kinnitamata mustandeid
     
     [Kinnita] [Tühista]"
```

**3. Audiitori kommentaarid**
```
Audiitor lisab leiu:

📝 LEID #1: Major
Puudub: Intsidentide vastutaja määramine
NIS2 nõue: Artikkel 21, lõige 2
Tähtaeg: 30 päeva
Soovitus: Määrake infoturbejuht või volitatud isik

→ AI: "✓ Lisasin tegevusplaani:
      Ülesanne: 'Määra intsidentide vastutaja'
      Prioriteet: Kõrge
      Tähtaeg: 2026-02-07"
```

**4. Auditilogid**
```
Audiitor vaatas:
├─ 2026-01-10 10:23 - Infoturbepoliitika v2.0
├─ 2026-01-10 10:45 - Riskihinnang 2026
├─ 2026-01-10 11:12 - Varade register
└─ 2026-01-10 14:30 - Lisas leiu #1

Audiitor EI pääsenud ligi:
├─ AI vestluse ajalugu
└─ Mustanddokumendid
```

---

### 9. TEGEVUSPLAAN (Action Plan)

**Eesmärk:** Juhib parandustegevusi

**Allikad:**
- Enesehindamise leiud
- Audiitori leiud
- AI soovitused
- Kasutaja ülesanded

**Ülesande struktuur:**

```
┌────────────────────────────────────────┐
│ ÜLESANNE #12                           │
├────────────────────────────────────────┤
│ Pealkiri: Aktiveeri 2FA Microsoft 365  │
│ Kirjeldus: NIS2 nõuab tugevat          │
│           autentimist                   │
│ Prioriteet: 🔴 Kõrge                   │
│ Olek: ⏳ Töös                          │
│ Vastutaja: IT-administraator           │
│ Tähtaeg: 2026-02-01                    │
│ Seotud risk: "Nõrk autentimine"        │
│ Seotud vara: "Microsoft 365"           │
│ Tõendid: [Lisa fail]                   │
│ Kommentaarid: [3]                      │
└────────────────────────────────────────┘
```

**AI roll tegevusplaanis:**

**1. Automaatne genereerimine**
```
Enesehindamisest tuli 8 puudujääki
→ AI genereerib 8 ülesannet

AI: "Loodud tegevusplaan:
     🔴 Kõrge prioriteet: 3 ülesannet
     🟠 Keskmine prioriteet: 4 ülesannet
     🟢 Madal prioriteet: 1 ülesanne
     
     Esimesed 3 ülesannet on kriitilised ja
     tuleb teha 30 päeva jooksul."
```

**2. Prioritiseerimine**
```
AI kasutab:
- Riski tase (kõrge risk → kõrge prioriteet)
- NIS2 nõuete kohustuslikkus
- Täitmise keerukus
- Sõltuvused

AI: "Soovitan alustada ülesandest #12 (2FA),
     sest see:
     - Vähendab kõrge riski
     - On lihtne rakendada (1-2h)
     - Ei sõltu teistest ülesannetest"
```

**3. Meeldetuletused**
```
AI: "🔔 Meeldetuletus:
     
     Ülesanne #12 tähtaeg: homme (2026-02-01)
     Olek: Töös
     
     Kas vajate abi?
     - [Näita juhiseid]
     - [Pikenda tähtaega]
     - [Märgi tehtuks]"
```

**4. Progressi jälgimine**
```
Dashboard:

📊 TEGEVUSPLAAN
├─ Tehtu: 5/12 (42%)
├─ Töös: 4/12 (33%)
├─ Ootel: 3/12 (25%)
├─ Tähtaeg ületatud: 0
└─ Keskmine läbimise aeg: 8 päeva

AI: "Suurepärane! Te olete plaaniga hästi peal.
     Kui jätkate samas tempos, olete 100% valmis
     30 päeva jooksul."
```

**5. Tõendite nõudmine**
```
Kasutaja: "Märgi ülesanne #12 tehtuks"

AI: "Suurepärane! Kas saate lisada tõendi?
     Näiteks:
     - Ekraanipilt 2FA seadetest
     - Microsoft 365 auditi logid
     - Kinnituskiri IT-administraatorilt
     
     [Lisa tõend] [Jäta vahele]"
```

---

### 10. ROLLID JA ÕIGUSED

**Kasutajarollid:**

#### 1. OWNER / ADMIN
- Täielik juurdepääs
- Saab lisada/eemaldada kasutajaid
- Kinnitab dokumente
- Näeb kõike

#### 2. SECURITY RESPONSIBLE (infoturbe vastutaja)
- Haldab riske ja varasid
- Kinnitab tegevusplaani ülesanded
- Näeb audittrail'i
- EI saa kustutada organisatsiooni

#### 3. EDITOR
- Saab muuta dokumente (drafts)
- Saab lisada varasid/riske
- EI saa kinnitada dokumente
- EI näe finantstenevaid andmeid

#### 4. VIEWER
- Ainult lugemisõigus
- Näeb kinnitatud dokumente
- Näeb registreid
- EI saa midagi muuta

#### 5. AUDITOR (ajutine)
- Näeb kõiki dokumente ja registreid
- Saab lisada leide/kommentaare
- EI näe AI vestlust
- Ligipääs on ajaliselt piiratud (nt 30 päeva)

#### 6. VENDOR / DEVELOPER (tarnija)
- Näeb ainult enda profailit
- Saab lisada sertifikaate
- Saab jagada turvateateid
- EI näe kliendi sisemist infot

**Õiguste maatriks:**

| Funktsioon | Owner | Security | Editor | Viewer | Auditor | Vendor |
|-----------|-------|----------|--------|--------|---------|--------|
| Vaata dokumente | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Muuda mustandeid | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Kinnita dokumente | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Vaata registreid | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Muuda registreid | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Vaata AI vestlust | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Lisa kasutajaid | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Vaata audit trail | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Lisa auditileide | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |

---

### 11. TEAVITUSED JA KINNITUSED

**Teavituste tüübid:**

#### 🔵 INFO
```
AI: "ℹ️ Teave:
     Microsoft avaldas uue turbeuuenduse.
     Soovitan installida see 7 päeva jooksul."
```

#### 🟡 HOIATUS
```
AI: "⚠️ Hoiatus:
     Teie varundus ebaõnnestus eilisõhtu.
     Kontrollige varundusseadeid."
```

#### 🔴 KRIITILINE
```
AI: "🚨 Kriitiline:
     Tuvastatud võimalik turvaintsident!
     12 ebaõnnestunud sisselogimist 5 minuti jooksul.
     Kas alustame intsidendi protokolli?"
```

#### ✅ KINNITAMINE VAJALIK
```
AI: "📝 Vajab kinnitamist:
     Lisasin uue riski: 'Nõrk autentimine'
     Mõju: Kõrge | Tõenäosus: Keskmine
     
     [Kinnita] [Muuda] [Keeldu]"
```

**Koondkinnitused:**
```
AI: "Teil on 5 kinnitamata muudatust:
     
     ✓ 2 uut vara
     ✓ 1 uus risk
     ✓ 2 dokumendi muudatust
     
     [Kinnita kõik] [Vaata ükshaaval]"
```

**Teavituste kanalid:**
- 🖥️ Platvormisisene (alati)
- 📧 Email (konfigureeritav)
- 📱 SMS (kriitilised, valikuline)
- 🔔 Push (mobile app, tulevikus)

---

### 12. INTEGRATSIOONID

**Eesmärk:** Automaatne andmete kogumine

#### A) PILVE TEENUSED

**Microsoft 365:**
- Kasutajate loend
- Seadmete loend
- Sisse­logimise logid
- Turvahäired
- 2FA olek

**Google Workspace:**
- Kasutajate loend
- Ligipääsuõigused
- Auditlogid
- Seadiste auditid

#### B) RAAMATUPIDAMINE

**Merit Aktiva, Directo, Netsuite:**
- Tarnijate loend (automaatselt tarnijate registrisse)
- Lepingud

#### C) TURVAMONITORINGE

**Antiviirus (Bitdefender, ESET):**
- Nakatunud failid
- Blokeeritud rünnakud

**Firewall:**
- Blokeeritud IP-d
- Kahtlased päringud

#### D) TICKETING SYSTEMS

**Jira, Trello, Asana:**
- IT-intsidentid
- Turvaülesanded

#### E) KOMMUNIKATSIOON

**Slack, Microsoft Teams:**
- Turbeteated (bot)

---

### 13. ARUANDLUS JA VISUALISEERIMINE

**Dashboard (peavaade):**

```
┌──────────────────────────────────────┐
│  NIS2 VASTAVUS                       │
│  ████████████░░░░░░░░ 67%           │
├──────────────────────────────────────┤
│  📊 ÜLEVAADE                         │
│  ✅ Dokumendid: 8/12 (67%)          │
│  ⚠️  Riskid: 12 avatud (5 kõrged)   │
│  🚀 Tegevusplaan: 5/12 tehtud       │
│  📅 Järgmine audit: 45 päeva        │
├──────────────────────────────────────┤
│  🔔 VIIMASED TEAVITUSED              │
│  ⚠️  Varundus ebaõnnestus (täna)    │
│  ℹ️  Uus Microsoft turvaupdate       │
│  ✅ 2FA aktiveeritud (eile)         │
├──────────────────────────────────────┤
│  📋 TÄNA TEHA                        │
│  □ Kinnita dokument: Infoturbe...   │
│  □ Vaata üle risk #7                │
│  □ Lõpeta ülesanne #12              │
└──────────────────────────────────────┘
```

**Riskide visualiseerimine:**

```
RISKI MAATRIKS

Mõju
  ↑
Kõrge │    [R3]         [R1][R5]
      │                 [R7]
Kesk  │    [R4]    [R2][R8]
      │    [R9]
Madal │ [R10][R11]  [R6][R12]
      │
      └────────────────────────→
        Madal  Kesk   Kõrge
                     Tõenäosus
```

**Progressi jälgimine:**

```
VASTAVUSE PROGRESSIOON

100% ┤
     │                        ╱ ← Sihtmärk
 75% ┤                    ╱
     │                ╱
 50% ┤            ╱
     │        ╱
 25% ┤    ╱
     │╱
  0% └─────────────────────────→
     Jan  Feb  Mar  Apr  Mai  Jun
```

---

### 14. LOKALISEERIMINE JA MITMEKEELSUS

**Keelte tugi:**

#### FAAS 1 (MVP):
- 🇪🇪 Eesti keel

#### FAAS 2 (6 kuud):
- 🇬🇧 Inglise keel
- 🇷🇺 Vene keel

#### FAAS 3 (1 aasta):
- 🇱🇻 Läti keel
- 🇱🇹 Leedu keel
- 🇫🇮 Soome keel
- 🇸🇪 Rootsi keel

#### FAAS 4 (2 aastat):
- 🇩🇪 Saksa keel
- 🇫🇷 Prantsuse keel
- 🇪🇸 Hispaania keel
- 🇮🇹 Itaalia keel
- 🇵🇱 Poola keel
- ... (kõik EL keeled)

**Dokumentide keel:**
- Organisatsiooni põhikeel
- Mitmekeelsed dokumendid (valikuline)
- AI tõlkimine (automaatne)

---

## 🏗️ TEHNILINE ARHITEKTUUR

### Süsteemi arhitektuur (high-level)

```
┌──────────────────────────────────────────┐
│          FRONTEND (Next.js)              │
│  ┌────────────┐  ┌──────────────────┐   │
│  │ Web App    │  │ Mobile App       │   │
│  │ (Desktop)  │  │ (tulevikus)      │   │
│  └────────────┘  └──────────────────┘   │
└──────────────────────────────────────────┘
              ↓ HTTPS/WSS
┌──────────────────────────────────────────┐
│          API LAYER (REST/GraphQL)        │
│  Authentication, Authorization, Rate     │
│  Limiting, Logging                       │
└──────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────┐
│          BACKEND SERVICES                │
│  ┌────────────────────────────────────┐ │
│  │  AI Orchestration Service          │ │
│  │  - Conversation Management         │ │
│  │  - Fact Extraction                 │ │
│  │  - Document Generation             │ │
│  └────────────────────────────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │  Document Service                  │ │
│  │  - DOCX generation                 │ │
│  │  - PDF generation                  │ │
│  │  - Version control                 │ │
│  └────────────────────────────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │  Registry Service                  │ │
│  │  - Assets, Risks, Vendors          │ │
│  │  - CRUD operations                 │ │
│  └────────────────────────────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │  Audit Service                     │ │
│  │  - Assessments                     │ │
│  │  - Action plans                    │ │
│  │  - Findings                        │ │
│  └────────────────────────────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │  Integration Service               │ │
│  │  - Microsoft 365, Google           │ │
│  │  - Webhooks                        │ │
│  └────────────────────────────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │  Notification Service              │ │
│  │  - Email, SMS, Push                │ │
│  │  - Scheduling                      │ │
│  └────────────────────────────────────┘ │
└──────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────┐
│          DATA LAYER                      │
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │PostgreSQL│  │   Redis  │  │  S3   ││
│  │ (Primary)│  │  (Cache) │  │ (Files)││
│  └──────────┘  └──────────┘  └────────┘│
└──────────────────────────────────────────┘
              ↓
┌──────────────────────────────────────────┐
│          EXTERNAL SERVICES               │
│  ┌──────────────┐  ┌──────────────────┐ │
│  │ Claude API   │  │ Stripe (Payment) │ │
│  │ (Anthropic)  │  │                  │ │
│  └──────────────┘  └──────────────────┘ │
│  ┌──────────────┐  ┌──────────────────┐ │
│  │ SendGrid     │  │ Twilio (SMS)     │ │
│  │ (Email)      │  │                  │ │
│  └──────────────┘  └──────────────────┘ │
└──────────────────────────────────────────┘
```

### Tehnoloogiavalik

#### FRONTEND:
- **Framework:** Next.js 15 (React 19)
- **UI Library:** shadcn/ui (Radix UI + Tailwind)
- **State:** Zustand / React Query
- **Forms:** React Hook Form + Zod
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts
- **Markdown:** react-markdown

#### BACKEND:
- **Runtime:** Node.js 22 LTS
- **Framework:** Next.js API Routes (serverless) VÕI Express.js
- **Database ORM:** Prisma
- **Validation:** Zod
- **Auth:** NextAuth.js / Supabase Auth

#### DATABASE:
- **Primary:** PostgreSQL 16
- **Cache:** Redis 7
- **Search:** PostgreSQL Full-Text VÕI Meilisearch
- **File Storage:** S3-compatible (AWS S3 / Cloudflare R2 / Supabase Storage)

#### AI:
- **LLM:** Claude 3.5 Sonnet / Claude 4 (Anthropic API)
- **Embeddings:** Voyage AI / OpenAI Embeddings
- **Vector DB:** Supabase pgvector / Pinecone

#### DOCUMENT GENERATION:
- **DOCX:** docxtemplater / officegen
- **PDF:** Puppeteer / PDFKit / react-pdf
- **Templates:** Handlebars / EJS

#### INTEGRATIONS:
- **Microsoft 365:** Microsoft Graph API
- **Google Workspace:** Google Workspace Admin SDK
- **Webhooks:** Svix / custom

#### INFRASTRUCTURE:
- **Hosting:** Vercel (frontend + serverless) VÕI AWS/GCP
- **Database:** Supabase VÕI AWS RDS
- **CDN:** Cloudflare
- **Monitoring:** Sentry, LogRocket
- **Analytics:** PostHog / Plausible

#### SECURITY:
- **SSL:** Let's Encrypt / Cloudflare
- **WAF:** Cloudflare
- **Secrets:** Doppler / AWS Secrets Manager
- **Encryption:** bcrypt (passwords), AES-256 (data at rest)

---

## 🤖 AI ROLLI JA VÕIMEKUSED (DETAILNE)

### AI arhitektuur

```
┌─────────────────────────────────────────┐
│      USER INTERFACE (chat)              │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│      CONVERSATION MANAGER               │
│  - Message routing                      │
│  - Context management                   │
│  - History tracking                     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│      INTENT CLASSIFIER                  │
│  Determines user intent:                │
│  - Question                             │
│  - Information update                   │
│  - Document request                     │
│  - Action trigger                       │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│      AI ORCHESTRATOR                    │
│  ┌───────────────────────────────────┐ │
│  │  PROMPT LIBRARY                   │ │
│  │  - Onboarding prompts             │ │
│  │  - Assessment prompts             │ │
│  │  - Document generation prompts    │ │
│  │  - Risk analysis prompts          │ │
│  └───────────────────────────────────┘ │
│  ┌───────────────────────────────────┐ │
│  │  RETRIEVAL (RAG)                  │ │
│  │  - NIS2 regulatory texts          │ │
│  │  - Best practices                 │ │
│  │  - Organization data              │ │
│  │  - Past conversations             │ │
│  └───────────────────────────────────┘ │
│  ┌───────────────────────────────────┐ │
│  │  FACT EXTRACTOR                   │ │
│  │  - Entities (systems, people)     │ │
│  │  - Relationships                  │ │
│  │  - Confidence scores              │ │
│  └───────────────────────────────────┘ │
│  ┌───────────────────────────────────┐ │
│  │  CHANGE DETECTOR                  │ │
│  │  - Monitors updates               │ │
│  │  - Impact analysis                │ │
│  │  - Notification trigger           │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│      CLAUDE API (Anthropic)             │
│  Model: Claude 3.5 Sonnet / Claude 4   │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│      RESPONSE PROCESSOR                 │
│  - Structured output parsing            │
│  - Validation                           │
│  - Database updates                     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│      ACTIONS                            │
│  - Update registries                    │
│  - Generate documents                   │
│  - Create tasks                         │
│  - Send notifications                   │
└─────────────────────────────────────────┘
```

### AI prompting strateegia

**System prompt (põhiline):**
```
You are NIS2 Abimees, an AI assistant helping organizations 
comply with NIS2 directive. You:

- Speak Estonian (or user's language)
- Use simple, non-technical language
- Ask one question at a time
- Extract facts and always seek user confirmation
- Never make assumptions
- Explain WHY something is important (NIS2 context)
- Generate document drafts, never final versions

Current context:
- Organization: {org_name}
- Sector: {sector}
- Previous conversation: {summary}
- Unverified facts: {facts_list}

User just said: "{user_message}"
```

**Specific prompts (näited):**

**a) Fact extraction:**
```
Extract factual information from this user message:
"{user_message}"

Return JSON:
{
  "facts": [
    {
      "type": "asset|person|vendor|process",
      "entity": "name",
      "attributes": {...},
      "confidence": 0.0-1.0
    }
  ],
  "clarification_needed": ["question1", "question2"]
}
```

**b) Risk analysis:**
```
Analyze this asset for NIS2 risks:
Asset: {asset_details}
Organization context: {org_profile}

Return JSON:
{
  "risks": [
    {
      "title": "...",
      "description": "...",
      "threat": "...",
      "vulnerability": "...",
      "impact": "low|medium|high",
      "likelihood": "low|medium|high",
      "nis2_requirement": "Article X, Section Y",
      "mitigation": ["action1", "action2"]
    }
  ]
}
```

**c) Document generation:**
```
Generate an Information Security Policy draft for:
Organization: {org_details}
Existing assets: {assets}
Identified risks: {risks}

Requirements:
- Estonian language
- Simple, readable
- NIS2 compliant
- Max 5 pages
- Include mandatory sections: ...

Return: Full document text (Markdown format)
```

### AI safety ja validering

**1. Hallutsinatsioonide vältimine:**
- Alati tsiteerida NIS2 artikleid
- Mitte kunagi väita fakte ilma allikata
- Kasutaja kinnitab kõik faktid

**2. Konfidentsiaalsus:**
- Organisatsiooni andmed ei lähe AI treeningusse
- Claude API: `anthropic-beta: no-training`

**3. Auditeeritavus:**
- Iga AI vastus logitakse
- Prompt + response säilitatakse
- Kasutaja saab vaadata AI arutluskäiku

---

## 💰 ÄRIMUDEL

### Hinnapaketid (Full)

#### 🆓 FREE (FOREVER)
```
€0 / igavesti

✅ Organisatsiooni profiil
✅ AI vestlus (20 sõnumit/kuu)
✅ NIS2 vastavuse skoor (basic)
✅ 1 enesehindamine (ainult vaata, ei salvesta)
✅ Kokkuvõte (PDF eksport)

❌ Dokumentide salvestamine
❌ Tegevusplaan
❌ Registrid
❌ Audittrail
```

#### 💼 STARTER
```
€49 / kuu (€490/aasta, -20%)

✅ Kõik FREE features
✅ Piiramatu AI vestlus
✅ Kõik dokumendid (salvesta, ekspordi, muuda)
✅ Varade register (50 vara)
✅ Riskiregister (20 riski)
✅ Tarnijate register (10 tarnijat)
✅ Tegevusplaan
✅ Enesehindamine (piiramatu)
✅ Email tugi (48h)

❌ Integratsioonid
❌ Audiitori ligipääs
❌ Mitme asukohaga

Sobib: 1-50 töötajat
```

#### 🏢 PROFESSIONAL
```
€149 / kuu (€1490/aasta, -20%)

✅ Kõik STARTER features
✅ Varade register (piiramatu)
✅ Mitme asukoha haldus (5 asukohta)
✅ Meeskonna ligipääs (10 kasutajat)
✅ Audiitori ligipääs (ajutine)
✅ Põhiintegratsioonid:
   - Microsoft 365
   - Google Workspace
✅ Advanced analytics
✅ Prioriteetne tugi (24h)
✅ Video juhendamine (30 min/kvartal)

Sobib: 50-250 töötajat
```

#### 🏗️ ENTERPRISE
```
Individuaalne pakkumine (alates €500/kuu)

✅ Kõik PROFESSIONAL features
✅ Piiramatu asukohad
✅ Piiramatu kasutajad
✅ Kõik integratsioonid
✅ API access
✅ Custom dokumentide mallid
✅ White-label (valikuline)
✅ Dedicated account manager
✅ SLA (99.9% uptime)
✅ On-premise deployment (valikuline)
✅ Custom training
✅ 24/7 tugi

Sobib: 250+ töötajat, kontsernid
```

### Alternatiivne mudel: Per-Audit

```
€149 / enesehindamine (ühekordselt)

Sisaldab:
✅ 30 päeva ligipääs platvormile
✅ AI juhendamine läbi enesehindamise
✅ Kõik dokumendid (Word, PDF)
✅ Tegevusplaan
✅ Tõendite pakk

Seejärel:
€49/kuu = hoia korras, uuenda aastas
VÕI
€149/aasta = uus enesehindamine + uuendused
```

### Tulumudelid

**1. Abonnemendid (põhiline)**
- Korduv igakuine tulu
- Ette­arvatav cash flow
- Kõrge customer lifetime value

**2. Annual plans (soodustus)**
- -20% aastamakselt
- Parem cash flow
- Madalam churn

**3. Usage-based (tulevikus)**
- Extra kasutajad: €10/kuu
- Extra asukohad: €30/kuu
- Extra AI sõnumid: €20/1000 sõnumit

**4. Professional services**
- Konsultatsioon: €150/h
- Custom integratsioon: €2000+
- Custom training: €500/päev

**5. Partner programm**
- Konsultandid: 20% komisjon
- Audiitorid: 15% komisjon
- Tarkvaraarendajad: Revenue share

### Revenue projektsoonid (5 aastat)

#### Aasta 1 (MVP + Early Adopters):
```
Kliendid:
- Q1: 10 (STARTER)
- Q2: 30 (20 STARTER, 10 PRO)
- Q3: 75 (50 STARTER, 20 PRO, 5 ENT)
- Q4: 150 (100 STARTER, 40 PRO, 10 ENT)

MRR (Monthly Recurring Revenue):
- Q1: €490
- Q2: €2,470
- Q3: €6,030
- Q4: €12,690

ARR (Annual): ~€150k
```

#### Aasta 2 (Skaleerumine Eestis):
```
Kliendid: 500 (350 STARTER, 120 PRO, 30 ENT)
MRR: €45k
ARR: €540k
```

#### Aasta 3 (Baltikum):
```
Kliendid: 1500 (900 STARTER, 450 PRO, 150 ENT)
MRR: €150k
ARR: €1.8M
```

#### Aasta 4 (Põhjamaad, Saksamaa):
```
Kliendid: 5000
MRR: €500k
ARR: €6M
```

#### Aasta 5 (Euroopa):
```
Kliendid: 15000
MRR: €1.5M
ARR: €18M
```

### Unit economics

**Customer Acquisition Cost (CAC):**
- Orgaaniline (SEO, content): €50
- Paid ads: €200
- Partner referral: €100
- Keskmine: €150

**Customer Lifetime Value (LTV):**
- STARTER: €49 × 24 kuud × 0.9 retention = €1058
- PRO: €149 × 30 kuud × 0.95 retention = €4245
- ENT: €500 × 36 kuud × 0.98 retention = €17640

**LTV/CAC ratios:**
- STARTER: 7:1 (väga hea!)
- PRO: 28:1 (suurepärane!)
- ENT: 117:1 (exceptional!)

**Payback period:**
- STARTER: 3 kuud
- PRO: 1 kuu
- ENT: <1 kuu

---

## 🗺️ ROADMAP (3-5 AASTAT)

### FAAS 1: MVP (kuud 1-6) ✅
**Eesmärk:** Esimesed 50 maksavat klienti

- Organisatsiooni profiilimine
- AI vestlus (tekst)
- NIS2 enesehindamine
- Dokumentide genereerimine (basic)
- Tegevusplaan
- Web-only, eesti keel
- FREE + STARTER pakett

**Tech stack:**
- Next.js + Supabase
- Claude API
- Vercel hosting

**Go-to-market:**
- Perearstid (pilootkliendid)
- Landing page + SEO
- LinkedIn outreach

---

### FAAS 2: Core Features (kuud 7-12)
**Eesmärk:** 200 klienti, Eesti turg

**Features:**
- Varade register (täielik)
- Riskiregister (täielik)
- Tarnijate register
- Versioonihaldus
- Audittrail
- Audiitori portaal (basic)
- Email teavitused
- Inglise + vene keel

**Paketid:**
- PROFESSIONAL (€149/kuu)

**Go-to-market:**
- Apteegid, kliinikud
- Partnerlused (IT-konsultandid)
- PR (meedia artiklid)

---

### FAAS 3: Integrations (aasta 2, Q1-Q2)
**Eesmärk:** 500 klienti, Baltikum

**Features:**
- Microsoft 365 integratsioon
- Google Workspace integratsioon
- Põhiline analytics
- Dokumentide mallid (advanced)
- Mobile app (iOS, Android)
- Läti + leedu keel

**Paketid:**
- Täiustatud PRO pakk

**Go-to-market:**
- Läti, Leedu turg
- Reseller programm
- Konverentsid

---

### FAAS 4: Scale (aasta 2, Q3-Q4)
**Eesmärk:** 1500 klienti

**Features:**
- API (avalik)
- Täiendavad integratsioonid:
  - Jira, Asana
  - Slack, Teams
  - Antiviirus platforms
- Advanced analytics + raportid
- Custom dokumentide mallid
- White-label (partner branding)
- Soome + rootsi keel

**Paketid:**
- ENTERPRISE (custom)

**Go-to-market:**
- Soome, Rootsi
- Enterprise sales team
- Partner network

---

### FAAS 5: Multi-Standard (aasta 3)
**Eesmärk:** 5000 klienti, Euroopa

**Features:**
- ISO/IEC 27001 tugi
- GDPR compliance module
- ISKE (Eesti standard)
- BSI (Saksamaa standard)
- Audio/voice AI
- Automaatne risk monitoring
- Predictive analytics
- Saksa + prantsuse keel

**Go-to-market:**
- Saksamaa, Austria, Šveits
- Suurettevõtted
- Vahetud partnerlused (KPMG, Deloitte)

---

### FAAS 6: AI Innovation (aasta 4-5)
**Eesmärk:** 15000+ klienti

**Features:**
- Täisautomaatne compliance monitoring
- AI agents (proactive)
- Blockchain-based audit trail
- Quantum-safe encryption
- AR/VR training modules
- Kõik EL keeled

**Go-to-market:**
- Kogu Euroopa
- USA, UK (post-Brexit)
- Global expansion

---

## 🏆 KONKURENTSIEELISED

### 1. AI-FIRST APPROACH
❌ **Konkurendid:** Staatiline checklist + käsitsi täitmine  
✅ **Meie:** AI juhendab, genereerib, jälgib pidevalt

### 2. LIHTSUS
❌ **Konkurendid:** Tehniline keel, keerulised vormid  
✅ **Meie:** Inimkeel, üks küsimus korraga

### 3. ELAV SÜSTEEM
❌ **Konkurendid:** Üks audit aastas, dokumendid vananevad  
✅ **Meie:** Pidev jälgimine, automaatsed uuendused

### 4. HIND
❌ **Konkurendid:** €10k-50k konsultatsiooni projekt  
✅ **Meie:** €49/kuu

### 5. SIHTRÜHM
❌ **Konkurendid:** Suurettevõtted, IT-juhid  
✅ **Meie:** Väikesed ja keskmised, mitte-IT kasutajad

### 6. NIS2 FOOKUS
❌ **Konkurendid:** Üldised ISMS tööriistad  
✅ **Meie:** Spetsiaalselt NIS2 jaoks optimeeritud

### 7. EESTI TURG
❌ **Konkurendid:** Rahvusvahelised gigandid (vähe kohalikku tuge)  
✅ **Meie:** Kohalik, eestikeelne, tundub Eesti nõudeid

### 8. PARTNER ECOSYSTEM
❌ **Konkurendid:** "Tee ise" või kallis konsultant  
✅ **Meie:** Partnerlus konsultantide ja audiitoritega

---

## ⚠️ RISKID JA VÄLJAKUTSED

### TEHNILISED RISKID

**1. AI hallutsinatsioonid**
- **Risk:** AI genereerib valesid fakte
- **Maandamine:** Kasutaja kinnitab alati, tsiteerime allikaid, audittrail

**2. Skaleeritavus**
- **Risk:** AI kulukulm kasvab liiga kiiresti
- **Maandamine:** Caching, batch processing, odavamad mudelid (Haiku) lihtsatele ülesannetele

**3. Claude API sõltuvus**
- **Risk:** Anthropic tõstab hindu või muudab teenust
- **Maandamine:** Multi-model strateegia (OpenAI backup), oma fine-tuned model tulevikus

### ÄRIRISKID

**1. Aeglane kasvu**
- **Risk:** Sihtgrupp ei aktsepteeri AI-lahendust
- **Maandamine:** Tasuta piloot, reaalse väärtuse näitamine, testimonial'id

**2. Konkurents**
- **Risk:** Suured tegijad (Microsoft, Google) lisavad NIS2 mooduli
- **Maandamine:** Kiire liikumine, lokaalne fookus, integratsioonid nendega

**3. Regulatiivne muutus**
- **Risk:** NIS2 nõuded muutuvad drastiliselt
- **Maandamine:** Paindlik arhitektuur, AI kiiresti kohandab, jälgime regulatsioone

**4. Compliance risk**
- **Risk:** Meie ise ei ole NIS2-ga vastavuses! (irony)
- **Maandamine:** Dogfooding (kasutame oma toodet), välisauditor

### FINANTSRISKID

**1. Rahapuudus**
- **Risk:** Ei jätku raha MVP-d lõpuni ehitada
- **Maandamine:** Bootstrap (€0-10k algkapital), kiire MVPni jõudmine (3 kuud), pre-sales

**2. Kõrge CAC**
- **Risk:** Kliendi hankimine liiga kallis
- **Maandamine:** Orgaaniline kasv (SEO, content), partnerprogramm, word-of-mouth

**3. Churn**
- **Risk:** Kliendid lahkuvad pärast esimest auditit
- **Maandamine:** Pidev väärtus (monitooring, uuendused), gamification, edu saavutamine

### ÕIGUSLIKUD RISKID

**1. Vastutus vigade eest**
- **Risk:** Klient saab trahvi, süüdistab meid
- **Maandamine:** Selged Terms of Service ("me oleme tööriist, mitte konsultant"), kindlustus

**2. Andmekaitse (GDPR)**
- **Risk:** Me käsitleme klientide tundlikke andmeid
- **Maandamine:** Krüpteerimine, DPA-d, Euroopa serverid, audit

**3. Intellektuaalne omand**
- **Risk:** AI genereeritud sisu võib rikkuda copyright'e
- **Maandamine:** Kasutame ainult avalikke NIS2 tekste, ei genereeri koodileedi

---

## 📊 KPId JA MÕÕDIKUD

### TOOTE KPId:

**Aktiveerimine:**
- Signup → Organisatsiooni profiil: >80%
- Profiil → Esimene vestlus AI-ga: >70%
- Esimene vestlus → Dokument genereeritud: >60%
- FREE → STARTER konversioon: >10%

**Kaasatus:**
- Aktiivsed kasutajad/nädal: >60%
- AI sõnumid/kasutaja/kuu: >50
- Dokumente genereeritud/kasutaja: >5
- Tegevusplaani completion rate: >70%

**Retentsioon:**
- 30-päeva retention: >80%
- 90-päeva retention: >70%
- Aasta retention: >60%
- STARTER → PRO upgrade: >20%

**Rahulolu:**
- NPS (Net Promoter Score): >50
- CSAT (Customer Satisfaction): >4.5/5
- Support ticket resolution: <24h

### ÄRI KPId:

**Revenue:**
- MRR growth: >15%/kuu (aasta 1)
- ARR: (vaata projektsioone)
- ARPU (Average Revenue Per User): >€80

**Kulude efektiivsus:**
- CAC: <€150
- LTV/CAC: >5:1
- Payback period: <4 kuud

**Skaleeritavus:**
- AI cost/klient/kuu: <€10
- Hosting cost/klient/kuu: <€5
- Support cost/klient/kuu: <€10
- Gross margin: >70%

---

## 🎬 LÕPPSÕNA

**NIS2 Abimees** ei ole lihtsalt tööriist - see on **elav, intelligentne partner**, mis aitab organisatsioonidel navigeerida keerulises regulatiivses keskkonnas.

### Võti edu saavutamiseks:

1. **Fookus:** Alustame väikeselt (NIS2, Eesti), aga mõtleme suurelt
2. **Kasutaja kesksus:** AI räägib inimkeelt, mitte IT žargooni
3. **Pidev väärtus:** Mitte ühekordne audit, vaid elav süsteem
4. **Skaleeritavus:** Automatiseerimine ja AI võimaldavad kiire kasvu
5. **Partnerlused:** Me ei konkuree konsultantidega, me aitame neid

### Järgmised sammud:

1. ✅ **Visioon on valmis** (see dokument)
2. 🚀 **MVP spetsifikatsioon** (järgmine dokument)
3. 💻 **Arendus algab**
4. 🎯 **Esimesed kliendid**
5. 🌍 **Euroopa vallutamine**

---

**Versioon:** 1.0  
**Kuupäev:** 8. jaanuar 2026  
**Staatus:** Living document (uueneb pidevalt)  
**Järgmine ülevaade:** Q2 2026

---

_NIS2 Abimees - AI-toega teel nõuetele vastavuseni_ 🚀
