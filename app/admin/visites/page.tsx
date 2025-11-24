"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { DataTable } from "@/components/admin/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Calendar, Clock, CheckCircle2, XCircle, Archive, ArchiveRestore, MoreVertical, Users, Filter, MapPin, User } from "lucide-react"
import { getFormSubmissions } from "@/lib/supabase/form-submissions-helpers"
import { supabase } from "@/lib/supabase/client"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"

type VisitStatus = "pending" | "reviewed" | "completed" | "archived"

interface Visit {
  id: string
  form_type: string
  form_data: {
    visitorType?: string
    fullName?: string
    parentName?: string
    organization?: string
    organizationName?: string
    playerName?: string
    playerAge?: number | string
    email?: string
    phone?: string
    program?: string
    visitDate?: string
    visitTime?: string
    arrivalTime?: string
    message?: string
    [key: string]: any // Permet d'accepter d'autres propriétés
  }
  status: VisitStatus
  user_id: string | null
  created_at: string
  updated_at: string
}

export default function VisitesPage() {
  const router = useRouter()
  const [visits, setVisits] = useState<Visit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    completed: 0,
    archived: 0,
  })
  const [statusFilter, setStatusFilter] = useState<VisitStatus | "all">("all")
  const [archivingId, setArchivingId] = useState<string | null>(null)

  useEffect(() => {
    loadVisits()
    loadStats()
  }, [statusFilter])

  const loadVisits = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error: err } = await getFormSubmissions({
        formType: "visite_ffa",
        status: statusFilter !== "all" ? statusFilter : undefined,
      })

      if (err) {
        setError(err.message || "Erreur lors du chargement des visites")
        return
      }

      // S'assurer que form_data est parsé correctement
      const visitsData = (data || []).map((visit: any) => ({
        ...visit,
        form_data: typeof visit.form_data === 'string' 
          ? JSON.parse(visit.form_data) 
          : (visit.form_data || {}),
      }))

      console.log("Visites chargées:", visitsData)
      setVisits(visitsData as Visit[])
    } catch (err: any) {
      setError(err.message || "Erreur inattendue")
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const { data, error: err } = await getFormSubmissions({
        formType: "visite_ffa",
      })

      if (err || !data) return

      const visits = data as Visit[]
      setStats({
        total: visits.length,
        pending: visits.filter((v) => v.status === "pending").length,
        reviewed: visits.filter((v) => v.status === "reviewed").length,
        completed: visits.filter((v) => v.status === "completed").length,
        archived: visits.filter((v) => v.status === "archived").length,
      })
    } catch (err) {
      console.error("Erreur lors du chargement des stats:", err)
    }
  }

  const handleStatusUpdate = async (id: string, newStatus: VisitStatus) => {
    try {
      const { error } = await supabase
        .from("form_submissions")
        .update({ status: newStatus })
        .eq("id", id)

      if (error) {
        toast.error("Erreur", {
          description: error.message || "Impossible de mettre à jour le statut",
        })
        return
      }

      toast.success("Statut mis à jour", {
        description: `La visite a été marquée comme ${newStatus === "pending" ? "en attente" : newStatus === "reviewed" ? "en cours de traitement" : newStatus === "completed" ? "complétée" : "archivée"}`,
      })

      await loadVisits()
      await loadStats()
    } catch (err: any) {
      toast.error("Erreur", {
        description: err.message || "Erreur inattendue",
      })
    }
  }

  const handleArchive = async (id: string, archive: boolean) => {
    await handleStatusUpdate(id, archive ? "archived" : "pending")
  }

  const getStatusBadge = (status: VisitStatus) => {
    const variants: Record<VisitStatus, { label: string; className: string }> = {
      pending: {
        label: "En attente",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      reviewed: {
        label: "En cours",
        className: "bg-blue-100 text-blue-800 border-blue-200",
      },
      completed: {
        label: "Complétée",
        className: "bg-green-100 text-green-800 border-green-200",
      },
      archived: {
        label: "Archivée",
        className: "bg-gray-100 text-gray-800 border-gray-200",
      },
    }

    const variant = variants[status]
    return (
      <Badge
        variant="outline"
        className={cn("font-semibold", variant.className)}
      >
        {variant.label}
      </Badge>
    )
  }

  const getVisitorTypeLabel = (type?: string) => {
    const labels: Record<string, string> = {
      parent: "Parent",
      collaborateur: "Collaborateur",
      joueur: "Joueur",
      media: "Média",
      investisseur: "Investisseur",
      autre: "Autre",
    }
    return labels[type || ""] || type || "N/A"
  }

  const columns = [
    {
      key: "visitorType",
      header: "Type",
      render: (visit: Visit) => {
        const type = visit.form_data?.visitorType
        return (
          <Badge variant="outline" className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30">
            {getVisitorTypeLabel(type)}
          </Badge>
        )
      },
    },
    {
      key: "visitor",
      header: "Visiteur",
      render: (visit: Visit) => {
        const name = visit.form_data?.fullName || visit.form_data?.parentName || "N/A"
        const organization = visit.form_data?.organizationName || visit.form_data?.organization
        return (
          <div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="font-medium">{name}</span>
            </div>
            {organization && (
              <div className="text-sm text-gray-500 mt-1">{organization}</div>
            )}
          </div>
        )
      },
    },
    {
      key: "player",
      header: "Joueur",
      render: (visit: Visit) => {
        const playerName = visit.form_data?.playerName
        const playerAge = visit.form_data?.playerAge
        if (!playerName) return <span className="text-gray-400">-</span>
        return (
          <div>
            <div className="font-medium">{playerName}</div>
            {playerAge && (
              <div className="text-sm text-gray-500">{playerAge} ans</div>
            )}
          </div>
        )
      },
    },
    {
      key: "contact",
      header: "Contact",
      render: (visit: Visit) => {
        return (
          <div className="text-sm">
            <div className="text-gray-900">{visit.form_data?.email || "N/A"}</div>
            <div className="text-gray-500">{visit.form_data?.phone || ""}</div>
          </div>
        )
      },
    },
    {
      key: "visitDate",
      header: "Date de visite",
      render: (visit: Visit) => {
        const date = visit.form_data?.visitDate
        const time = visit.form_data?.visitTime || visit.form_data?.arrivalTime
        return (
          <div className="text-sm">
            {date ? (
              <div className="flex items-center gap-1 text-gray-900">
                <Calendar className="w-4 h-4" />
                {format(new Date(date), "dd/MM/yyyy", { locale: fr })}
              </div>
            ) : (
              <span className="text-gray-400">Non spécifiée</span>
            )}
            {time && (
              <div className="flex items-center gap-1 text-gray-500 mt-1">
                <Clock className="w-4 h-4" />
                {time}
              </div>
            )}
          </div>
        )
      },
    },
    {
      key: "program",
      header: "Programme",
      render: (visit: Visit) => {
        const program = visit.form_data?.program
        const programLabels: Record<string, string> = {
          internat: "Internat",
          external: "Externe",
          resident: "Résident",
        }
        return (
          <Badge variant="outline" className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30">
            {programLabels[program || ""] || program || "N/A"}
          </Badge>
        )
      },
    },
    {
      key: "status",
      header: "Statut",
      render: (visit: Visit) => {
        return getStatusBadge(visit.status)
      },
    },
    {
      key: "created_at",
      header: "Date de demande",
      render: (visit: Visit) => {
        return (
          <div className="text-sm text-gray-500">
            {format(new Date(visit.created_at), "dd/MM/yyyy HH:mm", { locale: fr })}
          </div>
        )
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (visit: Visit) => {
        const isArchived = visit.status === "archived"

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`/admin/visites/${visit.id}`)
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                Voir les détails
              </DropdownMenuItem>
              {visit.status === "pending" && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    handleStatusUpdate(visit.id, "reviewed")
                  }}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Marquer comme en cours
                </DropdownMenuItem>
              )}
              {visit.status === "reviewed" && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    handleStatusUpdate(visit.id, "completed")
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Marquer comme complétée
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  handleArchive(visit.id, !isArchived)
                }}
              >
                {isArchived ? (
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
        )
      },
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Gestion des Visites</h1>
          <p className="text-muted-foreground">
            Gérez toutes les demandes de visite de l'académie
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En cours</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.reviewed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Complétées</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Archivées</CardTitle>
              <Archive className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{stats.archived}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                size="sm"
              >
                <Filter className="w-4 h-4 mr-2" />
                Toutes
              </Button>
              <Button
                variant={statusFilter === "pending" ? "default" : "outline"}
                onClick={() => setStatusFilter("pending")}
                size="sm"
              >
                En attente ({stats.pending})
              </Button>
              <Button
                variant={statusFilter === "reviewed" ? "default" : "outline"}
                onClick={() => setStatusFilter("reviewed")}
                size="sm"
              >
                En cours ({stats.reviewed})
              </Button>
              <Button
                variant={statusFilter === "completed" ? "default" : "outline"}
                onClick={() => setStatusFilter("completed")}
                size="sm"
              >
                Complétées ({stats.completed})
              </Button>
              <Button
                variant={statusFilter === "archived" ? "default" : "outline"}
                onClick={() => setStatusFilter("archived")}
                size="sm"
              >
                Archivées ({stats.archived})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des Visites</CardTitle>
            <CardDescription>
              {visits.length} visite{visits.length > 1 ? "s" : ""} trouvée{visits.length > 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
                  <p className="text-gray-600">Chargement des visites...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={loadVisits} variant="outline">
                  Réessayer
                </Button>
              </div>
            ) : visits.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucune visite trouvée</p>
              </div>
            ) : (
              <DataTable 
                columns={columns} 
                data={visits} 
                searchPlaceholder="Rechercher une visite..."
                onRowClick={(visit) => router.push(`/admin/visites/${visit.id}`)}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

