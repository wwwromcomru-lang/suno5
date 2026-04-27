import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Input } from "@/components/ui/input";

const TG_USERNAME = "master_suno";

const SupportSection = () => {
  const { t } = useLanguage();
  const [topic, setTopic] = useState("");

  const buildLink = () => {
    const text = `${t("support.prefill")}${topic.trim()}`;
    return `https://t.me/${TG_USERNAME}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(buildLink(), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="support" className="py-16 md:py-24" aria-labelledby="support-title">
      <div className="container max-w-3xl">
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
            <MessageCircle className="w-7 h-7" aria-hidden="true" />
          </div>
          <h2 id="support-title" className="text-2xl md:text-3xl font-extrabold text-foreground">
            {t("support.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("support.subtitle")}</p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
            <label htmlFor="support-topic" className="sr-only">
              {t("support.placeholder")}
            </label>
            <Input
              id="support-topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t("support.placeholder")}
              maxLength={200}
              className="flex-1 h-12 rounded-xl"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 h-12 rounded-xl font-bold hover:brightness-110 transition-all shadow-sm whitespace-nowrap"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              {t("support.open")}
            </button>
          </form>

          <a
            href={`https://t.me/${TG_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
          >
            {t("support.cta")} →
          </a>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
