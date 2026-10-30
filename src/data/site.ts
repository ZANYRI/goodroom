const rawSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://goodroom26.ru"
).trim();

// Guarantee https:// for canonical URLs & metadata even if misconfigured
const normalizedSiteUrl = rawSiteUrl
  .replace(/^http:\/\/(?!localhost|127\.0\.0\.1)/i, "https://")
  .replace(/\/+$/, "");

export const SITE_CONFIG = {
  name: "Лофт ШУМНО",
  brandAlt: "Пространство «ШУМНО» (GoodRoom), Пятигорск",
  url: normalizedSiteUrl,
  phoneDisplay: "+7 (928) 020-10-01",
  phoneHref: "tel:+79280201001",
  messengerPhoneDisplay: "+7 (968) 270-47-77",
  messengerPhoneHref: "tel:+79682704777",
  email: "goodroom26@mail.ru",
  emailHref: "mailto:goodroom26@mail.ru",
  address: "Пятигорск, ул. Мира 155А, 2 этаж",
  city: "Пятигорск",
  region: "Ставропольский край",
  postalCode: "357528",
  streetAddress: "ул. Мира, 155А",
  legalName: "ИП Писаренко Кирилл Сергеевич",
  inn: "263211964934",
  ogrnip: "324774600127283",
  registrationAddress: "г. Москва, ш. Каширское, д. 59, к. 2, кв. 495",
  telegramUrl: "https://t.me/kirillpisarenko",
  whatsappUrl: "https://wa.me/79682704777",
  maxUrl: "https://max.ru/79682704777",
  yandexOrgId: "194341733073",
  yandexMapsOrgUrl: "https://yandex.ru/maps/org/shumno/194341733073/",
  yandexReviewsIframeUrl:
    "https://yandex.ru/maps-reviews-widget/194341733073?comments",
  yandexMapIframeUrl:
    "https://yandex.ru/map-widget/v1/?oid=194341733073&ol=biz&ll=43.044142%2C44.040320&z=16",
  coords: {
    lat: 44.04032,
    lng: 43.044142,
  },
  metrikaId: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "102654634",
} as const;

export const EVENT_NAV_ITEMS = [
  { label: "День рождения", href: "/happybirthday" },
  { label: "Выпускной", href: "/graduation" },
  { label: "Детский праздник", href: "/children" },
  { label: "Свадьба", href: "/wedding" },
  { label: "Корпоратив", href: "/corporative" },
  { label: "Караоке", href: "/karaoke" },
] as const;
