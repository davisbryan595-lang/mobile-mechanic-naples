import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { SERVICES, SERVICE_CATEGORIES, type Service } from "@/data/services";

export const Pricing = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [vehicleType, setVehicleType] = useState("");
  const [engineType, setEngineType] = useState("");
  const [complexity, setComplexity] = useState<string[]>([]);
  const [includeServiceCall, setIncludeServiceCall] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<{
    min: number;
    max: number;
    breakdown: string;
  } | null>(null);

  // Vehicle Type Coefficients
  const vehicleMultipliers: Record<string, number> = {
    sedan: 1.0,
    coupe: 1.0,
    suv: 1.1,
    minivan: 1.15,
    truck1500: 1.2,
    truck2500: 1.3,
    commercial: 1.35,
  };

  // Engine Type Coefficients
  const engineMultipliers: Record<string, number> = {
    "4-cylinder": 1.0,
    "6-cylinder": 1.15,
    "8-cylinder": 1.25,
  };

  const engineSurcharges: Record<string, { min: number; max: number }> = {
    "turbo-supercharged": { min: 20, max: 40 },
  };

  // Brand/Complexity Adjustments
  const complexityAdjustments: Record<
    string,
    { min: number; max: number }
  > = {
    european: { min: 40, max: 80 },
    "older-vehicle": { min: 20, max: 50 },
    "rust-hard-access": { min: 30, max: 60 },
    luxury: { min: 20, max: 40 },
    "hybrid-electric": { min: 30, max: 70 },
  };

  // Service Call surcharge
  const serviceCallCharge = { min: 90, max: 200 };

  const complexityOptions = [
    { id: "european", label: "European Vehicle (BMW, Mercedes, Audi, VW, Volvo)" },
    { id: "older-vehicle", label: "Older Vehicle (10+ years)" },
    { id: "rust-hard-access", label: "Rust / Seized Bolts / Hard Access" },
    { id: "luxury", label: "Luxury / Premium (Lexus, Infiniti, Cadillac)" },
    { id: "hybrid-electric", label: "Hybrid / Electric Components" },
  ];

  const calculatePrice = () => {
    if (!selectedService || !vehicleType || !engineType) {
      return;
    }

    let minPrice = selectedService.minPrice;
    let maxPrice = selectedService.maxPrice;

    // Apply vehicle type multiplier
    const vehicleMultiplier = vehicleMultipliers[vehicleType] || 1.0;
    minPrice *= vehicleMultiplier;
    maxPrice *= vehicleMultiplier;

    // Apply engine type multiplier
    const engineMultiplier = engineMultipliers[engineType] || 1.0;
    minPrice *= engineMultiplier;
    maxPrice *= engineMultiplier;

    // Apply turbo/supercharger surcharge if selected
    if (engineType === "turbo-supercharged") {
      minPrice += engineSurcharges["turbo-supercharged"].min;
      maxPrice += engineSurcharges["turbo-supercharged"].max;
    }

    // Apply complexity adjustments
    let complexityMin = 0;
    let complexityMax = 0;
    complexity.forEach((item) => {
      const adj = complexityAdjustments[item];
      if (adj) {
        complexityMin += adj.min;
        complexityMax += adj.max;
      }
    });
    minPrice += complexityMin;
    maxPrice += complexityMax;

    // Apply service call charge if selected
    let serviceCallMin = 0;
    let serviceCallMax = 0;
    if (includeServiceCall) {
      serviceCallMin = serviceCallCharge.min;
      serviceCallMax = serviceCallCharge.max;
    }
    minPrice += serviceCallMin;
    maxPrice += serviceCallMax;

    // Round to nearest dollar
    minPrice = Math.round(minPrice);
    maxPrice = Math.round(maxPrice);

    // Build breakdown string
    const breakdownParts = [];
    breakdownParts.push(
      `Base: $${selectedService.minPrice}-$${selectedService.maxPrice}`
    );
    breakdownParts.push(`Vehicle (${vehicleType}): ×${vehicleMultiplier}`);
    breakdownParts.push(`Engine (${engineType}): ×${engineMultiplier}`);

    if (engineType === "turbo-supercharged") {
      breakdownParts.push(
        `Turbo/Supercharged: +$${engineSurcharges["turbo-supercharged"].min}-$${engineSurcharges["turbo-supercharged"].max}`
      );
    }

    if (complexity.length > 0) {
      breakdownParts.push(
        `Complexity Adjustments: +$${complexityMin}-$${complexityMax}`
      );
    }

    if (includeServiceCall) {
      breakdownParts.push(
        `Service Call: +$${serviceCallCharge.min}-$${serviceCallCharge.max}`
      );
    }

    setEstimatedPrice({
      min: minPrice,
      max: maxPrice,
      breakdown: breakdownParts.join(" | "),
    });
  };

  const toggleComplexity = (item: string) => {
    setComplexity((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  const groupedServices = SERVICE_CATEGORIES.map((category) => ({
    category,
    services: SERVICES.filter((s) => s.category === category),
  }));

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
            Estimate Your{" "}
            <span className="text-primary text-glow">Service Cost</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Advanced price calculator with vehicle coefficients and complexity
            adjustments
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-metallic border-2 border-primary/30 rounded-lg p-8 glow-orange">
            <div className="space-y-6">
              {/* Service Type */}
              <div>
                <label className="block text-sm font-orbitron font-bold mb-2">
                  ① Select a Service
                </label>
                <Select
                  value={selectedService?.id || ""}
                  onValueChange={(value) => {
                    const service = SERVICES.find((s) => s.id === value);
                    setSelectedService(service || null);
                    setEstimatedPrice(null);
                  }}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border max-h-60 overflow-y-auto">
                    {groupedServices.map((group) => (
                      <div key={group.category}>
                        <div className="px-2 py-1.5 text-xs font-bold text-muted-foreground font-orbitron">
                          {group.category}
                        </div>
                        {group.services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
                {selectedService && (
                  <div className="mt-2 p-3 bg-primary/10 rounded border border-primary/20">
                    <p className="text-sm text-foreground font-medium">
                      {selectedService.name}
                    </p>
                    {selectedService.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {selectedService.description}
                      </p>
                    )}
                    <p className="text-sm font-bold text-primary mt-2">
                      Base Range: ${selectedService.minPrice} - $
                      {selectedService.maxPrice}
                    </p>
                  </div>
                )}
              </div>

              {/* Vehicle Type */}
              <div>
                <label className="block text-sm font-orbitron font-bold mb-2">
                  ② Vehicle Type
                </label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="sedan">Sedan / Coupe (×1.00)</SelectItem>
                    <SelectItem value="suv">SUV (×1.10)</SelectItem>
                    <SelectItem value="minivan">Minivan (×1.15)</SelectItem>
                    <SelectItem value="truck1500">Pickup Truck 1500 (×1.20)</SelectItem>
                    <SelectItem value="truck2500">
                      Pickup Truck 2500–3500 (×1.30)
                    </SelectItem>
                    <SelectItem value="commercial">
                      Commercial Van / Heavy Duty (×1.35)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Engine Type */}
              <div>
                <label className="block text-sm font-orbitron font-bold mb-2">
                  ③ Engine Type
                </label>
                <Select value={engineType} onValueChange={setEngineType}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select engine type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="4-cylinder">4 Cylinder (×1.00)</SelectItem>
                    <SelectItem value="6-cylinder">6 Cylinder (×1.15)</SelectItem>
                    <SelectItem value="8-cylinder">8 Cylinder (×1.25)</SelectItem>
                    <SelectItem value="turbo-supercharged">
                      Turbo / Supercharged (+$20–$40)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Brand / Complexity Adjustments */}
              <div>
                <label className="block text-sm font-orbitron font-bold mb-3">
                  ④ Brand / Complexity Options (Optional)
                </label>
                <div className="space-y-2 bg-background/50 p-4 rounded border border-border/50">
                  {complexityOptions.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={complexity.includes(option.id)}
                        onChange={() => toggleComplexity(option.id)}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm text-foreground">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Service Call */}
              <div>
                <label className="block text-sm font-orbitron font-bold mb-3">
                  ⑤ Service Call
                </label>
                <label className="flex items-center gap-3 cursor-pointer bg-background/50 p-4 rounded border border-border/50">
                  <input
                    type="checkbox"
                    checked={includeServiceCall}
                    onChange={() => setIncludeServiceCall(!includeServiceCall)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm text-foreground">
                    Include Mobile Mechanic First Hour Service Call
                    (+$90–$200)
                  </span>
                </label>
              </div>

              {/* Calculate Button */}
              <Button
                onClick={calculatePrice}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-bold text-lg glow-orange-strong"
                size="lg"
                disabled={!selectedService || !vehicleType || !engineType}
              >
                <Calculator className="mr-2 w-5 h-5" />
                Calculate Estimate
              </Button>

              {/* Price Display */}
              {estimatedPrice && (
                <div className="mt-6 p-6 bg-primary/10 border-2 border-primary rounded-lg text-center animate-fade-in">
                  <p className="text-sm font-orbitron text-muted-foreground mb-2">
                    Estimated Price Range
                  </p>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Min</p>
                      <p className="text-4xl font-orbitron font-bold text-primary">
                        ${estimatedPrice.min}
                      </p>
                    </div>
                    <div className="text-xl text-muted-foreground">-</div>
                    <div>
                      <p className="text-xs text-muted-foreground">Max</p>
                      <p className="text-4xl font-orbitron font-bold text-primary">
                        ${estimatedPrice.max}
                      </p>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="mb-4 p-3 bg-background/50 rounded border border-border/50">
                    <p className="text-xs font-orbitron text-muted-foreground">
                      Calculation Breakdown:
                    </p>
                    <p className="text-xs text-foreground mt-2 text-left leading-relaxed">
                      {estimatedPrice.breakdown}
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    *Final price may vary based on vehicle condition, parts, and
                    additional labor
                  </p>

                  <Button
                    className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron"
                    onClick={() => {
                      const element = document.getElementById("contact");
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Book This Service
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Services Overview */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h3 className="text-2xl font-orbitron font-bold mb-8 text-center">
            Complete Service Catalog
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groupedServices.map((group) => (
              <div
                key={group.category}
                className="bg-gradient-metallic border border-border rounded-lg p-4"
              >
                <h4 className="font-orbitron font-bold text-primary mb-3">
                  {group.category}
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {group.services.map((service) => (
                    <li
                      key={service.id}
                      className="flex justify-between items-start gap-2"
                    >
                      <span className="flex-1">{service.name}</span>
                      <span className="font-bold text-primary whitespace-nowrap">
                        ${service.minPrice}-${service.maxPrice}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
