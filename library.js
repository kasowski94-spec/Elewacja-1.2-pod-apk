// ═══════════════════════════════════════════════════════════
// ElewacjaPro — Biblioteka materiałów i robocizny
// Dane orientacyjne, maj 2026, na podstawie cenników rynkowych
// ═══════════════════════════════════════════════════════════

// Data aktualizacji cennika bazowego
const LIBRARY_DATE = '2026-05-18';

// ─── BIBLIOTEKA MATERIAŁÓW ────────────────────────────────
// cena = średnia rynkowa | low = najniższa | high = najwyższa
// unit: m2, mb, szt, kg, l, worek, m3, ark
const MATERIAL_LIBRARY = [
  // ── STYROPIAN EPS ──
  {id:'eps_b_038_15',cat:'styropian',name:'Styropian EPS 70-038 biały 15cm',unit:'m²',low:24,avg:27,high:30,lambda:0.038,note:'standard fasadowy'},
  {id:'eps_b_040_15',cat:'styropian',name:'Styropian EPS 70-040 biały 15cm',unit:'m²',low:22,avg:25,high:28,lambda:0.040,note:'ekonomiczny'},
  {id:'eps_g_033_15',cat:'styropian',name:'Styropian grafitowy 033 15cm',unit:'m²',low:28,avg:32,high:36,lambda:0.033,note:'Lambda Plus'},
  {id:'eps_g_031_15',cat:'styropian',name:'Styropian grafitowy 031 premium 15cm',unit:'m²',low:33,avg:36,high:40,lambda:0.031,note:'Lambda White/Max'},
  {id:'eps_b_038_10',cat:'styropian',name:'Styropian EPS 70-038 biały 10cm',unit:'m²',low:16,avg:19,high:22,lambda:0.038,note:''},
  {id:'eps_g_033_10',cat:'styropian',name:'Styropian grafitowy 033 10cm',unit:'m²',low:20,avg:23,high:26,lambda:0.033,note:''},
  {id:'eps_b_038_20',cat:'styropian',name:'Styropian EPS 70-038 biały 20cm',unit:'m²',low:32,avg:36,high:40,lambda:0.038,note:''},
  {id:'eps_g_033_20',cat:'styropian',name:'Styropian grafitowy 033 20cm',unit:'m²',low:38,avg:43,high:48,lambda:0.033,note:''},
  {id:'wm_fasada_15',cat:'styropian',name:'Wełna mineralna fasadowa 15cm',unit:'m²',low:55,avg:68,high:85,lambda:0.036,note:'niepalna, paroprzep.'},

  // ── KLEJE I MASY ──
  {id:'klej_eps_25',cat:'kleje',name:'Klej do styropianu 25kg',unit:'worek',low:38,avg:45,high:55,note:'~5m² warstwy / worek'},
  {id:'klej_siatka_25',cat:'kleje',name:'Klej do siatki zbrojącej 25kg',unit:'worek',low:42,avg:50,high:62,note:'~3m² warstwy zbrojnej'},
  {id:'klej_uniw_25',cat:'kleje',name:'Klej uniwersalny EPS+siatka 25kg',unit:'worek',low:40,avg:48,high:58,note:'2w1'},
  {id:'klej_grafit_25',cat:'kleje',name:'Klej do styropianu grafitowego 25kg',unit:'worek',low:48,avg:56,high:68,note:'np. Sempre TU200'},
  {id:'zaprawa_naprawcza',cat:'kleje',name:'Zaprawa naprawcza/wyrównawcza 25kg',unit:'worek',low:30,avg:38,high:48,note:'ubytki podłoża'},

  // ── SIATKI ──
  {id:'siatka_145',cat:'siatki',name:'Siatka zbrojąca 145 g/m²',unit:'m²',low:2.8,avg:3.5,high:4.8,note:'standard ETICS'},
  {id:'siatka_160',cat:'siatki',name:'Siatka zbrojąca 160 g/m²',unit:'m²',low:3.4,avg:4.2,high:5.5,note:'wzmocniona'},
  {id:'siatka_panc',cat:'siatki',name:'Siatka pancerna 330 g/m²',unit:'m²',low:8,avg:11,high:15,note:'parter, cokół'},

  // ── TYNKI ──
  {id:'tynk_sil_15',cat:'tynki',name:'Tynk silikonowy 1,5mm 25kg',unit:'worek',low:115,avg:145,high:185,note:'~3,2 kg/m²'},
  {id:'tynk_sil_20',cat:'tynki',name:'Tynk silikonowy 2,0mm 25kg',unit:'worek',low:120,avg:150,high:190,note:'~4,0 kg/m²'},
  {id:'tynk_silikat_15',cat:'tynki',name:'Tynk silikatowy 1,5mm 25kg',unit:'worek',low:95,avg:120,high:155,note:'~3,0 kg/m²'},
  {id:'tynk_min_20',cat:'tynki',name:'Tynk mineralny 2,0mm 25kg',unit:'worek',low:55,avg:72,high:95,note:'~3,8 kg/m², do malowania'},
  {id:'tynk_akryl_15',cat:'tynki',name:'Tynk akrylowy 1,5mm 25kg',unit:'worek',low:90,avg:115,high:150,note:'~2,8 kg/m²'},
  {id:'tynk_mozaika',cat:'tynki',name:'Tynk mozaikowy 25kg',unit:'worek',low:140,avg:175,high:230,note:'cokół'},

  // ── GRUNTY I FARBY ──
  {id:'grunt_tynk',cat:'grunty',name:'Grunt podtynkowy (pod tynk) 5l',unit:'szt',low:45,avg:58,high:75,note:'~0,15 l/m²'},
  {id:'grunt_gleb',cat:'grunty',name:'Grunt głębokopenetrujący 5l',unit:'szt',low:35,avg:48,high:62,note:'gruntowanie podłoża'},
  {id:'grunt_szczep',cat:'grunty',name:'Grunt sczepny / kontaktowy 5l',unit:'szt',low:55,avg:72,high:95,note:'podłoża gładkie'},
  {id:'farba_silik',cat:'grunty',name:'Farba elewacyjna silikonowa 10l',unit:'szt',low:140,avg:180,high:240,note:'~0,15 l/m²/warstwa'},
  {id:'farba_akryl',cat:'grunty',name:'Farba elewacyjna akrylowa 10l',unit:'szt',low:95,avg:130,high:175,note:''},

  // ── ŁĄCZNIKI / KOŁKI ──
  {id:'kolek_pcv_90',cat:'laczniki',name:'Łącznik wbijany trzpień PCV 90mm',unit:'szt',low:0.32,avg:0.42,high:0.58,note:'EPS do 4cm'},
  {id:'kolek_pcv_120',cat:'laczniki',name:'Łącznik wbijany trzpień PCV 120mm',unit:'szt',low:0.42,avg:0.55,high:0.72,note:'EPS 6-7cm'},
  {id:'kolek_pcv_140',cat:'laczniki',name:'Łącznik wbijany trzpień PCV 140mm',unit:'szt',low:0.48,avg:0.62,high:0.82,note:'EPS 8-9cm'},
  {id:'kolek_pcv_160',cat:'laczniki',name:'Łącznik wbijany trzpień PCV 160mm',unit:'szt',low:0.55,avg:0.70,high:0.92,note:'EPS 10-11cm'},
  {id:'kolek_pcv_180',cat:'laczniki',name:'Łącznik wbijany trzpień PCV 180mm',unit:'szt',low:0.62,avg:0.80,high:1.05,note:'EPS 12cm'},
  {id:'kolek_pcv_200',cat:'laczniki',name:'Łącznik wbijany trzpień PCV 200mm',unit:'szt',low:0.70,avg:0.90,high:1.18,note:'EPS 14-15cm'},
  {id:'kolek_pcv_220',cat:'laczniki',name:'Łącznik wbijany trzpień PCV 220mm',unit:'szt',low:0.80,avg:1.02,high:1.32,note:'EPS 16cm'},
  {id:'kolek_pcv_260',cat:'laczniki',name:'Łącznik wbijany trzpień PCV 260mm',unit:'szt',low:0.95,avg:1.22,high:1.58,note:'EPS 20cm'},
  {id:'kolek_met_160',cat:'laczniki',name:'Łącznik wkręcany trzpień metalowy 160mm',unit:'szt',low:0.85,avg:1.10,high:1.45,note:'EPS 10cm, wełna'},
  {id:'kolek_met_200',cat:'laczniki',name:'Łącznik wkręcany trzpień metalowy 200mm',unit:'szt',low:1.05,avg:1.35,high:1.75,note:'EPS 15cm, wełna'},
  {id:'kolek_met_240',cat:'laczniki',name:'Łącznik wkręcany trzpień metalowy 240mm',unit:'szt',low:1.30,avg:1.65,high:2.10,note:'EPS 18-20cm'},
  {id:'kolek_termo_200',cat:'laczniki',name:'Łącznik z wkładką termiczną 200mm',unit:'szt',low:1.20,avg:1.50,high:1.95,note:'bez mostków, EPS 15cm'},
  {id:'kolek_termo_240',cat:'laczniki',name:'Łącznik z wkładką termiczną 240mm',unit:'szt',low:1.45,avg:1.80,high:2.30,note:'bez mostków, EPS 20cm'},

  // ── ZAŚLEPKI ──
  {id:'zasl_eps_b',cat:'zaslepki',name:'Zaślepka styropianowa biała Ø60mm',unit:'szt',low:0.12,avg:0.18,high:0.28,note:'maskuje łącznik'},
  {id:'zasl_eps_g',cat:'zaslepki',name:'Zaślepka styropianowa grafitowa Ø60mm',unit:'szt',low:0.15,avg:0.22,high:0.32,note:'do EPS grafitowego'},
  {id:'zasl_welna',cat:'zaslepki',name:'Zaślepka z wełny mineralnej Ø60mm',unit:'szt',low:0.18,avg:0.26,high:0.38,note:'niepalna'},
  {id:'zasl_eps_90',cat:'zaslepki',name:'Zaślepka styropianowa Ø90mm',unit:'szt',low:0.22,avg:0.32,high:0.45,note:'do talerzyka pow.'},

  // ── PROFILE I LISTWY ──
  {id:'listwa_start',cat:'profile',name:'Listwa startowa aluminiowa 2m',unit:'szt',low:7,avg:9,high:13,note:'cokół'},
  {id:'narozn_pcv',cat:'profile',name:'Narożnik PVC z siatką 2,5m',unit:'szt',low:2.5,avg:3.5,high:5,note:'ochrona naroży'},
  {id:'narozn_alu',cat:'profile',name:'Narożnik aluminiowy z siatką 2,5m',unit:'szt',low:5,avg:7,high:10,note:'wytrzymały'},
  {id:'narozn_kapinos',cat:'profile',name:'Narożnik z kapinosem (okapnik) 2m',unit:'szt',low:8,avg:11,high:15,note:'odprowadza wodę'},
  {id:'listwa_okienna',cat:'profile',name:'Listwa przyokienna z uszczelką 2,4m',unit:'szt',low:9,avg:13,high:18,note:'dylatacja okna'},
  {id:'profil_dylat',cat:'profile',name:'Profil dylatacyjny PVC 2,5m',unit:'szt',low:12,avg:17,high:24,note:'szczeliny dylatacyjne'},
  {id:'listwa_kapinos',cat:'profile',name:'Listwa okapnikowa 2m',unit:'szt',low:7,avg:10,high:14,note:'gzymsy, parapety'},

  // ── TAŚMY I FOLIE ──
  {id:'tasma_uszcz',cat:'tasmy',name:'Taśma uszczelniająca okienna rozprężna 8m',unit:'szt',low:22,avg:30,high:42,note:'styk okno-EPS'},
  {id:'tasma_rozpr',cat:'tasmy',name:'Taśma rozprężna paroizolacyjna 8m',unit:'szt',low:35,avg:48,high:65,note:'pod parapet'},
  {id:'tasma_elew',cat:'tasmy',name:'Taśma elewacyjna ochronna 50m',unit:'szt',low:14,avg:20,high:28,note:'krawędzie EPS'},
  {id:'tasma_malar',cat:'tasmy',name:'Taśma malarska 50m',unit:'szt',low:6,avg:9,high:14,note:'maskowanie'},
  {id:'folia_okno',cat:'tasmy',name:'Folia ochronna na okna samoprzylepna',unit:'szt',low:3,avg:4.5,high:7,note:'ochrona szyb'},
  {id:'folia_malar',cat:'tasmy',name:'Folia malarska ochronna 4×5m',unit:'szt',low:8,avg:12,high:18,note:'zabezpieczenie'},

  // ── PIANKI ──
  {id:'piana_nisko',cat:'pianki',name:'Pianka niskoprężna do okien 750ml',unit:'szt',low:14,avg:19,high:26,note:'okna, EPS'},
  {id:'piana_uniw',cat:'pianki',name:'Pianka montażowa uniwersalna 750ml',unit:'szt',low:10,avg:14,high:20,note:'ogólnego stos.'},
  {id:'piana_pist',cat:'pianki',name:'Pianka pistoletowa PRO 750ml',unit:'szt',low:16,avg:22,high:30,note:'precyzyjna'},
  {id:'klej_piana',cat:'pianki',name:'Klej-piana do styropianu 750ml',unit:'szt',low:18,avg:24,high:32,note:'klejenie płyt EPS'},
  {id:'piana_ogn',cat:'pianki',name:'Pianka ognioodporna B1 750ml',unit:'szt',low:24,avg:32,high:44,note:'p.poż'},

  // ── PARAPETY / BLACHA ──
  {id:'blacha_ocynk',cat:'parapety',name:'Arkusz blachy ocynkowanej 1×2m 0,55mm',unit:'ark',low:55,avg:72,high:95,note:'2 m² / arkusz'},
  {id:'blacha_powlek',cat:'parapety',name:'Arkusz blachy powlekanej 1×2m 0,5mm',unit:'ark',low:75,avg:98,high:130,note:'kolor, 2 m²'},
  {id:'blacha_tytan',cat:'parapety',name:'Arkusz blachy tytan-cynk 1×2m 0,7mm',unit:'ark',low:180,avg:230,high:300,note:'premium, 2 m²'},
  {id:'parapet_pcv',cat:'parapety',name:'Parapet zewnętrzny PVC 1mb',unit:'mb',low:18,avg:26,high:38,note:'gotowy'},
  {id:'parapet_alu',cat:'parapety',name:'Parapet zewnętrzny aluminiowy 1mb',unit:'mb',low:28,avg:40,high:58,note:'gotowy, anodowany'},
];

