import { CompanyData } from './storage';

export interface GenerateDocumentOptions {
  templateType: string;
  companyData: CompanyData;
  assessmentData?: any;
}

/**
 * Generates a filled document based on template type and company data
 */
export function generateDocument(options: GenerateDocumentOptions): string {
  const { templateType, companyData } = options;

  switch (templateType) {
    case 'policy':
      return generatePolicyDocument(companyData);
    case 'risk_assessment':
      return generateRiskAssessmentDocument(companyData, options.assessmentData);
    case 'incident_response':
      return generateIncidentResponseDocument(companyData);
    case 'business_continuity':
      return generateBusinessContinuityDocument(companyData);
    case 'supply_chain':
      return generateSupplyChainDocument(companyData);
    case 'training':
      return generateTrainingDocument(companyData);
    case 'data_protection':
      return generateDataProtectionDocument(companyData);
    case 'backup_recovery':
      return generateBackupRecoveryDocument(companyData);
    case 'access_control':
      return generateAccessControlDocument(companyData);
    case 'network_security':
      return generateNetworkSecurityDocument(companyData);
    default:
      return generateGenericDocument(templateType, companyData);
  }
}

function generatePolicyDocument(company: CompanyData): string {
  return `# ${company.name || '[Ettevõtte nimi]'} Infoturbepoliitika

**Dokumendi versioon:** 1.0
**Kinnitamise kuupäev:** ${new Date().toLocaleDateString('et-EE')}
**Kehtiv alates:** ${new Date().toLocaleDateString('et-EE')}
**Kinnitaja:** ${company.ceo?.name || '[Juhatuse liige]'}

---

## 1. Üldinfo

### 1.1 Dokumendi eesmärk
Käesolev infoturbepoliitika määratleb ${company.name || '[Ettevõtte nimi]'} infoturbe eesmärgid, põhimõtted ja vastutused kooskõlas NIS2 direktiiviga.

### 1.2 Organisatsiooni andmed
- **Ettevõtte nimi:** ${company.name || '[Ettevõtte nimi]'}
- **Registrikood:** ${company.regCode || '[Registrikood]'}
- **Aadress:** ${company.address || '[Aadress]'}, ${company.city || '[Linn]'}
- **Kontakt:** ${company.email || '[E-post]'}, ${company.phone || '[Telefon]'}
- **Tegevusala:** ${company.industry || '[Tegevusala]'}
- **Töötajate arv:** ${company.employeeCount || '[Töötajate arv]'}
- **NIS2 kategooria:** ${company.nis2Category === 'essential' ? 'Oluline üksus' : company.nis2Category === 'important' ? 'Tähtis üksus' : 'Ei kuulu'}

## 2. Vastutused

### 2.1 Juhtkonna vastutus
**Juhatuse liige / Tegevjuht:** ${company.ceo?.name || '[Nimi]'}
- E-post: ${company.ceo?.email || '[E-post]'}
- Telefon: ${company.ceo?.phone || '[Telefon]'}

### 2.2 Infoturbe vastutaja
**CISO (Chief Information Security Officer):** ${company.ciso?.name || '[Nimi]'}
- E-post: ${company.ciso?.email || '[E-post]'}
- Telefon: ${company.ciso?.phone || '[Telefon]'}

### 2.3 IT vastutaja
**IT juht:** ${company.itManager?.name || '[Nimi]'}
- E-post: ${company.itManager?.email || '[E-post]'}
- Telefon: ${company.itManager?.phone || '[Telefon]'}

### 2.4 Andmekaitse vastutaja
**Andmekaitsespetsialist:** ${company.dataProtectionOfficer?.name || '[Nimi]'}
- E-post: ${company.dataProtectionOfficer?.email || '[E-post]'}
- Telefon: ${company.dataProtectionOfficer?.phone || '[Telefon]'}

## 3. Kasutatavad IT süsteemid

${company.systems && company.systems.length > 0
  ? company.systems.map((system, idx) => `${idx + 1}. ${system}`).join('\n')
  : '_(IT süsteemid pole veel lisatud)_'}

## 4. Infoturbe põhimõtted

### 4.1 Konfidentsiaalsus
Kõik organisatsiooni andmed ja info tuleb kaitsta volitamata juurdepääsu eest.

### 4.2 Terviklikkus
Andmete täpsus ja täielikkus tuleb tagada kogu nende elutsükli vältel.

### 4.3 Kättesaadavus
Ärikriitilised süsteemid ja andmed peavad olema kättesaadavad vastavalt kokkulepitud teenustaseme nõuetele.

## 5. Turvameetmed

### 5.1 Juurdepääsukontroll
- Kõik kasutajad peavad omama unikaalset kasutajakontot
- Rakendatakse tugeva autentimise põhimõtet (MFA)
- Juurdepääsuõigused määratakse vastavalt ametikohustustele

### 5.2 Varundamine
- Kriitilised andmed varukoopeeritakse iga päev
- Varukoopiad testitakse regulaarselt
- Varukoopiad säilitatakse eraldatud asukohtas

### 5.3 Intsidentide haldus
- Kõik turvaingidendid dokumenteeritakse ja uuritakse
- Intsidentidest teavitatakse vastutavaid isikuid viivitamatult
- NIS2 nõuete kohaselt teatatakse olulistest intsidentidest pädevatele asutustele

## 6. Töötajate kohustused

Kõik ${company.name || '[Ettevõtte nimi]'} töötajad peavad:
- Järgima käesolevat infoturbepoliitikat
- Läbima infoturbe koolituse vähemalt kord aastas
- Teatama viivitamatult kõigist turvaintsidentidest

## 7. Poliitika ülevaatamine

Käesolevat poliitikat vaadatakse üle vähemalt kord aastas või vajaduse korral sagedamini.

**Järgmine ülevaatamise kuupäev:** ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('et-EE')}

---

**Kinnitatud:**

${company.ceo?.name || '[Juhatuse liige]'}
${company.name || '[Ettevõtte nimi]'}
Kuupäev: ${new Date().toLocaleDateString('et-EE')}
`;
}

