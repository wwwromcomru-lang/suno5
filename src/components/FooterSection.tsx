import FooterSynth from "./FooterSynth";

const FooterSection = () => {
  return (
    <footer className="bg-foreground pt-10 pb-6" role="contentinfo">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/70">© 2026 <a href="https://mastersuno.ru" target="_blank" rel="noopener noreferrer" className="hover:text-background/90 transition-colors">MASTERSUNO.RU</a> — Все права защищены</p>
          <nav className="flex gap-6 text-sm" aria-label="Юридическая информация">
            <a href="#" className="text-background/70 hover:text-background/90 transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-background/70 hover:text-background/90 transition-colors">
              Оферта
            </a>
          </nav>
        </div>
        <div className="mt-8 text-center">
          <a
            href="#tariffs"
            className="bg-accent text-accent-foreground px-8 py-3.5 rounded-xl font-bold hover:opacity-90 transition-opacity inline-block">
            
            ​Скачать все книги промптов      
          </a>
        </div>
      </div>

      {/* Synth keyboard */}
      <div className="mt-10">
        <p className="text-center text-background/40 text-xs mb-3 font-medium tracking-wide uppercase">
          🎹 Поиграйте на синтезаторе
        </p>
        <FooterSynth />
      </div>
    </footer>);

};

export default FooterSection;
