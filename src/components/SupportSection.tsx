import { Mail, Globe, Youtube, CreditCard, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

type Contact = {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  items: { text: string; href: string }[];
};

const contacts: Contact[] = [
  {
    icon: Mail,
    label: "Email",
    items: [{ text: "romansinicyn@gmail.com", href: "mailto:romansinicyn@gmail.com" }],
  },
  {
    icon: Globe,
    label: "Личный сайт",
    items: [{ text: "1roman.ru", href: "https://1roman.ru" }],
  },
  {
    icon: Youtube,
    label: "YouTube",
    items: [
      { text: "МАСТЕР SUNO", href: "https://www.youtube.com/@MasterSuno" },
      { text: "МАСТЕР ХИТОВ", href: "https://www.youtube.com/@masterhitov" },
    ],
  },
  {
    icon: CreditCard,
    label: "Оплата зарубежных подписок",
    items: [{ text: "CashBoy.ru", href: "https://cashboy.ru/" }],
  },
];

const SupportSection = () => {
  const { t } = useLanguage();

  return (
    <section id="support" className="py-16 md:py-24" aria-labelledby="support-title">
      <div className="container max-w-3xl">
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
              <MessageCircle className="w-7 h-7" aria-hidden="true" />
            </div>
            <h2 id="support-title" className="text-2xl md:text-3xl font-extrabold text-foreground">
              {t("support.title")}
            </h2>
            <p className="mt-3 text-muted-foreground">Свяжитесь со мной любым удобным способом</p>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {contacts.map(({ icon: Icon, label, items }) => (
              <li
                key={label}
                className="flex items-start gap-3 p-4 rounded-2xl border border-border bg-background/50"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary inline-flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden={true} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-muted-foreground">{label}</div>
                  <div className="mt-1 flex flex-col gap-1">
                    {items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className="text-foreground font-medium hover:text-primary hover:underline break-words"
                      >
                        {item.text}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
