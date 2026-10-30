import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";
import { INCLUDED_FEATURES, LOFT_PRODUCT } from "@/data/home";
import { OFFER_DOCUMENT } from "@/data/offer";
import { LoftCatalogCard } from "@/components/LoftCatalogCard";
import { ContactsMapSection } from "@/components/ContactsMapSection";

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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      {/* Breadcrumb & Title Header */}
      <section className="bg-black py-10 text-white sm:py-14">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#43ff57] transition hover:underline"
          >
            ← Все форматы и главная
          </Link>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-5xl">
            {LOFT_PRODUCT.seoTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
            {SITE_CONFIG.address} • Почасовая аренда 24/7 без пробкового сбора
          </p>
        </div>
      </section>

      {/* Interactive Product Card */}
      <section className="bg-[#f3f3f3] py-12 sm:py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <LoftCatalogCard showDetailsLink={false} />
        </div>
      </section>

      {/* Included Amenities & Full Equipment */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-black sm:text-3xl">
            Что уже включено в стоимость аренды
          </h2>
          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {INCLUDED_FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="flex flex-col items-center rounded-[14px] border border-black/8 bg-[#f8f8f8] p-5 text-center"
              >
                <img
                  src={feat.icon}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-11 w-11 object-contain"
                />
                <span className="mt-3 text-xs font-bold text-black sm:text-sm">
                  {feat.title}
                </span>
              </div>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-bold text-black sm:text-3xl">
            Оснащение залов (100 м²)
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OFFER_DOCUMENT.appendix1.rooms.map((room) => (
              <div
                key={room.room}
                className="rounded-[16px] border border-black/10 bg-[#f8f8f8] p-6"
              >
                <h3 className="text-lg font-bold text-black">{room.room}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-black/75">
                  {room.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#36b644]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactsMapSection />
    </main>
  );
}
