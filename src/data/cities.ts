export interface CityPageConfig {
  id: string;
  name: string;
  slug: string;
  description: string;
  areas: string[];
}

export const cities: CityPageConfig[] = [
  {
    id: "fort-myers",
    name: "Fort Myers",
    slug: "fort-myers",
    description: "Professional mobile mechanic service serving Fort Myers and surrounding areas",
    areas: ["Fort Myers", "Lehigh Acres", "Estero"],
  },
  {
    id: "naples",
    name: "Naples",
    slug: "naples",
    description: "Expert mobile mechanic service in Naples, Bonita Springs, and nearby communities",
    areas: ["Naples", "Bonita Springs", "Golden Gate"],
  },
];

export const pageTypes = [
  { id: "home", label: "Home", path: "home-mechanic-service" },
  { id: "about", label: "About", path: "about-mechanic-service" },
  { id: "gallery", label: "Gallery", path: "gallery-mechanic-service" },
  { id: "services", label: "Services", path: "services" },
  { id: "contact", label: "Contact", path: "contact" },
];
