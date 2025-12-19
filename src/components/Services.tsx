import serviceAc from "@/assets/service-ac.jpg";
import serviceBrakes from "@/assets/service-brakes.jpg";
import serviceDiagnostics from "@/assets/service-diagnostics.jpg";
import serviceElectrical from "@/assets/service-electrical.jpg";
import serviceSuspension from "@/assets/service-suspension.jpg";
import serviceBattery from "@/assets/service-battery.jpg";
import serviceMaintenance from "@/assets/service-maintenance.jpg";
import serviceMore from "@/assets/service-more.jpg";

export const Services = () => {
  const services = [
    {
      image: serviceAc,
      title: "A/C Repair & Recharge",
      description: "Complete air conditioning diagnostics and repair service",
    },
    {
      image: serviceBrakes,
      title: "Brake Service & Replacement",
      description: "Brake pads, rotors, calipers, and complete brake system service",
    },
    {
      image: serviceDiagnostics,
      title: "Engine Diagnostics",
      description: "Advanced diagnostic scanning and engine troubleshooting",
    },
    {
      image: serviceElectrical,
      title: "Starter & Alternator",
      description: "Electrical system diagnostics and component replacement",
    },
    {
      image: serviceSuspension,
      title: "Suspension & Struts",
      description: "Shock absorbers, struts, and complete suspension repair",
    },
    {
      image: serviceBattery,
      title: "Battery Replacement",
      description: "Battery testing, replacement, and charging system check",
    },
    {
      image: serviceMaintenance,
      title: "Routine Maintenance",
      description: "Oil changes, filters, fluids, and preventive care",
    },
    {
      image: serviceMore,
      title: "And Much More",
      description: "Full range of automotive repair and maintenance services",
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
            >
              <div className="flex flex-col text-center">
                <div className="w-full h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-orbitron font-bold text-lg">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
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
