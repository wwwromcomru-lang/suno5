import { Link } from "react-router-dom";
import book1 from "@/assets/book1.png";
import book2 from "@/assets/book2.png";
import book3 from "@/assets/book3.png";
import book4 from "@/assets/book4.png";

const books = [
  { img: book1, title: "1000+ Промптов для Suno AI", desc: "Ультимативный справочник для создания хитов за 1 минуту. Перестаньте гадать — начните управлять звуком.", link: "https://sunoprompt.ru/" },
  { img: book2, title: "Секреты русского хита", desc: "Хватит гадать. Начни управлять. Уникальная технология создания промптов в SUNO AI.", link: "https://sunoprompt.ru/books/2/" },
  { img: book3, title: "Эпический Sound Design", desc: "Как создавать промпты в SUNO AI для эпического и игрового саунд-дизайна.", link: "https://suno5.ru/books/3/" },
  { img: book4, title: "Jingle Master", desc: "ИИ‑промпты для джинглов и аудиобрендинга. Создавайте фирменный звук бренда в Suno AI за минуты, а не недели.", link: "https://suno5.ru/books/4/" },
];

const CatalogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-extrabold brand-gradient-text">
            MASTERSUNO.RU
          </Link>
          <Link
            to="/#tariffs"
            className="bg-accent text-accent-foreground px-5 py-2 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
            Подписаться 1990₽
          </Link>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-center text-foreground">
            Каталог книг промптов
          </h1>
          <p className="mt-3 text-center text-muted-foreground text-lg max-w-xl mx-auto">
            Все книги доступны по подписке с ежемесячными обновлениями.
          </p>

          <div className="mt-14 flex flex-col gap-5">
            {books.map((book, i) => (
              <div
                key={i}
                className="group flex items-center gap-5 bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300 p-4"
              >
                <img
                  src={book.img}
                  alt={book.title}
                  className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-base sm:text-lg text-foreground">{book.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{book.desc}</p>
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block bg-accent text-accent-foreground px-4 py-1.5 rounded-lg text-sm font-bold hover:brightness-110 transition-all shadow-sm hover:shadow-md"
                  >
                    Купить отдельно →
                  </a>
                </div>
              </div>
            ))}

            {/* Coming soon */}
            <div className="flex items-center gap-5 bg-card/50 rounded-2xl border border-dashed border-border p-4">
              <div className="w-20 h-28 sm:w-24 sm:h-32 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">📖</span>
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-muted-foreground">Скоро новая книга</h3>
                <p className="mt-1 text-sm text-muted-foreground">Следите за обновлениями — новая книга каждый месяц!</p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/#tariffs"
              className="bg-accent text-accent-foreground px-8 py-3.5 rounded-xl font-bold hover:opacity-90 transition-opacity inline-block">
              
              Получить доступ за 1 990 ₽/мес
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-foreground py-8">
        <div className="container text-center">
          <p className="text-sm text-background/70">© 2026 MASTERSUNO.RU — Все права защищены</p>
        </div>
      </footer>
    </div>);

};

export default CatalogPage;