import type { TemplateData } from '../types';

export function generateRiskTemplate(data: TemplateData): string {
  const { org, assessment, date, version } = data;

  // Calculate section scores if assessment exists
  const sectionScores = assessment
    ? calculateSectionScores(assessment.answers as Record<string, string>)
    : {};

  return `# RISKIHINNANG

**Organisatsioon:** ${org.name}
**Registrikood:** ${org.registrationCode || 'Ei ole määratud'}
**Hindamise kuupäev:** ${date}
**Versioon:** ${version}
**Koostaja:** ${org.securityOfficerName || 'Määramata'}

---

## 1. SISSEJUHATUS

### 1.1 Dokumendi eesmärk

Käesolev riskihinnang tuvastab ja analüüsib ${org.name} infotehnoloogilisi riske ning määratleb vajalikud meetmed nende maandamiseks. Riskihinnang on koostatud kooskõlas NIS2 direktiivi nõuetega.

### 1.2 Hindamise ulatus

**Organisatsiooni profiil:**
- Sektor: ${formatSector(org.sector)}
- Töötajate arv: ${org.employeeCount}
- Käive: ${formatRevenue(org.revenue)}
- NIS2 kategooria: ${org.nis2Category === 'essential' ? 'Oluline üksus' : org.nis2Category === 'important' ? 'Tähtis üksus' : 'Ei kohaldu'}

**Hinnatud süsteemid ja teenused:**
${org.itSystems.map(system => `- ${formatITSystem(system)}`).join('\n')}

### 1.3 Hindamise metoodika

Riskide hindamisel kasutatakse kvalitatiivset meetodit:
- **Mõju tõenäosus:** Väga madal (1) - Väga kõrge (5)
- **Mõju ulatus:** Väga väike (1) - Kriitiline (5)
- **Riskitase = Tõenäosus × Mõju**

**Riskitasemed:**
- 1-4: Madal risk (roheline)
- 5-9: Keskmine risk (kollane)
- 10-16: Kõrge risk (oranž)
- 17-25: Kriitiline risk (punane)

---

## 2. ORGANISATSIOONI TURVALISUSE HETKEOLUKORD

### 2.1 Üldine turvalisuse tase

${assessment ? `
**Enesehindamise üldskoor:** ${assessment.score}%

**Tugevused (skoor ≥ 80%):**
${getStrengths(sectionScores).map(s => `- ${s.name}: ${s.score}%`).join('\n') || '- Ei tuvastatud'}

**Nõrgad kohad (skoor < 60%):**
${getWeaknesses(sectionScores).map(s => `- ${s.name}: ${s.score}% - **VAJAB TÄHELEPANU**`).join('\n') || '- Ei tuvastatud'}
` : `
*Enesehindamine pole läbi viidud. Soovitame alustada NIS2 enesehindamisega.*
`}

### 2.2 Turvameetmete olemasolus

${org.securityProcedures === 'documented_approved' ? '✓ Infoturbeprotseduurid on dokumenteeritud ja kinnitatud' :
  org.securityProcedures === 'documented_not_approved' ? '⚠️ Infoturbeprotseduurid on dokumenteeritud, aga pole kinnitatud' :
  '❌ Infoturbeprotseduurid pole dokumenteeritud - **KÕRGE RISK**'}

${org.hasSecurityOfficer === 'yes_dedicated' ? '✓ Eraldi infoturbe spetsialist on määratud' :
  org.hasSecurityOfficer === 'yes_part_time' ? '⚠️ Keegi tegeleb infoturvega osaliselt' :
  '❌ Infoturbe vastutajat pole määratud - **KÕRGE RISK**'}

${org.processesPersonalData === 'yes_extensive' ? '⚠️ Töödeldakse mahukalt isikuandmeid - nõuab täiendavaid GDPR meetmeid' :
  org.processesPersonalData === 'yes_limited' ? 'ℹ️ Töödeldakse piiratud mahus isikuandmeid' :
  '✓ Isikuandmeid ei töödelda'}

---

## 3. TUVASTATUD RISKID

### 3.1 Riskide kokkuvõte (tabel)

| ID | Risk | Kategooria | Tõenäosus | Mõju | Riskitase | Prioriteet | Vastutaja |
|----|------|------------|-----------|------|-----------|------------|-----------|
| RISK-01 | Volitamata juurdepääs süsteemidele | Tehniline | ${getSectionScore(sectionScores, 'security') < 60 ? '4' : getSectionScore(sectionScores, 'security') < 80 ? '3' : '2'} | 4 | ${getSectionScore(sectionScores, 'security') < 60 ? '16' : getSectionScore(sectionScores, 'security') < 80 ? '12' : '8'} | ${getSectionScore(sectionScores, 'security') < 60 ? 'Kõrge' : getSectionScore(sectionScores, 'security') < 80 ? 'Keskmine' : 'Madal'} | CISO |
| RISK-02 | Andmete kadu või hävitamine | Tehniline | ${getSectionScore(sectionScores, 'backup') < 60 ? '4' : getSectionScore(sectionScores, 'backup') < 80 ? '3' : '2'} | 5 | ${getSectionScore(sectionScores, 'backup') < 60 ? '20' : getSectionScore(sectionScores, 'backup') < 80 ? '15' : '10'} | ${getSectionScore(sectionScores, 'backup') < 60 ? 'Kriitiline' : getSectionScore(sectionScores, 'backup') < 80 ? 'Kõrge' : 'Keskmine'} | IT juht |
| RISK-03 | Küberrünnakud (pahavara, phishing) | Tehniline | 4 | 4 | 16 | Kõrge | CISO |
| RISK-04 | Intsidentide ebapiisav käsitlemine | Tehniline | ${getSectionScore(sectionScores, 'incidents') < 60 ? '4' : getSectionScore(sectionScores, 'incidents') < 80 ? '3' : '2'} | 4 | ${getSectionScore(sectionScores, 'incidents') < 60 ? '16' : getSectionScore(sectionScores, 'incidents') < 80 ? '12' : '8'} | ${getSectionScore(sectionScores, 'incidents') < 60 ? 'Kõrge' : getSectionScore(sectionScores, 'incidents') < 80 ? 'Keskmine' : 'Madal'} | CISO |
| RISK-05 | Töötajate ebapiisav teadlikkus | Organisatsiooniline | ${getSectionScore(sectionScores, 'people') < 60 ? '4' : getSectionScore(sectionScores, 'people') < 80 ? '3' : '2'} | 3 | ${getSectionScore(sectionScores, 'people') < 60 ? '12' : getSectionScore(sectionScores, 'people') < 80 ? '9' : '6'} | Keskmine | HR juht |
| RISK-06 | Riskihalduse puudumine | Organisatsiooniline | ${getSectionScore(sectionScores, 'risk') < 60 ? '4' : getSectionScore(sectionScores, 'risk') < 80 ? '3' : '2'} | 4 | ${getSectionScore(sectionScores, 'risk') < 60 ? '16' : getSectionScore(sectionScores, 'risk') < 80 ? '12' : '8'} | ${getSectionScore(sectionScores, 'risk') < 60 ? 'Kõrge' : getSectionScore(sectionScores, 'risk') < 80 ? 'Keskmine' : 'Madal'} | Juhataja |
| RISK-07 | NIS2 nõuete mittetäitmine | Vastavus | ${assessment && assessment.score < 60 ? '4' : assessment && assessment.score < 80 ? '3' : '2'} | 5 | ${assessment && assessment.score < 60 ? '20' : assessment && assessment.score < 80 ? '15' : '10'} | ${assessment && assessment.score < 60 ? 'Kriitiline' : assessment && assessment.score < 80 ? 'Kõrge' : 'Keskmine'} | Juhataja |

**Riskitaseme skaalad:**
- Tõenäosus: 1 = Väga madal, 2 = Madal, 3 = Keskmine, 4 = Kõrge, 5 = Väga kõrge
- Mõju: 1 = Väga väike, 2 = Väike, 3 = Keskmine, 4 = Kõrge, 5 = Kriitiline
- Riskitase = Tõenäosus × Mõju
- Prioriteet: 1-4 = Madal, 5-9 = Keskmine, 10-16 = Kõrge, 17-25 = Kriitiline

---

### 3.2 Detailne riskide kirjeldus

#### 3.2.1 Tehnilised riskid

#### RISK-01: Volitamata juurdepääs süsteemidele
**Kirjeldus:** Volitamata isikud pääsevad ligi infosüsteemidele ja andmetele.

**Mõjutatud varad:**
${org.itSystems.map(system => `- ${formatITSystem(system)}`).join('\n')}

**Tõenäosus:** ${getSectionScore(sectionScores, 'security') < 60 ? 'Kõrge (4)' : getSectionScore(sectionScores, 'security') < 80 ? 'Keskmine (3)' : 'Madal (2)'}
**Mõju:** Kõrge (4)
**Riskitase:** ${getSectionScore(sectionScores, 'security') < 60 ? '**16 - KÕRGE RISK**' : getSectionScore(sectionScores, 'security') < 80 ? '12 - KESKMINE RISK' : '8 - MADAL RISK'}

**Praegused meetmed:**
${getSectionScore(sectionScores, 'security') >= 80 ? '- Tugev juurdepääsukontroll\n- Mitmefaktoriline autentimine\n- Regulaarne õiguste ülevaatus' :
  getSectionScore(sectionScores, 'security') >= 60 ? '- Osaline juurdepääsukontroll\n- Vajab täiustamist' :
  '- Ebapiisavad turvameetmed\n- **VAJAB KIIRET SEKKUMIST**'}

**Soovitused:**
- Rakendada mitmefaktoriline autentimine (MFA) kõigile kasutajatele
- Viia läbi regulaarne kasutajaõiguste audit (vähemalt 2x aastas)
- Juurutada paroolipoliitika (min 12 tähemärki, kompleksus)
- Logida kõik sisselogimise katsed
- Automaatne kontode lukustamine pärast ebaõnnestunud katseid

---

#### RISK-02: Andmete kadu või hävitamine
**Kirjeldus:** Kriitilised andmed kaovad tehnilise tõrke, inimvea või pahatahtliku tegevuse tõttu.

**Mõjutatud varad:**
- Kõik ärikriitilised andmebaasid
- Dokumendid ja failid
- Email arhiiv

**Tõenäosus:** ${getSectionScore(sectionScores, 'backup') < 60 ? 'Kõrge (4)' : getSectionScore(sectionScores, 'backup') < 80 ? 'Keskmine (3)' : 'Madal (2)'}
**Mõju:** Kriitiline (5)
**Riskitase:** ${getSectionScore(sectionScores, 'backup') < 60 ? '**20 - KRIITILINE RISK**' : getSectionScore(sectionScores, 'backup') < 80 ? '15 - KÕRGE RISK' : '10 - KESKMINE RISK'}

**Praegused meetmed:**
${getSectionScore(sectionScores, 'backup') >= 80 ? '- Automaatne igapäevane varundamine\n- Varukoopiad eraldi asukohas\n- Regulaarne taastetestid' :
  getSectionScore(sectionScores, 'backup') >= 60 ? '- Osaline varundamine\n- Vajab süstematiseerimist' :
  '- Varundamine puudub või on ebakorrapärane\n- **KRIITILINE PUUDUS**'}

**Soovitused:**
- Rakendada 3-2-1 varundusreegel (3 koopiat, 2 meediumit, 1 väljas)
- Automatiseerida igapäevane varundamine
- Testida taastamisprotsessi vähemalt kord kvartalis
- Säilitada varukoopiad vähemalt 30 päeva
- Kasutada krüpteerimist varukoopiatele

---

#### RISK-03: Küberrünnakud (pahavara, phishing, DDoS)
**Kirjeldus:** Organisatsioon satub pahavara, phishing või teenuse katkestamise rünnaku sihtmärgiks.

**Tõenäosus:** Kõrge (4)
**Mõju:** Kõrge (4)
**Riskitase:** **16 - KÕRGE RISK**

**Praegused meetmed:**
${getSectionScore(sectionScores, 'security') >= 80 ? '- Tugevad tehnilised turvameetmed\n- Töötajate teadlikkus kõrge' :
  getSectionScore(sectionScores, 'security') >= 60 ? '- Osalised turvameetmed\n- Vajab täiustamist' :
  '- Ebapiisavad turvameetmed\n- **KÕRGE HAAVATAVUS**'}

**Soovitused:**
- Kasutada professionaalset viirusetõrjet kõigil seadmetel
- Rakendada email turvafilter (anti-spam, anti-phishing)
- Viia läbi töötajate teadlikkuse koolitused (phishing simulatsioon)
- Rakendada tulemüür ja sissetungi tuvastamise süsteem (IDS)
- Regulaarsed tarkvarauuendused ja paikade paigaldus

---

#### RISK-04: Intsidentide ebapiisav käsitlemine
**Kirjeldus:** Turvaincidente ei tuvastata õigeaegselt või neile ei reageerita adekvaatselt.

**Tõenäosus:** ${getSectionScore(sectionScores, 'incidents') < 60 ? 'Kõrge (4)' : getSectionScore(sectionScores, 'incidents') < 80 ? 'Keskmine (3)' : 'Madal (2)'}
**Mõju:** Kõrge (4)
**Riskitase:** ${getSectionScore(sectionScores, 'incidents') < 60 ? '**16 - KÕRGE RISK**' : getSectionScore(sectionScores, 'incidents') < 80 ? '12 - KESKMINE RISK' : '8 - MADAL RISK'}

**Praegused meetmed:**
${getSectionScore(sectionScores, 'incidents') >= 80 ? '- Dokumenteeritud intsidentide käsitlemise plaan\n- Selge eskalatsiooni protsess\n- Kontaktid määratud' :
  getSectionScore(sectionScores, 'incidents') >= 60 ? '- Osaline plaan olemas\n- Vajab täpsustamist' :
  '- Puudub struktureeritud plaan\n- **VAJAB KIIRET TÄHELEPANU**'}

**Soovitused:**
- Koostada intsidentide käsitlemise plaan
- Määrata intsidentide käsitlemise meeskond ja rollid
- Rakendada logimine ja monitooring
- Testida reageerimisplaani simulatsiooni kaudu
- Luua ühendus ametiasutustega (RIA)

---

#### 3.2.2 Organisatoorsed riskid

#### RISK-05: Töötajate ebapiisav teadlikkus
**Kirjeldus:** Töötajad ei ole teadlikud infoturbe riskidest ja heast praktikast.

**Tõenäosus:** ${getSectionScore(sectionScores, 'people') < 60 ? 'Kõrge (4)' : getSectionScore(sectionScores, 'people') < 80 ? 'Keskmine (3)' : 'Madal (2)'}
**Mõju:** Keskmine (3)
**Riskitase:** ${getSectionScore(sectionScores, 'people') < 60 ? '12 - KESKMINE RISK' : getSectionScore(sectionScores, 'people') < 80 ? '9 - KESKMINE RISK' : '6 - MADAL RISK'}

**Soovitused:**
- Kohustuslik infoturbe koolitus kõigile töötajatele (sisseastumise järel)
- Iga-aastane täienduskoolitus
- Regulaarsed infoturbe meeldetuletused
- Phishing simulatsioonid

---

#### RISK-06: Riskihalduse puudumine
**Kirjeldus:** Riske ei hinnata ega jälgita süstemaatiliselt.

**Tõenäosus:** ${getSectionScore(sectionScores, 'risk') < 60 ? 'Kõrge (4)' : getSectionScore(sectionScores, 'risk') < 80 ? 'Keskmine (3)' : 'Madal (2)'}
**Mõju:** Kõrge (4)
**Riskitase:** ${getSectionScore(sectionScores, 'risk') < 60 ? '**16 - KÕRGE RISK**' : getSectionScore(sectionScores, 'risk') < 80 ? '12 - KESKMINE RISK' : '8 - MADAL RISK'}

**Soovitused:**
- Viia läbi regulaarne riskianalüüs (min 1x aastas)
- Dokumenteerida tuvastatud riskid ja meetmed
- Määrata riskide omanikud
- Jälgida riskide maandamise edusamme

---

#### 3.2.3 Vastavuse riskid

#### RISK-07: NIS2 nõuete mittetäitmine
**Kirjeldus:** Organisatsioon ei täida NIS2 direktiivi kohustuslikke nõudeid.

**Tõenäosus:** ${assessment && assessment.score < 60 ? 'Kõrge (4)' : assessment && assessment.score < 80 ? 'Keskmine (3)' : 'Madal (2)'}
**Mõju:** Kriitiline (5) - Trahvid kuni €10,000,000 või 2% globaalsest käibest
**Riskitase:** ${assessment && assessment.score < 60 ? '**20 - KRIITILINE RISK**' : assessment && assessment.score < 80 ? '15 - KÕRGE RISK' : '10 - KESKMINE RISK'}

**Nõuded:**
- Turvariskide haldus
- Intsidentide käsitlemine
- Tarneahela turvalisus
- Krüpteerimine
- Personali turvalisus ja koolitused
- Juurdepääsu kontrollimine

**Soovitused:**
- Viia läbi NIS2 vastavuse audit
- Koostada tegevusplaan puuduste kõrvaldamiseks
- Rakendada dokumenteeritud protseduurid
- Regulaarne järelevalve ja aruandlus

---

## 4. RISKIDE MAANDAMISE PLAAN

### 4.1 Kõrge ja kriitiline prioriteet (0-3 kuud)

${getHighPriorityRisks(sectionScores).map((risk, i) => `
**${i + 1}. ${risk.title}**
- Vastutaja: ${org.securityOfficerName || 'Määramata'}
- Tähtaeg: ${getDeadline(90)}
- Meetmed: ${risk.actions.join(', ')}
- Eeldatav kulu: ${risk.cost}
`).join('\n')}

### 4.2 Keskmine prioriteet (3-6 kuud)

${getMediumPriorityRisks(sectionScores).map((risk, i) => `
**${i + 1}. ${risk.title}**
- Vastutaja: ${org.securityOfficerName || 'Määramata'}
- Tähtaeg: ${getDeadline(180)}
- Meetmed: ${risk.actions.join(', ')}
`).join('\n')}

### 4.3 Madal prioriteet (6-12 kuud)

- Regulaarne poliitikate ülevaatus
- Töötajate täiendkoolitused
- Turvaauditite optimeerimine

---

## 5. JÄRELDUSED JA SOOVITUSED

### 5.1 Peamised järeldused

${assessment ? `
1. **Üldine turvalisuse tase: ${getSecurityLevel(assessment.score)}**
   - Enesehindamise skoor: ${assessment.score}%
   ${assessment.score < 60 ? '- **Vajab kiiret tähelepanu ja investeeringuid**' :
     assessment.score < 80 ? '- Vajab täiustamist mitmes valdkonnas' :
     '- Hea tase, jätka jälgimist'}

2. **Kriitilised puudused:**
${getWeaknesses(sectionScores).map(s => `   - ${s.name} (${s.score}%)`).join('\n')}

3. **Tugevused:**
${getStrengths(sectionScores).map(s => `   - ${s.name} (${s.score}%)`).join('\n') || '   - Ei tuvastatud märkimisväärseid tugevusi'}
` : `
1. Enesehindamine pole läbi viidud
2. Soovitame alustada NIS2 vastavuse hindamisega
`}

### 5.2 Prioriteetsed tegevused

1. ✅ **Viia läbi NIS2 enesehindamine** (kui pole tehtud)
2. ⚠️ **Rakendada juurdepääsukontroll ja MFA**
3. ⚠️ **Luua varundamise süsteem (3-2-1 reegel)**
4. ⚠️ **Koostada intsidentide käsitlemise plaan**
5. ℹ️ **Korraldada töötajate koolitused**

### 5.3 Ressursivajadus

**Hinnanguline investeering järgmiseks 12 kuuks:**
- Tehnilised turvameetmed: €5,000 - €15,000
- Koolitused ja konsultatsioonid: €2,000 - €5,000
- Tarkvara litsentsid: €3,000 - €8,000
- **KOKKU: €10,000 - €28,000**

*Märkus: Investeering sõltub organisatsiooni suurusest ja praegusest turvalisuse tasemest.*

---

## 6. RISKIHINNANGU UUENDAMINE

Käesolev riskihinnang vaadatakse üle:
- Vähemalt kord aastas
- Oluliste muudatuste korral IT süsteemides
- Pärast suuremaid turvaincidente
- Uute ohtude ilmnemisel

**Järgmine ülevaatus:** ${getNextReviewDate()}

---

## 7. KINNITAMINE

Käesolev riskihinnang on koostatud ja kinnitatud:

**Koostaja:** ${org.securityOfficerName || 'Määramata'}
**Kinnitaja:** ${org.ceoName || 'Määramata'}
**Kuupäev:** ${date}

---

*Dokument genereeritud NIS2 Abimees platvormil ${date}*
*Vastavalt NIS2 direktiivile (EL) 2022/2555 ja ISO/IEC 27005:2022 standardile*

---

**${org.name}**
${org.contactEmail || ''}
${org.contactPhone || ''}
`;
}