// ─── BIBLIOTEKA ROBOCIZNY ─────────────────────────────────
const LABOR_LIBRARY = [
  // ── PRZYGOTOWANIE ──
  {id:'rob_skucie',cat:'przygotowanie',name:'Skucie starego tynku',unit:'m²',low:12,avg:18,high:28,note:'z wyniesieniem gruzu'},
  {id:'rob_mycie',cat:'przygotowanie',name:'Mycie ciśnieniowe elewacji',unit:'m²',low:5,avg:8,high:13,note:'przed ociepleniem'},
  {id:'rob_grunt',cat:'przygotowanie',name:'Gruntowanie podłoża',unit:'m²',low:4,avg:6,high:10,note:''},
  {id:'rob_odgrzyb',cat:'przygotowanie',name:'Odgrzybianie / biocyd',unit:'m²',low:6,avg:9,high:15,note:'usuwanie glonów'},
  {id:'rob_wyrown',cat:'przygotowanie',name:'Wyrównanie ubytków ściany',unit:'m²',low:8,avg:14,high:25,note:'zaprawa naprawcza'},
  {id:'rob_demont_par',cat:'przygotowanie',name:'Demontaż starych parapetów',unit:'szt',low:10,avg:15,high:25,note:''},

  // ── MONTAŻ OCIEPLENIA ──
  {id:'rob_klej_eps',cat:'ocieplenie',name:'Klejenie styropianu',unit:'m²',low:18,avg:25,high:35,note:'sam montaż płyt'},
  {id:'rob_kolk',cat:'ocieplenie',name:'Kołkowanie styropianu',unit:'m²',low:6,avg:9,high:14,note:'osadzanie łączników'},
  {id:'rob_siatka',cat:'ocieplenie',name:'Zatapianie siatki (warstwa zbrojna)',unit:'m²',low:15,avg:20,high:28,note:'z klejem'},
  {id:'rob_eps_komplet',cat:'ocieplenie',name:'Ocieplenie kompletne (klej+kołki+siatka)',unit:'m²',low:35,avg:48,high:65,note:'bez tynku'},
  {id:'rob_welna',cat:'ocieplenie',name:'Montaż wełny mineralnej (komplet)',unit:'m²',low:55,avg:75,high:100,note:'cięższy montaż'},
  {id:'rob_szlif',cat:'ocieplenie',name:'Szlifowanie styropianu',unit:'m²',low:4,avg:7,high:12,note:'wyrównanie płaszczyzny'},

  // ── WYKOŃCZENIE ──
  {id:'rob_tynk',cat:'wykonczenie',name:'Tynkowanie cienkowarstwowe',unit:'m²',low:25,avg:38,high:55,note:'nakładanie + zacieranie'},
  {id:'rob_tynk_mozaika',cat:'wykonczenie',name:'Tynk mozaikowy (cokół)',unit:'m²',low:30,avg:45,high:65,note:''},
  {id:'rob_malow',cat:'wykonczenie',name:'Malowanie elewacji',unit:'m²',low:10,avg:16,high:25,note:'1-2 warstwy'},
  {id:'rob_gruntu_tynk',cat:'wykonczenie',name:'Gruntowanie pod tynk',unit:'m²',low:3,avg:5,high:8,note:''},

  // ── KOMPLEKSOWE ──
  {id:'rob_komplet_styro',cat:'kompleksowe',name:'Ocieplenie + tynk (komplet styropian)',unit:'m²',low:75,avg:100,high:140,note:'pełen zakres ETICS'},
  {id:'rob_komplet_welna',cat:'kompleksowe',name:'Ocieplenie + tynk (komplet wełna)',unit:'m²',low:100,avg:130,high:170,note:'pełen zakres'},

  // ── DETALE I OBRÓBKI ──
  {id:'rob_parapet_mont',cat:'detale',name:'Montaż parapetu zewnętrznego',unit:'szt',low:20,avg:30,high:50,note:''},
  {id:'rob_oscieza',cat:'detale',name:'Obrobienie ościeży okiennych',unit:'mb',low:15,avg:25,high:40,note:'docieplenie wokół okna'},
  {id:'rob_naroznik',cat:'detale',name:'Montaż narożników i listew',unit:'mb',low:5,avg:8,high:14,note:''},
  {id:'rob_dylatacja',cat:'detale',name:'Wykonanie dylatacji',unit:'mb',low:10,avg:16,high:25,note:''},
  {id:'rob_giecie',cat:'detale',name:'Gięcie blachy (parapet/obróbka)',unit:'szt',low:3,avg:5,high:9,note:'za 1 gięcie'},
  {id:'rob_ciecie',cat:'detale',name:'Cięcie blachy',unit:'szt',low:2,avg:4,high:7,note:'za 1 cięcie'},
  {id:'rob_obrobka_bl',cat:'detale',name:'Montaż obróbek blacharskich',unit:'mb',low:18,avg:28,high:45,note:'ogniomury, attyki'},

  // ── RUSZTOWANIE ──
  {id:'rob_rusz_mont',cat:'rusztowanie',name:'Montaż + demontaż rusztowania',unit:'m²',low:8,avg:12,high:20,note:'jednorazowo'},
  {id:'rob_rusz_dzierz',cat:'rusztowanie',name:'Dzierżawa rusztowania (miesiąc)',unit:'m²',low:5,avg:8,high:14,note:'za m²/miesiąc'},
];

