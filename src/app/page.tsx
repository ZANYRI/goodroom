import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";
import {
  EVENT_CATEGORIES,
  EXTRA_SERVICES,
  HOME_ADVANTAGES,
  HOME_FAQ,
  INCLUDED_FEATURES,
  MAIN_LOFT_GALLERY,
} from "@/data/home";
import { BLOG_POSTS } from "@/data/blog";
import { HeroQuickForm } from "@/components/HeroQuickForm";
import { LoftCatalogCard } from "@/components/LoftCatalogCard";
import { OpenModalButton } from "@/components/OpenModalButton";
import { PhotoGalleryGrid } from "@/components/PhotoGalleryGrid";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ContactsMapSection } from "@/components/ContactsMapSection";

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
    <main>
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

      {/* 1. Hero Cover */}
      <section className="relative overflow-hidden bg-black py-20 text-white sm:py-28 lg:py-36">
        <img
          src="/images/home/hero.jpg"
          alt="Аренда лофта для вечеринок в Пятигорске — пространство «ШУМНО»"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-48"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/68 to-black/45" />

        <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#43ff57]/40 bg-black/70 px-4 py-1.5 text-xs font-bold tracking-wider text-[#43ff57] uppercase backdrop-blur-xs">
              <span className="h-2 w-2 rounded-full bg-[#43ff57]" />
              Пятигорск • ул. Мира 155А • 24/7
            </span>

            <h1 className="mt-5 text-3xl leading-[1.16] font-bold text-white sm:text-5xl lg:text-[56px]">
              Аренда лофта для вечеринок в Пятигорске — пространство «ШУМНО»
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-xl">
              Уютное место для тусовок, встреч и мероприятий до 18 человек.
            </p>

            <div className="mt-8">
              <HeroQuickForm />
            </div>

            <div className="mt-9 flex flex-wrap gap-2.5 text-xs font-bold sm:text-sm">
              {[
                "100 м² пространства",
                "До 18 гостей (25 — фуршет)",
                "Можно шуметь 24/7",
                "Своя еда и напитки — 0 ₽ сбор",
                "От 1 500 ₽/час",
              ].map((fact) => (
                <span
                  key={fact}
                  className="rounded-full border border-white/15 bg-black/65 px-4 py-2 text-white/90 backdrop-blur-xs"
                >
                  {fact}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Event Categories */}
      <section className="bg-white py-16 sm:py-22">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-14">
            <h2 className="text-3xl font-bold text-black sm:text-[42px]">
              Варианты мероприятий в «ШУМНО»
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_CATEGORIES.map((category) => (
              <article
                key={category.id}
                className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[18px] bg-black p-6 text-white shadow-md"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/55 to-black/20" />

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white">
                    {category.title}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.items.map((item) =>
                      item.href ? (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="rounded-full border border-[#43ff57]/55 bg-black/70 px-3.5 py-1.5 text-xs font-bold text-[#43ff57] backdrop-blur-xs transition hover:bg-[#43ff57] hover:text-black"
                        >
                          {item.label} →
                        </Link>
                      ) : (
                        <span
                          key={item.label}
                          className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-xs"
                        >
                          {item.label}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Loft Store Catalog Card */}
      <section className="bg-[#f3f3f3] py-16 sm:py-22">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-14">
            <h2 className="text-3xl font-bold text-black sm:text-[42px]">
              Уникальное место для вашего мероприятия
            </h2>
          </div>

          <LoftCatalogCard />
        </div>
      </section>

      {/* 4. Advantages (Noir Section) */}
      <section className="bg-black py-16 text-white sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-[42px]">
              Наши преимущества: почему выбирают «ШУМНО»
            </h2>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#121212]">
              <img
                src="/images/home/advantages.jpg"
                alt="Интерьер лофта «ШУМНО» в Пятигорске"
                loading="lazy"
                className="aspect-[4/3] h-full w-full object-cover lg:aspect-[4/4.3]"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {HOME_ADVANTAGES.map((adv) => (
                <div
                  key={adv.title}
                  className="rounded-[18px] border border-white/10 bg-[#121212] p-6 transition hover:border-[#43ff57]/45"
                >
                  <img
                    src={adv.icon}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-13 w-13 object-contain"
                  />
                  <h3 className="mt-4 text-lg font-bold text-white sm:text-xl">
                    {adv.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/72">
                    {adv.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Prices, Included Features & Extra Services */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-black sm:text-[42px]">
              Цены и что входит в стоимость
            </h2>
            <p className="mt-4 text-base leading-relaxed text-black/75 sm:text-lg">
              У нас есть много классных вещей, которые вы можете использовать
              абсолютно бесплатно! Стоимость аренды всего от{" "}
              <span className="font-bold text-[#ff8562]">1 500 руб.</span>!
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {INCLUDED_FEATURES.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center rounded-[16px] border border-black/8 bg-[#f7f7f7] p-6 text-center transition hover:border-black/25 hover:bg-white hover:shadow-md"
              >
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-12 w-12 object-contain"
                />
                <span className="mt-4 text-sm font-bold text-black">
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          {/* Extra Services */}
          <div className="mt-16 rounded-[20px] bg-[#f3f3f3] p-8 sm:p-10">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-black sm:text-3xl">
                Получите еще больше эмоций
              </h3>
              <p className="mt-2 text-sm font-semibold tracking-wider text-black/55 uppercase">
                Дополнительные услуги под ключ
              </p>
            </div>

            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
              {EXTRA_SERVICES.map((srv) => (
                <div
                  key={srv.title}
                  className="flex items-center gap-4 rounded-[14px] bg-white p-5 shadow-xs"
                >
                  <img
                    src={srv.icon}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-11 w-11 shrink-0 object-contain"
                  />
                  <span className="text-base font-bold text-black">
                    {srv.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Viewing CTA Cover */}
      <section className="relative overflow-hidden bg-black py-20 text-white sm:py-28">
        <img
          src="/images/home/viewing-cover.jpg"
          alt="Записаться на просмотр лофта «ШУМНО» в Пятигорске"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-42"
        />
        <div className="absolute inset-0 bg-black/62" />

        <div className="relative z-10 mx-auto max-w-[920px] px-4 text-center sm:px-6">
          <h2 className="text-3xl leading-tight font-bold text-white sm:text-5xl">
            Забронируйте уютный лофт для ваших самых громких праздников
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-xl">
            Запишитесь на просмотр, чтобы выбрать идеальное место для вашего
            праздника ✨
          </p>

          <div className="mt-9">
            <OpenModalButton
              mode="callback"
              source="Записаться на просмотр (Главная)"
              className="shimmer-btn inline-flex h-14 cursor-pointer items-center justify-center rounded-[10px] bg-[#43ff57] px-9 text-[16px] font-bold text-black transition hover:bg-[#33d744] hover:text-white"
            >
              Записаться на просмотр
            </OpenModalButton>
          </div>
        </div>
      </section>

      {/* 7. Real Yandex Reviews */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <div>
              <span className="inline-block rounded-full bg-black px-3.5 py-1 text-xs font-bold tracking-wider text-[#43ff57] uppercase">
                Яндекс Карты • Рейтинг гостей
              </span>
              <h2 className="mt-4 text-3xl leading-[1.15] font-bold text-black sm:text-5xl">
                Реальные отзывы
                <span className="block text-[#36b644]">Реальные люди</span>
                <span className="block">Реальный лофт</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-black/75 sm:text-lg">
                Не придумываем цитаты — показываем, что пишут гости после своих
                праздников. Честные оценки, живые фото и атмосфера «Шумно»
                глазами тех, кто уже отмечал у нас.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={SITE_CONFIG.yandexMapsOrgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-[10px] bg-black px-6 text-sm font-bold text-white transition hover:bg-[#43ff57] hover:text-black"
                >
                  Открыть все отзывы на Яндекс Картах ↗
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[560px]">
              <div className="overflow-hidden rounded-[18px] border border-black/12 bg-[#f8f8f8] shadow-xl">
                <iframe
                  src={SITE_CONFIG.yandexReviewsIframeUrl}
                  title="Отзывы гостей о пространстве ШУМНО на Яндекс Картах"
                  className="h-[620px] w-full border-0"
                  loading="lazy"
                />
                <div className="border-t border-black/8 bg-white px-4 py-2.5 text-center text-xs text-black/60">
                  <a
                    href={SITE_CONFIG.yandexMapsOrgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:text-black hover:underline"
                  >
                    Шумно на карте Пятигорска — Яндекс Карты
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Main Loft Photo Gallery */}
      <section className="bg-black py-16 text-white sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-14">
            <h2 className="text-3xl font-bold text-white sm:text-[42px]">
              Фотогалерея: как выглядит наше пространство
            </h2>
          </div>

          <PhotoGalleryGrid images={MAIN_LOFT_GALLERY} dark />
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="bg-[#f3f3f3] py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-14">
            <h2 className="text-3xl font-bold text-black sm:text-[42px]">
              Часто задаваемые вопросы
            </h2>
          </div>

          <FaqAccordion />
        </div>
      </section>

      {/* 10. Blog */}
      <section id="blog" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:mb-14 sm:flex-row">
            <h2 className="text-3xl font-bold text-black sm:text-[42px]">
              Блог
            </h2>
            <Link
              href="/blog"
              className="text-sm font-bold text-black underline decoration-[#43ff57] decoration-2 underline-offset-4 transition hover:text-[#36b644]"
            >
              Все статьи блога →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.uid}
                className="group flex flex-col overflow-hidden rounded-[18px] border border-black/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Link
                  href={post.url}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-black/5"
                >
                  <img
                    src={post.coverImage}
                    alt={post.coverAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-semibold text-black/50">
                      <time dateTime={post.datePublished}>
                        {post.dateDisplay}
                      </time>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>

                    <h3 className="mt-3 text-xl leading-snug font-bold text-[#36b644] transition group-hover:text-black sm:text-2xl">
                      <Link href={post.url}>{post.title}</Link>
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-black/72 sm:text-[15px]">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-2">
                    <Link
                      href={post.url}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-black transition group-hover:text-[#36b644]"
                    >
                      <span>Читать статью</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Contacts & Map */}
      <ContactsMapSection />
    </main>
  );
}
