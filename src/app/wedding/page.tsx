import type { Metadata } from "next";
import { EVENT_PAGES } from "@/data/events";
import { EventLandingView } from "@/components/EventLandingView";

const pageData = EVENT_PAGES.wedding;

export const metadata: Metadata = {
  title: pageData.seoTitle,
  description: pageData.seoDescription,
  alternates: {
    canonical: `/${pageData.slug}`,
  },
  openGraph: {
    title: pageData.seoTitle,
    description: pageData.seoDescription,
    url: `/${pageData.slug}`,
    images: [{ url: pageData.ogImage }],
  },
};

export default function WeddingPage() {
  return <EventLandingView data={pageData} />;
}
