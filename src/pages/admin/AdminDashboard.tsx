import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, TrendingUp, AlertCircle, Users as UsersIcon, Plus, CheckCircle, AlertTriangle, RefreshCw, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SidebarAdmin } from "@/components/admin/SidebarAdmin";
import { adminAuth } from "@/utils/auth";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRealtimeSubscription } from "@/hooks/use-realtime-subscription";
import { getServicePrice, getServiceDescription } from "@/utils/service-pricing";
import Customers from "./Customers";
import Appointments from "./Appointments";
import Invoices from "./Invoices";
import History from "./History";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
}

interface AppointmentData {
  id: string;
  full_name: string;
  vehicle_make?: string;
  vehicle_model?: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
}

interface CustomerData {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  updated_at: string;
}

interface FormSubmissionData {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  vehicle_type?: string;
  preferred_date?: string;
  how_heard_about_us?: string;
  other_source?: string;
  created_at: string;
}

const StatsCard = ({ label, value, icon, bgColor }: StatsCardProps) => (
  <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-6 flex flex-col gap-4">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-muted-foreground text-sm font-rajdhani mb-2">{label}</p>
        <p className="text-2xl md:text-3xl font-orbitron font-bold text-foreground">{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${bgColor}`}>{icon}</div>
    </div>
  </Card>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  // Stats state
  const [stats, setStats] = useState({
    todayJobs: 0,
    weeklyRevenue: "$0",
    pendingPayments: "$0",
    totalCustomers: 0,
    loadingStats: true,
    statsError: false,
  });

  // Appointments state
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [appointmentsError, setAppointmentsError] = useState(false);

  // Customers state
  const [recentCustomers, setRecentCustomers] = useState<CustomerData[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [customersError, setCustomersError] = useState(false);

  // Form Submissions state
  const [formSubmissions, setFormSubmissions] = useState<FormSubmissionData[]>([]);
  const [loadingFormSubmissions, setLoadingFormSubmissions] = useState(true);
  const [formSubmissionsError, setFormSubmissionsError] = useState(false);

  // Work Orders state
  interface WorkOrderData {
    id: string;
    customer_id: string;
    vehicle_id: string | null;
    service_type: string;
    description: string | null;
    status: string;
    created_at: string;
  }

  interface WorkOrderWithDetails extends WorkOrderData {
    customer_name: string;
    vehicle_make?: string;
    vehicle_model?: string;
    vehicle_year?: number;
  }

  const [workOrders, setWorkOrders] = useState<WorkOrderWithDetails[]>([]);
  const [loadingWorkOrders, setLoadingWorkOrders] = useState(true);
  const [workOrdersError, setWorkOrdersError] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    if (!adminAuth.isAuthenticated()) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Function to update work order status
  const updateWorkOrderStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("work_orders")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      toast.success("Work order updated", {
        duration: 2000,
        position: "top-right",
      });

      // Refresh work orders list
      const fetchActiveWorkOrders = async () => {
        try {
          const { data, error } = await supabase
            .from("work_orders")
            .select("id, customer_id, vehicle_id, service_type, description, status, created_at")
            .neq("status", "completed")
            .order("created_at", { ascending: false })
            .limit(10);

          if (error) {
            if (error.code === "PGRST116") {
              setWorkOrders([]);
              return;
            }
            throw error;
          }

          // Fetch customer and vehicle info for each work order
          const ordersWithDetails: WorkOrderWithDetails[] = [];
          for (const order of data || []) {
            const { data: customerData } = await supabase
              .from("customers")
              .select("first_name, last_name")
              .eq("id", order.customer_id)
              .single();

            let vehicleInfo = {};
            if (order.vehicle_id) {
              const { data: vehicleData } = await supabase
                .from("vehicles")
                .select("make, model, year")
                .eq("id", order.vehicle_id)
                .single();

              if (vehicleData) {
                vehicleInfo = {
                  vehicle_make: vehicleData.make,
                  vehicle_model: vehicleData.model,
                  vehicle_year: vehicleData.year,
                };
              }
            }

            ordersWithDetails.push({
              ...order,
              customer_name: customerData ? `${customerData.first_name} ${customerData.last_name}` : "Unknown",
              ...vehicleInfo,
            });
          }

          setWorkOrders(ordersWithDetails);
        } catch (error) {
          console.error("Error fetching work orders:", error instanceof Error ? error.message : String(error));
        }
      };

      fetchActiveWorkOrders();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update work order";
      toast.error("Error updating work order", {
        description: message,
        duration: 3000,
        position: "top-right",
      });
    }
  };

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      setStats(prev => ({ ...prev, loadingStats: true, statsError: false }));
      try {
        // Today's jobs - count bookings for today
        const today = new Date().toISOString().split("T")[0];
        const { count: todayCount, error: todayError } = await supabase
          .from("bookings")
          .select("*", { count: "exact", head: true })
          .eq("appointment_date", today);

        // If table doesn't exist, todayCount will be null - that's OK
        const jobsCount = todayError?.code === "PGRST116" ? 0 : (todayCount || 0);

        // Total customers
        const { count: customerCount, error: customerError } = await supabase
          .from("customers")
          .select("*", { count: "exact", head: true })
          .eq("is_active", true);

        if (customerError && customerError.code !== "PGRST116") {
          console.error("Error fetching customer count:", customerError.message || customerError);
          throw customerError;
        }

        // Weekly Revenue - sum of invoices from the past 7 days
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weekAgoDate = weekAgo.toISOString().split("T")[0];

        const { data: weeklyInvoices, error: weeklyError } = await supabase
          .from("invoices")
          .select("amount")
          .gte("issued_date", weekAgoDate);

        let weeklyRevenue = "$0";
        if (!weeklyError || weeklyError.code === "PGRST116") {
          const total = weeklyInvoices?.reduce((sum, inv) => sum + (inv.amount || 0), 0) || 0;
          weeklyRevenue = `$${total.toFixed(2)}`;
        }

        // Pending Payments - sum of invoices with status 'pending'
        const { data: pendingInvoices, error: pendingError } = await supabase
          .from("invoices")
          .select("amount")
          .eq("status", "pending");

        let pendingPayments = "$0";
        if (!pendingError || pendingError.code === "PGRST116") {
          const total = pendingInvoices?.reduce((sum, inv) => sum + (inv.amount || 0), 0) || 0;
          pendingPayments = `$${total.toFixed(2)}`;
        }

        setStats({
          todayJobs: jobsCount,
          weeklyRevenue: weeklyRevenue,
          pendingPayments: pendingPayments,
          totalCustomers: customerCount || 0,
          loadingStats: false,
          statsError: false,
        });
      } catch (error) {
        console.error("Error fetching stats:", error instanceof Error ? error.message : String(error));
        setStats(prev => ({ ...prev, loadingStats: false, statsError: true }));
      }
    };

    fetchStats();
  }, []);

  // Fetch upcoming appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoadingAppointments(true);
      setAppointmentsError(false);
      try {
        const { data, error } = await supabase
          .from("bookings")
          .select("id, full_name, vehicle_make, vehicle_model, service_type, appointment_date, appointment_time, status")
          .gte("appointment_date", new Date().toISOString().split("T")[0])
          .order("appointment_date", { ascending: true })
          .limit(10);

        // Handle errors - if table doesn't exist, just show empty state
        if (error) {
          // PGRST116 = relation does not exist, which is OK - just show empty
          if (error.code === "PGRST116") {
            setAppointments([]);
            setLoadingAppointments(false);
            return;
          }
          // For other errors, log and show error state
          console.error("Error fetching appointments:", error.message || error);
          setAppointmentsError(true);
          setLoadingAppointments(false);
          return;
        }

        setAppointments(data || []);
        setLoadingAppointments(false);
      } catch (error) {
        console.error("Error fetching appointments:", error instanceof Error ? error.message : String(error));
        setAppointmentsError(true);
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, []);

  // Fetch recent customers
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoadingCustomers(true);
      setCustomersError(false);
      try {
        const { data, error } = await supabase
          .from("customers")
          .select("id, first_name, last_name, phone, email, updated_at")
          .eq("is_active", true)
          .order("updated_at", { ascending: false })
          .limit(10);

        // If table doesn't exist, just show empty
        if (error) {
          if (error.code === "PGRST116") {
            setRecentCustomers([]);
            setLoadingCustomers(false);
            return;
          }
          console.error("Error fetching customers:", error.message || error);
          setCustomersError(true);
          setLoadingCustomers(false);
          return;
        }

        setRecentCustomers(data || []);
        setLoadingCustomers(false);
      } catch (error) {
        console.error("Error fetching customers:", error instanceof Error ? error.message : String(error));
        setCustomersError(true);
        setLoadingCustomers(false);
      }
    };

    fetchCustomers();
  }, []);

  // Fetch form submissions
  useEffect(() => {
    const fetchFormSubmissions = async () => {
      setLoadingFormSubmissions(true);
      setFormSubmissionsError(false);
      try {
        const { data, error } = await supabase
          .from("form_submissions")
          .select("id, name, email, phone, address, message, vehicle_type, preferred_date, how_heard_about_us, other_source, created_at")
          .order("created_at", { ascending: false })
          .limit(50);

        if (error) {
          console.error("Error fetching form submissions:", error.message || error);
          setFormSubmissionsError(true);
          setLoadingFormSubmissions(false);
          return;
        }

        setFormSubmissions(data || []);
        setLoadingFormSubmissions(false);
      } catch (error) {
        console.error("Error fetching form submissions:", error instanceof Error ? error.message : String(error));
        setFormSubmissionsError(true);
        setLoadingFormSubmissions(false);
      }
    };

    fetchFormSubmissions();
  }, []);

  // Fetch active work orders
  useEffect(() => {
    const fetchWorkOrders = async () => {
      setLoadingWorkOrders(true);
      setWorkOrdersError(false);
      try {
        const { data, error } = await supabase
          .from("work_orders")
          .select("id, customer_id, vehicle_id, service_type, description, status, created_at")
          .neq("status", "completed")
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) {
          if (error.code === "PGRST116") {
            setWorkOrders([]);
            setLoadingWorkOrders(false);
            return;
          }
          console.error("Error fetching work orders:", error.message || error);
          setWorkOrdersError(true);
          setLoadingWorkOrders(false);
          return;
        }

        // Fetch customer and vehicle info for each work order
        const ordersWithDetails: WorkOrderWithDetails[] = [];
        for (const order of data || []) {
          const { data: customerData } = await supabase
            .from("customers")
            .select("first_name, last_name")
            .eq("id", order.customer_id)
            .single();

          let vehicleInfo = {};
          if (order.vehicle_id) {
            const { data: vehicleData } = await supabase
              .from("vehicles")
              .select("make, model, year")
              .eq("id", order.vehicle_id)
              .single();

            if (vehicleData) {
              vehicleInfo = {
                vehicle_make: vehicleData.make,
                vehicle_model: vehicleData.model,
                vehicle_year: vehicleData.year,
              };
            }
          }

          ordersWithDetails.push({
            ...order,
            customer_name: customerData ? `${customerData.first_name} ${customerData.last_name}` : "Unknown",
            ...vehicleInfo,
          });
        }

        setWorkOrders(ordersWithDetails);
        setLoadingWorkOrders(false);
      } catch (error) {
        console.error("Error fetching work orders:", error instanceof Error ? error.message : String(error));
        setWorkOrdersError(true);
        setLoadingWorkOrders(false);
      }
    };

    fetchWorkOrders();
  }, []);

  // Real-time subscriptions for overview dashboard
  useRealtimeSubscription({
    event: "INSERT",
    table: "customers",
    onPayload: () => {
      setStats(prev => ({
        ...prev,
        totalCustomers: (prev.totalCustomers || 0) + 1,
      }));
      // Refresh recent customers
      const fetchRecentCustomers = async () => {
        try {
          const { data, error } = await supabase
            .from("customers")
            .select("id, first_name, last_name, phone, email, updated_at")
            .eq("is_active", true)
            .order("updated_at", { ascending: false })
            .limit(10);

          if (error && error.code !== "PGRST116") {
            throw error;
          }

          setRecentCustomers(data || []);
        } catch (error) {
          console.error("Error fetching recent customers:", error instanceof Error ? error.message : String(error));
        }
      };

      fetchRecentCustomers();
      toast.success("New lead added", {
        duration: 3000,
        position: "top-right",
      });
    },
  });

  useRealtimeSubscription({
    event: "INSERT",
    table: "work_orders",
    onPayload: () => {
      const fetchPendingWorkOrders = async () => {
        try {
          const { data, error } = await supabase
            .from("work_orders")
            .select("id, customer_id, vehicle_id, service_type, description, status, created_at")
            .neq("status", "completed")
            .order("created_at", { ascending: false })
            .limit(10);

          if (error) {
            if (error.code === "PGRST116") {
              setWorkOrders([]);
              return;
            }
            throw error;
          }

          const ordersWithDetails: WorkOrderWithDetails[] = [];
          for (const order of data || []) {
            const { data: customerData } = await supabase
              .from("customers")
              .select("first_name, last_name")
              .eq("id", order.customer_id)
              .single();

            let vehicleInfo = {};
            if (order.vehicle_id) {
              const { data: vehicleData } = await supabase
                .from("vehicles")
                .select("make, model, year")
                .eq("id", order.vehicle_id)
                .single();

              if (vehicleData) {
                vehicleInfo = {
                  vehicle_make: vehicleData.make,
                  vehicle_model: vehicleData.model,
                  vehicle_year: vehicleData.year,
                };
              }
            }

            ordersWithDetails.push({
              ...order,
              customer_name: customerData ? `${customerData.first_name} ${customerData.last_name}` : "Unknown",
              ...vehicleInfo,
            });
          }

          setWorkOrders(ordersWithDetails);
        } catch (error) {
          console.error("Error fetching work orders:", error instanceof Error ? error.message : String(error));
        }
      };

      fetchPendingWorkOrders();
      toast.success("New pending job added", {
        duration: 3000,
        position: "top-right",
      });
    },
  });

  useRealtimeSubscription({
    event: "UPDATE",
    table: "work_orders",
    onPayload: () => {
      const fetchPendingWorkOrders = async () => {
        try {
          const { data, error } = await supabase
            .from("work_orders")
            .select("id, customer_id, vehicle_id, service_type, description, status, created_at")
            .neq("status", "completed")
            .order("created_at", { ascending: false })
            .limit(10);

          if (error) {
            if (error.code === "PGRST116") {
              setWorkOrders([]);
              return;
            }
            throw error;
          }

          const ordersWithDetails: WorkOrderWithDetails[] = [];
          for (const order of data || []) {
            const { data: customerData } = await supabase
              .from("customers")
              .select("first_name, last_name")
              .eq("id", order.customer_id)
              .single();

            let vehicleInfo = {};
            if (order.vehicle_id) {
              const { data: vehicleData } = await supabase
                .from("vehicles")
                .select("make, model, year")
                .eq("id", order.vehicle_id)
                .single();

              if (vehicleData) {
                vehicleInfo = {
                  vehicle_make: vehicleData.make,
                  vehicle_model: vehicleData.model,
                  vehicle_year: vehicleData.year,
                };
              }
            }

            ordersWithDetails.push({
              ...order,
              customer_name: customerData ? `${customerData.first_name} ${customerData.last_name}` : "Unknown",
              ...vehicleInfo,
            });
          }

          setWorkOrders(ordersWithDetails);
        } catch (error) {
          console.error("Error fetching work orders:", error instanceof Error ? error.message : String(error));
        }
      };

      fetchPendingWorkOrders();
      toast.info("Pending job updated", {
        duration: 3000,
        position: "top-right",
      });
    },
  });

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
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

  const getStatusBadgeColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "scheduled":
        return "bg-blue-500/20 text-blue-400";
      case "in_progress":
      case "in progress":
        return "bg-primary/20 text-primary";
      case "completed":
        return "bg-green-500/20 text-green-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-amber-500/20 text-amber-400";
    }
  };

  const renderFormSubmissions = () => (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-foreground mb-2">
          Form Submissions
        </h2>
        <p className="text-muted-foreground font-rajdhani">
          All customer inquiries from your website contact form
        </p>
      </div>

      <Card className="border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden">
        {loadingFormSubmissions && (
          <div className="p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
            <p className="text-muted-foreground font-rajdhani text-sm">Loading submissions...</p>
          </div>
        )}

        {formSubmissionsError && (
          <div className="p-6">
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-red-400 font-rajdhani text-sm">Failed to load form submissions</p>
            </div>
          </div>
        )}

        {!loadingFormSubmissions && !formSubmissionsError && formSubmissions.length === 0 && (
          <div className="p-8 text-center">
            <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground font-rajdhani">
              No form submissions yet. They will appear here when customers submit the contact form.
            </p>
          </div>
        )}

        {!loadingFormSubmissions && !formSubmissionsError && formSubmissions.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border/30 bg-secondary/30 sticky top-0">
                <tr>
                  <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                    Name
                  </th>
                  <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                    Email
                  </th>
                  <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                    Phone
                  </th>
                  <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                    Vehicle
                  </th>
                  <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                    Address
                  </th>
                  <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                    Date
                  </th>
                  <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody>
                {formSubmissions.map((submission) => (
                  <tr
                    key={submission.id}
                    className="border-b border-border/30 hover:bg-secondary/20 transition-colors"
                  >
                    <td className="p-4 text-foreground font-rajdhani font-medium">{submission.name}</td>
                    <td className="p-4 text-primary text-sm font-rajdhani">
                      <a href={`mailto:${submission.email}`} className="hover:underline">
                        {submission.email}
                      </a>
                    </td>
                    <td className="p-4 text-muted-foreground text-sm font-rajdhani">
                      <a href={`tel:${submission.phone}`} className="hover:text-primary transition-colors">
                        {submission.phone}
                      </a>
                    </td>
                    <td className="p-4 text-muted-foreground text-sm font-rajdhani">
                      {submission.vehicle_type || "—"}
                    </td>
                    <td className="p-4 text-muted-foreground text-sm font-rajdhani max-w-xs truncate">
                      {submission.address}
                    </td>
                    <td className="p-4 text-muted-foreground text-xs md:text-sm font-rajdhani">
                      {format(new Date(submission.created_at), "MMM d, yyyy")}
                    </td>
                    <td className="p-4 text-muted-foreground text-sm font-rajdhani max-w-xs truncate">
                      {submission.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-foreground mb-2">
          Welcome back, Bryan
        </h2>
        <p className="text-muted-foreground font-rajdhani">
          Mobile Mechanic CRM – Your dashboard overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Today's Jobs"
          value={stats.loadingStats ? "—" : stats.todayJobs}
          icon={<Clock className="w-6 h-6 text-primary" />}
          bgColor="bg-primary/20"
        />
        <StatsCard
          label="Weekly Revenue"
          value={stats.loadingStats ? "—" : stats.weeklyRevenue}
          icon={<TrendingUp className="w-6 h-6 text-emerald-500" />}
          bgColor="bg-emerald-500/20"
        />
        <StatsCard
          label="Pending Payments"
          value={stats.loadingStats ? "—" : stats.pendingPayments}
          icon={<AlertCircle className="w-6 h-6 text-amber-500" />}
          bgColor="bg-amber-500/20"
        />
        <StatsCard
          label="Total Customers"
          value={stats.loadingStats ? "—" : stats.totalCustomers}
          icon={<UsersIcon className="w-6 h-6 text-blue-500" />}
          bgColor="bg-blue-500/20"
        />
      </div>

      {/* Error State for Stats */}
      {stats.statsError && (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 font-rajdhani flex-1">Failed to load statistics</p>
          <Button
            onClick={() => window.location.reload()}
            size="sm"
            variant="outline"
            className="border-red-500 text-red-400 hover:bg-red-500/10"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Appointments */}
        <Card className="border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-border/30">
            <h3 className="text-xl font-orbitron font-bold text-foreground">
              Upcoming Appointments
            </h3>
          </div>

          {loadingAppointments && (
            <div className="p-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
              <p className="text-muted-foreground font-rajdhani text-sm">Loading appointments...</p>
            </div>
          )}

          {appointmentsError && (
            <div className="p-6">
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-red-400 font-rajdhani text-sm">Failed to load appointments</p>
              </div>
            </div>
          )}

          {!loadingAppointments && !appointmentsError && appointments.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground font-rajdhani">
                No appointments scheduled yet. Start adding bookings to track customer services.
              </p>
            </div>
          )}

          {!loadingAppointments && !appointmentsError && appointments.length > 0 && (
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
                      Service
                    </th>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Time
                    </th>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt) => (
                    <tr
                      key={apt.id}
                      className="border-b border-border/30 hover:bg-secondary/20 transition-colors"
                    >
                      <td className="p-4 text-foreground font-rajdhani">{apt.full_name}</td>
                      <td className="p-4 text-muted-foreground text-xs md:text-sm font-rajdhani">
                        {apt.vehicle_make && apt.vehicle_model
                          ? `${apt.vehicle_make} ${apt.vehicle_model}`
                          : "—"}
                      </td>
                      <td className="p-4 text-muted-foreground text-xs md:text-sm font-rajdhani">
                        {apt.service_type}
                      </td>
                      <td className="p-4 text-muted-foreground text-xs md:text-sm font-rajdhani">
                        {formatAppointmentTime(apt.appointment_date, apt.appointment_time)}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-rajdhani font-medium ${getStatusBadgeColor(
                            apt.status
                          )}`}
                        >
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Recent Customers */}
        <Card className="border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-border/30">
            <h3 className="text-xl font-orbitron font-bold text-foreground">Recent Customers</h3>
          </div>

          {loadingCustomers && (
            <div className="p-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
              <p className="text-muted-foreground font-rajdhani text-sm">Loading customers...</p>
            </div>
          )}

          {customersError && (
            <div className="p-6">
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-red-400 font-rajdhani text-sm">Failed to load customers</p>
              </div>
            </div>
          )}

          {!loadingCustomers && !customersError && recentCustomers.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground font-rajdhani">
                No customers yet. Add your first customer to get started.
              </p>
            </div>
          )}

          {!loadingCustomers && !customersError && recentCustomers.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border/30 bg-secondary/30">
                  <tr>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Name
                    </th>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Phone
                    </th>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Email
                    </th>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Added
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b border-border/30 hover:bg-secondary/20 transition-colors"
                    >
                      <td className="p-4 text-foreground font-rajdhani">
                        {customer.first_name} {customer.last_name}
                      </td>
                      <td className="p-4 text-muted-foreground text-sm font-rajdhani">
                        <a
                          href={`tel:${customer.phone}`}
                          className="hover:text-primary transition-colors"
                        >
                          {formatPhone(customer.phone)}
                        </a>
                      </td>
                      <td className="p-4 text-muted-foreground text-sm font-rajdhani">
                        {customer.email ? (
                          <a
                            href={`mailto:${customer.email}`}
                            className="hover:text-primary transition-colors"
                          >
                            {customer.email}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="p-4 text-muted-foreground text-xs md:text-sm font-rajdhani">
                        {format(new Date(customer.updated_at), "MMM d")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Pending Jobs / Upcoming Work */}
        <Card className="border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-border/30 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-orbitron font-bold text-foreground">
                Pending Jobs & Work Orders
              </h3>
              <p className="text-xs text-muted-foreground font-rajdhani mt-1">
                Active and upcoming work - click status to update
              </p>
            </div>
            <Button
              onClick={() => alert("Work Order form coming soon")}
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 text-white font-rajdhani font-medium gap-1"
            >
              <Plus className="w-4 h-4" />
              New
            </Button>
          </div>

          {loadingWorkOrders && (
            <div className="p-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
              <p className="text-muted-foreground font-rajdhani text-sm">Loading work orders...</p>
            </div>
          )}

          {workOrdersError && (
            <div className="p-6">
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-red-400 font-rajdhani text-sm">Failed to load work orders</p>
              </div>
            </div>
          )}

          {!loadingWorkOrders && !workOrdersError && workOrders.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground font-rajdhani mb-3">
                No active work orders yet. Click the button above to get started.
              </p>
            </div>
          )}

          {!loadingWorkOrders && !workOrdersError && workOrders.length > 0 && (
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
                      Service
                    </th>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {workOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border/30 hover:bg-secondary/20 transition-colors"
                    >
                      <td className="p-4 text-foreground font-rajdhani text-sm">
                        {order.customer_name}
                      </td>
                      <td className="p-4 text-muted-foreground text-xs md:text-sm font-rajdhani">
                        {order.vehicle_make && order.vehicle_model
                          ? `${order.vehicle_make} ${order.vehicle_model} ${order.vehicle_year || ""}`
                          : "—"}
                      </td>
                      <td className="p-4 text-muted-foreground text-xs md:text-sm font-rajdhani capitalize">
                        {order.service_type.replace(/_/g, " ")}
                      </td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateWorkOrderStatus(order.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-rajdhani font-medium border-0 focus:outline-none cursor-pointer ${
                            order.status === "pending"
                              ? "bg-blue-500/20 text-blue-400"
                              : order.status === "in_progress"
                              ? "bg-orange-500/20 text-orange-400"
                              : order.status === "completed"
                              ? "bg-green-500/20 text-green-400"
                              : order.status === "cancelled"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Action Buttons Section */}
      <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-6">
        <h3 className="text-lg font-orbitron font-bold text-foreground mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => alert("Booking form coming soon")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani font-medium gap-2 glow-orange"
          >
            <Plus className="w-4 h-4" />
            Add Booking
          </Button>
          <Button
            onClick={() => alert("Select a job first")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-rajdhani font-medium gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Mark Complete
          </Button>
          <Button
            variant="outline"
            className="border-border/50 text-foreground hover:bg-secondary/50 font-rajdhani font-medium"
            onClick={() => setActiveSection("appointments")}
          >
            View All Appointments
          </Button>
          <Button
            variant="outline"
            className="border-border/50 text-foreground hover:bg-secondary/50 font-rajdhani font-medium"
            onClick={() => setActiveSection("customers")}
          >
            Manage Customers
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderSection = () => {
    if (activeSection === "overview") {
      return renderOverview();
    }
    if (activeSection === "customers") {
      return <Customers />;
    }
    if (activeSection === "appointments") {
      return <Appointments />;
    }
    if (activeSection === "invoices") {
      return <Invoices />;
    }
    if (activeSection === "history") {
      return <History />;
    }
    if (activeSection === "form-submissions") {
      return renderFormSubmissions();
    }
    return (
      <div className="p-8">
        <h2 className="text-3xl font-orbitron font-bold text-foreground mb-4">
          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
        </h2>
        <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-8 text-center">
          <p className="text-muted-foreground font-rajdhani">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} section - coming soon
          </p>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
      <SidebarAdmin activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
