import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-card/95 backdrop-blur-md shadow-md" : "bg-transparent"}`
      }>
      
      <div className="container flex items-center justify-between py-4">
        <a href="#" className="text-2xl font-extrabold brand-gradient-text">
          SUNO5.RU
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#books" className="hover:text-foreground transition-colors">Книги</a>
          <a href="#tariffs" className="hover:text-foreground transition-colors">Тарифы</a>
          <a href="#reviews" className="hover:text-foreground transition-colors">Отзывы</a>
        </nav>
        <a
          href="#tariffs"
          className="bg-accent text-accent-foreground px-5 py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
          
          Подписаться 1990₽
        </a>
      </div>
    </header>);

};

export default Header;