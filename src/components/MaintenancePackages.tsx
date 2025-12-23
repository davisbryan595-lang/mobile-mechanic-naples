import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";

interface Package {
  id: string;
  name: string;
  description: string;
  services: string[];
  basePrice: {
    min: number;
    max: number;
  };
  icon: string;
}

export const MaintenancePackages = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [vehicleType, setVehicleType] = useState("");
  const [engineType, setEngineType] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [adjustedPrice, setAdjustedPrice] = useState<{
    min: number;
    max: number;
    original: { min: number; max: number };
    multiplier: number;
  } | null>(null);

  const packages: Package[] = [
    {
      id: "package-a",
      name: "Service A",
      description: "Essential maintenance for regular vehicle upkeep",
      icon: "🛠️",
      services: [
        "Oil Change (Labor Only)",
        "Engine Oil Filter",
        "Fluid Level Check",
        "Battery Test",
      ],
      basePrice: {
        min: 120,
        max: 200,
      },
    },
    {
      id: "package-b",
      name: "Service B",
      description: "Comprehensive service for optimal performance",
      icon: "⚙️",
      services: [
        "Oil Change (Labor Only)",
        "Engine Oil Filter",
        "Cabin Air Filter",
        "Spark Plugs Replacement",
        "Brake Inspection",
        "Battery Test",
        "Fluid Top-Off",
      ],
      basePrice: {
        min: 250,
        max: 450,
      },
    },
    {
      id: "package-c",
      name: "Service C",
      description: "Full vehicle inspection and preventive maintenance",
      icon: "👑",
      services: [
        "Oil Change (Labor Only)",
        "Engine Oil Filter",
        "Cabin Air Filter",
        "Fuel Filter",
        "Spark Plugs Replacement",
        "Brake System Check",
        "Suspension Inspection",
        "Battery & Alternator Test",
        "Fluid Check & Top-Off",
        "Headlight Inspection",
      ],
      basePrice: {
        min: 400,
        max: 700,
      },
    },
    {
      id: "package-d",
      name: "Service D",
      description: "Complete vehicle care with diagnostics and advanced services",
      icon: "🔧",
      services: [
        "Oil Change (Labor Only)",
        "Engine Oil Filter",
        "Cabin Air Filter",
        "Fuel Filter",
        "Spark Plugs Replacement",
        "Full Brake Service",
        "Suspension Inspection",
        "Battery & Alternator Test",
        "OBD Computer Diagnostic",
        "Electrical Diagnostics",
        "Fluid Check & Top-Off",
        "Headlight Inspection",
      ],
      basePrice: {
        min: 600,
        max: 1000,
      },
    },
  ];

  // Vehicle Type Multipliers
  const vehicleMultipliers: Record<string, number> = {
    sedan: 1.0,
    coupe: 1.0,
    suv: 1.1,
    minivan: 1.15,
    truck1500: 1.2,
    truck2500: 1.3,
    commercial: 1.35,
  };

  // Engine Type Multipliers
  const engineMultipliers: Record<string, number> = {
    "4-cylinder": 1.0,
    "6-cylinder": 1.15,
    "8-cylinder": 1.25,
  };

  // Vehicle Age Multipliers
  const vehicleAgeMultipliers: Record<string, number> = {
    "2020-2025": 1.0,
    "2010-2019": 1.1,
    "2000-2009": 1.15,
    "pre-2000": 1.25,
  };

  const calculatePackagePrice = (packageId: string) => {
    if (!vehicleType || !engineType || !vehicleYear) {
      return;
    }

    const pkg = packages.find((p) => p.id === packageId);
    if (!pkg) return;

    let minPrice = pkg.basePrice.min;
    let maxPrice = pkg.basePrice.max;

    const vehicleMultiplier = vehicleMultipliers[vehicleType] || 1.0;
    const engineMultiplier = engineMultipliers[engineType] || 1.0;
    const ageMultiplier = vehicleAgeMultipliers[vehicleYear] || 1.0;

    const totalMultiplier = vehicleMultiplier * engineMultiplier * ageMultiplier;

    minPrice = Math.round(minPrice * totalMultiplier);
    maxPrice = Math.round(maxPrice * totalMultiplier);

    setSelectedPackage(packageId);
    setAdjustedPrice({
      min: minPrice,
      max: maxPrice,
      original: pkg.basePrice,
      multiplier: totalMultiplier,
    });
  };

  const handleSelectPackage = (packageId: string) => {
    calculatePackagePrice(packageId);
  };

  return (
    <section id="packages" className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
            Maintenance <span className="text-primary text-glow">Packages</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Bundled services with smart pricing based on your vehicle
          </p>
        </div>

        {/* Price Calculator */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-metallic border-2 border-primary/30 rounded-lg p-8 glow-orange">
            <h3 className="font-orbitron text-xl font-bold mb-6 text-center">
              Customize Your Quote
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Vehicle Type */}
              <div>
                <label className="block text-sm font-orbitron font-bold mb-2">
                  Vehicle Type
                </label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="sedan">Sedan / Coupe</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="minivan">Minivan</SelectItem>
                    <SelectItem value="truck1500">Pickup 1500</SelectItem>
                    <SelectItem value="truck2500">Pickup 2500–3500</SelectItem>
                    <SelectItem value="commercial">Commercial Van</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Engine Type */}
              <div>
                <label className="block text-sm font-orbitron font-bold mb-2">
                  Engine Type
                </label>
                <Select value={engineType} onValueChange={setEngineType}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select engine" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="4-cylinder">4 Cylinder</SelectItem>
                    <SelectItem value="6-cylinder">6 Cylinder</SelectItem>
                    <SelectItem value="8-cylinder">8 Cylinder</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Vehicle Year */}
              <div>
                <label className="block text-sm font-orbitron font-bold mb-2">
                  Vehicle Year
                </label>
                <Select value={vehicleYear} onValueChange={setVehicleYear}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="2020-2025">2020–2025</SelectItem>
                    <SelectItem value="2010-2019">2010–2019</SelectItem>
                    <SelectItem value="2000-2009">2000–2009</SelectItem>
                    <SelectItem value="pre-2000">Pre-2000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-lg border-2 transition-all ${
                selectedPackage === pkg.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              } overflow-hidden animate-slide-up`}
            >
              {/* Package Header */}
              <div className="bg-gradient-metallic border-b border-border p-6">
                <div className="text-3xl mb-2">{pkg.icon}</div>
                <h3 className="font-orbitron text-2xl font-bold mb-2">
                  {pkg.name}
                </h3>
                <p className="text-muted-foreground text-sm">{pkg.description}</p>
              </div>

              {/* Services List */}
              <div className="p-6 space-y-3">
                {pkg.services.map((service, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{service}</span>
                  </div>
                ))}
              </div>

              {/* Price and Button */}
              <div className="bg-background/50 p-6 border-t border-border">
                <div className="text-center mb-4">
                  {adjustedPrice && selectedPackage === pkg.id ? (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Estimated Price
                      </p>
                      <p className="font-orbitron text-2xl font-bold text-primary">
                        ${adjustedPrice.min} - ${adjustedPrice.max}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        (Multiplier: {adjustedPrice.multiplier.toFixed(2)}×)
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Starting at
                      </p>
                      <p className="font-orbitron text-lg font-bold text-primary">
                        ${pkg.basePrice.min} - ${pkg.basePrice.max}
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => handleSelectPackage(pkg.id)}
                  className={`w-full ${
                    selectedPackage === pkg.id
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  } font-orbitron font-bold glow-orange-strong`}
                >
                  {selectedPackage === pkg.id ? "✓ Selected" : "Select Package"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 max-w-2xl mx-auto bg-primary/10 border border-primary/30 rounded-lg p-6 text-center">
          <p className="text-sm text-foreground font-bold mb-2">
            💡 Smart Pricing Technology
          </p>
          <p className="text-xs text-muted-foreground">
            Prices automatically adjust based on your vehicle type, engine size, and year.
            Parts and materials are billed separately. Select your vehicle details and a package to see the adjusted estimate.
          </p>
        </div>
      </div>
    </section>
  );
};
