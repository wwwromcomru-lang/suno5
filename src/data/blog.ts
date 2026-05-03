export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readingMinutes: number;
  tags: string[];
  cover?: string;
  // Markdown-like content rendered as paragraphs / headings
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "kak-napisat-promt-dlya-suno",
    title: "Как написать идеальный промпт для Suno AI: пошаговое руководство",
    description:
      "Подробный гайд по структуре промпта в Suno AI: жанр, настроение, инструменты, вокал, темп. Примеры и шаблоны.",
    date: "2026-04-10",
    readingMinutes: 7,
    tags: ["Suno", "Промпты", "Гайд"],
    content: `## Что такое промпт в Suno

Промпт — это текстовое описание, по которому нейросеть Suno AI генерирует музыкальный трек. От качества формулировки напрямую зависит результат: один и тот же жанр можно описать так, что получится шедевр, а можно — так, что выйдет каша.

## Базовая формула промпта

Идеальный промпт включает 5 блоков:

1. **Жанр и поджанр** — phonk, lo-fi hip-hop, synthwave, cinematic trailer
2. **Настроение** — dark, melancholic, uplifting, aggressive
3. **Инструменты** — 808 bass, distorted guitar, analog synths, orchestral strings
4. **Темп и ритм** — 140 BPM, half-time, syncopated
5. **Вокал** — female ethereal vocals, deep male voice, no vocals

## Пример хорошего промпта

> Dark phonk, aggressive, distorted 808 bass, cowbell, memphis-style vocal chops, 140 BPM, cinematic intro

## Чего избегать

- Слишком длинных описаний (Suno обрезает после ~200 символов)
- Противоречивых инструкций («медленный быстрый трек»)
- Имён реальных артистов — лучше использовать описание стиля

## Готовые шаблоны

В нашей библиотеке — 5000+ протестированных промптов по жанрам, готовых к копированию.`,
  },
  {
    slug: "10-zhanrov-za-5-minut",
    title: "10 жанров для Suno за 5 минут: от phonk до cinematic",
    description:
      "Краткий обзор 10 популярных жанров в Suno AI с готовыми промптами. Phonk, synthwave, lo-fi, drill, ambient и другие.",
    date: "2026-04-12",
    readingMinutes: 6,
    tags: ["Жанры", "Промпты"],
    content: `## 1. Phonk
Тёмный, агрессивный, с cowbell и memphis-вокалом. Промпт: \`dark phonk, aggressive 808, cowbell, memphis vocal chops\`.

## 2. Synthwave
Ретро 80-х, аналоговые синты. Промпт: \`retro synthwave, analog synths, gated reverb drums, neon nights\`.

## 3. Lo-fi hip-hop
Расслабленный, для учёбы. Промпт: \`lo-fi hip-hop, jazzy chords, vinyl crackle, mellow piano, 80 BPM\`.

## 4. Drill
Жёсткие триолы хэтов. Промпт: \`UK drill, sliding 808, triplet hi-hats, dark piano\`.

## 5. Cinematic trailer
Эпичный оркестр. Промпт: \`epic cinematic trailer, orchestral strings, choir, taiko drums, rising tension\`.

## 6. Ambient
Атмосферный, без бита. Промпт: \`ambient, ethereal pads, deep drone, no drums, meditative\`.

## 7. House
Танцевальный 4/4. Промпт: \`deep house, 124 BPM, warm bass, female vocal hook\`.

## 8. Trap
Современный hip-hop. Промпт: \`modern trap, heavy 808, rapid hi-hats, melodic piano\`.

## 9. Folk
Акустическая теплота. Промпт: \`indie folk, acoustic guitar, soft male vocals, intimate\`.

## 10. Hyperpop
Экспериментальный поп. Промпт: \`hyperpop, glitchy synths, pitched vocals, 160 BPM, chaotic\`.`,
  },
  {
    slug: "vokal-v-suno-kak-upravlyat",
    title: "Вокал в Suno AI: как управлять голосом, языком и эмоциями",
    description:
      "Как задавать вокал в Suno: пол, возраст, тембр, язык. Промпты для русского, английского и японского вокала.",
    date: "2026-04-14",
    readingMinutes: 5,
    tags: ["Вокал", "Suno"],
    content: `## Управление вокалом

Suno понимает описания: \`female vocals\`, \`male deep voice\`, \`child choir\`, \`raspy vocals\`, \`whispered\`.

## Языки

Suno поддерживает 30+ языков. Просто пишите тексты на нужном языке в поле lyrics — модель сама подстроит акцент.

## Эмоции
- \`emotional\`, \`melancholic\`, \`aggressive\`, \`uplifting\`, \`sensual\`

## Пример

> Female ethereal vocals, melancholic, Russian lyrics, ambient pop, 90 BPM`,
  },
  {
    slug: "suno-vs-udio-sravnenie",
    title: "Suno vs Udio: какой AI-генератор музыки выбрать в 2026",
    description:
      "Сравнение Suno AI и Udio: качество звука, длина треков, цены, экспорт. Что лучше для коммерческих проектов.",
    date: "2026-04-16",
    readingMinutes: 8,
    tags: ["Сравнение", "Suno", "Udio"],
    content: `## Краткий вердикт
- **Suno** — лучше для песен с вокалом, проще промпты, дешевле
- **Udio** — выше качество звука, длиннее треки, сложнее освоить

## Качество звука
Udio выигрывает в детализации, но Suno v4 догнал по миксу.

## Цены
Suno Pro — $10/мес, Udio Pro — $10/мес. Лимиты примерно одинаковые.

## Коммерческое использование
Оба разрешают на платных тарифах.

## Итог
Для большинства задач — Suno. Для аудио-инсталляций и саунд-дизайна — Udio.`,
  },
  {
    slug: "kak-zarabotat-na-suno",
    title: "Как зарабатывать на музыке из Suno: 7 рабочих способов",
    description:
      "Реальные способы монетизации AI-музыки: стоки, YouTube, TikTok, фрилансер-биржи, NFT и подкасты.",
    date: "2026-04-18",
    readingMinutes: 9,
    tags: ["Заработок", "Монетизация"],
    content: `## 1. Музыкальные стоки
Загружайте инструменталки на AudioJungle, Pond5. Цена: $20-60 за трек.

## 2. YouTube-каналы
Lo-fi радио, ambient mix-каналы. Доход от рекламы + Spotify.

## 3. TikTok-саундтреки
Создавайте вирусные хуки под тренды.

## 4. Фриланс
Upwork, Kwork: джинглы, заставки, фоновая музыка.

## 5. Spotify дистрибуция
Через DistroKid, Amuse — роялти за прослушивания.

## 6. Заказная музыка
Клипы, реклама, подкасты — $100-500 за работу.

## 7. Обучающие курсы
Продавайте свои промпты и подходы.`,
  },
  {
    slug: "struktura-pesni-v-suno",
    title: "Структура песни в Suno: куплет, припев, бридж — как разметить",
    description:
      "Как правильно использовать теги [Verse], [Chorus], [Bridge], [Outro] в Suno для контроля структуры трека.",
    date: "2026-04-20",
    readingMinutes: 6,
    tags: ["Структура", "Lyrics"],
    content: `## Теги структуры
Suno понимает разметку в квадратных скобках:
- \`[Intro]\` — вступление
- \`[Verse]\` — куплет
- \`[Pre-Chorus]\` — пред-припев
- \`[Chorus]\` — припев
- \`[Bridge]\` — бридж
- \`[Outro]\` — концовка
- \`[Instrumental]\` — инструментальный проигрыш

## Пример

\`\`\`
[Intro]
(soft piano)

[Verse 1]
Текст первого куплета...

[Chorus]
Припев, который запомнится...

[Verse 2]
...

[Bridge]
Эмоциональный пик...

[Outro]
(fade out)
\`\`\`

## Лайфхаки
- Используйте \`(описание звука)\` внутри блоков
- Тег \`[Instrumental break]\` даёт паузу для соло`,
  },
  {
    slug: "phonk-promty-podborka",
    title: "Phonk-промпты для Suno: 15 готовых формул для дрифт-музыки",
    description:
      "Подборка лучших phonk-промптов для Suno AI: drift phonk, brazilian phonk, memphis phonk, aggressive phonk.",
    date: "2026-04-22",
    readingMinutes: 5,
    tags: ["Phonk", "Промпты"],
    content: `## Drift Phonk
> Drift phonk, distorted 808, cowbell, dark atmosphere, 140 BPM, aggressive

## Brazilian Phonk
> Brazilian phonk, bass-boosted, funk carioca rhythm, female chant, 130 BPM

## Memphis Phonk
> Memphis phonk, lo-fi vinyl, vocal chops, tape saturation, 75 BPM half-time

## Aggressive Phonk
> Aggressive phonk, screaming vocals, hard 808, distorted bass, 150 BPM

## House Phonk
> House phonk fusion, four-on-the-floor, cowbell, dark synth, 128 BPM

(и ещё 10 формул в полной библиотеке)`,
  },
  {
    slug: "suno-dlya-reklamy-i-yutuba",
    title: "Suno для рекламы и YouTube: лицензии, права, безопасность",
    description:
      "Можно ли использовать Suno-треки в рекламе и YouTube? Разбираем лицензии, монетизацию и риски Content ID.",
    date: "2026-04-24",
    readingMinutes: 7,
    tags: ["Лицензии", "YouTube"],
    content: `## Кому принадлежат права
На Suno Pro/Premier — вам. На бесплатном тарифе — Suno (только некоммерческое использование).

## YouTube Content ID
Suno-треки уникальны и не должны попадать под чужой Content ID. Но если вы загрузите трек в дистрибуцию — он начнёт детектиться на ваших же видео. Решение: либо не загружать в стримы, либо whitelist канала.

## Реклама
Полностью разрешена на платных тарифах. Включая ТВ и наружку.

## Что нельзя
Использовать имена реальных артистов в промптах для коммерческих целей.`,
  },
  {
    slug: "lyrics-dlya-suno-kak-pisat",
    title: "Как писать lyrics для Suno: рифма, размер, структура",
    description:
      "Гайд по написанию текстов для AI-песен: длина строк, рифмы, эмоциональный пик. Шаблоны и инструменты.",
    date: "2026-04-26",
    readingMinutes: 6,
    tags: ["Lyrics", "Тексты"],
    content: `## Длина строк
Оптимально — 6-10 слогов. Suno лучше пропевает короткие строки.

## Рифма
AABB и ABAB работают одинаково. Внутренние рифмы усиливают вокал.

## Эмоциональный арк
- Куплет 1 — экспозиция
- Припев — главная мысль (повторяется!)
- Куплет 2 — развитие/конфликт
- Бридж — поворот
- Финальный припев — катарсис

## Инструменты
ChatGPT, Claude, Gemini хорошо помогают с текстами. Уточняйте: «строки по 8 слогов, рифма ABAB, тема — одиночество в большом городе».`,
  },
  {
    slug: "oshibki-novichkov-v-suno",
    title: "10 ошибок новичков в Suno AI и как их избежать",
    description:
      "Типичные ошибки при работе с Suno: длинные промпты, противоречия, имена артистов, плохая структура lyrics.",
    date: "2026-04-28",
    readingMinutes: 6,
    tags: ["Ошибки", "Гайд"],
    content: `## 1. Слишком длинный промпт
Suno режет после ~200 символов. Будьте лаконичны.

## 2. Имена реальных артистов
Не работает + риск для коммерции. Описывайте стиль.

## 3. Противоречивые теги
\`fast slow energetic calm\` — модель запутается.

## 4. Игнорирование структуры
Без \`[Verse]\`/\`[Chorus]\` песня превращается в кашу.

## 5. Слишком много инструментов
3-5 ключевых — оптимум.

## 6. Неправильный BPM
Жанр диктует темп. Phonk не бывает 80 BPM.

## 7. Перегенерация
Не нравится с 1 раза? Меняйте промпт, а не «крутите рулетку».

## 8. Игнор Persona
Persona даёт стабильный голос между треками.

## 9. Экспорт в MP3 вместо WAV
WAV сохраняет качество для дальнейшей обработки.

## 10. Отсутствие референса
Слушайте топ-треки жанра перед написанием промпта.`,
  },
];
