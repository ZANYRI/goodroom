export interface EventCategoryCard {
  id: string;
  title: string;
  summary: string;
  capacityNote: string;
  image: string;
  items: { label: string; href?: string }[];
}

export interface LoftTariffEdition {
  id: "weekday" | "weekend";
  label: string;
  price: number;
  priceFormatted: string;
  oldPrice: number;
  oldPriceFormatted: string;
  minHours: number;
  minHoursHint: string;
}

export const VENUE_LEDGER_METRICS = [
  {
    value: "100 м²",
    label: "Площадь пространства",
    detail: "Основной зал, игровая, бар и лаунж",
  },
  {
    value: "18 / 25",
    label: "Гостей в зале",
    detail: "Банкетная рассадка или фуршет",
  },
  {
    value: "24/7",
    label: "Режим без тишины",
    detail: "Можно шуметь и петь после 23:00",
  },
  {
    value: "0 ₽",
    label: "Пробковый сбор",
    detail: "Своя еда, торт и напитки без доплат",
  },
  {
    value: "1 500 ₽/ч",
    label: "Базовый тариф",
    detail: "ПН-ЧТ от 3 часов, ПТ-ВС от 5 часов",
  },
] as const;

export const EVENT_CATEGORIES: EventCategoryCard[] = [
  {
    id: "holidays",
    title: "Праздники",
    summary:
      "Закрытые частные вечеринки, дни рождения и камерные торжества только для своих.",
    capacityNote: "до 18-25 гостей",
    image: "/images/categories/holidays.jpg",
    items: [
      { label: "Вечеринка" },
      { label: "День рождения", href: "/happybirthday" },
      { label: "Выпускной", href: "/graduation" },
      { label: "Детский праздник", href: "/children" },
      { label: "Свадьба", href: "/wedding" },
      { label: "Девичник" },
      { label: "Встреча выпускников" },
    ],
  },
  {
    id: "business",
    title: "Бизнес мероприятия",
    summary:
      "Неформальные корпоративы, презентации на 65\" 4K экране и стратегические сессии.",
    capacityNote: "счет и акт для юрлиц",
    image: "/images/categories/business.jpg",
    items: [
      { label: "Корпоратив", href: "/corporative" },
      { label: "Конференция" },
      { label: "Деловая встреча" },
      { label: "Презентация" },
      { label: "Семинар" },
    ],
  },
  {
    id: "entertainment",
    title: "Развлечения",
    summary:
      "Профессиональное караоке на 50 000+ песен, звук Harman Kardon, турниры на PS5 и квизы.",
    capacityNote: "звук + микрофоны + 65\" ТВ",
    image: "/images/categories/entertainment.jpg",
    items: [
      { label: "Караоке", href: "/karaoke" },
      { label: "Музыкальный вечер" },
      { label: "Дискотека" },
      { label: "Кинопоказ" },
      { label: "Просмотр трансляций" },
      { label: "Квиз" },
      { label: "Настольные игры" },
      { label: "Мафия" },
    ],
  },
  {
    id: "education",
    title: "Обучение",
    summary:
      "Камерные воркшопы, лекции и практические мастер-классы с гибкой рассадкой.",
    capacityNote: "Wi-Fi + 2 экрана",
    image: "/images/categories/education.jpg",
    items: [
      { label: "Тренинг" },
      { label: "Мастер-класс" },
      { label: "Лекция" },
    ],
  },
  {
    id: "filming",
    title: "Съемки",
    summary:
      "Фактурный кирпич, панорамный свет с видом на Бештау и неоновая сцена для контента.",
    capacityNote: "дневной свет + неон",
    image: "/images/categories/filming.jpg",
    items: [
      { label: "Подкаст" },
      { label: "Стрим" },
      { label: "Видеосъемка" },
      { label: "Вебинар" },
    ],
  },
  {
    id: "other",
    title: "Камерные форматы",
    summary:
      "Творческие вечера, стендап-выступления, выставки и приватные свидания.",
    capacityNote: "свободная трансформация",
    image: "/images/categories/other.jpg",
    items: [
      { label: "Выставка" },
      { label: "Стендап" },
      { label: "Выступление" },
      { label: "Свидание" },
    ],
  },
];

