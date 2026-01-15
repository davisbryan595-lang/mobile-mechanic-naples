import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, TrendingUp, AlertCircle, Users as UsersIcon, Plus, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SidebarAdmin } from "@/components/admin/SidebarAdmin";
import { adminAuth } from "@/utils/auth";
import { supabase } from "@/integrations/supabase/client";
import { startOfDay, endOfDay, subDays } from "date-fns";
import Customers from "./Customers";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
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

  // Check authentication on mount
  useEffect(() => {
    if (!adminAuth.isAuthenticated()) {
      navigate("/admin/login");
    }
  }, [navigate]);


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
          value={0}
          icon={<Clock className="w-6 h-6 text-primary" />}
          bgColor="bg-primary/20"
        />
        <StatsCard
          label="Weekly Revenue"
          value="$0"
          icon={<TrendingUp className="w-6 h-6 text-emerald-500" />}
          bgColor="bg-emerald-500/20"
        />
        <StatsCard
          label="Pending Payments"
          value="$0"
          icon={<AlertCircle className="w-6 h-6 text-amber-500" />}
          bgColor="bg-amber-500/20"
        />
        <StatsCard
          label="Total Customers"
          value={0}
          icon={<UsersIcon className="w-6 h-6 text-blue-500" />}
          bgColor="bg-blue-500/20"
        />
      </div>

      {/* Empty State Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <Card className="border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden p-8 text-center">
          <h3 className="text-xl font-orbitron font-bold text-foreground mb-4">
            Upcoming Appointments
          </h3>
          <p className="text-muted-foreground font-rajdhani">
            No appointments scheduled yet. Start adding bookings to track customer services.
          </p>
        </Card>

        {/* Recent Customers */}
        <Card className="border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden p-8 text-center">
          <h3 className="text-xl font-orbitron font-bold text-foreground mb-4">Recent Customers</h3>
          <p className="text-muted-foreground font-rajdhani">
            No customers yet. Add your first customer to get started.
          </p>
        </Card>
      </div>

      {/* Action Buttons Section */}
      <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-6">
        <h3 className="text-lg font-orbitron font-bold text-foreground mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani font-medium gap-2 glow-orange">
            <Plus className="w-4 h-4" />
            Add Booking
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-rajdhani font-medium gap-2">
            <CheckCircle className="w-4 h-4" />
            Mark Complete
          </Button>
          <Button variant="outline" className="border-border/50 text-foreground hover:bg-secondary/50 font-rajdhani font-medium">
            View All Appointments
          </Button>
          <Button variant="outline" className="border-border/50 text-foreground hover:bg-secondary/50 font-rajdhani font-medium">
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