function generateRiskAssessmentDocument(company: CompanyData, assessmentData?: any): string {
  const hasAssessment = assessmentData && assessmentData.score !== null;
  const assessmentScore = hasAssessment ? assessmentData.score : null;
  const assessmentDate = hasAssessment && assessmentData.completedAt
    ? new Date(assessmentData.completedAt).toLocaleDateString('et-EE')
    : null;

  return `# ${company.name || '[Ettevõtte nimi]'} Riskihinnang

**Dokumendi versioon:** 1.0
**Koostamise kuupäev:** ${new Date().toLocaleDateString('et-EE')}
**Vastutaja:** ${company.ciso?.name || '[CISO nimi]'}
${hasAssessment ? `**Põhineb enesehindamisel:** ${assessmentDate} (skoor: ${assessmentScore}/100)` : ''}

---

## 1. Sissejuhatus

### 1.1 Dokumendi eesmärk
Käesolev riskihinnang identifitseerib ja hindab ${company.name || '[Ettevõtte nimi]'} IT süsteemide ja andmete turvalisusega seotud riske.${hasAssessment ? '\n\nKäesolev riskihinnang on koostatud organisatsiooni enesehindamise tulemuste põhjal ja identifitseerib peamised turvalisuse parendusvaldkonnad.' : ''}

### 1.2 Organisatsiooni kontekst
- **Ettevõte:** ${company.name || '[Ettevõtte nimi]'}
- **Tegevusala:** ${company.industry || '[Tegevusala]'}
- **NIS2 kategooria:** ${company.nis2Category === 'essential' ? 'Oluline üksus' : company.nis2Category === 'important' ? 'Tähtis üksus' : 'Ei kuulu'}
- **Töötajate arv:** ${company.employeeCount || '[Töötajate arv]'}
${hasAssessment ? `- **NIS2 vastavuse skoor:** ${assessmentScore}/100 ${assessmentScore >= 75 ? '(Hea)' : assessmentScore >= 50 ? '(Rahuldav)' : '(Vajab parandamist)'}` : ''}

### 1.3 Hinnatud süsteemid

${company.systems && company.systems.length > 0
  ? company.systems.map((system, idx) => `${idx + 1}. **${system}**`).join('\n')
  : '_(IT süsteemid pole veel lisatud)_'}

## 2. Riskide hindamise metoodika

### 2.1 Tõenäosuse skaa la
1. Väga madal (1) - Harva või mitte kunagi
2. Madal (2) - Harva
3. Keskmine (3) - Aeg-ajalt
4. Kõrge (4) - Sageli
5. Väga kõrge (5) - Väga sageli

### 2.2 Mõju skaala
1. Ebaoluline (1) - Minimaalne mõju
2. Madal (2) - Väike häirimine
3. Keskmine (3) - Mõõdukas häirimine
4. Kõrge (4) - Oluline häirimine
5. Kriitiline (5) - Ärikriitiline mõju

### 2.3 Riski tase
- **Kriitiline (15-25):** Kohene tegevus vajalik
- **Kõrge (10-14):** Kiire maandamine vajalik
- **Keskmine (5-9):** Maandamine planeeritud ajaraames
- **Madal (1-4):** Jälgimine ja perioodiline ülevaatus

## 3. Tuvastatud riskid

### RISK-01: Isikuandmete leke
- **Kirjeldus:** Ebapiisavad andmekaitse meetmed võivad põhjustada isikuandmete leket
- **Tõenäosus:** 3 (Keskmine)
- **Mõju:** 5 (Kriitiline)
- **Riski tase:** 15 (Kriitiline)
- **Maandamismeetmed:**
  - Andmete krüpteerimine
  - Tugev juurdepääsukontroll
  - Regulaarne turvaaugu testimine
  - Töötajate koolitamine

### RISK-02: Phishing atakk
- **Kirjeldus:** Töötajad võivad langeda pettuse ohvriks ja jagada tundlikku infot
- **Tõenäosus:** 4 (Kõrge)
- **Mõju:** 4 (Kõrge)
- **Riski tase:** 16 (Kriitiline)
- **Maandamismeetmed:**
  - E-posti filtreerimine
  - Regulaarne teadlikkuse tõstmine
  - Simuleeritud phishing testid
  - Kaheastmeline autentimine

### RISK-03: Ebapiisav varundamine
- **Kirjeldus:** Andmete kaotus süsteemikatkestuse või rünnaku korral
- **Tõenäosus:** 2 (Madal)
- **Mõju:** 5 (Kriitiline)
- **Riski tase:** 10 (Kõrge)
- **Maandamismeetmed:**
  - Automaatsed igapäevased varukoopiad
  - 3-2-1 varundamisstrateegia
  - Regulaarne taastamise testimine
  - Välised varukoopiad

## 4. Riskide kokkuvõte

| Risk ID | Kirjeldus | Tõenäosus | Mõju | Tase | Staatus |
|---------|-----------|-----------|------|------|---------|
| RISK-01 | Isikuandmete leke | 3 | 5 | 15 | Maandamisel |
| RISK-02 | Phishing atakk | 4 | 4 | 16 | Maandamisel |
| RISK-03 | Ebapiisav varundamine | 2 | 5 | 10 | Planeeritud |

## 5. Järgmised sammud

1. Kriitiliste riskide (RISK-01, RISK-02) kohene maandamine
2. Kõrgete riskide maandamine järgmise 3 kuu jooksul
3. Riskihinnangu uuendamine iga 6 kuu tagant

---

**Koostaja:**

${company.ciso?.name || '[CISO]'}
${company.ciso?.email || '[E-post]'}
Kuupäev: ${new Date().toLocaleDateString('et-EE')}

**Kinnitaja:**

${company.ceo?.name || '[Juhatuse liige]'}
${company.name || '[Ettevõtte nimi]'}
`;
}

