import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";
import { ContactsMapSection } from "@/components/ContactsMapSection";
import { OpenModalButton } from "@/components/OpenModalButton";

export const metadata: Metadata = {
  title: "Контакты — Лофт «ШУМНО» в Пятигорске (ул. Мира 155А)",
  description:
    "Контакты лофт-пространства «ШУМНО» (GoodRoom) в Пятигорске: ул. Мира 155А, 2 этаж, тел. +7 (928) 020-10-01. Бесплатная парковка, работаем 24/7 по записи.",
  alternates: {
    canonical: "/contacts",
  },
  openGraph: {
    title: "Контакты — Лофт «ШУМНО» в Пятигорске",
    description:
      "Пятигорск, ул. Мира 155А, 2 этаж • +7 (928) 020-10-01 • Работаем 24/7 по предварительной записи.",
    url: "/contacts",
    images: [{ url: "/images/og/contacts.png" }],
  },
};

export default function ContactsPage() {
  return (
    <main>
      {/* Narrow Cover Section */}
      <section className="relative overflow-hidden bg-black py-20 text-white sm:py-28">
        <img
          src="/images/contacts/cover.jpg"
          alt="Контакты пространства «ШУМНО» в Пятигорске"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/55" />

        <div className="relative z-10 mx-auto max-w-[1100px] px-4 text-center sm:px-6">
          <span className="inline-block rounded-full border border-[#43ff57]/40 bg-black/70 px-4 py-1 text-xs font-bold tracking-widest text-[#43ff57] uppercase">
            {SITE_CONFIG.city}
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-wide text-white uppercase sm:text-6xl">
            КОНТАКТЫ
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
            {SITE_CONFIG.address} • Работаем круглосуточно 24/7 по
            предварительному бронированию
          </p>
        </div>
      </section>

      {/* Main Contacts & Interactive HTTPS Map */}
      <ContactsMapSection />

      {/* Legal Requisites & Visiting Info */}
      <section className="bg-[#f3f3f3] py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2">
          <div className="rounded-[18px] bg-white p-7 shadow-xs sm:p-8">
            <h2 className="text-xl font-bold text-black sm:text-2xl">
              Как добраться и посмотреть лофт
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-black/75 sm:text-[15px]">
              Мы находимся по адресу:{" "}
              <strong className="text-black">{SITE_CONFIG.address}</strong>.
              Возле входа предусмотрена бесплатная парковка для гостей.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-black/75 sm:text-[15px]">
              Перед бронированием вы можете приехать на бесплатный просмотр зала
              по предварительной договорённости с менеджером.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <OpenModalButton
                mode="callback"
                source="Страница Контакты (Запись на просмотр)"
                className="inline-flex h-11 cursor-pointer items-center justify-center rounded-[8px] bg-[#43ff57] px-5 text-sm font-bold text-black transition hover:bg-[#33d744] hover:text-white"
              >
                Записаться на просмотр
              </OpenModalButton>
              <a
                href={SITE_CONFIG.yandexMapsOrgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-[8px] border border-black/20 px-5 text-sm font-bold text-black transition hover:bg-black hover:text-white"
              >
                Построить маршрут ↗
              </a>
            </div>
          </div>

          <div className="rounded-[18px] bg-white p-7 shadow-xs sm:p-8">
            <h2 className="text-xl font-bold text-black sm:text-2xl">
              Реквизиты организации
            </h2>
            <dl className="mt-4 space-y-2.5 text-sm text-black/80">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <dt className="text-black/50">Наименование:</dt>
                <dd className="font-bold text-black">
                  {SITE_CONFIG.legalName}
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <dt className="text-black/50">ИНН:</dt>
                <dd className="font-semibold text-black">{SITE_CONFIG.inn}</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <dt className="text-black/50">ОГРНИП:</dt>
                <dd className="font-semibold text-black">
                  {SITE_CONFIG.ogrnip}
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <dt className="text-black/50">Телефон для брони и счетов:</dt>
                <dd className="font-semibold text-black">
                  <a
                    href={SITE_CONFIG.messengerPhoneHref}
                    className="hover:text-[#36b644]"
                  >
                    {SITE_CONFIG.messengerPhoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <dt className="text-black/50">E-mail:</dt>
                <dd className="font-semibold text-black">
                  <a
                    href={SITE_CONFIG.emailHref}
                    className="hover:text-[#36b644]"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-5 border-t border-black/10 pt-4 text-xs text-black/60">
              Работаем с физ. и юр. лицами (оплата по счёту, чек, акт).{" "}
              <Link
                href="/offer"
                className="font-bold text-[#ff8562] underline hover:text-black"
              >
                Читать публичную оферту →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
