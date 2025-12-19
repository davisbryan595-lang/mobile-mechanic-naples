import { Zap, Wrench, DollarSign, Globe, Clock } from "lucide-react";
import whyChooseBg from "@/assets/why-choose-bg.jpg";

export const WhyChooseUs = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Fast Response",
      description: "Same-day service available",
    },
    {
      icon: Wrench,
      title: "Certified Technicians",
      description: "Professional tools & expertise",
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "No hidden fees or surprises",
    },
    {
      icon: Zap,
      title: "We Come to You",
      description: "Anywhere in Southwest Florida",
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "English / Russian / Polish",
    },
  ];

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `url(${whyChooseBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-background/90" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-primary text-glow">Our Service</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional mobile mechanics you can trust
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-6 bg-gradient-metallic border-2 border-primary/30 rounded-lg hover:border-primary transition-all hover:glow-orange-strong hover:scale-105 text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-orbitron font-bold text-lg mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
