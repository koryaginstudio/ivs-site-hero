// Наполнение — с текущего сайта ivs-corp.ru (меню, слайды, направления). Меняется дизайн, не контент.

export const phone = { label: "+7 (342) 238-52-00", href: "tel:+73422385200", city: "Пермь" };

export type NavLink = { label: string; href: string; external?: boolean };
export type NavGroup = { label: string; href: string; items: NavLink[] };
export type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "menu"; label: string; href: string; items: NavLink[] }
  | { kind: "mega"; label: string; href: string; groups: NavGroup[] };

const S = "https://ivs-corp.ru/services/";

export const nav: NavItem[] = [
  {
    kind: "menu",
    label: "Компания",
    href: "https://ivs-corp.ru/company/",
    items: [
      { label: "О компании", href: "https://ivs-corp.ru/company/" },
      { label: "Лицензии", href: "https://ivs-corp.ru/company/licenses/" },
      { label: "Партнёры", href: "https://ivs-corp.ru/company/partners/" },
      { label: "Отзывы", href: "https://ivs-corp.ru/company/reviews/" },
      { label: "Вакансии", href: "https://ivs-corp.ru/company/vacancy/" },
      { label: "Реквизиты", href: "https://ivs-corp.ru/company/requisites/" },
    ],
  },
  {
    kind: "mega",
    label: "Услуги",
    href: S,
    groups: [
      {
        label: "Комплексные проекты строительства",
        href: S + "kompleksnye-proekty-stroitelstva/",
        items: [
          { label: "ЦОД и коммутационные центры", href: S + "kompleksnye-proekty-stroitelstva/tsod-i-kommutatsionnye-tsentry/" },
          { label: "Комплексные системы безопасности", href: S + "kompleksnye-proekty-stroitelstva/kompleksnye-sistemy-bezopasnosti/" },
          { label: "Услуги генерального подрядчика", href: S + "kompleksnye-proekty-stroitelstva/uslugi-generalnogo-podryadchika/" },
        ],
      },
      {
        label: "Разработка и внедрение ПО",
        href: S + "razrabotka-i-vnedrenie-po/",
        items: [
          { label: "Разработка заказного ПО", href: S + "razrabotka-i-vnedrenie-po/razrabotka-zakaznogo-po/" },
          { label: "Автоматизация бизнес-процессов и документооборота", href: S + "razrabotka-i-vnedrenie-po/avtomatizatsiya-biznes-protsessov-i-dokumentooborota/" },
          { label: "Техническая поддержка и сопровождение пользователей корпоративных информационных систем", href: S + "razrabotka-i-vnedrenie-po/tekhnicheskaya-podderzhka-i-soprovozhdenie-polzovateley-korporativnykh-informatsionnykh-sistem/" },
          { label: "Внедрение решений на базе продуктов 1С", href: S + "razrabotka-i-vnedrenie-po/vnedrenie-resheniy-na-baze-produktov-1s/" },
        ],
      },
      {
        label: "ИТ-инфраструктура и базовый сервис",
        href: S + "it-infrastruktura-i-bazovyy-servis/",
        items: [
          { label: "Проектирование, создание и запуск вычислительной инфраструктуры заказчика", href: S + "it-infrastruktura-i-bazovyy-servis/proektirovanie-sozdanie-i-zapusk-vychislitelnoy-infrastruktury-zakazchika/" },
          { label: "Организация базовых ИТ-сервисов (электронная почта, интернет, ЛВС, сервис печати), в том числе на российском ПО", href: S + "it-infrastruktura-i-bazovyy-servis/organizatsiya-bazovykh-it-servisov-elektronnaya-pochta-internet-lvs-servis-pechati/" },
          { label: "Обслуживание рабочих мест и периферии", href: S + "it-infrastruktura-i-bazovyy-servis/obsluzhivanie-rabochikh-mest-i-periferii/" },
        ],
      },
      {
        label: "Информационная безопасность",
        href: S + "informatsionnaya-bezopasnost/",
        items: [
          { label: "Аудит информационной безопасности вычислительной инфраструктуры", href: S + "informatsionnaya-bezopasnost/audit-informatsionnoy-bezopasnosti-vychislitelnoy-infrastruktury-new/" },
          { label: "Проектирование и внедрение системы защиты информации", href: S + "informatsionnaya-bezopasnost/proektirovanie-i-vnedrenie-sistemy-zashchity-informatsii/" },
          { label: "Защита критической информационной инфраструктуры", href: S + "informatsionnaya-bezopasnost/zashchita-kriticheskoy-informatsionnoy-infrastruktury/" },
          { label: "Защита персональных данных", href: S + "informatsionnaya-bezopasnost/zashchita-personalnykh-dannykh/" },
          { label: "Поставка, установка, настройка, администрирование средств обеспечения информационной безопасности", href: S + "informatsionnaya-bezopasnost/postavka-ustanovka-nastroyka-administrirovanie-sredstv-obespecheniya-informatsionnoy-bezopasnosti/" },
          { label: "Kaspersky Unified Monitoring and Analysis Platform", href: S + "informatsionnaya-bezopasnost/kaspersky-unified-monitoring-and-analysis-platform/" },
          { label: "Kaspersky Industrial CyberSecurity", href: S + "informatsionnaya-bezopasnost/kaspersky-industrial-cybersecurity/" },
        ],
      },
      {
        label: "Телекоммуникационные системы и сети",
        href: S + "telekommunikatsionnye-sistemy-i-seti/",
        items: [
          { label: "Корпоративные сети передачи данных, беспроводные сети и ВОЛС", href: S + "telekommunikatsionnye-sistemy-i-seti/korporativnye-seti-peredachi-dannykh-besprovodnye-seti-i-vols/" },
          { label: "Учрежденческие автоматические станции телефонной связи", href: S + "telekommunikatsionnye-sistemy-i-seti/uchrezhdencheskie-avtomaticheskie-stantsii-telefonnoy-svyazi/" },
          { label: "Системы цифровой радиосвязи", href: S + "telekommunikatsionnye-sistemy-i-seti/sistemy-tsifrovoy-radiosvyazi/" },
        ],
      },
      {
        label: "Инженерные системы зданий и сооружений",
        href: S + "inzhenernye-sistemy-zdaniy-i-sooruzheniy/",
        items: [
          { label: "Пожарно-охранная сигнализация (объектовые и периметральные системы защиты)", href: S + "inzhenernye-sistemy-zdaniy-i-sooruzheniy/pozharno-okhrannaya-signalizatsiya-obektovye-i-perimetralnye-sistemy-zashchity/" },
          { label: "Системы промышленной громкоговорящей связи и оповещения", href: S + "inzhenernye-sistemy-zdaniy-i-sooruzheniy/sistemy-promyshlennoy-gromkogovoryashchey-svyazi-i-opoveshcheniya/" },
        ],
      },
      {
        label: "Техническая поддержка оргтехники и оборудования",
        href: S + "tekhnicheskaya-podderzhka-i-servis-vychislitelnoy-i-orgtekhniki/",
        items: [
          { label: "Обеспечение бесперебойной работы парка печатного оборудования", href: S + "tekhnicheskaya-podderzhka-i-servis-vychislitelnoy-i-orgtekhniki/obespechenie-bespereboynoy-raboty-parka-pechatnogo-oborudovaniya/" },
          { label: "Оптимизация затрат на печать и системы управления печатью", href: S + "tekhnicheskaya-podderzhka-i-servis-vychislitelnoy-i-orgtekhniki/optimizatsiya-zatrat-na-pechat-i-sistemy-upravleniya-pechatyu/" },
          { label: "Обеспечение бесперебойного гарантированного электропитания", href: S + "tekhnicheskaya-podderzhka-i-servis-vychislitelnoy-i-orgtekhniki/obespechenie-bespereboynogo-garantirovannogo-elektropitaniya/" },
          { label: "Обеспечение микроклимата критически важных объектов", href: S + "tekhnicheskaya-podderzhka-i-servis-vychislitelnoy-i-orgtekhniki/obespechenie-mikroklimata-kriticheski-vazhnykh-obektov/" },
          { label: "Гарантийный и послегарантийный ремонт вычислительного и периферийного оборудования (авторизованный сервисный центр)", href: S + "tekhnicheskaya-podderzhka-i-servis-vychislitelnoy-i-orgtekhniki/garantiynyy-i-poslegarantiynyy-remont-vychislitelnogo-i-periferiynogo-oborudovaniya-avtorizovannyy-s/" },
          { label: "Поставка запасных частей и расходных материалов", href: S + "tekhnicheskaya-podderzhka-i-servis-vychislitelnoy-i-orgtekhniki/postavka-zapasnykh-chastey-i-raskhodnykh-materialov/" },
        ],
      },
      {
        label: "Поставка оборудования и ПО",
        href: S + "postavka-oborudovaniya-i-po/",
        items: [
          { label: "Поставка заказного оборудования", href: S + "postavka-oborudovaniya-i-po/postavka-zakaznogo-oborudovaniya/" },
          { label: "Консультирование по лицензионным политикам производителей", href: S + "postavka-oborudovaniya-i-po/konsultirovanie-po-litsenzionnym-politikam-proizvoditeley/" },
        ],
      },
    ],
  },
  { kind: "link", label: "Каталог проектов", href: "https://ivs-corp.ru/projects/" },
  { kind: "link", label: "Новости", href: "https://ivs-corp.ru/info/news/" },
  { kind: "link", label: "Контакты", href: "https://ivs-corp.ru/contacts/" },
  {
    kind: "menu",
    label: "Продукты",
    href: "https://link-services-ivs.tilda.ws/",
    items: [{ label: "Link для ВКС", href: "https://link-services-ivs.tilda.ws/", external: true }],
  },
];