function generateIncidentResponseDocument(company: CompanyData): string {
  return `# ${company.name || '[Ettevõtte nimi]'} Intsidentide Haldusplaan

**Dokumendi versioon:** 1.0
**Kinnitamise kuupäev:** ${new Date().toLocaleDateString('et-EE')}
**Vastutaja:** ${company.ciso?.name || '[CISO nimi]'}

---

## 1. Üldinfo

### 1.1 Plaan i eesmärk
Käesolev dokument määratleb ${company.name || '[Ettevõtte nimi]'} intsidentide halduse protsessi vastavalt NIS2 direktiivile.

### 1.2 Rakendusala
- **Ettevõte:** ${company.name || '[Ettevõtte nimi]'}
- **Registrikood:** ${company.regCode || '[Registrikood]'}
- **Kontakt:** ${company.email || '[E-post]'}, ${company.phone || '[Telefon]'}

## 2. Intsidentide vastamise meeskond

### 2.1 Juht
**CISO:** ${company.ciso?.name || '[Nimi]'}
- E-post: ${company.ciso?.email || '[E-post]'}
- Telefon: ${company.ciso?.phone || '[Telefon]'}

### 2.2 IT Vastutaja
**IT Juht:** ${company.itManager?.name || '[Nimi]'}
- E-post: ${company.itManager?.email || '[E-post]'}
- Telefon: ${company.itManager?.phone || '[Telefon]'}

### 2.3 Juhtkond
**Tegevjuht:** ${company.ceo?.name || '[Nimi]'}
- E-post: ${company.ceo?.email || '[E-post]'}
- Telefon: ${company.ceo?.phone || '[Telefon]'}

## 3. Intsidentide klassifikatsioon

### 3.1 Tase 1 - Madal
- Minimaalne mõju äriprotsessidele
- Lahendatav IT tiimi poolt
- Teavitamine: IT juht

### 3.2 Tase 2 - Keskmine
- Mõõdukas mõju äriprotsessidele
- Nõuab koordineeritud tegutsemist
- Teavitamine: CISO, IT juht

### 3.3 Tase 3 - Kõrge
- Oluline mõju äriprotsessidele
- Võimalik andmeleke
- Teavitamine: CISO, IT juht, Tegevjuht

### 3.4 Tase 4 - Kriitiline
- Kriitiline mõju äriprotsessidele
- Andmeleke või süsteemirike
- Teavitamine: Kogu meeskond + välised asutused (RIA)

## 4. Intsidendi käsitlemise protsess

### 4.1 Tuvastamine
1. Intsident tuvastatakse (automaatne või manuaalne)
2. Esimene reageerija dokumenteerib info
3. Intsident klassifitseeritakse

### 4.2 Teavitamine
**Koheselt teavitatakse (15 min jooksul):**
- ${company.ciso?.name || '[CISO]'} (${company.ciso?.email || '[E-post]'})
- ${company.itManager?.name || '[IT Juht]'} (${company.itManager?.email || '[E-post]'})

**Kriitilistel juhtudel (30 min jooksul):**
- ${company.ceo?.name || '[Tegevjuht]'} (${company.ceo?.email || '[E-post]'})
- RIA (Riigi Infosüsteemi Amet): cert@ria.ee

### 4.3 Hindamine
- CISO hindab intsidendi tõsidust
- Määratakse vastamise meeskond
- Kehtestatakse esialgsed maandamismeetmed

### 4.4 Maandamine
1. Isoleeritakse mõjutatud süsteemid
2. Stopitakse rünnaku levimine
3. Tagatakse ärikriitiliste süsteemide töövõime

### 4.5 Taastamine
1. Süsteemid taastatakse turvalisest varukoopia st
2. Kontrollitakse süsteemide terviklikkust
3. Jälgitakse süsteeme 48h

### 4.6 Järelanalüüs
- Dokumenteeritakse õppetunnid
- Uuendatakse turvapoliitikat
- Koolitetakse töötajaid

## 5. NIS2 teavitamise nõuded

### 5.1 Varajane hoiatus (24h)
Teavitatakse RIA-d olulisest intsidendist esimese 24 tunni jooksul.

### 5.2 Intsident teatatis (72h)
Esitatakse detailne intsidendi aruanne 72 tunni jooksul.

### 5.3 Lõpparuanne (1 kuu)
Esitatakse lõplik analüüs ja maandamismeetmete raport.

## 6. Kontaktid ja ressursid

### 6.1 Sisemised kontaktid
- **CISO:** ${company.ciso?.email || '[E-post]'}, ${company.ciso?.phone || '[Telefon]'}
- **IT:** ${company.itManager?.email || '[E-post]'}, ${company.itManager?.phone || '[Telefon]'}
- **Juht:** ${company.ceo?.email || '[E-post]'}, ${company.ceo?.phone || '[Telefon]'}

### 6.2 Välised kontaktid
- **RIA CERT:** cert@ria.ee, +372 663 0229
- **Häirekeskus:** 112
- **Politsei:** 110

---

**Kinnitatud:**

${company.ceo?.name || '[Juhatuse liige]'}
${company.name || '[Ettevõtte nimi]'}
Kuupäev: ${new Date().toLocaleDateString('et-EE')}
`;
}

