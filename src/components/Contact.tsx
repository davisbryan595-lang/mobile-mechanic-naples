import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessageCircle, Phone, MapPin, Facebook, Instagram, Music, CalendarIcon, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const SUPABASE_EDGE_FUNCTION_URL = "https://xjhvmipqcacgkalqxkvq.supabase.co/functions/v1/form-handler";

export const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleType: "",
    address: "",
    message: "",
    hearAboutUs: "",
    hearAboutUsOther: "",
    agree: false,
  });
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agree) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the Terms and Conditions",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        vehicle_type: formData.vehicleType,
        address: formData.address,
        message: formData.message,
        preferred_date: date ? format(date, "PPP") : "Not specified",
        how_heard_about_us: formData.hearAboutUs,
        other_source: formData.hearAboutUsOther,
        recipient_email: RECIPIENT_EMAIL,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you as soon as possible.",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          vehicleType: "",
          address: "",
          message: "",
          hearAboutUs: "",
          hearAboutUsOther: "",
          agree: false,
        });
        setDate(undefined);
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="text-primary text-glow">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Contact us for fast, professional mobile mechanic service
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8 animate-slide-up">
            <div>
              <h3 className="font-orbitron text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold mb-1">Messenger</h4>
                    <p className="text-muted-foreground">MobileService Naples</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold mb-1">SMS / Call</h4>
                    <a href="tel:2392729166" className="text-primary hover:underline text-lg">
                      239-272-9166
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold mb-1">Service Areas</h4>
                    <p className="text-muted-foreground">
                      Naples, Bonita Springs, Estero,<br />
                      Fort Myers, Lehigh Acres
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-orbitron text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/share/1GmBcnPumP/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <Facebook className="w-6 h-6 text-primary" />
                </a>
                <a
                  href="https://www.instagram.com/mobilemechanicservice_?igsh=MWtoNGl5NXhxNGgzcw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <Instagram className="w-6 h-6 text-primary" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <Music className="w-6 h-6 text-primary" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-6 bg-gradient-metallic border-2 border-primary/30 rounded-lg p-8 glow-orange">
              <div>
                <Label htmlFor="name" className="font-orbitron">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background border-border mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email" className="font-orbitron">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background border-border mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="font-orbitron">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-background border-border mt-2"
                />
              </div>

              <div>
                <Label htmlFor="vehicleType" className="font-orbitron">Vehicle Type</Label>
                <Select value={formData.vehicleType} onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}>
                  <SelectTrigger className="bg-background border-border mt-2">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="passenger-car">Passenger Car</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                    <SelectItem value="van-commercial">Van / Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="address" className="font-orbitron">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  className="bg-background border-border mt-2"
                  placeholder="Service location address"
                />
              </div>

              <div>
                <Label className="font-orbitron">Preferred Appointment Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-background border-border mt-2",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background border-border" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="message" className="font-orbitron">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="bg-background border-border mt-2"
                />
              </div>

              <div className="pt-4 border-t border-border/30">
                <Label htmlFor="hearAboutUs" className="font-rajdhani text-sm text-muted-foreground">
                  How did you hear about us? <span className="text-xs">(optional - helps us improve!)</span>
                </Label>
                <Select value={formData.hearAboutUs} onValueChange={(value) => setFormData({ ...formData, hearAboutUs: value })}>
                  <SelectTrigger className="bg-background border-border mt-2">
                    <SelectValue placeholder="-- Select one --" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="google-search">Google Search</SelectItem>
                    <SelectItem value="facebook-instagram">Facebook / Instagram</SelectItem>
                    <SelectItem value="referral">Referral / Friend / Family</SelectItem>
                    <SelectItem value="yelp-reviews">Yelp / Google Reviews</SelectItem>
                    <SelectItem value="walk-in">Walk-in / Drive-by</SelectItem>
                    <SelectItem value="sign-advertisement">Sign / Advertisement / Flyer</SelectItem>
                    <SelectItem value="other">Other (please specify)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1.5">This helps us know which marketing works best — thank you!</p>
              </div>

              {formData.hearAboutUs === "other" && (
                <div>
                  <Input
                    id="hearAboutUsOther"
                    type="text"
                    value={formData.hearAboutUsOther}
                    onChange={(e) => setFormData({ ...formData, hearAboutUsOther: e.target.value })}
                    placeholder="Please tell us more..."
                    className="bg-background border-border"
                  />
                </div>
              )}

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="agree"
                  checked={formData.agree}
                  onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                  className="mt-1 accent-primary"
                />
                <Label htmlFor="agree" className="text-sm cursor-pointer">
                  I agree to the Terms and Conditions
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-orbitron font-bold text-lg glow-orange-strong disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
