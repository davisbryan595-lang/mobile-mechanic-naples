import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminAuth } from "@/utils/auth";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("davisbryan595@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (adminAuth.validateCredentials(email, password)) {
      // Set auth token
      adminAuth.setAuthToken("admin_token_" + Date.now());
      // Redirect to dashboard
      navigate("/admin/dashboard");
    } else {
      setError("Incorrect credentials – try again");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/50 bg-card/80 backdrop-blur-sm shadow-lg">
        <div className="p-8">
          {/* Title */}
          <h1 className="text-3xl font-orbitron font-bold text-center mb-8 text-foreground">
            Admin Dashboard
            <span className="block text-lg font-rajdhani font-medium text-muted-foreground mt-2">
              Login
            </span>
          </h1>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/20 border border-destructive/50 rounded-md">
              <p className="text-destructive text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-rajdhani font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="davisbryan595@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-rajdhani font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary"
                required
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani font-bold text-base glow-orange"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Test Credentials Hint */}
          <div className="mt-8 pt-6 border-t border-border/30">
            <p className="text-xs text-muted-foreground text-center font-rajdhani">
              <strong>Test Credentials (Development Only):</strong>
              <br />
              Email: davisbryan595@gmail.com
              <br />
              Password: 1234566
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginAdmin;
