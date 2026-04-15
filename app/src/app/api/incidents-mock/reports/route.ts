import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

// Helper function to format date in Estonian format
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('et-EE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

// Helper function to get severity in Estonian
function getSeverityText(severity: string): string {
  switch (severity) {
    case 'critical': return 'Kriitiline';
    case 'high': return 'Kõrge';
    case 'medium': return 'Keskmine';
    case 'low': return 'Madal';
    default: return severity;
  }
}

// Helper function to get type in Estonian
function getTypeText(type: string): string {
  switch (type) {
    case 'availability': return 'Kättesaadavus';
    case 'integrity': return 'Terviklikkus';
    case 'confidentiality': return 'Konfidentsiaalsus';
    case 'authenticity': return 'Autentsus';
    default: return type;
  }
}

// Helper function to get status in Estonian
function getStatusText(status: string): string {
  switch (status) {
    case 'new': return 'Uus';
    case 'investigating': return 'Uurimisel';
    case 'contained': return 'Piiratud';
    case 'resolved': return 'Lahendatud';
    case 'reported': return 'Raporteeritud';
    case 'closed': return 'Suletud';
    default: return status;
  }
}

// Generate Early Warning Report (24h)
function generateEarlyWarningReport(incident: any, companyData: any): string {
  const reportDate = new Date().toISOString();

  return `
═══════════════════════════════════════════════════════════════════════
                    VARAJANE HOIATUS (NIS2 Artikkel 23)
                    Turvaolukorra rikkumine - 24h raport
═══════════════════════════════════════════════════════════════════════

RAPORTI ANDMED
--------------
Raporti tüüp:        Varajane hoiatus (T+24h)
Genereeritud:        ${formatDate(reportDate)}
Tähtaeg:             ${incident.earlyWarningDeadline ? formatDate(incident.earlyWarningDeadline) : 'Ei kehti'}
Esitaja:             ${incident.reportedBy}

ORGANISATSIOONI ANDMED
---------------------
Nimi:                ${companyData?.name || 'Määramata'}
Registrikood:        ${companyData?.regCode || 'Määramata'}
Aadress:             ${companyData?.address || 'Määramata'}
Linn:                ${companyData?.city || 'Määramata'}
Riik:                ${companyData?.country || 'Määramata'}
Telefon:             ${companyData?.phone || 'Määramata'}
E-post:              ${companyData?.email || 'Määramata'}
NIS2 kategooria:     ${companyData?.nis2Category === 'essential' ? 'Oluline' : companyData?.nis2Category === 'important' ? 'Tähtis' : 'Ei kehti'}

INTSIDENDI PÕHIANDMED
--------------------
Juhtum ID:           ${incident.id}
Pealkiri:            ${incident.title}
Avastamise aeg:      ${formatDate(incident.discoveredAt)}
Tüüp:                ${getTypeText(incident.type)}
Raskusaste:          ${getSeverityText(incident.severity)}
Olek:                ${getStatusText(incident.status)}

KIRJELDUS
---------
${incident.description}

ESIALGNE MÕJU HINNANG
--------------------
Mõjutatud süsteemid: ${incident.affectedSystems.length > 0 ? '\n  - ' + incident.affectedSystems.join('\n  - ') : 'Ei ole määratud'}
Mõjutatud kasutajad: ${incident.affectedUsers ? incident.affectedUsers.toLocaleString('et-EE') : 'Ei ole määratud'}
Andmete mõju:        ${incident.dataImpact ? 'JAH - sisaldab andmete kahjustust või lekkimist' : 'EI'}
Piiriülene mõju:     ${incident.crossBorder ? 'JAH - mõjutab teisi liikmesriike' : 'EI'}

ESMASED MEETMED
---------------
${incident.status === 'new' ? '- Intsident on registreeritud ja esmane hindamine käib' :
  incident.status === 'investigating' ? '- Intsident on uurimisel\n- Mõju hindamine käib' :
  incident.status === 'contained' ? '- Intsident on lokaliseeritud\n- Kahjulik tegevus on peatatud' :
  '- Meetmed võetud vastavalt intsidendi olekule'}

JÄRGMISED SAMMUD
---------------
- Detailne uurimine ja mõju hindamine jätkub
- Intsidenditeatatis (72h) esitatakse tähtaegselt
- Pideva jälgimise ja uuenduste esitamine

═══════════════════════════════════════════════════════════════════════
                    CERT.EE | NIS2 Direktiiv 2022/2555
═══════════════════════════════════════════════════════════════════════

TÄHELEPANU: See on esialgne hoiatus. Detailsem teave esitatakse
intsidenditeatatis (T+72h) ja lõpparuandes (T+30 päeva).

Kontakt: ${companyData?.ciso?.email || companyData?.email || 'määramata'}
Telefon: ${companyData?.ciso?.phone || companyData?.phone || 'määramata'}
`;
}

// Generate Notification Report (72h)
function generateNotificationReport(incident: any, companyData: any): string {
  const reportDate = new Date().toISOString();

  return `
═══════════════════════════════════════════════════════════════════════
                 INTSIDENDITEATATIS (NIS2 Artikkel 23)
                  Turvaolukorra rikkumine - 72h raport
═══════════════════════════════════════════════════════════════════════

RAPORTI ANDMED
--------------
Raporti tüüp:        Intsidenditeatatis (T+72h)
Genereeritud:        ${formatDate(reportDate)}
Tähtaeg:             ${incident.notificationDeadline ? formatDate(incident.notificationDeadline) : 'Ei kehti'}
Esitaja:             ${incident.reportedBy}
${incident.certCaseNumber ? `CERT juhtum:         ${incident.certCaseNumber}` : ''}

ORGANISATSIOONI ANDMED
---------------------
Nimi:                ${companyData?.name || 'Määramata'}
Registrikood:        ${companyData?.regCode || 'Määramata'}
Aadress:             ${companyData?.address || 'Määramata'}, ${companyData?.postalCode || ''} ${companyData?.city || ''}
Riik:                ${companyData?.country || 'Määramata'}
Telefon:             ${companyData?.phone || 'Määramata'}
E-post:              ${companyData?.email || 'Määramata'}
Veebileht:           ${companyData?.website || 'Määramata'}
Töötajaid:           ${companyData?.employeeCount || 'Määramata'}
Valdkond:            ${companyData?.industry || 'Määramata'}
NIS2 kategooria:     ${companyData?.nis2Category === 'essential' ? 'Oluline üksus' : companyData?.nis2Category === 'important' ? 'Tähtis üksus' : 'Ei kehti'}

VASTUTAVAD ISIKUD
-----------------
Tegevjuht:           ${companyData?.ceo?.name || 'Määramata'}
                     ${companyData?.ceo?.email || ''} | ${companyData?.ceo?.phone || ''}

Teabeturbe juht:     ${companyData?.ciso?.name || 'Määramata'}
                     ${companyData?.ciso?.email || ''} | ${companyData?.ciso?.phone || ''}

IT juht:             ${companyData?.itManager?.name || 'Määramata'}
                     ${companyData?.itManager?.email || ''} | ${companyData?.itManager?.phone || ''}

INTSIDENDI ANDMED
----------------
Juhtum ID:           ${incident.id}
Pealkiri:            ${incident.title}
Avastamise aeg:      ${formatDate(incident.discoveredAt)}
Raporteerimise aeg:  ${incident.reportedAt ? formatDate(incident.reportedAt) : formatDate(reportDate)}
Tüüp:                ${getTypeText(incident.type)}
Raskusaste:          ${getSeverityText(incident.severity)}
Praegune olek:       ${getStatusText(incident.status)}

DETAILNE KIRJELDUS
-----------------
${incident.description}

MÕJU HINDAMINE
-------------
Mõjutatud süsteemid:
${incident.affectedSystems.length > 0 ? incident.affectedSystems.map((s: string, i: number) => `  ${i + 1}. ${s}`).join('\n') : '  Ei ole määratud'}

Mõjutatud kasutajad: ${incident.affectedUsers ? incident.affectedUsers.toLocaleString('et-EE') + ' kasutajat' : 'Ei ole määratud'}

Andmete mõju:        ${incident.dataImpact ? 'JAH - Intsident hõlmab isikuandmete või tundliku teabe kahjustamist/lekkimist' : 'EI - Andmete mõju puudub'}

Piiriülene mõju:     ${incident.crossBorder ? 'JAH - Intsident mõjutab teiste EL liikmesriikide teenuseid või kasutajaid' : 'EI - Mõju piirdub Eestiga'}

AJATELG
-------
Avastatud:           ${formatDate(incident.discoveredAt)}
Raporteeritud:       ${incident.reportedAt ? formatDate(incident.reportedAt) : 'Käesolev raport'}
${incident.containedAt ? `Piiratud:            ${formatDate(incident.containedAt)}` : 'Piiramise aeg:       Käimasolev'}
${incident.resolvedAt ? `Lahendatud:          ${formatDate(incident.resolvedAt)}` : 'Lahendamise aeg:     Käimasolev'}

RAKENDATUD MEETMED
-----------------
${incident.status === 'new' ? '- Intsident on registreeritud\n- Esmane hindamine tehtud\n- Uurimine alustatud' :
  incident.status === 'investigating' ? '- Põhjalik uurimine käib\n- Mõju analüüs teostatud\n- Turvameetmed rakendamisel' :
  incident.status === 'contained' ? '- Intsident on edukalt lokaliseeritud\n- Kahjulik tegevus peatatud\n- Süsteemid isoleeritud\n- Taastamise protsess alustatud' :
  incident.status === 'resolved' ? '- Intsident on lahendatud\n- Teenused taastatud\n- Jälgimine jätkub' :
  '- Meetmed võetud vastavalt intsidendi olekule'}

${incident.rootCause ? `\nPÕHJUSE ANALÜÜS\n---------------\n${incident.rootCause}` : ''}

${incident.preventiveMeasures ? `\nENNETUSMEETMED\n--------------\n${incident.preventiveMeasures}` : ''}

TÕENDID
-------
${incident.evidence.length > 0 ? incident.evidence.map((e: any, i: number) =>
  `${i + 1}. [${e.type.toUpperCase()}] ${e.description}\n   Kogutud: ${formatDate(e.collectedAt)}`
).join('\n') : 'Tõendite kogumine käib'}

JÄRGMISED SAMMUD
---------------
- Jätkame põhjalikku uurimist ja analüüsi
- Rakendame täiendavaid turvameetmeid
- Esitame lõpparuande tähtaegselt (T+30 päeva)
- Jätkame olukorra jälgimist

═══════════════════════════════════════════════════════════════════════
                    CERT.EE | NIS2 Direktiiv 2022/2555
═══════════════════════════════════════════════════════════════════════

TÄHELEPANU: Detailne lõpparuanne koos täieliku põhjuste analüüsi,
õppetundide ja ennetusmeetmetega esitatakse 30 päeva jooksul.

Kontaktisik: ${companyData?.ciso?.name || 'Määramata'}
E-post: ${companyData?.ciso?.email || companyData?.email || 'määramata'}
Telefon: ${companyData?.ciso?.phone || companyData?.phone || 'määramata'}
`;
}

// Generate Final Report (30 days)
function generateFinalReport(incident: any, companyData: any): string {
  const reportDate = new Date().toISOString();

  return `
═══════════════════════════════════════════════════════════════════════
                   LÕPPARUANNE (NIS2 Artikkel 23)
            Turvaolukorra rikkumine - Täielik analüüs ja aruanne
═══════════════════════════════════════════════════════════════════════

RAPORTI ANDMED
--------------
Raporti tüüp:        Lõpparuanne (T+30 päeva)
Genereeritud:        ${formatDate(reportDate)}
Tähtaeg:             ${incident.finalReportDeadline ? formatDate(incident.finalReportDeadline) : 'Ei kehti'}
Koostaja:            ${incident.reportedBy}
${incident.certCaseNumber ? `CERT juhtum:         ${incident.certCaseNumber}` : ''}

═══════════════════════════════════════════════════════════════════════
                        1. ORGANISATSIOONI ANDMED
═══════════════════════════════════════════════════════════════════════

ÜLDANDMED
---------
Ettevõte:            ${companyData?.name || 'Määramata'}
Registrikood:        ${companyData?.regCode || 'Määramata'}
Aadress:             ${companyData?.address || 'Määramata'}
                     ${companyData?.postalCode || ''} ${companyData?.city || ''}
                     ${companyData?.country || 'Määramata'}
Telefon:             ${companyData?.phone || 'Määramata'}
E-post:              ${companyData?.email || 'Määramata'}
Veebileht:           ${companyData?.website || 'Määramata'}
Töötajaid:           ${companyData?.employeeCount || 'Määramata'}
Valdkond:            ${companyData?.industry || 'Määramata'}
NIS2 kategooria:     ${companyData?.nis2Category === 'essential' ? 'OLULINE ÜKSUS' : companyData?.nis2Category === 'important' ? 'TÄHTIS ÜKSUS' : 'Ei kehti'}

VASTUTAVAD ISIKUD
-----------------
Tegevjuht (CEO):
  Nimi:              ${companyData?.ceo?.name || 'Määramata'}
  E-post:            ${companyData?.ceo?.email || 'Määramata'}
  Telefon:           ${companyData?.ceo?.phone || 'Määramata'}

Teabeturbe juht (CISO):
  Nimi:              ${companyData?.ciso?.name || 'Määramata'}
  E-post:            ${companyData?.ciso?.email || 'Määramata'}
  Telefon:           ${companyData?.ciso?.phone || 'Määramata'}

IT juht:
  Nimi:              ${companyData?.itManager?.name || 'Määramata'}
  E-post:            ${companyData?.itManager?.email || 'Määramata'}
  Telefon:           ${companyData?.itManager?.phone || 'Määramata'}

Andmekaitseametnik (DPO):
  Nimi:              ${companyData?.dataProtectionOfficer?.name || 'Määramata'}
  E-post:            ${companyData?.dataProtectionOfficer?.email || 'Määramata'}
  Telefon:           ${companyData?.dataProtectionOfficer?.phone || 'Määramata'}

═══════════════════════════════════════════════════════════════════════
                        2. INTSIDENDI ÜLEVAADE
═══════════════════════════════════════════════════════════════════════

PÕHIANDMED
----------
Juhtum ID:           ${incident.id}
Pealkiri:            ${incident.title}
Tüüp:                ${getTypeText(incident.type)}
Raskusaste:          ${getSeverityText(incident.severity)}
Lõplik olek:         ${getStatusText(incident.status)}

KLASSIFIKATSIOON (NIS2 Artikkel 23)
-----------------------------------
Intsidendi kategooria: ${getTypeText(incident.type)}
${incident.type === 'availability' ? '  → Teenuse kättesaadavuse häire' :
  incident.type === 'integrity' ? '  → Andmete terviklikkuse rikkumine' :
  incident.type === 'confidentiality' ? '  → Andmete konfidentsiaalsuse rikkumine' :
  incident.type === 'authenticity' ? '  → Autentsuse ja/või isikutuvastuse rikkumine' : ''}

Raskusaste põhjendus:
${incident.severity === 'critical' ? '  → KRIITILINE: Oluline mõju organisatsiooni võimekusele teenuseid osutada' :
  incident.severity === 'high' ? '  → KÕRGE: Märkimisväärne mõju teenuste kvaliteedile või andmetele' :
  incident.severity === 'medium' ? '  → KESKMINE: Mõõdukas mõju süsteemidele' :
  '  → MADAL: Minimaalne mõju'}

TÄIELIK KIRJELDUS
----------------
${incident.description}

═══════════════════════════════════════════════════════════════════════
                        3. AJATELG JA KRONOLOOGIA
═══════════════════════════════════════════════════════════════════════

Avastamine:          ${formatDate(incident.discoveredAt)}
Raporteerimise algus: ${incident.reportedAt ? formatDate(incident.reportedAt) : 'N/A'}
${incident.earlyWarningSent ? `Varajane hoiatus:    Saadetud ${formatDate(incident.earlyWarningDeadline || '')}` : ''}
${incident.notificationSent ? `Intsidenditeatatis:  Saadetud ${formatDate(incident.notificationDeadline || '')}` : ''}
Lokaliseerimine:     ${incident.containedAt ? formatDate(incident.containedAt) : 'Käimasolev'}
Lahendamine:         ${incident.resolvedAt ? formatDate(incident.resolvedAt) : 'Käimasolev'}
Lõpparuanne:         ${formatDate(reportDate)}

Intsidendi kestus:   ${incident.resolvedAt ?
  Math.round((new Date(incident.resolvedAt).getTime() - new Date(incident.discoveredAt).getTime()) / (1000 * 60 * 60)) + ' tundi' :
  'Käimasolev'}

═══════════════════════════════════════════════════════════════════════
                        4. MÕJU ANALÜÜS
═══════════════════════════════════════════════════════════════════════

TEHNILISED SÜSTEEMID
-------------------
Mõjutatud süsteemid (${incident.affectedSystems.length}):
${incident.affectedSystems.length > 0 ? incident.affectedSystems.map((s: string, i: number) => `  ${i + 1}. ${s}`).join('\n') : '  Andmed puuduvad'}

KASUTAJAD JA TEENUSED
--------------------
Mõjutatud kasutajate arv: ${incident.affectedUsers ? incident.affectedUsers.toLocaleString('et-EE') + ' kasutajat' : 'Ei ole määratud'}

ANDMETE MÕJU
-----------
Andmete kahjustus/leke:    ${incident.dataImpact ? 'JAH' : 'EI'}
${incident.dataImpact ? `
  → Intsident hõlmas isikuandmete või tundliku teabe kahjustamist
  → Andmekaitse määruse (GDPR) kohane teavitamine tehtud: [TÄPSUSTA]
  → Mõjutatud isikute arv: ${incident.affectedUsers || 'Hinnatakse'}
` : ''}

GEOGRAAFILINE MÕJU
-----------------
Piiriülene mõju:           ${incident.crossBorder ? 'JAH' : 'EI'}
${incident.crossBorder ? `
  → Intsident mõjutas teiste EL liikmesriikide teenuseid/kasutajaid
  → Teavitatud jurisdiktsioonid: [TÄPSUSTA]
` : ''}

═══════════════════════════════════════════════════════════════════════
                        5. PÕHJUSTE ANALÜÜS
═══════════════════════════════════════════════════════════════════════

PÕHJUS (ROOT CAUSE)
------------------
${incident.rootCause || 'TÄPSUSTAMISEL - Põhjalik põhjuste analüüs on käimasolev.'}

ASJAOLUDE KIRJELDUS
-------------------
[Selles sektsioonis kirjeldage detailselt:
 - Kuidas intsident algas
 - Milliseid haavatavusi kasutati ära
 - Millised turvameetmed ei toiminud oodatult
 - Milliseid hoiatussignaale võis olla varasemalt]

═══════════════════════════════════════════════════════════════════════
                        6. REAGEERIMISE MEETMED
═══════════════════════════════════════════════════════════════════════

KOHESED REAKTSIOONIMEETMED
--------------------------
${incident.status === 'new' ? '- Intsident registreeritud\n- Esmane hindamine' :
  incident.status === 'investigating' ? '- Põhjalik uurimine käib\n- Mõju analüüs teostatud' :
  incident.status === 'contained' ? '- Intsident lokaliseeritud\n- Kahjulik tegevus peatatud\n- Süsteemid isoleeritud' :
  incident.status === 'resolved' ? '- Intsident lahendatud\n- Teenused taastatud\n- Süsteemid turvatud' :
  '- Meetmed rakendatud'}

TAASTAMISE TEGEVUSED
-------------------
${incident.resolvedAt ? `
- Teenused taastati täielikult: ${formatDate(incident.resolvedAt)}
- Süsteemide terviklikkus kontrollitud
- Turvameetmed tugevdatud
` : '- Taastamine käimasolev'}

TÕENDITE KOGUMINE
----------------
${incident.evidence.length > 0 ? 'Kogutud tõendid:\n' + incident.evidence.map((e: any, i: number) =>
  `${i + 1}. Tüüp: ${e.type.toUpperCase()}\n   Kirjeldus: ${e.description}\n   Kogutud: ${formatDate(e.collectedAt)}\n   ${e.fileUrl ? `Fail: ${e.fileUrl}` : ''}`
).join('\n\n') : 'Tõendite kogumine pooleli või ei ole vajalik'}

═══════════════════════════════════════════════════════════════════════
                        7. ÕPPETUNNID
═══════════════════════════════════════════════════════════════════════

${incident.lessonsLearned || `
ORGANISATSIOONILISED ÕPPETUNNID
-------------------------------
[Kirjeldage, mida organisatsioon sai sellest intsidendist õppida]

TEHNILISED ÕPPETUNNID
---------------------
[Kirjeldage tehnilisi puudujääke või parendusvõimalusi]

PROTSESSIDE ÕPPETUNNID
---------------------
[Kirjeldage, kuidas protsesse ja protseduure saab parandada]
`}

═══════════════════════════════════════════════════════════════════════
                        8. ENNETUSMEETMED
═══════════════════════════════════════════════════════════════════════

${incident.preventiveMeasures || `
RAKENDATUD MEETMED
------------------
[Loetlege meetmed, mis on juba rakendatud]

PLANEERITUD MEETMED
------------------
[Loetlege meetmed, mida plaanitakse rakendada]

TÄIUSTUSED TURVAPROTSESSIDES
---------------------------
[Kirjeldage, kuidas turvaprotseduure täiustatakse]

TEHNILISED PARENDUSED
--------------------
[Loetlege tehnilisi parendusi süsteemides ja infrastruktuuris]

KOOLITUS JA TEADLIKKUS
---------------------
[Kirjeldage täiendavaid koolitusi ja teadlikkuse tõstmise meetmeid]
`}

═══════════════════════════════════════════════════════════════════════
                        9. KOKKUVÕTE JA KINNITUSED
═══════════════════════════════════════════════════════════════════════

LÕPLIK HINNANG
-------------
Intsidendi raskusaste:     ${getSeverityText(incident.severity)}
Teenuste taastamine:       ${incident.resolvedAt ? 'LÕPETATUD' : 'KÄIMASOLEV'}
Põhjused tuvastatud:       ${incident.rootCause ? 'JAH' : 'OSALISELT / KÄIMASOLEV'}
Ennetusmeetmed:           ${incident.preventiveMeasures ? 'RAKENDATUD / PLANEERITUD' : 'TÄPSUSTAMISEL'}

KINNITUSED
----------
Käesolevaga kinnitame, et:
- Intsident on täielikult dokumenteeritud
- Kõik vajalikud meetmed on võetud
- Ennetusmeetmed on rakendamisel
- Õppetunnid on dokumenteeritud ja jagatakse

Allkirjad:

_________________________    _________________________
${companyData?.ciso?.name || 'CISO nimi'}              ${companyData?.ceo?.name || 'CEO nimi'}
Teabeturbe juht              Tegevjuht
Kuupäev: ${formatDate(reportDate)}

═══════════════════════════════════════════════════════════════════════
                    CERT.EE | NIS2 Direktiiv 2022/2555
═══════════════════════════════════════════════════════════════════════

Kontaktisik: ${companyData?.ciso?.name || 'Määramata'}
E-post: ${companyData?.ciso?.email || 'määramata'}
Telefon: ${companyData?.ciso?.phone || 'määramata'}

LISA: See dokument on koostatud vastavalt NIS2 direktiivi (EL) 2022/2555
nõuetele ja sisaldab kõiki vajalikke andmeid turvaolukorra rikkumise kohta.
`;
}

// POST - Generate report
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { incidentId, reportType } = body;

    if (!incidentId || !reportType) {
      return NextResponse.json(
        { error: 'Incident ID ja raporti tüüp on kohustuslikud' },
        { status: 400 }
      );
    }

    if (!['early-warning', 'notification', 'final'].includes(reportType)) {
      return NextResponse.json(
        { error: 'Vigane raporti tüüp' },
        { status: 400 }
      );
    }

    const incident = storage.incidents.find(i => i.id === incidentId);

    if (!incident) {
      return NextResponse.json(
        { error: 'Intsidenti ei leitud' },
        { status: 404 }
      );
    }

    // Get company data for the report
    const companyData = storage.company;

    let content: string;
    let filename: string;
    let reportTitle: string;

    switch (reportType) {
      case 'early-warning':
        content = generateEarlyWarningReport(incident, companyData);
        filename = `CERT_EE_Varajane_Hoiatus_${incident.id}_${new Date().toISOString().split('T')[0]}.txt`;
        reportTitle = 'Varajane hoiatus (24h)';

        // Update incident to mark early warning as sent
        const earlyWarningIndex = storage.incidents.findIndex(i => i.id === incidentId);
        if (earlyWarningIndex !== -1) {
          storage.incidents[earlyWarningIndex].earlyWarningSent = true;
          storage.incidents[earlyWarningIndex].updatedAt = new Date().toISOString();
        }
        break;

      case 'notification':
        content = generateNotificationReport(incident, companyData);
        filename = `CERT_EE_Intsidenditeatatis_${incident.id}_${new Date().toISOString().split('T')[0]}.txt`;
        reportTitle = 'Intsidenditeatatis (72h)';

        // Update incident to mark notification as sent
        const notificationIndex = storage.incidents.findIndex(i => i.id === incidentId);
        if (notificationIndex !== -1) {
          storage.incidents[notificationIndex].notificationSent = true;
          storage.incidents[notificationIndex].updatedAt = new Date().toISOString();
        }
        break;

      case 'final':
        content = generateFinalReport(incident, companyData);
        filename = `CERT_EE_Lopparuanne_${incident.id}_${new Date().toISOString().split('T')[0]}.txt`;
        reportTitle = 'Lõpparuanne (30 päeva)';

        // Update incident to mark final report as sent
        const finalIndex = storage.incidents.findIndex(i => i.id === incidentId);
        if (finalIndex !== -1) {
          storage.incidents[finalIndex].finalReportSent = true;
          storage.incidents[finalIndex].status = 'reported';
          storage.incidents[finalIndex].updatedAt = new Date().toISOString();
        }
        break;

      default:
        return NextResponse.json(
          { error: 'Vigane raporti tüüp' },
          { status: 400 }
        );
    }

    return NextResponse.json(
      {
        content,
        filename,
        reportTitle,
        message: `${reportTitle} edukalt genereeritud`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json(
      { error: 'Midagi läks valesti' },
      { status: 500 }
    );
  }
}
