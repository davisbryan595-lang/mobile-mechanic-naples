import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, TrendingUp, AlertCircle, Users as UsersIcon, Plus, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SidebarAdmin } from "@/components/admin/SidebarAdmin";
import { adminAuth } from "@/utils/auth";

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

  // Sample data for upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      customer: "John Smith",
      vehicle: "2021 Toyota Camry",
      service: "Brake Service",
      time: "Today, 2:00 PM",
      status: "Scheduled",
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      vehicle: "2019 Honda Civic",
      service: "Oil Change",
      time: "Today, 4:30 PM",
      status: "In Progress",
    },
    {
      id: 3,
      customer: "Michael Davis",
      vehicle: "2022 Ford F-150",
      service: "Transmission Check",
      time: "Tomorrow, 10:00 AM",
      status: "Scheduled",
    },
    {
      id: 4,
      customer: "Emily Wilson",
      vehicle: "2020 Chevrolet Malibu",
      service: "Air Filter Replacement",
      time: "Tomorrow, 1:00 PM",
      status: "Scheduled",
    },
    {
      id: 5,
      customer: "James Brown",
      vehicle: "2018 Nissan Altima",
      service: "Battery Replacement",
      time: "Dec 26, 3:00 PM",
      status: "Pending",
    },
  ];

  // Sample data for recent customers
  const recentCustomers = [
    {
      id: 1,
      name: "John Smith",
      phone: "(239) 272-9166",
      lastService: "Brake Service - Dec 19",
      notes: "Requested weekend availability",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      phone: "(239) 456-7890",
      lastService: "Oil Change - Dec 18",
      notes: "Repeat customer, very satisfied",
    },
    {
      id: 3,
      name: "Michael Davis",
      phone: "(239) 555-1234",
      lastService: "Transmission Check - Dec 17",
      notes: "Interested in maintenance package",
    },
    {
      id: 4,
      name: "Emily Wilson",
      phone: "(239) 789-0123",
      lastService: "Air Filter - Dec 10",
      notes: "New customer, referred by John S.",
    },
  ];

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
          value={2}
          icon={<Clock className="w-6 h-6 text-primary" />}
          bgColor="bg-primary/20"
        />
        <StatsCard
          label="Weekly Revenue"
          value="$2,850"
          icon={<Trending className="w-6 h-6 text-emerald-500" />}
          bgColor="bg-emerald-500/20"
        />
        <StatsCard
          label="Pending Payments"
          value="$450"
          icon={<AlertCircle className="w-6 h-6 text-amber-500" />}
          bgColor="bg-amber-500/20"
        />
        <StatsCard
          label="Total Customers"
          value={24}
          icon={<UsersIcon className="w-6 h-6 text-blue-500" />}
          bgColor="bg-blue-500/20"
        />
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments Table */}
        <Card className="border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-border/30 flex items-center justify-between">
            <h3 className="text-xl font-orbitron font-bold text-foreground">
              Upcoming Appointments
            </h3>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani font-medium h-9 gap-2 glow-orange">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Booking</span>
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border/30 bg-secondary/30">
                <tr>
                  <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground">
                    Customer
                  </th>
                  <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground">
                    Vehicle
                  </th>
                  <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground">
                    Service
                  </th>
                  <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground">
                    Time
                  </th>
                  <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {upcomingAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="border-b border-border/30 hover:bg-secondary/20 transition-colors"
                  >
                    <td className="p-4 text-foreground font-rajdhani">{appointment.customer}</td>
                    <td className="p-4 text-muted-foreground text-xs md:text-sm font-rajdhani">
                      {appointment.vehicle}
                    </td>
                    <td className="p-4 text-muted-foreground text-xs md:text-sm font-rajdhani">
                      {appointment.service}
                    </td>
                    <td className="p-4 text-muted-foreground text-xs md:text-sm font-rajdhani">
                      {appointment.time}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-rajdhani font-medium ${
                          appointment.status === "Scheduled"
                            ? "bg-blue-500/20 text-blue-400"
                            : appointment.status === "In Progress"
                              ? "bg-primary/20 text-primary"
                              : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {appointment.status === "In Progress" && (
                          <CheckCircle className="w-3 h-3" />
                        )}
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Customers Table */}
        <Card className="border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-border/30">
            <h3 className="text-xl font-orbitron font-bold text-foreground">Recent Customers</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border/30 bg-secondary/30">
                <tr>
                  <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground">
                    Name
                  </th>
                  <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground">
                    Phone
                  </th>
                  <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground">
                    Last Service
                  </th>
                  <th className="text-left p-4 font-rajdhani font-semibold text-muted-foreground">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-border/30 hover:bg-secondary/20 transition-colors"
                  >
                    <td className="p-4 text-foreground font-rajdhani">{customer.name}</td>
                    <td className="p-4 text-muted-foreground text-sm font-rajdhani">
                      {customer.phone}
                    </td>
                    <td className="p-4 text-muted-foreground text-xs md:text-sm font-rajdhani">
                      {customer.lastService}
                    </td>
                    <td className="p-4 text-muted-foreground text-xs md:text-sm font-rajdhani">
                      {customer.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
