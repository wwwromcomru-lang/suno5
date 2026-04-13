import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";
import book1 from "@/assets/book1.png";
import book2 from "@/assets/book2.png";
import book3 from "@/assets/book3.png";
import book4 from "@/assets/book4.png";
import book5 from "@/assets/book5.png";
import book6 from "@/assets/book6.png";

const books: { img: string; titleKey: TranslationKey; descKey: TranslationKey; link: string }[] = [
  { img: book1, titleKey: "book1.title", descKey: "book1.desc", link: "https://sunoprompt.ru/" },
  { img: book2, titleKey: "book2.title", descKey: "book2.desc", link: "https://sunoprompt.ru/books/2/" },
  { img: book3, titleKey: "book3.title", descKey: "book3.desc", link: "https://suno5.ru/books/3/" },
  { img: book4, titleKey: "book4.title", descKey: "book4.desc", link: "https://suno5.ru/books/4/" },
  { img: book5, titleKey: "book5.title", descKey: "book5.desc", link: "https://www.suno5.ru/books/5" },
  { img: book6, titleKey: "book6.title", descKey: "book6.desc", link: "https://www.suno5.ru/books/6" },
];

const BooksSection = () => {
  const { t, prefix } = useLanguage();

  return (
    <section id="books" className="py-20 md:py-28 bg-card" aria-labelledby="books-heading">
      <div className="container">
        <h2 id="books-heading" className="text-3xl md:text-4xl font-extrabold text-center text-foreground">
          {t("books.title")}
        </h2>
        <p className="mt-3 text-center text-muted-foreground text-lg">
          {t("books.subtitle")}
        </p>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {books.map((book, i) => (
            <article
              key={i}
              className="animate-in-view group bg-background rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={book.img}
                  alt={`${t("books.coverAlt")} «${t(book.titleKey)}»`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width="210"
                  height="280"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-foreground">{t(book.titleKey)}</h3>
                <p className="mt-1 text-sm text-muted-foreground flex-1">{t(book.descKey)}</p>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-center bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-bold hover:brightness-110 transition-all shadow-sm hover:shadow-md"
                >
                  {t("books.buy")}
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to={prefix + "/catalog"}
            className="inline-block bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            {t("books.viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BooksSection;
