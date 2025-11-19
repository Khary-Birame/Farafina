"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { DataTable } from "@/components/admin/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, FileText, Clock, CheckCircle2, XCircle, Archive, ArchiveRestore, MoreVertical } from "lucide-react"
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
      const { data, error: err } = await getApplications({
        status: statusFilter !== "all" ? statusFilter : undefined,
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

      // Recharger les données
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
          <div>
            <div className="font-medium text-[#1A1A1A]">
              {formData?.firstName} {formData?.lastName}
            </div>
            <div className="text-sm text-[#737373]">{formData?.email}</div>
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
        return <span className="text-[#1A1A1A]">{programLabels[program || ""] || program}</span>
      },
    },
    {
      key: "position",
      header: "Position",
      render: (row: Application) => {
        const position = row.form_data?.position
        return <span className="text-[#1A1A1A]">{position || "N/A"}</span>
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
        <span className="text-[#737373] text-sm">
          {format(new Date(row.created_at), "dd MMM yyyy")}
        </span>
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
            className="text-[#D4AF37] hover:text-[#B8941F] hover:bg-[#D4AF37]/10"
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
                className="text-[#737373] hover:text-[#1A1A1A]"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={async (e) => {
                  e.stopPropagation()
                  await handleArchive(row.id, row.status !== "archived")
                }}
                disabled={archivingId === row.id}
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

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Gestion des Candidatures</h1>
        <p className="text-[#737373]">Consultez et gérez toutes les candidatures reçues</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        <Card className="bg-white shadow-md border-l-4 border-l-[#3B82F6]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#737373] flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1A1A1A]">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-l-4 border-l-[#F59E0B]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#737373] flex items-center gap-2">
              <Clock className="w-4 h-4" />
              En attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1A1A1A]">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-l-4 border-l-[#10B981]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#737373] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Acceptées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1A1A1A]">{stats.accepted}</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-l-4 border-l-[#EF4444]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#737373] flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Rejetées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1A1A1A]">{stats.rejected}</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-l-4 border-l-[#6B7280]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#737373] flex items-center gap-2">
              <Archive className="w-4 h-4" />
              Archivées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1A1A1A]">{stats.archived}</div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Table */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#1A1A1A] font-semibold">Liste des Candidatures</CardTitle>
              <CardDescription className="text-[#737373]">Recherchez, filtrez et gérez les candidatures</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
                className={statusFilter === "all" ? "bg-[#D4AF37] hover:bg-[#B8941F] text-white" : ""}
              >
                Tous
              </Button>
              <Button
                variant={statusFilter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("pending")}
                className={statusFilter === "pending" ? "bg-[#D4AF37] hover:bg-[#B8941F] text-white" : ""}
              >
                En attente
              </Button>
              <Button
                variant={statusFilter === "reviewed" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("reviewed")}
                className={statusFilter === "reviewed" ? "bg-[#D4AF37] hover:bg-[#B8941F] text-white" : ""}
              >
                En cours
              </Button>
              <Button
                variant={statusFilter === "archived" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("archived")}
                className={statusFilter === "archived" ? "bg-[#D4AF37] hover:bg-[#B8941F] text-white" : ""}
              >
                Archivées
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-12 text-center">
              <p className="text-[#737373]">Chargement des candidatures...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="text-red-600 mb-2">Erreur: {error}</p>
              <Button onClick={loadApplications} variant="outline" size="sm">
                Réessayer
              </Button>
            </div>
          ) : applications.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="w-12 h-12 text-[#C0C0C0] mx-auto mb-4" />
              <p className="text-[#737373] mb-4">Aucune candidature trouvée</p>
            </div>
          ) : (
            <DataTable
              data={applications}
              columns={columns}
              searchPlaceholder="Rechercher un candidat..."
              onRowClick={(row) => router.push(`/admin/candidatures/${row.id}`)}
            />
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

