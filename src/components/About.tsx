import { Wrench, Car, CheckCircle } from "lucide-react";

export const About = () => {
  const features = [
    { icon: Wrench, title: "Certified Technicians", description: "Expert mechanics with years of experience" },
    { icon: Car, title: "Fully Equipped", description: "Complete mobile workshop at your location" },
    { icon: CheckCircle, title: "Quality Guaranteed", description: "Professional service you can trust" },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-primary text-glow">Our Service</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional mobile mechanics bringing the shop to you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="animate-slide-up">
            <div className="relative overflow-hidden rounded-lg border-2 border-primary/30 glow-orange">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F306a1616036f465a99fac4fefda23c7d%2F78aad8dbf45544188a39d8c88cf10eba?format=webp&width=800"
                alt="Mobile Service Logo"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6 animate-slide-up">
            <p className="text-lg text-foreground leading-relaxed">
              At <span className="text-primary font-bold">Mobile Mechanic Service</span>, we deliver professional, 
              on-site vehicle repairs — saving you time and towing costs. Whether it's a quick fix or a full repair, 
              our certified technicians come equipped to handle it all.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              We understand that car trouble can happen anywhere, anytime. That's why we bring our expertise directly 
              to your home, office, or anywhere in Southwest Florida. No more waiting at repair shops or dealing with 
              tow trucks.
            </p>

            <div className="grid gap-4 mt-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 bg-secondary/50 border border-primary/20 rounded-lg hover:border-primary/50 transition-all hover:glow-orange group"
                >
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-orbitron font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
