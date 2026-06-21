import React, { useState, useEffect, useMemo } from 'react';
import {
  Menu, X, Globe, Phone, Mail, MapPin, Instagram, Heart, ArrowUpRight,
  Clock, BookOpen, Users, Sparkles, Sun, Moon
} from 'lucide-react';

import logo from './assets/logo.png';
import interior1 from './assets/interior-1.jpg';
import interior2 from './assets/interior-2.jpg';
import interior3 from './assets/interior-3.jpg';
import exteriorCurrent from './assets/exterior-current.jpg';
import model1 from './assets/model-1.jpg';
import model2 from './assets/model-2.jpg';
import model3 from './assets/model-3.jpg';
import model4 from './assets/model-4.jpg';

// ─── i18n ─────────────────────────────────────────────────────────────
const STRINGS = {
ckb: {
  locale: 'ckb-IR', 
  soon: 'لە نزیکەوە',       // or 'ku-Arab-IQ'
  dir: 'rtl',              // Arabic script → right to left
  nameLine1: ' مزگەوت ',   // Mizgewt – adjust spacing as needed
  nameLine2: ' سەلاحەدین ',
  nav: {
    home: 'دەستپێک',
    about: 'دەربارە',
    times: 'كاتی نوێژ',
    vision: 'بینا',
    visit: 'سەردان',
    support: 'پشتیوانی'
  },
  tagline: 'شوێنی نوێژ، فێربوون و کۆمەڵگە',
  heroIntro: 'بەخێربێیت بۆ',
  heroBody: 'لە شەقامێکی بێدەنگ لە گێنت، دوکانێکی گۆڕاو بووەتە ماڵێک بۆ نوێژە ڕۆژانە، خوێندنی قورئان و کۆبوونەوەی دراوسێکان. ئەمە چیرۆکی کۆمەڵگەیەکی بچووکە کە شتێکی ھەمیشەیی دروست دەکات.',
  cta1: 'سەردانمان بکە',
  cta2: 'پشتیوانی نۆژەنکردنەوە',
  nextPrayer: 'نوێژی داهاتوو',
  in: 'لە',
  todayTimes: 'کاتی نوێژەکانی ئەمڕۆ',
  timesSub: 'بەپێی شێوازی یەکێتی جیھانی موسڵمانان، بۆ گێنت حیساب کراوە.',
  fajr: 'بەیانی',
  sunrise: 'خۆرھەڵاتن',
  dhuhr: 'نیوەڕۆ',
  asr: 'عەسر',
  maghrib: 'مەغریب',
  isha: 'عیشا',
  jumuah: 'نوێژی ھەینی',
  jumuahTime: '13:30',
  aboutLabel: '— دەربارەی مزگەوت',
  aboutTitle: 'کۆمەڵگەیەک کۆبۆوە.',
  aboutBody: 'مزگەوتی سەلاحەدین لەلایەن کۆمەڵەیەکی مرۆیی (Humanitaire Vereniging) بەڕێوە دەبرێت – کۆمەڵەیەکی بچووکی مرۆیی کە خزمەت بە موسڵمانانی گێنت دەکات و بەخێرایی لە دراوسێکانی ھەموو پاشبنەمایەک وەردەگرێت. ئێمە پێنج نوێژە ڕۆژانە، خوتبەی ھەینی، و وانەکانی منداڵان و پێگەیشتوانان ڕێک دەخەین. دەرگاکانمان کراوەن.',
  interiorLabel: '— ناوەوە',
  interiorTitle: 'لە کوێ نوێژ دەکەین.',
  interiorBody: 'جێگای نوێژی ئەمڕۆ – فەرشە گەرم، دیوارە ئارامەکان, کتێبخانەیەکی بچووک، مینبەرێکی دار. بێ کەلەپوور بەڵام پڕ لە ژیان.',
  visionLabel: '— بینای ئێمە',
  visionTitle: 'لێرەوە، إن شاء الله، بۆ ئەوێ.',
  visionBody: 'تیمێکی تەلارساز، بە پشتیوانی کۆمەڵگە، نۆژەنکردنەوەیەکی دیزاین کردووە کە ڕووکاری کەلەپووری Antwerpsesteenweg ڕێز دەگرێت لە ھەمان کاتدا شوێنێکی شایستەی عیبادەت دروست دەکات. خشتێکی فلمانی کەرەمی. مەرمەری بورگوندی. منارەیەکی مۆدێرن لە برۆنز و تۆڕ.',
  presentLabel: 'ئەمڕۆ',
  presentCaption: 'Antwerpsesteenweg 24 – ماڵە ئێستای ئێمە, دوکانێکی گۆڕاو کە کۆمەڵگە بۆ ساڵان نوێژی تێدا کردووە.',
  futureLabel: 'سبەینێ',
  futureCaption: 'مزگەوتێکی گەورە کە ھەموومان کۆدەکاتەوە.',
  modelCaption: 'مۆدێلە تەلارسازییەکانی لێکۆڵینەوە – مەرمەری بورگوندی ، ڕووکاری نۆژەنکراوە.',
  servicesLabel: '— ئەوەی پێشکەشی دەکەین',
  servicesTitle: 'عيادەت، خوێندن، کۆمەڵگە.',
  s1Title: 'پێنج نوێژی ڕۆژانە',
  s1Body: 'بۆ ھەر نوێژێک، ھەموو ڕۆژێکی ساڵ کراوەیە. بێدەنگ، پاک، بەخێرایی.',
  s2Title: 'قورئان و عەرەبی',
  s2Body: 'وانەی ھەفتانە بۆ منداڵان و پێگەیشتوانان – خوێندنەوە، لەبەرکردن و زمانی عەرەبی.',
  s3Title: 'خوتبەی ھەینی',
  s3Body: 'نوێژی ھەینی لە نیوەڕۆی زوودا، بە وتار بە عەرەبی و وەرگێڕان بۆ کۆمەڵگە.',
  s4Title: 'کۆمەڵگە',
  s4Body: 'ئفطارەکانی ڕەمەزان، کۆبوونەوەی جەژن، پشتیوانی نوێھاتووان – شوێنێک بۆ ئەوەی سەر بە کەسێتی خۆت بیر.',
  visitLabel: '— سەردان',
  visitTitle: 'ئێمە بدۆزەوە.',
  visitBody: 'ئێمە لە Antwerpsesteenweg 24 ین، بە ترام و پاسکیل بە ئاسانی دەگەیت. پێڵاوەکانت لە دەرگا لابە. جلوبەرگی شیاوی ڕێز لێدەگیرێت. میوان بەخێرن.',
  address: 'Antwerpsesteenweg 24',
  city: 'گێنت، بەلجیکا',
  callUs: 'پەیوەندی بکە',
  emailUs: 'ئیمەیڵ بنێرە',
  followUs: 'شوێنمان بکەوە',
  supportLabel: '— پشتیوانی',
  supportTitle: 'یارمەتیمان بدە لە دروستکردندا.',
  supportBody: 'ھەر خشتێکی ڕووکاری داهاتوو بە پشتیوانی کۆمەڵگە و دراوسێکانمان دادەنرێت. بەخششەکان پشتیوانی کارە ڕۆژانە و نۆژەنکردنەوە دەکەن. خوا بە ھەر بەخششێک پاداشت بدات.',
  bankName: 'ناوی ھەژمار',
  bankNameValue: 'Humanitaire Vereniging',
  iban: 'IBAN',
  ibanValue: 'BE75 0688 8937 6051',
  reference: 'پەیام',
  referenceValue: 'نۆژەنکردنەوە',
  donateButton: 'بەخشش',
  footerLine: 'مزگەوتی سەلاحەدین · کۆمەڵەی مرۆیی · Antwerpsesteenweg 24, گێنت',
  footerRights: '© ' + new Date().getFullYear() + ' مزگەوتی سەلاحەدین',
},
  en: {
    soon: 'soon',
    locale: 'en-GB', dir: 'ltr',
    nameLine1: 'Moskee', nameLine2: 'Salahaddien',
    nav: { home: 'Home', about: 'About', times: 'Prayer times', vision: 'Vision', visit: 'Visit', support: 'Support' },
    tagline: 'A place of prayer, learning and community',
    heroIntro: 'Welcome to',
    heroBody: 'In a quiet street in Gent, a converted shopfront has become a home for daily prayer, Qur\'an study and the gathering of neighbours. This is the story of a small community building something lasting.',
    cta1: 'Visit us', cta2: 'Support the renovation',
    nextPrayer: 'Next prayer', in: 'in',
    todayTimes: 'Today\'s prayer times',
    timesSub: 'According to the Muslim World League method, calculated for Gent.',
    fajr: 'Fajr', sunrise: 'Sunrise', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha',
    jumuah: 'Friday prayer', jumuahTime: '13:30',
    aboutLabel: '— About the mosque',
    aboutTitle: 'A community, gathered.',
    aboutBody: 'Moskee Salahaddien is run by a Humanitaire Vereniging — a small humanitarian association serving Muslims in Gent and welcoming neighbours of every background. We host the five daily prayers, Friday khutbah, and lessons for children and adults. Our doors are open.',
    interiorLabel: '— Inside',
    interiorTitle: 'Where we pray.',
    interiorBody: 'The prayer hall today — warm carpets, quiet walls, a small library, a wooden minbar. Modest but full of life.',
    visionLabel: '— Our vision',
    visionTitle: 'From here, إن شاء الله, to here.',
    visionBody: 'A team of architects, supported by the community, has designed a renovation that honours the heritage façades of Antwerpsesteenweg while creating a dignified place of worship. Cream Flemish brick. Burgundy marble. A modern minaret in brass and mesh. Tradition and the present, side by side.',
    presentLabel: 'Today',
    presentCaption: 'Antwerpsesteenweg 24 — our current home, a converted shopfront where the community has prayed for years.',
    futureLabel: 'Tomorrow',
    futureCaption: 'A large mosque that unites us all.',
    modelCaption: 'Architectural study models — burgundy marble, the restored façade.',
    servicesLabel: '— What we offer',
    servicesTitle: 'Worship, study, community.',
    s1Title: 'Five daily prayers', s1Body: 'Open for every salah, every day of the year. Quiet, clean, welcoming.',
    s2Title: 'Qur\'an & Arabic',    s2Body: 'Weekly classes for children and adults — recitation, memorisation, and the Arabic language.',
    s3Title: 'Friday khutbah',      s3Body: 'Jumu\'ah prayer in the early afternoon, with sermons in Arabic and translated for the community.',
    s4Title: 'Community',           s4Body: 'Iftars in Ramadan, Eid gatherings, support for new arrivals — a place to belong.',
    visitLabel: '— Visit us', visitTitle: 'Find us.',
    visitBody: 'We are on Antwerpsesteenweg, easy to reach by tram and bike. Take off your shoes at the door. Modest dress is appreciated. There is no charge — guests are welcome.',
    address: 'Antwerpsesteenweg 24', city: '9000, Gent, Belgium',
    callUs: 'Call us', emailUs: 'Email us', followUs: 'Follow us',
    supportLabel: '— Support', supportTitle: 'Help us build.',
    supportBody: 'Every brick of the future façade will be laid with the support of our community and our neighbours. Donations support daily operations and the renovation. May Allah reward every contribution.',
    bankName: 'Account name', bankNameValue: 'Humanitaire Vereniging',
    iban: 'IBAN', ibanValue: 'BE75 0688 8937 6051',
    reference: 'Communication', referenceValue: 'Renovation / Renovatie',
    donateButton: 'Donate',
    footerLine: 'Moskee Salahaddien · Humanitaire Vereniging · Antwerpsesteenweg 24, Gent',
    footerRights: '© ' + new Date().getFullYear() + ' Moskee Salahaddien',
  },
  nl: {
    soon: 'binnenkort',
    locale: 'nl-BE', dir: 'ltr',
    nameLine1: 'Moskee', nameLine2: 'Salahaddien',
    nav: { home: 'Home', about: 'Over ons', times: 'Gebedstijden', vision: 'Visie', visit: 'Bezoek', support: 'Steun' },
    tagline: 'Een plaats van gebed, kennis en gemeenschap',
    heroIntro: 'Welkom bij',
    heroBody: 'In een rustige straat in Gent is een omgebouwde winkel een thuis geworden voor het dagelijkse gebed, het bestuderen van de Koran en de ontmoeting van buren. Dit is het verhaal van een kleine gemeenschap die iets blijvends opbouwt.',
    cta1: 'Bezoek ons', cta2: 'Steun de renovation',
    nextPrayer: 'Volgend gebed', in: 'over',
    todayTimes: 'Gebedstijden vandaag',
    timesSub: 'Volgens de methode van de Muslim World League, berekend voor Gent.',
    fajr: 'Fajr', sunrise: 'Zonsopgang', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha',
    jumuah: 'Vrijdaggebed', jumuahTime: '13:30',
    aboutLabel: '— Over de moskee', aboutTitle: 'Een gemeenschap, samen.',
    aboutBody: 'Moskee Salahaddien wordt gerund door een Humanitaire Vereniging — een kleine vereniging ten dienste van moslims in Gent, met open deuren voor buren van elke achtergrond. We organiseren de vijf dagelijkse gebeden, de vrijdag khutbah en lessen voor kinderen en volwassenen.',
    interiorLabel: '— Binnen',
    interiorTitle: 'Waar wij bidden.',
    interiorBody: 'De gebedsruimte vandaag — warme tapijten, stille muren, een kleine bibliotheek, een houten minbar. Bescheiden maar vol leven.',
    visionLabel: '— Onze visie', visionTitle: 'Van hier, إن شاء الله, naar hier.',
    visionBody: 'Een team van architecten heeft, met steun van de gemeenschap, een renovation ontworpen die de erfgoedgevels van de Antwerpsesteenweg eert en tegelijk een waardige gebedsplaats creëert. Crèmekleurige Vlaamse baksteen. Bordeauxrood marmer. Een moderne minaret in messing en gaas.',
    presentLabel: 'Vandaag',
    presentCaption: 'Antwerpsesteenweg 24 — ons huidige thuis, een omgebouwde winkelpand waar de gemeenschap al jaren bidt.',
    futureLabel: 'Morgen',
  futureCaption: 'Een grote moskee die ons allemaal samenbrengt.',
    modelCaption: 'Architectuurmodellen — bordeauxrood marmer, de gerestaureerde gevel.',
    servicesLabel: '— Wat wij bieden', servicesTitle: 'Gebed, studie, gemeenschap.',
    s1Title: 'Vijf dagelijkse gebeden', s1Body: 'Geopend voor elke salah, elke dag van het jaar. Rustig, schoon, gastvrij.',
    s2Title: 'Koran & Arabisch',         s2Body: 'Wekelijkse lessen voor kinderen en volwassenen — recitatie, memorisatie en de Arabische taal.',
    s3Title: 'Vrijdag khutbah',          s3Body: 'Jumu\'ah gebed in de vroege namiddag, met preken in het Arabisch en vertaling voor de gemeenschap.',
    s4Title: 'Gemeenschap',              s4Body: 'Iftars in Ramadan, Eid samenkomsten, ondersteuning voor nieuwkomers — een plek om bij te horen.',
    visitLabel: '— Bezoek', visitTitle: 'Vind ons.',
    visitBody: 'Wij bevinden ons aan de Antwerpsesteenweg, makkelijk bereikbaar met de tram en de fiets. Trek uw schoenen uit aan de deur. Bescheiden kledij wordt op prijs gesteld. Gasten zijn welkom.',
    address: 'Antwerpsesteenweg 24', city: 'Gent, België',
    callUs: 'Bel ons', emailUs: 'E-mail', followUs: 'Volg ons',
    supportLabel: '— Steun', supportTitle: 'Help mee bouwen.',
    supportBody: 'Elke steen van de toekomstige gevel zal gelegd worden met de steun van onze gemeenschap en onze buren. Giften steunen de dagelijkse werking én de renovatie. Moge Allah elke bijdrage belonen.',
    bankName: 'Rekeningnaam', bankNameValue: 'Humanitaire Vereniging Moskee Salahaddien',
    iban: 'IBAN', ibanValue: 'BE75 0688 8937 6051',
    reference: 'Mededeling', referenceValue: 'Renovatie',
    donateButton: 'Doneer',
    footerLine: 'Moskee Salahaddien · Humanitaire Vereniging · Antwerpsesteenweg 24, Gent',
    footerRights: '© ' + new Date().getFullYear() + ' Moskee Salahaddien',
  },
  fr: {
    soon: 'bientôt',
    locale: 'fr-BE', dir: 'ltr',
    nameLine1: 'Mosquée', nameLine2: 'Salahaddien',
    nav: { home: 'Accueil', about: 'À propos', times: 'Horaires', vision: 'Vision', visit: 'Visite', support: 'Soutien' },
    tagline: 'Un lieu de prière, d\'étude et de communauté',
    heroIntro: 'Bienvenue à',
    heroBody: 'Dans une rue calme de Gand, une vitrine reconvertie est devenue un foyer pour la prière quotidienne, l\'étude du Coran et le rassemblement des voisins. Voici l\'histoire d\'une petite communauté qui construit quelque chose de durable.',
    cta1: 'Nous rendre visite', cta2: 'Soutenir la rénovation',
    nextPrayer: 'Prochaine prière', in: 'dans',
    todayTimes: 'Horaires des prières aujourd\'hui',
    timesSub: 'Selon la méthode de la Ligue Islamique Mondiale, calculée pour Gand.',
    fajr: 'Fajr', sunrise: 'Lever', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha',
    jumuah: 'Prière du vendredi', jumuahTime: '13:30',
    aboutLabel: '— À propos', aboutTitle: 'Une communauté, rassemblée.',
    aboutBody: 'La Mosquée Salahaddien est gérée par une Humanitaire Vereniging — une petite association humanitaire au service des musulmans de Gand, accueillant les voisins de toute origine. Nous accueillons les cinq prières quotidiennes, le khutbah du vendredi et des cours pour enfants et adultes.',
    interiorLabel: '— À l\'intérieur',
    interiorTitle: 'Là où nous prions.',
    interiorBody: 'La salle de prière aujourd\'hui — tapis chaleureux, murs paisibles, une petite bibliothèque, un minbar en bois. Modeste mais pleine de vie.',
    visionLabel: '— Notre vision', visionTitle: 'D\'ici, إن شاء الله, à là.',
    visionBody: 'Une équipe d\'architectes, soutenue par la communauté, a conçu une rénovation qui honore les façades patrimoniales de l\'Antwerpsesteenweg tout en créant un lieu de culte digne. Brique flamande crème. Marbre bordeaux. Un minaret moderne en laiton et maille.',
    presentLabel: 'Aujourd\'hui',
    presentCaption: 'Antwerpsesteenweg 24 — notre maison actuelle, une vitrine reconvertie où la communauté prie depuis des années.',
    futureLabel: 'Demain',
  futureCaption: 'Une grande mosquée qui nous rassemble tous.',
    modelCaption: 'Maquettes d\'étude — marbre bordeaux, la façade restaurée.',
    servicesLabel: '— Ce que nous offrons', servicesTitle: 'Prière, étude, communauté.',
    s1Title: 'Cinq prières quotidiennes', s1Body: 'Ouverts pour chaque salah, chaque jour de l\'année. Calme, propre, accueillant.',
    s2Title: 'Coran et arabe',             s2Body: 'Cours hebdomadaires pour enfants et adultes — récitation, mémorisation, langue arabe.',
    s3Title: 'Khutbah du vendredi',        s3Body: 'Prière du Jumu\'ah en début d\'après-midi, sermons en arabe et traduits pour la communauté.',
    s4Title: 'Communauté',                 s4Body: 'Iftars in Ramadan, rassemblements de l\'Aïd, soutien aux nouveaux arrivants — un lieu d\'appartenance.',
    visitLabel: '— Visite', visitTitle: 'Nous trouver.',
    visitBody: 'Nous sommes sur l\'Antwerpsesteenweg, facile d\'accès en tram et à vélo. Retirez vos chaussures à l\'entrée. Une tenue modeste est appréciée. Les visiteurs sont les bienvenus.',
    address: 'Antwerpsesteenweg 24', city: 'Gand, Belgique',
    callUs: 'Téléphone', emailUs: 'E-mail', followUs: 'Suivez-nous',
    supportLabel: '— Soutien', supportTitle: 'Aidez-nous à construire.',
    supportBody: 'Chaque brique de la future façade sera posée avec le soutien de notre communauté et de nos voisins. Les dons soutiennent le fonctionnement quotidien et la rénovation. Qu\'Allah récompense chaque contribution.',
    bankName: 'Nom du compte', bankNameValue: 'Humanitaire Vereniging Moskee Salahaddien',
    iban: 'IBAN', ibanValue: 'BE75 0688 8937 6051',
    reference: 'Communication', referenceValue: 'Rénovation',
    donateButton: 'Faire un don',
    footerLine: 'Mosquée Salahaddien · Humanitaire Vereniging · Antwerpsesteenweg 24, Gand',
    footerRights: '© ' + new Date().getFullYear() + ' Mosquée Salahaddien',
  },
  ar: {
    soon: 'قَرِيبًا',
    locale: 'ar-EG', dir: 'rtl',
    nameLine1: 'مسجد', nameLine2: 'صلاح الدين',
    nav: { home: 'الرئيسية', about: 'عن المسجد', times: 'مواقيت الصلاة', vision: 'الرؤية', visit: 'الزيارة', support: 'الدعم' },
    tagline: 'مكانٌ للصلاةِ، والعلمِ، وجماعةِ المسلمين',
    heroIntro: 'مرحبًا بكم في',
    heroBody: 'في شارعٍ هادئٍ بمدينة Gent، تحوّل محلٌّ صغير إلى بيتٍ للصلوات اليومية، ودراسة القرآن الكريم، ولقاء الجيران. هذه هي قصة مجتمعٍ صغيرٍ يبني شيئًا يبقى.',
    cta1: 'زورونا', cta2: 'ادعموا التجديد',
    nextPrayer: 'الصلاة القادمة', in: 'بعد',
    todayTimes: 'مواقيت الصلاة اليوم',
    timesSub: 'وفقًا لطريقة رابطة العالم الإسلامي، محسوبة لمدينة Gent.',
    fajr: 'الفجر', sunrise: 'الشروق', dhuhr: 'الظهر', asr: 'العصر', maghrib: 'المغرب', isha: 'العشاء',
    jumuah: 'صلاة الجمعة', jumuahTime: '13:30',
    aboutLabel: '— عن المسجد', aboutTitle: 'جماعةٌ مجتمعة.',
    aboutBody: 'يُدار مسجد صلاح الدين من قِبَل جمعيةٍ إنسانية صغيرة (Humanitaire Vereniging) في خدمة المسلمين في Gent، وأبوابها مفتوحة لجيرانٍ من كلِّ خلفية. نُقيم الصلوات الخمس، وخطبة الجمعة، ودروسًا للأطفال والكبار.',
    interiorLabel: '— من الداخل',
    interiorTitle: 'حيثُ نُصلِّي.',
    interiorBody: 'قاعةُ الصلاةِ اليوم — سجّادٌ دافئ، جدرانٌ هادئة، مكتبةٌ صغيرة، ومنبرٌ خشبي. متواضعٌ، ولكنهُ عامرٌ بالحياة.',
    visionLabel: '— رؤيتنا', visionTitle: 'من هنا — إن شاء الله — إلى هناك.',
    visionBody: 'صمّم فريقٌ من المعماريين، بدعم من المجتمع، تجديدًا يحترم واجهات التراث في شارع Antwerpsesteenweg ويُهيّئ في الوقت ذاته مكانًا كريمًا للعبادة. آجرٌّ فلمنكيٌّ كريميّ. رخامٌ بُرغندي. ومئذنةٌ معاصرة من النحاس والشبك المعدني.',
    presentLabel: 'اليوم',
    presentCaption: 'Antwerpsesteenweg 24 — بيتنا الحالي، محلٌّ صغير صلّى فيه المجتمع لسنوات.',
    futureLabel: 'غدًا',
    futureCaption: 'مسجدٌ كبيرٌ يضمنا جميعًا. ',
    modelCaption: 'مجسّماتٌ معمارية — رخامٌ بُرغندي، الواجهة المُستعادة.',
    servicesLabel: '— ما نُقدِّم', servicesTitle: 'عبادةٌ، ودراسةٌ، وجماعة.',
    s1Title: 'الصلوات الخمس', s1Body: 'مفتوحٌ لكلِّ صلاة، كلَّ يومٍ من السنة. هادئ، نظيف، مُرحِّب.',
    s2Title: 'القرآن والعربية', s2Body: 'دروسٌ أسبوعية للأطفال والكبار — تلاوة، حفظ، ولغة عربية.',
    s3Title: 'خطبة الجمعة',     s3Body: 'صلاة الجمعة في بداية الظهيرة، مع خطبٍ بالعربية ومُترجَمة للمجتمع.',
    s4Title: 'المجتمع',          s4Body: 'موائد الإفطار في رمضان، ولقاءات العيد، ودعم القادمين الجدد — مكانٌ للانتماء.',
    visitLabel: '— الزيارة', visitTitle: 'كيف تصل إلينا.',
    visitBody: 'نحن في شارع Antwerpsesteenweg ، يسهل الوصول إلينا بالترام والدراجة. اخلع حذاءك عند الباب. اللباس المحتشم مُستحبّ. الضيوف مُرحَّبٌ بهم.',
    address: 'Antwerpsesteenweg 24', city: 'Gent، بلجيكا',
    callUs: 'اتصل', emailUs: 'البريد', followUs: 'تابعونا',
    supportLabel: '— الدعم', supportTitle: 'ساعدونا في البناء.',
    supportBody: 'كلُّ آجُرَّةٍ من واجهة الغد سَتُوضَع بدعمِ مجتمعِنا وجيرانِنا. تَدعَمُ التبرعاتُ التشغيلَ اليومي وأعمالَ التجديد. جزى الله كلَّ مساهمٍ خيرَ الجزاء.',
    bankName: 'اسم الحساب', bankNameValue: 'Humanitaire Vereniging Moskee Salahaddien',
    iban: 'الـ IBAN', ibanValue: 'BE75 0688 8937 6051',
    reference: 'البيان', referenceValue: 'تجديد المسجد',
    donateButton: 'تبرّع',
    footerLine: 'مسجد صلاح الدين · جمعية إنسانية · شارع Antwerpsesteenweg 24، Gent',
    footerRights: '© ' + new Date().getFullYear() + ' مسجد صلاح الدين',
  },
};

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'nl', label: 'NL' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'ع' },
  { code: 'ckb', label: 'کوردی' },
];