// Helper functions
function calculateSectionScores(answers: Record<string, string>): Record<string, number> {
  const { calculateSectionScore } = require('@/data/assessment-questions');
  const sections = ['organization', 'risk', 'security', 'incidents', 'backup', 'people'];
  const scores: Record<string, number> = {};

  sections.forEach(section => {
    scores[section] = calculateSectionScore(section, answers);
  });

  return scores;
}

function getSectionScore(scores: Record<string, number>, section: string): number {
  return scores[section] || 50;
}

function getStrengths(scores: Record<string, number>) {
  const sectionNames: Record<string, string> = {
    organization: 'Organisatsioon ja juhtimine',
    risk: 'Riskihaldus',
    security: 'Tehnilised turvameetmed',
    incidents: 'Intsidentide haldus',
    backup: 'Varundamine',
    people: 'Töötajad ja koolitused',
  };

  return Object.entries(scores)
    .filter(([_, score]) => score >= 80)
    .map(([section, score]) => ({
      name: sectionNames[section] || section,
      score,
    }));
}

function getWeaknesses(scores: Record<string, number>) {
  const sectionNames: Record<string, string> = {
    organization: 'Organisatsioon ja juhtimine',
    risk: 'Riskihaldus',
    security: 'Tehnilised turvameetmed',
    incidents: 'Intsidentide haldus',
    backup: 'Varundamine',
    people: 'Töötajad ja koolitused',
  };

  return Object.entries(scores)
    .filter(([_, score]) => score < 60)
    .map(([section, score]) => ({
      name: sectionNames[section] || section,
      score,
    }));
}

