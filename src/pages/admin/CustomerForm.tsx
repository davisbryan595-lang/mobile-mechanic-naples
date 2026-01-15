import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const CustomerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id || id === "new";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Button
          onClick={() => navigate("/admin/dashboard")}
          variant="outline"
          size="sm"
          className="border-border/30"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Customers
        </Button>
        <h2 className="text-3xl font-orbitron font-bold text-foreground">
          {isNew ? "Add New Customer" : "Edit Customer"}
        </h2>
      </div>

      <Card className="border-border/30 bg-card/50 backdrop-blur-sm p-8 text-center">
        <p className="text-muted-foreground font-rajdhani mb-4">
          {isNew ? "Add a new customer" : `Edit customer ${id}`}
        </p>
        <p className="text-muted-foreground font-rajdhani text-sm">
          This page is under development. You can implement a form to create or edit customers here with fields like name, phone, email, address, customer type, lead source, and notes.
        </p>
      </Card>
    </div>
  );
};

export default CustomerForm;
