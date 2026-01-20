import { useParams, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { Gallery } from "@/components/Gallery";
import { cities } from "@/data/cities";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export const CityGallery = () => {
  const { citySlug } = useParams();
  const city = cities.find((c) => c.slug === citySlug);

  if (!city) {
    return <Navigate to="/" replace />;
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
                Gallery - {city.name} Mobile Mechanic Service
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                See our work and equipment in action
              </p>
              
              {/* Phone Number */}
              <div className="flex items-center justify-center gap-2 mt-6 p-3 bg-primary/10 rounded-lg w-fit mx-auto">
                <Phone className="w-5 h-5 text-primary" />
                <a 
                  href="tel:2392729166"
                  className="text-primary font-orbitron font-bold text-lg hover:underline"
                >
                  Call: (239) 272-9166
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Component */}
        <Gallery />

        {/* CTA Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Our Service in {city.name}?
            </h2>
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-bold text-lg px-8 glow-orange-strong"
              onClick={() => window.location.href = `/${city.slug}-contact`}
            >
              📅 Book Service Now
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
      <AccessibilityWidget />
    </div>
  );
};