function getHighPriorityRisks(scores: Record<string, number>) {
  const risks = [];

  if (getSectionScore(scores, 'backup') < 60) {
    risks.push({
      title: 'Varundamise süsteemi rakendamine',
      actions: ['Automatiseerimine', '3-2-1 reegel', 'Taastetestid'],
      cost: '€2,000 - €5,000',
    });
  }

  if (getSectionScore(scores, 'security') < 60) {
    risks.push({
      title: 'Juurdepääsukontrolli tugevdamine',
      actions: ['MFA rakendamine', 'Paroolipoliitika', 'Õiguste audit'],
      cost: '€1,000 - €3,000',
    });
  }

  if (getSectionScore(scores, 'incidents') < 60) {
    risks.push({
      title: 'Intsidentide käsitlemise plaan',
      actions: ['Plaani koostamine', 'Meeskonna määramine', 'Simulatsioon'],
      cost: '€500 - €2,000',
    });
  }

  return risks.length > 0 ? risks : [{
    title: 'NIS2 vastavuse jätkuv tagamine',
    actions: ['Dokumentatsiooni ajakohastamine', 'Koolitused', 'Auditid'],
    cost: '€1,000 - €3,000',
  }];
}

function getMediumPriorityRisks(scores: Record<string, number>) {
  const risks = [];

  if (getSectionScore(scores, 'people') < 80) {
    risks.push({
      title: 'Töötajate koolituste programm',
      actions: ['Infoturbe koolitus', 'Phishing simulatsioon', 'Teadlikkuse tõstmine'],
    });
  }

  if (getSectionScore(scores, 'risk') < 80) {
    risks.push({
      title: 'Riskihalduse protsessi täiustamine',
      actions: ['Regulaarne riskianalüüs', 'Riskide jälgimine', 'Aruandlus'],
    });
  }

  return risks.length > 0 ? risks : [{
    title: 'Protsesside optimeerimine',
    actions: ['Dokumentatsiooni täiustamine', 'Automatiseerimine', 'KPI jälgimine'],
  }];
}

function getSecurityLevel(score: number): string {
  if (score >= 80) return 'HEA';
  if (score >= 60) return 'RAHULDAV';
  if (score >= 40) return 'NÕRK';
  return 'KRIITILINE';
}

function getDeadline(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('et-EE');
}

function getNextReviewDate(): string {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date.toLocaleDateString('et-EE');
}

function formatSector(sector: string): string {
  const labels: Record<string, string> = {
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
  return labels[sector] || sector;
}

function formatRevenue(revenue: string): string {
  if (revenue === '>10M') return 'Üle 10 miljoni euro';
  if (revenue === '<10M') return 'Alla 10 miljoni euro';
  return 'Ei tea';
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
