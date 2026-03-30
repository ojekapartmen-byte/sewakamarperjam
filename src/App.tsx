import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import BlogList from "./pages/BlogList.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import KatalogPage from "./pages/KatalogPage.tsx";
import HargaPage from "./pages/HargaPage.tsx";
import TentangPage from "./pages/TentangPage.tsx";
import SewaPerJamPage from "./pages/SewaPerJamPage.tsx";
import SewaHarianPage from "./pages/SewaHarianPage.tsx";
import GaleriPage from "./pages/GaleriPage.tsx";
import BookingPage from "./pages/BookingPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/katalog" element={<KatalogPage />} />
              <Route path="/harga" element={<HargaPage />} />
              <Route path="/tentang" element={<TentangPage />} />
              <Route path="/sewa-per-jam" element={<SewaPerJamPage />} />
              <Route path="/sewa-harian" element={<SewaHarianPage />} />
              <Route path="/galeri" element={<GaleriPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
