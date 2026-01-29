import type { TemplateData } from '../types';

export function generateIncidentTemplate(data: TemplateData): string {
  const { org, date, version } = data;

  return `# INTSIDENTIDE KÄSITLEMISE PLAAN

**Organisatsioon:** ${org.name}
**Registrikood:** ${org.registrationCode || 'Ei ole määratud'}
**Kehtivuse algus:** ${date}
**Versioon:** ${version}
**Koostaja:** ${org.securityOfficerName || 'Määramata'}

---

## 1. SISSEJUHATUS

### 1.1 Dokumendi eesmärk

Käesolev plaan kirjeldab ${org.name} (edaspidi "Organisatsioon") infoturbe intsidentide käsitlemise protsessi. Plaan on koostatud kooskõlas NIS2 direktiivi (Direktiiv (EL) 2022/2555) ja Eesti Vabariigi küberturvalisuse seaduse nõuetega.

### 1.2 Kohaldamisala

Plaan kehtib kõigile infoturbe intsidentidele, mis mõjutavad:
- IT süsteeme ja taristu
- Ärikriitilisi teenuseid
- Konfidentsiaalset või isikuandmeid
- Organisatsiooni mainet

**Hõlmatud süsteemid:**
${org.itSystems.map(system => `- ${formatITSystem(system)}`).join('\n')}

### 1.3 Mõisted

**Turvaincident** - sündmus või sündmuste ahel, mis ohustab informatsiooni või infosüsteemi konfidentsiaalsust, terviklikkust või kättesaadavust.

**Oluline incident** - NIS2 mõistes incident, mis:
- Põhjustab või võib põhjustada teenuse katkestust
- Mõjutab oluliselt teenuse osutamist
- Põhjustab lekkinud, kaotatud või muudetud andmeid
- Mõjutab oluliselt teiste organisatsioonide teenuseid

---

## 2. INTSIDENTIDE MEESKOND JA VASTUTUSED

### 2.1 Intsidentide käsitlemise juht (CISO)

**Nimi:** ${org.securityOfficerName || 'MÄÄRAMATA'}
**Email:** ${org.securityOfficerEmail || 'security@organisatsioon.ee'}
**Telefon:** ${org.securityOfficerPhone || '+372 XXXX XXXX'}
**Mobii

l:** ${org.securityOfficerPhone || '+372 XXXX XXXX'}

**Vastutab:**
- Intsidentide käsitlemise koordineerimine
- Eskalatsiooni otsuste tegemine
- Kommunikatsioon ametiasutustega
- Intsidendi dokumenteerimine
- Õppetundide analüüs

### 2.2 Juhataja/Direktor

**Nimi:** ${org.ceoName || 'MÄÄRAMATA'}
**Email:** ${org.ceoEmail || 'ceo@organisatsioon.ee'}
**Telefon:** ${org.ceoPhone || '+372 XXXX XXXX'}

**Vastutab:**
- Organisatsiooni tasandi otsuste tegemine
- Ressursside eraldamine
- Väliskommunikatsioon (meedia, kliendid)
- Õiguslike küsimuste koordineerimine

### 2.3 IT spetsialist(id)

**Vastutab:**
- Tehnilise analüüsi läbiviimine
- Süsteemide taastamine
- Logide kogumine ja analüüs
- Turvameetmete rakendamine

### 2.4 Andmekaitse vastutaja (DPO)

**Nimi:** ${org.dataProtectionOfficerName || 'MÄÄRAMATA (kui kohaldub)'}
**Email:** ${org.dataProtectionOfficerEmail || 'dpo@organisatsioon.ee'}

**Vastutab:**
- Isikuandmete lekke hindamine
- GDPR kohaste teatiste tegemine
- Andmesubjektide teavitamine

---

## 3. INTSIDENTIDE KLASSIFIKATSIOON

### 3.1 Prioriteedid

**KRIITILINE (P1)** - Kohene reageerimine
- Teenuse täielik katkestus
- Massiivaandmete lekkimine
- Käimasolev küberrünnak
- Kahjulik pahavara levik
- **Reageerimisaeg: 15 minutit**

**KÕRGE (P2)** - Kiire reageerimine
- Osaline teenuse katkestus
- Piiratud andmete lekkimine
- Kahtlane tegevus süsteemides
- **Reageerimisaeg: 1 tund**

**KESKMINE (P3)** - Tavaline reageerimine
- Kerge mõju teenustele
- Potentsiaalne turvaintsidents
- Poliitika rikkumine
- **Reageerimisaeg: 4 tundi**

**MADAL (P4)** - Plaaniline käsitlemine
- Turvahäire ilma mõjuta
- Informatiivsed sündmused
- **Reageerimisaeg: 24 tundi**

### 3.2 Intsidentide tüübid

1. **Pahavara (malware)**
   - Viirused, troojad, lunavara
   - Rootkit'id, spyware

2. **Volitamata juurdepääs**
   - Konto kompromiss
   - Sissetung süsteemi
   - Privileegide kuritarvitamine

3. **Andmete lekkimine**
   - Isikuandmete lekkimine
   - Ärisaladuste avaldumine
   - Konfidentsiaalsete dokumentide kadumine

4. **Teenuse katkestus (DoS/DDoS)**
   - Süsteemide kättesaamatus
   - Võrgu ülekoormamine

5. **Phishing ja sotsiaaltehnoloogia**
   - Pettukirjad
   - Võltitud veebilehed
   - Telefonikelmused

6. **Andmete hävitamine/muutmine**
   - Andmete volitamata muutmine
   - Andmete kustutamine

---

## 4. INTSIDENDI KÄSITLEMISE PROTSESS

### 4.1 Faas 1: TUVASTAMINE ja TEATAMINE

**4.1.1 Intsidendi tuvastamine**

Intsidente võivad tuvastada:
- Automaatsed monitooringu süsteemid
- IT personal
- Töötajad
- Kliendid
- Välised osapooled (CERT-EE, tarnijad)

**4.1.2 Esmareaktion (0-15 min)**

1. ✅ **Säilita rahu ja ära paanika**
2. ✅ **Dokumenteeri kohe:**
   - Kellaaeg
   - Sümptomid
   - Mõjutatud süsteemid
   - Esmased vaatlused

3. ✅ **Teata viivitamata:**

**KRIITILINE/KÕRGE PRIORITEET:**
- ☎️ **Helista intsidentide juhile:** ${org.securityOfficerPhone || '+372 XXXX XXXX'}
- 📧 **Email:** ${org.securityOfficerEmail || 'security@organisatsioon.ee'}

**KESKMINE/MADAL PRIORITEET:**
- 📧 **Email:** ${org.securityOfficerEmail || 'security@organisatsioon.ee'}
- 📝 **Intsidentide haldussüsteem** (kui kasutusel)

**4.1.3 Esmane hindamine (15-30 min)**

Intsidentide juht hindab:
- ✓ Intsidendi tüüp ja prioriteet
- ✓ Mõjutatud varad ja teenused
- ✓ Potentsiaalne ärimõju
- ✓ Vajadus välise abi järele
- ✓ Kas on tegemist olulise intsidendiga (NIS2)

---

### 4.2 Faas 2: OHJELDAMINE (Containment)

**4.2.1 Lühiajaline ohjeldamine**

EESMÄRK: Peatada intsidendi levik

**Võimalikud meetmed:**
- 🔌 Nakatunud süsteemi isolee rimine võrgust
- 🚫 Kompromiteeritud kontode blokeerimine
- 🔥 Tulemüüri reeglite rakendamine
- 📵 Teenuse ajutine väljalülitamine

**OLULINE:** Enne meetmete rakendamist:
- Dokumenteeri süsteemi hetkeseisund
- Koguge tõendeid (logid, mälutõmmis)
- Konsulteeri intsidentide juhiga

**4.2.2 Tõendite kogumine**

Koguda ja säilitada:
- Süsteemi logid (vähemalt 30 päeva tagasi)
- Võrguliikluse logid
- Ekraanipildid
- Failide räsid (hash)
- Mälutõmmis (RAM dump) kui võimalik

**TÄHTIS:** Ära kustuta ega muuda tõendeid!

**4.2.3 Pikaajaline ohjeldamine**

EESMÄRK: Taastada osaline teenus, kuni täielik taastamine

- Varusüsteemide käivitamine
- Ajutiste lahenduste rakendamine
- Monitooringu tihendamine

---

### 4.3 Faas 3: KÕRVALDAMINE (Eradication)

**4.3.1 Põhjuse tuvastamine**

- Pahavara analüüs
- Haavatavuste tuvastamine
- Ründe vektori määramine
- Kompromissi ulatuse hindamine

**4.3.2 Ohu kõrvaldamine**

- Pahavara eemaldamine
- Haavatavuste parandamine (patchid)
- Turvaaugu sulgemine
- Kõigi kompromiteeritud andmete tuvastamine

**4.3.3 Süsteemi puhastamine**

- Pahavara skännimine
- Turvakontrolli uuendamine
- Konfiguratsioonide läbivaatamine
- Testimine eraldi keskkonnas

---

### 4.4 Faas 4: TAASTAMINE (Recovery)

**4.4.1 Süsteemide taastamine**

- Varukoopiast taastamine (kui vajalik)
- Süsteemide järkjärguline taaskäivitamine
- Funktsionaalsuse testimine
- Monitooringu aktiveerimine

**4.4.2 Tugevdatud monitooring**

Järgnevad 30 päeva:
- Tihendatud logide jälgimine
- Anomaaliate tuvastamine
- Regulaarne skännimine
- Kasutajate käitumise jälgimine

**4.4.3 Normaalolude taastamine**

- Teenuse täismahus taastamine
- Kasutajate teavitamine
- Protsesside normaliseerimine

---

### 4.5 Faas 5: ÕPPETUNNID (Lessons Learned)

**4.5.1 Intsidendi ülevaatus (1-2 nädalat pärast)**

**Osalejad:**
- Intsidentide juht
- IT personal
- Juhtkond
- Mõjutatud osakondade esindajad

**Arutelu teemad:**
1. ✓ Mis läks hästi?
2. ✓ Mis läks halvasti?
3. ✓ Mida saame parandada?
4. ✓ Kuidas vältida tulevikus?
5. ✓ Kas plaan toimis?
6. ✓ Kas koolitused on vajalikud?

**4.5.2 Dokumenteerimine**

Koostada:
- Intsidendi aruanne
- Kahjude hinnang
- Soovitused tulevikuks
- Tegevuskava puuduste kõrvaldamiseks

**4.5.3 Protsessi täiustamine**

- Plaani uuendamine
- Turvameetmete parendamine
- Koolituste läbiviimine
- Tehnoloogia uuendamine

---

## 5. KOMMUNIKATSIOON

### 5.1 Sisekommunikatsioon

**Intsidendi ajal:**
- ✓ Info ainult "need-to-know" põhimõttel
- ✓ Regulaarsed olekuuuendused meeskonnale
- ✓ Ühtsed sõnumid - koordineerib intsidentide juht

**Pärast intsidenti:**
- ✓ Info jagamine kõigile töötajatele
- ✓ Õppetundide tutvustamine

### 5.2 Väliskommunikatsioon

**Ametiasutused (NIS2 kohustuslik):**

**Riigi Infosüsteemi Amet (RIA) / CERT-EE**
- 📧 **cert@cert.ee**
- ☎️ **+372 663 0298**
- 🌐 **https://www.ria.ee/cert-ee**

**Teatamise tähtajad:**
1. **Esialge teade: 24 tunni jooksul** (oluline incident)
   - Intsidendi tüüp
   - Mõjutatud teenused
   - Esialgsed mõjud

2. **Vahearuanne: 72 tunni jooksul**
   - Detailne analüüs
   - Rakendatud meetmed
   - Prognoositud mõjud

3. **Lõpparuanne: 1 kuu jooksul**
   - Täielik analüüs
   - Õppetunnid
   - Tulevikumeetmed

**Andmekaitseinspektsioon (isikuandmete lekkimine):**
- 📧 **info@aki.ee**
- ☎️ **+372 627 4135**
- **Tähtaeg: 72 tundi**

### 5.3 Meedia ja kliendid

**Põhimõtted:**
- Ainult volitatud isikud (juhataja/juhtkond)
- Eelnevalt kokkulepitud sõnumid
- Ausus ja läbipaistvus
- Isikuandmete kaitse

**Volitatud kõneisikud:**
- ${org.ceoName || 'Juhataja'} (üldine kommunikatsioon)
- ${org.securityOfficerName || 'IT juht'} (tehnilised detailid)

---

## 6. TÖÖRIISTAD JA RESSURSID

### 6.1 Vajalikud tööriistad

**Analüüs:**
- Logide analüüsi tööriistad
- Võrguliikluse monitooring
- Pahavara skännerid

**Kommunikatsioon:**
- Turvalist side kanal (krüpteeritud)
- Kontaktide nimekiri
- Alternatiivne side (telefon)

**Taastamine:**
- Varukoopiate süsteem
- Taastamisprotseduurid
- Testimise keskkonnad

### 6.2 Välised partnerid

**Küberturvalisuse ekspert/konsultant:**
- Määrata vajadusel
- Leping sõlmida ette

**Forensics partner:**
- Digitõendite kogumine
- Kohtuliku analüüsi vajadus

**CERT-EE:**
- Tasuta abi ja nõuanded
- 24/7 incident response

### 6.3 Juriidiline tugi

**Advokaat:**
- Konsultatsioon vastutuse osas
- Lepingulised küsimused
- GDPR/NIS2 nõuded

---

## 7. TRENN ING JA HARJUTUSED

### 7.1 Intsidentide meeskonna koolitus

**Kohustuslik:**
- Esialge koolitus (uued liikmed)
- Värskenduskoolitus (aastas 1x)
- Spetsiaalsed koolitused (rollipõhised)

**Teemad:**
- Intsidentide tuvastamine
- Tõendite kogumine
- Ohu ohjeldamine
- Kommunikatsioon stressis

### 7.2 Simulatsioonid ja harjutused

**Lauaharjutused (tabletop):**
- Sagedus: 2x aastas
- Kestus: 2-4 tundi
- Osalejad: Kogu meeskond

**Simuleeritud rünnakud:**
- Phishing testid: 4x aastas
- Penetration testing: 1x aastas
- Red team harjutused: vajadusel

### 7.3 Töötajate teadlikkus

- Intsidentide teatamise koolitus (kõik töötajad)
- Phishing äratundmise koolitus
- Regulaarsed meeldetuletused

---

## 8. INTSIDENTIDE LOGIRAAMAT

Kõik intsidendid dokumenteeritakse:

| ID | Kuupäev | Tüüp | Prioriteet | Mõju | Staatus | Vastutaja |
|----|---------|------|------------|------|---------|-----------|
| INC-001 | | | | | | |

**Iga intsidendi kohta säilitatakse:**
- Detailne kirjeldus
- Ajajoon
- Rakendatud meetmed
- Tõendid
- Õppetunnid

---

## 9. PLAANI HALDAMINE

### 9.1 Ülevaatus ja uuendamine

Plaan vaadatakse üle:
- Vähemalt kord aastas
- Pärast iga olulist intsidenti
- Organisatsiooni muudatuste korral
- Tehnoloogia muutuste korral

### 9.2 Versioonihaldus

| Versioon | Kuupäev | Muudatused | Kinnitaja |
|----------|---------|------------|-----------|
| ${version} | ${date} | Esmane versioon | ${org.ceoName || 'Määramata'} |

### 9.3 Kinnitamine

Käesolev plaan on kinnitatud ${org.ceoName || '[Juhataja nimi]'} poolt ${date}.

**Allkiri:** _________________________

**Kuupäev:** ${date}

---

## LISA 1: INTSIDENDI TEATAMISE VORM

**Intsidendi ID:** INC-_______

**1. PÕHIANDMED**
- Avastamise aeg: _______________
- Teataja nimi: _______________
- Kontakt: _______________

**2. KIRJELDUS**
- Mis juhtus?
- Millal märgati?
- Kes märkas?
- Kus see juhtus?

**3. MÕJU**
- Mõjutatud süsteemid:
- Teenuse katkestus: Jah / Ei
- Andmete lekkimine: Jah / Ei
- Hinnanguline mõju: Kriitiline / Kõrge / Keskmine / Madal

**4. ESMASED MEETMED**
- Mis meetmeid on rakendatud?
- Kas oht on ohjeldatud?

**5. PRIORITEET**
- [ ] P1 - Kriitiline
- [ ] P2 - Kõrge
- [ ] P3 - Keskmine
- [ ] P4 - Madal

---

## LISA 2: KONTAKTIDE NIMEKIRI

**SISEMISED:**

| Roll | Nimi | Telefon | Email |
|------|------|---------|-------|
| CISO | ${org.securityOfficerName || 'Määramata'} | ${org.securityOfficerPhone || ''} | ${org.securityOfficerEmail || ''} |
| CEO | ${org.ceoName || 'Määramata'} | ${org.ceoPhone || ''} | ${org.ceoEmail || ''} |
| DPO | ${org.dataProtectionOfficerName || 'Määramata'} | ${org.dataProtectionOfficerPhone || ''} | ${org.dataProtectionOfficerEmail || ''} |
| IT | | | |

**VÄLISED:**

| Organisatsioon | Kontakt | Telefon | Email |
|----------------|---------|---------|-------|
| CERT-EE | 24/7 | +372 663 0298 | cert@cert.ee |
| RIA | | +372 663 0200 | ria@ria.ee |
| Andmekaitse | | +372 627 4135 | info@aki.ee |
| Politsei | 24/7 | 112 | |

---

*Dokument genereeritud NIS2 Abimees platvormil ${date}*
*Vastavalt NIS2 direktiivile (EL) 2022/2555 ja ISO/IEC 27035:2023 standardile*

---

**${org.name}**
${org.contactEmail || ''}
${org.contactPhone || ''}
`;
}

function formatITSystem(system: string): string {
  const labels: Record<string, string> = {
    email: 'Email (Google Workspace / Microsoft 365)',
    accounting: 'Raamatupidamistarkvar',
    erp: 'ERP süsteem',
    crm: 'CRM süsteem',
    document_management: 'Dokumendihaldus',
    database: 'Andmebaasid',
    website: 'Veebileht / E-pood',
    cloud_services: 'Pilve teenused',
  };
  return labels[system] || system;
}
