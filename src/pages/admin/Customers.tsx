import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, MoreVertical, Eye, Edit, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddCustomerModal } from "@/components/admin/AddCustomerModal";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useRealtimeSubscription } from "@/hooks/use-realtime-subscription";
import { toast } from "sonner";

type Customer = Tables<"customers">;

interface CustomerWithRelations extends Customer {
  vehicles?: { count: number }[];
  work_orders?: { completed_at: string | null }[];
}

interface FilterState {
  search: string;
  status: "all" | "active" | "inactive";
  type: string;
  source: string;
}

const Customers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<CustomerWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "all",
    type: "all",
    source: "all",
  });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const PAGE_SIZE = 10;

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
  };

  const getLastService = (workOrders: any[] | undefined) => {
    if (!workOrders || workOrders.length === 0) return "Never";
    const completed = workOrders
      .filter((wo) => wo.completed_at)
      .sort((a, b) => new Date(b.completed_at!).getTime() - new Date(a.completed_at!).getTime());
    if (completed.length === 0) return "Never";
    return new Date(completed[0].completed_at!).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getVehicleInfo = (vehicles: any[] | undefined) => {
    if (!vehicles || vehicles.length === 0) return "No vehicles";
    const count = vehicles[0]?.count || 0;
    if (count === 0) return "No vehicles";
    if (count === 1) return "1 vehicle";
    return `${count} vehicles`;
  };

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from("customers")
        .select(
          `
          id,
          first_name,
          last_name,
          phone,
          email,
          customer_type,
          lead_source,
          is_active,
          created_at,
          vehicles:vehicles(count),
          work_orders:work_orders(completed_at)
        `,
          { count: "exact" }
        )
        .eq("is_active", filters.status !== "inactive");

      // Apply search filter
      if (filters.search) {
        const search = `%${filters.search}%`;
        query = query.or(
          `first_name.ilike.${search},last_name.ilike.${search},phone.ilike.${search},email.ilike.${search}`
        );
      }

      // Apply customer type filter
      if (filters.type && filters.type !== "all") {
        query = query.eq("customer_type", filters.type);
      }

      // Apply lead source filter
      if (filters.source && filters.source !== "all") {
        query = query.eq("lead_source", filters.source);
      }

      // Order by most recent
      query = query.order("created_at", { ascending: false });

      // Paginate
      query = query.range(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE - 1);

      const { data, error: fetchError, count } = await query;

      if (fetchError) throw fetchError;

      setCustomers(data as CustomerWithRelations[]);
      setTotalCount(count || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load customers");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [filters.search, filters.type, filters.source, filters.status]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Real-time subscription for new customers
  useRealtimeSubscription({
    event: "INSERT",
    table: "customers",
    onPayload: (payload) => {
      fetchCustomers();
      toast.success("New lead added", {
        duration: 3000,
        position: "top-right",
      });
    },
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDeleteCustomer = async (id: string) => {
    try {
      const { error } = await supabase.from("customers").update({ is_active: false }).eq("id", id);

      if (error) throw error;
      setCustomers(customers.filter((c) => c.id !== id));
      setActiveDropdown(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete customer");
    }
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const startIndex = currentPage * PAGE_SIZE + 1;
  const endIndex = Math.min((currentPage + 1) * PAGE_SIZE, totalCount);

  const customerTypeColors: Record<string, string> = {
    new: "bg-blue-500/20 text-blue-400",
    repeat: "bg-green-500/20 text-green-400",
    vip: "bg-orange-500/20 text-orange-400",
    problematic: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-foreground">Customers</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-rajdhani font-medium gap-2 glow-orange min-h-10 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Customer
        </Button>
      </div>

      {/* Add Customer Modal */}
      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchCustomers}
      />

      {/* Error State */}
      {error && (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <div className="flex-1">
              <p className="text-red-400 font-rajdhani">Error loading customers: {error}</p>
            </div>
            <Button
              onClick={fetchCustomers}
              variant="ghost"
              size="sm"
              className="text-orange-500 hover:text-orange-400"
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Filters Bar */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 bg-secondary text-foreground rounded-lg border border-border/30 focus:outline-none focus:border-primary font-rajdhani placeholder:text-muted-foreground text-sm"
            />
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-secondary text-foreground rounded-lg border border-border/30 focus:outline-none focus:border-primary font-rajdhani cursor-pointer text-sm min-h-10"
          >
            <option value="all">Status: All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Type Filter */}
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-secondary text-foreground rounded-lg border border-border/30 focus:outline-none focus:border-primary font-rajdhani cursor-pointer text-sm min-h-10"
          >
            <option value="all">Type: All</option>
            <option value="new">New</option>
            <option value="repeat">Repeat</option>
            <option value="vip">VIP</option>
            <option value="problematic">Problematic</option>
          </select>

          {/* Lead Source Filter */}
          <select
            value={filters.source}
            onChange={(e) => handleFilterChange("source", e.target.value)}
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-secondary text-foreground rounded-lg border border-border/30 focus:outline-none focus:border-primary font-rajdhani cursor-pointer text-sm min-h-10"
          >
            <option value="all">Source: All</option>
            <option value="google">Google</option>
            <option value="facebook">Facebook</option>
            <option value="referral">Referral</option>
            <option value="yelp">Yelp</option>
            <option value="instagram">Instagram</option>
            <option value="repeat">Repeat</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="ml-4 text-gray-400 font-rajdhani">Loading customers...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && customers.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-white mb-2 font-rajdhani">No customers yet</h3>
          <p className="text-gray-400 mb-6 font-rajdhani">Start by adding your first customer</p>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-rajdhani font-medium"
          >
            + Add Customer
          </Button>
        </div>
      )}

      {/* Customers Table */}
      {!loading && customers.length > 0 && (
        <>
          <Card className="border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead className="border-b border-border/30 bg-secondary/30 sticky top-0">
                  <tr>
                    <th className="text-left p-2 sm:p-3 md:p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Name
                    </th>
                    <th className="text-left p-2 sm:p-3 md:p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs hidden sm:table-cell">
                      Phone
                    </th>
                    <th className="text-left p-2 sm:p-3 md:p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs hidden md:table-cell">
                      Email
                    </th>
                    <th className="text-left p-2 sm:p-3 md:p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Type
                    </th>
                    <th className="text-left p-2 sm:p-3 md:p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs hidden lg:table-cell">
                      Vehicles
                    </th>
                    <th className="text-left p-2 sm:p-3 md:p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs hidden lg:table-cell">
                      Last Service
                    </th>
                    <th className="text-left p-2 sm:p-3 md:p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b border-border/30 hover:bg-secondary/20 transition-colors cursor-pointer"
                      onClick={() => navigate(`/admin/customers/${customer.id}`)}
                    >
                      <td className="p-2 sm:p-3 md:p-4 text-foreground font-rajdhani text-xs sm:text-sm font-medium">
                        {customer.first_name} {customer.last_name}
                      </td>
                      <td className="p-2 sm:p-3 md:p-4 text-muted-foreground text-xs hidden sm:table-cell font-rajdhani">
                        <a
                          href={`tel:${customer.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="hover:text-primary transition-colors"
                        >
                          {formatPhone(customer.phone)}
                        </a>
                      </td>
                      <td className="p-2 sm:p-3 md:p-4 text-muted-foreground text-xs hidden md:table-cell font-rajdhani">
                        {customer.email ? (
                          <a
                            href={`mailto:${customer.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-primary transition-colors"
                          >
                            {customer.email}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="p-2 sm:p-3 md:p-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-rajdhani font-medium ${
                            customerTypeColors[customer.customer_type] ||
                            "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {customer.customer_type.charAt(0).toUpperCase() +
                            customer.customer_type.slice(1)}
                        </span>
                      </td>
                      <td className="p-2 sm:p-3 md:p-4 text-muted-foreground text-xs hidden lg:table-cell font-rajdhani">
                        {getVehicleInfo(customer.vehicles)}
                      </td>
                      <td className="p-2 sm:p-3 md:p-4 text-muted-foreground text-xs hidden lg:table-cell font-rajdhani">
                        {getLastService(customer.work_orders)}
                      </td>
                      <td className="p-2 sm:p-3 md:p-4">
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdown(activeDropdown === customer.id ? null : customer.id);
                            }}
                            className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </button>

                          {/* Dropdown Menu */}
                          {activeDropdown === customer.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-secondary border border-border/30 rounded-lg shadow-lg z-50">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/admin/customers/${customer.id}`);
                                  setActiveDropdown(null);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-secondary-foreground/10 text-foreground font-rajdhani text-sm transition-colors border-b border-border/30"
                              >
                                <Eye className="w-4 h-4" />
                                View Details
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/admin/customers/${customer.id}/edit`);
                                  setActiveDropdown(null);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-secondary-foreground/10 text-foreground font-rajdhani text-sm transition-colors border-b border-border/30"
                              >
                                <Edit className="w-4 h-4" />
                                Edit Customer
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCustomer(customer.id);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-500/10 text-red-400 font-rajdhani text-sm transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete Customer
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground font-rajdhani text-sm">
              Showing {startIndex} to {endIndex} of {totalCount} customers
            </p>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                variant="outline"
                size="sm"
                className="border-border/30"
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  variant={currentPage === i ? "default" : "outline"}
                  size="sm"
                  className={
                    currentPage === i
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "border-border/30"
                  }
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                variant="outline"
                size="sm"
                className="border-border/30"
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Customers;
