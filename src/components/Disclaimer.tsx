import { AlertTriangle, FileText, DollarSign, CheckCircle } from "lucide-react";

export const Disclaimer = () => {
  return (
    <section id="disclaimer" className="py-20 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
            Legal & Pricing <span className="text-primary text-glow">Disclosure</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Important information about estimates, pricing, and service policies
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Pricing Estimates */}
          <div className="bg-gradient-metallic border-2 border-border rounded-lg p-8 glow-orange">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-orbitron text-2xl font-bold mb-2">
                  Pricing Estimates & Disclaimers
                </h3>
                <p className="text-muted-foreground">All estimates are labor only unless otherwise specified</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-background/50 rounded p-4 border border-border/50">
                <p className="font-orbitron font-bold text-primary mb-2">📋 Estimate Accuracy</p>
                <ul className="text-muted-foreground text-sm space-y-2">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>All prices shown are <span className="font-semibold text-foreground">estimates</span> based on labor only (parts & materials not included)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Final price may vary based on <span className="font-semibold text-foreground">vehicle condition, rust, accessibility, and hidden damage</span></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Additional labor charges apply for <span className="font-semibold text-foreground">seized bolts, difficult access, and specialty tools</span></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Parts are billed separately at cost plus applicable markup</span>
                  </li>
                </ul>
              </div>

              <div className="bg-background/50 rounded p-4 border border-border/50">
                <p className="font-orbitron font-bold text-primary mb-2">✓ Parts & Materials</p>
                <ul className="text-muted-foreground text-sm space-y-2">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><span className="font-semibold text-foreground">Customer's Own Parts:</span> You may provide your own parts. Labor charges remain the same.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><span className="font-semibold text-foreground">Shop-Provided Parts:</span> We source quality OEM or equivalent parts. Prices quoted separately.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Parts warranty follows manufacturer terms unless extended warranty is purchased</span>
                  </li>
                </ul>
              </div>

              <div className="bg-destructive/10 border border-destructive/20 rounded p-4">
                <p className="font-orbitron font-bold text-destructive mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Customer Approval Required
                </p>
                <p className="text-muted-foreground text-sm">
                  Any work beyond the initial estimate requires <span className="font-semibold text-foreground">written or verbal approval from the customer</span> before proceeding. We will contact you immediately if additional work is needed.
                </p>
              </div>
            </div>
          </div>

          {/* Service Policies */}
          <div className="bg-gradient-metallic border-2 border-border rounded-lg p-8 glow-orange">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-orbitron text-2xl font-bold mb-2">
                  Service Policies & Terms
                </h3>
                <p className="text-muted-foreground">Your rights and our commitment to service</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-background/50 rounded p-4 border border-border/50">
                <p className="font-orbitron font-bold text-primary mb-2">📅 Scheduling & Cancellations</p>
                <ul className="text-muted-foreground text-sm space-y-2">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Service calls are scheduled within a 2-hour window</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Cancellations must be made <span className="font-semibold text-foreground">24 hours in advance</span> to avoid service fees</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Same-day emergency service available (subject to availability and additional fees)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-background/50 rounded p-4 border border-border/50">
                <p className="font-orbitron font-bold text-primary mb-2">💳 Payment Terms</p>
                <ul className="text-muted-foreground text-sm space-y-2">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Payment accepted at time of service completion</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>We accept cash, credit cards, checks, and digital payments</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Invoices provided for all services rendered</span>
                  </li>
                </ul>
              </div>

              <div className="bg-background/50 rounded p-4 border border-border/50">
                <p className="font-orbitron font-bold text-primary mb-2">🔧 Warranty & Liability</p>
                <ul className="text-muted-foreground text-sm space-y-2">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>All labor covered by our 6-month warranty (see Warranty section for details)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>We are not responsible for pre-existing damage or manufacturer defects</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Vehicle safety rests with the owner. Always verify work quality before leaving.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-background/50 rounded p-4 border border-border/50">
                <p className="font-orbitron font-bold text-primary mb-2">🚗 Vehicle Security</p>
                <ul className="text-muted-foreground text-sm space-y-2">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Vehicle is serviced at customer's location. Customer assumes responsibility for security.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>We recommend customers remain present during service</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Privacy & Communication */}
          <div className="bg-gradient-metallic border-2 border-border rounded-lg p-8 glow-orange">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-orbitron text-2xl font-bold mb-2">
                  Privacy & Communication
                </h3>
                <p className="text-muted-foreground">How we protect your information</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-background/50 rounded p-4 border border-border/50">
                <p className="font-orbitron font-bold text-primary mb-2">📱 Contact Information</p>
                <ul className="text-muted-foreground text-sm space-y-2">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Your information is used only for service scheduling and communication</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>We will never share your data with third parties without consent</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>You may opt out of marketing communications at any time</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Acceptance Statement */}
          <div className="bg-primary/10 border-2 border-primary/30 rounded-lg p-8 text-center">
            <h3 className="font-orbitron text-xl font-bold mb-4">By Using Our Services, You Agree To:</h3>
            <ul className="text-muted-foreground text-sm space-y-2 mb-6 text-left max-w-2xl mx-auto">
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>All estimates are labor-only unless specified otherwise</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Final pricing may vary based on vehicle condition and hidden issues</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Customer approval is required for work beyond the initial estimate</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>You have read and understood our warranty and service policies</span>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground italic">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
