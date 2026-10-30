import type { Metadata } from "next";
import Link from "next/link";
import { OFFER_DOCUMENT } from "@/data/offer";
import { ContactsMapSection } from "@/components/ContactsMapSection";
import { ArrowLeftIcon, CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Публичная оферта: Лофт «ШУМНО» (Пятигорск)",
  description:
    "Публичная оферта о заключении договора краткосрочной аренды помещения лофта «ШУМНО» в г. Пятигорск (ул. Мира 155А), перечень имущества и правила пользования.",
  alternates: {
    canonical: "/offer",
  },
};

export default function OfferPage() {
  return (
    <main className="bg-canvas text-ink">
      {/* Header */}
      <section className="mx-auto max-w-[960px] px-4 pt-10 pb-8 sm:px-6 lg:pt-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-text transition hover:text-ink"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          <span>На главную страницу</span>
        </Link>
        <h1 className="mt-4 font-display text-2xl leading-snug font-semibold text-ink sm:text-4xl">
          {OFFER_DOCUMENT.title}
        </h1>
        <p className="mt-2 text-sm text-ink-muted">{OFFER_DOCUMENT.city}</p>
      </section>

      {/* Verbatim Legal Contract Body */}
      <section className="pb-16 sm:pb-22">
        <div className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="rounded-2xl border border-hairline bg-surface p-6 text-sm leading-relaxed text-ink-muted sm:p-8 sm:text-[15px]">
            {OFFER_DOCUMENT.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-10 space-y-9">
            {OFFER_DOCUMENT.sections.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
                  {section.title}
                </h2>
                <div className="space-y-2.5 text-sm leading-relaxed text-ink-muted sm:text-[15px]">
                  {section.paragraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Appendix 1: Property Inventory */}
          <div className="mt-14 border-t border-hairline pt-12">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              {OFFER_DOCUMENT.appendix1.title}
            </h2>
            <p className="mt-2 text-sm text-ink-muted sm:text-base">
              {OFFER_DOCUMENT.appendix1.subtitle}
            </p>

            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {OFFER_DOCUMENT.appendix1.rooms.map((roomBlock) => (
                <div
                  key={roomBlock.room}
                  className="rounded-2xl border border-hairline bg-surface p-6"
                >
                  <h3 className="font-display text-base font-semibold text-ink sm:text-lg">
                    {roomBlock.room}
                  </h3>
                  <ul className="mt-3.5 space-y-2 text-sm text-ink-muted">
                    {roomBlock.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Appendix 2: Facility Rules */}
          <div className="mt-14 border-t border-hairline pt-12">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              {OFFER_DOCUMENT.appendix2.title}
            </h2>

            <div className="mt-7 space-y-4">
              {OFFER_DOCUMENT.appendix2.blocks.map((block) => (
                <div
                  key={block.heading}
                  className="rounded-2xl border border-hairline bg-surface p-6"
                >
                  <h3 className="font-display text-base font-semibold text-ink sm:text-lg">
                    {block.heading}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-[15px]">
                    {block.text}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="mt-8 rounded-2xl border p-6 sm:p-8"
              style={{
                backgroundColor: "var(--danger-bg)",
                borderColor: "var(--danger-border)",
              }}
            >
              <h3
                className="font-display text-lg font-semibold sm:text-xl"
                style={{ color: "var(--danger-text)" }}
              >
                В помещении строго запрещается:
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink sm:text-[15px]">
                {OFFER_DOCUMENT.appendix2.prohibited.map((rule) => (
                  <li key={rule} className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 font-mono text-xs font-bold"
                      style={{ color: "var(--danger-text)" }}
                    >
                      /
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-hairline pt-4 text-xs font-semibold text-ink-muted sm:text-sm">
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
