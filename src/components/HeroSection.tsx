import CountdownTimer from "./CountdownTimer";

const HeroSection = () => {
  return (
    <section className="hero-bg pt-32 pb-20 md:pt-40 md:pb-28" aria-labelledby="hero-heading">
      <div className="container text-center">
        <CountdownTimer />
        <h1 id="hero-heading" className="mt-8 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
          Библиотека промптов
          <br />
          <span className="brand-gradient-text text-2xl">от <a href="https://mastersuno.ru" target="_blank" rel="noopener noreferrer" className="brand-gradient-text hover:underline transition-all">MASTERSUNO.RU</a></span>
        </h1>
        <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">5 000+ готовых промптов для Suno AI — копируйте и генерируйте хиты за 1 минуту.


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