// Слайды главного экрана — как в слайдере ivs-corp.ru.
// Слайды главного экрана — как в слайдере ivs-corp.ru.
// text собран из меню «Услуги» на ivs-corp.ru (без новых фактов).
// image — 3D-иконка справа (PNG/WebP с прозрачностью в /public/hero); нет — показывается плейсхолдер.
export type Slide = { title: string; text: string; href: string; image?: string };

export const slides: Slide[] = [
  {
    title: "Комплексные проекты строительства",
    text: "ЦОД и коммутационные центры, комплексные системы безопасности — в том числе в роли генерального подрядчика.",
    href: S + "kompleksnye-proekty-stroitelstva/",
    image: "/hero/construction.webp",
  },
  {
    title: "Проектирование в области телекоммуника\u00ADционных систем", // мягкий перенос: дефис только если слово не влезает
    text: "Корпоративные сети передачи данных, беспроводные сети и ВОЛС, станции телефонной связи и цифровая радиосвязь.",
    href: S + "telekommunikatsionnye-sistemy-i-seti/",
    image: "/hero/telecom.webp",
  },
  {
    title: "Информационная безопасность",
    text: "Аудит, проектирование и внедрение систем защиты информации, защита критической инфраструктуры и персональных данных.",
    href: S + "informatsionnaya-bezopasnost/",
    image: "/hero/security.webp",
  },
];

