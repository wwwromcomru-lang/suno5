import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index.tsx";
import CatalogPage from "./pages/CatalogPage.tsx";
import BookPage from "./pages/BookPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import StickyMobileCTA from "./components/StickyMobileCTA";

const queryClient = new QueryClient();

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    const { hash } = location;
    if (hash) {
      const tryScroll = (attempts = 0) => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else if (attempts < 20) {
          requestAnimationFrame(() => tryScroll(attempts + 1));
        }
      };
      tryScroll();
    } else {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [location]);

  return null;
};

const AppRoutes = () => (
  <LanguageProvider>
    <ScrollToHash />
    <StickyMobileCTA />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/book/:slug" element={<BookPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </LanguageProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/en/*" element={<AppRoutes />} />
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
