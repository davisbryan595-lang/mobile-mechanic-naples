import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSubdomain } from "@/hooks/use-subdomain";

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

/**
 * ProtectedAdminRoute component ensures admin routes are only accessible on crm subdomain.
 * On main domain, users are redirected to home page.
 */
export const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const { isCrmDomain } = useSubdomain();

  // Allow access in development (localhost and dev server URLs)
  const isDevelopment = typeof window !== "undefined" && (
    window.location.hostname === "localhost" ||
    window.location.hostname.includes(".fly.dev") ||
    window.location.hostname.includes("127.0.0.1")
  );

  if (!isCrmDomain && !isDevelopment) {
    // Redirect to home if not on CRM subdomain and not in development
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
