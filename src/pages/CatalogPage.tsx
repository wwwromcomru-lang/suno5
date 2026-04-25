import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import PriceHikeTimer from "@/components/PriceHikeTimer";
import { booksData } from "@/data/books";

const books = booksData;

const CatalogPage = () => {
  const { t, prefix, lang } = useLanguage();

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
            <PriceHikeTimer />
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {books.map((book) =>
              <article
                key={book.slug}
                className="group flex items-center gap-5 bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300 p-4">
                <Link to={prefix + `/book/${book.slug}`} className="flex-shrink-0">
                  <img
                    src={book.img}
                    alt={`${t("books.coverAlt")} «${t(book.titleKey)}»`}
                    className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width="96"
                    height="128" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link to={prefix + `/book/${book.slug}`}>
                    <h2 className="font-bold text-base sm:text-lg text-foreground hover:text-primary transition-colors">{t(book.titleKey)}</h2>
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{t(book.descKey)}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <a
                      href={book.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-accent text-accent-foreground px-4 py-1.5 rounded-lg text-sm font-bold hover:brightness-110 transition-all shadow-sm hover:shadow-md">
                      {t("books.buy")}
                    </a>
                    <Link
                      to={prefix + `/book/${book.slug}`}
                      className="inline-block border border-border text-foreground px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-muted transition-colors">
                      {lang === "ru" ? "Подробнее" : "Details"}
                    </Link>
                  </div>
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
