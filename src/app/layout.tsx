import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/data/site";
import { ModalProvider } from "@/components/ModalProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingMessengers } from "@/components/FloatingMessengers";
import { ScrollToTop } from "@/components/ScrollToTop";
import { YandexMetrika } from "@/components/YandexMetrika";

export const viewport: Viewport = {
  themeColor: "#0b0d10",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Аренда лофта для вечеринок в Пятигорске: пространство «ШУМНО»",
    template: "%s",
  },
  description:
    "Аренда лофта 100 м² для вечеринок и мероприятий в Пятигорске. Можно шуметь 24/7, со своей едой без пробкового сбора. Караоке, PS5, Wi-Fi, посуда. От 1 500 ₽/час.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      {
        url: "/images/brand/favicon-light.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/images/brand/favicon-dark.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/images/brand/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "Аренда лофта для вечеринок в Пятигорске: пространство «ШУМНО»",
    description:
      "Приватный лофт 100 м² в Пятигорске. Можно шуметь 24/7, со своей едой без сборов. Караоке, PS5, Wi-Fi, посуда. Цена от 1 500 ₽/час.",
    images: [
      {
        url: "/images/og/home.png",
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.brandAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Аренда лофта для вечеринок в Пятигорске: пространство «ШУМНО»",
    description:
      "Приватный лофт 100 м² в Пятигорске: караоке, PS5, кухня, можно со своим и шуметь 24/7. От 1 500 ₽/час.",
    images: ["/images/og/home.png"],
  },
};

const themeInitScript = `
(function(){
  try {
    var saved = localStorage.getItem('goodroom-theme');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="relative flex min-h-[100dvh] flex-col bg-canvas text-ink antialiased">
        <ModalProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <FloatingMessengers />
          <ScrollToTop />
        </ModalProvider>
        <YandexMetrika />
      </body>
    </html>
  );
}
