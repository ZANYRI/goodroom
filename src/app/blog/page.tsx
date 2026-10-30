import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";
import { ContactsMapSection } from "@/components/ContactsMapSection";
import { OpenModalButton } from "@/components/OpenModalButton";
import { ArrowRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title:
    "Блог пространства «ШУМНО»: советы по организации праздников в Пятигорске",
  description:
    "Статьи и советы от лофт-пространства «ШУМНО» в Пятигорске: как выбрать площадку для дня рождения, чем лофт отличается от кафе и как организовать вечеринку без переплат.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Блог пространства «ШУМНО», Пятигорск",
    description:
      "Честные обзоры, сравнения и идеи для дней рождения, выпускных, свадеб и корпоративов в Пятигорске.",
    url: "/blog",
    images: [{ url: "/images/og/home.png" }],
  },
};

export default function BlogIndexPage() {
  return (
    <main className="bg-canvas text-ink">
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-12 sm:px-6 lg:pt-16">
        <p className="text-xs font-bold tracking-[0.14em] text-accent-text uppercase">
          Журнал «ШУМНО»
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl leading-[1.15] font-semibold text-ink sm:text-5xl">
          Материалы о праздниках и частных событиях в Пятигорске
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          Разбираем экономику мероприятий, сценарии вечеринок, дни рождения,
          камерные свадьбы и неформальные корпоративы.
        </p>
      </section>

      <section className="border-t border-hairline py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
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

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-ink-subtle">
                      <time dateTime={post.datePublished}>
                        {post.dateDisplay}
                      </time>
                      <span>·</span>
                      <span>{post.readingTime}</span>
                    </div>

                    <h2 className="mt-3 font-display text-lg leading-snug font-semibold text-ink transition group-hover:text-accent-text sm:text-2xl">
                      <Link href={post.url}>{post.title}</Link>
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-2">
                    <Link
                      href={post.url}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-accent-text transition group-hover:text-ink"
                    >
                      <span>Читать полностью</span>
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-hairline-strong bg-surface p-8 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  Планируете свое мероприятие в Пятигорске?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">
                  Проверьте свободные часы или запишитесь на бесплатный просмотр
                  пространства «ШУМНО» (100 м², от 1 500 ₽/час).
                </p>
              </div>
              <OpenModalButton
                mode="booking"
                source="Страница Журнала"
                className="btn-primary h-12 px-7 text-sm"
              >
                Рассчитать и забронировать
              </OpenModalButton>
            </div>
          </div>
        </div>
      </section>

      <ContactsMapSection />
    </main>
  );
}
