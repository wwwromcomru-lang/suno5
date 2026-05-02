import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";

type Track = {
  id: string;
  titleKey: TranslationKey;
  genreKey: TranslationKey;
  promptKey: TranslationKey;
  embedUrl: string; // Suno embed
};

// Suno embed format: https://suno.com/embed/<song_id>
const tracks: Track[] = [
  {
    id: "phonk-drift",
    titleKey: "tracks.t1.title",
    genreKey: "tracks.t1.genre",
    promptKey: "tracks.t1.prompt",
    embedUrl: "https://suno.com/embed/3a7e8c1d-4b2f-4a9c-8e1b-9f3d2a7c1e8b",
  },
  {
    id: "cinematic",
    titleKey: "tracks.t2.title",
    genreKey: "tracks.t2.genre",
    promptKey: "tracks.t2.prompt",
    embedUrl: "https://suno.com/embed/5c2d8a9e-6f4b-4d1e-9a7c-2b8f5e3a1d6c",
  },
  {
    id: "synthwave",
    titleKey: "tracks.t3.title",
    genreKey: "tracks.t3.genre",
    promptKey: "tracks.t3.prompt",
    embedUrl: "https://suno.com/embed/7e9f1c3a-8b5d-4f2c-9e8a-3d7b6c4f2e1a",
  },
];

const TrackExamplesSection = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (id: string, prompt: string) => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section id="track-examples" className="py-20 md:py-28 bg-background">
      <div className="container max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground">
          {t("tracks.title")}
        </h2>
        <p className="mt-3 text-center text-muted-foreground text-lg max-w-2xl mx-auto">
          {t("tracks.subtitle")}
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => {
            const prompt = t(track.promptKey);
            const isCopied = copied === track.id;
            return (
              <div
                key={track.id}
                className="animate-in-view bg-card rounded-2xl p-5 border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{t(track.titleKey)}</h3>
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                      {t(track.genreKey)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 rounded-xl overflow-hidden bg-muted/40 aspect-video">
                  <iframe
                    src={track.embedUrl}
                    className="w-full h-full border-0"
                    allow="autoplay; encrypted-media"
                    loading="lazy"
                    title={t(track.titleKey)}
                  />
                </div>

                <div className="mt-4 p-3 rounded-lg bg-muted/40 border border-border text-xs text-muted-foreground font-mono leading-relaxed flex-1">
                  {prompt}
                </div>

                <button
                  onClick={() => handleCopy(track.id, prompt)}
                  className="mt-3 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      {t("tracks.copied")}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      {t("tracks.copy")}
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <a
            href="https://suno.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            {t("tracks.cta")} <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </div>
    </section>
  );
};

export default TrackExamplesSection;
