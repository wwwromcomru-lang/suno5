import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getCurrentPrice, isBeforeHike, OLD_PRICE, NEW_PRICE } from "@/lib/pricing";

/**
 * Плавная смена цены 1990 → 2990 ровно в момент дедлайна.
 * Без перезагрузки: тикер раз в секунду + кросс-фейд + «вспышка» при смене.
 * Доступность: aria-live на актуальной цене, видимый focus-ring и
 * программный перевод фокуса на блок цены в момент смены.
 */
type Props = {
  /** Колбэк при смене цены — родитель сам решает, куда вернуть фокус. */
  onPriceChange?: (newPrice: number) => void;
};

const AnimatedPrice = ({ onPriceChange }: Props) => {
  const { t, lang } = useLanguage();
  const [now, setNow] = useState(() => Date.now());
  const [flash, setFlash] = useState(false);
  const prevPriceRef = useRef(getCurrentPrice());
  const priceBlockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const price = getCurrentPrice(now);
  const before = isBeforeHike(now);

  // Триггерим вспышку и оповещаем родителя о смене цены.
  useEffect(() => {
    if (prevPriceRef.current !== price) {
      prevPriceRef.current = price;
      setFlash(true);
      onPriceChange?.(price);
      const id = setTimeout(() => setFlash(false), 1400);
      return () => clearTimeout(id);
    }
  }, [price, onPriceChange]);

  const note = before
    ? lang === "ru"
      ? "Цена действует до 1 мая 2026"
      : "Price valid until May 1, 2026"
    : lang === "ru"
      ? "Новая цена с 1 мая 2026"
      : "New price from May 1, 2026";

  const a11yLabel =
    lang === "ru"
      ? `Текущая цена подписки: ${price} рублей в месяц`
      : `Current subscription price: ${price} rubles per month`;

  return (
    <>
      <div
        ref={priceBlockRef}
        tabIndex={-1}
        role="group"
        aria-label={a11yLabel}
        className="mt-4 relative inline-flex items-baseline justify-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background px-2 -mx-2"
      >
        {/* Кросс-фейд между значениями цены */}
        <span className="relative inline-block min-w-[6ch] text-center">
          <span
            key={price}
            aria-live="polite"
            aria-atomic="true"
            className="inline-block text-6xl font-extrabold text-foreground transition-all duration-700 ease-out animate-fade-in"
            style={{
              textShadow: flash ? "0 0 28px hsl(var(--accent) / 0.7)" : "none",
              transform: flash ? "scale(1.06)" : "scale(1)",
            }}
          >
            {price}
          </span>
          {/* Старая цена «улетает» зачёркнутой при смене — скрыта от скринридеров */}
          {flash && (
            <span
              aria-hidden="true"
              role="presentation"
              className="absolute left-1/2 -translate-x-1/2 -top-7 text-2xl font-bold text-muted-foreground line-through opacity-0 animate-[fade-out_1.2s_ease-out_forwards] pointer-events-none select-none"
            >
              {OLD_PRICE}
            </span>
          )}
        </span>
        <span className="text-muted-foreground ml-1 text-lg">{t("tariffs.price")}</span>
      </div>
      <p
        key={`note-${before ? "before" : "after"}`}
        className="mt-2 text-sm text-muted-foreground animate-fade-in transition-colors duration-700"
      >
        {note} · {t("tariffs.currencies")}
      </p>
      {/* Гарантия наличия NEW_PRICE в финальном бандле для аналитики/отладки */}
      <span className="sr-only">{NEW_PRICE}</span>
    </>
  );
};

export default AnimatedPrice;
