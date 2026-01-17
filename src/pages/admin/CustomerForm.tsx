import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

const CustomerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id || id === "new";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(!isNew);
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

  // Fetch customer data if editing
  useEffect(() => {
    if (!isNew && id) {
      const fetchCustomer = async () => {
        try {
          const { data, error: fetchError } = await supabase
            .from("customers")
            .select("*")
            .eq("id", id)
            .single();

          if (fetchError) throw fetchError;

          if (data) {
            setFormData({
              firstName: data.first_name || "",
              lastName: data.last_name || "",
              phone: data.phone || "",
              email: data.email || "",
              address: data.service_address || "",
              city: data.city || "",
              state: data.state || "FL",
              zip: data.zip_code || "",
              type: data.customer_type || "new",
              source: data.lead_source || "phone-call",
              tags: data.tags?.join(", ") || "",
              notes: data.notes || "",
              isActive: data.is_active || true,
            });
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "Failed to load customer";
          setError(errorMessage);
          toast.error("Error loading customer", { description: errorMessage });
        } finally {
          setFetching(false);
        }
      };

      fetchCustomer();
    }
  }, [id, isNew]);

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

      const customerData = {
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
      };

      if (isNew) {
        // Create new customer
        const { error: insertError } = await supabase
          .from("customers")
          .insert([customerData])
          .select();

        if (insertError) {
          throw insertError;
        }

        toast.success("Customer added successfully!", {
          description: `${formData.firstName} ${formData.lastName} has been added.`,
        });
      } else {
        // Update existing customer
        const { error: updateError } = await supabase
          .from("customers")
          .update(customerData)
          .eq("id", id)
          .select();

        if (updateError) {
          throw updateError;
        }

        toast.success("Customer updated successfully!", {
          description: `${formData.firstName} ${formData.lastName} has been updated.`,
        });
      }

      // Redirect back to customers list
      navigate("/admin/dashboard");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to save customer";
      setError(errorMessage);
      toast.error(`Error ${isNew ? "adding" : "updating"} customer`, {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

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
        <h2 className="text-3xl font-orbitron font-bold text-foreground">
          {isNew ? "Add New Customer" : "Edit Customer"}
        </h2>
      </div>

      {fetching ? (
        <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-8 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <p className="text-gray-400 font-rajdhani">Loading customer data...</p>
          </div>
        </Card>
      ) : (
        <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-2.5 bg-secondary border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
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
                  className="w-full px-4 py-2.5 bg-secondary border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
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
                  className="w-full px-4 py-2.5 bg-secondary border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
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
                  className="w-full px-4 py-2.5 bg-secondary border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
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
                className="w-full px-4 py-2.5 bg-secondary border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
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
                  className="w-full px-4 py-2.5 bg-secondary border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
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
                  className="w-full px-4 py-2.5 bg-secondary border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50 cursor-pointer"
                >
                  {US_STATES.map(state => (
                    <option key={state} value={state} className="bg-secondary text-white">
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
                  className="w-full px-4 py-2.5 bg-secondary border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
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
                  className="w-full px-4 py-2.5 bg-secondary border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50 cursor-pointer"
                >
                  {CUSTOMER_TYPES.map(type => (
                    <option key={type.value} value={type.value} className="bg-secondary text-white">
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
                  className="w-full px-4 py-2.5 bg-secondary border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50 cursor-pointer"
                >
                  {LEAD_SOURCES.map(source => (
                    <option key={source} value={source} className="bg-secondary text-white">
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
                className="w-full px-4 py-2.5 bg-secondary border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
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
                className="w-full px-4 py-2.5 bg-secondary border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50 resize-none"
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
            <div className="flex gap-3 pt-4 border-t border-border/30">
              <Button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
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
                {loading ? "Saving..." : isNew ? "Create Customer" : "Update Customer"}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default CustomerForm;
