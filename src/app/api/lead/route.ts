import { NextResponse } from "next/server";

interface LeadPayload {
  name?: string;
  phone?: string;
  date?: string;
  tariff?: string;
  hours?: number;
  estimatedTotal?: number;
  source?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;

    const name = body.name?.trim() || "Гость (быстрая заявка)";
    const phone = body.phone?.trim() || "";
    const date = body.date?.trim() || "";
    const tariff = body.tariff?.trim() || "";
    const hours = typeof body.hours === "number" ? body.hours : undefined;
    const estimatedTotal =
      typeof body.estimatedTotal === "number" ? body.estimatedTotal : undefined;
    const source = body.source?.trim() || "Сайт goodroom26.ru";

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Пожалуйста, введите корректный номер телефона" },
        { status: 400 }
      );
    }

    const lines = [
      "Новая заявка - Лофт «ШУМНО» (goodroom26.ru)",
      `Источник: ${source}`,
      `Имя: ${name}`,
      `Телефон: ${phone}`,
    ];

    if (tariff) {
      lines.push(`Тариф: ${tariff}`);
    }
    if (hours) {
      lines.push(`Длительность: ${hours} ч.`);
    }
    if (estimatedTotal) {
      lines.push(
        `Предварительный расчёт: ${estimatedTotal.toLocaleString("ru-RU")} ₽`
      );
    }
    if (date) {
      lines.push(`Желаемая дата: ${date}`);
    }

    const messageText = lines.join("\n");

    const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

    if (botToken && chatId) {
      const tgRes = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: messageText,
          }),
        }
      );

      if (!tgRes.ok) {
        console.error(
          "[Lead API] Telegram error:",
          tgRes.status,
          await tgRes.text()
        );
      }
    } else {
      console.info("[Lead Callback]", {
        source,
        name,
        phone,
        tariff,
        hours,
        estimatedTotal,
        date,
        at: new Date().toISOString(),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Lead API] Unexpected error:", error);
    return NextResponse.json(
      { ok: false, error: "Ошибка отправки заявки. Попробуйте позже." },
      { status: 500 }
    );
  }
}
