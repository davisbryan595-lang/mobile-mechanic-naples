import { useState, useEffect } from "react";
import { AlertTriangle, RefreshCw, ChevronLeft, ChevronRight, CheckCircle, DollarSign, Calendar, User, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { toast } from "sonner";

interface HistoryEvent {
  id: string;
  timestamp: string;
  eventType: "work_order_completed" | "invoice_paid" | "appointment_scheduled" | "appointment_completed" | "customer_added";
  customerName: string;
  customerId: string;
  vehicleInfo: string;
  description: string;
  amount?: number;
  status: string;
  sourceTable: string;
}

const EVENT_TYPES = [
  { value: "all", label: "All Events" },
  { value: "work_order_completed", label: "Work Order Completed" },
  { value: "invoice_paid", label: "Invoice Paid" },
  { value: "appointment_scheduled", label: "Appointment Scheduled" },
  { value: "appointment_completed", label: "Appointment Completed" },
  { value: "customer_added", label: "Customer Added" },
];

const EVENT_COLORS = {
  work_order_completed: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  invoice_paid: "bg-green-500/20 text-green-400 border-green-500/30",
  appointment_scheduled: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  appointment_completed: "bg-green-500/20 text-green-400 border-green-500/30",
  customer_added: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const EVENT_LABELS = {
  work_order_completed: "Work Order Completed",
  invoice_paid: "Invoice Paid",
  appointment_scheduled: "Appointment Scheduled",
  appointment_completed: "Appointment Completed",
  customer_added: "Customer Added",
};

const EVENT_ICONS = {
  work_order_completed: Wrench,
  invoice_paid: DollarSign,
  appointment_scheduled: Calendar,
  appointment_completed: CheckCircle,
  customer_added: User,
};

const History = () => {
  const [events, setEvents] = useState<HistoryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);

  // Fetch all events from multiple tables
  const fetchHistory = async () => {
    setLoading(true);
    setError(false);
    try {
      const allEvents: HistoryEvent[] = [];

      // Fetch completed work orders
      const { data: workOrders, error: woError } = await supabase
        .from("work_orders")
        .select("id, customer_id, vehicle_id, service_type, description, status, completed_at")
        .eq("status", "completed")
        .not("completed_at", "is", null);

      if (!woError) {
        for (const order of workOrders || []) {
          const { data: customer } = await supabase
            .from("customers")
            .select("first_name, last_name")
            .eq("id", order.customer_id)
            .single();

          let vehicleInfo = "";
          if (order.vehicle_id) {
            const { data: vehicle } = await supabase
              .from("vehicles")
              .select("make, model, year")
              .eq("id", order.vehicle_id)
              .single();

            if (vehicle) {
              vehicleInfo = `${vehicle.make} ${vehicle.model} ${vehicle.year}`;
            }
          }

          allEvents.push({
            id: `wo-${order.id}`,
            timestamp: order.completed_at,
            eventType: "work_order_completed",
            customerName: customer ? `${customer.first_name} ${customer.last_name}` : "Unknown",
            customerId: order.customer_id,
            vehicleInfo,
            description: `${order.service_type.replace(/_/g, " ")} - ${order.description || "Work completed"}`,
            status: order.status,
            sourceTable: "work_orders",
          });
        }
      }

      // Fetch paid invoices
      const { data: invoices, error: invError } = await supabase
        .from("invoices")
        .select("id, customer_id, amount, status, paid_date")
        .eq("status", "paid")
        .not("paid_date", "is", null);

      if (!invError) {
        for (const invoice of invoices || []) {
          const { data: customer } = await supabase
            .from("customers")
            .select("first_name, last_name")
            .eq("id", invoice.customer_id)
            .single();

          allEvents.push({
            id: `inv-${invoice.id}`,
            timestamp: invoice.paid_date,
            eventType: "invoice_paid",
            customerName: customer ? `${customer.first_name} ${customer.last_name}` : "Unknown",
            customerId: invoice.customer_id,
            vehicleInfo: "",
            description: `Invoice paid - ${invoice.amount ? `$${parseFloat(invoice.amount.toString()).toFixed(2)}` : ""}`,
            amount: invoice.amount ? parseFloat(invoice.amount.toString()) : 0,
            status: invoice.status,
            sourceTable: "invoices",
          });
        }
      }

      // Fetch scheduled appointments
      const { data: appointments, error: aptError } = await supabase
        .from("bookings")
        .select("id, full_name, vehicle_make, vehicle_model, vehicle_year, service_type, status, created_at")
        .in("status", ["confirmed", "in_progress"]);

      if (!aptError) {
        for (const apt of appointments || []) {
          allEvents.push({
            id: `apt-${apt.id}`,
            timestamp: apt.created_at,
            eventType: "appointment_scheduled",
            customerName: apt.full_name,
            customerId: "",
            vehicleInfo: apt.vehicle_make && apt.vehicle_model ? `${apt.vehicle_make} ${apt.vehicle_model} ${apt.vehicle_year || ""}` : "",
            description: `${apt.service_type.replace(/_/g, " ")} appointment scheduled`,
            status: apt.status,
            sourceTable: "bookings",
          });
        }
      }

      // Fetch newly added customers
      const { data: customers, error: custError } = await supabase
        .from("customers")
        .select("id, first_name, last_name, created_at")
        .order("created_at", { ascending: false })
        .limit(50);

      if (!custError) {
        for (const customer of customers || []) {
          allEvents.push({
            id: `cust-${customer.id}`,
            timestamp: customer.created_at,
            eventType: "customer_added",
            customerName: `${customer.first_name} ${customer.last_name}`,
            customerId: customer.id,
            vehicleInfo: "",
            description: "New customer added to system",
            status: "active",
            sourceTable: "customers",
          });
        }
      }

      // Sort by timestamp descending (most recent first)
      allEvents.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      setEvents(allEvents);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching history:", err instanceof Error ? err.message : String(err));
      setError(true);
      setLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    setCurrentPage(1);
    fetchHistory();
  }, []);

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    // Event type filter
    if (eventTypeFilter !== "all" && event.eventType !== eventTypeFilter) {
      return false;
    }

    // Date filter
    const today = new Date();
    const eventDate = new Date(event.timestamp);

    if (dateFilter === "7days") {
      const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
      if (eventDate < sevenDaysAgo) return false;
    } else if (dateFilter === "30days") {
      const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
      if (eventDate < thirtyDaysAgo) return false;
    }

    // Search filter
    if (searchQuery.trim()) {
      const search = searchQuery.toLowerCase();
      return (
        event.customerName.toLowerCase().includes(search) ||
        event.vehicleInfo.toLowerCase().includes(search) ||
        event.description.toLowerCase().includes(search)
      );
    }

    return true;
  });

  // Pagination
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredEvents.length / pageSize);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-foreground">
          Service & Activity History
        </h2>
        <p className="text-muted-foreground font-rajdhani text-sm mt-1">
          Chronological log of work orders, invoices, appointments, and customer activity
        </p>
      </div>

      {/* Filters Bar */}
      <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-xs font-rajdhani font-semibold text-muted-foreground uppercase mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Customer, vehicle, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-secondary border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani text-sm"
            />
          </div>

          {/* Event Type Filter */}
          <div>
            <label className="block text-xs font-rajdhani font-semibold text-muted-foreground uppercase mb-2">
              Event Type
            </label>
            <select
              value={eventTypeFilter}
              onChange={(e) => setEventTypeFilter(e.target.value)}
              className="w-full px-4 py-2 bg-secondary border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani text-sm cursor-pointer"
            >
              {EVENT_TYPES.map(type => (
                <option key={type.value} value={type.value} className="bg-secondary text-white">
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-xs font-rajdhani font-semibold text-muted-foreground uppercase mb-2">
              Date Range
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 bg-secondary border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani text-sm cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
          </div>

          {/* Refresh Button */}
          <div className="flex items-end">
            <Button
              onClick={() => fetchHistory()}
              size="sm"
              variant="outline"
              className="w-full border-border/30 font-rajdhani"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </Card>

      {/* Error State */}
      {error && (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 font-rajdhani flex-1">Failed to load history</p>
          <Button
            onClick={() => fetchHistory()}
            size="sm"
            variant="outline"
            className="border-red-500 text-red-400 hover:bg-red-500/10"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-3"></div>
          <p className="text-muted-foreground font-rajdhani">Loading history...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredEvents.length === 0 && (
        <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-12 text-center">
          <p className="text-muted-foreground font-rajdhani mb-4">
            {searchQuery || eventTypeFilter !== "all" || dateFilter !== "all"
              ? "No events match your filters. Try adjusting your search criteria."
              : "No history recorded yet. As you complete work orders, pay invoices, or schedule appointments, activity will appear here."}
          </p>
        </Card>
      )}

      {/* History Timeline/Cards - Mobile View */}
      {!loading && !error && filteredEvents.length > 0 && (
        <>
          {/* Mobile Timeline View */}
          <div className="md:hidden space-y-4">
            {paginatedEvents.map((event) => {
              const IconComponent = EVENT_ICONS[event.eventType];
              return (
                <Card key={event.id} className="border-border/30 bg-card/50 backdrop-blur-sm p-4">
                  <div className="flex gap-4">
                    <div className={`flex-shrink-0 p-2 rounded-lg border ${EVENT_COLORS[event.eventType]}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-rajdhani font-semibold text-white text-sm">
                            {EVENT_LABELS[event.eventType]}
                          </p>
                          <p className="text-muted-foreground text-xs font-rajdhani">
                            {format(new Date(event.timestamp), "MMM d, yyyy h:mm a")}
                          </p>
                        </div>
                      </div>
                      <p className="text-foreground font-rajdhani text-sm font-medium mt-2">
                        {event.customerName}
                      </p>
                      {event.vehicleInfo && (
                        <p className="text-muted-foreground text-xs font-rajdhani">
                          {event.vehicleInfo}
                        </p>
                      )}
                      <p className="text-muted-foreground text-sm font-rajdhani mt-1">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Card className="border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border/30 bg-secondary/30">
                    <tr>
                      <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                        Date & Time
                      </th>
                      <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                        Event Type
                      </th>
                      <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                        Customer
                      </th>
                      <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                        Vehicle
                      </th>
                      <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                        Details
                      </th>
                      {/* Amount column for invoices */}
                      <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedEvents.map((event) => {
                      const IconComponent = EVENT_ICONS[event.eventType];
                      return (
                        <tr
                          key={event.id}
                          className="border-b border-border/30 hover:bg-secondary/20 transition-colors"
                        >
                          <td className="p-4 text-muted-foreground text-xs font-rajdhani whitespace-nowrap">
                            {format(new Date(event.timestamp), "MMM d, yyyy")}
                            <br />
                            <span className="text-xs">{format(new Date(event.timestamp), "h:mm a")}</span>
                          </td>
                          <td className="p-4">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-rajdhani font-medium border ${EVENT_COLORS[event.eventType]}`}>
                              <IconComponent className="w-3 h-3" />
                              {EVENT_LABELS[event.eventType]}
                            </div>
                          </td>
                          <td className="p-4 text-foreground font-rajdhani font-medium">
                            {event.customerId ? (
                              <button className="hover:text-orange-400 transition-colors">
                                {event.customerName}
                              </button>
                            ) : (
                              event.customerName
                            )}
                          </td>
                          <td className="p-4 text-muted-foreground text-sm font-rajdhani">
                            {event.vehicleInfo || "—"}
                          </td>
                          <td className="p-4 text-muted-foreground text-sm font-rajdhani">
                            {event.description}
                          </td>
                          <td className="p-4 text-right font-rajdhani font-semibold">
                            {event.amount ? `$${event.amount.toFixed(2)}` : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between p-4 border-t border-border/30 bg-secondary/20">
                  <p className="text-sm text-muted-foreground font-rajdhani">
                    Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredEvents.length)} of {filteredEvents.length} events
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      size="sm"
                      variant="outline"
                      className="border-border/30"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground font-rajdhani px-4 py-2">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      size="sm"
                      variant="outline"
                      className="border-border/30"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default History;
