import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  type: "new" | "repeat" | "vip" | "problematic";
  source: string;
  tags: string;
  notes: string;
  isActive: boolean;
}

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const LEAD_SOURCES = [
  "google",
  "facebook",
  "referral",
  "yelp",
  "instagram",
  "repeat",
  "phone-call",
  "walk-in",
  "facebook-dm",
  "google-business",
  "other"
];

const CUSTOMER_TYPES = [
  { value: "new", label: "New", color: "bg-blue-500/20 text-blue-400" },
  { value: "repeat", label: "Repeat", color: "bg-green-500/20 text-green-400" },
  { value: "vip", label: "VIP", color: "bg-orange-500/20 text-orange-400" },
  { value: "problematic", label: "Problematic", color: "bg-red-500/20 text-red-400" }
];

export const AddCustomerModal = ({ isOpen, onClose, onSuccess }: AddCustomerModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "FL",
    zip: "",
    type: "new",
    source: "phone-call",
    tags: "",
    notes: "",
    isActive: true,
  });

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length === 0) return "";
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    if (field === "phone" && typeof value === "string") {
      setFormData(prev => ({
        ...prev,
        [field]: formatPhone(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.firstName.trim()) {
        throw new Error("First name is required");
      }
      if (!formData.lastName.trim()) {
        throw new Error("Last name is required");
      }
      if (!formData.phone.trim()) {
        throw new Error("Phone number is required");
      }
      if (!formData.source) {
        throw new Error("Lead source is required");
      }

      // Extract clean phone number
      const cleanPhone = formData.phone.replace(/\D/g, "");
      if (cleanPhone.length < 10) {
        throw new Error("Phone number must be at least 10 digits");
      }

      // Parse tags
      const tagsArray = formData.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      // Insert into Supabase
      const { data, error: insertError } = await supabase
        .from("customers")
        .insert([
          {
            first_name: formData.firstName.trim(),
            last_name: formData.lastName.trim(),
            phone: formData.phone,
            email: formData.email.trim() || null,
            service_address: formData.address.trim() || null,
            city: formData.city.trim() || null,
            state: formData.state || null,
            zip_code: formData.zip.trim() || null,
            customer_type: formData.type,
            lead_source: formData.source,
            tags: tagsArray.length > 0 ? tagsArray : null,
            notes: formData.notes.trim() || null,
            is_active: formData.isActive,
          },
        ])
        .select();

      if (insertError) {
        throw insertError;
      }

      // Show success message
      toast.success("Customer added successfully!", {
        description: `${formData.firstName} ${formData.lastName} has been added to the system.`,
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "FL",
        zip: "",
        type: "new",
        source: "phone-call",
        tags: "",
        notes: "",
        isActive: true,
      });

      // Call success callback to refresh parent
      onSuccess?.();

      // Close modal
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to add customer";
      setError(errorMessage);
      toast.error("Error adding customer", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-secondary rounded-xl shadow-2xl border border-border/30 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-border/30 bg-secondary">
          <h2 className="text-2xl font-orbitron font-bold text-white">Add New Customer</h2>
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
          {/* Full Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="John"
                disabled={loading}
                className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Smith"
                disabled={loading}
                className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
              />
            </div>
          </div>

          {/* Phone & Email Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(555) 123-4567"
                disabled={loading}
                className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                Email <span className="text-gray-500">(optional)</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@email.com"
                disabled={loading}
                className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
              />
            </div>
          </div>

          {/* Service Address */}
          <div>
            <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
              Street Address <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="123 Main Street"
              disabled={loading}
              className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
            />
          </div>

          {/* City, State, ZIP Row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="Fort Myers"
                disabled={loading}
                className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                State
              </label>
              <select
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50 cursor-pointer"
              >
                {US_STATES.map(state => (
                  <option key={state} value={state} className="bg-card text-white">
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                value={formData.zip}
                onChange={(e) => handleInputChange("zip", e.target.value)}
                placeholder="33901"
                disabled={loading}
                className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
              />
            </div>
          </div>

          {/* Customer Type & Lead Source Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                Customer Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value as any)}
                disabled={loading}
                className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50 cursor-pointer"
              >
                {CUSTOMER_TYPES.map(type => (
                  <option key={type.value} value={type.value} className="bg-card text-white">
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                Lead Source <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.source}
                onChange={(e) => handleInputChange("source", e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50 cursor-pointer"
              >
                {LEAD_SOURCES.map(source => (
                  <option key={source} value={source} className="bg-card text-white">
                    {source.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
              Tags <span className="text-gray-500">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => handleInputChange("tags", e.target.value)}
              placeholder="e.g. Brakes, AC, Diagnostics"
              disabled={loading}
              className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
              Notes <span className="text-gray-500">(optional)</span>
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Additional information about the customer..."
              disabled={loading}
              rows={4}
              className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50 resize-none"
            />
          </div>

          {/* Active Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => handleInputChange("isActive", e.target.checked)}
              disabled={loading}
              className="w-4 h-4 accent-orange-500 cursor-pointer disabled:opacity-50"
            />
            <label htmlFor="isActive" className="text-sm font-rajdhani font-semibold text-gray-300 cursor-pointer">
              Mark as Active
            </label>
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
              disabled={loading}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-rajdhani font-medium disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Customer"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;
