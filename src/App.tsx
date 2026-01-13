import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginAdmin from "./pages/admin/LoginAdmin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { CityHome } from "./pages/city/CityHome";
import { CityAbout } from "./pages/city/CityAbout";
import { CityGallery } from "./pages/city/CityGallery";
import { CityServices } from "./pages/city/CityServices";
import { CityContact } from "./pages/city/CityContact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* City-Specific Pages */}
          {/* Fort Myers Pages */}
          <Route path="/fort-myers-home-mechanic-service" element={<CityHome />} />
          <Route path="/fort-myers-about-mechanic-service" element={<CityAbout />} />
          <Route path="/fort-myers-gallery-mechanic-service" element={<CityGallery />} />
          <Route path="/fort-myers-services" element={<CityServices />} />
          <Route path="/fort-myers-contact" element={<CityContact />} />

          {/* Naples Pages */}
          <Route path="/naples-home-mechanic-service" element={<CityHome />} />
          <Route path="/naples-about-mechanic-service" element={<CityAbout />} />
          <Route path="/naples-gallery-mechanic-service" element={<CityGallery />} />
          <Route path="/naples-services" element={<CityServices />} />
          <Route path="/naples-contact" element={<CityContact />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
