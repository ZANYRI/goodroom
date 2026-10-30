import Link from "next/link";
import { EVENT_NAV_ITEMS } from "@/data/site";

export default function NotFound() {
  return (
    <main className="flex min-h-[72vh] flex-col items-center justify-center bg-black px-4 py-20 text-center text-white">
      <span className="inline-block rounded-full border border-[#43ff57]/40 bg-white/5 px-4 py-1 text-xs font-bold tracking-widest text-[#43ff57] uppercase">
        Ошибка 404
      </span>
      <h1 className="mt-5 text-4xl font-bold text-white sm:text-6xl">
        Страница не найдена
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
        Похоже, эта ссылка устарела или была перемещена. Вернитесь на главную
        страницу пространства «ШУМНО» или выберите формат мероприятия.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-[10px] bg-[#43ff57] px-7 text-[15px] font-bold text-black transition hover:bg-[#33d744] hover:text-white"
        >
          На главную
        </Link>
        <Link
          href="/contacts"
          className="inline-flex h-12 items-center justify-center rounded-[10px] border border-white/20 bg-white/10 px-6 text-[15px] font-bold text-white transition hover:border-[#43ff57] hover:text-[#43ff57]"
        >
          Контакты
        </Link>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {EVENT_NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/75 transition hover:border-[#43ff57] hover:text-[#43ff57]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
