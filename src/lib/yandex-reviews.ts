import { SITE_CONFIG } from "@/data/site";

export interface YandexReviewItem {
  id: string;
  author: string;
  initials: string;
  date: string;
  stars: number;
  text: string;
}

export interface YandexReviewsPayload {
  orgName: string;
  rating: string;
  summaryText: string;
  orgUrl: string;
  reviewsUrl: string;
  addReviewUrl: string;
  reviews: YandexReviewItem[];
}

function getInitials(name: string): string {
  const parts = name
    .replace(/[^\p{L}\s]/gu, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "Г";
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function cleanText(raw: string): string {
  return raw
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/[\u2014\u2013]/g, "-")
    .replace(/[ \t]+/g, " ")
    .trim();
}

export const FALLBACK_YANDEX_REVIEWS: YandexReviewsPayload = {
  orgName: "Шумно",
  rating: "4,8",
  summaryText: "15 отзывов · 16 оценок",
  orgUrl: SITE_CONFIG.yandexMapsOrgUrl,
  reviewsUrl: `${SITE_CONFIG.yandexMapsOrgUrl}reviews/`,
  addReviewUrl: `${SITE_CONFIG.yandexMapsOrgUrl}reviews/?add-review`,
  reviews: [
    {
      id: "anastasia-7-may",
      author: "Анастасия Евгеньевна",
      initials: "АЕ",
      date: "7 мая",
      stars: 5,
      text: "Арендовали это замечательное место для игры в покер и тематической фотосессии. Нас было 11 человек, все прекрасно поместились. Много места, большой стол, зона кухни, холодильник, свои наборы настольных игр, вайфай - все для комфорта и веселья. Недалеко от места есть продуктовый магазин, удобно докупать необходимые вещи. Бесконтактное заселение тоже порадовало, арендодатель всегда на связи по любым вопросам. Нам очень понравилось, приедем еще.",
    },
    {
      id: "sveta-9-aug",
      author: "Света Трофимова",
      initials: "СТ",
      date: "9 августа",
      stars: 5,
      text: "Супер место, превзошло ожидания, очень много места, красивые зоны для фотографий. Есть все удобства для комфортного отдыха, все очень чисто. Караоке отличное, большой выбор песен. Спасибо за лофт!",
    },
    {
      id: "vladislav-recent",
      author: "Владислав Бодибилдерский",
      initials: "ВБ",
      date: "Недавно",
      stars: 5,
      text: "Бронировал лофт для того чтобы отметить день рождения с друзьями - и ни разу не пожалел. Пространство чистое, с удобной планировкой, интерьер - отдельный восторг: атмосферно, фотогенично. Мебель стояла удобно, розетки были там, где нужны, вечеринка прошла ровно так, как планировали. Отдельно спасибо за четкую систему с кодом - заселились без проблем, все сработало как надо! Бронируйте заранее - место того стоит!",
    },
    {
      id: "yulia-31-may",
      author: "Юлия",
      initials: "Ю",
      date: "31 мая",
      stars: 5,
      text: "Отмечали детский день рождения, все остались в восторге, и дети и мы, все продумано, есть все необходимое, расположение удобное и самого заведения, и внутри все под рукой, чисто, уютно, современно. Обязательно вернемся снова.",
    },
    {
      id: "diana-19-aug",
      author: "Диана Д.",
      initials: "ДД",
      date: "19 августа",
      stars: 5,
      text: "Снимали с подругой лофт для девичника, все очень понравилось! Классное оформление, особенно понравилась неоновая краска на стенах и ультрафиолетовая подсветка. В целом много интересных мелочей, заметно внимание к помещению. С удовольствием пели в караоке, играли в приставку, очень классно провели время, часы пролетели незаметно.",
    },
  ],
};

export function parseYandexReviewsWidgetHtml(
  html: string
): YandexReviewsPayload | null {
  const orgNameMatch = html.match(
    /class="mini-badge__org-name"[^>]*>([\s\S]*?)<\/a>/i
  );
  const ratingMatch = html.match(
    /class="mini-badge__stars-count"[^>]*>([\s\S]*?)<\/p>/i
  );
  const summaryMatch = html.match(
    /class="mini-badge__rating"[^>]*>([\s\S]*?)<\/a>/i
  );

  const commentBlocks = [
    ...html.matchAll(
      /<div class="comment">([\s\S]*?)(?=<div class="comment">|<script\b|<\/div><div class="badge__more-reviews-link-wrap">)/gi
    ),
  ];

  const reviews: YandexReviewItem[] = [];

  for (let i = 0; i < commentBlocks.length; i++) {
    const block = commentBlocks[i][1];
    const nameRaw = block.match(
      /class="comment__name"[^>]*>([\s\S]*?)<\/p>/i
    )?.[1];
    const dateRaw = block.match(
      /class="comment__date"[^>]*>([\s\S]*?)<\/p>/i
    )?.[1];
    const textRaw = block.match(
      /class="comment__text"[^>]*>([\s\S]*?)<\/p>/i
    )?.[1];

    if (!nameRaw || !textRaw) continue;

    const author = cleanText(nameRaw.replace(/<[^>]+>/g, ""));
    const date = cleanText((dateRaw || "").replace(/<[^>]+>/g, ""));
    const text = cleanText(
      textRaw
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<[^>]+>/g, "")
    );

    const emptyStars = (block.match(/stars-list__star_empty/g) || []).length;
    const stars = Math.max(1, Math.min(5, 5 - emptyStars));

    if (author && text) {
      reviews.push({
        id: `ya-${i}-${author}`,
        author,
        initials: getInitials(author),
        date,
        stars,
        text,
      });
    }
  }

  if (reviews.length === 0) {
    return null;
  }

  const summaryCleaned = summaryMatch
    ? cleanText(summaryMatch[1].replace(/<[^>]+>/g, "")).replace(/•/g, "·")
    : FALLBACK_YANDEX_REVIEWS.summaryText;

  return {
    orgName: orgNameMatch
      ? cleanText(orgNameMatch[1].replace(/<[^>]+>/g, ""))
      : FALLBACK_YANDEX_REVIEWS.orgName,
    rating: ratingMatch
      ? cleanText(ratingMatch[1].replace(/<[^>]+>/g, ""))
      : FALLBACK_YANDEX_REVIEWS.rating,
    summaryText: summaryCleaned,
    orgUrl: SITE_CONFIG.yandexMapsOrgUrl,
    reviewsUrl: `${SITE_CONFIG.yandexMapsOrgUrl}reviews/`,
    addReviewUrl: `${SITE_CONFIG.yandexMapsOrgUrl}reviews/?add-review`,
    reviews,
  };
}

let cachedReviews: { data: YandexReviewsPayload; expiresAt: number } | null =
  null;

export async function getLiveYandexReviews(): Promise<YandexReviewsPayload> {
  const now = Date.now();
  if (cachedReviews && cachedReviews.expiresAt > now) {
    return cachedReviews.data;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);
    const res = await fetch(SITE_CONFIG.yandexReviewsIframeUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept-Language": "ru-RU,ru;q=0.9",
      },
    });
    clearTimeout(timer);

    if (res.ok) {
      const html = await res.text();
      const parsed = parseYandexReviewsWidgetHtml(html);
      if (parsed) {
        cachedReviews = {
          data: parsed,
          expiresAt: now + 60 * 60 * 1000,
        };
        return parsed;
      }
    }
  } catch {
    // Graceful fallback to verified snapshot
  }

  return FALLBACK_YANDEX_REVIEWS;
}
