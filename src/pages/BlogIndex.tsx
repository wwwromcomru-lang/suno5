import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { blogPosts } from "@/data/blog";

const BlogIndex = () => {
  const { prefix } = useLanguage();

  useEffect(() => {
    document.title = "Блог о Suno AI — гайды, промпты, разборы | SUNO5.RU";
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        "Статьи о Suno AI: как писать промпты, разбор жанров, советы по вокалу, заработок на AI-музыке."
      );

    // JSON-LD Blog schema
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = "blog-jsonld";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "SUNO5.RU Блог",
      url: "https://suno5.ru/blog",
      blogPost: blogPosts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        datePublished: p.date,
        url: `https://suno5.ru/blog/${p.slug}`,
        description: p.description,
      })),
    });
    document.head.appendChild(ld);
    return () => {
      document.getElementById("blog-jsonld")?.remove();
    };
  }, []);

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

      <main className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-center text-foreground">
            Блог о Suno AI
          </h1>
          <p className="mt-3 text-center text-muted-foreground text-lg">
            Гайды, разборы и подборки промптов для AI-музыки
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`${prefix}/blog/${post.slug}`}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/40 hover:shadow-lg transition-all"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                  {post.description}
                </p>
                <div className="mt-4 text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  · {post.readingMinutes} мин
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogIndex;
