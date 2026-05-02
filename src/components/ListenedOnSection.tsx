import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

// Pseudo-random but deterministic-ish counter — grows slowly day by day
const computeListeners = (): number => {
  const base = 184_273;
  const startDate = new Date("2025-01-01").getTime();
  const days = Math.floor((Date.now() - startDate) / (1000 * 60 * 60 * 24));
  // ~370 listeners/day on average, with daily jitter
  const jitter = Math.floor(Math.sin(days * 1.7) * 80 + Math.cos(days * 0.9) * 40);
  return base + days * 370 + jitter;
};

const platforms = [
  { name: "Spotify", color: "#1DB954", svg: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.32c-.227.371-.71.488-1.082.26-2.96-1.808-6.685-2.218-11.073-1.215-.424.097-.846-.168-.943-.591-.097-.424.168-.846.59-.943 4.797-1.097 8.917-.625 12.236 1.41.371.226.488.71.272 1.079zm1.466-3.265c-.286.464-.892.61-1.355.325-3.39-2.083-8.557-2.687-12.563-1.473-.521.158-1.072-.137-1.23-.658-.157-.521.137-1.071.66-1.23 4.581-1.39 10.273-.717 14.164 1.682.463.286.609.892.324 1.354zm.126-3.403C15.122 8.245 8.92 8.024 5.247 9.14c-.625.19-1.286-.164-1.475-.788-.19-.625.163-1.286.788-1.476 4.221-1.282 11.067-1.024 15.435 1.572.566.336.751 1.067.416 1.633-.336.566-1.067.751-1.633.416z"/></svg>
  )},
  { name: "Apple Music", color: "#FA243C", svg: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor"><path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043A5.022 5.022 0 0 0 19.95.26c-.877-.18-1.747-.244-2.64-.26H6.69c-.297.01-.595.02-.892.05-1.025.085-2.04.26-2.997.652C1.41 1.385.4 2.583.099 4.343c-.06.347-.077.7-.094 1.05-.005.083 0 .17 0 .254v12.713c.005.083 0 .17.005.254.014.347.034.704.094 1.052.302 1.762 1.31 2.957 2.704 3.643.957.392 1.972.567 2.997.652.297.03.595.04.892.05h10.62c.297-.01.595-.02.892-.05 1.025-.085 2.04-.26 2.997-.652 1.394-.686 2.402-1.881 2.704-3.643.06-.348.08-.705.094-1.052.005-.084 0-.17.005-.254V5.647c-.005-.084 0-.17 0-.254 0-.07-.005-.14-.014-.21-.005-.07-.014-.14-.024-.21z"/></svg>
  )},
  { name: "ВКонтакте", color: "#0077FF", svg: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor"><path d="M12.785 16.241s.288-.032.435-.193c.135-.148.13-.427.13-.427s-.018-1.302.582-1.494c.593-.19 1.354 1.262 2.16 1.821.61.422 1.072.33 1.072.33l2.157-.03s1.128-.07.593-.96c-.043-.073-.31-.661-1.602-1.866-1.353-1.262-1.171-1.057.458-3.246 992-1.333 1.388-2.134 1.265-2.474-.118-.325-.823-.24-.823-.24l-2.428.015s-.18-.025-.314.056c-.13.078-.214.262-.214.262s-.385 1.04-.9 1.923c-1.084 1.86-1.518 1.96-1.696 1.844-.413-.27-.31-1.066-.31-1.63 0-1.766.265-2.502-.51-2.692-.257-.063-.446-.105-1.103-.112-.844-.009-1.557.003-1.96.202-.27.133-.477.428-.35.445.156.022.51.097.696.358.243.337.234 1.094.234 1.094s.14 2.067-.327 2.323c-.32.176-.76-.183-1.726-1.881-.495-.87-.87-1.83-.87-1.83s-.071-.18-.2-.276c-.155-.116-.371-.152-.371-.152l-2.307.015s-.346.01-.473.162c-.114.135-.01.413-.01.413s1.806 4.267 3.85 6.418c1.875 1.972 4.005 1.842 4.005 1.842h.964z"/></svg>
  )},
  { name: "Одноклассники", color: "#EE8208", svg: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.13a3.86 3.86 0 0 1 3.853 3.852A3.857 3.857 0 0 1 12 11.83a3.857 3.857 0 0 1-3.853-3.848A3.86 3.86 0 0 1 12 4.13zm0 2.27a1.585 1.585 0 0 0-1.583 1.582A1.582 1.582 0 0 0 12 9.561a1.58 1.58 0 0 0 1.583-1.579A1.585 1.585 0 0 0 12 6.4zm-4.624 6.633a1.135 1.135 0 0 1 1.62-.252 5.35 5.35 0 0 0 6.008 0 1.137 1.137 0 1 1 1.367 1.815 7.491 7.491 0 0 1-3.18 1.32l3.063 3.062a1.138 1.138 0 0 1-1.609 1.609L12 17.917l-2.645 2.67a1.138 1.138 0 0 1-1.609-1.609l3.063-3.062a7.49 7.49 0 0 1-3.18-1.32 1.135 1.135 0 0 1-.253-1.563z"/></svg>
  )},
  { name: "YouTube Music", color: "#FF0000", svg: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228 0 3.432 2.796 6.228 6.228 6.228 3.432 0 6.228-2.796 6.228-6.228 0-3.432-2.796-6.228-6.228-6.228zM9.684 15.54V8.46L15.84 12l-6.156 3.54z"/></svg>
  )},
  { name: "Яндекс Музыка", color: "#FFCC00", svg: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1.92 18.336h-1.824V9.6L8.4 11.04V9.456l5.232-2.064h.288v10.944z"/></svg>
  )},
];

const ListenedOnSection = () => {
  const { t } = useLanguage();
  const [count, setCount] = useState<number>(computeListeners());

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3));
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="listened-on" className="py-16 md:py-20 bg-background">
      <div className="container max-w-5xl">
        <div className="text-center">
          <p className="text-sm md:text-base font-bold uppercase tracking-widest text-muted-foreground">
            {t("listened.kicker")}
          </p>
          <h2 className="mt-3 text-2xl md:text-4xl font-extrabold text-foreground">
            <span className="brand-gradient-text tabular-nums">{count.toLocaleString("ru-RU")}+</span>{" "}
            <span>{t("listened.title")}</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            {t("listened.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-3 sm:grid-cols-6 gap-6 items-center justify-items-center">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="animate-in-view flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              title={p.name}
              style={{ color: p.color }}
            >
              {p.svg}
              <span className="text-[11px] text-muted-foreground font-medium text-center leading-tight">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListenedOnSection;
