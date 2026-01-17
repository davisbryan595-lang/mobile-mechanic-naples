import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AddBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vin: string;
  serviceType: string;
  appointmentDate: string;
  appointmentTime: string;
  duration: string;
  issue: string;
  hasParts: boolean;
  cityArea: string;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
}

const SERVICE_TYPES = [
  { value: "oil_change", label: "Oil Change" },
  { value: "diagnostics", label: "Diagnostics" },
  { value: "suspension", label: "Suspension" },
  { value: "ac_service", label: "AC Service" },
  { value: "starter_replacement", label: "Starter Replacement" },
  { value: "brake_job", label: "Brake Job" },
  { value: "electrical", label: "Electrical" },
  { value: "battery_replacement", label: "Battery Replacement" },
  { value: "routine_maintenance", label: "Routine Maintenance" },
  { value: "other", label: "Other" },
];

const DURATIONS = [
  { value: "30min", label: "30 Minutes" },
  { value: "1hour", label: "1 Hour" },
  { value: "3hours", label: "3 Hours" },
  { value: "full_day", label: "Full Day" },
];

const STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export const AddBookingModal = ({ isOpen, onClose, onSuccess }: AddBookingModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: new Date().getFullYear().toString(),
    vin: "",
    serviceType: "diagnostics",
    appointmentDate: new Date().toISOString().split("T")[0],
    appointmentTime: "09:00",
    duration: "1hour",
    issue: "",
    hasParts: false,
    cityArea: "",
    status: "pending",
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
      if (!formData.fullName.trim()) {
        throw new Error("Customer name is required");
      }
      if (!formData.phone.trim()) {
        throw new Error("Phone number is required");
      }
      if (!formData.vehicleMake.trim()) {
        throw new Error("Vehicle make is required");
      }
      if (!formData.vehicleModel.trim()) {
        throw new Error("Vehicle model is required");
      }
      if (!formData.vehicleYear.trim()) {
        throw new Error("Vehicle year is required");
      }
      if (!formData.appointmentDate) {
        throw new Error("Appointment date is required");
      }
      if (!formData.appointmentTime) {
        throw new Error("Appointment time is required");
      }

      const cleanPhone = formData.phone.replace(/\D/g, "");
      if (cleanPhone.length < 10) {
        throw new Error("Phone number must be at least 10 digits");
      }

      // Insert into Supabase
      const { error: insertError } = await supabase
        .from("bookings")
        .insert([
          {
            full_name: formData.fullName.trim(),
            phone: formData.phone,
            email: formData.email.trim() || null,
            vehicle_make: formData.vehicleMake.trim(),
            vehicle_model: formData.vehicleModel.trim(),
            vehicle_year: parseInt(formData.vehicleYear),
            vin_number: formData.vin.trim() || "",
            service_type: formData.serviceType,
            appointment_date: formData.appointmentDate,
            appointment_time: formData.appointmentTime,
            duration: formData.duration,
            issue_description: formData.issue.trim() || null,
            has_parts: formData.hasParts,
            city_area: formData.cityArea.trim() || "",
            status: formData.status,
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      // Show success message
      toast.success("Booking created successfully!", {
        description: `Appointment scheduled for ${formData.fullName} on ${formData.appointmentDate}`,
      });

      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: new Date().getFullYear().toString(),
        vin: "",
        serviceType: "diagnostics",
        appointmentDate: new Date().toISOString().split("T")[0],
        appointmentTime: "09:00",
        duration: "1hour",
        issue: "",
        hasParts: false,
        cityArea: "",
        status: "pending",
      });

      // Call success callback
      onSuccess?.();
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create booking";
      setError(errorMessage);
      toast.error("Error creating booking", {
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
      <div className="relative w-full max-w-2xl bg-secondary rounded-xl shadow-2xl border border-border/30 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-border/30 bg-secondary">
          <h2 className="text-2xl font-orbitron font-bold text-white">Add New Booking</h2>
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
          {/* Customer Information Section */}
          <div>
            <h3 className="text-lg font-orbitron font-bold text-orange-500 mb-4">Customer Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="John Smith"
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
                />
              </div>
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
          </div>

          {/* Vehicle Information Section */}
          <div>
            <h3 className="text-lg font-orbitron font-bold text-orange-500 mb-4">Vehicle Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                  Make <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.vehicleMake}
                  onChange={(e) => handleInputChange("vehicleMake", e.target.value)}
                  placeholder="Toyota"
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.vehicleModel}
                  onChange={(e) => handleInputChange("vehicleModel", e.target.value)}
                  placeholder="Camry"
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.vehicleYear}
                  onChange={(e) => handleInputChange("vehicleYear", e.target.value)}
                  placeholder="2020"
                  min="1980"
                  max={new Date().getFullYear() + 1}
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                  VIN <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.vin}
                  onChange={(e) => handleInputChange("vin", e.target.value)}
                  placeholder="1HGCV41JXMN109186"
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                  City/Area <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.cityArea}
                  onChange={(e) => handleInputChange("cityArea", e.target.value)}
                  placeholder="Fort Myers"
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Appointment Details Section */}
          <div>
            <h3 className="text-lg font-orbitron font-bold text-orange-500 mb-4">Appointment Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                  Service Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => handleInputChange("serviceType", e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50 cursor-pointer"
                >
                  {SERVICE_TYPES.map(type => (
                    <option key={type.value} value={type.value} className="bg-card text-white">
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                  Duration <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50 cursor-pointer"
                >
                  {DURATIONS.map(dur => (
                    <option key={dur.value} value={dur.value} className="bg-card text-white">
                      {dur.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value as any)}
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50 cursor-pointer"
                >
                  {STATUSES.map(status => (
                    <option key={status.value} value={status.value} className="bg-card text-white">
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.appointmentDate}
                  onChange={(e) => handleInputChange("appointmentDate", e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                  Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={formData.appointmentTime}
                  onChange={(e) => handleInputChange("appointmentTime", e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <h3 className="text-lg font-orbitron font-bold text-orange-500 mb-4">Additional Details</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-rajdhani font-semibold text-gray-300 mb-2">
                Issue Description <span className="text-gray-500">(optional)</span>
              </label>
              <textarea
                value={formData.issue}
                onChange={(e) => handleInputChange("issue", e.target.value)}
                placeholder="Describe the issue or special requests..."
                disabled={loading}
                rows={4}
                className="w-full px-4 py-2.5 bg-card border border-border/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary font-rajdhani disabled:opacity-50 resize-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="hasParts"
                checked={formData.hasParts}
                onChange={(e) => handleInputChange("hasParts", e.target.checked)}
                disabled={loading}
                className="w-4 h-4 accent-orange-500 cursor-pointer disabled:opacity-50"
              />
              <label htmlFor="hasParts" className="text-sm font-rajdhani font-semibold text-gray-300 cursor-pointer">
                Parts needed for this job
              </label>
            </div>
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
              {loading ? "Creating..." : "Create Booking"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookingModal;
