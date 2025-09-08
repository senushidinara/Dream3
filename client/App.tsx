import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Islands from "./pages/Islands";
import Gallery from "./pages/Gallery";
import Library from "./pages/Library";
import Constellation from "./pages/Constellation";
import Presentation from "./pages/Presentation";
import Garden from "./pages/Garden";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GameProvider } from "@/state/game";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <GameProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/islands" element={<Islands />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/library" element={<Library />} />
            <Route path="/constellation" element={<Constellation />} />
            <Route path="/garden" element={<Garden />} />
            <Route path="/quest" element={<Presentation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </GameProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
