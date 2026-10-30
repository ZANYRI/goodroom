import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";
import {
  EVENT_CATEGORIES,
  EXTRA_SERVICES,
  HOME_ADVANTAGES,
  HOME_FAQ,
  INCLUDED_FEATURES,
  MAIN_LOFT_GALLERY,
  VENUE_LEDGER_METRICS,
} from "@/data/home";
import { BLOG_POSTS } from "@/data/blog";
import { HeroQuickForm } from "@/components/HeroQuickForm";
import { LoftCatalogCard } from "@/components/LoftCatalogCard";
import { OpenModalButton } from "@/components/OpenModalButton";
import { PhotoGalleryGrid } from "@/components/PhotoGalleryGrid";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ContactsMapSection } from "@/components/ContactsMapSection";
import { YandexReviewsWidget } from "@/components/YandexReviewsWidget";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  Clock24Icon,
  GlassIcon,
  MicrophoneIcon,
  SparklesIcon,
} from "@/components/Icons";

const ADVANTAGE_ICONS = [
  SparklesIcon,
  Clock24Icon,
  MicrophoneIcon,
  GlassIcon,
] as const;

const BENTO_SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-6",
  "lg:col-span-6",
] as const;

export default function HomePage() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: SITE_CONFIG.name,
    alternateName: "Пространство ШУМНО (GoodRoom)",
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/images/home/hero.jpg`,
    logo: `${SITE_CONFIG.url}/images/brand/logo.png`,
    telephone: "+7-928-020-10-01",
    email: SITE_CONFIG.email,
    priceRange: "1500-2500 RUB/час",
    maximumAttendeeCapacity: 25,
    openingHours: "Mo-Su 00:00-23:59",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.streetAddress,
      addressLocality: SITE_CONFIG.city,
      addressRegion: SITE_CONFIG.region,
      postalCode: SITE_CONFIG.postalCode,
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.coords.lat,
      longitude: SITE_CONFIG.coords.lng,
    },
    sameAs: [
      SITE_CONFIG.telegramUrl,
      SITE_CONFIG.whatsappUrl,
      SITE_CONFIG.yandexMapsOrgUrl,
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      {/* 1. Asymmetric Split Architectural Hero */}
      <section className="mx-auto flex min-h-[calc(100dvh-76px)] max-w-7xl items-center px-4 pt-8 pb-12 sm:px-6 lg:pt-12 lg:pb-16">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:gap-14">
          {/* Left: Strict 4-element Hero Stack */}
          <div className="animate-fade-up">
            <p className="text-xs font-bold tracking-[0.14em] text-accent-text uppercase">
              Частный event-лофт в Пятигорске
            </p>

            <h1 className="mt-4 font-display text-3xl leading-[1.13] font-semibold text-ink sm:text-5xl lg:text-[48px]">
              Аренда лофта для вечеринок и событий в «ШУМНО»
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Закрытые 100 м² со звуком Harman Kardon, караоке и PS5. Можно
              шуметь 24/7 со своей едой без сборов.
            </p>

            <div className="mt-8">
              <HeroQuickForm />
            </div>
          </div>

          {/* Right: Unobstructed Architectural Photography Stage */}
          <div className="space-y-3.5">
            <div className="overflow-hidden rounded-2xl border border-hairline bg-surface">
              <img
                src="/images/home/hero.jpg"
                alt="Аренда лофта для вечеринок в Пятигорске, пространство «ШУМНО»"
                fetchPriority="high"
                className="aspect-[16/11] h-full w-full object-cover"
              />
            </div>

            <div className="hidden grid-cols-2 gap-3.5 sm:grid">
              <div className="overflow-hidden rounded-2xl border border-hairline bg-surface">
                <img
                  src="/images/loft/gallery-1.jpg"
                  alt="Вечерний световой сценарий основного зала лофта «ШУМНО»"
                  className="aspect-[16/9] h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-hairline bg-surface">
                <img
                  src="/images/loft/gallery-5.jpg"
                  alt="Отдельная игровая зона с PlayStation 5 и большим экраном"
                  className="aspect-[16/9] h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Architectural Venue Parameters Ledger (Below Hero) */}
      <section
        aria-label="Ключевые параметры площадки"
        className="border-y border-hairline bg-surface"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 divide-y divide-hairline sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-y-0">
            {VENUE_LEDGER_METRICS.map((metric) => (
              <div
                key={metric.label}
                className="py-6 pr-4 lg:px-6 lg:first:pl-0 lg:last:pr-0"
              >
                <p className="font-mono text-2xl font-bold text-accent-text tabular-nums sm:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-1.5 text-sm font-bold text-ink">
                  {metric.label}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Asymmetric Bento Mosaic of Event Scenarios */}
      <section className="py-20 sm:py-26">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-4xl">
              Одна площадка: разные сценарии
            </h2>
            <p className="mt-3.5 text-base leading-relaxed text-ink-muted">
              Зонирование зала адаптируется под камерные семейные события,
              шумные ночные вечеринки, корпоративные встречи и контент-съемки.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            {EVENT_CATEGORIES.map((category, idx) => {
              const spanClass = BENTO_SPANS[idx] || "lg:col-span-6";
              const isWideSplit = idx === 0 || idx === 3;
              const isElevated = idx === 1 || idx === 2;

              return (
                <article
                  key={category.id}
                  className={`${spanClass} group overflow-hidden rounded-2xl border border-hairline transition hover:border-hairline-strong ${
                    isElevated ? "bg-surface-elevated" : "bg-surface"
                  }`}
                >
                  <div
                    className={
                      isWideSplit
                        ? "grid h-full grid-cols-1 sm:grid-cols-[0.92fr_1.08fr]"
                        : "flex h-full flex-col"
                    }
                  >
                    <div
                      className={`overflow-hidden bg-surface-elevated ${
                        isWideSplit
                          ? "aspect-[4/3] sm:aspect-auto sm:min-h-[270px]"
                          : "aspect-[16/10]"
                      }`}
                    >
                      <img
                        src={category.image}
                        alt={category.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="font-display text-xl font-semibold text-ink">
                            {category.title}
                          </h3>
                          <span className="font-mono text-xs font-semibold text-accent-text">
                            {category.capacityNote}
                          </span>
                        </div>

                        <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                          {category.summary}
                        </p>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {category.items.map((item) =>
                          item.href ? (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-accent-text/45 bg-accent-soft px-3 py-1.5 text-xs font-bold text-accent-text transition hover:bg-accent hover:text-accent-ink"
                            >
                              <span>{item.label}</span>
                              <ArrowRightIcon className="h-3.5 w-3.5" />
                            </Link>
                          ) : (
                            <span
                              key={item.label}
                              className="rounded-lg border border-hairline bg-canvas/65 px-3 py-1.5 text-xs font-semibold text-ink-muted"
                            >
                              {item.label}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Interactive Space Showcase & Tariff Configurator */}
      <section className="border-t border-hairline bg-surface/55 py-20 sm:py-26">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-bold tracking-[0.14em] text-accent-text uppercase">
              Тарифы и конфигуратор
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-4xl">
              Рассчитайте аренду зала под свой день
            </h2>
          </div>

          <LoftCatalogCard />
        </div>
      </section>

      {/* 5. Spatial Architecture & Core Advantages */}
      <section className="border-t border-hairline py-20 sm:py-26">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14">
            <div className="overflow-hidden rounded-2xl border border-hairline bg-surface">
              <img
                src="/images/home/advantages.jpg"
                alt="Неоновая арт-зона лофта «ШУМНО» в Пятигорске"
                loading="lazy"
                className="aspect-[4/4.4] h-full w-full object-cover"
              />
            </div>

            <div>
              <h2 className="font-display text-2xl leading-snug font-semibold text-ink sm:text-4xl">
                Архитектура свободы без ресторанных рамок
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
                В день события вы отдыхаете со своими гостями: в зале нет
                случайных посетителей, пробковых сборов и требования выключить
                звук после одиннадцати вечера.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {HOME_ADVANTAGES.map((adv, idx) => {
                  const IconComp =
                    ADVANTAGE_ICONS[idx % ADVANTAGE_ICONS.length];
                  return (
                    <div
                      key={adv.title}
                      className="rounded-2xl border border-hairline bg-surface p-6 transition hover:border-hairline-strong"
                    >
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-text">
                        <IconComp className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 font-display text-base font-semibold text-ink sm:text-lg">
                        {adv.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                        {adv.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Technical Rider & Turnkey Concierge (Asymmetric 7 / 5 Split) */}
      <section className="border-t border-hairline bg-surface py-20 sm:py-26">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-4xl">
              Техническое оснащение и сервис
            </h2>
            <p className="mt-3.5 text-base leading-relaxed text-ink-muted">
              Базовое оборудование, посуда, звук и подготовка площадки уже
              включены в почасовую ставку от{" "}
              <span className="font-mono font-bold text-accent-text">
                1 500 ₽/час
              </span>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left 7 Cols: Included Equipment Matrix */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              {INCLUDED_FEATURES.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-hairline bg-canvas p-5"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-elevated p-2.5">
                    <img
                      src={item.icon}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="icon-adaptive h-full w-full object-contain"
                    />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink sm:text-base">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right 5 Cols: Turnkey Concierge Services */}
            <div className="flex flex-col justify-between rounded-2xl border border-hairline-strong bg-surface-elevated p-6 sm:p-8 lg:col-span-5">
              <div>
                <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  Дополнительные услуги под ключ
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                  Поможем собрать вечер без лишней координации с вашей стороны:
                  от сервировки фуршета до ведущего и фотозоны.
                </p>

                <div className="mt-6 space-y-3">
                  {EXTRA_SERVICES.map((srv) => (
                    <div
                      key={srv.title}
                      className="flex items-center gap-3.5 rounded-xl border border-hairline bg-surface p-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-elevated p-2">
                        <img
                          src={srv.icon}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          className="icon-adaptive h-full w-full object-contain"
                        />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-ink">
                          {srv.title}
                        </p>
                        <p className="text-xs text-ink-muted">{srv.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 pt-2">
                <OpenModalButton
                  mode="callback"
                  source="Дополнительные услуги под ключ (Главная)"
                  className="btn-secondary h-12 w-full px-6 text-sm"
                >
                  Обсудить сценарий с менеджером
                </OpenModalButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Split Private Viewing Invitation ("Оказаться внутри") */}
      <section className="border-t border-hairline py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl border border-hairline-strong bg-surface">
            <div className="grid grid-cols-1 items-center lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <h2 className="font-display text-2xl leading-snug font-semibold text-ink sm:text-4xl">
                  Посмотрите пространство вживую перед бронированием
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
                  Покажем все зоны, включим акустику Harman Kardon и световые
                  сценарии, обсудим рассадку гостей и закрепим удобное время.
                </p>

                <div className="mt-8">
                  <OpenModalButton
                    mode="callback"
                    source="Записаться на просмотр (Главная)"
                    className="btn-primary h-13 px-8 text-sm"
                  >
                    Записаться на просмотр
                  </OpenModalButton>
                </div>
              </div>

              <div className="h-full min-h-[260px] bg-surface-elevated lg:min-h-[360px]">
                <img
                  src="/images/home/viewing-cover.jpg"
                  alt="Просмотр лофта «ШУМНО» в Пятигорске"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Cinema Mosaic Photo Gallery */}
      <section className="border-t border-hairline bg-surface/45 py-20 sm:py-26">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-4xl">
              Пространство в деталях
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              Основной зал, мягкий лаунж, барная кухня и отдельная игровая
              комната с PlayStation 5.
            </p>
          </div>

          <PhotoGalleryGrid images={MAIN_LOFT_GALLERY} mosaic />
        </div>
      </section>

      {/* 9. Verified Yandex Maps Guest Reviews */}
      <section className="border-t border-hairline py-20 sm:py-26">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-accent-text uppercase">
                Отзывы гостей
              </p>
              <h2 className="mt-3 font-display text-2xl leading-[1.18] font-semibold text-ink sm:text-4xl">
                Живые впечатления гостей на Яндекс Картах
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
                Мы не публикуем выдуманные цитаты: в виджете отображаются
                проверенные оценки и фотографии гостей, которые уже отмечали в
                «ШУМНО» дни рождения, свадьбы и корпоративы.
              </p>

              <div className="mt-8">
                <a
                  href={SITE_CONFIG.yandexMapsOrgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary h-12 px-6 text-sm"
                >
                  <span>Все отзывы на Яндекс Картах</span>
                  <ArrowUpRightIcon className="h-4 w-4 text-accent-text" />
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[580px]">
              <YandexReviewsWidget />
            </div>
          </div>
        </div>
      </section>

      {/* 10. Split Architectural FAQ */}
      <section className="border-t border-hairline bg-surface py-20 sm:py-26">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
            <div className="lg:sticky lg:top-28">
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-4xl">
                Частые вопросы об аренде
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                Собрали ответы по правилам площадки, времени подготовки, своей
                еде и рассадке гостей. Если у вас нестандартный формат,
                позвоните нам по номеру{" "}
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="font-mono font-bold text-accent-text hover:underline"
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
                .
              </p>
            </div>

            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* 11. Editorial Journal (Blog) */}
      <section id="blog" className="border-t border-hairline py-20 sm:py-26">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-4xl">
                Журнал о событиях
              </h2>
              <p className="mt-2.5 text-sm text-ink-muted sm:text-base">
                Практические разборы по бюджету, выбору площадки и организации
                вечеринок в Пятигорске.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-accent-text transition hover:text-ink"
            >
              <span>Все материалы журнала</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.uid}
                className="group flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface transition hover:border-hairline-strong"
              >
                <Link
                  href={post.url}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-surface-elevated"
                >
                  <img
                    src={post.coverImage}
                    alt={post.coverAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </Link>

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-ink-subtle">
                      <time dateTime={post.datePublished}>
                        {post.dateDisplay}
                      </time>
                      <span>·</span>
                      <span>{post.readingTime}</span>
                    </div>

                    <h3 className="mt-3 font-display text-lg leading-snug font-semibold text-ink transition group-hover:text-accent-text sm:text-xl">
                      <Link href={post.url}>{post.title}</Link>
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-2">
                    <Link
                      href={post.url}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-accent-text transition group-hover:text-ink"
                    >
                      <span>Читать материал</span>
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Contacts & Interactive Map */}
      <ContactsMapSection />
    </main>
  );
}
