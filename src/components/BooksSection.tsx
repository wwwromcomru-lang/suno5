import { Link } from "react-router-dom";
import book1 from "@/assets/book1.png";
import book2 from "@/assets/book2.png";
import book3 from "@/assets/book3.png";
import book4 from "@/assets/book4.png";

const books = [
  { img: book1, title: "1000+ Промптов для Suno AI", desc: "Ультимативный справочник для создания хитов за 1 минуту. Перестаньте гадать — начните управлять звуком." },
  { img: book2, title: "Секреты русского хита", desc: "Хватит гадать. Начни управлять. Уникальная технология создания промптов в SUNO AI." },
  { img: book3, title: "Эпический Sound Design", desc: "Как создавать промпты в SUNO AI для эпического и игрового саунд-дизайна." },
  { img: book4, title: "Jingle Master", desc: "ИИ‑промпты для джинглов и аудиобрендинга. Создавайте фирменный звук бренда в Suno AI за минуты, а не недели." },
];

const BooksSection = () => {
  return (
    <section id="books" className="py-20 md:py-28 bg-card">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground">
          Твои книги в подписке
        </h2>
        <p className="mt-3 text-center text-muted-foreground text-lg">
          И каждый месяц добавляются новые
        </p>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, i) => (
            <div
              key={i}
              className="animate-in-view group bg-background rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={book.img}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-foreground">{book.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{book.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/catalog"
            className="inline-block bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            Смотреть все книги →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BooksSection;