function generateBusinessContinuityDocument(company: CompanyData): string {
  return `# ${company.name || '[Ettevõtte nimi]'} Tegevuse Jätkuvuse Plaan

**Dokumendi versioon:** 1.0
**Kinnitamise kuupäev:** ${new Date().toLocaleDateString('et-EE')}
**Vastutaja:** ${company.ceo?.name || '[Tegevjuht]'}

---

## 1. Üldinfo

### 1.1 Plaani eesmärk
Tagada ${company.name || '[Ettevõtte nimi]'} kriitiliste äriprotsesside jätkumine kriisiolukordades.

### 1.2 Organisatsiooni andmed
- **Ettevõte:** ${company.name || '[Ettevõtte nimi]'}
- **Tegevusala:** ${company.industry || '[Tegevusala]'}
- **Töötajate arv:** ${company.employeeCount || '[Töötajate arv]'}
- **Kriitiline süsteemid:** ${company.systems?.length || 0} süsteemi

## 2. Vastutused

### 2.1 Kriisikoordinaator
**${company.ceo?.name || '[Tegevjuht]'}**
- E-post: ${company.ceo?.email || '[E-post]'}
- Telefon: ${company.ceo?.phone || '[Telefon]'}

### 2.2 IT taaste vastutaja
**${company.itManager?.name || '[IT Juht]'}**
- E-post: ${company.itManager?.email || '[E-post]'}
- Telefon: ${company.itManager?.phone || '[Telefon]'}

## 3. Kriitilised äriprotsessid

_(Tuleb täiendada organisatsioonispetsiifiliste protsessidega)_

## 4. IT süsteemid

${company.systems && company.systems.length > 0
  ? company.systems.map((system, idx) => `### ${idx + 1}. ${system}\n- **Kriitilisus:** Kõrge\n- **RTO (Recovery Time Objective):** 4 tundi\n- **RPO (Recovery Point Objective):** 1 päev\n`).join('\n')
  : '_(IT süsteemid pole veel lisatud)_'}