export const LOFT_PRODUCT = {
  uid: "892542624922",
  slug: "892542624922-loft-shumno",
  url: "/tproduct/892542624922-loft-shumno",
  title: "Лофт ШУМНО",
  seoTitle: "ШУМНО: аренда лофта в Пятигорске для любого мероприятия",
  seoDescription:
    "Уютный лофт для вечеринок, дней рождения, фотосессий и мастер-классов в Пятигорске. Пространство GoodRoom: аренда от 1500 ₽/час. Онлайн-бронирование!",
  badge: "Спецтариф",
  specs: [
    "До 18 человек за столом (до 25 в формате фуршета)",
    "100 м² зонированного пространства на 2 этаже",
    "PS5, кальяны, акустика Harman Kardon, караоке 50 000+ песен",
    "Оборудованная кухня, барная стойка, посуда, бокалы и лед",
  ],
  paragraphs: [
    "«ШУМНО» - приватное архитектурное лофт-пространство в Пятигорске для вечеринок, камерных событий, игр и встреч до 18-25 гостей.",
    "В вашем распоряжении весь зал без посторонних: можно шуметь 24/7, приносить любимую еду и напитки без пробкового сбора, петь в профессиональное караоке и играть на PlayStation 5.",
  ],
  priceNote: "Цена указана за 1 час аренды всего пространства",
  editions: [
    {
      id: "weekday",
      label: "Будни (ПН-ЧТ)",
      price: 1500,
      priceFormatted: "1 500 ₽",
      oldPrice: 2000,
      oldPriceFormatted: "2 000 ₽",
      minHours: 3,
      minHoursHint: "Минимальное время аренды в будни: от 3 часов",
    },
    {
      id: "weekend",
      label: "Выходные (ПТ-ВС)",
      price: 2500,
      priceFormatted: "2 500 ₽",
      oldPrice: 3500,
      oldPriceFormatted: "3 500 ₽",
      minHours: 5,
      minHoursHint: "Минимальное время аренды в ПТ-ВС: от 5 часов",
    },
  ] satisfies LoftTariffEdition[],
  gallery: [
    {
      src: "/images/store/loft-1.jpg",
      alt: "ШУМНО Пятигорск: основной зал для корпоратива и вечеринки",
    },
    {
      src: "/images/store/loft-2.jpg",
      alt: "Лофт с мягкой зоной отдыха и декоративной подсветкой",
    },
    {
      src: "/images/store/loft-3.jpg",
      alt: "Аренда зала для детского праздника: закрытое безопасное пространство",
    },
    {
      src: "/images/store/loft-4.jpg",
      alt: "Лофт с акустической системой и светомузыкой в Пятигорске",
    },
    {
      src: "/images/store/loft-5.jpg",
      alt: "ШУМНО Пятигорск: сервировка для камерной свадьбы или росписи",
    },
    {
      src: "/images/store/loft-6.jpg",
      alt: "Большой экран в лофте для фильмов и презентаций",
    },
    {
      src: "/images/store/loft-7.jpg",
      alt: "Зона для настольных игр и общения в лофте ШУМНО",
    },
    {
      src: "/images/store/loft-8.jpg",
      alt: "Лаунж-зона в пространстве ШУМНО",
    },
    {
      src: "/images/store/loft-9.jpg",
      alt: "Аренда помещения на день рождения: лофт в Пятигорске",
    },
  ],
};

export const HOME_ADVANTAGES = [
  {
    title: "Зонированная архитектура 100 м²",
    description:
      "Не ресторан и не общий зал клуба, а закрытая площадка под вашу компанию: основной танцпол и стол, мягкий лаунж, отдельная игровая с PS5 и барная кухня.",
    icon: "/images/icons/milky_way_3d.png",
  },
  {
    title: "30 минут на подготовку бесплатно",
    description:
      "Открываем двери за полчаса до старта аренды без доплаты, чтобы вы спокойно накрыли стол, настроили плейлист и встретили первых гостей.",
    icon: "/images/icons/hourglass_done_3d.png",
  },
  {
    title: "Приватность и звук 24/7",
    description:
      "Никаких соседей за соседними столиками и запретов после 23:00. Пойте в караоке, включайте Harman Kardon и празднуйте в своем ритме до утра.",
    icon: "/images/icons/parachute_3d.png",
  },
  {
    title: "Своя еда и напитки без сборов",
    description:
      "Приносите домашний торт, заказывайте любимую доставку и берите напитки по магазинным ценам. Пробковый и сервисный сбор: 0 ₽.",
    icon: "/images/icons/bottle_with_popping_cork_3d.png",
  },
];

