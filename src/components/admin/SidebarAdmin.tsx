import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, BarChart3, Users, Calendar, History, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adminAuth } from "@/utils/auth";

interface SidebarAdminProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const SidebarAdmin = ({ activeSection, onSectionChange }: SidebarAdminProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: BarChart3,
    },
    {
      id: "customers",
      label: "Customers",
      icon: Users,
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
    },
    {
      id: "history",
      label: "History",
      icon: History,
    },
    {
      id: "invoices",
      label: "Invoices",
      icon: FileText,
    },
  ];

  const handleLogout = () => {
    adminAuth.clearAuth();
    navigate("/admin/login");
  };

  const handleSectionClick = (id: string) => {
    onSectionChange(id);
    setIsOpen(false); // Close mobile menu after clicking
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 bg-secondary border-r border-border/30 transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo/Title */}
          <div className="mb-10 mt-4 md:mt-0">
            <h1 className="text-2xl font-orbitron font-bold text-foreground">
              CRM
              <span className="block text-sm font-rajdhani font-medium text-primary mt-1">
                Admin Portal
              </span>
            </h1>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-rajdhani font-medium transition-all ${
                    isActive
                      ? "bg-primary/20 text-primary border-l-4 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary-foreground/5"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="pt-6 border-t border-border/30">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 font-rajdhani font-medium"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Desktop spacing */}
      <div className="hidden md:block md:w-64" />
    </>
  );
};
