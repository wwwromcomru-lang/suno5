import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import book1 from "@/assets/book1.png";
import book2 from "@/assets/book2.png";
import book3 from "@/assets/book3.png";
import book4 from "@/assets/book4.png";
import book5 from "@/assets/book5.png";
import book6 from "@/assets/book6.png";
import book7 from "@/assets/book7.png";
import book8 from "@/assets/book8.png";
import book9 from "@/assets/book9.png";
import book10 from "@/assets/book10.png";
import book11 from "@/assets/book11.png";
import book12 from "@/assets/book12.png";

const books: { img: string; titleKey: TranslationKey; descKey: TranslationKey; link: string }[] = [
  { img: book1, titleKey: "book1.title", descKey: "book1.desc", link: "https://sunoprompt.ru/" },
  { img: book2, titleKey: "book2.title", descKey: "book2.desc", link: "https://sunoprompt.ru/books/2/" },
  { img: book3, titleKey: "book3.title", descKey: "book3.desc", link: "https://suno5.ru/books/3/" },
  { img: book4, titleKey: "book4.title", descKey: "book4.desc", link: "https://suno5.ru/books/4/" },
  { img: book5, titleKey: "book5.title", descKey: "book5.desc", link: "https://www.suno5.ru/books/5" },
  { img: book6, titleKey: "book6.title", descKey: "book6.desc", link: "https://www.suno5.ru/books/6" },
  { img: book7, titleKey: "book7.title", descKey: "book7.desc", link: "https://www.suno5.ru/books/7" },
  { img: book8, titleKey: "book8.title", descKey: "book8.desc", link: "https://www.suno5.ru/books/8" },
  { img: book9, titleKey: "book9.title", descKey: "book9.desc", link: "https://www.suno5.ru/books/9" },
  { img: book10, titleKey: "book10.title", descKey: "book10.desc", link: "https://mirhitov.ru/" },
  { img: book11, titleKey: "book11.title", descKey: "book11.desc", link: "https://mirhitov.ru/1may/" },
  { img: book12, titleKey: "book12.title", descKey: "book12.desc", link: "https://mirhitov.ru/9may/" },
];

const CatalogPage = () => {
  const { t, prefix } = useLanguage();

  useEffect(() => {
    document.title = t("catalog.meta.title");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("catalog.meta.desc"));
  }, [t]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container flex items-center justify-between h-16" aria-label="Навигация каталога">
          <Link to={prefix + "/"} className="text-xl font-extrabold brand-gradient-text">
            SUNO5.RU
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              to={prefix + "/#tariffs"}
              className="bg-accent text-accent-foreground px-5 py-2 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
              {t("nav.subscribe")}
            </Link>
          </div>
        </nav>
      </header>

      <main className="py-16 md:py-24">
        <div className="container max-w-6xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-center text-foreground">
            {t("catalog.title")}
          </h1>
          <p className="mt-3 text-center text-muted-foreground text-lg max-w-xl mx-auto">
            {t("catalog.subtitle")}
          </p>

          <div className="mt-10 mx-auto max-w-3xl rounded-2xl border-2 border-accent bg-accent/10 p-5 sm:p-6 shadow-sm">
            <h2 className="font-extrabold text-lg sm:text-xl text-foreground">
              {t("pricealert.title")}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-foreground/80 leading-relaxed">
              {t("pricealert.desc")}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {books.map((book, i) =>
              <article
                key={i}
                className="group flex items-center gap-5 bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300 p-4">
                <img
                  src={book.img}
                  alt={`${t("books.coverAlt")} «${t(book.titleKey)}»`}
                  className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width="96"
                  height="128" />
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold text-base sm:text-lg text-foreground">{t(book.titleKey)}</h2>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{t(book.descKey)}</p>
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block bg-accent text-accent-foreground px-4 py-1.5 rounded-lg text-sm font-bold hover:brightness-110 transition-all shadow-sm hover:shadow-md">
                    {t("books.buy")}
                  </a>
                </div>
              </article>
            )}

            {/* Coming soon */}
            <div className="flex items-center gap-5 bg-card/50 rounded-2xl border border-dashed border-border p-4 sm:col-span-2">
              <div className="w-20 h-28 sm:w-24 sm:h-32 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <span className="text-3xl" role="img" aria-label="Book">📖</span>
              </div>
              <div>
                <h2 className="font-bold text-base sm:text-lg text-muted-foreground">{t("catalog.soon.title")}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t("catalog.soon.desc")}</p>
                <a
                  href="https://t.me/master_suno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  {t("catalog.soon.tg")}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to={prefix + "/#tariffs"}
              className="bg-accent text-accent-foreground px-8 py-3.5 rounded-xl font-bold hover:opacity-90 transition-opacity inline-block">
              {t("catalog.access")}
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-foreground py-8">
        <div className="container text-center">
          <p className="text-sm text-background/70">© 2026 SUNO5.RU — {t("footer.rights")}</p>
        </div>
      </footer>
    </div>
  );
};

export default CatalogPage;
