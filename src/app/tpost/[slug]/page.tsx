import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/blog";
import { SITE_CONFIG } from "@/data/site";
import { OpenModalButton } from "@/components/OpenModalButton";
import { ContactsMapSection } from "@/components/ContactsMapSection";

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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />

      {/* Article Header */}
      <section className="bg-black py-12 text-white sm:py-18">
        <div className="mx-auto max-w-[860px] px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-[#43ff57]">
            <Link href="/blog" className="hover:underline">
              ← Все статьи блога
            </Link>
            <span className="text-white/30">•</span>
            <span className="text-white/70">{post.readingTime}</span>
          </div>

          <h1 className="mt-4 text-2xl leading-[1.22] font-bold text-white sm:text-4xl lg:text-[42px]">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-3.5">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="h-10 w-10 rounded-full border border-white/15 bg-white/10 object-cover"
            />
            <div className="text-xs">
              <p className="font-bold text-white">{post.author}</p>
              <time
                dateTime={post.datePublished}
                className="text-white/60"
              >
                {post.dateDisplay}
              </time>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="bg-white py-10 sm:py-16">
        <div className="mx-auto max-w-[860px] px-4 sm:px-6">
          <figure className="overflow-hidden rounded-[18px] border border-black/10 bg-black/5 shadow-md">
            <img
              src={post.coverImage}
              alt={post.coverAlt}
              fetchPriority="high"
              className="aspect-[16/10] w-full object-cover"
            />
          </figure>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-black/85 sm:text-[17px]">
            {post.sections.map((section, idx) => {
              if (section.type === "paragraph") {
                return <p key={idx}>{section.text}</p>;
              }

              if (section.type === "heading2") {
                return (
                  <h2
                    key={idx}
                    className="pt-4 text-2xl leading-snug font-bold text-black sm:text-[30px]"
                  >
                    {section.text}
                  </h2>
                );
              }

              if (section.type === "heading3") {
                return (
                  <h3
                    key={idx}
                    className="pt-2 text-xl leading-snug font-bold text-black sm:text-2xl"
                  >
                    {section.text}
                  </h3>
                );
              }

              if (section.type === "quote") {
                return (
                  <blockquote
                    key={idx}
                    className="rounded-r-[14px] border-l-4 border-[#43ff57] bg-[#f6f6f6] px-6 py-5 text-base font-semibold text-black italic sm:text-lg"
                  >
                    {section.text}
                  </blockquote>
                );
              }

              if (section.type === "bullets" && section.items) {
                return (
                  <ul key={idx} className="space-y-2.5 pl-1">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#36b644]" />
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
                    className="my-8 overflow-hidden rounded-[16px] border border-black/10"
                  >
                    <img
                      src={section.src}
                      alt={section.alt || post.title}
                      loading="lazy"
                      className="w-full object-cover"
                    />
                    {section.alt && (
                      <figcaption className="bg-[#f8f8f8] px-4 py-2.5 text-center text-xs text-black/60">
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
                    className="my-6 overflow-x-auto rounded-[14px] border border-black/12 shadow-xs"
                  >
                    <table className="w-full min-w-[560px] border-collapse text-left text-sm sm:text-[15px]">
                      <thead>
                        <tr className="bg-black text-white">
                          {section.headers.map((header, hIdx) => (
                            <th
                              key={header}
                              className={`px-4 py-3.5 font-bold ${
                                hIdx === 2 ? "text-[#43ff57]" : ""
                              }`}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/10 bg-white">
                        {section.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className="even:bg-[#f9f9f9]"
                          >
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`px-4 py-3.5 align-top ${
                                  cIdx === 0
                                    ? "font-bold text-black"
                                    : cIdx === 2
                                      ? "font-semibold text-black"
                                      : "text-black/75"
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

          {/* Booking CTA Box */}
          <div className="mt-14 rounded-[20px] bg-black p-7 text-white sm:p-10">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#43ff57]">
              Пространство «ШУМНО» • Пятигорск
            </span>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Хотите провести праздник без ограничений?
            </h2>
            <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              100 м² стильного лофта на ул. Мира 155А: можно шуметь 24/7, со
              своей едой и напитками, PS5, караоке 50 000+ песен и посудой. От
              1 500 ₽/час!
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <OpenModalButton
                mode="booking"
                source={`Статья: ${post.title}`}
                className="shimmer-btn inline-flex h-12 cursor-pointer items-center justify-center rounded-[10px] bg-[#43ff57] px-7 text-sm font-bold text-black transition hover:bg-[#33d744] hover:text-white"
              >
                Забронировать дату
              </OpenModalButton>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-[10px] border border-white/20 bg-white/10 px-6 text-sm font-bold text-white transition hover:border-[#43ff57] hover:text-[#43ff57]"
              >
                Смотреть фото лофта
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {otherPosts.length > 0 && (
            <div className="mt-14 border-t border-black/10 pt-10">
              <h2 className="text-xl font-bold text-black sm:text-2xl">
                Читайте также
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-5">
                {otherPosts.map((other) => (
                  <Link
                    key={other.uid}
                    href={other.url}
                    className="group flex flex-col gap-4 rounded-[16px] border border-black/10 bg-[#f8f8f8] p-5 transition hover:border-black/30 hover:bg-white sm:flex-row sm:items-center"
                  >
                    <img
                      src={other.coverImage}
                      alt={other.coverAlt}
                      loading="lazy"
                      className="h-28 w-full shrink-0 rounded-[10px] object-cover sm:w-44"
                    />
                    <div>
                      <span className="text-xs font-semibold text-black/50">
                        {other.dateDisplay} • {other.readingTime}
                      </span>
                      <h3 className="mt-1 text-lg font-bold text-[#36b644] group-hover:text-black">
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
