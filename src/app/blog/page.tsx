import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";
import { ContactsMapSection } from "@/components/ContactsMapSection";
import { OpenModalButton } from "@/components/OpenModalButton";

export const metadata: Metadata = {
  title: "Блог пространства «ШУМНО» — советы по организации праздников в Пятигорске",
  description:
    "Статьи и советы от лофт-пространства «ШУМНО» в Пятигорске: как выбрать площадку для дня рождения, чем лофт отличается от кафе и как организовать вечеринку без переплат.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Блог пространства «ШУМНО» — Пятигорск",
    description:
      "Честные обзоры, сравнения и идеи для дней рождения, выпускных, свадеб и корпоративов в Пятигорске.",
    url: "/blog",
    images: [{ url: "/images/og/home.png" }],
  },
};

export default function BlogIndexPage() {
  return (
    <main>
      <section className="bg-black py-16 text-white sm:py-22">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <span className="inline-block rounded-full border border-[#43ff57]/40 bg-white/5 px-4 py-1 text-xs font-bold tracking-wider text-[#43ff57] uppercase">
            Журнал «ШУМНО»
          </span>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-5xl">
            Блог о праздниках и лофт-вечеринках в Пятигорске
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/75 sm:text-lg">
            Делимся опытом организации дней рождения, камерных свадеб,
            корпоративов и уютных вечеров с друзьями.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
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

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-semibold text-black/50">
                      <time dateTime={post.datePublished}>
                        {post.dateDisplay}
                      </time>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>

                    <h2 className="mt-3 text-xl leading-snug font-bold text-[#36b644] transition group-hover:text-black sm:text-2xl">
                      <Link href={post.url}>{post.title}</Link>
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-black/75 sm:text-[15px]">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-2">
                    <Link
                      href={post.url}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-black transition group-hover:text-[#36b644]"
                    >
                      <span>Читать полностью</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-[20px] bg-[#f3f3f3] p-8 text-center sm:p-10">
            <h2 className="text-2xl font-bold text-black sm:text-3xl">
              Планируете своё мероприятие в Пятигорске?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-black/70 sm:text-base">
              Забронируйте свободную дату или запишитесь на бесплатный просмотр
              пространства «ШУМНО» (100 м², от 1 500 ₽/час).
            </p>
            <div className="mt-6">
              <OpenModalButton
                mode="booking"
                source="Страница Блога"
                className="inline-flex h-13 cursor-pointer items-center justify-center rounded-[10px] bg-[#43ff57] px-8 text-[15px] font-bold text-black transition hover:bg-[#33d744] hover:text-white"
              >
                Рассчитать стоимость и забронировать
              </OpenModalButton>
            </div>
          </div>
        </div>
      </section>

      <ContactsMapSection />
    </main>
  );
}
