/**
 * Extract service type from a message using keyword matching
 * Returns the service ID if found, otherwise returns a generic service type
 */
export function extractServiceFromMessage(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Service type mapping with keywords to watch for
  const serviceKeywords: Record<string, string[]> = {
    "oil-change": ["oil change", "oil and filter", "oil service"],
    "engine-oil-filter": ["oil filter", "filter change", "air filter"],
    "front-pads": ["front brake", "front pads", "brake pads front"],
    "rear-pads": ["rear brake", "rear pads", "brake pads rear"],
    "full-brake-service": ["full brake", "all 4 wheel brake", "complete brake service"],
    "brake-fluid-flush": ["brake fluid", "fluid flush", "brake system flush"],
    "obd-computer-diagnostic": [
      "check engine light",
      "diagnostic",
      "error code",
      "obd scan",
      "computer scan",
    ],
    "ac-inspection": ["ac inspection", "air conditioning", "ac service", "a/c check"],
    "ac-recharge-r134a": ["ac recharge", "air conditioning recharge", "freon"],
    "starter-replacement": ["starter", "won't start", "no start"],
    "alternator-replacement": ["alternator", "charging system"],
    "spark-plugs": ["spark plug", "spark plugs"],
    "ignition-coil": ["ignition coil", "misfire"],
    "suspension": ["suspension", "control arm", "ball joint", "tie rod", "sway bar"],
    "cv-axle-front": ["cv axle", "half shaft", "front axle"],
    "headlight-sanding": [
      "headlight",
      "headlamp",
      "restoration",
      "cloudy headlight",
      "foggy headlight",
    ],
    "battery-replacement": ["battery", "dead battery", "battery replacement"],
    "jump-start": ["jump start", "boost", "boost start"],
    "maintenance": ["maintenance", "service", "checkup", "inspection"],
    "detailing-package": ["detailing", "wash", "detail", "clean"],
    "electrical-diagnostics": ["electrical", "electrical system", "wiring"],
  };

  // Check for matching keywords
  for (const [serviceId, keywords] of Object.entries(serviceKeywords)) {
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword)) {
        return serviceId;
      }
    }
  }

  // Default to service call if no specific service detected
  return "service-call";
}
