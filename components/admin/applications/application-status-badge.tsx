"use client"

import { Badge } from "@/components/ui/badge"
import { ApplicationStatus, ApplicationDecision } from "@/lib/supabase/application-helpers"
import { Clock, Eye, CheckCircle2, XCircle, Archive } from "lucide-react"

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
        className: "bg-[#10B981] hover:bg-[#059669] text-white",
        icon: CheckCircle2,
      }
    }

    if (decision === "rejected") {
      return {
        label: "Rejetée",
        variant: "destructive" as const,
        className: "bg-[#EF4444] hover:bg-[#DC2626] text-white",
        icon: XCircle,
      }
    }

    switch (status) {
      case "pending":
        return {
          label: "En attente",
          variant: "secondary" as const,
          className: "bg-[#F59E0B] hover:bg-[#D97706] text-white",
          icon: Clock,
        }
      case "reviewed":
        return {
          label: "En cours",
          variant: "secondary" as const,
          className: "bg-[#3B82F6] hover:bg-[#2563EB] text-white",
          icon: Eye,
        }
      case "completed":
        return {
          label: "Terminée",
          variant: "secondary" as const,
          className: "bg-[#6B7280] hover:bg-[#4B5563] text-white",
          icon: CheckCircle2,
        }
      case "archived":
        return {
          label: "Archivée",
          variant: "outline" as const,
          className: "bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#6B7280]",
          icon: Archive,
        }
      default:
        return {
          label: status,
          variant: "secondary" as const,
          className: "bg-[#F3F4F6] text-[#6B7280]",
          icon: Clock,
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={config.className}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  )
}

