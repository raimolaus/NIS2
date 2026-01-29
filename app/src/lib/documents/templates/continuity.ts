import type { TemplateData } from '../types';

export function generateContinuityTemplate(data: TemplateData): string {
  const { org, date, version } = data;

  return `# VARUNDAMISE JA TAASTAMISE PLAAN

**Organisatsioon:** ${org.name}
**Registrikood:** ${org.registrationCode || 'Ei ole määratud'}
**Kuupäev:** ${date}
**Versioon:** ${version}
**Vastutaja:** ${org.securityOfficerName || 'Määramata'}

---

## 1. SISSEJUHATUS

### 1.1 Dokumendi eesmärk

Käesolev plaan määratleb ${org.name} varundamise ja taastamise protseduurid, et tagada kriitiliste andmete ja süsteemide kättesaadavus ning kiire taastamine tõrgete korral.

### 1.2 Ulatus

Plaan hõlmab kõiki organisatsiooni IT süsteeme ja andmeid:

${org.itSystems.map(system => `- ${formatITSystem(system)}`).join('\n')}

### 1.3 Rollid ja vastutused

**IT juht / CISO:** ${org.securityOfficerName || 'Määramata'}
- Varundusprotsessi üldine juhtimine
- Taastamistestide koordineerimine
- Varukoopiate turvalisuse tagamine

**Juhataja:** ${org.ceoName || 'Määramata'}
- Ressursside eraldamise kinnitamine
- Kriitiliste äriprotsesside prioriteetide määramine

---

## 2. VARUNDAMISE STRATEEGIA

### 2.1 3-2-1 Reegel

Rakendame tööstusstandardi 3-2-1 varundusreegli:
- **3 koopiat** andmetest (1 tootmissüsteem + 2 varukoopiat)
- **2 erinevat meediumit** (nt. lokaalne disk + pilv)
- **1 koopia** väljaspool peamist asukohta (geograafiline hajutatus)

### 2.2 Varundamise skeem

| Süsteem | Varundussagedus | Tüüp | Säilitusaeg | Asukoht |
|---------|----------------|------|-------------|---------|
| Andmebaas | Igapäevane (00:00) | Täis + Inkrementaalne | 30 päeva | Lokaalne + Pilv |
| Failid | Igapäevane (01:00) | Täis + Inkrementaalne | 30 päeva | Lokaalne + Pilv |
| Konfiguratsiooni failid | Nädalane (pühapäev) | Täis | 90 päeva | Lokaalne + Pilv |
| Virtuaalmasinad | Nädalane (pühapäev) | Snapshot | 30 päeva | Lokaalne |
| Email | Päevasee | Inkrementaalne | 365 päeva | Pilv |

### 2.3 Automaatika

- Kõik varundused on **automatiseeritud**
- Varundusprotsesside monitooring ja logide kontroll
- **Automaatsed teavitused** ebaõnnestumise korral

### 2.4 Krüpteerimine

- Kõik varukoopiad **krüpteeritakse** AES-256 standardiga
- Krüpteerimisvõtmed säilitatakse turvaliselt eraldi asukohta
- Ligipääs varukoopiatele ainult autoriseeritud isikutele

---

## 3. TAASTAMISSTRATEEGIA

### 3.1 Recovery Point Objective (RPO)

**RPO** = Maksimaalne lubatud andmekadu

| Süsteem | RPO | Selgitus |
|---------|-----|-----------|
| Kriitiline andmebaas | 24 tundi | Võib kaotada kuni ühe päeva andmeid |
| Failisüsteemid | 24 tundi | Igapäevane varundamine |
| Email | 24 tundi | Pilvevarundus |
| Konfiguratsioonid | 7 päeva | Nädalane varundamine |

### 3.2 Recovery Time Objective (RTO)

**RTO** = Maksimaalne lubatud seisakuaeg

| Süsteem | RTO | Prioriteet |
|---------|-----|-----------|
| Email | 4 tundi | Kõrge |
| Andmebaas | 8 tundi | Kõrge |
| Failisüsteem | 24 tundi | Keskmine |
| Veebiserver | 24 tundi | Keskmine |

### 3.3 Taastamise protseduur

**Samm 1: Hindamine (0-30 min)**
1. Tuvastada rikke ulatus ja põhjus
2. Määrata prioriteedid (millised süsteemid esmalt taastada)
3. Teavitada meeskonda ja juhtkonda

**Samm 2: Ettevalmistus (30-60 min)**
1. Kontrollida varukoopiate terviklikkust
2. Valmistada ette taastamise keskkond
3. Välja printida taastamisjuhised (kui vajalik)

**Samm 3: Taastamine (1-8 tundi)**
1. Taastada andmed viimasest terviklikust varukopiast
2. Rakendada inkrementaalsed varukoopiad
3. Kontrollida andmete terviklikkust

**Samm 4: Testimine ja kinnitamine (1-2 tundi)**
1. Testida süsteemi funktsionaalsust
2. Kontrollida andmete õigsust
3. Kinnitada ärikriiitiliste protsesside toimimine

**Samm 5: Taaskäivitamine (30 min)**
1. Teavitada kasutajaid süsteemi kättesaadavusest
2. Monitoorida süsteemi jõudlust
3. Dokumenteerida juhtum ja õppetunnid

---

## 4. TESTIMINE JA HOOLDUS

### 4.1 Regulaarne testimine

**Varukoopiate testimine:**
- **Igakuiselt:** Juhuslike failide taastamise test
- **Kvartaalselt:** Täieliku süsteemi taastamise simulatsioon
- **Aastas:** Täiemahuline disaster recovery harjutus

### 4.2 Monitooring

**Jälgitakse:**
- Varunduste õnnestumine/ebaõnnestumine
- Varukoopiate maht ja asukoht
- Varundusprotsessi kestus
- Hoiatused ja veateated

### 4.3 Dokumentide haldamine

- Taastamisprotseduurid dokumenteeritud ja kättesaadavad
- Kontaktandmed ajakohased
- Varunduskonfiguratsiooni muudatused dokumenteeritud
- Versioonihaldusse pandud

---

## 5. KONTAKTANDMED

### 5.1 Sisemised kontaktid

**IT juht / CISO**
- Nimi: ${org.securityOfficerName || 'Määramata'}
- Email: ${org.securityOfficerEmail || 'Ei ole määratud'}
- Telefon: ${org.securityOfficerPhone || 'Ei ole määratud'}

**Juhataja**
- Nimi: ${org.ceoName || 'Määramata'}
- Email: ${org.ceoEmail || 'Ei ole määratud'}
- Telefon: ${org.ceoPhone || 'Ei ole määratud'}

### 5.2 Välised kontaktid

**IT teenusepakkuja**
- Nimi: [Määrata]
- Email: [Määrata]
- Telefon: [Määrata]
- SLA: [Määrata]

**Pilveteenuse pakkuja**
- Nimi: [Määrata]
- Tugi: [Määrata]
- Email: [Määrata]

---

## 6. LISA: KONTROLL-LEHT

### Taastamise kontroll-leht

- [ ] Tõrge tuvastatud ja hinnatud
- [ ] Meeskond teavitatud
- [ ] Juhtkond teavitatud (kui vajalik)
- [ ] Varukoopia asukoht ja versioon kinnitatud
- [ ] Varukoopia terviklikkus kontrollitud
- [ ] Taastamise keskkond valmis
- [ ] Andmed taastatud
- [ ] Süsteemi funktsionaalsus testitud
- [ ] Andmete terviklikkus kinnitatud
- [ ] Kasutajad teavitatud
- [ ] Juhtum dokumenteeritud
- [ ] Õppetunnid dokumenteeritud

---

**Dokumendi kinnitamine**

Kinnitatud:
- Kuupäev: _______________
- Nimi ja allkiri: _______________

Järgmine ülevaatus: _______________

`;
}

function formatITSystem(system: string): string {
  const systems: Record<string, string> = {
    email: 'Email süsteem',
    erp: 'ERP süsteem',
    crm: 'CRM süsteem',
    website: 'Veebileht',
    ecommerce: 'E-pood',
    patient_db: 'Patsientide andmebaas',
    financial_system: 'Raamatupidamissüsteem',
    cloud_storage: 'Pilvesalvestus',
    file_server: 'Failiserver',
    database: 'Andmebaas',
    backup_system: 'Varundussüsteem',
    other: 'Muu',
  };
  return systems[system] || system;
}