## 5. Kriisiside

### 5.1 Sisekommunikatsioon
- E-post: ${company.email || '[E-post]'}
- Telefon: ${company.phone || '[Telefon]'}

### 5.2 Väliskommunikatsioon
- Klientide teavitamine: ${company.email || '[E-post]'}
- Meedia kontakt: ${company.ceo?.email || '[E-post]'}

---

**Kinnitatud:** ${company.ceo?.name || '[Juhatuse liige]'}, ${new Date().toLocaleDateString('et-EE')}
`;
}

function generateSupplyChainDocument(company: CompanyData): string {
  return `# ${company.name || '[Ettevõtte nimi]'} Tarneahela Turvalisus

**Dokumendi versioon:** 1.0
**Koostaja:** ${company.ciso?.name || '[CISO]'}
**Kuupäev:** ${new Date().toLocaleDateString('et-EE')}

---

## 1. Sissejuhatus

Käesolev dokument määratleb ${company.name || '[Ettevõtte nimi]'} kolmandate osapoolte ja tarnijate turvanõuded.

## 2. Vastutaja

**CISO:** ${company.ciso?.name || '[Nimi]'}
- E-post: ${company.ciso?.email || '[E-post]'}
- Telefon: ${company.ciso?.phone || '[Telefon]'}

## 3. Tarnijate turvanuõuded

### 3.1 Juurdepääs süsteemidele
- Minimaalne vajalik juurdepääs
- Kahefaktoriline autentimine kohustuslik
- Regulaarne juurdepääsuõiguste ülevaatus

### 3.2 Lepingulised nõuded
- NDA (Non-Disclosure Agreement) kohustuslik
- Turvaauditi õigus
- Intsidentide teatamise kohustus

## 4. Monitooring

Tarnijate vastavust hinnatakse iga kvartali järel.

---

**Kinnitatud:** ${company.ceo?.name || '[Juhatuse liige]'}, ${new Date().toLocaleDateString('et-EE')}
`;
}

function generateTrainingDocument(company: CompanyData): string {
  return `# ${company.name || '[Ettevõtte nimi]'} Infoturbe Koolitusprogramm

**Dokumendi versioon:** 1.0
**Koostaja:** ${company.ciso?.name || '[CISO]'}
**Kuupäev:** ${new Date().toLocaleDateString('et-EE')}

---

## 1. Üldinfo

### 1.1 Programmi eesmärk
Tõsta ${company.name || '[Ettevõtte nimi]'} töötajate infoturbe teadlikkust ja pädevust.

### 1.2 Vastutaja
**CISO:** ${company.ciso?.name || '[Nimi]'}
- E-post: ${company.ciso?.email || '[E-post]'}
- Telefon: ${company.ciso?.phone || '[Telefon]'}

## 2. Kohustuslik koolitus

Kõik ${company.employeeCount || '[X]'} töötajat peavad läbima:
- **Põhikoolitus:** Sisseastumise juures (esimese 2 nädala jooksul)
- **Värskenduskoolitus:** Vähemalt kord aastas
- **Fookuskoolitus:** Vastavalt ametikohale

## 3. Koolituse teemad

### 3.1 Kõigile töötajatele
- Paroolide turvalisus ja kahefaktoriline autentimine
- Phishing'u äratundmine
- Turvaintsidentide teatamine
- Seadmete füüsiline turvalisus
- Kodukontorist töötamise turvalisus

### 3.2 IT töötajatele
- Süsteemide turvaline konfigureerimine
- Logide monitooring
- Varundamise parimad tavad

