import { Music, Mic, Film, Megaphone, Sparkles, Layers } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";

const featureKeys: { icon: typeof Music; titleKey: TranslationKey; descKey: TranslationKey; note: string }[] = [
  { icon: Music, titleKey: "inside.f1.title", descKey: "inside.f1.desc", note: "C5" },
  { icon: Layers, titleKey: "inside.f2.title", descKey: "inside.f2.desc", note: "E5" },
  { icon: Film, titleKey: "inside.f3.title", descKey: "inside.f3.desc", note: "G5" },
  { icon: Megaphone, titleKey: "inside.f4.title", descKey: "inside.f4.desc", note: "A5" },
  { icon: Sparkles, titleKey: "inside.f5.title", descKey: "inside.f5.desc", note: "B5" },
  { icon: Mic, titleKey: "inside.f6.title", descKey: "inside.f6.desc", note: "C6" },
];

const noteToFreq: Record<string, number> = {
  C5: 523.25, E5: 659.25, G5: 783.99, A5: 880.0, B5: 987.77, C6: 1046.5,
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
    // silently fail
  }
};

const WhatsInsideSection = () => {
  const { t } = useLanguage();
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
              setTimeout(() => playChime(featureKeys[idx].note), idx * 120);
            }
          }
        });
      },
      { threshold: 0.3 }
    );
    cardRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="whats-inside" className="py-20 md:py-28 bg-secondary/50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground">
          {t("inside.title")}
        </h2>
        <p className="mt-3 text-center text-muted-foreground text-lg max-w-2xl mx-auto">
          {t("inside.subtitle")}
        </p>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureKeys.map((f, i) => (
            <div
              key={i}
              ref={(el) => setCardRef(el, i)}
              onMouseEnter={() => playChime(f.note)}
              className="animate-in-view group bg-card rounded-2xl p-6 border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-foreground">{t(f.titleKey)}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(f.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsInsideSection;
