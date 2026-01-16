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

  if (!isCrmDomain) {
    // Redirect to home if not on CRM subdomain
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
