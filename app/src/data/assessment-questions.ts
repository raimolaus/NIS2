// NIS2 Enesehindamise küsimustik
// 40 küsimust, 6 sektsiooni

export interface AssessmentQuestion {
  id: string;
  section: string;
  sectionIndex: number;
  questionNumber: number;
  question: string;
  description?: string;
  options: {
    value: string;
    label: string;
    score: number; // 0-100 (kui hea see vastus on)
  }[];
  nis2Reference?: string; // NIS2 artikkel
  allowNotSure?: boolean; // Kas lubada "Ei oska vastata"
}

// Default "Ei oska vastata" variant
export const NOT_SURE_OPTION = {
  value: 'not_sure',
  label: 'Ei oska vastata / Ei ole kindel',
  score: 0,
};

export const assessmentSections = [
  {
    id: 'organization',
    name: 'Organisatsioon ja juhtimine',
    shortName: 'Organisatsioon',
    icon: '🏢',
    questionCount: 5,
    description: 'Infoturbe vastutus ja dokumentatsioon'
  },
  {
    id: 'risk',
    name: 'Riskihaldus ja varahaldus',
    shortName: 'Riskihaldus',
    icon: '⚖️',
    questionCount: 8,
    description: 'IT varade ja riskide tuvastamine'
  },
  {
    id: 'security',
    name: 'Tehnilised turvameetmed',
    shortName: 'Turvameetmed',
    icon: '🔐',
    questionCount: 12,
    description: 'Juurdepääsukontroll, krüpteerimine, võrguturve'
  },
  {
    id: 'incidents',
    name: 'Intsidentide haldus',
    shortName: 'Intsidendid',
    icon: '🚨',
    questionCount: 6,
    description: 'Turvaingidentide avastamine ja käsitlemine'
  },
  {
    id: 'backup',
    name: 'Varundamine ja taastamine',
    shortName: 'Varundamine',
    icon: '💾',
    questionCount: 4,
    description: 'Andmete kaitse ja ärikriitiliste süsteemide taastamine'
  },
  {
    id: 'people',
    name: 'Töötajad ja koolitused',
    shortName: 'Töötajad',
    icon: '👥',
    questionCount: 5,
    description: 'Teadlikkuse tõstmine ja inimfaktori juhtimine'
  },
];

