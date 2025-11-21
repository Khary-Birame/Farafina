"use client"

import { Badge } from "@/components/ui/badge"
import { ApplicationStatus, ApplicationDecision } from "@/lib/supabase/application-helpers"
import { Clock, Eye, CheckCircle2, XCircle, Archive } from "lucide-react"
import { cn } from "@/lib/utils"

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus
  decision?: ApplicationDecision
}

export function ApplicationStatusBadge({ status, decision }: ApplicationStatusBadgeProps) {
  const getStatusConfig = () => {
    if (decision === "accepted") {
      return {
        label: "Acceptée",
        variant: "default" as const,
        className: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200",
        icon: CheckCircle2,
        pulse: true,
      }
    }

    if (decision === "rejected") {
      return {
        label: "Rejetée",
        variant: "destructive" as const,
        className: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg transition-all duration-200",
        icon: XCircle,
        pulse: false,
      }
    }

    switch (status) {
      case "pending":
        return {
          label: "En attente",
          variant: "secondary" as const,
          className: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-200",
          icon: Clock,
          pulse: true,
        }
      case "reviewed":
        return {
          label: "En cours",
          variant: "secondary" as const,
          className: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200",
          icon: Eye,
          pulse: false,
        }
      case "completed":
        return {
          label: "Terminée",
          variant: "secondary" as const,
          className: "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-md hover:shadow-lg transition-all duration-200",
          icon: CheckCircle2,
          pulse: false,
        }
      case "archived":
        return {
          label: "Archivée",
          variant: "outline" as const,
          className: "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 border-gray-300 shadow-sm hover:shadow-md transition-all duration-200",
          icon: Archive,
          pulse: false,
        }
      default:
        return {
          label: status,
          variant: "secondary" as const,
          className: "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md hover:shadow-lg transition-all duration-200",
          icon: Clock,
          pulse: false,
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <Badge
      variant={config.variant}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 font-medium rounded-full",
        config.className,
        config.pulse && "animate-pulse"
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </Badge>
  )
}
