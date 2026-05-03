import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { blogPosts } from "@/data/blog";

// Minimal markdown-ish renderer: ##, ```, >, lists, paragraphs
const renderContent = (md: string) => {
  const lines = md.split("\n");
  const blocks: JSX.Element[] = [];
  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={key++} className="text-2xl font-bold mt-8 mb-3 text-foreground">
          {line.slice(3)}
        </h2>
      );
      i++;
    } else if (line.startsWith("```")) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(
        <pre
          key={key++}
          className="bg-muted/60 border border-border rounded-lg p-4 my-4 overflow-x-auto text-sm font-mono whitespace-pre"
        >
          {buf.join("\n")}
        </pre>
      );
    } else if (line.startsWith("> ")) {
      blocks.push(
        <blockquote
          key={key++}
          className="border-l-4 border-primary bg-primary/5 pl-4 py-2 my-4 italic text-foreground"
        >
          {line.slice(2)}
        </blockquote>
      );
      i++;
    } else if (/^\d+\.\s/.test(line) || line.startsWith("- ")) {
      const items: string[] = [];
      const ordered = /^\d+\.\s/.test(line);
      while (
        i < lines.length &&
        (ordered ? /^\d+\.\s/.test(lines[i]) : lines[i].startsWith("- "))
      ) {
        items.push(lines[i].replace(/^(\d+\.\s|- )/, ""));
        i++;
      }
      const ListTag = ordered ? "ol" : "ul";
      blocks.push(
        <ListTag
          key={key++}
          className={`${ordered ? "list-decimal" : "list-disc"} pl-6 my-4 space-y-1 text-foreground`}
        >
          {items.map((it, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: inline(it) }} />
          ))}
        </ListTag>
      );
    } else if (line.trim() === "") {
      i++;
    } else {
      blocks.push(
        <p
          key={key++}
          className="my-3 leading-relaxed text-foreground"
          dangerouslySetInnerHTML={{ __html: inline(line) }}
        />
      );
      i++;
    }
  }
  return blocks;
};

const inline = (s: string) =>
  s
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

const BlogPost = () => {
  const { slug } = useParams();
  const { prefix } = useLanguage();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | SUNO5.RU`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", post.description);

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = "post-jsonld";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: { "@type": "Organization", name: "SUNO5.RU" },
      publisher: { "@type": "Organization", name: "SUNO5.RU" },
      mainEntityOfPage: `https://suno5.ru/blog/${post.slug}`,
    });
    document.head.appendChild(ld);
    return () => {
      document.getElementById("post-jsonld")?.remove();
    };
  }, [post]);

  if (!post) return <Navigate to={prefix + "/blog"} replace />;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container flex items-center justify-between h-16">
          <Link to={prefix + "/"} className="text-xl font-extrabold brand-gradient-text">
            SUNO5.RU
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              to={prefix + "/#tariffs"}
              className="bg-accent text-accent-foreground px-5 py-2 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Подписаться
            </Link>
          </div>
        </nav>
      </header>

      <main className="py-12 md:py-20">
        <article className="container max-w-3xl">
          <Link
            to={prefix + "/blog"}
            className="text-sm text-primary hover:underline"
          >
            ← Все статьи
          </Link>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
            {post.title}
          </h1>

          <div className="mt-3 text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {post.readingMinutes} мин чтения
          </div>

          <div className="mt-8 prose prose-invert max-w-none">
            {renderContent(post.content)}
          </div>

          <div className="mt-12 p-6 bg-card rounded-2xl border border-border text-center">
            <h3 className="text-xl font-bold text-foreground">
              5000+ готовых промптов для Suno AI
            </h3>
            <p className="mt-2 text-muted-foreground text-sm">
              Копируйте, вставляйте в Suno и получайте треки за 1 минуту.
            </p>
            <Link
              to={prefix + "/#tariffs"}
              className="inline-block mt-4 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Получить доступ
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogPost;
