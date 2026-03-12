import { Link } from "react-router-dom";
import book1 from "@/assets/book1.jpg";
import book2 from "@/assets/book2.jpg";
import book3 from "@/assets/book3.jpg";

const books = [
  { img: book1, title: "1000+ Промптов Suno AI", desc: "Базовая коллекция промптов для любого жанра и настроения", tag: "Бестселлер" },
  { img: book2, title: "Стили мировых звёзд A-Z", desc: "Промпты в стилях Drake, Weeknd, Billie Eilish и сотен других артистов", tag: "Топ" },
  { img: book3, title: "СНГ-сцена: хиты на русском", desc: "Формулы хитов Басты, Miyagi, Скриптонита и других", tag: "Новинка" },
  { img: book1, title: "Phonk & Гибридные жанры", desc: "Phonk, cyber-folk, synthwave-jazz, lo-fi drill и уникальные миксы", tag: "Новинка" },
  { img: book2, title: "Эпический Sound Design", desc: "Кинематографические саундтреки, трейлерная музыка и эмбиент", tag: "" },
  { img: book3, title: "Джинглы для брендов", desc: "Рекламные ролики, подкасты, YouTube-интро и бизнес-контент", tag: "" },
  { img: book1, title: "Вокал и языки мира", desc: "Идеальный вокал на русском, английском, японском и других языках", tag: "" },
  { img: book2, title: "Lo-Fi & Chillhop", desc: "Атмосферные треки для фона, стримов и релакса", tag: "" },
  { img: book3, title: "EDM & Электроника", desc: "House, techno, trance, drum & bass — энергичные формулы", tag: "Скоро" },
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
        <div className="container">
          <h1 className="text-3xl md:text-5xl font-extrabold text-center text-foreground">
            Каталог: 5 000+ промптов
          </h1>
          <p className="mt-3 text-center text-muted-foreground text-lg max-w-xl mx-auto">
            Стили мировых звёзд, гибридные жанры, саунд-дизайн и джинглы — всё по подписке с ежемесячными обновлениями.
          </p>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book, i) =>
            <div
              key={i}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-shadow duration-300 relative">
              
                {book.tag &&
              <span className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    {book.tag}
                  </span>
              }
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                  src={book.img}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy" />
                
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-foreground">{book.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{book.desc}</p>
                </div>
              </div>
            )}
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