import { useState, useEffect } from "react";
import { Facebook, Instagram, MessageCircle, Phone, Menu, X, Music, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["home", "about", "services", "pricing", "gallery", "reviews", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "pricing", label: "Pricing & Calculator" },
    { id: "gallery", label: "Gallery" },
    { id: "packages", label: "Packages" },
    { id: "reviews", label: "Reviews" },
    { id: "blog", label: "Blog", path: "/blog" },
    { id: "contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Music, href: "https://tiktok.com", label: "TikTok" },
    { icon: MessageCircle, href: "https://wa.me/2392729166", label: "WhatsApp" },
  ];

  return (
    <>
      {/* Desktop Header - Original Design */}
      <nav className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}>
        {/* Layer 1: Social and Call */}
        <div className="border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-12 text-sm">
              <div className="flex items-center gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://wa.me/2392729166" target="_blank" rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>

              <img src={logo} alt="Mobile Service" className="h-12 w-auto" />

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary-foreground hover:bg-primary"
                  onClick={() => navigate("/admin/login")}
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Admin Login
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary-foreground hover:bg-primary"
                  asChild
                >
                  <a href="tel:2392729166">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 2: Navigation Links */}
        <div className="border-b border-border/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-14">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className={`relative font-rajdhani font-medium tracking-wide text-sm transition-colors ${
                        activeSection === link.id
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      } group`}
                    >
                      {link.label}
                      <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-transform duration-300 ${
                        activeSection === link.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header - New Design */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50">
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20 transition-all duration-300">
          <div className="px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center flex-shrink-0">
                <img src={logo} alt="Mobile Service" className="h-14 w-auto" />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="border-t border-white/20 animate-in fade-in duration-300">
                <div className="py-4 space-y-4">
                  {/* Mobile Navigation Links */}
                  <div className="px-4 space-y-2">
                    {navLinks.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => scrollToSection(link.id)}
                        className={`block w-full text-left px-4 py-2 rounded-lg font-rajdhani font-medium transition-all ${
                          activeSection === link.id
                            ? "bg-white/30 text-white"
                            : "text-white/80 hover:bg-white/20 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-white/20 pt-4 px-4">
                    {/* Mobile Social Icons */}
                    <div className="mb-4">
                      <p className="text-xs font-rajdhani font-medium text-white/60 mb-3 uppercase">
                        Follow Us
                      </p>
                      <div className="flex items-center gap-3">
                        {socialLinks.map((social) => {
                          const Icon = social.icon;
                          return (
                            <a
                              key={social.label}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
                              aria-label={social.label}
                            >
                              <Icon className="w-5 h-5" />
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    {/* Mobile Admin Login Button */}
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-white font-rajdhani font-medium mb-2 gap-2"
                      onClick={() => {
                        navigate("/admin/login");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogIn className="w-4 h-4" />
                      Admin Login
                    </Button>

                    {/* Mobile Call Button */}
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                      asChild
                    >
                      <a href="tel:2392729166" className="flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        Call Now
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
