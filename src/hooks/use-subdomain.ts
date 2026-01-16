/**
 * Hook to detect if current domain is the CRM subdomain
 * Returns true if visiting crm.mobile-mechanicservices.com
 */
export const useSubdomain = () => {
  const getSubdomain = (): string | null => {
    if (typeof window === "undefined") return null;

    const hostname = window.location.hostname;
    const parts = hostname.split(".");

    // Extract subdomain
    // crm.mobile-mechanicservices.com -> "crm"
    // localhost -> null
    // mobile-mechanicservices.com -> null
    if (parts.length > 2) {
      return parts[0];
    }

    return null;
  };

  const subdomain = getSubdomain();
  const isCrmDomain = subdomain === "crm";

  return {
    subdomain,
    isCrmDomain,
    isMainDomain: subdomain === null,
  };
};
