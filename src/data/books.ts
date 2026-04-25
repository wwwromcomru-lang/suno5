import { TranslationKey } from "@/i18n/translations";
import book1 from "@/assets/book1.png";
import book2 from "@/assets/book2.png";
import book3 from "@/assets/book3.png";
import book4 from "@/assets/book4.png";
import book5 from "@/assets/book5.png";
import book6 from "@/assets/book6.png";
import book7 from "@/assets/book7.png";
import book8 from "@/assets/book8.png";
import book9 from "@/assets/book9.png";
import book10 from "@/assets/book10.png";
import book11 from "@/assets/book11.png";
import book12 from "@/assets/book12.png";

export interface BookData {
  slug: string;
  img: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  buyLink: string;
  price?: string;
}

export const booksData: BookData[] = [
  { slug: "1000-promptov", img: book1, titleKey: "book1.title", descKey: "book1.desc", buyLink: "https://sunoprompt.ru/" },
  { slug: "russkiy-hit", img: book2, titleKey: "book2.title", descKey: "book2.desc", buyLink: "https://sunoprompt.ru/books/2/" },
  { slug: "epic-sound-design", img: book3, titleKey: "book3.title", descKey: "book3.desc", buyLink: "https://suno5.ru/books/3/" },
  { slug: "jingle-master", img: book4, titleKey: "book4.title", descKey: "book4.desc", buyLink: "https://suno5.ru/books/4/" },
  { slug: "gym-workout", img: book5, titleKey: "book5.title", descKey: "book5.desc", buyLink: "https://www.suno5.ru/books/5" },
  { slug: "chanson", img: book6, titleKey: "book6.title", descKey: "book6.desc", buyLink: "https://www.suno5.ru/books/6" },
  { slug: "ritm", img: book7, titleKey: "book7.title", descKey: "book7.desc", buyLink: "https://www.suno5.ru/books/7" },
  { slug: "dinamika", img: book8, titleKey: "book8.title", descKey: "book8.desc", buyLink: "https://www.suno5.ru/books/8" },
  { slug: "garmoniya", img: book9, titleKey: "book9.title", descKey: "book9.desc", buyLink: "https://www.suno5.ru/books/9" },
  { slug: "prazdniki", img: book10, titleKey: "book10.title", descKey: "book10.desc", buyLink: "https://mirhitov.ru/" },
  { slug: "1-may", img: book11, titleKey: "book11.title", descKey: "book11.desc", buyLink: "https://mirhitov.ru/1may/" },
  { slug: "9-may", img: book12, titleKey: "book12.title", descKey: "book12.desc", buyLink: "https://mirhitov.ru/9may/" },
];

export const getBookBySlug = (slug: string) => booksData.find((b) => b.slug === slug);
