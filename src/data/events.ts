export interface EventPageData {
  slug:
    | "happybirthday"
    | "graduation"
    | "children"
    | "wedding"
    | "corporative"
    | "karaoke";
  navLabel: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  heroTitle: string;
  heroBadge?: string;
  heroSubtitle: string;
  heroImage: string;
  galleryTitle: string;
  gallery: { src: string; alt: string }[];
  highlights: string[];
}

export const EVENT_PAGES: Record<EventPageData["slug"], EventPageData> = {
  happybirthday: {
    slug: "happybirthday",
    navLabel: "День рождения",
    seoTitle:
      "Лофт для Дня рождения в Пятигорске: устройте незабываемый праздник",
    seoDescription:
      "Лофт для дня рождения в Пятигорске. Устройте праздник с друзьями: можно шуметь, принести торт. Игры на PS5, фотозона. Забронируйте дату!",
    ogImage: "/images/og/happybirthday.png",
    heroBadge: "День рождения в Пятигорске",
    heroTitle:
      "Лофт для Дня рождения в Пятигорске: устройте незабываемый праздник",
    heroSubtitle:
      "Отметьте день рождения в стильном лофте с кейтерингом, PS5 и караоке! Пространство ШУМНО — ваш лучший выбор.",
    heroImage: "/images/events/happybirthday-hero.jpg",
    galleryTitle: "Галерея",
    highlights: [
      "Можно шуметь 24/7 без жалоб и ограничений",
      "Свой торт, еда и напитки — 0 ₽ пробковый сбор",
      "Караоке, PS5, неон, бар и посуда на 18 гостей",
    ],
    gallery: [
      {
        src: "/images/events/gallery/tild6463-663-photo-1600854109241-.jpg",
        alt: "Праздничная атмосфера дня рождения в лофте ШУМНО",
      },
      {
        src: "/images/events/gallery/tild3865-306-photo-1661697522426-.jpg",
        alt: "Вечеринка с друзьями в лофте Пятигорска",
      },
      {
        src: "/images/events/gallery/tild6661-663-photo-1661697522391-.jpg",
        alt: "Сервировка и фуршет на день рождения в лофте",
      },
      {
        src: "/images/events/gallery/tild3662-656-photo-1670332381677-.jpg",
        alt: "Яркие эмоции гостей на празднике в ШУМНО",
      },
      {
        src: "/images/events/gallery/tild6266-346-photo-1737224319158-.jpg",
        alt: "Танцы и музыка без ограничений по шуму",
      },
      {
        src: "/images/events/gallery/tild3664-393-photo-1726519030218-.jpg",
        alt: "Караоке и музыкальный вечер на день рождения",
      },
      {
        src: "/images/events/gallery/tild6136-313-photo-1628044099907-.jpg",
        alt: "Фотозона и праздничный декор в лофте",
      },
      {
        src: "/images/events/gallery/tild3735-353-photo-1661697522366-.jpg",
        alt: "Лаунж-зона для компании до 18 гостей",
      },
    ],
  },
  graduation: {
    slug: "graduation",
    navLabel: "Выпускной",
    seoTitle:
      "Выпускной вечер в лофте Пятигорска — отпразднуйте свободу в «Шумно»",
    seoDescription:
      "Отпразднуйте выпускной в Пятигорске без ограничений! Приватный лофт для 18 человек: можно шуметь, со своей едой и напитками, танцевать и играть на PS5. Забронируйте идеальный финал школы!",
    ogImage: "/images/og/graduation.png",
    heroBadge: "Выпускной 24/7",
    heroTitle:
      "Выпускной вечер в лофте Пятигорска — отпразднуйте свободу в «Шумно»",
    heroSubtitle:
      "Отметьте выпускной в стильном лофте с танцами, кальяном и PlayStation! Аренда ШУМНО — 24/7 комфорт, атмосфера и максимум свободы.",
    heroImage: "/images/events/graduation-hero.jpg",
    galleryTitle: "Празднуй в стиле с арендой лофта",
    highlights: [
      "Приватный зал только для вашего класса или курса",
      "Танцы до утра, звук Harman Kardon, караоке и PS5",
      "Никаких ресторанных наценок — можно со своей едой",
    ],
    gallery: [
      {
        src: "/images/events/gallery/tild6235-363-photo-1679043260360-.jpg",
        alt: "Выпускной вечер в лофте ШУМНО Пятигорск",
      },
      {
        src: "/images/events/gallery/tild3033-643-photo-1667035429430-.jpg",
        alt: "Праздничный банкет и фуршет на выпускной",
      },
      {
        src: "/images/events/gallery/tild6237-333-photo-1517983079452-.jpg",
        alt: "Музыка и светомузыка на выпускной вечеринке",
      },
      {
        src: "/images/events/gallery/tild3661-343-photo-1655757746439-.jpg",
        alt: "Атмосферные фото выпускников в интерьере лофта",
      },
      {
        src: "/images/events/gallery/tild3839-316-photo-1631901589746-.jpg",
        alt: "Отдых с друзьями в лаунж-зоне",
      },
      {
        src: "/images/events/gallery/tild3731-336-photo-1729073707916-.jpg",
        alt: "Стильное оформление зала для выпускного",
      },
      {
        src: "/images/events/gallery/tild3961-636-photo-1631016558939-.jpg",
        alt: "Игры, караоке и живое общение до утра",
      },
      {
        src: "/images/events/gallery/tild3731-343-photo-1717185358970-.jpg",
        alt: "Неоновая фотозона для выпускных снимков",
      },
    ],
  },
  children: {
    slug: "children",
    navLabel: "Детский праздник",
    seoTitle: "Детский праздник в лофте Пятигорска: весело и безопасно в «Шумно»",
    seoDescription:
      "Детский праздник в лофте Пятигорска. Безопасное и весёлое пространство для дня рождения ребёнка. Игры, мультики, можно шуметь.",
    ogImage: "/images/og/children.png",
    heroBadge: "Детские праздники",
    heroTitle:
      "Детский праздник в лофте Пятигорска: весело и безопасно в «Шумно»",
    heroSubtitle:
      "Отмечайте детский день рождения в безопасном и уютном лофте! Пространство ШУМНО — мягкие зоны, анимация, музыка и кухня.",
    heroImage: "/images/events/children-hero.jpg",
    galleryTitle: "Идеальное место для детского праздника",
    highlights: [
      "100 м² закрытого безопасного пространства без посторонних",
      "Отдельная игровая с PS5, 65\" и 55\" ТВ для мультиков и шоу",
      "Удобная кухня для торта и угощений + зона отдыха родителей",
    ],
    gallery: [
      {
        src: "/images/events/gallery/tild3961-396-photo-1565425518476-.jpg",
        alt: "Детский день рождения в лофте ШУМНО",
      },
      {
        src: "/images/events/gallery/tild6366-653-photo-1577896852618-.jpg",
        alt: "Игры и анимация для детей в просторном зале",
      },
      {
        src: "/images/events/gallery/tild3066-663-photo-1635536392500-.jpg",
        alt: "Оформление воздушными шарами и фотозона",
      },
      {
        src: "/images/events/gallery/tild3839-346-photo-1652635638070-.jpg",
        alt: "Сладкий стол и праздничный торт в лофте",
      },
      {
        src: "/images/events/gallery/tild6166-356-photo-1644566498425-.jpg",
        alt: "Весёлые конкурсы и квесты для детей",
      },
      {
        src: "/images/events/gallery/tild6239-633-photo-1720729706252-.jpg",
        alt: "Уютная семейная атмосфера детского праздника",
      },
      {
        src: "/images/events/gallery/tild3661-323-photo-1587616211892-.jpg",
        alt: "Творческие мастер-классы и настольные игры",
      },
      {
        src: "/images/events/gallery/tild6464-326-photo-1748518557177-.jpg",
        alt: "Комфортная зона отдыха для детей и родителей",
      },
    ],
  },
  wedding: {
    slug: "wedding",
    navLabel: "Свадьба",
    seoTitle: "Необычная свадьба в лофте Пятигорска — камерный праздник в «Шумно»",
    seoDescription:
      "Камерная свадьба в лофте Пятигорска. Ваш уютный и приватный праздник без ограничений ресторана. Можно со своим угощением. Узнайте условия.",
    ogImage: "/images/og/wedding.png",
    heroBadge: "Камерная свадьба",
    heroTitle:
      "Необычная свадьба в лофте Пятигорска — камерный праздник в «Шумно»",
    heroSubtitle:
      "Камерная свадьба или роспись без ЗАГСа? Арендуйте уютный лофт ШУМНО с фотозоной, декором и свободной атмосферой!",
    heroImage: "/images/events/wedding-hero.jpg",
    galleryTitle: "Галерея",
    highlights: [
      "Камерный формат для самых близких (до 18–25 гостей)",
      "Свой кейтеринг и напитки без пробкового сбора",
      "Стильный интерьер для свадебной фотосессии и танцев",
    ],
    gallery: [
      {
        src: "/images/events/gallery/tild3033-643-photo-1667035429430-.jpg",
        alt: "Камерная свадьба в лофте ШУМНО Пятигорск",
      },
      {
        src: "/images/events/gallery/tild3536-336-photo-1679205691613-.jpg",
        alt: "Свадебная сервировка и декор в лофте",
      },
      {
        src: "/images/events/gallery/tild3961-333-photo-1652400095321-.jpg",
        alt: "Тёплый свет и романтическая атмосфера вечера",
      },
      {
        src: "/images/events/gallery/tild3931-656-photo-1718371985489-.jpg",
        alt: "Фуршет и бокалы для свадебного торжества",
      },
      {
        src: "/images/events/gallery/tild3636-656-photo-1750086721210-.jpg",
        alt: "Фотозона для молодожёнов и гостей",
      },
      {
        src: "/images/events/gallery/tild6438-326-photo-1585544449550-.jpg",
        alt: "Уютный праздник без ресторанного официоза",
      },
      {
        src: "/images/events/gallery/tild3465-653-photo-1718371985568-.jpg",
        alt: "Стильные детали свадебного оформления в лофте",
      },
      {
        src: "/images/events/gallery/tild3062-616-photo-1589878424305-.jpg",
        alt: "Свадебная вечеринка с музыкой и танцами",
      },
    ],
  },
  corporative: {
    slug: "corporative",
    navLabel: "Корпоратив",
    seoTitle: "Корпоратив в лофте Пятигорска — неформальный тимбилдинг в «Шумно»",
    seoDescription:
      "Аренда лофта для корпоратива в Пятигорске. Устройте неформальную вечеринку для коллег: своя еда и напитки, караоке, PS5, можно шуметь. Забронируйте идеальное пространство для тимбилдинга!",
    ogImage: "/images/og/corporative.png",
    heroBadge: "Корпоратив и тимбилдинг",
    heroTitle:
      "Корпоратив в лофте Пятигорска — неформальный тимбилдинг в «Шумно»",
    heroSubtitle:
      "Отметьте корпоратив в стильном пространстве ШУМНО! Уютная атмосфера, PS5, проектор, кухня и 0 ограничений по шуму.",
    heroImage: "/images/events/corporative-hero.jpeg",
    galleryTitle: "Галерея",
    highlights: [
      "Оплата по счёту для юрлиц + закрывающие документы (чек, акт)",
      "65\" 4K экран для презентаций, квизов и итогов года",
      "Неформальный отдых: караоке, PS5, бар, кальяны и своя еда",
    ],
    gallery: [
      {
        src: "/images/events/gallery/tild6463-663-photo-1600854109241-.jpg",
        alt: "Неформальный корпоратив в лофте ШУМНО",
      },
      {
        src: "/images/events/gallery/tild3865-306-photo-1661697522426-.jpg",
        alt: "Тимбилдинг для команды в центре Пятигорска",
      },
      {
        src: "/images/events/gallery/tild6661-663-photo-1661697522391-.jpg",
        alt: "Кейтеринг и фуршет на корпоративном вечере",
      },
      {
        src: "/images/events/gallery/tild3662-656-photo-1670332381677-.jpg",
        alt: "Командные игры и квизы в лофте",
      },
      {
        src: "/images/events/gallery/tild6266-346-photo-1737224319158-.jpg",
        alt: "Вечерняя программа и музыка без ограничений",
      },
      {
        src: "/images/events/gallery/tild3664-393-photo-1726519030218-.jpg",
        alt: "Караоке-баттл на корпоративе",
      },
      {
        src: "/images/events/gallery/tild6136-313-photo-1628044099907-.jpg",
        alt: "Стильная площадка для деловых и праздничных встреч",
      },
      {
        src: "/images/events/gallery/tild3735-353-photo-1661697522366-.jpg",
        alt: "Уютная лаунж-зона для общения коллег",
      },
    ],
  },
  karaoke: {
    slug: "karaoke",
    navLabel: "Караоке",
    seoTitle: "Лофт с караоке в Пятигорске — аренда ШУМНО для весёлых вечеров",
    seoDescription:
      "Любите петь? Снимите лофт с караоке в центре Пятигорска! Пространство ШУМНО: звук, ТВ, микрофоны и вечеринка до утра.",
    ogImage: "/images/og/karaoke.png",
    heroBadge: "50 000+ песен • Приватный зал",
    heroTitle: "Профессиональное караоке, более 50 000 песен",
    heroSubtitle:
      "Телевизор с большим экраном 65\". Любите петь? Снимите лофт с караоке в центре Пятигорска! Пространство ШУМНО: мощный звук, микрофоны и вечеринка до утра.",
    heroImage: "/images/events/karaoke-hero.jpg",
    galleryTitle: "Галерея",
    highlights: [
      "Пойте без очереди за микрофоном — в зале только ваша компания",
      "Более 50 000 песен, большой экран 65\" и акустика Harman Kardon",
      "Можно петь во весь голос даже в 2 часа ночи — шуметь 24/7!",
    ],
    gallery: [
      {
        src: "/images/events/gallery/tild3664-393-photo-1726519030218-.jpg",
        alt: "Караоке-вечеринка в лофте ШУМНО Пятигорск",
      },
      {
        src: "/images/events/gallery/tild3735-353-photo-1661697522366-.jpg",
        alt: "Приватный зал с караоке и мягкой зоной",
      },
      {
        src: "/images/events/gallery/tild6235-363-photo-1679043260360-.jpg",
        alt: "Весёлый музыкальный вечер с друзьями",
      },
      {
        src: "/images/events/gallery/tild6237-333-photo-1517983079452-.jpg",
        alt: "Яркий звук и свет для караоке до утра",
      },
      {
        src: "/images/events/gallery/tild3661-343-photo-1655757746439-.jpg",
        alt: "Атмосферный вечер в центре Пятигорска",
      },
      {
        src: "/images/events/gallery/tild3839-316-photo-1631901589746-.jpg",
        alt: "Отдых со своими напитками и закусками",
      },
      {
        src: "/images/events/gallery/tild3731-336-photo-1729073707916-.jpg",
        alt: "Интерьер пространства ШУМНО для вечеринок",
      },
      {
        src: "/images/events/gallery/tild3961-636-photo-1631016558939-.jpg",
        alt: "Танцы, песни и PS5 в одном пространстве",
      },
    ],
  },
};
