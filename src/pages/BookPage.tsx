import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { booksData, getBookBySlug } from "@/data/books";

const BookPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, prefix, lang } = useLanguage();
  const book = slug ? getBookBySlug(slug) : undefined;

  useEffect(() => {
    if (!book) return;
    const bookTitle = t(book.titleKey);
    const title = `${bookTitle} ${t("book.meta.suffix")}`;
    document.title = title.length > 60 ? `${bookTitle} | Suno5.ru` : title;
    const desc = `${t("book.meta.descPrefix")}${t(book.descKey)}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", desc.slice(0, 160));
    // canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = `${window.location.origin}${prefix}/book/${book.slug}`;
  }, [book, t, prefix]);

  if (!book) {
    return <Navigate to={prefix + "/catalog"} replace />;
  }

  const related = booksData.filter((b) => b.slug !== book.slug).slice(0, 3);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: t(book.titleKey),
    description: t(book.descKey),
    image: book.img,
    inLanguage: lang === "ru" ? "ru" : "en",
    bookFormat: "https://schema.org/EBook",
    author: { "@type": "Person", name: "Roman Sinitsyn" },
    publisher: { "@type": "Organization", name: "Suno5.ru" },
    offers: {
      "@type": "Offer",
      url: book.buyLink,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  };

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "ru" ? "Главная" : "Home", item: `${origin}${prefix}/` },
      { "@type": "ListItem", position: 2, name: lang === "ru" ? "Каталог" : "Catalog", item: `${origin}${prefix}/catalog` },
      { "@type": "ListItem", position: 3, name: t(book.titleKey), item: `${origin}${prefix}/book/${book.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container flex items-center justify-between h-16" aria-label="Навигация">
          <Link to={prefix + "/"} className="text-xl font-extrabold brand-gradient-text">
            SUNO5.RU
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              to={prefix + "/#tariffs"}
              className="bg-accent text-accent-foreground px-5 py-2 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
            >
              {t("nav.subscribe")}
            </Link>
          </div>
        </nav>
      </header>

      <main className="py-12 md:py-20">
        <div className="container max-w-5xl">
          <nav aria-label="breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link to={prefix + "/"} className="hover:text-foreground transition-colors">
                  {lang === "ru" ? "Главная" : "Home"}
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 opacity-60" aria-hidden="true" />
              <li>
                <Link to={prefix + "/catalog"} className="hover:text-foreground transition-colors">
                  {lang === "ru" ? "Каталог" : "Catalog"}
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 opacity-60" aria-hidden="true" />
              <li className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
                {t(book.titleKey)}
              </li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-lg">
              <img
                src={book.img}
                alt={`${t("books.coverAlt")} «${t(book.titleKey)}»`}
                className="w-full h-auto"
                width="600"
                height="800"
              />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
                {t(book.titleKey)}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {t(book.descKey)}
              </p>

              <ul className="mt-6 space-y-2 text-sm text-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  {lang === "ru" ? "Мгновенный доступ после оплаты" : "Instant access after payment"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  {lang === "ru" ? "Готовые промпты — копируй и вставляй" : "Ready-made prompts — copy and paste"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  {lang === "ru" ? "Подходит без музыкального образования" : "No music education required"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  {lang === "ru" ? "Обновления включены" : "Updates included"}
                </li>
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={book.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-accent text-accent-foreground px-6 py-4 rounded-xl font-bold hover:brightness-110 transition-all shadow-md"
                >
                  {t("books.buy")}
                </a>
                <Link
                  to={prefix + "/#tariffs"}
                  className="flex-1 text-center bg-primary text-primary-foreground px-6 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                  {lang === "ru" ? "Все книги по подписке" : "All books by subscription"}
                </Link>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                {lang === "ru"
                  ? "💡 Совет: подписка дешевле покупки 2 книг отдельно и даёт доступ ко всему каталогу + новые книги каждый месяц."
                  : "💡 Tip: a subscription costs less than buying 2 books separately and unlocks the entire catalog + new books every month."}
              </p>
            </div>
          </div>

          <section className="mt-20">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
              {lang === "ru" ? "Другие книги" : "Other books"}
            </h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((b) => (
                <Link
                  key={b.slug}
                  to={prefix + `/book/${b.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={b.img}
                      alt={`${t("books.coverAlt")} «${t(b.titleKey)}»`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground">{t(b.titleKey)}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-foreground py-8 mt-12">
        <div className="container text-center">
          <p className="text-sm text-background/70">© 2026 SUNO5.RU — {t("footer.rights")}</p>
        </div>
      </footer>
    </div>
  );
};

export default BookPage;
