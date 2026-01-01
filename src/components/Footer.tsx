import { MessageCircle, Facebook, Instagram, Music } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <img src={logo} alt="Mobile Service" className="h-16 w-auto mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Professional mobile mechanic service bringing expert automotive repair directly to your location 
              throughout Southwest Florida. Fast, honest, and reliable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-orbitron font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Services", "Pricing", "Reviews", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={link === "Blog" ? "/blog" : `#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Open Hours */}
          <div>
            <h3 className="font-orbitron font-bold text-lg mb-4">Open Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monday - Friday:</span>
                <span className="text-foreground font-semibold">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saturday:</span>
                <span className="text-foreground font-semibold">9:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunday:</span>
                <span className="text-foreground font-semibold">Closed</span>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-primary font-bold">Emergency Service Available</p>
                <p className="text-muted-foreground text-xs mt-1">Call for after-hours appointments</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-orbitron font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">SMS: </p>
                <a href="tel:2392729166" className="text-primary hover:underline font-bold">
                  239-272-9166
                </a>
              </div>
              <div>
                <p className="text-muted-foreground">Messenger: MobileService Naples</p>
              </div>
              <div>
                <p className="text-muted-foreground">Service Areas:</p>
                <p className="text-foreground">
                  Naples, Bonita Springs, Estero,<br />
                  Fort Myers, Lehigh Acres
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.facebook.com/share/1GmBcnPumP/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-primary" />
                </a>
                <a
                  href="https://www.instagram.com/mobilemechanicservice_?igsh=MWtoNGl5NXhxNGgzcw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-primary" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <Music className="w-5 h-5 text-primary" />
                </a>
                <a
                  href="https://wa.me/2392729166"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Mobile Mechanic Service | All Rights Reserved</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-primary transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
