import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, AlertCircle, Edit, Trash2, Plus, Phone, Mail, MapPin, CalendarDays } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { toast } from "sonner";

type Customer = Tables<"customers">;
type Vehicle = Tables<"vehicles">;
type WorkOrder = Tables<"work_orders">;

interface DetailedCustomer extends Customer {
  vehicles?: Vehicle[];
  work_orders?: WorkOrder[];
}

const CustomerDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [customer, setCustomer] = useState<DetailedCustomer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("customers")
          .select(
            `
            *,
            vehicles(*),
            work_orders(*)
          `
          )
          .eq("id", id)
          .single();

        if (fetchError) throw fetchError;

        setCustomer(data as DetailedCustomer);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load customer";
        setError(errorMessage);
        toast.error("Error loading customer", { description: errorMessage });
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this customer? This action cannot be undone.")) {
      return;
    }

    try {
      setDeleting(true);
      const { error: deleteError } = await supabase
        .from("customers")
        .update({ is_active: false })
        .eq("id", id);

      if (deleteError) throw deleteError;

      toast.success("Customer deleted", {
        description: `${customer?.first_name} ${customer?.last_name} has been removed.`,
      });

      navigate("/admin/dashboard");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete customer";
      setError(errorMessage);
      toast.error("Error deleting customer", { description: errorMessage });
    } finally {
      setDeleting(false);
    }
  };

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
  };

  const formatDate = (date: string | null | undefined) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const customerTypeColors: Record<string, string> = {
    new: "bg-blue-500/20 text-blue-400",
    repeat: "bg-green-500/20 text-green-400",
    vip: "bg-orange-500/20 text-orange-400",
    problematic: "bg-red-500/20 text-red-400",
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate("/admin/dashboard")}
            variant="outline"
            size="sm"
            className="border-border/30"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h2 className="text-3xl font-orbitron font-bold text-foreground">Customer Details</h2>
        </div>

        <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-8">
          <div className="flex items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <p className="text-gray-400 font-rajdhani">Loading customer details...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate("/admin/dashboard")}
            variant="outline"
            size="sm"
            className="border-border/30"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h2 className="text-3xl font-orbitron font-bold text-foreground">Customer Details</h2>
        </div>

        <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-400 font-rajdhani mb-4">Customer not found</p>
          <Button
            onClick={() => navigate("/admin/dashboard")}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Back to Customers
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/admin/dashboard")}
            variant="outline"
            size="sm"
            className="border-border/30"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-3xl font-orbitron font-bold text-foreground">
              {customer.first_name} {customer.last_name}
            </h2>
            <p className="text-muted-foreground font-rajdhani text-sm mt-1">
              Customer ID: {customer.id}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => navigate(`/admin/customers/${customer.id}/edit`)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-rajdhani gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-500 hover:bg-red-600 text-white font-rajdhani gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-400 font-rajdhani">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact & Location */}
          <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-orbitron font-bold text-white mb-4">Contact Information</h3>

            <div className="space-y-4">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm font-rajdhani">Phone</p>
                  <a
                    href={`tel:${customer.phone}`}
                    className="text-foreground font-rajdhani hover:text-orange-400 transition-colors"
                  >
                    {formatPhone(customer.phone)}
                  </a>
                </div>
              </div>

              {/* Email */}
              {customer.email && (
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-muted-foreground text-sm font-rajdhani">Email</p>
                    <a
                      href={`mailto:${customer.email}`}
                      className="text-foreground font-rajdhani hover:text-orange-400 transition-colors"
                    >
                      {customer.email}
                    </a>
                  </div>
                </div>
              )}

              {/* Address */}
              {(customer.service_address || customer.city || customer.state) && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-muted-foreground text-sm font-rajdhani">Address</p>
                    <p className="text-foreground font-rajdhani">
                      {customer.service_address && <>{customer.service_address}<br /></>}
                      {customer.city && `${customer.city}, `}
                      {customer.state} {customer.zip_code}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Vehicles */}
          <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-orbitron font-bold text-white">Vehicles</h3>
              <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-rajdhani font-medium">
                {customer.vehicles?.length || 0}
              </span>
            </div>

            {customer.vehicles && customer.vehicles.length > 0 ? (
              <div className="space-y-3">
                {customer.vehicles.map((vehicle, idx) => (
                  <div
                    key={vehicle.id}
                    className="bg-secondary/30 border border-border/30 rounded-lg p-4"
                  >
                    <p className="text-foreground font-rajdhani font-medium mb-2">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground font-rajdhani text-xs">VIN</p>
                        <p className="text-foreground font-rajdhani">{vehicle.vin || "—"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground font-rajdhani text-xs">License Plate</p>
                        <p className="text-foreground font-rajdhani">{vehicle.license_plate || "—"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground font-rajdhani text-xs">Color</p>
                        <p className="text-foreground font-rajdhani">{vehicle.color || "—"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground font-rajdhani text-xs">Mileage</p>
                        <p className="text-foreground font-rajdhani">
                          {vehicle.mileage ? `${vehicle.mileage.toLocaleString()} mi` : "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground font-rajdhani text-center py-4">No vehicles registered</p>
            )}
          </Card>

          {/* Service History */}
          <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-orbitron font-bold text-white">Service History</h3>
              <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-rajdhani font-medium">
                {customer.work_orders?.length || 0}
              </span>
            </div>

            {customer.work_orders && customer.work_orders.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {customer.work_orders
                  .sort((a, b) => new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime())
                  .map((order) => (
                    <div
                      key={order.id}
                      className="bg-secondary/30 border border-border/30 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-foreground font-rajdhani font-medium">{order.service_type || "Service"}</p>
                        {order.completed_at ? (
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-rajdhani font-medium">
                            Completed
                          </span>
                        ) : (
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-rajdhani font-medium">
                            In Progress
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground font-rajdhani text-xs">Date</p>
                          <p className="text-foreground font-rajdhani flex items-center gap-2">
                            <CalendarDays className="w-3 h-3 text-orange-500" />
                            {formatDate(order.created_at)}
                          </p>
                        </div>
                        {order.completed_at && (
                          <div>
                            <p className="text-muted-foreground font-rajdhani text-xs">Completed</p>
                            <p className="text-foreground font-rajdhani">{formatDate(order.completed_at)}</p>
                          </div>
                        )}
                      </div>

                      {order.notes && (
                        <div className="mt-2 pt-2 border-t border-border/30">
                          <p className="text-muted-foreground font-rajdhani text-xs mb-1">Notes</p>
                          <p className="text-foreground font-rajdhani text-sm">{order.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-muted-foreground font-rajdhani text-center py-4">No service history</p>
            )}
          </Card>
        </div>

        {/* Sidebar - Customer Info */}
        <div className="space-y-6">
          {/* Customer Type & Status */}
          <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-orbitron font-bold text-white mb-4">Customer Profile</h3>

            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm font-rajdhani mb-2">Type</p>
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-rajdhani font-medium ${
                    customerTypeColors[customer.customer_type] || "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {customer.customer_type.charAt(0).toUpperCase() + customer.customer_type.slice(1)}
                </span>
              </div>

              <div>
                <p className="text-muted-foreground text-sm font-rajdhani mb-2">Lead Source</p>
                <p className="text-foreground font-rajdhani">
                  {customer.lead_source
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground text-sm font-rajdhani mb-2">Status</p>
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-rajdhani font-medium ${
                    customer.is_active
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {customer.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="pt-2 border-t border-border/30">
                <p className="text-muted-foreground text-sm font-rajdhani mb-1">Created</p>
                <p className="text-foreground font-rajdhani text-sm">{formatDate(customer.created_at)}</p>
              </div>
            </div>
          </Card>

          {/* Tags */}
          {customer.tags && customer.tags.length > 0 && (
            <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-6">
              <h3 className="text-lg font-orbitron font-bold text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {customer.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-rajdhani font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* Notes */}
          {customer.notes && (
            <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-6">
              <h3 className="text-lg font-orbitron font-bold text-white mb-4">Notes</h3>
              <p className="text-foreground font-rajdhani text-sm">{customer.notes}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
