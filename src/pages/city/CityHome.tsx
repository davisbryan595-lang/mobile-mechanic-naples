import { useParams, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { cities } from "@/data/cities";
import { Button } from "@/components/ui/button";
import { Phone, MapPin } from "lucide-react";

export const CityHome = () => {
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
        {/* Hero Section - City Specific */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              {/* Phone Number - Visible Immediately */}
              <div className="flex items-center gap-2 mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                <Phone className="w-5 h-5 text-primary" />
                <a 
                  href="tel:2392729166"
                  className="text-primary font-orbitron font-bold text-lg hover:underline"
                >
                  Call: (239) 272-9166
                </a>
              </div>

              <h1 className="font-orbitron text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Mobile Mechanic Service in <span className="text-primary text-glow">{city.name}</span>
              </h1>

              <div className="flex items-start gap-3 mb-6">
                <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-lg font-rajdhani text-muted-foreground">
                    We serve: {city.areas.join(", ")}
                  </p>
                </div>
              </div>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Professional automotive repairs delivered directly to your location. No towing costs. No waiting.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-bold text-lg px-8 glow-orange-strong transition-all hover:scale-105"
                  onClick={() => scrollToSection("contact")}
                >
                  📅 Book Online / Book a Service
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-orbitron font-bold text-lg px-8 transition-all hover:scale-105"
                  onClick={() => scrollToSection("services")}
                >
                  View Services
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
                About Our {city.name} Service
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Serving {city.name} and surrounding communities with professional mobile mechanic expertise
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-background rounded-lg border border-primary/20">
                <h3 className="font-orbitron text-xl font-bold mb-3">Mobile Service</h3>
                <p className="text-muted-foreground">
                  We come to you in {city.areas[0]} and surrounding areas. No need to leave your home or office.
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg border border-primary/20">
                <h3 className="font-orbitron text-xl font-bold mb-3">Professional Mechanics</h3>
                <p className="text-muted-foreground">
                  Experienced, certified technicians ready to diagnose and repair your vehicle on-site.
                </p>
              </div>
              <div className="p-6 bg-background rounded-lg border border-primary/20">
                <h3 className="font-orbitron text-xl font-bold mb-3">Fast & Reliable</h3>
                <p className="text-muted-foreground">
                  Quick diagnosis and repairs. We stand behind our work with a comprehensive warranty.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
                Our <span className="text-primary text-glow">Services</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Complete mobile mechanic services available in {city.name}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "A/C Repair", description: "Air conditioning service and repairs" },
                { title: "Brake Service", description: "Brake pads, rotors, and system repairs" },
                { title: "Diagnostics", description: "Complete vehicle diagnostics" },
                { title: "Starter/Alternator", description: "Electrical system repairs" },
                { title: "Battery Service", description: "Battery replacement and testing" },
                { title: "General Repair", description: "All automotive repair needs" },
              ].map((service, idx) => (
                <div key={idx} className="p-6 bg-background rounded-lg border border-primary/20 hover:border-primary/50 transition-colors">
                  <h3 className="font-orbitron text-xl font-bold mb-2 text-primary">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
                Book Service in <span className="text-primary text-glow">{city.name}</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Call us or fill out the form below to schedule your mobile mechanic service
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="p-8 bg-background rounded-lg border-2 border-primary/30 glow-orange">
                <div className="mb-6 p-4 bg-primary/10 rounded-lg">
                  <p className="text-center font-orbitron font-bold text-lg">
                    <a href="tel:2392729166" className="text-primary hover:underline">
                      📞 Call: (239) 272-9166
                    </a>
                  </p>
                </div>

                <p className="text-center text-muted-foreground mb-6">
                  Ready to book? Contact us directly or use our online form.
                </p>

                <Button 
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-bold text-lg glow-orange-strong"
                  onClick={() => scrollToSection("contact")}
                >
                  Go to Booking Form
                </Button>
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
