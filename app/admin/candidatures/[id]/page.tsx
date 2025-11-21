"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  FileText,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  MessageSquare,
  Save,
  Archive,
  ArchiveRestore,
  Play,
  Image as ImageIcon,
  FileCheck,
  Video,
  Sparkles,
  Star,
} from "lucide-react"
import {
  getApplicationById,
  updateApplicationStatus,
  addApplicationComment,
  Application,
  ApplicationStatus,
  ApplicationDecision,
} from "@/lib/supabase/application-helpers"
import { getSignedFileUrl, getFileInfo, listFilesInFolder } from "@/lib/supabase/file-helpers"
import { supabase } from "@/lib/supabase/client"
import { ApplicationStatusBadge } from "@/components/admin/applications/application-status-badge"
import { format } from "date-fns"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export default function ApplicationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>("pending")
  const [selectedDecision, setSelectedDecision] = useState<ApplicationDecision>(null)
  const [adminNotes, setAdminNotes] = useState("")
  const [newComment, setNewComment] = useState("")
  const [fileUrls, setFileUrls] = useState<Record<string, string>>({})
  const [loadingFiles, setLoadingFiles] = useState(false)

  useEffect(() => {
    if (id) {
      loadApplication()
    }
  }, [id])

  const loadApplication = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data, error: err } = await getApplicationById(id)

      if (err) {
        setError(err.message || "Erreur lors du chargement de la candidature")
        return
      }

      if (!data) {
        setError("Candidature non trouvée")
        return
      }

      setApplication(data)
      setSelectedStatus(data.status)
      setSelectedDecision((data.form_data as any)?.decision || null)
      setAdminNotes((data.form_data as any)?.admin_notes || "")
      
      await loadFileUrls(data)
    } catch (err: any) {
      setError(err.message || "Erreur inattendue")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async () => {
    if (!application) return

    try {
      setUpdating(true)
      const { data, error: err } = await updateApplicationStatus(
        application.id,
        selectedStatus,
        selectedDecision || undefined,
        adminNotes || undefined
      )

      if (err) {
        toast.error("Erreur", {
          description: err.message || "Impossible de mettre à jour le statut",
        })
        return
      }

      if (data) {
        setApplication(data)
        toast.success("Statut mis à jour", {
          description: "Le statut de la candidature a été mis à jour avec succès",
        })
      }
    } catch (err: any) {
      toast.error("Erreur", {
        description: err.message || "Erreur inattendue",
      })
    } finally {
      setUpdating(false)
    }
  }

  const handleArchive = async () => {
    if (!application) return

    const isArchiving = application.status !== "archived"
    const newStatus: ApplicationStatus = isArchiving ? "archived" : "pending"

    try {
      setUpdating(true)
      const { data, error: err } = await updateApplicationStatus(
        application.id,
        newStatus,
        undefined,
        undefined
      )

      if (err) {
        toast.error("Erreur", {
          description: err.message || "Impossible d'archiver la candidature",
        })
        return
      }

      if (data) {
        setApplication(data)
        setSelectedStatus(newStatus)
        toast.success(isArchiving ? "Candidature archivée" : "Candidature désarchivée", {
          description: isArchiving
            ? "La candidature a été archivée avec succès"
            : "La candidature a été restaurée avec succès",
        })
      }
    } catch (err: any) {
      toast.error("Erreur", {
        description: err.message || "Erreur inattendue",
      })
    } finally {
      setUpdating(false)
    }
  }

  const loadFileUrls = async (app: Application) => {
    if (!app) return
    
    setLoadingFiles(true)
    const formData = app.form_data as any
    const urls: Record<string, string> = {}
    
    try {
      const files = {
        photo: formData?.photo,
        birthCertificate: formData?.birthCertificate,
        medicalCertificate: formData?.medicalCertificate,
        video: formData?.video,
      }
      
      const applicationId = app.id
      
      for (const [key, urlOrPath] of Object.entries(files)) {
        if (!urlOrPath) continue
        
        try {
          if (!urlOrPath.startsWith("http") && urlOrPath.includes("/")) {
            const { url: signedUrl, error: signedUrlError } = await getSignedFileUrl(urlOrPath, 3600)
            if (!signedUrlError && signedUrl) {
              urls[key] = signedUrl
            }
          } else if (urlOrPath.startsWith("http")) {
            if (urlOrPath.includes("/storage/v1/object/public/")) {
              const pathMatch = urlOrPath.match(/\/storage\/v1\/object\/public\/applications\/(.+?)(\?|$)/)
              if (pathMatch && pathMatch[1]) {
                const extractedPath = decodeURIComponent(pathMatch[1])
                const { url: signedUrl, error: signedUrlError } = await getSignedFileUrl(extractedPath, 3600)
                if (!signedUrlError && signedUrl) {
                  urls[key] = signedUrl
                } else {
                  urls[key] = urlOrPath
                }
              } else {
                urls[key] = urlOrPath
              }
            } else {
              urls[key] = urlOrPath
            }
          }
        } catch (err: any) {
          console.error(`Erreur lors du chargement de l'URL pour ${key}:`, err)
        }
      }
      
      setFileUrls(urls)
    } catch (err) {
      console.error("Erreur lors du chargement des URLs de fichiers:", err)
    } finally {
      setLoadingFiles(false)
    }
  }

  const handleAddComment = async () => {
    if (!application || !newComment.trim()) return

    try {
      setUpdating(true)
      const { data, error: err } = await addApplicationComment(application.id, newComment)

      if (err) {
        toast.error("Erreur", {
          description: err.message || "Impossible d'ajouter le commentaire",
        })
        return
      }

      if (data) {
        setApplication(data)
        setNewComment("")
        toast.success("Commentaire ajouté", {
          description: "Le commentaire a été ajouté avec succès",
        })
      }
    } catch (err: any) {
      toast.error("Erreur", {
        description: err.message || "Erreur inattendue",
      })
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="py-20 text-center">
          <div className="inline-flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#737373] text-lg font-medium">Chargement de la candidature...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error || !application) {
    return (
      <AdminLayout>
        <div className="py-20 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-red-600 mb-4 font-medium text-lg">{error || "Candidature non trouvée"}</p>
          <Button onClick={() => router.push("/admin/candidatures")} variant="outline" className="shadow-sm hover:shadow-md">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste
          </Button>
        </div>
      </AdminLayout>
    )
  }

  const formData = application.form_data
  const programLabels: Record<string, string> = {
    resident: "Résident",
    external: "Externe",
    girls: "Filles",
    elite: "Élite",
  }

  const positionLabels: Record<string, string> = {
    goalkeeper: "Gardien",
    "defender-center": "Défenseur central",
    "defender-lateral": "Défenseur latéral",
    "midfielder-defensive": "Milieu défensif",
    "midfielder-central": "Milieu central",
    "midfielder-offensive": "Milieu offensif",
    winger: "Ailier",
    forward: "Attaquant",
    striker: "Avant-centre",
  }

  const genderLabels: Record<string, string> = {
    male: "Masculin",
    female: "Féminin",
    other: "Autre",
  }

  const comments = (formData as any)?.admin_comments || []

  return (
    <AdminLayout>
      {/* Header moderne avec photo proéminente */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/admin/candidatures")}
          className="mb-6 text-[#737373] hover:text-[#1A1A1A] hover:bg-gray-100 transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Button>
        
        <Card className="bg-gradient-to-br from-white via-gray-50/50 to-white border-0 shadow-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              {/* Photo du candidat avec design moderne */}
              {formData?.photo ? (
                <div className="flex-shrink-0 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-2xl ring-4 ring-[#D4AF37]/20 group-hover:ring-[#D4AF37]/40 transition-all">
                    {loadingFiles ? (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : fileUrls.photo ? (
                      <img
                        src={fileUrls.photo}
                        alt={`${formData?.firstName} ${formData?.lastName}`}
                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => window.open(fileUrls.photo, "_blank")}
                        onError={() => {
                          console.error("Erreur de chargement de l'image")
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center text-white">
                        <User className="w-16 h-16 opacity-50" />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <User className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p className="text-xs text-gray-500 font-medium">Pas de photo</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1A1A1A] to-[#4A4A4A] bg-clip-text text-transparent mb-3">
                      {formData?.firstName} {formData?.lastName}
                    </h1>
                    <div className="flex items-center gap-3 flex-wrap">
                      <ApplicationStatusBadge status={application.status} decision={formData?.decision} />
                      <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                        {programLabels[formData?.program || ""] || formData?.program}
                      </Badge>
                      <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-700">
                        {positionLabels[formData?.position || ""] || formData?.position}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-[#737373]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Candidature du {format(new Date(application.created_at), "dd MMMM yyyy 'à' HH:mm")}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="bg-white shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <CardTitle className="text-xl font-bold text-[#1A1A1A] flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                Informations Personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-[#737373] text-xs font-medium uppercase tracking-wide">Prénom</Label>
                  <p className="text-[#1A1A1A] font-semibold text-lg">{formData?.firstName}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[#737373] text-xs font-medium uppercase tracking-wide">Nom</Label>
                  <p className="text-[#1A1A1A] font-semibold text-lg">{formData?.lastName}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[#737373] text-xs font-medium uppercase tracking-wide">Âge</Label>
                  <p className="text-[#1A1A1A] font-semibold text-lg">{formData?.age} ans</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[#737373] text-xs font-medium uppercase tracking-wide">Genre</Label>
                  <p className="text-[#1A1A1A] font-semibold text-lg">{genderLabels[formData?.gender || ""] || formData?.gender}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[#737373] text-xs font-medium uppercase tracking-wide">Taille</Label>
                  <p className="text-[#1A1A1A] font-semibold text-lg">{formData?.height} cm</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[#737373] text-xs font-medium uppercase tracking-wide">Poids</Label>
                  <p className="text-[#1A1A1A] font-semibold text-lg">{formData?.weight} kg</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[#737373] text-xs font-medium uppercase tracking-wide">Pays</Label>
                  <p className="text-[#1A1A1A] font-semibold text-lg">{formData?.country}</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200 space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <Label className="text-[#737373] text-xs font-medium uppercase tracking-wide">Email</Label>
                    <a href={`mailto:${formData?.email}`} className="text-[#D4AF37] hover:text-[#B8941F] font-semibold hover:underline block">
                      {formData?.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <a href={`tel:${formData?.phone}`} className="text-[#1A1A1A] hover:text-[#D4AF37] font-medium transition-colors">
                      {formData?.phone}
                    </a>
                  </div>
                  {formData?.phone2 && (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-4 h-4 text-gray-600" />
                      <a href={`tel:${formData?.phone2}`} className="text-[#1A1A1A] hover:text-[#D4AF37] font-medium transition-colors">
                        {formData?.phone2}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Program & Background */}
          <Card className="bg-white shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
              <CardTitle className="text-xl font-bold text-[#1A1A1A] flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                Programme & Parcours
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-[#737373] text-xs font-medium uppercase tracking-wide">Programme</Label>
                  <p className="text-[#1A1A1A] font-semibold text-lg">{programLabels[formData?.program || ""] || formData?.program}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[#737373] text-xs font-medium uppercase tracking-wide">Position</Label>
                  <p className="text-[#1A1A1A] font-semibold text-lg">{positionLabels[formData?.position || ""] || formData?.position}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[#737373] text-xs font-medium uppercase tracking-wide">Expérience</Label>
                  <p className="text-[#1A1A1A] font-semibold text-lg">{formData?.experience} ans</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-[#737373] text-xs font-medium uppercase tracking-wide">Club actuel</Label>
                  <p className="text-[#1A1A1A] font-semibold text-lg">{formData?.currentClub || "N/A"}</p>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-200">
                <Label className="text-[#737373] text-xs font-medium uppercase tracking-wide mb-3 block">Motivation</Label>
                <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                  <p className="text-[#1A1A1A] whitespace-pre-wrap leading-relaxed">{formData?.motivation}</p>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-200">
                <Label className="text-[#737373] text-xs font-medium uppercase tracking-wide mb-3 block">Tuteur / Responsable</Label>
                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100">
                  <p className="text-[#1A1A1A] font-semibold text-lg mb-1">{formData?.guardian}</p>
                  <a href={`tel:${formData?.guardianPhone}`} className="text-[#D4AF37] hover:text-[#B8941F] font-medium hover:underline">
                    {formData?.guardianPhone}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents avec design moderne */}
          <Card className="bg-white shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
              <CardTitle className="text-xl font-bold text-[#1A1A1A] flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <FileCheck className="w-5 h-5 text-emerald-600" />
                </div>
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {loadingFiles && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center gap-3">
                    <div className="w-6 h-6 border-3 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-[#737373]">Chargement des documents...</p>
                  </div>
                </div>
              )}
              
              {/* Photo */}
              {formData?.photo && (
                <div 
                  className={cn(
                    "group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer",
                    fileUrls.photo 
                      ? "border-emerald-200 hover:border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 hover:shadow-xl" 
                      : "border-gray-200 bg-gray-50"
                  )}
                  onClick={() => fileUrls.photo && window.open(fileUrls.photo, "_blank")}
                >
                  <div className="flex items-center gap-4 p-5">
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300",
                      fileUrls.photo 
                        ? "bg-gradient-to-br from-emerald-500 to-teal-500 group-hover:scale-110 shadow-lg" 
                        : "bg-gray-200"
                    )}>
                      <ImageIcon className={cn("w-7 h-7", fileUrls.photo ? "text-white" : "text-gray-400")} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#1A1A1A] group-hover:text-emerald-600 transition-colors">Photo du candidat</p>
                      <p className="text-sm text-[#737373]">{fileUrls.photo ? "Cliquez pour ouvrir" : "Chargement..."}</p>
                    </div>
                    {fileUrls.photo && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(fileUrls.photo, "_blank")
                        }}
                        className="group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Ouvrir
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Acte de naissance */}
              {formData?.birthCertificate ? (
                <div 
                  className={cn(
                    "group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer",
                    fileUrls.birthCertificate 
                      ? "border-blue-200 hover:border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl" 
                      : "border-gray-200 bg-gray-50"
                  )}
                  onClick={() => fileUrls.birthCertificate && window.open(fileUrls.birthCertificate, "_blank")}
                >
                  <div className="flex items-center gap-4 p-5">
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300",
                      fileUrls.birthCertificate 
                        ? "bg-gradient-to-br from-blue-500 to-indigo-500 group-hover:scale-110 shadow-lg" 
                        : "bg-gray-200"
                    )}>
                      <FileText className={cn("w-7 h-7", fileUrls.birthCertificate ? "text-white" : "text-gray-400")} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#1A1A1A] group-hover:text-blue-600 transition-colors">Acte de naissance</p>
                      <p className="text-sm text-[#737373]">{fileUrls.birthCertificate ? "Cliquez pour ouvrir" : "Chargement..."}</p>
                    </div>
                    {fileUrls.birthCertificate && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(fileUrls.birthCertificate, "_blank")
                        }}
                        className="group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Ouvrir
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-5 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center">
                  <p className="text-sm text-gray-500">Acte de naissance non fourni</p>
                </div>
              )}

              {/* Certificat médical */}
              {formData?.medicalCertificate ? (
                <div 
                  className={cn(
                    "group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer",
                    fileUrls.medicalCertificate 
                      ? "border-purple-200 hover:border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl" 
                      : "border-gray-200 bg-gray-50"
                  )}
                  onClick={() => fileUrls.medicalCertificate && window.open(fileUrls.medicalCertificate, "_blank")}
                >
                  <div className="flex items-center gap-4 p-5">
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300",
                      fileUrls.medicalCertificate 
                        ? "bg-gradient-to-br from-purple-500 to-pink-500 group-hover:scale-110 shadow-lg" 
                        : "bg-gray-200"
                    )}>
                      <FileCheck className={cn("w-7 h-7", fileUrls.medicalCertificate ? "text-white" : "text-gray-400")} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#1A1A1A] group-hover:text-purple-600 transition-colors">Certificat médical</p>
                      <p className="text-sm text-[#737373]">{fileUrls.medicalCertificate ? "Cliquez pour ouvrir" : "Chargement..."}</p>
                    </div>
                    {fileUrls.medicalCertificate && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(fileUrls.medicalCertificate, "_blank")
                        }}
                        className="group-hover:bg-purple-500 group-hover:text-white group-hover:border-purple-500 transition-all"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Ouvrir
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-5 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center">
                  <p className="text-sm text-gray-500">Certificat médical non fourni</p>
                </div>
              )}

              {/* Vidéo */}
              {formData?.video ? (
                <div 
                  className={cn(
                    "group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer",
                    fileUrls.video 
                      ? "border-red-200 hover:border-red-400 bg-gradient-to-br from-red-50 to-orange-50 hover:shadow-xl" 
                      : "border-gray-200 bg-gray-50"
                  )}
                  onClick={() => fileUrls.video && window.open(fileUrls.video, "_blank")}
                >
                  <div className="flex items-center gap-4 p-5">
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300",
                      fileUrls.video 
                        ? "bg-gradient-to-br from-red-500 to-orange-500 group-hover:scale-110 shadow-lg" 
                        : "bg-gray-200"
                    )}>
                      <Video className={cn("w-7 h-7", fileUrls.video ? "text-white" : "text-gray-400")} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#1A1A1A] group-hover:text-red-600 transition-colors">Vidéo de compétences</p>
                      <p className="text-sm text-[#737373]">{fileUrls.video ? "Cliquez pour ouvrir" : "Chargement..."}</p>
                    </div>
                    {fileUrls.video && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(fileUrls.video, "_blank")
                        }}
                        className="group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Lire
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-5 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-center">
                  <p className="text-sm text-gray-500">Vidéo non fournie (optionnel)</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar sticky */}
        <div className="lg:sticky lg:top-6 space-y-6 h-fit">
          {/* Status Management */}
          <Card className="bg-white shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#D4AF37]/10 to-[#B8941F]/5 border-b">
              <CardTitle className="text-lg font-bold text-[#1A1A1A]">Gérer la Candidature</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div>
                <Label className="text-[#737373] text-sm font-medium mb-2 block">Statut</Label>
                <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as ApplicationStatus)}>
                  <SelectTrigger className="shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="reviewed">En cours</SelectItem>
                    <SelectItem value="completed">Terminée</SelectItem>
                    <SelectItem value="archived">Archivée</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-[#737373] text-sm font-medium mb-2 block">Décision</Label>
                <Select
                  value={selectedDecision || "none"}
                  onValueChange={(value) => setSelectedDecision(value === "none" ? null : (value as ApplicationDecision))}
                >
                  <SelectTrigger className="shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Aucune décision</SelectItem>
                    <SelectItem value="accepted">Acceptée</SelectItem>
                    <SelectItem value="rejected">Rejetée</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-[#737373] text-sm font-medium mb-2 block">Notes internes</Label>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Ajoutez des notes internes..."
                  rows={4}
                  className="resize-none shadow-sm"
                />
              </div>

              <Button
                onClick={handleUpdateStatus}
                disabled={updating}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {updating ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Mise à jour...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Enregistrer les modifications
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card className="bg-white shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
              <CardTitle className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                Commentaires Internes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {comments.length === 0 ? (
                  <p className="text-sm text-[#737373] text-center py-8">Aucun commentaire</p>
                ) : (
                  comments.map((comment: any, index: number) => (
                    <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-sm">
                      <p className="text-sm text-[#1A1A1A] leading-relaxed">{comment.text}</p>
                      <p className="text-xs text-[#737373] mt-2">
                        {format(new Date(comment.created_at), "dd MMM yyyy 'à' HH:mm")}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="pt-4 border-t border-gray-200">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ajouter un commentaire..."
                  rows={3}
                  className="resize-none mb-3 shadow-sm"
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || updating}
                  variant="outline"
                  size="sm"
                  className="w-full shadow-sm hover:shadow-md transition-shadow"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ajouter un commentaire
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Actions Rapides */}
          <Card className="bg-white shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <CardTitle className="text-lg font-bold text-[#1A1A1A]">Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <Button
                variant={application.status === "archived" ? "default" : "outline"}
                className={cn(
                  "w-full justify-start shadow-sm hover:shadow-md transition-all",
                  application.status === "archived"
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                    : "border-gray-300 hover:bg-gray-50"
                )}
                onClick={handleArchive}
                disabled={updating}
              >
                {application.status === "archived" ? (
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
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start shadow-sm hover:shadow-md transition-all border-gray-300 hover:bg-gray-50"
                onClick={() => window.location.href = `mailto:${formData?.email}`}
              >
                <Mail className="w-4 h-4 mr-2" />
                Envoyer un email
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start shadow-sm hover:shadow-md transition-all border-gray-300 hover:bg-gray-50"
                onClick={() => window.location.href = `tel:${formData?.phone}`}
              >
                <Phone className="w-4 h-4 mr-2" />
                Appeler
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