### 3.3 Juhtidele
- NIS2 direktiivi nõuded
- Riskihaldus
- Intsidentide käsitlemine

## 4. Koolituse läbiviimine

- **Formaat:** E-õpe + praktilised harjutused
- **Kestvus:** 2-4 tundi (vastavalt sihtrühmale)
- **Hindamine:** Test koolituse lõpus (minimaalne läbiprotsent: 80%)
- **Sertifikaat:** Väljastatakse pärast edukat läbimist

## 5. Simuleeritud phishing testid

- **Sagedus:** Kvartaalselt
- **Vastutaja:** ${company.ciso?.name || '[CISO]'}
- **Ebaõnnestumisel:** Kohustuslik täiendkoolitus

## 6. Koolituskalender ${new Date().getFullYear()}

| Kuu | Teema | Sihtrühm |
|-----|-------|----------|
| Jaanuar | Paroolide turvalisus | Kõik |
| Aprill | Phishing simulatsioon | Kõik |
| Juuli | NIS2 nõuded | Juhtkond |
| Oktoober | Aastane värskendus | Kõik |

---

**Kinnitatud:** ${company.ceo?.name || '[Juhatuse liige]'}, ${new Date().toLocaleDateString('et-EE')}
`;
}

function generateDataProtectionDocument(company: CompanyData): string {
  return `# ${company.name || '[Ettevõtte nimi]'} Andmekaitse Kord

**Dokumendi versioon:** 1.0
**Vastutaja:** ${company.dataProtectionOfficer?.name || '[Andmekaitsespetsialist]'}
**Kuupäev:** ${new Date().toLocaleDateString('et-EE')}

---

## 1. Üldinfo

### 1.1 Eesmärk
Isikuandmete töötlemine vastavalt GDPR ja NIS2 nõuetele.

### 1.2 Andmekaitse vastutaja
**${company.dataProtectionOfficer?.name || '[Nimi]'}**
- E-post: ${company.dataProtectionOfficer?.email || '[E-post]'}
- Telefon: ${company.dataProtectionOfficer?.phone || '[Telefon]'}

## 2. Andmekaitse põhimõtted

1. **Õiguslik alus** - Andmeid töödeldakse ainult seadusliku alusel
2. **Eesmärgipärasus** - Andmeid kogutakse konkreetseks eesmärgiks
3. **Minimaalsus** - Kogutakse ainult vajalikke andmeid
4. **Täpsus** - Andmed peavad olema täpsed ja ajakohased
5. **Säilitusperiood** - Andmeid säilitatakse ainult vajalikul ajal
6. **Turvalisus** - Rakendatakse sobivaid turvameetmeid

## 3. Isikuandmete liigid

${company.name || '[Ettevõtte nimi]'} töötleb järgmisi isikuandmeid:
- Kliendide kontaktandmed
- Töötajate andmed
- Partnerite andmed

## 4. Turvameetmed

- Andmete krüpteerimine (rest ja transit)
- Juurdepääsukontroll (role-based access)
- Logide säilitamine (12 kuud)
- Regulaarne auditeeriminine (kvartaalselt)

## 5. Andmesubjekti õigused

Andmesubjektidel on õigus:
1. Juurdepääseda oma andmetele
2. Nõuda andmete parandamist
3. Nõuda andmete kustutamist
4. Esitada kaebus Andmekaitse Inspektsioonile

**Taotluste esitamine:** ${company.dataProtectionOfficer?.email || company.email || '[E-post]'}

## 6. Andmelekked

Andmelekke korral:
1. Teavitada Andmekaitse vastutajat koheselt
2. Dokumenteerida intsident
3. Teavitada Andmekaitse Inspektsiooni (72h jooksul)
4. Teavitada mõjutatud isikuid (kui kõrge risk)

---

**Kinnitatud:** ${company.ceo?.name || '[Juhatuse liige]'}, ${new Date().toLocaleDateString('et-EE')}
`;
}

function generateBackupRecoveryDocument(company: CompanyData): string {
  return `# ${company.name || '[Ettevõtte nimi]'} Varundamise ja Taastamise Plaan

**Dokumendi versioon:** 1.0
**Vastutaja:** ${company.itManager?.name || '[IT Juht]'}
**Kuupäev:** ${new Date().toLocaleDateString('et-EE')}

---

## 1. Üldinfo

### 1.1 Plaani eesmärk
Tagada ${company.name || '[Ettevõtte nimi]'} andmete kiire taastamine andmekaotuse korral.

