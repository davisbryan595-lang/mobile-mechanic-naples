import { useParams, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { Contact } from "@/components/Contact";
import { cities } from "@/data/cities";
import { Button } from "@/components/ui/button";
import { Phone, MapPin } from "lucide-react";

export const CityContact = () => {
  const { citySlug } = useParams();
  const city = cities.find((c) => c.slug === citySlug);

  if (!city) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section with Phone and Location */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
                Book Mobile Mechanic Service in {city.name}
              </h1>
              
              {/* Phone Number - Prominent */}
              <div className="flex items-center justify-center gap-2 mb-4 p-4 bg-primary/10 rounded-lg w-fit mx-auto">
                <Phone className="w-6 h-6 text-primary" />
                <a 
                  href="tel:2392729166"
                  className="text-primary font-orbitron font-bold text-xl hover:underline"
                >
                  Call: (239) 272-9166
                </a>
              </div>

              {/* Service Areas */}
              <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-background rounded-lg w-fit mx-auto">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-muted-foreground font-rajdhani">
                  <span className="font-bold text-foreground">Serving: </span>
                  {city.areas.join(", ")}
                </p>
              </div>

              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Fast, professional mobile mechanic service - we come to you!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Component */}
        <Contact />

        {/* Additional Contact Info */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-orbitron text-2xl font-bold mb-6">Other Ways to Reach Us</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-background rounded-lg border border-primary/20">
                  <h3 className="font-orbitron font-bold mb-2">Call Now</h3>
                  <a href="tel:2392729166" className="text-primary hover:underline text-lg font-bold">
                    (239) 272-9166
                  </a>
                </div>
                <div className="p-6 bg-background rounded-lg border border-primary/20">
                  <h3 className="font-orbitron font-bold mb-2">SMS</h3>
                  <a href="sms:2392729166" className="text-primary hover:underline text-lg font-bold">
                    Text us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
      <AccessibilityWidget />
    </div>
  );
};
