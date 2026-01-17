import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, Phone } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-32">
        <div className="max-w-3xl animate-fade-in">
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

          <div className="flex items-center gap-3 mb-6">
            <Wrench className="w-8 h-8 text-primary animate-glow" />
            <span className="text-primary font-orbitron text-sm tracking-widest uppercase">
              Professional Mobile Service
            </span>
          </div>

          <h1 className="font-orbitron text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Mobile Mechanic —{" "}
            <span className="text-primary text-glow">Fast, Honest, Reliable</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-rajdhani">
            We come to you — Naples, Bonita Springs, Estero, Fort Myers, Lehigh Acres
          </p>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            No towing costs. No waiting. Professional automotive repairs delivered to your location.
          </p>

          {/* CTA Buttons - Two Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-bold text-lg px-8 glow-orange-strong transition-all hover:scale-105"
              onClick={() => scrollToSection("contact")}
            >
              📅 Book Online / Book a Service
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-orbitron font-bold text-lg px-8 transition-all hover:scale-105"
              onClick={() => scrollToSection("services")}
            >
              View Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
