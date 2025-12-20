export const Services = () => {
  const services = [
    {
      image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F94e4eba16ad54f84936a6f7af881d1ab?format=webp&width=800",
      title: "Routine Maintenance Service",
      description: "Oil changes, filters, fluids, and preventive care",
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2Fed5399a1ba734975b185d6fc2efdcd53?format=webp&width=800",
      title: "Headlight Restoration",
      description: "Professional headlight polishing and UV protection",
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F34b72e1131b14151a5a8b342b0c36c6b?format=webp&width=800",
      title: "A/C Repair & Recharge",
      description: "Complete air conditioning diagnostics and repair service",
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F5dbffd29bdc44430ae6de4ae5f43d83f?format=webp&width=800",
      title: "Brake Service & Replacement",
      description: "Brake pads, rotors, calipers, and complete brake system service",
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2Fac01be146c2148bb97109e6b4f31d923?format=webp&width=800",
      title: "Engine Diagnostics",
      description: "Advanced diagnostic scanning and engine troubleshooting",
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F18e25977dc7a4eb5ac11297d801851e9?format=webp&width=800",
      title: "Starter & Alternator",
      description: "Electrical system diagnostics and component replacement",
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F82386ba0d484475883f848caf812ea68?format=webp&width=800",
      title: "Mobile Detailing Package",
      description: "Professional interior and exterior detailing service",
    },
    {
      image: "https://images.pexels.com/photos/12185933/pexels-photo-12185933.jpeg",
      title: "Suspension & Struts",
      description: "Shock absorbers, struts, and complete suspension repair",
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
