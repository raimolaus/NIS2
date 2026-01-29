import type { TemplateData } from '../types';

export function generatePolicyTemplate(data: TemplateData): string {
  const { org, date, version } = data;

  return `# INFOTURBEPOLIITIKA

**Organisatsioon:** ${org.name}
**Registrikood:** ${org.registrationCode || 'Ei ole määratud'}
**Aadress:** ${org.address ? `${org.address}, ${org.city || ''} ${org.postalCode || ''}` : 'Ei ole määratud'}
**Kehtivuse algus:** ${date}
**Versioon:** ${version}
**Kinnitaja:** ${org.ceoName || 'Määramata'}

---

## 1. SISSEJUHATUS

### 1.1 Dokumendi eesmärk

Käesolev infoturbepoliitika määratleb ${org.name} (edaspidi "Organisatsioon") infoturbe põhimõtted, eesmärgid ja nõuded. Dokument on koostatud kooskõlas NIS2 direktiivi (Direktiiv (EL) 2022/2555) nõuetega ning Eesti Vabariigi küberturvalisuse seadusega.

### 1.2 Kohaldamisala

See poliitika kehtib:
- Kõigile Organisatsiooni töötajatele (hinnanguliselt ${org.employeeCount} inimest)
- Lepingulistele töötajatele ja konsultantidele
- Kolmandatele osapooltele, kellel on juurdepääs Organisatsiooni infosüsteemidele

Poliitika hõlmab kõiki Organisatsiooni infosüsteeme, sh:
${org.itSystems.map(system => `- ${formatITSystem(system)}`).join('\n')}

### 1.3 Seotud dokumendid

- Riskihinnang
- Intsidentide käsitlemise plaan
- Juurdepääsukontrolli protseduurid
- Varundamise ja taastamise plaan

---

## 2. ORGANISATSIOONI STRUKTUUR JA VASTUTUSED

### 2.1 Juhtkonna vastutus

**Juhataja/Direktor:** ${org.ceoName || 'Määramata'}
**Email:** ${org.ceoEmail || 'Määramata'}
**Telefon:** ${org.ceoPhone || 'Määramata'}

Juhtkond vastutab:
- Infoturbepoliitika kinnitamise ja ülevaatamise eest
- Ressursside eraldamise infoturbe tagamiseks
- Infoturbe nõuete järgimise eest organisatsioonis

### 2.2 Infoturbe vastutaja (CISO)

**Nimi:** ${org.securityOfficerName || 'Määramata'}
**Email:** ${org.securityOfficerEmail || 'Määramata'}
**Telefon:** ${org.securityOfficerPhone || 'Määramata'}

Infoturbe vastutaja ülesanded:
- Infoturbepoliitika rakendamise koordineerimine
- Turvariskide hindamine ja jälgimine
- Turvaintsidentide juhtimine
- Töötajate infoturbe koolituste korraldamine
- Regulaarne raporteerimine juhatusele

### 2.3 Andmekaitse vastutaja (DPO)

**Nimi:** ${org.dataProtectionOfficerName || 'Määramata'}
**Email:** ${org.dataProtectionOfficerEmail || 'Määramata'}
**Telefon:** ${org.dataProtectionOfficerPhone || 'Määramata'}

Vastutab isikuandmete töötlemise seaduslikkuse eest kooskõlas GDPR nõuetega.

---

## 3. INFOTURBE PÕHIMÕTTED

### 3.1 Konfidentsiaalsus

Organisatsioon tagab, et informatsioonile on juurdepääs ainult volitatud isikutel.

**Meetmed:**
- Kasutajate autentimine ja autoriseerimine
- Juurdepääsuõiguste haldus
- Andmete krüpteerimine edastamisel ja salvestamisel
- Konfidentsiaalsusleping töötajatega

### 3.2 Terviklikkus

Organisatsioon kaitseb informatsiooni volitamata muutmise eest.

**Meetmed:**
- Muudatuste logimine ja jälgimine
- Versioonihaldus
- Andmete valideerimine
- Digitaalallkirjad olulistel dokumentidel

### 3.3 Kättesaadavus

Organisatsioon tagab, et volitatud kasutajatel on vajadusel juurdepääs informatsioonile.

**Meetmed:**
- Süsteemide monitoorimine ja hooldus
- Varundamine
- Taastamisprotseduurid
- Koondamine ja tõrkekindlus

---

## 4. RISKIHALDUS

### 4.1 Riskianalüüs

Organisatsioon viib läbi regulaarse riskianalüüsi vähemalt kord aastas või:
- Oluliste muudatuste korral IT süsteemides
- Pärast turvaintsidenti
- Uute teenuste või süsteemide kasutuselevõtmisel

### 4.2 Riskide käsitlemine

Tuvastatud riskidele rakendatakse ühte järgmistest strateegiatest:
- **Vältimine** - riskiallikas eemaldatakse
- **Vähendamine** - rakendatakse turvameetmeid
- **Ülekandmine** - risk kantakse üle (nt kindlustus)
- **Aktsepteerimine** - risk aktsepteeritakse teadlikult

---

## 5. JUURDEPÄÄSUKONTROLL

### 5.1 Kasutajakontode haldus

- Igal kasutajal on unikaalne kasutajakonto
- Kasutajakontod luuakse ainult heakskiidetud taotluse alusel
- Mittekasutatavad kontod deaktiveeritakse 30 päeva jooksul
- Lahkunud töötajate kontod kustutatakse viivitamata

### 5.2 Paroolide nõuded

- Minimaalne pikkus: 12 tähemärki
- Sisaldab suurtähti, väiketähti, numbreid ja erisümboleid
- Paroole ei tohi jagada ega üles kirjutada
- Parooli muutmine iga 90 päeva tagant või pärast võimalikku kompromissi

### 5.3 Mitmefaktoriline autentimine (MFA)

Mitmefaktoriline autentimine on kohustuslik:
- Kõigile administraatoritele
- Kaugtöö puhul
- Juurdepääsuks kriitiliste süsteemide

---

## 6. INTSIDENTIDE HALDUS

### 6.1 Intsidendi teatamine

Kõik töötajad peavad viivitamata teatama kahtlastest juhtumistest:
- **Email:** ${org.securityOfficerEmail || 'security@organisatsioon.ee'}
- **Telefon:** ${org.securityOfficerPhone || '+372 XXXX XXXX'}

### 6.2 Intsidendi käsitlemine

Turvaintsidentide käsitlemine toimub vastavalt "Intsidentide käsitlemise plaanile".

**Reageerimise aeg:**
- Kriitilised intsidendid: alla 1 tunni
- Kõrge prioriteediga: 4 tundi
- Keskmine prioriteet: 24 tundi

### 6.3 Teatamine ametiasutustele

NIS2 direktiivi kohaselt tuleb olulisest turvaintsidendist teavitada Riigi Infosüsteemi Ametit (RIA):
- **Esialge teade:** 24 tunni jooksul
- **Vahearuanne:** 72 tunni jooksul
- **Lõpparuanne:** 1 kuu jooksul

---

## 7. VARUNDAMINE JA TAASTE

### 7.1 Varundamise põhimõtted

- Kriitiliste andmete igapäevane varundamine
- Varukoopiaid hoitakse eraldi asukohast
- Varukoopiate automaatne testimine
- Vähemalt 30 päeva säilitusperiood

### 7.2 Taastamisprotseduurid

- Dokumenteeritud taastamisprotseduurid
- Taastamise testimine vähemalt 2 korda aastas
- RTO (Recovery Time Objective): 24 tundi
- RPO (Recovery Point Objective): 24 tundi

---

## 8. TÖÖTAJATE KOOLITUSED

### 8.1 Infoturbe alane koolitus

Kõik töötajad läbivad:
- Sissejuhatava infoturbe koolituse (tööle asumise järel)
- Iga-aastase täiendkoolituse
- Erialased koolitused vastavalt rollile

### 8.2 Teadlikkuse tõstmine

- Regulaarsed infoturbe meeldetuletused (emailid, plakatid)
- Simuleeritud phishing testid
- Uudiskirjad turvalisuse teemadel

---

## 9. VASTAVUSE AUDIT JA ÜLEVAATUS

### 9.1 Siseaudit

- Infoturbe siseaudit vähemalt kord aastas
- Auditeeritud valdkonnad:
  - Juurdepääsukontroll
  - Turvaintsidentide käsitlemine
  - Varundamise efektiivsus
  - Poliitika järgimine

### 9.2 Poliitika ülevaatus

Infoturbepoliitika vaadatakse üle vähemalt kord aastas või:
- Oluliste organisatsiooniliste muudatuste korral
- Pärast suuremaid turvaauditeid
- Õigusaktide muutumisel
- Pärast olulist turvaintsidenti

---

## 10. SANKTSIOONID

Infoturbepoliitika rikkumine võib kaasa tuua:
- Suulise või kirjaliku hoiatuse
- Juurdepääsuõiguste piiramise
- Distsiplinaarmeetmed
- Töölepingu lõpetamise
- Kriminaalvastutuse (vastavalt seadusele)

---

## 11. KINNITAMINE

Käesolev infoturbepoliitika on kinnitatud ${org.ceoName || '[Juhataja nimi]'} poolt ${date}.

**Allkiri:** _________________________

**Kuupäev:** ${date}

---

## LISA 1: MÕISTED

**Infoturve** - meetmete kogum informatsiooni konfidentsiaalsuse, terviklikkuse ja kättesaadavuse tagamiseks.

**Turvaincident** - sündmus, mis võib ohustada infosüsteemi turvalisust.

**Kriitiline süsteem** - süsteem, mille katkestus põhjustab olulist kahju ärikäigule.

**Isikuandmed** - andmed, mille abil on võimalik tuvastada füüsilist isikut.

---

*Dokument genereeritud NIS2 Abimees platvormil ${date}*
*Vastavalt NIS2 direktiivile (EL) 2022/2555*

---

**${org.name}**
${org.address ? `${org.address}, ${org.city || ''} ${org.postalCode || ''}` : ''}
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