export const INCLUDED_FEATURES = [
  {
    title: "30 минут на подготовку",
    detail: "Бесплатный технический слот до начала события",
    icon: "/images/icons/sandglass_time.svg",
  },
  {
    title: "Посуда и сервировка",
    detail: "Тарелки, бокалы, приборы, холодильник и СВЧ",
    icon: "/images/icons/dish_plate_knife_fork_food.svg",
  },
  {
    title: "Быстрый Wi-Fi и 2 ТВ",
    detail: "Экраны 65\" и 55\" 4K для клипов, кино и презентаций",
    icon: "/images/icons/wi-fi_wifi_network_internet.svg",
  },
  {
    title: "PlayStation 5 и игры",
    detail: "Отдельная игровая зона с геймпадами и настолками",
    icon: "/images/icons/game_play_design_developing.svg",
  },
  {
    title: "Базовая уборка зала",
    detail: "Клининг после завершения вечеринки уже в тарифе",
    icon: "/images/icons/broom_sweep_clean.svg",
  },
  {
    title: "Караоке и кальяны",
    detail: "Акустика Harman Kardon, микрофоны и лаунж-оснащение",
    icon: "/images/icons/steam_generator.svg",
  },
];

export const EXTRA_SERVICES = [
  {
    title: "Кейтеринг и фуршет",
    detail: "Проверенные партнеры с подачей к началу вечера",
    icon: "/images/icons/waiter_food_service.svg",
  },
  {
    title: "Ведущий или DJ",
    detail: "Сценарий, квизы и музыкальное сопровождение",
    icon: "/images/icons/man_figure_pose_asana.svg",
  },
  {
    title: "Декор и фотозона",
    detail: "Оформление шарами и светом под концепцию праздника",
    icon: "/images/icons/balloon_heart_love.svg",
  },
];

export const MAIN_LOFT_GALLERY = [
  {
    src: "/images/loft/gallery-1.jpg",
    alt: "Основной зал лофта «ШУМНО» в Пятигорске с неоновой подсветкой",
  },
  {
    src: "/images/loft/gallery-2.jpg",
    alt: "Обеденная и лаунж-зона пространства «ШУМНО»",
  },
  {
    src: "/images/loft/gallery-3.jpg",
    alt: "Интерьер лофта для вечеринок и дней рождения в Пятигорске",
  },
  {
    src: "/images/loft/gallery-4.jpg",
    alt: "Атмосферный вечерний свет и декор в лофте «ШУМНО»",
  },
  {
    src: "/images/loft/gallery-5.jpg",
    alt: "Игровая комната с PlayStation 5 и большим экраном",
  },
  {
    src: "/images/loft/gallery-6.jpg",
    alt: "Барная стойка и кухонная зона с посудой и бокалами",
  },
  {
    src: "/images/loft/gallery-7.jpg",
    alt: "Фотозона и детали интерьера лофта «ШУМНО»",
  },
  {
    src: "/images/loft/gallery-8.jpg",
    alt: "Мягкая зона отдыха для компании до 18 гостей",
  },
];

export const HOME_FAQ = [
  {
    question: "Какие мероприятия можно провести в лофте Шумно?",
    answer:
      "У нас проходят дни рождения, корпоративы, выпускные, камерные свадьбы, детские праздники, съемки и караоке-вечеринки. Пространство универсально и трансформируется под сценарий вашего события.",
  },
  {
    question: "Как забронировать зал?",
    answer:
      "Оставьте заявку на сайте, напишите нам в WhatsApp или Telegram либо позвоните по номеру +7 (928) 020-10-01. Менеджер проверит свободные слоты, рассчитает бюджет и закрепит дату.",
  },
  {
    question: "Какая стоимость аренды?",
    answer:
      "Стоимость аренды составляет 1 500 руб./час в будни (ПН-ЧТ, от 3 часов) и 2 500 руб./час в выходные (ПТ-ВС, от 5 часов). В тариф уже включены звук, караоке, PS5, посуда, 30 минут на подготовку и базовая уборка.",
  },
  {
    question: "Можно ли принести свою еду и напитки?",
    answer:
      "Да, вы можете принести свои блюда, торт, напитки или заказать доставку без пробкового сбора. Также можно заказать сервировку у наших аккредитованных партнеров по кейтерингу.",
  },
  {
    question: "Есть ли парковка рядом?",
    answer: "Да, непосредственно у входа в здание есть бесплатная парковка для гостей.",
  },
  {
    question: "Можно ли оформить зал под свой стиль или концепцию?",
    answer:
      "Да, зал легко адаптируется под ваш декор: от деловой презентации до тематической неоновой вечеринки или камерного свадебного ужина.",
  },
  {
    question: "Сколько человек вмещает зал?",
    answer:
      "Комфортная вместимость зависит от формата: до 18 гостей при банкетной рассадке и до 25 гостей в формате фуршета или вечеринки.",
  },
  {
    question: "Какие условия по времени аренды?",
    answer:
      "Минимальное время аренды: 3 часа в будни (ПН-ЧТ) и 5 часов в выходные (ПТ-ВС). Площадка работает круглосуточно 24/7 по предварительному бронированию.",
  },
];
