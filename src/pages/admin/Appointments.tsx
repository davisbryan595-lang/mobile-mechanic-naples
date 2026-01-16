import { useState, useEffect, useCallback } from "react";
import { Plus, AlertTriangle, RefreshCw, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusSelect } from "@/components/ui/status-select";
import { supabase } from "@/integrations/supabase/client";
import { AddBookingModal } from "@/components/admin/AddBookingModal";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRealtimeSubscription } from "@/hooks/use-realtime-subscription";

interface BookingData {
  id: string;
  full_name: string;
  vehicle_make: string;
  vehicle_model: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
}

const STATUS_BADGES = {
  pending: "bg-yellow-500/20 text-yellow-400",
  confirmed: "bg-blue-500/20 text-blue-400",
  in_progress: "bg-orange-500/20 text-orange-400",
  completed: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
};

const STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const Appointments = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Fetch bookings
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      let query = supabase
        .from("bookings")
        .select("id, full_name, vehicle_make, vehicle_model, service_type, appointment_date, appointment_time, status");

      // Apply status filter
      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      // Apply date filter
      const today = new Date().toISOString().split("T")[0];
      switch (dateFilter) {
        case "today":
          query = query.eq("appointment_date", today);
          break;
        case "week":
          const weekEnd = new Date();
          weekEnd.setDate(weekEnd.getDate() + 7);
          query = query
            .gte("appointment_date", today)
            .lte("appointment_date", weekEnd.toISOString().split("T")[0]);
          break;
        case "next_week":
          const nextWeekStart = new Date();
          nextWeekStart.setDate(nextWeekStart.getDate() + 7);
          const nextWeekEnd = new Date(nextWeekStart);
          nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);
          query = query
            .gte("appointment_date", nextWeekStart.toISOString().split("T")[0])
            .lte("appointment_date", nextWeekEnd.toISOString().split("T")[0]);
          break;
      }

      // Apply search filter (search by name, vehicle, or service type)
      if (searchQuery.trim()) {
        const search = searchQuery.toLowerCase();
        const { data, error: fetchError } = await query.order("appointment_date", { ascending: true });

        if (fetchError) {
          if (fetchError.code !== "PGRST116") {
            console.error("Error fetching bookings:", fetchError.message || fetchError);
            throw fetchError;
          }
          setBookings([]);
          setLoading(false);
          return;
        }

        // Filter in memory for name, vehicle, service type
        const filtered = data?.filter(booking =>
          booking.full_name.toLowerCase().includes(search) ||
          `${booking.vehicle_make} ${booking.vehicle_model}`.toLowerCase().includes(search) ||
          booking.service_type.toLowerCase().includes(search)
        ) || [];

        setBookings(filtered);
        setLoading(false);
      } else {
        const { data, error: fetchError } = await query.order("appointment_date", { ascending: true });

        if (fetchError) {
          if (fetchError.code !== "PGRST116") {
            console.error("Error fetching bookings:", fetchError.message || fetchError);
            throw fetchError;
          }
          setBookings([]);
          setLoading(false);
          return;
        }

        setBookings(data || []);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err instanceof Error ? err.message : String(err));
      setError(true);
      setLoading(false);
    }
  }, [statusFilter, dateFilter, searchQuery]);

  // Fetch on filter changes
  useEffect(() => {
    setCurrentPage(1); // Reset to first page on filter change
    fetchBookings();
  }, [fetchBookings]);

  // Real-time subscriptions for appointments
  useRealtimeSubscription({
    event: "INSERT",
    table: "bookings",
    onPayload: () => {
      fetchBookings();
      toast.success("New appointment added", {
        duration: 3000,
        position: "top-right",
      });
    },
  });

  useRealtimeSubscription({
    event: "UPDATE",
    table: "bookings",
    onPayload: () => {
      fetchBookings();
      toast.info("Appointment updated", {
        duration: 3000,
        position: "top-right",
      });
    },
  });

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Booking deleted successfully");
      fetchBookings();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete booking";
      toast.error("Error deleting booking", { description: message });
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      toast.success("Booking updated successfully");
      fetchBookings();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update booking";
      toast.error("Error updating booking", { description: message });
    }
  };

  const formatAppointmentTime = (date: string, time: string) => {
    try {
      const dateObj = new Date(date);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      let dateStr = format(dateObj, "MMM d");
      if (dateObj.toDateString() === today.toDateString()) {
        dateStr = "Today";
      } else if (dateObj.toDateString() === tomorrow.toDateString()) {
        dateStr = "Tomorrow";
      }

      return `${dateStr}, ${time}`;
    } catch {
      return `${date}, ${time}`;
    }
  };

  // Pagination
  const paginatedBookings = bookings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(bookings.length / pageSize);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold text-foreground">
            Appointments
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-rajdhani mt-1">
            Manage and track all customer service appointments
          </p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-rajdhani font-medium gap-2 glow-orange min-h-10 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Booking
        </Button>
      </div>

      {/* Filters Bar */}
      <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Search */}
          <div>
            <label className="block text-xs font-rajdhani font-semibold text-muted-foreground uppercase mb-1.5 sm:mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Customer, vehicle, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-secondary border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani text-sm min-h-10"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs font-rajdhani font-semibold text-muted-foreground uppercase mb-1.5 sm:mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-secondary border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani text-sm cursor-pointer min-h-10"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-xs font-rajdhani font-semibold text-muted-foreground uppercase mb-1.5 sm:mb-2">
              Date Range
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-secondary border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani text-sm cursor-pointer min-h-10"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="next_week">Next Week</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Error State */}
      {error && (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 font-rajdhani flex-1">Failed to load appointments</p>
          <Button
            onClick={() => fetchBookings()}
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
          <p className="text-muted-foreground font-rajdhani">Loading appointments...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && bookings.length === 0 && (
        <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-12 text-center">
          <p className="text-muted-foreground font-rajdhani mb-4">
            No appointments found. Click the button below to get started.
          </p>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-rajdhani font-medium gap-2 glow-orange"
          >
            <Plus className="w-4 h-4" />
            Add Booking
          </Button>
        </Card>
      )}

      {/* Appointments Table */}
      {!loading && !error && bookings.length > 0 && (
        <>
          <Card className="border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border/30 bg-secondary/30">
                  <tr>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Customer
                    </th>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Vehicle
                    </th>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Service Type
                    </th>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Date & Time
                    </th>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Status
                    </th>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-border/30 hover:bg-secondary/20 transition-colors"
                    >
                      <td className="p-4 text-foreground font-rajdhani font-medium">
                        {booking.full_name}
                      </td>
                      <td className="p-4 text-muted-foreground text-xs md:text-sm font-rajdhani">
                        {booking.vehicle_make} {booking.vehicle_model}
                      </td>
                      <td className="p-4 text-muted-foreground text-xs md:text-sm font-rajdhani capitalize">
                        {booking.service_type.replace(/_/g, " ")}
                      </td>
                      <td className="p-4 text-muted-foreground text-xs md:text-sm font-rajdhani">
                        {formatAppointmentTime(booking.appointment_date, booking.appointment_time)}
                      </td>
                      <td className="p-4">
                        <StatusSelect
                          value={booking.status}
                          onValueChange={(newStatus) => handleStatusChange(booking.id, newStatus)}
                          statusType="booking"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="px-3 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg text-xs font-rajdhani font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-border/30 bg-secondary/20">
                <p className="text-sm text-muted-foreground font-rajdhani">
                  Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, bookings.length)} of {bookings.length} appointments
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
        </>
      )}

      {/* Add Booking Modal */}
      <AddBookingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => fetchBookings()}
      />
    </div>
  );
};

export default Appointments;
