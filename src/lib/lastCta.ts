// Глобальный трекер последней активной CTA «Подписаться».
// Используется, чтобы после смены цены вернуть фокус именно в ту кнопку,
// с которой пользователь взаимодействовал последней (Header / Sticky / Tariffs).

export type CtaSource = "header" | "sticky" | "tariffs";

let lastEl: HTMLElement | null = null;
let lastSource: CtaSource | null = null;

/** Регистрирует CTA как «последнюю использованную». */
export const markLastCta = (el: HTMLElement | null, source: CtaSource) => {
  lastEl = el;
  lastSource = source;
};

/** Возвращает последнюю активную CTA, если она ещё в DOM и видима. */
export const getLastCta = (): HTMLElement | null => {
  if (!lastEl) return null;
  if (!lastEl.isConnected) return null;
  // Скрытые элементы (например, sticky off-screen) не годятся для фокуса.
  const rect = lastEl.getBoundingClientRect();
  const visible = rect.width > 0 && rect.height > 0;
  return visible ? lastEl : null;
};

export const getLastCtaSource = (): CtaSource | null => lastSource;
