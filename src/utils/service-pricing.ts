import { SERVICES } from "@/data/services";

/**
 * Get the default price for a service type based on the service catalog
 * Uses the average of minPrice and maxPrice
 */
export const getServicePrice = (serviceType: string): number => {
  // Normalize the service type (handle different formats)
  const normalizedType = serviceType.toLowerCase().replace(/\s+/g, "-");

  // Find matching service in the SERVICES catalog
  const service = SERVICES.find(s => 
    s.id.toLowerCase() === normalizedType || 
    s.name.toLowerCase().includes(normalizedType) ||
    normalizedType.includes(s.id.toLowerCase())
  );

  if (service) {
    // Return average of min and max price
    return Math.round((service.minPrice + service.maxPrice) / 2 * 100) / 100;
  }

  // Default fallback prices for common services if exact match not found
  const fallbackPrices: { [key: string]: number } = {
    "oil_change": 90,
    "oil-change": 90,
    "diagnostics": 120,
    "obd": 120,
    "brake": 255,
    "brake_job": 255,
    "suspension": 235,
    "ac": 390,
    "ac_service": 390,
    "electrical": 120,
    "battery": 85,
    "battery_replacement": 85,
    "starter": 265,
    "alternator": 250,
    "routine_maintenance": 100,
    "detailing": 400,
    "service_call": 145,
  };

  const key = Object.keys(fallbackPrices).find(k => 
    serviceType.toLowerCase().includes(k.toLowerCase())
  );

  return key ? fallbackPrices[key] : 150; // Default to $150 if nothing matches
};

/**
 * Get a human-readable service description for invoice line items
 */
export const getServiceDescription = (serviceType: string): string => {
  const normalizedType = serviceType.toLowerCase().replace(/\s+/g, "-");
  
  const service = SERVICES.find(s => 
    s.id.toLowerCase() === normalizedType || 
    s.name.toLowerCase().includes(normalizedType) ||
    normalizedType.includes(s.id.toLowerCase())
  );

  return service ? service.name : serviceType;
};
