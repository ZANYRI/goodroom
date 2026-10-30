export interface EventCategoryCard {
  id: string;
  title: string;
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

export const EVENT_CATEGORIES: EventCategoryCard[] = [
  {
    id: "holidays",
    title: "Праздники",
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
    id: "education",
    title: "Обучение",
    image: "/images/categories/education.jpg",
    items: [
      { label: "Тренинг" },
      { label: "Мастер-класс" },
      { label: "Лекция" },
    ],
  },
  {
    id: "entertainment",
    title: "Развлечения",
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
    id: "filming",
    title: "Съемки",
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
    title: "Другое",
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
  seoTitle: "ШУМНО — аренда лофта в Пятигорске для любого мероприятия",
  seoDescription:
    "Уютный лофт для вечеринок, дней рождения, фотосессий и мастер-классов в Пятигорске. Пространство GoodRoom — аренда от 1500 ₽/час. Онлайн-бронирование!",
  badge: "SALE",
  specs: [
    "До 18 человек (до 25 — фуршет)",
    "100 м² стильного пространства",
    "PS5, кальяны, аудиосистема Harman Kardon, настольные игры",
    "Кухня, бар, посуда, бокалы, приборы, техника",
  ],
  paragraphs: [
    "Добро пожаловать в «Шумно» — стильное пространство для вечеринок, мастер-классов, игр и любых событий до 18 человек.",
    "Здесь можно круглосуточно шуметь, приносить с собой любимую еду и напитки без пробкового сбора, наслаждаться профессиональным караоке и PlayStation 5.",
    "«Шумно» — место, где собираются свои, чтобы отдохнуть, повеселиться и создать незабываемые моменты.",
  ],
  priceNote: "Цена указана за 1 час аренды",
  editions: [
    {
      id: "weekday",
      label: "Будни (ПН–ЧТ)",
      price: 1500,
      priceFormatted: "1 500 ₽",
      oldPrice: 2000,
      oldPriceFormatted: "2 000 ₽",
      minHours: 3,
      minHoursHint: "Минимальное время аренды в будни — от 3 часов",
    },
    {
      id: "weekend",
      label: "Выходные (ПТ–ВС)",
      price: 2500,
      priceFormatted: "2 500 ₽",
      oldPrice: 3500,
      oldPriceFormatted: "3 500 ₽",
      minHours: 5,
      minHoursHint: "Минимальное время аренды в ПТ–ВС — от 5 часов",
    },
  ] satisfies LoftTariffEdition[],
  gallery: [
    {
      src: "/images/store/loft-1.jpg",
      alt: "ШУМНО Пятигорск — место для корпоратива, тёплая атмосфера",
    },
    {
      src: "/images/store/loft-2.jpg",
      alt: "Лофт с мягкой зоной отдыха и декоративной подсветкой",
    },
    {
      src: "/images/store/loft-3.jpg",
      alt: "Аренда зала для детского праздника — безопасное пространство",
    },
    {
      src: "/images/store/loft-4.jpg",
      alt: "Лофт с музыкальной системой и светомузыкой — вечеринка в Пятигорске",
    },
    {
      src: "/images/store/loft-5.jpg",
      alt: "ШУМНО Пятигорск — место для уютной свадьбы или росписи",
    },
    {
      src: "/images/store/loft-6.jpg",
      alt: "Экран в лофте — просмотр фильмов или презентаций",
    },
    {
      src: "/images/store/loft-7.jpg",
      alt: "Зона для настольных игр и общения — аренда лофта ШУМНО",
    },
    {
      src: "/images/store/loft-8.jpg",
      alt: "Кальян в лофте — вечеринка в стиле лаунж",
    },
    {
      src: "/images/store/loft-9.jpg",
      alt: "Аренда помещения на день рождения — стильный лофт в Пятигорске",
    },
  ],
};

export const HOME_ADVANTAGES = [
  {
    title: "Универсальность и уникальность",
    description:
      "Не ресторан, не клуб, а твоя мини-вселенная. Уютное пространство для любых мероприятий: вечеринок, мастер-классов, игр, Дня рождения, стендап-концертов, вместительностью до 18 человек.",
    icon: "/images/icons/milky_way_3d.png",
  },
  {
    title: "Бесплатная подготовка",
    description:
      "Даём полчаса бесплатно до начала аренды, чтобы вы могли спокойно подготовиться к празднованию, сервировать стол и встретить гостей.",
    icon: "/images/icons/hourglass_done_3d.png",
  },
  {
    title: "Свобода и приватность",
    description:
      "Можно шуметь 24/7 и быть собой — никаких посторонних гостей за соседними столиками и строгих ограничений до 23:00.",
    icon: "/images/icons/parachute_3d.png",
  },
  {
    title: "Можно со своим",
    description:
      "Принесите свою еду, напитки, торт, друзей и отличное настроение. У нас нет пробкового сбора!",
    icon: "/images/icons/bottle_with_popping_cork_3d.png",
  },
];

export const INCLUDED_FEATURES = [
  {
    title: "30 минут на подготовку",
    icon: "/images/icons/sandglass_time.svg",
  },
  {
    title: "Посуда и бокалы",
    icon: "/images/icons/dish_plate_knife_fork_food.svg",
  },
  {
    title: "Быстрый Wi-Fi",
    icon: "/images/icons/wi-fi_wifi_network_internet.svg",
  },
  {
    title: "PlayStation 5",
    icon: "/images/icons/game_play_design_developing.svg",
  },
  {
    title: "Уборка после мероприятия",
    icon: "/images/icons/broom_sweep_clean.svg",
  },
  {
    title: "Кальяны",
    icon: "/images/icons/steam_generator.svg",
  },
];

export const EXTRA_SERVICES = [
  {
    title: "Кейтеринг",
    icon: "/images/icons/waiter_food_service.svg",
  },
  {
    title: "Ведущий",
    icon: "/images/icons/man_figure_pose_asana.svg",
  },
  {
    title: "Оформление шарами",
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
    alt: "Фотозона и стильные детали интерьера лофта «ШУМНО»",
  },
  {
    src: "/images/loft/gallery-8.jpg",
    alt: "Уютная мягкая зона отдыха для компании до 18 гостей",
  },
];

export const HOME_FAQ = [
  {
    question: "Какие мероприятия можно провести в лофте Шумно?",
    answer:
      "У нас проходят дни рождения, корпоративы, конференции, съёмки, вечеринки и творческие вечера. Пространство универсально и адаптируется под формат вашего события.",
  },
  {
    question: "Как забронировать зал?",
    answer:
      "Достаточно оставить заявку на сайте, написать нам в WhatsApp/Telegram или позвонить. Менеджер свяжется с вами для уточнения деталей и подберёт подходящий вариант по дате.",
  },
  {
    question: "Какая стоимость аренды?",
    answer:
      "Стоимость аренды — от 1 500 руб./час в будни и 2 500 руб./час в выходные (ПТ–ВС). Цена зависит от формата и времени мероприятия. Менеджер поможет подобрать оптимальный тариф и рассчитать финальную стоимость под ваши задачи.",
  },
  {
    question: "Можно ли принести свою еду и напитки?",
    answer:
      "Да, у нас разрешено приносить свои продукты из доставки и напитки без дополнительных сборов. Также можно сделать заказ у наших аккредитованных партнёров по кейтерингу. На работу сторонних кейтерингов действует доп. сбор.",
  },
  {
    question: "Есть ли парковка рядом?",
    answer: "Да, возле лофта есть бесплатная парковка.",
  },
  {
    question: "Можно ли оформить зал под свой стиль или концепцию?",
    answer:
      "Да! Пространство легко трансформируется под любой формат — от бизнес-собраний до тематических вечеринок.",
  },
  {
    question: "Сколько человек вмещает зал?",
    answer:
      "Вместимость зависит от рассадки: до 18 гостей в формате банкета и до 25 — при фуршете или концерте.",
  },
  {
    question: "Какие условия по времени аренды?",
    answer:
      "Минимальное время аренды — 3 часа (ПН–ЧТ) и 5 часов (ПТ–ВС). Работаем ежедневно 24/7 и готовы обсудить индивидуальный график для частых или длительных мероприятий.",
  },
];
