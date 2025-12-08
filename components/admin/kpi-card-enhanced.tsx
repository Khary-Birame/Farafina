"use client"

import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface KPICardEnhancedProps {
  title: string
  value: string | number
  change?: {
    value: string | number
    type: "increase" | "decrease" | "neutral"
    period?: string
  }
  icon: LucideIcon
  iconColor?: string
  borderColor?: string
  description?: string
  sparkline?: number[] // Mini graphique de tendance
  loading?: boolean
  onClick?: () => void
  children?: ReactNode
}

export function KPICardEnhanced({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-[#D4AF37]",
  borderColor = "border-l-[#D4AF37]",
  description,
  sparkline,
  loading = false,
  onClick,
  children,
}: KPICardEnhancedProps) {
  const getChangeIcon = () => {
    if (!change) return null
    switch (change.type) {
      case "increase":
        return <TrendingUp className="w-3 h-3" />
      case "decrease":
        return <TrendingDown className="w-3 h-3" />
      default:
        return <Minus className="w-3 h-3" />
    }
  }

  const getChangeColor = () => {
    if (!change) return ""
    switch (change.type) {
      case "increase":
        return "text-[#10B981]"
      case "decrease":
        return "text-[#EF4444]"
      default:
        return "text-[#6B7280]"
    }
  }

  return (
    <div className="h-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Card
        className={cn(
          "border-l-4 bg-white shadow-md hover:shadow-xl transition-all duration-300 h-full",
          "group cursor-pointer hover:-translate-y-1",
          borderColor,
          onClick && "hover:border-l-[#D4AF37]"
        )}
        onClick={onClick}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#6B7280] mb-1 truncate">{title}</p>
              {loading ? (
                <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
              ) : (
                <div className="flex items-baseline gap-2 flex-wrap">
                  <p className="text-3xl font-bold text-[#1A1A1A] font-display">{value}</p>
                  {change && (
                    <span
                      className={cn(
                        "text-sm font-semibold flex items-center gap-1",
                        getChangeColor()
                      )}
                    >
                      {getChangeIcon()}
                      {change.type === "increase" && "+"}
                      {change.value}
                      {typeof change.value === "string" && !change.value.includes("%") && "%"}
                      {change.period && (
                        <span className="text-xs text-[#9CA3AF] ml-1">
                          {change.period}
                        </span>
                      )}
                    </span>
                  )}
                </div>
              )}
              {description && (
                <p className="text-xs text-[#9CA3AF] mt-2">{description}</p>
              )}
            </div>
            <div
              className={cn(
                "p-3 rounded-xl bg-gradient-to-br transition-all duration-300",
                "group-hover:scale-110 group-hover:rotate-3",
                iconColor === "text-[#D4AF37]" && "from-[#D4AF37]/20 to-[#E8C966]/20",
                iconColor === "text-[#10B981]" && "from-[#10B981]/20 to-[#34D399]/20",
                iconColor === "text-[#EF4444]" && "from-[#EF4444]/20 to-[#F87171]/20",
                iconColor === "text-[#3B82F6]" && "from-[#3B82F6]/20 to-[#60A5FA]/20",
                iconColor === "text-[#F59E0B]" && "from-[#F59E0B]/20 to-[#FBBF24]/20"
              )}
            >
              <Icon className={cn("w-6 h-6", iconColor)} />
            </div>
          </div>

          {/* Sparkline */}
          {sparkline && sparkline.length > 0 && (
            <div className="mt-4 h-12 flex items-end gap-0.5">
              {sparkline.map((point, index) => {
                const max = Math.max(...sparkline)
                const height = (point / max) * 100
                return (
                  <div
                    key={index}
                    className={cn(
                      "flex-1 rounded-t transition-all duration-300 animate-in slide-in-from-bottom",
                      change?.type === "increase" && "bg-[#10B981]/30",
                      change?.type === "decrease" && "bg-[#EF4444]/30",
                      !change && "bg-[#D4AF37]/30"
                    )}
                    style={{
                      height: `${height}%`,
                      animationDelay: `${index * 50}ms`,
                    }}
                  />
                )
              })}
            </div>
          )}

          {/* Children content */}
          {children && <div className="mt-4">{children}</div>}
        </CardContent>
      </Card>
    </div>
  )
}