export const assessmentQuestions: AssessmentQuestion[] = [
  // ============================================
  // SEKTSIOON 1: ORGANISATSIOON (5 küsimust)
  // ============================================
  {
    id: 'org_1',
    section: 'organization',
    sectionIndex: 0,
    questionNumber: 1,
    question: 'Kas teil on määratud inimene, kes vastutab infoturbe eest?',
    description: 'NIS2 nõuab selgelt määratud vastutajat',
    nis2Reference: 'Artikkel 20',
    options: [
      { value: 'yes_dedicated', label: 'Jah, on määratud täiskohaga infoturbe vastutaja', score: 100 },
      { value: 'yes_part_time', label: 'Jah, on määratud, aga see pole tema peamine töö', score: 70 },
      { value: 'informal', label: 'Ei, aga keegi tegeleb sellega', score: 30 },
      { value: 'no', label: 'Ei, keegi ei tegele', score: 0 },
    ],
  },
  {
    id: 'org_2',
    section: 'organization',
    sectionIndex: 0,
    questionNumber: 2,
    question: 'Kas teil on kirjalik infoturbepoliitika?',
    description: 'Dokument, mis kirjeldab infoturbe reegleid',
    nis2Reference: 'Artikkel 21',
    options: [
      { value: 'approved', label: 'Jah, on dokumenteeritud ja juhtkonna poolt kinnitatud', score: 100 },
      { value: 'draft', label: 'Jah, on olemas, aga pole veel kinnitatud', score: 60 },
      { value: 'informal', label: 'Ei, aga meil on suulised kokkulepped', score: 20 },
      { value: 'no', label: 'Ei ole', score: 0 },
    ],
  },
  {
    id: 'org_3',
    section: 'organization',
    sectionIndex: 0,
    questionNumber: 3,
    question: 'Kas juhtkond (CEO, juhatuse liikmed) on teadlik NIS2 nõuetest?',
    description: 'NIS2 nõuab, et juhtkond oleks isiklikult vastutav',
    nis2Reference: 'Artikkel 20',
    options: [
      { value: 'yes_trained', label: 'Jah, on läbinud koolituse ja saanud ülevaate', score: 100 },
      { value: 'yes_aware', label: 'Jah, on teadlik, aga pole läbinud koolitust', score: 60 },
      { value: 'partially', label: 'Osaliselt teadlik', score: 30 },
      { value: 'no', label: 'Ei ole teadlik', score: 0 },
    ],
  },
  {
    id: 'org_4',
    section: 'organization',
    sectionIndex: 0,
    questionNumber: 4,
    question: 'Kas teil on eelarve eraldatud küberturvalisuse tegevusteks?',
    description: 'Raha infoturbe jaoks (koolitused, tarkvarad, teenused)',
    options: [
      { value: 'yes_annual', label: 'Jah, eraldatud iga-aastane eelarve', score: 100 },
      { value: 'yes_ad_hoc', label: 'Jah, eraldatakse vajaduse korral', score: 60 },
      { value: 'minimal', label: 'Minimaalne, ainult hädavajalik', score: 20 },
      { value: 'no', label: 'Ei ole', score: 0 },
    ],
  },
  {
    id: 'org_5',
    section: 'organization',
    sectionIndex: 0,
    questionNumber: 5,
    question: 'Kas teil on infoturbe dokumentatsioon kergesti kättesaadav?',
    description: 'Kas teate, kus asuvad poliitikad, plaanid, juhendid?',
    options: [
      { value: 'centralized', label: 'Jah, kõik on ühes keskses kohas (nt dokumendihaldus)', score: 100 },
      { value: 'scattered', label: 'Jah, aga laiali erinevates kohtades', score: 50 },
      { value: 'minimal', label: 'Osaliselt, mõned dokumendid on olemas', score: 20 },
      { value: 'no', label: 'Ei ole dokumentatsiooni', score: 0 },
    ],
  },

  // ============================================
  // SEKTSIOON 2: RISKIJUHTIMINE (8 küsimust)
  // ============================================
  {
    id: 'risk_1',
    section: 'risk',
    sectionIndex: 1,
    questionNumber: 6,
    question: 'Kas te olete tuvastanud oma organisatsiooni IT varad?',
    description: 'Serverid, arvutid, tarkvara, andmed - kogu nimekiri',
    nis2Reference: 'Artikkel 21',
    options: [
      { value: 'complete', label: 'Jah, meil on täielik varade register', score: 100 },
      { value: 'partial', label: 'Osaliselt, teame peamised varad', score: 50 },
      { value: 'informal', label: 'Ei, aga teame suures plaanis', score: 20 },
      { value: 'no', label: 'Ei ole tuvastanud', score: 0 },
    ],
  },
  {
    id: 'risk_2',
    section: 'risk',
    sectionIndex: 1,
    questionNumber: 7,
    question: 'Kas te olete hinnanud riske oma IT süsteemidele?',
    description: 'Mis võib juhtuda? Kui tõenäoline? Kui suur kahju?',
    nis2Reference: 'Artikkel 21',
    options: [
      { value: 'formal', label: 'Jah, on tehtud formaalne riskihindamine', score: 100 },
      { value: 'informal', label: 'Oleme arutanud, aga pole dokumenteerinud', score: 40 },
      { value: 'no', label: 'Ei ole hinnanud', score: 0 },
    ],
  },
  {
    id: 'risk_3',
    section: 'risk',
    sectionIndex: 1,
    questionNumber: 8,
    question: 'Kui sageli te vaatate üle oma riskihinnangu?',
    description: 'Riskid muutuvad - tuleb regulaarselt üle vaadata',
    options: [
      { value: 'annual', label: 'Vähemalt kord aastas', score: 100 },
      { value: 'ad_hoc', label: 'Kui midagi muutub (uus süsteem, jne)', score: 60 },
      { value: 'rarely', label: 'Harva või mitte kunagi', score: 20 },
      { value: 'never', label: 'Pole veel teinud', score: 0 },
    ],
  },
  {
    id: 'risk_4',
    section: 'risk',
    sectionIndex: 1,
    questionNumber: 9,
    question: 'Kas teil on plaan, kuidas käsitleda tuvastatud riske?',
    description: 'Riskide maandamise tegevused',
    options: [
      { value: 'documented', label: 'Jah, dokumenteeritud tegevusplaan', score: 100 },
      { value: 'informal', label: 'Teame, mida teha, aga pole kirja pannud', score: 40 },
      { value: 'no', label: 'Ei ole plaani', score: 0 },
    ],
  },
  {
    id: 'risk_5',
    section: 'risk',
    sectionIndex: 1,
    questionNumber: 10,
    question: 'Kas te hindate ka oma tarnijate (IT-teenuste pakkujad) riske?',
    description: 'Pilveteenus, IT-tugi, tarkvara tarnijad - kas nad on turvalised?',
    nis2Reference: 'Artikkel 21',
    options: [
      { value: 'yes_regular', label: 'Jah, hindame regulaarselt', score: 100 },
      { value: 'yes_initial', label: 'Jah, ainult lepingu sõlmimisel', score: 60 },
      { value: 'informal', label: 'Oleme uurinud, aga pole formaalselt hinnanud', score: 30 },
      { value: 'no', label: 'Ei ole hinnanud', score: 0 },
    ],
  },
  {
    id: 'risk_6',
    section: 'risk',
    sectionIndex: 1,
    questionNumber: 11,
    question: 'Kas teil on kindlustus küberrünnakute vastu?',
    description: 'Küberkindlustus katab kahjud',
    options: [
      { value: 'yes', label: 'Jah, on küberkindlustus', score: 100 },
      { value: 'considering', label: 'Kaalume selle võtmist', score: 50 },
      { value: 'no', label: 'Ei ole', score: 0 },
    ],
  },
  {
    id: 'risk_7',
    section: 'risk',
    sectionIndex: 1,
    questionNumber: 12,
    question: 'Kas teil on protseduur ärikriitiliste süsteemide tuvastamiseks?',
    description: 'Milliseid süsteeme te absoluutselt vajate? Mis juhtub, kui need seiskuvad?',
    options: [
      { value: 'documented', label: 'Jah, on dokumenteeritud ja teada', score: 100 },
      { value: 'informal', label: 'Teame, aga pole dokumenteerinud', score: 50 },
      { value: 'no', label: 'Ei ole tuvastanud', score: 0 },
    ],
  },
  {
    id: 'risk_8',
    section: 'risk',
    sectionIndex: 1,
    questionNumber: 13,
    question: 'Kas teil on ärikriitiliste süsteemide jaoks RTO (Recovery Time Objective)?',
    description: 'Kui kiiresti peab süsteem taastuma?',
    options: [
      { value: 'defined', label: 'Jah, on määratud ja dokumenteeritud', score: 100 },
      { value: 'informal', label: 'Teame ligikaudu, aga pole dokumenteerinud', score: 40 },
      { value: 'no', label: 'Ei tea', score: 0 },
    ],
  },

  // ============================================
  // SEKTSIOON 3: TURVAMEETMED (12 küsimust)
  // ============================================
  {
    id: 'sec_1',
    section: 'security',
    sectionIndex: 2,
    questionNumber: 14,
    question: 'Kas kõikidel töötajatel on unikaalsed kasutajakontod?',
    description: 'Iga töötaja oma kasutajanimi ja parool',
    nis2Reference: 'Artikkel 21',
    options: [
      { value: 'yes', label: 'Jah, kõigil oma konto', score: 100 },
      { value: 'mostly', label: 'Enamikul, mõned kasutavad ühist', score: 40 },
      { value: 'shared', label: 'Kasutame ühiseid kontosid', score: 0 },
    ],
  },
  {
    id: 'sec_2',
    section: 'security',
    sectionIndex: 2,
    questionNumber: 15,
    question: 'Kas kasutate kahefaktorilist autentimist (2FA)?',
    description: 'SMS kood, autentimisrakendus või muu lisasamm sisselogimisel',
    nis2Reference: 'Artikkel 21',
    options: [
      { value: 'mandatory', label: 'Jah, kõigil kohustuslik', score: 100 },
      { value: 'critical_systems', label: 'Jah, kriitilistes süsteemides', score: 70 },
      { value: 'optional', label: 'Saadaval, aga ei ole kohustuslik', score: 30 },
      { value: 'no', label: 'Ei kasuta', score: 0 },
    ],
  },
  {
    id: 'sec_3',
    section: 'security',
    sectionIndex: 2,
    questionNumber: 16,
    question: 'Kas kasutate tugevaid paroole ja muudate neid regulaarselt?',
    description: 'Vähemalt 12 tähemärki, suurtähed, väiketähed, numbrid, sümbolid',
    options: [
      { value: 'enforced', label: 'Jah, süsteem nõuab tugevaid paroole ja regulaarset muutmist', score: 100 },
      { value: 'recommended', label: 'Soovitame, aga ei nõua', score: 50 },
      { value: 'weak', label: 'Kasutame lihtsaid paroole', score: 0 },
    ],
  },
  {
    id: 'sec_4',
    section: 'security',
    sectionIndex: 2,
    questionNumber: 17,
    question: 'Kas kasutate viirusetõrjet (antivirus) kõikides seadmetes?',
    description: 'Arvutid, serverid, sülearvutid',
    nis2Reference: 'Artikkel 21',
    options: [
      { value: 'yes_managed', label: 'Jah, kõigis seadmetes ja keskelt juhitav', score: 100 },
      { value: 'yes_individual', label: 'Jah, aga iga seade eraldi', score: 70 },
      { value: 'partial', label: 'Mõnes seadmes', score: 30 },
      { value: 'no', label: 'Ei kasuta', score: 0 },
    ],
  },
  {
    id: 'sec_5',
    section: 'security',
    sectionIndex: 2,
    questionNumber: 18,
    question: 'Kas hoiate operatsioonisüsteeme ja tarkvara ajakohasena?',
    description: 'Turvauuendused (security patches)',
    nis2Reference: 'Artikkel 21',
    options: [
      { value: 'automatic', label: 'Jah, automaatsed uuendused või kiire paigaldamine', score: 100 },
      { value: 'regular', label: 'Jah, kuid manuaalselt ja vahel hilinemisega', score: 60 },
      { value: 'ad_hoc', label: 'Vahel, kui jõuame', score: 20 },
      { value: 'no', label: 'Ei uuenda regulaarselt', score: 0 },
    ],
  },
  {
    id: 'sec_6',
    section: 'security',
    sectionIndex: 2,
    questionNumber: 19,
    question: 'Kas kasutate tulemüüri (firewall)?',
    description: 'Kaitseb võrku väliste rünnakute eest',
    nis2Reference: 'Artikkel 21',
    options: [
      { value: 'yes_managed', label: 'Jah, professionaalne ja juhitav tulemüür', score: 100 },
      { value: 'yes_basic', label: 'Jah, baastulemüür (Windows firewall vms)', score: 60 },
      { value: 'no', label: 'Ei kasuta', score: 0 },
    ],
  },
  {
    id: 'sec_7',
    section: 'security',
    sectionIndex: 2,
    questionNumber: 20,
    question: 'Kas teil on võrk segmenteeritud?',
    description: 'Erinevad osad eraldatud (nt külaliste WiFi eraldi)',
    options: [
      { value: 'yes', label: 'Jah, võrk on jaotatud segmentideks', score: 100 },
      { value: 'basic', label: 'Jah, ainult külalistele eraldi WiFi', score: 50 },
      { value: 'no', label: 'Ei, kõik samas võrgus', score: 0 },
    ],
  },
  {
    id: 'sec_8',
    section: 'security',
    sectionIndex: 2,
    questionNumber: 21,
    question: 'Kas kasutate krüpteerimist tundlike andmete jaoks?',
    description: 'Andmete krüpteerimine (nii salvestamisel kui edastamisel)',
    nis2Reference: 'Artikkel 21',
    options: [
      { value: 'yes_comprehensive', label: 'Jah, kõik tundlikud andmed krüpteeritud', score: 100 },
      { value: 'yes_partial', label: 'Jah, osaliselt', score: 60 },
      { value: 'transit_only', label: 'Ainult edastamisel (HTTPS)', score: 30 },
      { value: 'no', label: 'Ei kasuta', score: 0 },
    ],
  },
  {
    id: 'sec_9',
    section: 'security',
    sectionIndex: 2,
    questionNumber: 22,
    question: 'Kas teil on juurdepääsukontroll?',
    description: 'Kas kõik töötajad näevad kõike või on piirangud?',
    nis2Reference: 'Artikkel 21',
    options: [
      { value: 'role_based', label: 'Jah, rollipõhine juurdepääs (iga töötaja näeb ainult vajalikku)', score: 100 },
      { value: 'basic', label: 'Jah, põhipiirangud olemas', score: 60 },
      { value: 'no', label: 'Ei, kõik näevad kõike', score: 0 },
    ],
  },
  {
    id: 'sec_10',
    section: 'security',
    sectionIndex: 2,
    questionNumber: 23,
    question: 'Kas teil on turvaliselt konfigureeritud WiFi võrk?',
    description: 'WPA2/WPA3 krüpteerimine, tugev parool',
    options: [
      { value: 'wpa3', label: 'Jah, WPA3 krüpteerimine', score: 100 },
      { value: 'wpa2', label: 'Jah, WPA2 krüpteerimine', score: 80 },
      { value: 'weak', label: 'On olemas, aga nõrk turve', score: 20 },
      { value: 'open', label: 'Avatud WiFi', score: 0 },
    ],
  },
  {
    id: 'sec_11',
    section: 'security',
    sectionIndex: 2,
    questionNumber: 24,
    question: 'Kas teil on turvaline kaugtöö lahendus?',
    description: 'VPN või muu turvaline viis kaugtööks',
    options: [
      { value: 'vpn', label: 'Jah, VPN kaudu', score: 100 },
      { value: 'cloud_secure', label: 'Jah, turvalised pilveteenused', score: 80 },
      { value: 'basic', label: 'Kasutame, aga pole kindel turvalisuses', score: 30 },
      { value: 'no', label: 'Ei ole kaugtööd või pole turvaline', score: 0 },
    ],
  },
  {
    id: 'sec_12',
    section: 'security',
    sectionIndex: 2,
    questionNumber: 25,
    question: 'Kas monitoorite süsteemide logisid ja turvalisuse sündmusi?',
    description: 'Kas jälgite, mis süsteemides toimub?',
    nis2Reference: 'Artikkel 21',
    options: [
      { value: 'automated', label: 'Jah, automaatne monitooring ja häired', score: 100 },
      { value: 'manual', label: 'Jah, vaatame käsitsi üle', score: 50 },
      { value: 'no', label: 'Ei monitoori', score: 0 },
    ],
  },

  // ============================================
  // SEKTSIOON 4: INTSIDENDID (6 küsimust)
  // ============================================
  {
    id: 'inc_1',
    section: 'incidents',
    sectionIndex: 3,
    questionNumber: 26,
    question: 'Kas teil on intsidentide käsitlemise plaan?',
    description: 'Mis teha, kui juhtub turvaingsident (häkk, viiruserünnak jne)',
    nis2Reference: 'Artikkel 23',
    options: [
      { value: 'documented', label: 'Jah, dokumenteeritud ja testitud', score: 100 },
      { value: 'draft', label: 'Jah, olemas, aga pole testitud', score: 60 },
      { value: 'informal', label: 'Teame, mida teha, aga pole kirja pannud', score: 30 },
      { value: 'no', label: 'Ei ole plaani', score: 0 },
    ],
  },
  {
    id: 'inc_2',
    section: 'incidents',
    sectionIndex: 3,
    questionNumber: 27,
    question: 'Kas töötajad teavad, kuidas teavitada turvaintsidentidest?',
    description: 'Kellele öelda? Kuidas teavitada?',
    options: [
      { value: 'trained', label: 'Jah, on koolitatud ja teavad', score: 100 },
      { value: 'aware', label: 'Jah, aga pole koolitatud', score: 50 },
      { value: 'no', label: 'Ei tea', score: 0 },
    ],
  },
  {
    id: 'inc_3',
    section: 'incidents',
    sectionIndex: 3,
    questionNumber: 28,
    question: 'Kas dokumenteerite turvainsidente?',
    description: 'Kirja panna, mis juhtus, mida tehti',
    nis2Reference: 'Artikkel 23',
    options: [
      { value: 'yes_system', label: 'Jah, süsteemses logiraamatus', score: 100 },
      { value: 'yes_informal', label: 'Jah, aga mitteametlikult', score: 50 },
      { value: 'no', label: 'Ei dokumenteeri', score: 0 },
    ],
  },
  {
    id: 'inc_4',
    section: 'incidents',
    sectionIndex: 3,
    questionNumber: 29,
    question: 'Kas olete määranud, milliseid insidente tuleb teavitada ametivõimudele?',
    description: 'NIS2 nõuab teatavate intsidentide raporteerimist',
    nis2Reference: 'Artikkel 23',
    options: [
      { value: 'yes', label: 'Jah, on määratud ja dokumenteeritud', score: 100 },
      { value: 'aware', label: 'Teame, et peame teavitama, aga pole täpsustanud', score: 40 },
      { value: 'no', label: 'Ei tea', score: 0 },
    ],
  },
  {
    id: 'inc_5',
    section: 'incidents',
    sectionIndex: 3,
    questionNumber: 30,
    question: 'Kas olete harjutanud intsidendi käsitlemist?',
    description: 'Simulatsioon, õppus, tabletop exercise',
    options: [
      { value: 'regular', label: 'Jah, regulaarselt (vähemalt kord aastas)', score: 100 },
      { value: 'once', label: 'Oleme teinud kunagi', score: 50 },
      { value: 'no', label: 'Ei ole harjutanud', score: 0 },
    ],
  },
  {
    id: 'inc_6',
    section: 'incidents',
    sectionIndex: 3,
    questionNumber: 31,
    question: 'Kas teil on määratud kontaktisikud väliste osapoolte jaoks?',
    description: 'Politsei, CERT, tarnijad - kes võtab ühendust?',
    options: [
      { value: 'yes', label: 'Jah, on määratud ja dokumenteeritud', score: 100 },
      { value: 'informal', label: 'Teame, kes võiks, aga pole ametlikult määratud', score: 40 },
      { value: 'no', label: 'Ei ole määratud', score: 0 },
    ],
  },

  // ============================================
  // SEKTSIOON 5: VARUNDAMINE (4 küsimust)
  // ============================================
  {
    id: 'backup_1',
    section: 'backup',
    sectionIndex: 4,
    questionNumber: 32,
    question: 'Kas teete regulaarselt varukoopia oma andmetest?',
    description: 'Kui sageli teete backup?',
    nis2Reference: 'Artikkel 21',
    options: [
      { value: 'automated_daily', label: 'Jah, automaatselt iga päev', score: 100 },
      { value: 'weekly', label: 'Jah, kord nädalas', score: 70 },
      { value: 'monthly', label: 'Jah, kord kuus', score: 40 },
      { value: 'ad_hoc', label: 'Vahel, kui meelde tuleb', score: 10 },
      { value: 'no', label: 'Ei tee', score: 0 },
    ],
  },
  {
    id: 'backup_2',
    section: 'backup',
    sectionIndex: 4,
    questionNumber: 33,
    question: 'Kas varukoopiad on eraldi asukohas (mitte samas serveris)?',
    description: '3-2-1 reegel: 3 koopiat, 2 erinevat meediat, 1 offsite',
    options: [
      { value: 'offsite', label: 'Jah, eraldi asukohas või pilves', score: 100 },
      { value: 'separate_device', label: 'Jah, eraldi kõvakettal', score: 60 },
      { value: 'same_location', label: 'Samas asukohas', score: 20 },
      { value: 'no', label: 'Ei tee varukoopiat', score: 0 },
    ],
  },
  {
    id: 'backup_3',
    section: 'backup',
    sectionIndex: 4,
    questionNumber: 34,
    question: 'Kas olete testinud varukoopiast taastamist?',
    description: 'Kas varukoopia toimib? Kas saate andmed tagasi?',
    options: [
      { value: 'regular', label: 'Jah, testime regulaarselt', score: 100 },
      { value: 'once', label: 'Oleme testinud kunagi', score: 50 },
      { value: 'no', label: 'Ei ole testinud', score: 0 },
    ],
  },
  {
    id: 'backup_4',
    section: 'backup',
    sectionIndex: 4,
    questionNumber: 35,
    question: 'Kas varukoopiad on krüpteeritud?',
    description: 'Kas keegi saab varukoopia kätte võttes andmeid lugeda?',
    options: [
      { value: 'yes', label: 'Jah, varukoopiad on krüpteeritud', score: 100 },
      { value: 'no', label: 'Ei ole krüpteeritud', score: 0 },
    ],
  },

  // ============================================
  // SEKTSIOON 6: TÖÖTAJAD (5 küsimust)
  // ============================================
  {
    id: 'people_1',
    section: 'people',
    sectionIndex: 5,
    questionNumber: 36,
    question: 'Kas töötajad on läbinud küberturvalisuse koolituse?',
    description: 'Phishing, paroolid, social engineering jne',
    nis2Reference: 'Artikkel 20',
    options: [
      { value: 'regular', label: 'Jah, regulaarselt (vähemalt kord aastas)', score: 100 },
      { value: 'once', label: 'Jah, on olnud koolitus', score: 60 },
      { value: 'informal', label: 'Oleme rääkinud, aga pole ametlikku koolitust', score: 20 },
      { value: 'no', label: 'Ei ole koolitanud', score: 0 },
    ],
  },
  {
    id: 'people_2',
    section: 'people',
    sectionIndex: 5,
    questionNumber: 37,
    question: 'Kas uued töötajad saavad infoturbe sissejuhatuse?',
    description: 'Esimesel päeval või nädal onboarding',
    options: [
      { value: 'yes', label: 'Jah, iga uus töötaja', score: 100 },
      { value: 'informal', label: 'Räägime üle, aga pole formaalne', score: 40 },
      { value: 'no', label: 'Ei', score: 0 },
    ],
  },
  {
    id: 'people_3',
    section: 'people',
    sectionIndex: 5,
    questionNumber: 38,
    question: 'Kas töötajad teavad, kuidas ära tunda phishing-rünnakut?',
    description: 'Kahtlased e-mailid, lingid, manused',
    options: [
      { value: 'trained_tested', label: 'Jah, on koolitatud ja testitud (phishing simulatsioonid)', score: 100 },
      { value: 'trained', label: 'Jah, on koolitatud', score: 60 },
      { value: 'aware', label: 'Osaliselt teavad', score: 20 },
      { value: 'no', label: 'Ei tea', score: 0 },
    ],
  },
  {
    id: 'people_4',
    section: 'people',
    sectionIndex: 5,
    questionNumber: 39,
    question: 'Kas töötajatel on selge, mida tohib ja mida ei tohi teha?',
    description: 'Kasutamise reeglid - USB mälupulgad, isiklikud seadmed, jne',
    options: [
      { value: 'documented', label: 'Jah, on kirjalik poliitika ja töötajad on kursis', score: 100 },
      { value: 'informal', label: 'Oleme rääkinud, aga pole dokumenteeritud', score: 40 },
      { value: 'no', label: 'Ei ole selge', score: 0 },
    ],
  },
  {
    id: 'people_5',
    section: 'people',
    sectionIndex: 5,
    questionNumber: 40,
    question: 'Kas kui töötaja lahkub, eemaldatakse tema juurdepääsud kohe?',
    description: 'Kasutajakonto sulgemine, võtmete tagastamine jne',
    options: [
      { value: 'immediate', label: 'Jah, kohe samal päeval', score: 100 },
      { value: 'delayed', label: 'Jah, aga mõne päeva jooksul', score: 40 },
      { value: 'no_process', label: 'Pole selget protsessi', score: 0 },
    ],
  },
];

// Helper function to get questions by section
export function getQuestionsBySection(sectionId: string): AssessmentQuestion[] {
  return assessmentQuestions.filter((q) => q.section === sectionId);
}

// Helper function to calculate section score
export function calculateSectionScore(
  sectionId: string,
  answers: Record<string, string>
): number {
  const questions = getQuestionsBySection(sectionId);
  let totalScore = 0;
  let answeredQuestions = 0;

  questions.forEach((q) => {
    const answer = answers[q.id];
    if (answer) {
      const option = q.options.find((opt) => opt.value === answer);
      if (option) {
        totalScore += option.score;
        answeredQuestions++;
      }
    }
  });

  if (answeredQuestions === 0) return 0;
  return Math.round(totalScore / answeredQuestions);
}

// Helper function to calculate total score
export function calculateTotalScore(answers: Record<string, string>): number {
  let totalScore = 0;
  let answeredQuestions = 0;

  assessmentQuestions.forEach((q) => {
    const answer = answers[q.id];
    if (answer) {
      const option = q.options.find((opt) => opt.value === answer);
      if (option) {
        totalScore += option.score;
        answeredQuestions++;
      }
    }
  });

  if (answeredQuestions === 0) return 0;
  return Math.round(totalScore / answeredQuestions);
}
