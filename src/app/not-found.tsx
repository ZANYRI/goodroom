import Link from "next/link";
import { EVENT_NAV_ITEMS } from "@/data/site";

export default function NotFound() {
  return (
    <main className="flex min-h-[72dvh] flex-col items-center justify-center bg-canvas px-4 py-20 text-center text-ink">
      <p className="font-mono text-xs font-bold tracking-[0.14em] text-accent-text uppercase">
        Ошибка 404
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-5xl">
        Страница не найдена
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
        Эта ссылка устарела или была перемещена. Вернитесь на главную страницу
        пространства «ШУМНО» или выберите формат события.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-primary h-12 px-7 text-sm">
          На главную
        </Link>
        <Link href="/contacts" className="btn-secondary h-12 px-6 text-sm">
          Контакты
        </Link>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {EVENT_NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-hairline bg-surface px-3.5 py-2 text-xs font-semibold text-ink-muted transition hover:border-accent-text hover:text-accent-text"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
