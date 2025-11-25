"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { DataTable } from "@/components/admin/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, FileText, Clock, CheckCircle2, XCircle, Archive, ArchiveRestore, MoreVertical, TrendingUp, Users, Filter } from "lucide-react"
import { getApplications, getApplicationStats, updateApplicationStatus, Application, ApplicationStatus } from "@/lib/supabase/application-helpers"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ApplicationStatusBadge } from "@/components/admin/applications/application-status-badge"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function ApplicationsPage() {
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    completed: 0,
    archived: 0,
    accepted: 0,
    rejected: 0,
  })
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all")
  const [archivingId, setArchivingId] = useState<string | null>(null)

  useEffect(() => {
    loadApplications()
    loadStats()
  }, [statusFilter])

  const loadApplications = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Limiter à 50 candidatures par défaut pour améliorer les performances
      const { data, error: err } = await getApplications({
        status: statusFilter !== "all" ? statusFilter : undefined,
        limit: 50, // Limiter pour améliorer les performances sur mobile
      })

      if (err) {
        setError(err.message || "Erreur lors du chargement des candidatures")
        return
      }

      setApplications(data || [])
    } catch (err: any) {
      setError(err.message || "Erreur inattendue")
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    const { data } = await getApplicationStats()
    if (data) {
      setStats(data)
    }
  }

  const handleArchive = async (id: string, archive: boolean) => {
    try {
      setArchivingId(id)
      const newStatus: ApplicationStatus = archive ? "archived" : "pending"
      const { error } = await updateApplicationStatus(id, newStatus)

      if (error) {
        toast.error("Erreur", {
          description: error.message || "Impossible d'archiver la candidature",
        })
        return
      }

      toast.success(archive ? "Candidature archivée" : "Candidature désarchivée", {
        description: archive
          ? "La candidature a été archivée avec succès"
          : "La candidature a été restaurée avec succès",
      })

      await loadApplications()
      await loadStats()
    } catch (err: any) {
      toast.error("Erreur", {
        description: err.message || "Erreur inattendue",
      })
    } finally {
      setArchivingId(null)
    }
  }

  const columns = [
    {
      key: "candidate",
      header: "Candidat",
      render: (row: Application) => {
        const formData = row.form_data
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center text-white font-semibold text-sm shadow-md">
              {formData?.firstName?.[0]}{formData?.lastName?.[0]}
            </div>
            <div>
              <div className="font-semibold text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors">
                {formData?.firstName} {formData?.lastName}
              </div>
              <div className="text-sm text-[#737373]">{formData?.email}</div>
            </div>
          </div>
        )
      },
    },
    {
      key: "program",
      header: "Programme",
      render: (row: Application) => {
        const program = row.form_data?.program
        const programLabels: Record<string, string> = {
          resident: "Résident",
          external: "Externe",
          girls: "Filles",
          elite: "Élite",
        }
        return (
          <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700">
            {programLabels[program || ""] || program}
          </Badge>
        )
      },
    },
    {
      key: "position",
      header: "Position",
      render: (row: Application) => {
        const position = row.form_data?.position
        return <span className="text-[#1A1A1A] font-medium">{position || "N/A"}</span>
      },
    },
    {
      key: "status",
      header: "Statut",
      render: (row: Application) => <ApplicationStatusBadge status={row.status} decision={row.form_data?.decision} />,
    },
    {
      key: "date",
      header: "Date",
      render: (row: Application) => (
        <div className="flex flex-col">
          <span className="text-[#1A1A1A] font-medium text-sm">
            {format(new Date(row.created_at), "dd MMM yyyy")}
          </span>
          <span className="text-xs text-[#737373]">
            {format(new Date(row.created_at), "HH:mm")}
          </span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: Application) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/admin/candidatures/${row.id}`)
            }}
            className="text-[#D4AF37] hover:text-white hover:bg-[#D4AF37] transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Eye className="w-4 h-4 mr-2" />
            Voir
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => e.stopPropagation()}
                className="text-[#737373] hover:text-[#1A1A1A] hover:bg-gray-100 transition-all"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={async (e) => {
                  e.stopPropagation()
                  await handleArchive(row.id, row.status !== "archived")
                }}
                disabled={archivingId === row.id}
                className="cursor-pointer"
              >
                {row.status === "archived" ? (
                  <>
                    <ArchiveRestore className="w-4 h-4 mr-2" />
                    Désarchiver
                  </>
                ) : (
                  <>
                    <Archive className="w-4 h-4 mr-2" />
                    Archiver
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  const filterButtons = [
    { value: "all" as const, label: "Tous", icon: FileText, count: stats.total },
    { value: "pending" as const, label: "En attente", icon: Clock, count: stats.pending },
    { value: "reviewed" as const, label: "En cours", icon: Eye, count: stats.reviewed },
    { value: "archived" as const, label: "Archivées", icon: Archive, count: stats.archived },
  ]

  return (
    <AdminLayout>
      {/* Header avec gradient moderne */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-[#B8941F]/5 to-transparent rounded-2xl -z-10" />
        <div className="relative">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1A1A1A] to-[#4A4A4A] bg-clip-text text-transparent mb-3">
            Gestion des Candidatures
          </h1>
          <p className="text-[#737373] text-lg">Consultez et gérez toutes les candidatures reçues</p>
        </div>
      </div>

      {/* Stats Cards avec animations et gradients */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-white to-blue-50/50 border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#737373] flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {stats.total}
            </div>
            <p className="text-xs text-[#737373] mt-1">Candidatures</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-amber-50/50 border-l-4 border-l-amber-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#737373] flex items-center gap-2">
              <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              En attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              {stats.pending}
            </div>
            <p className="text-xs text-[#737373] mt-1">À traiter</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-emerald-50/50 border-l-4 border-l-emerald-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#737373] flex items-center gap-2">
              <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              Acceptées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              {stats.accepted}
            </div>
            <p className="text-xs text-[#737373] mt-1">Validées</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-red-50/50 border-l-4 border-l-red-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#737373] flex items-center gap-2">
              <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                <XCircle className="w-4 h-4 text-red-600" />
              </div>
              Rejetées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              {stats.rejected}
            </div>
            <p className="text-xs text-[#737373] mt-1">Refusées</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50/50 border-l-4 border-l-gray-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#737373] flex items-center gap-2">
              <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                <Archive className="w-4 h-4 text-gray-600" />
              </div>
              Archivées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
              {stats.archived}
            </div>
            <p className="text-xs text-[#737373] mt-1">Stockées</p>
          </CardContent>
        </Card>
      </div>

      {/* Applications Table avec filtres modernes */}
      <Card className="bg-white shadow-xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-[#1A1A1A] mb-1">Liste des Candidatures</CardTitle>
              <CardDescription className="text-[#737373]">Recherchez, filtrez et gérez les candidatures</CardDescription>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {filterButtons.map((filter) => {
                const Icon = filter.icon
                const isActive = statusFilter === filter.value
                return (
                  <Button
                    key={filter.value}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter(filter.value)}
                    className={cn(
                      "transition-all duration-200 shadow-sm hover:shadow-md",
                      isActive
                        ? "bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white border-0 shadow-md"
                        : "hover:bg-gray-50 border-gray-200"
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {filter.label}
                    {filter.count > 0 && (
                      <Badge
                        variant="secondary"
                        className={cn(
                          "ml-2 px-1.5 py-0",
                          isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                        )}
                      >
                        {filter.count}
                      </Badge>
                    )}
                  </Button>
                )
              })}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-flex items-center gap-3">
                <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                <p className="text-[#737373] text-lg font-medium">Chargement des candidatures...</p>
              </div>
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-red-600 mb-4 font-medium">{error}</p>
              <Button onClick={loadApplications} variant="outline" size="sm" className="shadow-sm">
                Réessayer
              </Button>
            </div>
          ) : applications.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Aucune candidature trouvée</h3>
              <p className="text-[#737373] mb-6 max-w-md mx-auto">
                {statusFilter === "all"
                  ? "Il n'y a pas encore de candidatures dans le système."
                  : `Aucune candidature avec le statut "${filterButtons.find((f) => f.value === statusFilter)?.label}" pour le moment.`}
              </p>
              {statusFilter !== "all" && (
                <Button
                  onClick={() => setStatusFilter("all")}
                  variant="outline"
                  className="shadow-sm hover:shadow-md transition-shadow"
                >
                  Voir toutes les candidatures
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-hidden">
              <DataTable
                data={applications}
                columns={columns}
                searchPlaceholder="Rechercher un candidat, email, programme..."
                onRowClick={(row) => router.push(`/admin/candidatures/${row.id}`)}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
