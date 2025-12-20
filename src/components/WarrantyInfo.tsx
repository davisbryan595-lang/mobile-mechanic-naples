import { Shield, Wrench, Calendar, AlertCircle } from "lucide-react";

export const WarrantyInfo = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
            Warranty & <span className="text-primary text-glow">Maintenance</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your assurance of quality work and vehicle reliability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Warranty Card */}
          <div className="bg-gradient-metallic border-2 border-border rounded-lg p-8 glow-orange hover:border-primary transition-all animate-slide-up">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-orbitron text-2xl font-bold mb-2">
                  Labor Warranty
                </h3>
                <p className="text-muted-foreground">Peace of mind on all work</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-orbitron font-bold text-primary mb-2">
                  ✓ 6-Month Labor Warranty
                </p>
                <p className="text-muted-foreground text-sm">
                  All labor is covered for 6 months from the date of service. If any issue arises due to our workmanship, we'll repair it at no additional labor cost.
                </p>
              </div>

              <div>
                <p className="font-orbitron font-bold text-primary mb-2">
                  ✓ 12-Month Extended Warranty (Optional)
                </p>
                <p className="text-muted-foreground text-sm">
                  Upgrade to 12-month coverage for an additional fee. Covers parts we provide and our labor for a full year.
                </p>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded p-3 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground mb-1">What's Covered:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Labor defects and improper installation</li>
                  <li>• Parts we supply (failure within warranty period)</li>
                  <li>• Related component failure due to our work</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Maintenance Card */}
          <div className="bg-gradient-metallic border-2 border-border rounded-lg p-8 glow-orange hover:border-primary transition-all animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Wrench className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-orbitron text-2xl font-bold mb-2">
                  Maintenance Guidelines
                </h3>
                <p className="text-muted-foreground">Keep your vehicle running smoothly</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-orbitron font-bold text-primary mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Oil Change Interval
                </p>
                <p className="text-muted-foreground text-sm">
                  <span className="font-semibold text-foreground">Every 3,000 miles or 90 days</span>, whichever comes first. This maintains engine health, reduces wear, and extends engine life significantly.
                </p>
              </div>

              <div>
                <p className="font-orbitron font-bold text-primary mb-2">
                  ✓ Why Routine Maintenance Matters
                </p>
                <ul className="text-muted-foreground text-sm space-y-2">
                  <li>
                    <span className="text-primary font-semibold">Prevention:</span> Catches small issues before they become expensive repairs
                  </li>
                  <li>
                    <span className="text-primary font-semibold">Performance:</span> Keeps your vehicle running at peak efficiency
                  </li>
                  <li>
                    <span className="text-primary font-semibold">Longevity:</span> Extends the life of your vehicle by years
                  </li>
                  <li>
                    <span className="text-primary font-semibold">Resale Value:</span> Documented maintenance increases vehicle worth
                  </li>
                </ul>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded p-3 text-sm">
                <p className="font-semibold text-accent mb-1">💡 Pro Tip:</p>
                <p className="text-muted-foreground text-xs">
                  Keep all service records and receipts. They prove maintenance history and help with warranty claims and future resale.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Maintenance Schedule */}
        <div className="bg-gradient-metallic border-2 border-border rounded-lg p-8 max-w-5xl mx-auto">
          <h3 className="font-orbitron text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Recommended Maintenance Schedule
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-orbitron font-bold text-primary">Interval</th>
                  <th className="text-left py-3 px-4 font-orbitron font-bold text-primary">Service</th>
                  <th className="text-left py-3 px-4 font-orbitron font-bold text-primary">Importance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                  <td className="py-3 px-4 text-foreground font-semibold">Every 3K miles / 90 days</td>
                  <td className="py-3 px-4 text-muted-foreground">Oil & Filter Change</td>
                  <td className="py-3 px-4">
                    <span className="bg-destructive/20 text-destructive px-2 py-1 rounded text-xs font-semibold">Critical</span>
                  </td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                  <td className="py-3 px-4 text-foreground font-semibold">Every 6 months</td>
                  <td className="py-3 px-4 text-muted-foreground">Fluid Level Check</td>
                  <td className="py-3 px-4">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-semibold">Important</span>
                  </td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                  <td className="py-3 px-4 text-foreground font-semibold">Every 12 months / 12K miles</td>
                  <td className="py-3 px-4 text-muted-foreground">Air Filter Replacement, Battery Test</td>
                  <td className="py-3 px-4">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-semibold">Important</span>
                  </td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                  <td className="py-3 px-4 text-foreground font-semibold">Every 24 months / 24K miles</td>
                  <td className="py-3 px-4 text-muted-foreground">Brake Inspection, Suspension Check</td>
                  <td className="py-3 px-4">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-semibold">Important</span>
                  </td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                  <td className="py-3 px-4 text-foreground font-semibold">Every 30K miles / 24 months</td>
                  <td className="py-3 px-4 text-muted-foreground">Spark Plug Inspection, Full System Check</td>
                  <td className="py-3 px-4">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-semibold">Important</span>
                  </td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="py-3 px-4 text-foreground font-semibold">As Needed</td>
                  <td className="py-3 px-4 text-muted-foreground">Tire Rotation, Wheel Alignment</td>
                  <td className="py-3 px-4">
                    <span className="bg-secondary/20 text-secondary px-2 py-1 rounded text-xs font-semibold">Recommended</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Note:</p>
              <p className="text-xs text-muted-foreground">
                Maintenance intervals may vary by vehicle make, model, and engine type. Always refer to your vehicle's owner manual for specific recommendations. We recommend scheduling service appointments in advance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
