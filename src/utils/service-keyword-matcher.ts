/**
 * Service Keyword Matcher
 * Extracts service type from customer messages by matching keywords
 */

interface Service {
  id: string;
  name: string;
  category: string;
}

// Keyword mapping for each service
const SERVICE_KEYWORDS: Record<string, string[]> = {
  "oil-change": ["oil change", "oil", "engine oil", "filter change"],
  "engine-oil-filter": ["oil filter", "engine filter"],
  "cabin-air-filter": ["cabin air filter", "cabin filter", "air filter"],
  "fuel-filter": ["fuel filter"],
  
  "front-pads": ["front brake", "front pads", "brake pad", "front brakes"],
  "rear-pads": ["rear brake", "rear pads", "rear brakes"],
  "front-pads-rotors": ["front rotors", "front pads rotors"],
  "rear-pads-rotors": ["rear rotors", "rear pads rotors"],
  "full-brake-service": ["full brake", "brake service", "brake system"],
  "brake-fluid-flush": ["brake fluid", "brake flush"],
  
  "obd-computer-diagnostic": ["obd", "diagnostic", "check engine", "error code", "computer", "scanner"],
  "electrical-diagnostics": ["electrical", "battery", "charging", "starting"],
  "wiring-electrical-troubleshooting": ["wiring", "electrical issue", "electrical problem"],
  "advanced-computer-diagnostics": ["module", "computer diagnostics"],
  "no-start-hard-start-diagnostics": ["no start", "won't start", "hard start", "won't turn on"],
  
  "ac-inspection": ["ac inspection", "air conditioning inspection", "ac check"],
  "ac-pressure-check": ["ac pressure", "pressure check"],
  "ac-vacuum-test": ["ac vacuum", "vacuum test"],
  "ac-recharge-r134a": ["ac recharge", "refrigerant", "r134a", "cooling"],
  "ac-recharge-r1234yf": ["r1234yf", "eco refrigerant"],
  "full-ac-service": ["full ac service", "full air conditioning"],
  "ac-ozone-treatment": ["ozone", "odor", "smell"],
  "ac-anti-mold-cleaning": ["mold", "mildew", "hvac cleaning"],
  
  "starter-replacement": ["starter", "won't start"],
  "alternator-replacement": ["alternator", "charging issue"],
  
  "spark-plugs": ["spark plug", "spark plugs", "ignition"],
  "ignition-coil": ["ignition coil", "coil pack"],
  
  "control-arm": ["control arm"],
  "ball-joint": ["ball joint"],
  "tie-rod": ["tie rod"],
  "sway-bar-link": ["sway bar", "sway bar link"],
  
  "cv-axle-front": ["cv axle", "front axle", "front cv"],
  "cv-axle-rear": ["rear axle", "rear cv"],
  
  "headlight-bulb": ["headlight", "headlight bulb", "light bulb"],
  "tail-light-bulb": ["tail light", "brake light"],
  
  "headlight-sanding": ["headlight restoration", "headlight polish", "cloudy headlight"],
  "full-headlight-restoration": ["full headlight restoration"],
  
  "exterior-wash-wax": ["wash wax", "wash and wax", "exterior wash", "wax"],
  "interior-deep-clean": ["interior clean", "deep clean", "detail"],
  "interior-shampoo": ["interior shampoo", "carpet clean"],
  "exterior-polish": ["exterior polish", "polish"],
  "detailing-package": ["detailing", "full detail", "complete detail"],
  
  "service-call": ["service call", "mobile mechanic", "first hour"],
  "jump-start": ["jump start", "boost", "dead battery"],
  "battery-replacement": ["battery replacement", "new battery"],
  "battery-test": ["battery test", "battery check"],
  
  "valve-cover-gasket": ["valve cover gasket", "gasket", "oil leak"],
  "valve-cover-spark-plug-seals": ["spark plug tube seal", "valve cover seal"],
  "full-valve-kit": ["valve cover kit"],
};

/**
 * Extracts the most likely service type from a customer message
 * @param message - Customer's message describing their service need
 * @returns Service ID if match found, null otherwise
 */
