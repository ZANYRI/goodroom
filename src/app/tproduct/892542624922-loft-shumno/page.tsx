import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";
import { INCLUDED_FEATURES, LOFT_PRODUCT } from "@/data/home";
import { OFFER_DOCUMENT } from "@/data/offer";
import { LoftCatalogCard } from "@/components/LoftCatalogCard";
import { ContactsMapSection } from "@/components/ContactsMapSection";
import { ArrowLeftIcon, CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: LOFT_PRODUCT.seoTitle,
  description: LOFT_PRODUCT.seoDescription,
  alternates: {
    canonical: LOFT_PRODUCT.url,
  },
  openGraph: {
    title: LOFT_PRODUCT.seoTitle,
    description: LOFT_PRODUCT.seoDescription,
    url: LOFT_PRODUCT.url,
    images: [{ url: LOFT_PRODUCT.gallery[0].src }],
  },
};

export default function LoftProductPage() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: LOFT_PRODUCT.title,
    description: LOFT_PRODUCT.seoDescription,
    sku: LOFT_PRODUCT.uid,
    image: LOFT_PRODUCT.gallery.map((g) => `${SITE_CONFIG.url}${g.src}`),
    brand: {
      "@type": "Brand",
      name: SITE_CONFIG.name,
    },
    offers: {
      "@type": "AggregateOffer",
      url: `${SITE_CONFIG.url}${LOFT_PRODUCT.url}`,
      priceCurrency: "RUB",
      lowPrice: "1500",
      highPrice: "2500",
      offerCount: LOFT_PRODUCT.editions.length,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:pt-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-text transition hover:text-ink"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          <span>На главную страницу</span>
        </Link>

        <h1 className="mt-4 max-w-4xl font-display text-3xl leading-[1.15] font-semibold text-ink sm:text-5xl">
          {LOFT_PRODUCT.seoTitle}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-ink-muted sm:text-base">
          {SITE_CONFIG.address} · Почасовая аренда 24/7 без пробкового сбора
        </p>
      </section>

      {/* Interactive Configurator */}
      <section className="pb-18 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <LoftCatalogCard showDetailsLink={false} />
        </div>
      </section>

      {/* Included Equipment & Room-by-Room Inventory */}
      <section className="border-t border-hairline bg-surface py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Что включено в базовый тариф
          </h2>
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED_FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="flex items-start gap-4 rounded-2xl border border-hairline bg-canvas p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-elevated p-2.5">
                  <img
                    src={feat.icon}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="icon-adaptive h-full w-full object-contain"
                  />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink sm:text-base">
                    {feat.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                    {feat.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              Зонирование и оснащение залов (100 м²)
            </h2>
            <p className="mt-2.5 max-w-2xl text-sm text-ink-muted sm:text-base">
              Полный перечень оборудования, мебели и техники по каждой зоне
              пространства.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              {OFFER_DOCUMENT.appendix1.rooms.map((room) => (
                <div
                  key={room.room}
                  className="rounded-2xl border border-hairline bg-canvas p-6 sm:p-7"
                >
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {room.room.replace(/[—–]/g, "-")}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                    {room.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                        <span>{item.replace(/[—–]/g, "-")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactsMapSection />
    </main>
  );
}
