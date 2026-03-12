const LAVA_LINK = "https://lava.top/твоя-ссылка";

const TariffsSection = () => {
  return (
    <section id="tariffs" className="py-20 md:py-28 bg-background">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground">
          Одна подписка — все книги
        </h2>
        <p className="mt-3 text-center text-muted-foreground text-lg">
          Отменяй в любой момент
        </p>
        <div className="mt-14 max-w-md mx-auto">
          <div className="animate-in-view relative rounded-2xl p-10 border border-primary popular-glow bg-card shadow-xl text-center">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
              Полный доступ
            </span>
            <div className="mt-4">
              <span className="text-6xl font-extrabold text-foreground">1990</span>
              <span className="text-muted-foreground ml-1 text-lg">₽/мес</span>
            </div>
            <ul className="mt-8 space-y-3 text-left inline-block">
              {["5 000+ готовых промптов", "500 новых промптов каждый месяц", "Стили мировых звёзд (A-Z + СНГ)", "Гибридные жанры: phonk, cyber-folk и др.", "Таблицы-конструкторы (Excel) + чек-листы", "Доступ навсегда к купленным"].map((f, j) =>
              <li key={j} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="text-primary">✓</span> {f}
                </li>
              )}
            </ul>
            <a
              href={LAVA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block text-center py-3.5 rounded-xl font-bold transition-opacity hover:opacity-90 bg-accent text-accent-foreground">
              
              Подписаться
            </a>
          </div>
        </div>
      </div>
    </section>);

};

export default TariffsSection;