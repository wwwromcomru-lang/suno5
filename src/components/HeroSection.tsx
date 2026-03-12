import CountdownTimer from "./CountdownTimer";

const HeroSection = () => {
  return (
    <section className="hero-bg pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container text-center">
        <CountdownTimer />
        <h1 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
          Библиотека промптов
          <br />
          <span className="brand-gradient-text">от MASTERSUNO.RU</span>
        </h1>
        <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          5 000+ готовых промптов для Suno AI — копируйте и генерируйте хиты за 1 минуту.
          Ежемесячные дропы: 500 свежих промптов + бонусы.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#tariffs"
            className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity shadow-lg">
            
            Начать подписку
          </a>
          <a
            href="#books"
            className="border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-colors">
            
            Смотреть книги
          </a>
        </div>
      </div>
    </section>);

};

export default HeroSection;