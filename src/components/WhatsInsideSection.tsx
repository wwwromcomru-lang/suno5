import { Music, Mic, Film, Megaphone, Sparkles, Layers } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";

const features = [
  {
    icon: Music,
    title: "Стили мировых звёзд",
    desc: "Промпты в стилях артистов от A до Z + СНГ-сцена. Drake, Weeknd, Баста, Miyagi и сотни других.",
    note: "C5",
  },
  {
    icon: Layers,
    title: "Гибридные жанры",
    desc: "Phonk, cyber-folk, synthwave-jazz, lo-fi drill — уникальные миксы жанров, которых нет у конкурентов.",
    note: "E5",
  },
  {
    icon: Film,
    title: "Эпический саунд-дизайн",
    desc: "Кинематографические саундтреки, трейлерная музыка, эмбиент и атмосферные текстуры.",
    note: "G5",
  },
  {
    icon: Megaphone,
    title: "Джинглы для брендов",
    desc: "Готовые формулы для рекламных роликов, подкастов, YouTube-интро и бизнес-контента.",
    note: "A5",
  },
  {
    icon: Sparkles,
    title: "500 новых промптов/мес",
    desc: "Ежемесячные дропы свежих промптов + бонусы: таблицы-конструкторы (Excel), чек-листы.",
    note: "B5",
  },
  {
    icon: Mic,
    title: "Вокал и языки",
    desc: "Промпты для идеального вокала на любом языке — от русского и английского до японского.",
    note: "C6",
  },
];

const noteToFreq: Record<string, number> = {
  C5: 523.25,
  E5: 659.25,
  G5: 783.99,
  A5: 880.0,
  B5: 987.77,
  C6: 1046.5,
};

const playChime = (note: string) => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const freq = noteToFreq[note] || 523.25;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.6);

    osc.onended = () => ctx.close();
  } catch {
    // silently fail if audio not supported
  }
};

const WhatsInsideSection = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const playedRef = useRef<Set<number>>(new Set());

  const setCardRef = useCallback((el: HTMLDivElement | null, i: number) => {
    cardRefs.current[i] = el;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1 && !playedRef.current.has(idx)) {
              playedRef.current.add(idx);
              setTimeout(() => playChime(features[idx].note), idx * 120);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="whats-inside" className="py-20 md:py-28 bg-secondary/50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground">
          Что внутри подписки
        </h2>
        <p className="mt-3 text-center text-muted-foreground text-lg max-w-2xl mx-auto">
          5 000+ промптов — копируйте, вставляйте в Suno AI и получайте треки за 1 минуту
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              ref={(el) => setCardRef(el, i)}
              onMouseEnter={() => playChime(f.note)}
              className="animate-in-view group bg-card rounded-2xl p-6 border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsInsideSection;
