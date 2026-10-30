import type { Metadata } from "next";
import Link from "next/link";
import { OFFER_DOCUMENT } from "@/data/offer";
import { ContactsMapSection } from "@/components/ContactsMapSection";

export const metadata: Metadata = {
  title: "Публичная оферта — Лофт «ШУМНО» (Пятигорск)",
  description:
    "Публичная оферта о заключении договора краткосрочной аренды помещения лофта «ШУМНО» в г. Пятигорск (ул. Мира 155А), перечень имущества и правила пользования.",
  alternates: {
    canonical: "/offer",
  },
};

export default function OfferPage() {
  return (
    <main>
      {/* Header Banner */}
      <section className="bg-black py-14 text-white sm:py-18">
        <div className="mx-auto max-w-[960px] px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#43ff57] transition hover:underline"
          >
            ← На главную
          </Link>
          <h1 className="mt-4 text-2xl leading-snug font-bold text-white sm:text-4xl">
            {OFFER_DOCUMENT.title}
          </h1>
          <p className="mt-2 text-sm text-white/65">{OFFER_DOCUMENT.city}</p>
        </div>
      </section>

      {/* Main Offer Text */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="rounded-[16px] border border-black/10 bg-[#f8f8f8] p-6 text-sm leading-relaxed text-black/85 sm:p-8 sm:text-[15px]">
            {OFFER_DOCUMENT.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-10 space-y-9">
            {OFFER_DOCUMENT.sections.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-lg font-bold text-black sm:text-xl">
                  {section.title}
                </h2>
                <div className="space-y-2.5 text-sm leading-relaxed text-black/80 sm:text-[15px]">
                  {section.paragraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Appendix 1: Property Inventory */}
          <div className="mt-14 border-t border-black/12 pt-12">
            <h2 className="text-2xl font-bold text-black sm:text-3xl">
              {OFFER_DOCUMENT.appendix1.title}
            </h2>
            <p className="mt-2 text-sm text-black/70 sm:text-base">
              {OFFER_DOCUMENT.appendix1.subtitle}
            </p>

            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {OFFER_DOCUMENT.appendix1.rooms.map((roomBlock) => (
                <div
                  key={roomBlock.room}
                  className="rounded-[16px] border border-black/10 bg-[#f8f8f8] p-6"
                >
                  <h3 className="text-lg font-bold text-black">
                    {roomBlock.room}
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-black/80">
                    {roomBlock.items.map((item) => (
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

          {/* Appendix 2: Facility Rules */}
          <div className="mt-14 border-t border-black/12 pt-12">
            <h2 className="text-2xl font-bold text-black sm:text-3xl">
              {OFFER_DOCUMENT.appendix2.title}
            </h2>

            <div className="mt-7 space-y-5">
              {OFFER_DOCUMENT.appendix2.blocks.map((block) => (
                <div
                  key={block.heading}
                  className="rounded-[14px] border border-black/10 bg-white p-6 shadow-2xs"
                >
                  <h3 className="text-base font-bold text-black sm:text-lg">
                    {block.heading}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/80 sm:text-[15px]">
                    {block.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[16px] border border-[#ff4a4a]/25 bg-[#fff6f6] p-6 sm:p-8">
              <h3 className="text-lg font-bold text-[#c62828] sm:text-xl">
                В помещении строго запрещается:
              </h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-black/85 sm:text-[15px]">
                {OFFER_DOCUMENT.appendix2.prohibited.map((rule) => (
                  <li key={rule} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ff4a4a]" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-[#ff4a4a]/20 pt-4 text-xs font-bold text-black/75 sm:text-sm">
                {OFFER_DOCUMENT.appendix2.securityNotice}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactsMapSection />
    </main>
  );
}
