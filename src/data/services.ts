export interface Service {
  id: string;
  name: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  description?: string;
  tooltip?: string;
  partsAvailable?: boolean;
}

export const SERVICES: Service[] = [
  // A. Oil Change
  {
    id: "oil-change",
    name: "Oil Change – Labor Only",
    category: "A. Oil Change",
    minPrice: 60,
    maxPrice: 120,
    description: "Complete oil and filter change service",
    tooltip: "Includes labor for oil drain, filter replacement, and refill. Oil and filter parts sold separately if needed.",
    partsAvailable: true,
  },
  {
    id: "engine-oil-filter",
    name: "Engine Oil Filter",
    category: "A. Oil Change",
    minPrice: 20,
    maxPrice: 50,
    description: "Engine oil filter replacement",
    tooltip: "Includes labor for engine oil filter removal and installation. Filter part sold separately if needed.",
    partsAvailable: true,
  },
  {
    id: "cabin-air-filter",
    name: "Cabin Air Filter (Cabin / Engine Air Filter Service)",
    category: "A. Oil Change",
    minPrice: 40,
    maxPrice: 80,
    description: "Cabin air filter replacement",
    tooltip: "Includes labor for cabin air filter removal and installation. Filter part sold separately if needed.",
    partsAvailable: true,
  },
  {
    id: "fuel-filter",
    name: "Fuel Filter",
    category: "A. Oil Change",
    minPrice: 50,
    maxPrice: 100,
    description: "Fuel filter replacement",
    tooltip: "Includes labor for fuel filter removal and installation. Filter part sold separately if needed.",
    partsAvailable: true,
  },

  // B. Brake System
  {
    id: "front-pads",
    name: "Front Brake Pads Replacement (Labor Only)",
    category: "B. Brake System",
    minPrice: 120,
    maxPrice: 190,
    description: "Front brake pad replacement and rotor inspection",
    tooltip: "Includes pad removal, rotor cleaning/inspection, and installation of new pads. Rotors available separately if needed.",
    partsAvailable: true,
  },
  {
    id: "rear-pads",
    name: "Rear Brake Pads Replacement (Labor Only)",
    category: "B. Brake System",
    minPrice: 120,
    maxPrice: 190,
    description: "Rear brake pad replacement and rotor inspection",
    tooltip: "Complete rear pad service including rotor cleaning and brake system inspection",
    partsAvailable: true,
  },
  {
    id: "front-pads-rotors",
    name: "Front Pads + Rotors Replacement (Labor Only)",
    category: "B. Brake System",
    minPrice: 220,
    maxPrice: 350,
    description: "Front complete brake system service",
    tooltip: "Installation of new front brake pads and rotors with complete system inspection",
    partsAvailable: true,
  },
  {
    id: "rear-pads-rotors",
    name: "Rear Pads + Rotors Replacement (Labor Only)",
    category: "B. Brake System",
    minPrice: 220,
    maxPrice: 350,
    description: "Rear complete brake system service",
    tooltip: "Installation of new rear brake pads and rotors with complete system inspection",
    partsAvailable: true,
  },
  {
    id: "full-brake-service",
    name: "Full Brake Service - All 4 Wheels (Labor Only)",
    category: "B. Brake System",
    minPrice: 380,
    maxPrice: 600,
    description: "Complete front and rear brake system service",
    tooltip: "Comprehensive brake service: pads, rotors, and brake system flush with inspection on all 4 wheels",
    partsAvailable: true,
  },
  {
    id: "brake-fluid-flush",
    name: "Brake Fluid Flush & Fill (Labor Only)",
    category: "B. Brake System",
    minPrice: 120,
    maxPrice: 200,
    description: "Complete brake system fluid replacement",
    tooltip: "Removes old, degraded brake fluid and replaces with fresh fluid to maintain braking safety and performance",
    partsAvailable: true,
  },

  // C. Diagnostics
  {
    id: "obd2-diagnostic",
    name: "OBD2 Diagnostic (Labor Only)",
    category: "C. Diagnostics",
    minPrice: 90,
    maxPrice: 120,
    description: "Computer diagnostic scan and error code reading",
    tooltip: "Full OBD2 scanner reading to identify engine warning lights and fault codes",
    partsAvailable: false,
  },
  {
    id: "electrical-diagnostics",
    name: "Electrical / Wiring Diagnostics (Labor Only)",
    category: "C. Diagnostics",
    minPrice: 95,
    maxPrice: 145,
    description: "Advanced electrical system troubleshooting (per hour)",
    tooltip: "In-depth electrical system testing and diagnostics for charging, starting, and lighting issues",
    partsAvailable: true,
  },

  // D. AC Service
  {
    id: "ac-inspection",
    name: "A/C Inspection (Labor Only)",
    category: "D. AC Service",
    minPrice: 80,
    maxPrice: 120,
    description: "Complete A/C system inspection and diagnostics",
    tooltip: "Visual inspection of compressor, hoses, and basic functionality testing",
    partsAvailable: true,
  },
  {
    id: "ac-pressure-check",
    name: "A/C Pressure Check (Labor Only)",
    category: "D. AC Service",
    minPrice: 90,
    maxPrice: 140,
    description: "Diagnostic pressure measurement and system analysis",
    tooltip: "Measures current refrigerant pressure to identify undercharge or overcharge conditions",
    partsAvailable: true,
  },
  {
    id: "ac-vacuum-test",
    name: "A/C Vacuum Test (Labor Only)",
    category: "D. AC Service",
    minPrice: 120,
    maxPrice: 180,
    description: "Evacuation test for moisture and leaks",
    tooltip: "Performs deep vacuum of the system to remove moisture before recharge",
    partsAvailable: true,
  },
  {
    id: "ac-recharge-r134a",
    name: "A/C Recharge - R134a (Labor Only)",
    category: "D. AC Service",
    minPrice: 120,
    maxPrice: 180,
    description: "Standard refrigerant recharge",
    tooltip: "Refill with R134a refrigerant to restore cooling capacity",
    partsAvailable: true,
  },
  {
    id: "ac-recharge-r1234yf",
    name: "A/C Recharge - R1234yf (Labor Only)",
    category: "D. AC Service",
    minPrice: 150,
    maxPrice: 220,
    description: "Newer eco-friendly refrigerant recharge",
    tooltip: "High-efficiency, environmentally-friendly refrigerant for newer vehicles (2017+)",
    partsAvailable: true,
  },
  {
    id: "full-ac-service",
    name: "Full A/C Service (Labor Only)",
    category: "D. AC Service",
    minPrice: 280,
    maxPrice: 500,
    description: "Complete service including vacuum, test, and recharge",
    tooltip: "Comprehensive A/C service: system evacuation, pressure testing, and refrigerant recharge",
    partsAvailable: true,
  },
  {
    id: "ac-ozone-treatment",
    name: "A/C Ozone Treatment (Labor Only)",
    category: "D. AC Service",
    minPrice: 150,
    maxPrice: 250,
    description: "Ozone odor elimination treatment",
    tooltip: "Ozone generator treatment to eliminate mold, mildew, and odors from A/C system",
    partsAvailable: false,
  },
  {
    id: "ac-anti-mold-cleaning",
    name: "A/C Anti-Mold HVAC Cleaning (Labor Only)",
    category: "D. AC Service",
    minPrice: 180,
    maxPrice: 300,
    description: "Deep HVAC system cleaning and sanitization",
    tooltip: "Professional cleaning of evaporator coil and HVAC ducts to prevent mold growth",
    partsAvailable: true,
  },

  // E. Starter / Alternator
  {
    id: "starter-replacement",
    name: "Starter Replacement",
    category: "E. Starter / Alternator",
    minPrice: 180,
    maxPrice: 350,
  },
  {
    id: "alternator-replacement",
    name: "Alternator Replacement",
    category: "E. Starter / Alternator",
    minPrice: 180,
    maxPrice: 320,
  },

  // F. Spark Plugs / Ignition Coils
  {
    id: "spark-plugs",
    name: "Spark Plugs Replacement (Labor Only)",
    category: "F. Spark Plugs / Ignition Coils",
    minPrice: 120,
    maxPrice: 250,
    description: "Complete spark plug replacement service",
    tooltip: "Includes removal, inspection, and installation of new spark plugs. Gap setting and testing included.",
    partsAvailable: true,
  },
  {
    id: "ignition-coil",
    name: "Ignition Coil Replacement (Labor Only)",
    category: "F. Spark Plugs / Ignition Coils",
    minPrice: 25,
    maxPrice: 60,
    description: "Per cylinder - labor only",
    tooltip: "Replacement of faulty ignition coil(s) responsible for firing spark plugs",
    partsAvailable: true,
  },

  // G. Suspension / Control Arms
  {
    id: "control-arm",
    name: "Control Arm Replacement (per side)",
    category: "G. Suspension / Control Arms",
    minPrice: 150,
    maxPrice: 350,
  },
  {
    id: "ball-joint",
    name: "Ball Joint Replacement",
    category: "G. Suspension / Control Arms",
    minPrice: 120,
    maxPrice: 250,
  },
  {
    id: "tie-rod",
    name: "Tie Rod Replacement",
    category: "G. Suspension / Control Arms",
    minPrice: 90,
    maxPrice: 180,
  },
  {
    id: "sway-bar-link",
    name: "Sway Bar Link Replacement",
    category: "G. Suspension / Control Arms",
    minPrice: 80,
    maxPrice: 140,
  },

  // H. CV Axles / Half Shafts
  {
    id: "cv-axle-front",
    name: "CV Axle Replacement (front, per side)",
    category: "H. CV Axles / Half Shafts",
    minPrice: 180,
    maxPrice: 350,
  },
  {
    id: "cv-axle-rear",
    name: "CV Axle Replacement (rear, per side)",
    category: "H. CV Axles / Half Shafts",
    minPrice: 180,
    maxPrice: 350,
  },

  // I. Electrical / Lighting
  {
    id: "headlight-bulb",
    name: "Headlight Bulb Replacement",
    category: "I. Electrical / Lighting",
    minPrice: 40,
    maxPrice: 90,
  },
  {
    id: "tail-light-bulb",
    name: "Tail Light Bulb Replacement",
    category: "I. Electrical / Lighting",
    minPrice: 30,
    maxPrice: 70,
  },

  // J. Headlight Restoration / Polishing
  {
    id: "headlight-sanding",
    name: "Headlight Sanding + Polishing (Labor Only)",
    category: "J. Headlight Restoration / Polishing",
    minPrice: 70,
    maxPrice: 150,
    description: "Single headlight restoration - per light",
    tooltip: "Removes oxidation and clouding from headlight lens through wet sanding and professional polishing",
    partsAvailable: false,
  },
  {
    id: "full-headlight-restoration",
    name: "Full Headlight Restoration (Labor Only)",
    category: "J. Headlight Restoration / Polishing",
    minPrice: 140,
    maxPrice: 250,
    description: "Both headlights with multi-stage polishing and ceramic coating",
    tooltip: "Complete headlight restoration: deep cleaning, multi-stage sanding, polishing, and UV-protective ceramic sealant application",
    partsAvailable: false,
  },

  // K. Mobile Detailing
  {
    id: "exterior-wash-wax",
    name: "Exterior Wash + Wax",
    category: "K. Mobile Detailing",
    minPrice: 150,
    maxPrice: 500,
    description: "Custom pricing - photos required",
  },
  {
    id: "interior-deep-clean",
    name: "Interior Deep Clean",
    category: "K. Mobile Detailing",
    minPrice: 150,
    maxPrice: 500,
    description: "Custom pricing - photos required",
  },
  {
    id: "interior-shampoo",
    name: "Full Interior Shampoo",
    category: "K. Mobile Detailing",
    minPrice: 200,
    maxPrice: 600,
    description: "Custom pricing - photos required",
  },
  {
    id: "exterior-polish",
    name: "Full Exterior Polish",
    category: "K. Mobile Detailing",
    minPrice: 200,
    maxPrice: 600,
    description: "Custom pricing - photos required",
  },
  {
    id: "detailing-package",
    name: "Complete Mobile Detailing Package",
    category: "K. Mobile Detailing",
    minPrice: 400,
    maxPrice: 1200,
    description: "Custom pricing - photos required",
  },

  // L. Other Services
  {
    id: "service-call",
    name: "Service Call / Mobile Mechanic First Hour",
    category: "L. Other Services",
    minPrice: 90,
    maxPrice: 200,
    description: "starting at $90",
  },
  {
    id: "jump-start",
    name: "Jump Start / Boost",
    category: "L. Other Services",
    minPrice: 40,
    maxPrice: 70,
  },
  {
    id: "battery-replacement",
    name: "Battery Replacement",
    category: "L. Other Services",
    minPrice: 50,
    maxPrice: 120,
  },
  {
    id: "battery-test",
    name: "Battery / Alternator Test",
    category: "L. Other Services",
    minPrice: 40,
    maxPrice: 60,
  },

  // M. Valve Cover Gaskets / Spark Plug Tube Seals / Gasket Kits
  {
    id: "valve-cover-gasket",
    name: "Valve Cover Gasket Replacement",
    category: "M. Valve Cover Gaskets / Spark Plug Tube Seals / Gasket Kits",
    minPrice: 150,
    maxPrice: 700,
    description: "Price varies by make, model, access, engine layout",
  },
  {
    id: "valve-cover-spark-plug-seals",
    name: "Valve Cover Gasket + Spark Plug Tube Seals Replacement",
    category: "M. Valve Cover Gaskets / Spark Plug Tube Seals / Gasket Kits",
    minPrice: 200,
    maxPrice: 750,
    description: "Price varies by make, model, access, engine layout",
  },
  {
    id: "full-valve-kit",
    name: "Full Valve Cover Gasket Kit Installation",
    category: "M. Valve Cover Gaskets / Spark Plug Tube Seals / Gasket Kits",
    minPrice: 250,
    maxPrice: 800,
    description:
      "Includes cleaning, sealing, replacing gaskets, spark plug tube seals if applicable. Price varies by make, model, access, engine layout",
  },
];

export const SERVICE_CATEGORIES = Array.from(
  new Map(SERVICES.map((s) => [s.category, s.category])).values()
);