### 1.2 Vastutaja
**IT Juht:** ${company.itManager?.name || '[Nimi]'}
- E-post: ${company.itManager?.email || '[E-post]'}
- Telefon: ${company.itManager?.phone || '[Telefon]'}

## 2. Varundatavad süsteemid

${company.systems && company.systems.length > 0
  ? company.systems.map((system, idx) => `### ${idx + 1}. ${system}\n- **Varundamise sagedus:** Igapäevaselt (kell 02:00)\n- **Säilitusperiood:** 30 päeva\n- **Asukoht:** Pilve + lokaalne koopia\n`).join('\n')
  : '_(IT süsteemid pole veel lisatud)_'}

## 3. Varundamise strateegia

### 3.1 3-2-1 reegel
- **3** koopiat andmetest
- **2** erinevat meediat
- **1** väljas asukohast

### 3.2 Varundamise tüübid
- **Täisvarukoopia:** Igal pühapäeval
- **Inkrementaalne:** Esmaspäev-laupäev
- **Reaalajas:** Kriitilised andmebaasid

## 4. Taastamise protseduur

### 4.1 Taastamise sammud
1. Tuvasta andmekaotuse ulatus
2. Teavita IT juhti: ${company.itManager?.email || '[E-post]'}
3. Vali sobiv varukoopia
4. Alusta taastamist
5. Kontrolli andmete terviklikkust
6. Dokumenteeri protsess

### 4.2 Taastamise eesmärgid
- **RTO (Recovery Time Objective):** 4 tundi
- **RPO (Recovery Point Objective):** 24 tundi

## 5. Testimine

Varukoopiate taastamist testitakse:
- **Igakuiselt:** Juhuslik faili taastamine
- **Kvartalipõhiselt:** Täisvarukoopia taastamine
- **Aastas:** Täielik disaster recovery harjutus

**Viimane test:** _(kuupäev)_
**Järgmine test:** ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('et-EE')}

---

**Kinnitatud:** ${company.ceo?.name || '[Juhatuse liige]'}, ${new Date().toLocaleDateString('et-EE')}
`;
}

function generateAccessControlDocument(company: CompanyData): string {
  return `# ${company.name || '[Ettevõtte nimi]'} Ligipääsukontrolli Poliitika

**Dokumendi versioon:** 1.0
**Vastutaja:** ${company.ciso?.name || '[CISO]'}
**Kuupäev:** ${new Date().toLocaleDateString('et-EE')}

---

## 1. Üldinfo

### 1.1 Poliitika eesmärk
Tagada ligipääs ${company.name || '[Ettevõtte nimi]'} IT süsteemidele ainult volitatud isikutele.

### 1.2 Vastutaja
**CISO:** ${company.ciso?.name || '[Nimi]'}
- E-post: ${company.ciso?.email || '[E-post]'}
- Telefon: ${company.ciso?.phone || '[Telefon]'}

## 2. Ligipääsukontrolli põhimõtted

### 2.1 Vähimate privileegide põhimõte
Kasutajad saavad ainult neid õigusi, mis on vajalikud nende tööülesannete täitmiseks.

### 2.2 Kohustuste eraldamine
Kriitilised toimingud nõuavad mitme isiku osalemist.

### 2.3 Kasutajakontode haldus
- Unikaalsed kasutajakontod kõigile töötajatele
- Ühtegi jagatud kontot
- Regulaarne ülevaatus (kvartaalselt)

## 3. Autentimise nõuded

### 3.1 Paroolide nõuded
- Minimaalne pikkus: 12 tähemärki
- Keerukus: suurtähed, väiketähed, numbrid, erimärgid
- Vahetusmise sagedus: iga 90 päeva
- Keelatud: eelnevalt kasutatud 5 parooli

### 3.2 Kaheastmeline autentimine (MFA)
Kohustuslik järgmistele süsteemidele:
${company.systems && company.systems.length > 0
  ? company.systems.map(system => `- ${system}`).join('\n')
  : '_(IT süsteemid pole veel lisatud)_'}

## 4. Rollipõhine juurdepääs

### 4.1 Rollid ja õigused
- **Administraatorid:** Täielik juurdepääs (${company.itManager?.name || '[IT Juht]'})
- **Kasutajad:** Piiratud juurdepääs töökeskkonnale
- **Külalised:** Ajutine juurdepääs (maksimaalselt 7 päeva)

### 4.2 Õiguste andmine
Uued õigused nõuavad:
1. Juhi heakskiitu
2. IT juhi kinnitust
3. Dokumenteerimist

