import * as React from "react"

interface ThemedSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  statusType?: "work-order" | "invoice" | "booking"
}

const StatusColorMap: Record<string, Record<string, string>> = {
  "work-order": {
    pending: "bg-blue-500/20 text-blue-300",
    in_progress: "bg-orange-500/20 text-orange-300",
    completed: "bg-green-500/20 text-green-300",
    cancelled: "bg-red-500/20 text-red-300",
  },
  invoice: {
    draft: "bg-gray-500/20 text-gray-300",
    sent: "bg-blue-500/20 text-blue-300",
    paid: "bg-green-500/20 text-green-300",
    partial: "bg-yellow-500/20 text-yellow-300",
    overdue: "bg-red-500/20 text-red-300",
  },
  booking: {
    pending: "bg-blue-500/20 text-blue-300",
    confirmed: "bg-indigo-500/20 text-indigo-300",
    in_progress: "bg-orange-500/20 text-orange-300",
    completed: "bg-green-500/20 text-green-300",
    cancelled: "bg-red-500/20 text-red-300",
  },
}

const ThemedSelect = React.forwardRef<HTMLSelectElement, ThemedSelectProps>(
  ({ className, statusType = "work-order", value, ...props }, ref) => {
    const colorMap = StatusColorMap[statusType] || StatusColorMap["work-order"]
    const statusColor = colorMap[String(value)] || "bg-gray-500/20 text-gray-300"

    return (
      <select
        ref={ref}
        value={value}
        className={`
          px-3 py-1.5 rounded-full text-xs font-rajdhani font-medium 
          border border-border/40 focus:border-primary/60
          focus:outline-none focus:ring-1 focus:ring-primary/30
          cursor-pointer transition-all
          bg-background/40 backdrop-blur-sm
          ${statusColor}
          ${className}
        `}
        {...props}
      />
    )
  }
)
ThemedSelect.displayName = "ThemedSelect"

export { ThemedSelect }
