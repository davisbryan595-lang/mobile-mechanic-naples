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
    name: "Oil Change (labor only, without materials)",
    category: "A. Oil Change",
    minPrice: 60,
    maxPrice: 120,
    description: "Oil change labor only",
  },

  // B. Brake System
  {
    id: "front-pads",
    name: "Front Brake Pads Replacement",
    category: "B. Brake System",
    minPrice: 120,
    maxPrice: 190,
  },
  {
    id: "rear-pads",
    name: "Rear Brake Pads Replacement",
    category: "B. Brake System",
    minPrice: 120,
    maxPrice: 190,
  },
  {
    id: "front-pads-rotors",
    name: "Front Pads + Rotors Replacement",
    category: "B. Brake System",
    minPrice: 220,
    maxPrice: 350,
  },
  {
    id: "rear-pads-rotors",
    name: "Rear Pads + Rotors Replacement",
    category: "B. Brake System",
    minPrice: 220,
    maxPrice: 350,
  },
  {
    id: "full-brake-service",
    name: "Full Brake Service (all 4 wheels)",
    category: "B. Brake System",
    minPrice: 380,
    maxPrice: 600,
  },

  // C. Diagnostics
  {
    id: "obd2-diagnostic",
    name: "OBD2 Diagnostic (basic)",
    category: "C. Diagnostics",
    minPrice: 90,
    maxPrice: 120,
  },
  {
    id: "electrical-diagnostics",
    name: "Electrical / Wiring Diagnostics (hourly rate)",
    category: "C. Diagnostics",
    minPrice: 95,
    maxPrice: 145,
    description: "per hour",
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
    name: "Spark Plugs Replacement",
    category: "F. Spark Plugs / Ignition Coils",
    minPrice: 120,
    maxPrice: 250,
  },
  {
    id: "ignition-coil",
    name: "Ignition Coil Replacement (per cylinder)",
    category: "F. Spark Plugs / Ignition Coils",
    minPrice: 25,
    maxPrice: 60,
    description: "each",
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
    name: "Headlight Sanding + Polishing (1 light)",
    category: "J. Headlight Restoration / Polishing",
    minPrice: 70,
    maxPrice: 150,
    description: "starting at $70+",
  },
  {
    id: "full-headlight-restoration",
    name: "Full Headlight Restoration (both lights, multi-stage + ceramic)",
    category: "J. Headlight Restoration / Polishing",
    minPrice: 140,
    maxPrice: 250,
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
