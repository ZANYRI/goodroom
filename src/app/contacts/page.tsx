import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";
import { ContactsMapSection } from "@/components/ContactsMapSection";
import { OpenModalButton } from "@/components/OpenModalButton";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Контакты: Лофт «ШУМНО» в Пятигорске (ул. Мира 155А)",
  description:
    "Контакты лофт-пространства «ШУМНО» (GoodRoom) в Пятигорске: ул. Мира 155А, 2 этаж, тел. +7 (928) 020-10-01. Бесплатная парковка, работаем 24/7 по записи.",
  alternates: {
    canonical: "/contacts",
  },
  openGraph: {
    title: "Контакты: Лофт «ШУМНО» в Пятигорске",
    description:
      "Пятигорск, ул. Мира 155А, 2 этаж · +7 (928) 020-10-01 · Работаем 24/7 по предварительной записи.",
    url: "/contacts",
    images: [{ url: "/images/og/contacts.png" }],
  },
};

export default function ContactsPage() {
  return (
    <main className="bg-canvas text-ink">
      {/* Asymmetric Split Contacts Header */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-12 sm:px-6 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-accent-text uppercase">
              {SITE_CONFIG.city}
            </p>
            <h1 className="mt-3 font-display text-3xl leading-[1.15] font-semibold text-ink sm:text-5xl">
              Контакты и схема проезда
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {SITE_CONFIG.address}. Площадка работает круглосуточно 24/7 по
              предварительному бронированию.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-hairline bg-surface">
            <img
              src="/images/contacts/cover.jpg"
              alt="Контакты пространства «ШУМНО» в Пятигорске"
              fetchPriority="high"
              className="aspect-[16/10] h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Main Contacts & Interactive HTTPS Map */}
      <ContactsMapSection />

      {/* Visiting Info & Legal Requisites */}
      <section className="border-t border-hairline bg-surface py-16 sm:py-22">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2">
          <div className="flex flex-col justify-between rounded-2xl border border-hairline bg-canvas p-7 sm:p-8">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                Как добраться и посмотреть зал
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                Мы находимся по адресу:{" "}
                <strong className="font-semibold text-ink">
                  {SITE_CONFIG.address}
                </strong>
                . Непосредственно у входа расположена бесплатная парковка для
                гостей и организаторов.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                Перед бронированием вы можете приехать на бесплатный просмотр
                площадки по предварительному согласованию времени с менеджером.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <OpenModalButton
                mode="callback"
                source="Страница Контакты (Запись на просмотр)"
                className="btn-primary h-11 px-5 text-sm"
              >
                Записаться на просмотр
              </OpenModalButton>
              <a
                href={SITE_CONFIG.yandexMapsOrgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary h-11 px-5 text-sm"
              >
                <span>Построить маршрут</span>
                <ArrowUpRightIcon className="h-4 w-4 text-accent-text" />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-hairline bg-canvas p-7 sm:p-8">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                Реквизиты организации
              </h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex flex-col gap-1 border-b border-hairline pb-3 sm:flex-row sm:justify-between">
                  <dt className="text-ink-subtle">Наименование</dt>
                  <dd className="font-semibold text-ink">
                    {SITE_CONFIG.legalName}
                  </dd>
                </div>
                <div className="flex flex-col gap-1 border-b border-hairline pb-3 sm:flex-row sm:justify-between">
                  <dt className="text-ink-subtle">ИНН</dt>
                  <dd className="font-mono font-semibold text-ink tabular-nums">
                    {SITE_CONFIG.inn}
                  </dd>
                </div>
                <div className="flex flex-col gap-1 border-b border-hairline pb-3 sm:flex-row sm:justify-between">
                  <dt className="text-ink-subtle">ОГРНИП</dt>
                  <dd className="font-mono font-semibold text-ink tabular-nums">
                    {SITE_CONFIG.ogrnip}
                  </dd>
                </div>
                <div className="flex flex-col gap-1 border-b border-hairline pb-3 sm:flex-row sm:justify-between">
                  <dt className="text-ink-subtle">Телефон для брони и счетов</dt>
                  <dd className="font-mono font-semibold text-ink tabular-nums">
                    <a
                      href={SITE_CONFIG.messengerPhoneHref}
                      className="transition hover:text-accent-text"
                    >
                      {SITE_CONFIG.messengerPhoneDisplay}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                  <dt className="text-ink-subtle">Электронная почта</dt>
                  <dd className="font-semibold text-ink">
                    <a
                      href={SITE_CONFIG.emailHref}
                      className="transition hover:text-accent-text"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 border-t border-hairline pt-4 text-xs leading-relaxed text-ink-muted">
              Работаем с физическими и юридическими лицами (оплата по счету,
              кассовый чек, закрывающий акт).{" "}
              <Link
                href="/offer"
                className="inline-flex items-center gap-1 font-bold text-accent-text transition hover:text-ink"
              >
                <span>Читать публичную оферту</span>
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
