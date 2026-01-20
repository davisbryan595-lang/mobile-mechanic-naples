import { useState, useEffect } from "react";
import { X, AlertCircle, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AddInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
}

interface FormData {
  customerId: string;
  vehicleId: string;
  lineItems: LineItem[];
  taxPercent: number;
  paymentMethod: string;
  notes: string;
  dueDate: string;
  status: "draft" | "sent" | "paid" | "partial" | "overdue";
}

export const AddInvoiceModal = ({ isOpen, onClose, onSuccess }: AddInvoiceModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    customerId: "",
    vehicleId: "",
    lineItems: [{ id: "1", description: "", quantity: 1, unitPrice: 0 }],
    taxPercent: 0,
    paymentMethod: "unpaid",
    notes: "",
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    status: "draft",
  });

  // Fetch customers on modal open
  useEffect(() => {
    if (!isOpen) return;

    const fetchCustomers = async () => {
      setLoadingCustomers(true);
      try {
        const { data, error: fetchError } = await supabase
          .from("customers")
          .select("id, first_name, last_name")
          .eq("is_active", true)
          .order("first_name", { ascending: true });

        if (fetchError) throw fetchError;
        setCustomers(data || []);
      } catch (err) {
        console.error("Error fetching customers:", err instanceof Error ? err.message : String(err));
        toast.error("Failed to load customers");
      } finally {
        setLoadingCustomers(false);
      }
    };

    fetchCustomers();
  }, [isOpen]);

  const handleLineItemChange = (id: string, field: keyof LineItem, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addLineItem = () => {
    const newId = String(Math.max(...formData.lineItems.map(item => parseInt(item.id))) + 1);
    setFormData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, { id: newId, description: "", quantity: 1, unitPrice: 0 }],
    }));
  };

  const removeLineItem = (id: string) => {
    if (formData.lineItems.length === 1) {
      toast.error("Invoice must have at least one line item");
      return;
    }
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id),
    }));
  };

  const calculateSubtotal = () => {
    return formData.lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (formData.taxPercent / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.customerId) {
        throw new Error("Customer is required");
      }
      if (formData.lineItems.length === 0) {
        throw new Error("At least one line item is required");
      }

      // Validate line items
      for (const item of formData.lineItems) {
        if (!item.description.trim()) {
          throw new Error("All line items must have a description");
        }
        if (item.quantity <= 0) {
          throw new Error("Quantity must be greater than 0");
        }
        if (item.unitPrice < 0) {
          throw new Error("Unit price cannot be negative");
        }
      }

      const subtotal = calculateSubtotal();
      const tax = calculateTax();
      const total = calculateTotal();

      // Create invoice
      const { data: invoiceData, error: insertError } = await supabase
        .from("invoices")
        .insert([
          {
            customer_id: formData.customerId,
            booking_id: null,
            work_order_id: null,
            amount: total,
            status: formData.status,
            due_date: formData.dueDate,
            issued_date: new Date().toISOString().split("T")[0],
            notes: formData.notes.trim() || null,
          },
        ])
        .select();

      if (insertError) throw insertError;

      toast.success("Invoice created successfully!", {
        description: `Total: $${total.toFixed(2)} (Subtotal: $${subtotal.toFixed(2)}, Tax: $${tax.toFixed(2)})`,
      });

      // Reset form
      setFormData({
        customerId: "",
        vehicleId: "",
        lineItems: [{ id: "1", description: "", quantity: 1, unitPrice: 0 }],
        taxPercent: 0,
        paymentMethod: "unpaid",
        notes: "",
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "draft",
      });

      onSuccess?.();
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create invoice";
      setError(errorMessage);
      toast.error("Error creating invoice", { description: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const selectedCustomer = customers.find(c => c.id === formData.customerId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-secondary rounded-xl shadow-2xl border border-border/30 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-border/30 bg-secondary">
          <h2 className="text-2xl font-orbitron font-bold text-white">Create New Invoice</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 hover:bg-secondary-foreground/10 rounded-lg transition-colors text-gray-400 hover:text-white disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Customer & Status Section */}
          <div>
            <h3 className="text-lg font-orbitron font-bold text-orange-500 mb-4">Invoice Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                  Customer <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.customerId}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerId: e.target.value }))}
                  disabled={loading || loadingCustomers}
                  className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50 cursor-pointer"
                >
                  <option value="">Select Customer...</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id} className="bg-card text-white">
                      {customer.first_name} {customer.last_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50 cursor-pointer"
                >
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="paid">Paid</option>
                  <option value="partial">Partial</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Line Items Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-orbitron font-bold text-orange-500">Line Items</h3>
              <Button
                type="button"
                onClick={addLineItem}
                disabled={loading}
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white font-rajdhani gap-1"
              >
                <Plus className="w-3 h-3" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {formData.lineItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                  <div>
                    <label className="block text-xs font-rajdhani font-semibold text-gray-400 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleLineItemChange(item.id, "description", e.target.value)}
                      placeholder="Service description"
                      disabled={loading}
                      className="w-full px-3 py-2 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani text-sm disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-rajdhani font-semibold text-gray-400 mb-1">
                      Qty
                    </label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleLineItemChange(item.id, "quantity", parseInt(e.target.value) || 0)}
                      placeholder="1"
                      min="1"
                      disabled={loading}
                      className="w-full px-3 py-2 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani text-sm disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-rajdhani font-semibold text-gray-400 mb-1">
                      Unit Price
                    </label>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => handleLineItemChange(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      disabled={loading}
                      className="w-full px-3 py-2 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani text-sm disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-rajdhani font-semibold text-gray-400 mb-1">
                      Subtotal
                    </label>
                    <div className="px-3 py-2 bg-secondary border border-border/30 rounded-lg text-gray-300 font-rajdhani text-sm">
                      ${(item.quantity * item.unitPrice).toFixed(2)}
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => removeLineItem(item.id)}
                      disabled={loading || formData.lineItems.length === 1}
                      className="w-full px-3 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg font-rajdhani text-sm disabled:opacity-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Section */}
          <div className="border-t border-border/30 pt-6">
            <div className="space-y-3 max-w-xs ml-auto">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-rajdhani">Subtotal</span>
                <span className="text-white font-rajdhani font-semibold">${calculateSubtotal().toFixed(2)}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 items-center">
                <label className="text-gray-300 font-rajdhani text-sm">Tax</label>
                <input
                  type="number"
                  value={formData.taxPercent}
                  onChange={(e) => setFormData(prev => ({ ...prev, taxPercent: parseFloat(e.target.value) || 0 }))}
                  placeholder="0"
                  min="0"
                  max="100"
                  step="0.01"
                  disabled={loading}
                  className="px-2 py-1 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani text-sm disabled:opacity-50"
                />
                <span className="text-gray-300 font-rajdhani text-sm">%</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-rajdhani">Tax Amount</span>
                <span className="text-white font-rajdhani font-semibold">${calculateTax().toFixed(2)}</span>
              </div>

              <div className="border-t border-border/30 pt-3 flex justify-between items-center">
                <span className="text-orange-400 font-rajdhani font-bold">Total</span>
                <span className="text-orange-400 font-rajdhani font-bold text-lg">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Additional Fields */}
          <div>
            <h3 className="text-lg font-orbitron font-bold text-orange-500 mb-4">Additional Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                  Payment Method
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50 cursor-pointer"
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="cash">Cash</option>
                  <option value="check">Check</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
              Notes <span className="text-gray-500">(optional)</span>
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Invoice notes, terms, or special instructions..."
              disabled={loading}
              rows={4}
              className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50 resize-none"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 font-rajdhani text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="sticky bottom-0 flex gap-3 pt-4 border-t border-border/30 bg-secondary">
            <Button
              type="button"
              onClick={onClose}
              disabled={loading}
              variant="outline"
              className="flex-1 border-border/30 font-rajdhani"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || loadingCustomers}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-rajdhani font-medium disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Invoice"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInvoiceModal;
