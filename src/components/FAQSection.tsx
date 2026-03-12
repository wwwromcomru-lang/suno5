import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Что входит в подписку?",
    a: "Доступ ко всем текущим книгам промптов Suno AI, а также к каждой новой книге, которая выходит ежемесячно. Обновления существующих книг тоже включены.",
  },
  {
    q: "Могу ли я отменить подписку?",
    a: "Да, подписку можно отменить в любой момент. После отмены доступ сохраняется до конца оплаченного периода.",
  },
  {
    q: "Как быстро я получу доступ?",
    a: "Мгновенно. Сразу после оплаты вы получите доступ ко всем материалам.",
  },
  {
    q: "Подойдут ли промпты новичку?",
    a: "Да! Книги содержат промпты разного уровня — от простых шаблонов до продвинутых техник. Есть пояснения к каждому промпту.",
  },
  {
    q: "Как часто выходят новые книги?",
    a: "Минимум одна новая книга каждый месяц. Также регулярно обновляются существующие книги с учётом изменений Suno AI.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 md:py-28 bg-muted/30">
      <div className="container max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground">
          Частые вопросы
        </h2>
        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="animate-in-view">
              <AccordionTrigger className="text-left text-foreground font-semibold">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;