// Направления — блок «системность» на ivs-corp.ru (подпункты оттуда же).
export type DirectionIcon = "network" | "code" | "building" | "box" | "server" | "support" | "shield" | "bolt";
export type Direction = { label: string; href: string; icon: DirectionIcon; items: string[] };

export const directions: Direction[] = [
  {
    label: "Сети и средства связи",
    href: S + "telekommunikatsionnye-sistemy-i-seti/",
    icon: "network",
    items: [
      "Локальные вычислительные сети",
      "Сети передачи данных",
      "Беспроводные сети",
      "Станции телефонной связи",
      "Системы цифровой радиосвязи",
      "Системы коллективного приёма телевидения",
    ],
  },
  {
    label: "Разработка и внедрение информационных систем",
    href: S + "razrabotka-i-vnedrenie-po/",
    icon: "code",
    items: [
      "Заказная разработка ПО",
      "Автоматизация бизнес-процессов и документооборота",
      "Внедрение решений на базе продуктов 1С",
      "Интеграция информационных систем",
      "Поддержка и сопровождение информационных систем",
    ],
  },
  {
    label: "ИТ-инфраструктура",
    href: S + "it-infrastruktura-i-bazovyy-servis/",
    icon: "server",
    items: ["Проектирование, комплектация и запуск", "Техническая поддержка", "Консультационная поддержка"],
  },
  {
    label: "Поставка оборудования и ПО",
    href: S + "postavka-oborudovaniya-i-po/",
    icon: "box",
    items: ["Поставка заказного оборудования", "Консультирование по лицензионным политикам производителей"],
  },
  {
    label: "Техническая поддержка и сервис",
    href: S + "tekhnicheskaya-podderzhka-i-servis-vychislitelnoy-i-orgtekhniki/",
    icon: "support",
    items: ["Комплексный сервис организаций", "Поставка запасных частей и расходных материалов", "Гарантийный и послегарантийный ремонт"],
  },
  {
    label: "Комплексные решения. Системы инженерного обеспечения",
    href: S + "inzhenernye-sistemy-zdaniy-i-sooruzheniy/",
    icon: "building",
    items: [
      "Комплексные системы безопасности",
      "Системы оповещения и громкоговорящей связи",
      "ЦОД и коммутационные центры",
      "Услуги генерального подряда",
    ],
  },
];


// Вариант 2: один продающий экран вместо слайдера. Формулировки собраны из текстов ivs-corp.ru
// («полный комплекс ИТ-услуг», 1400+ проектов, 200+ сертифицированных специалистов, основание — 1990).
export const heroV2 = {
  title: "Полный комплекс ИТ-услуг",
  accent: "для бизнеса и госсектора", // выделяется красным
  text: "Проектируем, строим и сопровождаем сети, ЦОД и информационные системы — от первого чертежа до сервиса.",
};

export const stats = [
  { value: "1400+", label: "крупных ИТ-проектов" },
  { value: "200+", label: "сертифицированных специалистов" },
  { value: `${new Date().getFullYear() - 1990} лет`, label: "на рынке ИТ — с 1990 года" },
];
