const reviews = [
  { text: "Окупилось за неделю! Каждый промпт — это готовый трек, а не гадание на кофейной гуще.", author: "Алексей", role: "Музыкант" },
  { text: "Наконец-то промпты, которые реально работают на русском. Качество звука — космос.", author: "Мария", role: "Продюсер" },
  { text: "Подписался на «Полный» — получил больше, чем ожидал. Новые книги каждый месяц, как обещали.", author: "Дмитрий", role: "Битмейкер" },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-card">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground">
          Что говорят подписчики
        </h2>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="animate-in-view bg-background rounded-2xl p-6 border border-border shadow-sm"
            >
              <div className="text-primary text-3xl mb-3">★★★★★</div>
              <p className="text-foreground leading-relaxed">«{r.text}»</p>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-bold text-foreground">{r.author}</p>
                <p className="text-sm text-muted-foreground">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