export function extractServiceFromMessage(message: string): string | null {
  if (!message || typeof message !== 'string') {
    return null;
  }

  const lowerMessage = message.toLowerCase();
  const scores: Record<string, number> = {};

  // Score each service based on keyword matches
  for (const [serviceId, keywords] of Object.entries(SERVICE_KEYWORDS)) {
    let serviceScore = 0;

    for (const keyword of keywords) {
      // Count occurrences of each keyword
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = lowerMessage.match(regex);
      if (matches) {
        // Higher weight for exact phrase matches
        serviceScore += matches.length * keyword.split(' ').length;
      }
    }

    if (serviceScore > 0) {
      scores[serviceId] = serviceScore;
    }
  }

  // Return service with highest score
  if (Object.keys(scores).length === 0) {
    return null;
  }

  const topService = Object.entries(scores).reduce((prev, current) => {
    return current[1] > prev[1] ? current : prev;
  });

  return topService[0];
}

/**
 * Gets human-readable service name from ID
 * Falls back to extracted message if no service found
 */
export function getServiceDisplayName(serviceId: string | null, fallbackMessage: string = "Service Request"): string {
  if (!serviceId) {
    return fallbackMessage;
  }

  // Map service IDs to readable names
  const serviceNames: Record<string, string> = {
    "oil-change": "Oil Change",
    "engine-oil-filter": "Engine Oil Filter",
    "cabin-air-filter": "Cabin Air Filter",
    "fuel-filter": "Fuel Filter",
    
    "front-pads": "Front Brake Pads",
    "rear-pads": "Rear Brake Pads",
    "front-pads-rotors": "Front Pads & Rotors",
    "rear-pads-rotors": "Rear Pads & Rotors",
    "full-brake-service": "Full Brake Service",
    "brake-fluid-flush": "Brake Fluid Flush",
    
    "obd-computer-diagnostic": "OBD Diagnostic",
    "electrical-diagnostics": "Electrical Diagnostics",
    "wiring-electrical-troubleshooting": "Electrical Troubleshooting",
    "advanced-computer-diagnostics": "Advanced Diagnostics",
    "no-start-hard-start-diagnostics": "No-Start Diagnostics",
    
    "ac-inspection": "A/C Inspection",
    "ac-pressure-check": "A/C Pressure Check",
    "ac-vacuum-test": "A/C Vacuum Test",
    "ac-recharge-r134a": "A/C Recharge R134a",
    "ac-recharge-r1234yf": "A/C Recharge R1234yf",
    "full-ac-service": "Full A/C Service",
    "ac-ozone-treatment": "A/C Ozone Treatment",
    "ac-anti-mold-cleaning": "A/C Anti-Mold Cleaning",
    
    "starter-replacement": "Starter Replacement",
    "alternator-replacement": "Alternator Replacement",
    
    "spark-plugs": "Spark Plugs",
    "ignition-coil": "Ignition Coil",
    
    "control-arm": "Control Arm",
    "ball-joint": "Ball Joint",
    "tie-rod": "Tie Rod",
    "sway-bar-link": "Sway Bar Link",
    
    "cv-axle-front": "Front CV Axle",
    "cv-axle-rear": "Rear CV Axle",
    
    "headlight-bulb": "Headlight Bulb",
    "tail-light-bulb": "Tail Light Bulb",
    
    "headlight-sanding": "Headlight Restoration",
    "full-headlight-restoration": "Full Headlight Restoration",
    
    "exterior-wash-wax": "Exterior Wash & Wax",
    "interior-deep-clean": "Interior Deep Clean",
    "interior-shampoo": "Interior Shampoo",
    "exterior-polish": "Exterior Polish",
    "detailing-package": "Complete Detailing",
    
    "service-call": "Service Call",
    "jump-start": "Jump Start",
    "battery-replacement": "Battery Replacement",
    "battery-test": "Battery Test",
    
    "valve-cover-gasket": "Valve Cover Gasket",
    "valve-cover-spark-plug-seals": "Valve Cover & Spark Plug Seals",
    "full-valve-kit": "Full Valve Kit",
  };

  return serviceNames[serviceId] || fallbackMessage;
}

/**
 * Example usage in a message:
 * const serviceId = extractServiceFromMessage("My car needs an oil change and new brake pads");
 * // Returns "oil-change" (highest scoring match)
 * 
 * const displayName = getServiceDisplayName(serviceId);
 * // Returns "Oil Change"
 */
