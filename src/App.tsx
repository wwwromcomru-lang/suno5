import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index.tsx";
import CatalogPage from "./pages/CatalogPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <LanguageProvider>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </LanguageProvider>
);

const App = () => {
  console.log("[v0] App component rendering");
  return (
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
};

export default App;