// ─── prayer time helpers ─────────────────────────────────────────────
const PRAYER_KEYS = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function parseHM(s) {
  const [h, m] = s.split(':').map(Number);
  return h * 60 + m;
}
function fmtHM(mins) {
  const h = Math.floor(mins / 60).toString().padStart(2, '0');
  const m = (mins % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}
function getNextPrayer(timings, now) {
  if (!timings) return null;
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const list = PRAYER_KEYS
    .filter(k => k !== 'Sunrise')
    .map(k => ({ key: k, mins: parseHM(timings[k].slice(0, 5)) }));
  for (const p of list) {
    if (p.mins > nowMin) {
      const diff = p.mins - nowMin;
      return { key: p.key, time: fmtHM(p.mins), inMinutes: diff };
    }
  }
  const fajrMin = parseHM(timings.Fajr.slice(0, 5));
  return { key: 'Fajr', time: fmtHM(fajrMin), inMinutes: 24 * 60 - nowMin + fajrMin };
}

// ─── small decorative SVGs ───────────────────────────────────────────
function ArabesqueDivider({ className = '' }) {
  return (
    <svg viewBox="0 0 200 24" className={className} fill="none">
      <line x1="0" y1="12" x2="80" y2="12" stroke="currentColor" strokeWidth="0.5" />
      <line x1="120" y1="12" x2="200" y2="12" stroke="currentColor" strokeWidth="0.5" />
      <g transform="translate(100 12)">
        <circle r="3" fill="currentColor" />
        <path d="M -10 0 Q -5 -6 0 0 Q 5 -6 10 0 Q 5 6 0 0 Q -5 6 -10 0 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </g>
    </svg>
  );
}
function StarOrnament({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M 12 2 L 14 10 L 22 12 L 14 14 L 12 22 L 10 14 L 2 12 L 10 10 Z" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

// ─── main ────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [timings, setTimings] = useState(null);
  const [now, setNow] = useState(new Date());
  const [langOpen, setLangOpen] = useState(false);

  // 1. Theme state initializer checking user system pref or local storage cache
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // 2. Sync HTML tag element with current theme status dynamically
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const s = STRINGS[lang];
  const isRTL = s.dir === 'rtl';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = s.dir;
  }, [lang, s.dir]);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30 * 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/prayer/today')
      .then(r => r.json())
      .then(d => {
        if (cancelled) return;
        if (d?.timings) setTimings(d.timings);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
    <div dir={s.dir} className={`min-h-screen w-full bg-paper text-ink dark:bg-ink dark:text-paper ${isRTL ? 'font-arabic' : 'font-body'}`}>
    
      {/* ─── Nav ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-stone/15 dark:bg-ink/90 dark:border-stone/30">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between gap-6">
          <a href="#home" className="flex items-center gap-3 group">
            <img src={logo} alt="Moskee Salahaddien logo" className="w-12 h-12 object-contain" />
            <div className="leading-tight hidden sm:block">
              <div className={`text-base m-1 text-xl ${isRTL ? 'font-arabic' : 'font-display'} font-medium text-ink dark:text-paper`}>
                {s.nameLine1} {s.nameLine2}
              </div>
              <div className="text-[12px] text-stone dark:text-brass-light/80 tracking-[0.18em] uppercase">Humanitaire Vereniging</div>
            </div>
          </a>

          <nav className={`hidden lg:flex items-center gap-7 ${isRTL ? 'text-xl' : 'text-sm'}`}>
            {Object.entries(s.nav).map(([key, label]) => (
              <a key={key} href={`#${key}`} className="text-ink/80 hover:text-wine dark:text-paper/80 dark:hover:text-brass-light transition-colors relative group">
                {label}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-wine dark:bg-brass-light scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* 3. Luxury Look Dark/Light Mode Theme Button Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 border border-stone/30 hover:border-wine dark:border-stone/50 dark:hover:border-brass-light dark:text-paper transition-colors rounded-sm flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={14} className="text-brass-light" /> : <Moon size={14} className="text-ink" />}
            </button>

            {/* Language dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-stone/30 hover:border-wine dark:border-stone/50 dark:hover:border-brass-light dark:text-paper transition-colors text-xs tracking-wider rounded-sm"
              >
                <Globe size={12} />
                <span className="font-medium">{LANGS.find(l => l.code === lang)?.label}</span>
              </button>
              {langOpen && (
                <div className={`absolute top-full mt-1 ${isRTL ? 'left-0' : 'right-0'} bg-paper dark:bg-wine-deep border border-stone/30 dark:border-stone/50 rounded-sm shadow-lg overflow-hidden min-w-[120px] z-10`}>
                  {LANGS.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`block w-full text-left px-4 py-2 text-xs hover:bg-cream dark:hover:bg-ink text-ink dark:text-paper transition-colors ${lang === l.code ? 'text-wine dark:text-brass-light font-medium' : ''}`}
                    >
                      {l.label} · {l.code === 'en' ? 'English' : l.code === 'nl' ? 'Nederlands' : l.code === 'fr' ? 'Français' : l.code === 'ar' ? 'العربية' : l.code === 'ckb' ? 'کوردی' : ''}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="lg:hidden p-2 dark:text-paper" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-stone/15 dark:border-stone/30 bg-paper dark:bg-ink">
            <div className="px-5 py-4 flex flex-col gap-3">
              {Object.entries(s.nav).map(([key, label]) => (
                <a key={key} href={`#${key}`} onClick={() => setMenuOpen(false)} className={`py-1.9 text-ink/80 dark:text-paper/80 ${isRTL ? 'text-lg' : 'text-base'}`}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ─── Hero ────────────────────────────────────────── */}
      <section id="home" className="relative overflow-hidden grain">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-20 sm:pb-28 relative">
          <div className="relative max-w-3xl">
            <div className="fade-up delay-1">
              <div className="flex items-center gap-3 mb-6 text-wine dark:text-brass-light">
                <StarOrnament className="w-3 h-3" />
                <span className={`text uppercase font-medium ${isRTL ? 'tracking-normal text-lg' : 'tracking-[0.25em]'}`}>{s.heroIntro}</span>
              </div>
            </div>

            <h1 className={`fade-up delay-2 ${isRTL ? 'font-arabic text-6xl sm:text-7xl lg:text-8xl leading-tight' : 'font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.9]'} font-light text-ink dark:text-paper`}>
              <span className="block">{s.nameLine1}</span>
              <span className={`block ${isRTL ? '' : 'italic'} text-wine dark:text-brass-light`}>{s.nameLine2}</span>
            </h1>

            <p className={`fade-up delay-3 mt-8 text-base sm:text-lg max-w-xl text-ink/75 dark:text-paper/80 leading-relaxed ${isRTL ? 'font-arabic text-xl' : 'font-display italic font-light'}`}>
              {s.tagline}
            </p>

            <p className={`fade-up delay-4 mt-6 max-w-xl text-ink/70 dark:text-paper/70 leading-relaxed ${isRTL ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
              {s.heroBody}
            </p>

            <div className="fade-up delay-5 mt-10 flex flex-wrap items-center gap-4">
              <a href="#visit" className="group inline-flex items-center gap-2 bg-ink text-paper dark:bg-paper dark:text-ink px-7 py-3.5 text tracking-wide hover:bg-wine dark:hover:bg-brass-light transition-colors">
                {s.cta1}
                <ArrowUpRight size={16} className={`group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${isRTL ? 'rtl-flip' : ''}`} />
              </a>
              <a href="#support" className="group inline-flex items-center gap-2 text border-b border-ink dark:border-paper pb-1 dark:text-paper hover:text-wine dark:hover:text-brass-light hover:border-wine dark:hover:border-brass-light transition-colors">
                <Heart size={14} /> {s.cta2}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone/20 py-5 text-wine dark:text-brass-light flex justify-center">
          <ArabesqueDivider className="w-48 h-6" />
        </div>
      </section>

      {/* ─── Prayer times ────────────────────────────────── */}
      <section id="times" className="bg-cream dark:bg-wine-deep/20 py-20 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12">
            <div className="lg:col-span-7">
              <h2 className={`${isRTL ? 'font-arabic text-5xl sm:text-6xl' : 'font-display text-4xl sm:text-5xl lg:text-6xl'} font-light leading-tight text-ink dark:text-paper`}>
                {s.todayTimes}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className={`text-sm text-ink/70 dark:text-paper/60 leading-relaxed ${isRTL ? 'font-arabic text-base' : ''}`}>{s.timesSub}</p>
            </div>
          </div>

          <div className="w-full">
            <MawaqitEmbed />
          </div>
        </div>
      </section>

      {/* ─── About ───────────────────────────────────────── */}
      <section id="about" className="py-24 sm:py-32 grain">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <div className="lg:col-span-4">
              <div className={`text-4xl uppercase text-wine dark:text-brass-light mb-4 ${isRTL ? 'tracking-normal' : 'tracking-[0.25em]'}`}>{s.aboutLabel}</div>
              <h2 className={`${isRTL ? 'font-arabic text sm:text-2xl' : 'font-display text-5xl sm:text-6xl lg:text-7xl'} font-light leading-[0.95] text-ink dark:text-paper`}>
                {s.aboutTitle}
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className={`text-lg sm:text-xl leading-relaxed text-ink/80 dark:text-paper/80 ${isRTL ? 'font-arabic text-xl sm:text-2xl' : 'font-display italic font-light'}`}>
                {s.aboutBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interior gallery ────────────────────────────── */}
      <section className="bg-cream-dark dark:bg-wine-deep/40 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="mb-12 max-w-3xl">
            <div className={`text-4xl uppercase text-wine dark:text-brass-light mb-4 ${isRTL ? 'tracking-normal' : 'tracking-[0.25em]'}`}>{s.interiorLabel}</div>
            <h2 className={`${isRTL ? 'font-arabic text-5xl sm:text-2xl' : 'font-display text-4xl sm:text-5xl lg:text-6xl'} font-light leading-tight mb-6 text-ink dark:text-paper`}>
              {s.interiorTitle}
            </h2>
            <p className={`text-ink/70 dark:text-paper/70 leading-relaxed ${isRTL ? 'font-arabic text-lg' : 'text-base sm:text-lg'}`}>
              {s.interiorBody}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            <div className="aspect-[4/5] overflow-hidden hover-lift">
              <img src={interior1} alt="Prayer hall" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/5] overflow-hidden hover-lift md:mt-12">
              <img src={interior3} alt="Prayer hall with bookshelves" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/5] overflow-hidden hover-lift">
              <img src={interior2} alt="Minbar and prayer area" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Vision: from here, to here ──────────────────── */}
      <section id="vision" className="bg-ink text-paper py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5" style={{
          background: 'linear-gradient(to right, var(--wine-deep), var(--wine), var(--wine-deep))'
        }} />

        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className={`text-4xl uppercase text-brass-light mb-4 ${isRTL ? 'tracking-normal' : 'tracking-[0.25em]'}`}>{s.visionLabel}</div>
          <h2 className={`${isRTL ? 'font-arabic text-2xl sm:text-2xl leading-tight' : 'font-display text-5xl sm:text-6xl lg:text-7xl'} font-light leading-[0.95] mb-6 max-w-4xl`}>
            {s.visionTitle}
          </h2>
          <p className={`max-w-2xl text-paper/70 leading-relaxed mb-16 ${isRTL ? 'font-arabic text-xl' : 'text-base sm:text-lg'}`}>
            {s.visionBody}
          </p>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 mb-16">
            <div className="group">
              <div className="aspect-[4/3] bg-cream overflow-hidden border border-stone/30 hover-lift">
                <img src={exteriorCurrent} alt="Current building" className="w-full h-full object-cover" />
              </div>
              <div className="mt-5 flex items-baseline gap-4">
                <span className={`text-4xl uppercase text-brass-light ${isRTL ? 'tracking-normal' : 'tracking-[0.3em]'}`}>{s.presentLabel}</span>
                <span className="h-px flex-1 bg-stone/30 mt-1" />
                <span className="text text-paper/50 tabular-nums">{new Date().getFullYear()}</span>
              </div>
              <p className={`mt-3 text text-paper/70 ${isRTL ? 'font-arabic text-base' : ''}`}>{s.presentCaption}</p>
            </div>

            <div className="group">
              <div className="aspect-[4/3] bg-cream overflow-hidden border border-brass/40 hover-lift relative">
                <img src={model4} alt="Future renovated facade — architectural model" className="w-full h-full object-cover" />
                <div className={`absolute bottom-3 right-3 text-[10px] uppercase bg-ink/80 text-brass-light px-2.5 py-1 backdrop-blur-sm ${isRTL ? 'tracking-normal font-arabic' : 'tracking-[0.2em]'}`}>
                  إن شاء الله
                </div>
              </div>
              <div className="mt-5 flex items-baseline gap-4">
                <span className={`text-4xl uppercase text-brass-light ${isRTL ? 'tracking-normal' : 'tracking-[0.3em]'}`}>{s.futureLabel}</span>
                <span className="h-px flex-1 bg-brass/40 mt-1" />
                <span className="text text-brass-light/70 tabular-nums">{s.soon}</span>
              </div>
              <p className={`mt-3 text text-paper/70 ${isRTL ? 'font-arabic text-base' : ''}`}>{s.futureCaption}</p>
            </div>
          </div>

          <div>
            <div className={`text-l uppercase text-brass-light mb-5 ${isRTL ? 'tracking-normal' : 'tracking-[0.3em]'}`}>{s.modelCaption}</div>
            <div className="grid grid-cols-3 gap-3 sm:gap-5">
              <div className="aspect-square overflow-hidden bg-cream/10 hover-lift">
                <img src={model1} alt="Architectural model — front" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square overflow-hidden bg-cream/10 hover-lift">
                <img src={model2} alt="Architectural model — three-quarter view" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square overflow-hidden bg-cream/10 hover-lift">
                <img src={model3} alt="Architectural model — heritage facade" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services ────────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-cream dark:bg-wine-deep/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="mb-16">
            <div className={`text-4xl uppercase text-wine dark:text-brass-light mb-4 ${isRTL ? 'tracking-normal' : 'tracking-[0.25em]'}`}>{s.servicesLabel}</div>
            <h2 className={`${isRTL ? 'font-arabic text-2xl sm:text-2xl' : 'font-display text-5xl sm:text-6xl lg:text-7xl'} font-light leading-[0.95] max-w-3xl text-ink dark:text-paper`}>
              {s.servicesTitle}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-stone/30 dark:bg-stone/20 border border-stone/30 dark:border-stone/20">
            {[
              { icon: Clock,     title: s.s1Title, body: s.s1Body },
              { icon: BookOpen,  title: s.s2Title, body: s.s2Body },
              { icon: Sparkles,  title: s.s3Title, body: s.s3Body },
              { icon: Users,     title: s.s4Title, body: s.s4Body },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-paper dark:bg-ink p-8 sm:p-10 hover:bg-paper/70 dark:hover:bg-wine-deep/30 transition-colors">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-full border border-wine/30 dark:border-brass/30 flex items-center justify-center text-wine dark:text-brass-light">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <span className="font-display italic text-stone dark:text-brass-light/60 text-sm tabular-nums">0{i + 1}</span>
                  </div>
                  <h3 className={`${isRTL ? 'font-arabic text-2xl lg:text-3xl' : 'font-display text-2xl'} font-medium mb-3 text-ink dark:text-paper`}>{item.title}</h3>
                  <p className={`text text-ink/70 dark:text leading-relaxed ${isRTL ? 'font-arabic text' : ''}`}>{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Visit ───────────────────────────────────────── */}
      <section id="visit" className="py-24 sm:py-32 grain">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <div className={`text-4xl uppercase text-wine dark:text-brass-light mb-4 ${isRTL ? 'tracking-normal' : 'tracking-[0.25em]'}`}>{s.visitLabel}</div>
              <h2 className={`${isRTL ? 'font-arabic text-2xl sm:text-2xl' : 'font-display text-5xl sm:text-6xl'} font-light leading-[0.95] mb-6 text-ink dark:text-paper`}>
                {s.visitTitle}
              </h2>
              <p className={`text-ink/75 dark:text-paper/75 leading-relaxed mb-8 ${isRTL ? 'font-arabic text-lg' : 'text-sm sm:text-base'}`}>
                {s.visitBody}
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-wine dark:bg-brass-light text-paper dark:text-ink flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.25em] uppercase text-stone dark:text-brass-light/70 mb-1">Address</div>
                    <div className={`${isRTL ? 'font-arabic text-lg' : 'font-display text-lg'} font-medium text-ink dark:text-paper`}>{s.address}</div>
                    <div className="text-sm text-ink/70 dark:text-paper/60">{s.city}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border border-wine/40 dark:border-brass/40 text-wine dark:text-brass-light flex items-center justify-center flex-shrink-0">
                    <Phone size={14} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className={`text uppercase text-stone dark:text-brass-light/70 mb-1 ${isRTL ? 'tracking-normal' : 'tracking-[0.25em]'}`}>{s.callUs}</div>
                    <a href="tel:+32485580870" className="block text-sm hover:text-wine dark:hover:text-brass-light dark:text-paper/80 transition-colors tabular-nums" dir="ltr">+32 485 58 08 70</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border border-wine/40 dark:border-brass/40 text-wine dark:text-brass-light flex items-center justify-center flex-shrink-0">
                    <Mail size={14} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase text-stone dark:text-brass-light/70 mb-1 ${isRTL ? 'tracking-normal' : 'tracking-[0.25em]'}`}>{s.emailUs}</div>
                    <a href="mailto:salahaddinmoskee@outlook.com" className="text-sm hover:text-wine dark:hover:text-brass-light dark:text-paper/80 transition-colors" dir="ltr">salahaddinmoskee@outlook.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border border-wine/40 dark:border-brass/40 text-wine dark:text-brass-light flex items-center justify-center flex-shrink-0">
                    <Instagram size={14} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className={`text uppercase text-stone dark:text-brass-light/70 mb-1 ${isRTL ? 'tracking-normal' : 'tracking-[0.25em]'}`}>{s.followUs}</div>
                    <div className="flex gap-4 text-sm" dir="ltr">
                      <a href="https://www.instagram.com/masjidsalahaddien/" target="_blank" rel="noreferrer" className="hover:text-wine dark:hover:text-brass-light dark:text-paper/80 transition-colors border-b border-ink/30 dark:border-paper/30 hover:border-wine dark:hover:border-brass-light pb-0.5">Instagram</a>
                      <a href="https://www.tiktok.com/@masjidsalahaddien" target="_blank" rel="noreferrer" className="hover:text-wine dark:hover:text-brass-light dark:text-paper/80 transition-colors border-b border-ink/30 dark:border-paper/30 hover:border-wine dark:hover:border-brass-light pb-0.5">TikTok</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="aspect-[4/3] lg:aspect-square w-full bg-cream border border-stone/30 overflow-hidden relative">
                <iframe
                  title="Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=3.7335,51.0530,3.7395,51.0570&layer=mapnik&marker=51.0550,3.7365"
                  className="w-full h-full"
                  style={{ border: 0, filter: 'grayscale(0.4) sepia(0.1)' }}
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-ink text-paper px-3 py-2 text-[10px] tracking-[0.2em] uppercase">
                  Antwerpsesteenweg 24
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Support / Donate ────────────────────────────── */}
      <section id="support" className="bg-wine text-paper py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)
          `
        }} />

        <div className="max-w-5xl mx-auto px-5 sm:px-8 relative">
          <div className={`text-4xl uppercase text-brass-light mb-4 ${isRTL ? 'tracking-normal' : 'tracking-[0.25em]'}`}>{s.supportLabel}</div>
          <h2 className={`${isRTL ? 'font-arabic text-2xl sm:text-2xl leading-tight' : 'font-display text-5xl sm:text-6xl lg:text-7xl italic'} font-light leading-[0.95] mb-8 max-w-3xl`}>
            {s.supportTitle}
          </h2>
          <p className={`max-w-2xl text-paper/85 leading-relaxed mb-12 ${isRTL ? 'font-arabic text-xl' : 'text-base sm:text-lg'}`}>
            {s.supportBody}
          </p>

          <div className="grid sm:grid-cols-3 gap-px bg-brass/30 border border-brass/30 mb-10">
            <div className="bg-wine-deep p-6">
              <div className={`text-l uppercase text-brass-light mb-2 ${isRTL ? 'tracking-normal' : 'tracking-[0.25em]'}`}>{s.bankName}</div>
              <div className={`text-sm ${isRTL ? 'font-arabic text-base' : ''}`}>{s.bankNameValue}</div>
            </div>
            <div className="bg-wine-deep p-6">
              <div className={`text-l uppercase text-brass-light mb-2 ${isRTL ? 'tracking-normal' : 'tracking-[0.25em]'}`}>{s.iban}</div>
              <div className="text-sm font-mono tabular-nums" dir="ltr">{s.ibanValue}</div>
            </div>
            <div className="bg-wine-deep p-6">
              <div className={`text-l uppercase text-brass-light mb-2 ${isRTL ? 'tracking-normal' : 'tracking-[0.25em]'}`}>{s.reference}</div>
              <div className={`text-sm ${isRTL ? 'font-arabic text-base' : ''}`}>{s.referenceValue}</div>
            </div>
          </div>

          <a href="https://pay.sumup.com/b2c/QITM41JB" target='_blank' rel="noreferrer" className="inline-flex items-center gap-2 bg-paper text-ink px-8 py-4 text tracking-wide hover:bg-brass-light transition-colors group">
            <Heart size={16} className="text-wine" />
            {s.donateButton}
            <ArrowUpRight size={16} className={`group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${isRTL ? 'rtl-flip' : ''}`} />
          </a>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────── */}
      <footer className="bg-ink text-paper py-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex justify-center mb-8 text-brass">
            <ArabesqueDivider className="w-48 h-6" />
          </div>
          <div className="text-center">
            <img src={logo} alt="Logo" className="w-14 h-14 mx-auto mb-4 opacity-90" />
            <div className={`${isRTL ? 'font-arabic text-2xl lg:text-3xl' : 'font-display text-2xl italic'} font-light mb-2`}>
              {s.nameLine1} {s.nameLine2}
            </div>
            <div className="text text-paper/50 tracking-wide mb-6">{s.footerLine}</div>
            <div className="flex justify-center items-center gap-6 text text-paper/40">
              <span>{s.footerRights}</span>
              <span className="w-1 h-1 rounded-full bg-brass" />
              <a href="https://www.instagram.com/masjidsalahaddien/" target="_blank" rel="noreferrer" className="hover:text-brass-light transition-colors">@masjidsalahaddien</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Mawaqit Embed ─────────────────────────────────────
function MawaqitEmbed() {
  return (
    <div style={{ position: 'relative', paddingTop: '56.25%' }}>
      <iframe
        title="Mawaqit"
        src="https://mawaqit.net/en/m/moskee-salahaddien-gent-9000-belgium"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0,
        }}
        loading="lazy"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-forms"
      />
    </div>
  );
}