// Kategorie do wyświetlania
const MAT_CATEGORIES = {
  styropian:'Styropian / izolacja',
  kleje:'Kleje i masy',
  siatki:'Siatki zbrojące',
  tynki:'Tynki elewacyjne',
  grunty:'Grunty i farby',
  laczniki:'Łączniki / kołki',
  zaslepki:'Zaślepki łączników',
  profile:'Profile i listwy',
  tasmy:'Taśmy i folie',
  pianki:'Pianki montażowe',
  parapety:'Parapety i blacha',
};
const LABOR_CATEGORIES = {
  przygotowanie:'Prace przygotowawcze',
  ocieplenie:'Montaż ocieplenia',
  wykonczenie:'Wykończenie / tynk',
  kompleksowe:'Usługi kompleksowe',
  detale:'Detale i obróbki',
  rusztowanie:'Rusztowanie',
};

// Lista najczęściej potrzebnych rzeczy do kompleksowej elewacji
const COMMON_ITEMS = [
  'Styropian elewacyjny','Klej do styropianu','Klej do siatki','Siatka zbrojąca',
  'Łączniki / kołki','Zaślepki łączników','Listwa startowa','Narożniki PVC',
  'Listwa przyokienna','Grunt podtynkowy','Tynk elewacyjny','Farba elewacyjna',
  'Taśma uszczelniająca','Taśma rozprężna','Pianka montażowa','Folia ochronna',
  'Parapety zewnętrzne','Profil dylatacyjny','Siatka pancerna (cokół)',
  'Zaprawa wyrównawcza','Narożnik z kapinosem','Grunt głębokopenetrujący',
  'Rusztowanie elewacyjne','Wkręty / kotwy','Worek na gruz','Folia malarska',
];