## 5. Monitooring

- Kõik sisselogimised logitakse
- Epainipäraseid toiminguid jälgitakse 24/7
- Logide säilitamine: 12 kuud

## 6. Õiguste tühistamine

Töötaja lahkumisel:
1. Õigused kustutatakse viivitamatult
2. Seadmed tagastatakse
3. Juurdepääsud auditeeritakse

---

**Kinnitatud:** ${company.ceo?.name || '[Juhatuse liige]'}, ${new Date().toLocaleDateString('et-EE')}
`;
}

function generateNetworkSecurityDocument(company: CompanyData): string {
  return `# ${company.name || '[Ettevõtte nimi]'} Võrguturvalisuse Plaan

**Dokumendi versioon:** 1.0
**Vastutaja:** ${company.itManager?.name || '[IT Juht]'}
**Kuupäev:** ${new Date().toLocaleDateString('et-EE')}

---

## 1. Üldinfo

### 1.1 Plaani eesmärk
Kaitsta ${company.name || '[Ettevõtte nimi]'} võrguinfrastruktuuri küberrünnakute eest.

### 1.2 Vastutaja
**IT Juht:** ${company.itManager?.name || '[Nimi]'}
- E-post: ${company.itManager?.email || '[E-post]'}
- Telefon: ${company.itManager?.phone || '[Telefon]'}

## 2. Võrguarhitektuur

### 2.1 Segmenteerimine
- **DMZ (Demilitarized Zone):** Avalikud teenused
- **Sisevõrk:** Töötajate tööjaamad
- **Andmekeskus:** Kriitilised süsteemid ja andmebaasid

### 2.2 Kaitstud süsteemid
${company.systems && company.systems.length > 0
  ? company.systems.map(system => `- ${system}`).join('\n')
  : '_(IT süsteemid pole veel lisatud)_'}

## 3. Turvameetmed

### 3.1 Tulemüür
- **Tüüp:** Next-generation firewall (NGFW)
- **Reeglid:** Üle vaadatud igakuiselt
- **Logi:** Kõik ühendused logitakse

### 3.2 Sissetungimise tuvastamine (IDS/IPS)
- 24/7 monitooring
- Automaatne blokeerimine kahtlaste IP-de puhul
- Hoiatused: ${company.ciso?.email || '[CISO e-post]'}

### 3.3 VPN (Virtual Private Network)
- Kohustuslik kaugtööks
- Kahefaktoriline autentimine
- Split tunneling keelatud

## 4. WiFi turvalisus

- **Krüpteerimine:** WPA3
- **Külaliste võrk:** Eraldatud, piiratud juurdepääs
- **Töötajate võrk:** 802.1X autentimine

## 5. Turvaaudid

- **Sagedus:** Kord kvartalis
- **Skannerimine:** Vähemalt kord kuus
- **Penetratsioonitest:** Aastas kaks korda

**Järgmine audit:** ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('et-EE')}

---

**Kinnitatud:** ${company.ceo?.name || '[Juhatuse liige]'}, ${new Date().toLocaleDateString('et-EE')}
`;
}

function generateGenericDocument(templateType: string, company: CompanyData): string {
  return `# ${company.name || '[Ettevõtte nimi]'} - ${templateType}

**Dokumendi versioon:** 1.0
**Kuupäev:** ${new Date().toLocaleDateString('et-EE')}

---

## 1. Üldinfo

Käesolev dokument on genereeritud ${company.name || '[Ettevõtte nimi]'} jaoks.

### Organisatsiooni kontaktid
- **Ettevõte:** ${company.name || '[Ettevõtte nimi]'}
- **Registrikood:** ${company.regCode || '[Registrikood]'}
- **Aadress:** ${company.address || '[Aadress]'}, ${company.city || '[Linn]'}
- **E-post:** ${company.email || '[E-post]'}
- **Telefon:** ${company.phone || '[Telefon]'}

### Vastutavad isikud
- **Tegevjuht:** ${company.ceo?.name || '[Nimi]'} (${company.ceo?.email || '[E-post]'})
- **CISO:** ${company.ciso?.name || '[Nimi]'} (${company.ciso?.email || '[E-post]'})
- **IT Juht:** ${company.itManager?.name || '[Nimi]'} (${company.itManager?.email || '[E-post]'})

---

_(Palun täiendage sisu vastavalt organisatsiooni vajadustele)_

**Kinnitatud:** ${company.ceo?.name || '[Juhatuse liige]'}, ${new Date().toLocaleDateString('et-EE')}
`;
}
