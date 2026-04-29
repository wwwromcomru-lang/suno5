import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { PRICE_HIKE_TS, isBeforeHike } from "@/lib/pricing";

const PriceHikeTimer = () => {
  const { lang } = useLanguage();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // После дедлайна таймер полностью исчезает.
  if (!isBeforeHike(now)) return null;

  const diff = Math.max(0, PRICE_HIKE_TS - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const labels =
    lang === "ru"
      ? { d: "дн", h: "ч", m: "мин", s: "сек", title: "До повышения цены:" }
      : { d: "d", h: "h", m: "m", s: "s", title: "Until price increase:" };

  const Box = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-background/80 rounded-lg px-3 py-2 min-w-[58px] border border-accent/40">
      <span className="font-mono font-extrabold text-2xl text-accent leading-none">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="mt-4">
      <p className="text-xs font-bold uppercase tracking-wide text-accent mb-2">
        {labels.title}
      </p>
      <div className="flex gap-2">
        <Box value={days} label={labels.d} />
        <Box value={hours} label={labels.h} />
        <Box value={minutes} label={labels.m} />
        <Box value={seconds} label={labels.s} />
      </div>
    </div>
  );
};

export default PriceHikeTimer;
