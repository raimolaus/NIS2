import type { TemplateData } from '../types';

export function generateTrainingTemplate(data: TemplateData): string {
  const { org, date, version } = data;

  return `# TÖÖTAJATE INFOTURBE KOOLITUSE PLAAN

**Organisatsioon:** ${org.name}
**Registrikood:** ${org.registrationCode || 'Ei ole määratud'}
**Kuupäev:** ${date}
**Versioon:** ${version}
**Vastutaja:** ${org.securityOfficerName || 'Määramata'}

---

## 1. SISSEJUHATUS

### 1.1 Dokumendi eesmärk

Käesolev plaan määratleb ${org.name} töötajate infoturbe teadlikkuse tõstmise programmi, et vähendada inimlikest vigadest tulenevaid turvariske.

### 1.2 NIS2 nõuded

NIS2 direktiiv **Artikkel 21(2)(e)** nõuab:
- Infoturbe riskide käsitlemise põhimõtted, sh **personali koolitused**
- Regulaarne infoturbe teadlikkuse tõstmine
- Küberohutuse hügieeni põhimõtete rakendamine

**Fakt:** Üle 90% küberrünnakutest algab inimlikust veast (phishing, nõrkad paroolid).

### 1.3 Sihtrühmad

**Töötajate arv:** ${org.employeeCount}

**Sihtrühmad:**
- **Kõik töötajad:** Baaskoolitus infoturbes
- **IT personal:** Tehniline turvakoolitus
- **Juhtkond:** Riskihaldus ja vastavuse koolitus
- **Uued töötajad:** Onboarding koolitus

---

## 2. KOOLITUSPROGRAMMI ÜLEVAADE

### 2.1 Põhikoolitus (kohustuslik kõigile)

**Sagedus:** Iga-aastane (miinimum)
**Kestus:** 2 tundi
**Formaat:** E-learning + interaktiivne test

**Teemad:**
1. **Paroolide haldus**
   - Tugevate paroolide loomine
   - Paroolihalduri kasutamine
   - MFA (Multi-factor authentication)

2. **Phishing ja social engineering**
   - Kuidas tuvastada phishing e-kirju
   - Kahtlaste linkide äratundmine
   - Social engineering taktikad

3. **Ohutud töötavad**
   - Tööarvuti turvalisus
   - Avaliku WiFi ohud
   - Töö kodust (remote work) turvalisus

4. **Andmekaitse (GDPR)**
   - Isikuandmete töötlemise põhimõtted
   - Andmete klassifikatsioon
   - Data breach teavitamiskohustus

5. **Intsidentidest teatamine**
   - Kuidas tuvastada turvaincidenti
   - Kelle poole pöörduda
   - Eskalatsiooni protsess

### 2.2 Täienduskoolitused

**Kvartaalsed teadlikkuse kampaaniad (15-30 min)**
- Uued ohupilt (ransomware, zero-day)
- Hooajalised teemad (reisimine, jõulud)
- Sisemised turvaincidentide kaasused

**Phishing simulatsioonid**
- **Sagedus:** Kord kvartalis
- **Eesmärk:** Testida töötajate valvsust
- **Järelkoolitus:** Kõigile, kes klikivad lingile

---

## 3. ROLLIPÕHISED KOOLITUSED

### 3.1 IT personali koolitus

**Sihtrühm:** IT administraatorid, arendajad
**Sagedus:** 2 korda aastas
**Kestus:** 4 tundi

**Teemad:**
- Secure coding practices
- Vulnerability management
- Patch management
- Log monitoring ja incident response
- Cloud security (AWS, Azure, jne)
- Backup ja recovery protseduurid

### 3.2 Juhtkonna koolitus

**Sihtrühm:** Juhataja, osakonnajuhatajad
**Sagedus:** 1 kord aastas
**Kestus:** 3 tundi

**Teemad:**
- NIS2 direktiivi nõuded ja sanktsioonid
- Riskihalduse põhimõtted
- Business continuity planeerimine
- Intsidentide eskalatsiooni protsess
- Juhtkonna vastutus turvarikkumiste korral

### 3.3 Uute töötajate koolitus

**Sihtrühm:** Kõik uued töötajad
**Aeg:** Esimene nädal tööl
**Kestus:** 1 tund

**Teemad:**
- Organisatsiooni infoturbepoliitika
- Aktsepteeritav kasutusviis (Acceptable Use Policy)
- Paroolid ja juurdepääs
- Seadmete kasutamine
- Intsidentidest teatamine

---

## 4. KOOLITUSE KORRALDAMINE

### 4.1 Koolituskalender 2026

| Kuupäev | Koolitus | Sihtrühm | Vastutaja |
|---------|----------|----------|-----------|
| Jaanuar | Baaskoolitus (e-learning) | Kõik | ${org.securityOfficerName || 'CISO'} |
| Veebruar | Phishing simulatsioon #1 | Kõik | IT |
| Märts | IT turvakoolitus | IT personal | Väline lektor |
| Aprill | Teadlikkuse kampaania | Kõik | CISO |
| Mai | Phishing simulatsioon #2 | Kõik | IT |
| Juuni | Juhtkonna koolitus | Juhtkond | Väline lektor |
| Juuli | Teadlikkuse kampaania | Kõik | CISO |
| August | Phishing simulatsioon #3 | Kõik | IT |
| September | IT turvakoolitus | IT personal | Väline lektor |
| Oktoober | Teadlikkuse kampaania | Kõik | CISO |
| November | Phishing simulatsioon #4 | Kõik | IT |
| Detsember | Aasta kokkuvõte | Kõik | CISO |

### 4.2 Koolitajad ja ressursid

**Sisemised koolitajad:**
- CISO / IT juht: ${org.securityOfficerName || 'Määramata'}

**Välised koolitajad:**
- [Koolitusettevõte nimi]
- [Kontaktandmed]

**E-learning platvormid:**
- [Platvorm, nt. KnowBe4, Cyber Guru]
- Litsentsid: [Kogus]

### 4.3 Eelarve

| Kulu | Summa (€) | Märkused |
|------|-----------|----------|
| E-learning litsentsid | 500-1000/a | ~10-20€ per kasutaja |
| Väline lektor (IT koolitus) | 800-1500/päev | 2x aastas |
| Väline lektor (Juhtkond) | 800-1200 | 1x aastas |
| Phishing simulatsiooni tööriist | 300-600/a | KnowBe4, Cofense |
| Kokku | ~3000-5000€ | Aastas |

---

## 5. HINDAMINE JA JÄLGIMINE

### 5.1 Koolituse efektiivsuse mõõtmine

**1. Testide tulemused**
- **Eesmärk:** Vähemalt 80% õigetest vastustest
- **Mõõtmine:** E-learning platvormi testid

**2. Phishing simulatsioonid**
- **Eesmärk:** Alla 10% töötajatest klikivad kahtlastele linkidele
- **Mõõtmine:** Kvartaalsed simulatsioonid

**3. Reaalsed intsidendid**
- **Eesmärk:** Inimlike vigadest tulenevate intsidentide vähenemine
- **Mõõtmine:** Incident management süsteem

**4. Töötajate tagasiside**
- **Eesmärk:** Positiivne tagasiside (4/5 või kõrgem)
- **Mõõtmine:** Anonüümne küsitlus pärast koolitust

### 5.2 Raporteerimine

**Kvartaalne raport juhtkonnale:**
- Koolitustes osalejate arv ja protsent
- Testide tulemuste keskmine
- Phishing simulatsiooni tulemused
- Intsidentide trend
- Parendusettepanekud

---

## 6. KOOLITUSE SISU

### 6.1 Paroolide turvalisus

**Õpitulemused:**
- Mõistab tugevate paroolide tähtsust
- Oskab luua turvalist parooli
- Teab MFA kasutamist

**Näited:**
❌ **HALB parool:** `parool123`, `qwerty`, `sinu_nimi`
✅ **HEA parool:** `Minu!Kass@Armastab#Kala2026`

**Paroolihaldur:**
- LastPass, 1Password, Bitwarden
- Üks master parool + MFA
- Kõik muud paroolid genereeritakse

**Multi-Factor Authentication (MFA):**
- Midagi mida tead (parool)
- Midagi mida omad (telefon, USB võti)
- **Kohustuslik** kõigile süsteemidele

### 6.2 Phishing tuvastamine

**Tunnused:**
- ⚠️ **Kiireloomulisus:** "Kliki kohe, muidu konto suletakse!"
- ⚠️ **Võlts saatja:** `amazon-support@amaozn.com` (vt kirjavigu)
- ⚠️ **Kahtlane link:** Hoia kursorit lingi kohal, vaata URL-i
- ⚠️ **Õigekirjavead:** Professionaalsed firmad ei tee põhivead
- ⚠️ **Ebatavaline päring:** "Saada oma parool", "Vali võitja auhind"

**Mis teha kahtluse korral?**
1. ❌ **ÄRA kliki** lingile
2. ✅ Kontrolli saatja aadressi hoolikalt
3. ✅ Võta ühendust ettevõttega (ametlikult numbrit)
4. ✅ Teata IT-le: ${org.securityOfficerEmail || 'it@ettevõte.ee'}

### 6.3 Ohutud töötavad

**Tööarvuti:**
- 🔒 Lukusta ekraan kui lahkud (Win+L)
- 🚫 Ära installi tarkvaara ilma IT loata
- 🔄 Installi süsteemivärskendused kohe

**Avalik WiFi:**
- ⚠️ Ära tee pangaülekandeid avalikus WiFis
- ✅ Kasuta VPN-i (kui töötad remotelt)
- 🚫 Ära jaga konfidentsiaalseid andmeid

**Remote work:**
- 🏠 Tööarvuti ainult tööks (mitte perekond)
- 🔐 Kodu WiFi tugev parool
- 📹 Video call'ide taustal pole konfidentsiaalset infot

### 6.4 Andmekaitse (GDPR)

**Isikuandmed:**
- Nimi, email, telefon, isikukood
- IP aadress, geolocation
- Terviseandmed, finantsandmed

**Põhimõtted:**
- Töötlus ainult õiguslikul alusel
- Andmed minimaalsed ja asjakohased
- Säilitamine mitte kauem kui vajalik
- Turvalisus ja konfidentsiaalsus

**Data breach:**
- Kui kahtlustad andmeleket → teata IT-le 24h jooksul
- IT teavitab Andmekaitse Inspektsiooni (72h)

---

## 7. VASTUTUSED

**CISO / IT juht:** ${org.securityOfficerName || 'Määramata'}
- Koolitusprogrammi koordineerimine
- E-learning sisu haldamine
- Phishing simulatsioonide korraldamine
- Tulemuste raporteerimine

**HR juht:** [Määrata]
- Uute töötajate koolituse koordineerimine
- Koolitustes osalemise jälgimine
- Tagasiside kogumine

**Osakonnajuhatajad:**
- Töötajate osalemise toetamine
- Aja eraldamine koolitusteks
- Koolituse rakendamise jälgimine

---

## 8. LISA: KONTROLL-LEHT

### Töötaja koolituse kontroll-leht

**Töötaja:** _______________
**Osakond:** _______________

- [ ] Baaskoolitus läbitud (kuupäev: _______)
- [ ] Test sooritatud (tulemus: _____%)
- [ ] Rollipõhine koolitus (kui rakendub): _______
- [ ] Iga-aastane täienduskoolitus: _______
- [ ] Phishing simulatsiooni osalemine:
  - [ ] Q1: Läbis / Ebaõnnestus
  - [ ] Q2: Läbis / Ebaõnnestus
  - [ ] Q3: Läbis / Ebaõnnestus
  - [ ] Q4: Läbis / Ebaõnnestus

**Märkused:**
_________________________________

---

**Dokumendi kinnitamine**

Kinnitatud:
- Kuupäev: _______________
- Nimi ja allkiri: _______________

Järgmine ülevaatus: _______________

`;
}
