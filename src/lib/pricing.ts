// Единая точка правды по цене и дедлайну повышения.
// Цена повышается 1 мая 2026, 00:00 МСК (UTC+3) → 2990 ₽.

export const PRICE_HIKE_TS = Date.UTC(2026, 4, 1, 0, 0, 0) - 3 * 60 * 60 * 1000;
export const OLD_PRICE = 1990;
export const NEW_PRICE = 2990;

export const isBeforeHike = (now: number = Date.now()) => now < PRICE_HIKE_TS;

export const getCurrentPrice = (now: number = Date.now()) =>
  isBeforeHike(now) ? OLD_PRICE : NEW_PRICE;

// Якорь CTA — единая ссылка на тарифы с любой страницы.
export const tariffsAnchor = (prefix: string, isHome: boolean) =>
  isHome ? "#tariffs" : `${prefix}/#tariffs`;
