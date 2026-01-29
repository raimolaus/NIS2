import type { TemplateData } from '../types';

export function generateSupplyChainTemplate(data: TemplateData): string {
  const { org, date, version } = data;

  return `# TARNIJATE RISKIHALDUSE PLAAN

**Organisatsioon:** ${org.name}
**Registrikood:** ${org.registrationCode || 'Ei ole määratud'}
**Kuupäev:** ${date}
**Versioon:** ${version}
**Vastutaja:** ${org.securityOfficerName || 'Määramata'}

---

## 1. SISSEJUHATUS

### 1.1 Dokumendi eesmärk

Käesolev dokument määratleb ${org.name} tarnijate ja teenusepakkujate riskihalduse põhimõtted, protsessid ja nõuded vastavalt NIS2 direktiivile.

### 1.2 Regulatsioon

NIS2 direktiiv nõuab:
- **Artikkel 21**: Tarneahela turvalisuse meetmed
- Tarnijate turvariskide hindamine
- Lepingulised turvanõuded
- Regulaarne tarnijate auditeerimne

### 1.3 Ulatus

Hõlmab kõiki IT teenusepakkujaid ja tarnijaid:
- Pilveteenuste pakkujad
- Tarkvara tarnijad
- IT infrastruktuuri teenused
- Konsultatsiooniteenused
- Hooldus ja tugi

---

## 2. TARNIJATE KLASSIFIKATSIOON

### 2.1 Kriitilisuse kategooriad

**Kategooria A: Kriitiline**
- Otsene juurdepääs tootmissüsteemidele või andmetele
- Ärikriitiline teenus (nt. pilv, e-posti hosting)
- Teenuse katkestamine põhjustab olulise kahjum
- **Nõuded:** Kõrgendatud turvameetmed, regulaarne audit (iga 12 kuud)

**Kategooria B: Oluline**
- Piiratud juurdepääs süsteemidele
- Oluline, kuid mitte kriitline teenus
- Teenuse katkestamine põhjustab häireid
- **Nõuded:** Standardsed turvameetmed, audit iga 24 kuud

**Kategooria C: Madal**
- Ei ole otsest juurdepääsu süsteemidele
- Mittekriitiline teenus
- Teenuse katkestamine ei põhjusta olulist mõju
- **Nõuded:** Baasturvameetmed, vajadusel audit

### 2.2 Tarnijate loetelu

| Tarnija | Teenus | Kategooria | Lepingu lõpp | Viimane audit |
|---------|--------|------------|--------------|---------------|
| [Nimi] | [Teenus] | A / B / C | [Kuupäev] | [Kuupäev] |
| [Lisada täiendavad tarnijad] | | | | |

---

## 3. TURVANÕUDED TARNIJAILE

### 3.1 Lepingulised nõuded

Kõik IT tarnijate lepingud peavad sisaldama:

**1. Andmekaitse ja konfidentsiaalsus**
- Konfidentsiaalsuskohustus (NDA)
- Andmete töötlemise leping (kui rakendub)
- Andmete asukohta piirangud (EL / Eesti)
- Andmete tagastamine lepingu lõppemisel

**2. Turvameetmed**
- ISO 27001 sertifikaat või samaväärne
- Krüpteerimine (transit ja at rest)
- Juurdepääsu kontroll ja MFA
- Regulaarne turvaaudit
- Varukoopiad ja disaster recovery

**3. Incidentide käsitlemine**
- 24-tunnine teavitamise kohustus
- Intsidentide ühine uurimine
- Post-mortem raport ja parandavad meetmed

**4. Auditeerimisõigus**
- Õigus kontrollida tarnija turvaprotsesse
- Juurdepääs SOC 2 / ISO auditite tulemustele
- Kohapealse auditi õigus (kategooria A puhul)

**5. Lepingu lõpetamine**
- Andmete tagastamise protseduur
- Kustutamise kinnitused
- Üleandmise toetus (kui asendatakse uue tarnijaga)

### 3.2 Tehnilised nõuded

**Kategooria A tarnijatele:**
- Multi-factor authentication (MFA) kohustuslik
- Krüpteerimine: AES-256 või tugevam
- Network segregation ja firewalls
- IDS/IPS süsteemid
- Logimine ja 12-kuuline logide säilitamine
- SOC 2 Type II või ISO 27001 sertifikaat
- GDPR vastavus (kui töödeldakse isikuandmeid)

**Kategooria B tarnijatele:**
- MFA soovitatav
- Krüpteerimine andmete ülekandel
- Firewall kaitse
- Logimine (6 kuud)
- ISO 27001 või GDPR vastavus (soovitatav)

---

## 4. TARNIJATE RISKIHINDAMINE

### 4.1 Esialgne hindamine (onboarding)

Enne lepingu sõlmimist hinnatakse:

**1. Turvaalane küsimustik (Security Questionnaire)**
- Turvapoliitika olemasolu
- Sertifikaadid (ISO 27001, SOC 2)
- Varundamise ja DR protseduurid
- Incidentide käsitlemise protsess
- Töötajate taustakontroll
- Kolmandate osapoolte kasutamine

**2. Lepingutingimuste kontroll**
- SLA tingimused
- Turvanõuded lepingus
- Vastutuse piiritlemine
- Audit õigused

**3. Riskihinnang**
- Kriitilisuse määramine (A / B / C)
- Riski taseme arvutamine
- Mitigatsioonimeetmete planeerimine

### 4.2 Regulaarne ülevaatus

**Kategooria A:** Iga 12 kuud
**Kategooria B:** Iga 24 kuud
**Kategooria C:** Vajadusel

**Ülevaatuse sisend:**
- Turvasertifikaatide kehtivus
- Hiljutised turvaincidentid
- SLA täitmise jälgimine
- Klientide tagasiside
- Uuendused teenuses või tehnoloogias

---

## 5. INTSIDENTIDE HALDUS

### 5.1 Tarnija põhjustatud intsidendid

Kui tarnija süsteemis toimub turvaincident:

**24 tunni jooksul:**
- Tarnija peab teavitama ${org.securityOfficerName || 'CISO'}
- Email: ${org.securityOfficerEmail || 'määramata'}
- Telefon: ${org.securityOfficerPhone || 'määramata'}

**Teavituse sisu:**
- Intsidendi kirjeldus
- Mõjutatud süsteemid/andmed
- Meie organisatsiooni mõju hinnang
- Rakendatud mitigatsioonimeetmed
- Eeldatav taastamisaeg

**Järgnevad sammud:**
- Ühine uurimine (48h jooksul)
- Post-mortem raport (7 päeva jooksul)
- Parandavate meetmete plaan

### 5.2 Eskalatsiooni protsess

**Madal mõju:** Tarnija lahendab iseseisvalt, teatab meid
**Keskmine mõju:** Ühine uurimine, koordineeritud vastus
**Kõrge mõju:** Kohene eskalatsiooni juhtkonnale, kaaluda lepingu lõpetamist

---

## 6. TARNIJA VAHETAMINE

### 6.1 Exit strateegia

Iga kategooria A tarnija jaoks peab olema:
- **Alternatiivne tarnija** tuvastatud
- **Üleandmise plaan** dokumenteeritud
- **Andmete ekspordi protseduur** teada
- **Migratsiooni ajakava** prognoositud (max 30 päeva)

### 6.2 Üleandmise protsess

1. **Ettevalmistus (nädal 1)**
   - Uue tarnijaga lepingu sõlmimine
   - Andmete ekspordi alustamine

2. **Migreerimine (nädalad 2-3)**
   - Andmete ülekandmine uude keskkonda
   - Testimine ja valideerimine

3. **Käivitamine (nädal 4)**
   - Paralleelne töötamine
   - Täielik üleminek uuele tarnijale

4. **Lõpetamine**
   - Andmete kustutamine vana tarnija juures
   - Kustutamise kinnitused (GDPR)

---

## 7. VASTUTUSED

**CISO / IT juht:** ${org.securityOfficerName || 'Määramata'}
- Tarnijate riskihindamise koordineerimine
- Lepingutingimuste kontrollimine (koos juriidikaga)
- Regulaarne auditeerimise teostamine
- Intsidentide juhtimine

**Juhataja:** ${org.ceoName || 'Määramata'}
- Tarnijate kinnitamine (kategooria A)
- Lepingu sõlmimine
- Eskaleeritud intsidentide käsitlemine

**Hankespetsialist:** [Määrata]
- Lepingute haldamine
- Tarnijate dokumentide kontrollimine
- SLA jälgimine

---

## 8. LISA: TURVAKÜSIMUSTIK TARNIJAILE

### Organisatsioon ja sertifikaadid
- [ ] Kas teil on ISO 27001 sertifikaat? (Kuupäev: _______)
- [ ] Kas teil on SOC 2 Type II raport? (Kuupäev: _______)
- [ ] Kas teil on NIS2 / GDPR vastavus?

### Andmekaitse
- [ ] Kus asuvad andmed? (Riik/piirkond: _______)
- [ ] Kas andmed on krüpteeritud (transit + at rest)?
- [ ] Kas kasutate multi-tenancy mudeli? Kuidas on kliendid eraldatud?

### Juurdepääsu kontroll
- [ ] Kas MFA on kohustuslik töötajatele?
- [ ] Kuidas logite juurdepääse? Mitu kuid logisid säilitate?
- [ ] Kuidas toimub töötajate taustakontroll?

### Varundamine
- [ ] Milline on teie varundussagedus?
- [ ] Kui kiiresti saate andmeid taastada? (RTO: _______)
- [ ] Kas testite regulaarselt taastamist?

### Intsidentide haldus
- [ ] Kas teil on incident response plaan?
- [ ] Kui kiiresti teavitate kliente intsidendist?
- [ ] Kas olete viimasel 2 aastal kogenud turvaincidente?

### Kolmandad osapooled
- [ ] Kas kasutate alamtarnijaid? Loetelu: _______
- [ ] Kuidas kontrollite alamtarnijate turvalisust?

---

**Dokumendi kinnitamine**

Kinnitatud:
- Kuupäev: _______________
- Nimi ja allkiri: _______________

Järgmine ülevaatus: _______________

`;
}
