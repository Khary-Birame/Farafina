"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Clock,
  User,
  Users,
  MapPin,
  CheckCircle2,
  XCircle,
  Archive,
  ArchiveRestore,
  Save,
  MessageSquare,
  UserCircle,
} from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
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
    playerName?: string
    playerAge?: number | string
    email?: string
    phone?: string
    program?: string
    visitDate?: string
    visitTime?: string
    arrivalTime?: string
    message?: string
  }
  status: VisitStatus
  user_id: string | null
  created_at: string
  updated_at: string
}

export default function VisitDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [visit, setVisit] = useState<Visit | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<VisitStatus>("pending")

  useEffect(() => {
    if (id) {
      loadVisit()
    }
  }, [id])

  const loadVisit = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error: err } = await supabase
        .from("form_submissions")
        .select("*")
        .eq("id", id)
        .eq("form_type", "visite_ffa")
        .single()

      if (err) {
        setError(err.message || "Erreur lors du chargement de la visite")
        return
      }

      if (!data) {
        setError("Visite non trouvée")
        return
      }

      setVisit(data as Visit)
      setSelectedStatus(data.status as VisitStatus)
    } catch (err: any) {
      setError(err.message || "Erreur inattendue")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async () => {
    if (!visit) return

    try {
      setUpdating(true)
      const { error: err } = await supabase
        .from("form_submissions")
        .update({ status: selectedStatus })
        .eq("id", visit.id)

      if (err) {
        toast.error("Erreur", {
          description: err.message || "Impossible de mettre à jour le statut",
        })
        return
      }

      toast.success("Statut mis à jour", {
        description: `La visite a été marquée comme ${getStatusLabel(selectedStatus)}`,
      })

      await loadVisit()
    } catch (err: any) {
      toast.error("Erreur", {
        description: err.message || "Erreur inattendue",
      })
    } finally {
      setUpdating(false)
    }
  }

  const handleArchive = async (archive: boolean) => {
    if (!visit) return
    const newStatus: VisitStatus = archive ? "archived" : "pending"
    setSelectedStatus(newStatus)
    await handleStatusUpdate()
  }

  const getStatusLabel = (status: VisitStatus) => {
    const labels: Record<VisitStatus, string> = {
      pending: "en attente",
      reviewed: "en cours de traitement",
      completed: "complétée",
      archived: "archivée",
    }
    return labels[status]
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

  const programLabels: Record<string, string> = {
    internat: "Internat",
    external: "Externe",
    resident: "Résident",
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de la visite...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error || !visit) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error || "Visite non trouvée"}</p>
          <Button onClick={() => router.push("/admin/visites")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste
          </Button>
        </div>
      </AdminLayout>
    )
  }

  const getVisitorTypeLabel = (type?: string) => {
    const labels: Record<string, string> = {
      parent: "Parent",
      collaborateur: "Collaborateur/Partenaire",
      joueur: "Joueur (adulte)",
      media: "Média/Journaliste",
      investisseur: "Investisseur",
      autre: "Autre",
    }
    return labels[type || ""] || type || "N/A"
  }

  const formData = visit.form_data
  const fullName = formData.fullName || formData.parentName || "N/A"
  const playerName = formData.playerName
  const program = formData.program ? (programLabels[formData.program] || formData.program) : "N/A"

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={() => router.push("/admin/visites")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la liste
            </Button>
            <h1 className="text-3xl font-bold">Détails de la Visite</h1>
            <p className="text-muted-foreground">
              Demande de visite de {fullName}
              {formData.visitorType && ` (${getVisitorTypeLabel(formData.visitorType)})`}
            </p>
          </div>
          {getStatusBadge(visit.status)}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Type de Visiteur */}
          {formData.visitorType && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5" />
                  Type de Visiteur
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30 text-base px-4 py-2">
                  {getVisitorTypeLabel(formData.visitorType)}
                </Badge>
              </CardContent>
            </Card>
          )}

          {/* Informations Personnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informations Personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-gray-500">Nom complet</Label>
                <p className="font-medium">{fullName}</p>
              </div>
              {formData.organization && (
                <div>
                  <Label className="text-sm text-gray-500">Organisation</Label>
                  <p className="font-medium">{formData.organization}</p>
                </div>
              )}
              <div>
                <Label className="text-sm text-gray-500 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <a
                  href={`mailto:${formData.email}`}
                  className="text-[#D4AF37] hover:underline"
                >
                  {formData.email || "N/A"}
                </a>
              </div>
              <div>
                <Label className="text-sm text-gray-500 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Téléphone
                </Label>
                <a
                  href={`tel:${formData.phone}`}
                  className="text-[#D4AF37] hover:underline"
                >
                  {formData.phone || "N/A"}
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Informations du Joueur (conditionnel) */}
          {formData.visitorType === "parent" && playerName && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Informations du Joueur
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-500">Nom du joueur</Label>
                  <p className="font-medium">{playerName}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Âge</Label>
                  <p className="font-medium">
                    {formData.playerAge ? `${formData.playerAge} ans` : "N/A"}
                  </p>
                </div>
                {formData.program && (
                  <div>
                    <Label className="text-sm text-gray-500">Programme</Label>
                    <Badge variant="outline" className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30 mt-1">
                      {program}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Détails de la Visite */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Détails de la Visite
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-gray-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date souhaitée
                </Label>
                <p className="font-medium">
                  {formData.visitDate
                    ? format(new Date(formData.visitDate), "EEEE d MMMM yyyy", {
                        locale: fr,
                      })
                    : "Non spécifiée"}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-500 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Créneau horaire
                </Label>
                <p className="font-medium">
                  {formData.visitTime || formData.arrivalTime || "Non spécifié"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Message / Précisions */}
          {formData.message && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Message / Précisions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{formData.message}</p>
              </CardContent>
            </Card>
          )}

          {/* Métadonnées */}
          <Card>
            <CardHeader>
              <CardTitle>Métadonnées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-gray-500">Date de demande</Label>
                <p className="font-medium">
                  {format(new Date(visit.created_at), "dd/MM/yyyy à HH:mm", {
                    locale: fr,
                  })}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Dernière mise à jour</Label>
                <p className="font-medium">
                  {format(new Date(visit.updated_at), "dd/MM/yyyy à HH:mm", {
                    locale: fr,
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Gestion du Statut */}
          <Card>
            <CardHeader>
              <CardTitle>Gestion du Statut</CardTitle>
              <CardDescription>
                Modifiez le statut de cette visite
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Statut</Label>
                <Select
                  value={selectedStatus}
                  onValueChange={(value) => setSelectedStatus(value as VisitStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="reviewed">En cours</SelectItem>
                    <SelectItem value="completed">Complétée</SelectItem>
                    <SelectItem value="archived">Archivée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleStatusUpdate}
                  disabled={updating || selectedStatus === visit.status}
                  className="flex-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {updating ? "Mise à jour..." : "Enregistrer"}
                </Button>
                {visit.status === "archived" ? (
                  <Button
                    onClick={() => handleArchive(false)}
                    variant="outline"
                    disabled={updating}
                  >
                    <ArchiveRestore className="w-4 h-4 mr-2" />
                    Désarchiver
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleArchive(true)}
                    variant="outline"
                    disabled={updating}
                  >
                    <Archive className="w-4 h-4 mr-2" />
                    Archiver
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

