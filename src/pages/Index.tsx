import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { MaintenancePackages } from "@/components/MaintenancePackages";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Gallery } from "@/components/Gallery";
import { WarrantyInfo } from "@/components/WarrantyInfo";
import { Reviews } from "@/components/Reviews";
import { Disclaimer } from "@/components/Disclaimer";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
        <Services />
        <Pricing />
        <MaintenancePackages />
        <WhyChooseUs />
        <Gallery />
        <WarrantyInfo />
        <Reviews />
        <Disclaimer />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
