"use client"

import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: string | number
  change?: {
    value: string | number
    type: "increase" | "decrease" | "neutral"
  }
  icon: LucideIcon
  iconColor?: string
  borderColor?: string
  description?: string
}

export function KPICard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-[#D4AF37]",
  borderColor = "border-l-[#D4AF37]",
  description,
}: KPICardProps) {
  return (
    <Card className={cn("border-l-4 bg-white shadow-md hover:shadow-lg transition-shadow", borderColor)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-[#737373] mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-[#1A1A1A]">{value}</p>
              {change && (
                <span
                  className={cn(
                    "text-sm font-medium",
                    change.type === "increase" && "text-[#10B981]",
                    change.type === "decrease" && "text-[#EF4444]",
                    change.type === "neutral" && "text-[#737373]"
                  )}
                >
                  {change.type === "increase" && "+"}
                  {change.value}
                  {typeof change.value === "string" && change.value.includes("%") ? "" : "%"}
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-[#737373] mt-2">{description}</p>
            )}
          </div>
          <div className={cn("p-3 rounded-lg bg-gradient-to-br from-[#D4AF37]/20 to-[#E8C966]/20", iconColor)}>
            <Icon className={cn("w-6 h-6", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

