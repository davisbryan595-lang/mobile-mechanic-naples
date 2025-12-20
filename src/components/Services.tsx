export const Services = () => {
  const services = [
    {
      image: "https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg",
      title: "A/C Repair & Recharge",
      description: "Complete air conditioning diagnostics and repair service",
    },
    {
      image: "https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg",
      title: "Brake Service & Replacement",
      description: "Brake pads, rotors, calipers, and complete brake system service",
    },
    {
      image: "https://images.pexels.com/photos/12271954/pexels-photo-12271954.jpeg",
      title: "Engine Diagnostics",
      description: "Advanced diagnostic scanning and engine troubleshooting",
    },
    {
      image: "https://images.pexels.com/photos/5562431/pexels-photo-5562431.jpeg",
      title: "Starter & Alternator",
      description: "Electrical system diagnostics and component replacement",
    },
    {
      image: "https://images.pexels.com/photos/12185933/pexels-photo-12185933.jpeg",
      title: "Suspension & Struts",
      description: "Shock absorbers, struts, and complete suspension repair",
    },
    {
      image: "https://images.pexels.com/photos/5562431/pexels-photo-5562431.jpeg",
      title: "Battery Replacement",
      description: "Battery testing, replacement, and charging system check",
    },
    {
      image: "https://images.pexels.com/photos/10490622/pexels-photo-10490622.jpeg",
      title: "Routine Maintenance",
      description: "Oil changes, filters, fluids, and preventive care",
    },
    {
      image: "https://images.pexels.com/photos/5233268/pexels-photo-5233268.jpeg",
      title: "Headlight Restoration",
      description: "Professional headlight polishing and UV protection",
    },
  ];

  return (
    <section id="services" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary text-glow">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional automotive repairs and maintenance at your location
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gradient-metallic border border-border rounded-lg hover:border-primary transition-all hover:glow-orange hover:scale-105 cursor-pointer animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
              title={service.description}
            >
              <div className="flex flex-col text-center h-full">
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-orbitron font-bold text-lg">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mt-2">{service.description}</p>
                  </div>
                  <div className="text-xs text-primary/60 pt-2">
                    💡 Learn more in our Pricing Calculator
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-lg">
            Don't see what you need?{" "}
            <a href="#contact" className="text-primary hover:underline font-bold">
              Contact us
            </a>{" "}
            for all your automotive repair needs
          </p>
        </div>
      </div>
    </section>
  );
};
