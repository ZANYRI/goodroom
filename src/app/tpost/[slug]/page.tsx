import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/blog";
import { SITE_CONFIG } from "@/data/site";
import { OpenModalButton } from "@/components/OpenModalButton";
import { ContactsMapSection } from "@/components/ContactsMapSection";
import { ArrowLeftIcon, CheckIcon } from "@/components/Icons";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Статья не найдена",
    };
  }

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: {
      canonical: post.url,
    },
    openGraph: {
      type: "article",
      title: post.seoTitle,
      description: post.seoDescription,
      url: post.url,
      publishedTime: post.datePublished,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          alt: post.coverAlt,
        },
      ],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    image: `${SITE_CONFIG.url}${post.coverImage}`,
    datePublished: post.datePublished,
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/images/brand/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}${post.url}`,
    },
  };

  return (
    <main className="bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />

      {/* Article Header */}
      <section className="mx-auto max-w-[860px] px-4 pt-10 pb-8 sm:px-6 lg:pt-14">
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-ink-muted">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-bold text-accent-text transition hover:text-ink"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            <span>Все материалы журнала</span>
          </Link>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="mt-4 font-display text-2xl leading-[1.2] font-semibold text-ink sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-6 flex items-center gap-3.5">
          <img
            src={post.authorAvatar}
            alt={post.author}
            className="h-10 w-10 rounded-xl border border-hairline bg-surface object-cover"
          />
          <div className="text-xs">
            <p className="font-bold text-ink">{post.author}</p>
            <time dateTime={post.datePublished} className="text-ink-subtle">
              {post.dateDisplay}
            </time>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="pb-16 sm:pb-22">
        <div className="mx-auto max-w-[860px] px-4 sm:px-6">
          <figure className="overflow-hidden rounded-2xl border border-hairline bg-surface">
            <img
              src={post.coverImage}
              alt={post.coverAlt}
              fetchPriority="high"
              className="aspect-[16/10] w-full object-cover"
            />
          </figure>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-ink-muted sm:text-[17px]">
            {post.sections.map((section, idx) => {
              if (section.type === "paragraph") {
                return <p key={idx}>{section.text}</p>;
              }

              if (section.type === "heading2") {
                return (
                  <h2
                    key={idx}
                    className="pt-4 font-display text-xl leading-snug font-semibold text-ink sm:text-2xl"
                  >
                    {section.text}
                  </h2>
                );
              }

              if (section.type === "heading3") {
                return (
                  <h3
                    key={idx}
                    className="pt-2 font-display text-lg leading-snug font-semibold text-ink sm:text-xl"
                  >
                    {section.text}
                  </h3>
                );
              }

              if (section.type === "quote") {
                return (
                  <blockquote
                    key={idx}
                    className="rounded-2xl border-l-4 border-accent bg-surface px-6 py-5 text-base leading-relaxed font-semibold text-ink"
                  >
                    {section.text}
                  </blockquote>
                );
              }

              if (section.type === "bullets" && section.items) {
                return (
                  <ul key={idx} className="space-y-2.5 pl-1">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-accent-text" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              if (section.type === "image" && section.src) {
                return (
                  <figure
                    key={idx}
                    className="my-8 overflow-hidden rounded-2xl border border-hairline bg-surface"
                  >
                    <img
                      src={section.src}
                      alt={section.alt || post.title}
                      loading="lazy"
                      className="w-full object-cover"
                    />
                    {section.alt && (
                      <figcaption className="border-t border-hairline px-4 py-2.5 text-center text-xs text-ink-subtle">
                        {section.alt}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              if (
                section.type === "table" &&
                section.headers &&
                section.rows
              ) {
                return (
                  <div
                    key={idx}
                    className="my-6 overflow-x-auto rounded-2xl border border-hairline bg-surface"
                  >
                    <table className="w-full min-w-[560px] border-collapse text-left text-sm sm:text-[15px]">
                      <thead>
                        <tr className="border-b border-hairline bg-surface-elevated">
                          {section.headers.map((header, hIdx) => (
                            <th
                              key={header}
                              className={`px-4 py-3.5 font-bold ${
                                hIdx === 2 ? "text-accent-text" : "text-ink"
                              }`}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-hairline">
                        {section.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`px-4 py-3.5 align-top ${
                                  cIdx === 0
                                    ? "font-bold text-ink"
                                    : cIdx === 2
                                      ? "font-semibold text-ink"
                                      : "text-ink-muted"
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Booking CTA Panel */}
          <div className="mt-14 rounded-2xl border border-hairline-strong bg-surface p-7 sm:p-9">
            <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
              Проведите событие без ресторанных ограничений
            </h2>
            <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
              100 м² закрытого лофта на ул. Мира 155А: можно шуметь 24/7, со
              своей едой и напитками без сборов, PS5, караоке 50 000+ песен и
              посудой. От 1 500 ₽/час.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <OpenModalButton
                mode="booking"
                source={`Статья: ${post.title}`}
                className="btn-primary h-12 px-7 text-sm"
              >
                Проверить дату
              </OpenModalButton>
              <Link href="/" className="btn-secondary h-12 px-6 text-sm">
                Смотреть фото зала
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {otherPosts.length > 0 && (
            <div className="mt-14 border-t border-hairline pt-10">
              <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
                Другие материалы журнала
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-4">
                {otherPosts.map((other) => (
                  <Link
                    key={other.uid}
                    href={other.url}
                    className="group flex flex-col gap-4 rounded-2xl border border-hairline bg-surface p-4 transition hover:border-hairline-strong sm:flex-row sm:items-center"
                  >
                    <img
                      src={other.coverImage}
                      alt={other.coverAlt}
                      loading="lazy"
                      className="h-28 w-full shrink-0 rounded-xl object-cover sm:w-44"
                    />
                    <div>
                      <span className="text-xs font-semibold text-ink-subtle">
                        {other.dateDisplay} · {other.readingTime}
                      </span>
                      <h3 className="mt-1.5 font-display text-base font-semibold text-ink transition group-hover:text-accent-text">
                        {other.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <ContactsMapSection />
    </main>
  );
}
