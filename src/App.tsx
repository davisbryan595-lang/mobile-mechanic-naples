import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginAdmin from "./pages/admin/LoginAdmin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CustomerDetail from "./pages/admin/CustomerDetail";
import CustomerForm from "./pages/admin/CustomerForm";
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
          <Route path="/admin/customers/new" element={<CustomerForm />} />
          <Route path="/admin/customers/:id" element={<CustomerDetail />} />
          <Route path="/admin/customers/:id/edit" element={<CustomerForm />} />

          {/* City-Specific Pages with Dynamic Routes */}
          <Route path="/:citySlug-home-mechanic-service" element={<CityHome />} />
          <Route path="/:citySlug-about-mechanic-service" element={<CityAbout />} />
          <Route path="/:citySlug-gallery-mechanic-service" element={<CityGallery />} />
          <Route path="/:citySlug-services" element={<CityServices />} />
          <Route path="/:citySlug-contact" element={<CityContact />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
