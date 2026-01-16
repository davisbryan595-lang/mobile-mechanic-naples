import { useState, useEffect } from "react";
import { Plus, AlertTriangle, RefreshCw, ChevronLeft, ChevronRight, Eye, Download, CheckCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusSelect } from "@/components/ui/status-select";
import { supabase } from "@/integrations/supabase/client";
import { AddInvoiceModal } from "@/components/admin/AddInvoiceModal";
import { format } from "date-fns";
import { toast } from "sonner";

interface InvoiceData {
  id: string;
  customer_id: string;
  amount: number;
  status: string;
  issued_date: string;
  due_date: string;
  notes: string | null;
}

interface InvoiceWithCustomer extends InvoiceData {
  customer_name: string;
  customer_email: string;
}

const STATUS_BADGES = {
  draft: "bg-gray-500/20 text-gray-400",
  sent: "bg-blue-500/20 text-blue-400",
  paid: "bg-green-500/20 text-green-400",
  partial: "bg-yellow-500/20 text-yellow-400",
  overdue: "bg-red-500/20 text-red-400",
};

const STATUS_LABELS = {
  draft: "Draft",
  sent: "Sent",
  paid: "Paid",
  partial: "Partial",
  overdue: "Overdue",
};

const Invoices = () => {
  const [invoices, setInvoices] = useState<InvoiceWithCustomer[]>([]);
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

  // Fetch invoices with customer info
  const fetchInvoices = async () => {
    setLoading(true);
    setError(false);
    try {
      let query = supabase
        .from("invoices")
        .select("id, customer_id, amount, status, issued_date, due_date, notes");

      // Apply status filter
      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      // Apply date filter
      const today = new Date().toISOString().split("T")[0];
      switch (dateFilter) {
        case "today":
          query = query.eq("issued_date", today);
          break;
        case "week":
          const weekEnd = new Date();
          weekEnd.setDate(weekEnd.getDate() + 7);
          query = query
            .gte("issued_date", today)
            .lte("issued_date", weekEnd.toISOString().split("T")[0]);
          break;
        case "overdue":
          query = query
            .lt("due_date", today)
            .neq("status", "paid");
          break;
      }

      const { data, error: fetchError } = await query.order("issued_date", { ascending: false });

      if (fetchError) {
        if (fetchError.code !== "PGRST116") {
          console.error("Error fetching invoices:", fetchError.message || fetchError);
          throw fetchError;
        }
        setInvoices([]);
        setLoading(false);
        return;
      }

      // Fetch customer info for each invoice
      const invoicesWithCustomers: InvoiceWithCustomer[] = [];
      for (const invoice of data || []) {
        const { data: customerData, error: customerError } = await supabase
          .from("customers")
          .select("first_name, last_name, email")
          .eq("id", invoice.customer_id)
          .single();

        if (!customerError && customerData) {
          invoicesWithCustomers.push({
            ...invoice,
            customer_name: `${customerData.first_name} ${customerData.last_name}`,
            customer_email: customerData.email || "",
          });
        }
      }

      // Apply search filter
      let filtered = invoicesWithCustomers;
      if (searchQuery.trim()) {
        const search = searchQuery.toLowerCase();
        filtered = invoicesWithCustomers.filter(inv =>
          inv.customer_name.toLowerCase().includes(search) ||
          inv.id.toLowerCase().includes(search)
        );
      }

      setInvoices(filtered);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching invoices:", err instanceof Error ? err.message : String(err));
      setError(true);
      setLoading(false);
    }
  };

  // Fetch on filter changes
  useEffect(() => {
    setCurrentPage(1);
    fetchInvoices();
  }, [statusFilter, dateFilter, searchQuery]);

  const handleMarkPaid = async (id: string) => {
    try {
      const { error } = await supabase
        .from("invoices")
        .update({ status: "paid", paid_date: new Date().toISOString().split("T")[0] })
        .eq("id", id);

      if (error) throw error;

      toast.success("Invoice marked as paid");
      fetchInvoices();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to mark invoice as paid";
      toast.error("Error", { description: message });
    }
  };

  const handleDeleteInvoice = async (id: string) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;

    try {
      const { error } = await supabase
        .from("invoices")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Invoice deleted successfully");
      fetchInvoices();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete invoice";
      toast.error("Error deleting invoice", { description: message });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch {
      return dateString;
    }
  };

  // Pagination
  const paginatedInvoices = invoices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(invoices.length / pageSize);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-foreground">
            Invoices
          </h2>
          <p className="text-muted-foreground font-rajdhani text-sm mt-1">
            Manage customer invoices and track payments
          </p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-rajdhani font-medium gap-2 glow-orange"
        >
          <Plus className="w-4 h-4" />
          New Invoice
        </Button>
      </div>

      {/* Filters Bar */}
      <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-xs font-rajdhani font-semibold text-muted-foreground uppercase mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Customer name or invoice ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-secondary border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani text-sm"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs font-rajdhani font-semibold text-muted-foreground uppercase mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 bg-secondary border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani text-sm cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="overdue">Overdue</option>
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
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Error State */}
      {error && (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 font-rajdhani flex-1">Failed to load invoices</p>
          <Button
            onClick={() => fetchInvoices()}
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
          <p className="text-muted-foreground font-rajdhani">Loading invoices...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && invoices.length === 0 && (
        <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-12 text-center">
          <p className="text-muted-foreground font-rajdhani mb-4">
            No invoices yet. Create one to track billing.
          </p>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-rajdhani font-medium gap-2 glow-orange"
          >
            <Plus className="w-4 h-4" />
            Create Invoice
          </Button>
        </Card>
      )}

      {/* Invoices Table */}
      {!loading && !error && invoices.length > 0 && (
        <>
          <Card className="border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border/30 bg-secondary/30">
                  <tr>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Invoice ID
                    </th>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Customer
                    </th>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Amount
                    </th>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Status
                    </th>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Issued
                    </th>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Due
                    </th>
                    <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground uppercase text-xs">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInvoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-b border-border/30 hover:bg-secondary/20 transition-colors"
                    >
                      <td className="p-4 text-foreground font-rajdhani font-mono text-xs">
                        {invoice.id.slice(0, 8)}...
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-foreground font-rajdhani font-medium">
                            {invoice.customer_name}
                          </span>
                          <span className="text-muted-foreground text-xs font-rajdhani">
                            {invoice.customer_email}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-foreground font-rajdhani font-semibold">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="p-4">
                        <ThemedSelect
                          value={invoice.status}
                          onChange={(e) => {
                            // Update status via Supabase
                            supabase
                              .from("invoices")
                              .update({ status: e.target.value })
                              .eq("id", invoice.id)
                              .then(() => {
                                toast.success("Invoice updated");
                                fetchInvoices();
                              })
                              .catch((err) => {
                                toast.error("Failed to update invoice");
                              });
                          }}
                          statusType="invoice"
                        >
                          <option value="draft">Draft</option>
                          <option value="sent">Sent</option>
                          <option value="paid">Paid</option>
                          <option value="partial">Partial</option>
                          <option value="overdue">Overdue</option>
                        </ThemedSelect>
                      </td>
                      <td className="p-4 text-muted-foreground text-xs md:text-sm font-rajdhani">
                        {formatDate(invoice.issued_date)}
                      </td>
                      <td className="p-4 text-muted-foreground text-xs md:text-sm font-rajdhani">
                        {formatDate(invoice.due_date)}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleMarkPaid(invoice.id)}
                            disabled={invoice.status === "paid"}
                            className="p-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg text-xs disabled:opacity-50 transition-colors"
                            title="Mark as Paid"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteInvoice(invoice.id)}
                            className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg text-xs transition-colors"
                            title="Delete Invoice"
                          >
                            <Trash2 className="w-4 h-4" />
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
                  Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, invoices.length)} of {invoices.length} invoices
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

      {/* Add Invoice Modal */}
      <AddInvoiceModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => fetchInvoices()}
      />
    </div>
  );
};

export default Invoices;
