import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface StatusSelectProps extends React.ComponentPropsWithoutRef<typeof Select> {
  statusType?: "work-order" | "invoice" | "booking";
  onValueChange?: (value: string) => void;
}

const statusColorMap = {
  "work-order": {
    pending: {
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      item: "text-blue-300 focus:bg-blue-500/20 focus:text-blue-300",
    },
    in_progress: {
      badge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      item: "text-orange-300 focus:bg-orange-500/20 focus:text-orange-300",
    },
    completed: {
      badge: "bg-green-500/20 text-green-300 border-green-500/30",
      item: "text-green-300 focus:bg-green-500/20 focus:text-green-300",
    },
    cancelled: {
      badge: "bg-red-500/20 text-red-300 border-red-500/30",
      item: "text-red-300 focus:bg-red-500/20 focus:text-red-300",
    },
  },
  invoice: {
    draft: {
      badge: "bg-gray-500/20 text-gray-300 border-gray-500/30",
      item: "text-gray-300 focus:bg-gray-500/20 focus:text-gray-300",
    },
    sent: {
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      item: "text-blue-300 focus:bg-blue-500/20 focus:text-blue-300",
    },
    paid: {
      badge: "bg-green-500/20 text-green-300 border-green-500/30",
      item: "text-green-300 focus:bg-green-500/20 focus:text-green-300",
    },
    partial: {
      badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      item: "text-yellow-300 focus:bg-yellow-500/20 focus:text-yellow-300",
    },
    overdue: {
      badge: "bg-red-500/20 text-red-300 border-red-500/30",
      item: "text-red-300 focus:bg-red-500/20 focus:text-red-300",
    },
  },
  booking: {
    pending: {
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      item: "text-blue-300 focus:bg-blue-500/20 focus:text-blue-300",
    },
    confirmed: {
      badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      item: "text-indigo-300 focus:bg-indigo-500/20 focus:text-indigo-300",
    },
    in_progress: {
      badge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      item: "text-orange-300 focus:bg-orange-500/20 focus:text-orange-300",
    },
    completed: {
      badge: "bg-green-500/20 text-green-300 border-green-500/30",
      item: "text-green-300 focus:bg-green-500/20 focus:text-green-300",
    },
    cancelled: {
      badge: "bg-red-500/20 text-red-300 border-red-500/30",
      item: "text-red-300 focus:bg-red-500/20 focus:text-red-300",
    },
  },
};

const displayNames: Record<string, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
  draft: "Draft",
  sent: "Sent",
  paid: "Paid",
  partial: "Partial",
  overdue: "Overdue",
  confirmed: "Confirmed",
};

const StatusSelect = React.forwardRef<
  React.ElementRef<typeof Select>,
  StatusSelectProps
>(({ statusType = "work-order", value, onValueChange, className, ...props }, ref) => {
  const colorMap = statusColorMap[statusType];
  const currentStatus = (value as string) || "pending";
  const badgeColor = colorMap[currentStatus as keyof typeof colorMap]?.badge || "bg-gray-500/20 text-gray-300 border-gray-500/30";

  return (
    <Select value={currentStatus} onValueChange={onValueChange} {...props}>
      <SelectTrigger
        className={cn(
          "px-3 py-1.5 rounded-full text-xs font-rajdhani font-medium",
          "border focus:outline-none focus:ring-1",
          "bg-background/40 backdrop-blur-sm",
          "cursor-pointer transition-all",
          badgeColor,
          className,
        )}
      >
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent className="bg-card/95 backdrop-blur-sm border-border/50">
        {Object.entries(colorMap).map(([statusKey, colorClass]) => (
          <SelectItem
            key={statusKey}
            value={statusKey}
            className={cn(
              "py-2 px-3 rounded-sm cursor-pointer",
              "hover:bg-background/50 focus:bg-background/50",
              "text-sm font-rajdhani font-medium",
              colorClass.item,
            )}
          >
            {displayNames[statusKey] || statusKey}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

StatusSelect.displayName = "StatusSelect";

export { StatusSelect };
