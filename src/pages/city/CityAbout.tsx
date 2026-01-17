import { useParams, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { cities } from "@/data/cities";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle } from "lucide-react";

export const CityAbout = () => {
  const { citySlug } = useParams();
  const city = cities.find((c) => c.slug === citySlug);

  if (!city) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
                About Our {city.name} Mobile Mechanic Service
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Professional automotive expertise serving {city.areas.join(", ")}
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

        {/* About Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-12">
              {/* Our Mission */}
              <div>
                <h2 className="font-orbitron text-3xl font-bold mb-4 text-primary">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We bring professional automotive repair expertise directly to you in {city.name}. 
                  No more dealing with the hassle of going to a traditional repair shop. Our certified 
                  mobile mechanics come to your home or office, equipped with the tools and knowledge 
                  to diagnose and repair your vehicle on-site.
                </p>
              </div>

              {/* Why Choose Us */}
              <div>
                <h2 className="font-orbitron text-3xl font-bold mb-6 text-primary">
                  Why Choose Our {city.name} Service
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Mobile service - we come to you",
                    "No towing costs or inconvenience",
                    "Certified professional mechanics",
                    "Transparent pricing",
                    "Comprehensive warranty",
                    "Fast, reliable repairs",
                    "Available in your schedule",
                    "Local expertise and knowledge",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Area */}
              <div>
                <h2 className="font-orbitron text-3xl font-bold mb-4 text-primary">
                  Service Area
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  We proudly serve {city.name} and the surrounding communities:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {city.areas.map((area, idx) => (
                    <div key={idx} className="p-4 bg-card rounded-lg border border-primary/20">
                      <p className="font-orbitron font-bold text-primary">{area}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h2 className="font-orbitron text-3xl font-bold mb-4 text-primary">
                  Our Experience
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  With years of experience serving the {city.name} area, we've built a reputation 
                  for honest, reliable service. Our mechanics are certified and trained to handle 
                  all types of vehicle repairs - from routine maintenance to complex diagnostics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-6">
              Need Mobile Mechanic Service in {city.name}?
            </h2>
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-bold text-lg px-8 glow-orange-strong"
              onClick={() => window.location.href = `/${city.slug}-contact`}
            >
              📅 Book Online / Book a Service
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
