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
} from "lucide-react"
import {
  getApplicationById,
  updateApplicationStatus,
  addApplicationComment,
  Application,
  ApplicationStatus,
  ApplicationDecision,
} from "@/lib/supabase/application-helpers"
import { getSignedFileUrl } from "@/lib/supabase/file-helpers"
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
      
      // Charger les URLs signées pour les fichiers
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
      
      for (const [key, urlOrPath] of Object.entries(files)) {
        if (!urlOrPath) continue
        
        try {
          // Cas 1: C'est déjà un chemin (format: {applicationId}/{fileType}-{uuid}.{ext})
          // Les nouveaux fichiers sont stockés avec leur chemin directement
          if (!urlOrPath.startsWith("http") && urlOrPath.includes("/")) {
            console.log(`[loadFileUrls] Chemin direct détecté pour ${key}:`, urlOrPath)
            const { url: signedUrl, error } = await getSignedFileUrl(urlOrPath, 3600)
            if (!error && signedUrl) {
              console.log(`[loadFileUrls] URL signée créée avec succès pour ${key}`)
              urls[key] = signedUrl
            } else {
              console.error(`[loadFileUrls] Erreur lors de la création de l'URL signée pour ${key}:`, error)
              // Fallback: essayer l'URL publique si le chemin ne fonctionne pas
              const { data } = supabase.storage.from("applications").getPublicUrl(urlOrPath)
              urls[key] = data.publicUrl
            }
          }
          // Cas 2: C'est une URL complète (anciennes candidatures)
          else if (urlOrPath.startsWith("http")) {
            console.log(`[loadFileUrls] URL complète détectée pour ${key}:`, urlOrPath)
            
            // Pour les URLs publiques Supabase, tester d'abord si l'URL fonctionne directement
            if (urlOrPath.includes("/storage/v1/object/public/")) {
              // Tester si l'URL publique fonctionne
              try {
                const testResponse = await fetch(urlOrPath, { method: "HEAD", mode: "no-cors" })
                // En mode no-cors, on ne peut pas vérifier le statut, mais on peut quand même essayer
                // Si l'URL fonctionne, on l'utilise directement
                console.log(`[loadFileUrls] Test de l'URL publique pour ${key}`)
                urls[key] = urlOrPath
                
                // En parallèle, essayer aussi d'extraire le chemin et créer une URL signée
                const pathMatch = urlOrPath.match(/\/storage\/v1\/object\/public\/applications\/(.+?)(\?|$)/)
                if (pathMatch && pathMatch[1]) {
                  const extractedPath = decodeURIComponent(pathMatch[1])
                  console.log(`[loadFileUrls] Tentative de création d'URL signée pour ${key} avec le chemin:`, extractedPath)
                  
                  // Essayer de créer une URL signée en arrière-plan
                  getSignedFileUrl(extractedPath, 3600).then(({ url: signedUrl, error }) => {
                    if (!error && signedUrl) {
                      console.log(`[loadFileUrls] URL signée créée avec succès pour ${key}, mise à jour`)
                      setFileUrls((prev) => ({ ...prev, [key]: signedUrl }))
                    }
                  }).catch(() => {
                    // Ignorer les erreurs silencieusement, on garde l'URL publique
                  })
                }
              } catch (err) {
                // Si l'URL publique ne fonctionne pas, essayer d'extraire le chemin
                console.warn(`[loadFileUrls] L'URL publique ne fonctionne pas pour ${key}, tentative d'extraction du chemin`)
                const pathMatch = urlOrPath.match(/\/storage\/v1\/object\/public\/applications\/(.+?)(\?|$)/)
                if (pathMatch && pathMatch[1]) {
                  const extractedPath = decodeURIComponent(pathMatch[1])
                  console.log(`[loadFileUrls] Chemin extrait depuis l'URL publique pour ${key}:`, extractedPath)
                  
                  // Essayer de créer une URL signée
                  const { url: signedUrl, error } = await getSignedFileUrl(extractedPath, 3600)
                  if (!error && signedUrl) {
                    console.log(`[loadFileUrls] URL signée créée avec succès pour ${key}`)
                    urls[key] = signedUrl
                  } else {
                    console.warn(`[loadFileUrls] Impossible de créer une URL signée pour ${key}, utilisation de l'URL publique originale`)
                    // Fallback: utiliser l'URL publique originale même si elle ne fonctionne peut-être pas
                    urls[key] = urlOrPath
                  }
                } else {
                  // Si on ne peut pas extraire le chemin, utiliser l'URL originale
                  console.warn(`[loadFileUrls] Impossible d'extraire le chemin depuis l'URL pour ${key}, utilisation de l'URL originale`)
                  urls[key] = urlOrPath
                }
              }
            } else if (urlOrPath.includes("/storage/v1/object/sign/")) {
              // C'est déjà une URL signée, l'utiliser directement
              console.log(`[loadFileUrls] URL signée détectée pour ${key}, utilisation directe`)
              urls[key] = urlOrPath
            } else {
              // URL externe ou autre format, utiliser directement
              console.log(`[loadFileUrls] URL externe ou format inconnu pour ${key}, utilisation directe`)
              urls[key] = urlOrPath
            }
          } else {
            // Format inconnu, utiliser tel quel
            console.warn(`[loadFileUrls] Format inconnu pour ${key}, utilisation de la valeur originale:`, urlOrPath)
            urls[key] = urlOrPath
          }
        } catch (err: any) {
          console.error(`[loadFileUrls] Erreur lors du chargement de l'URL pour ${key}:`, err)
          urls[key] = urlOrPath // Utiliser l'URL originale en fallback
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
        <div className="py-12 text-center">
          <p className="text-[#737373]">Chargement de la candidature...</p>
        </div>
      </AdminLayout>
    )
  }

  if (error || !application) {
    return (
      <AdminLayout>
        <div className="py-12 text-center">
          <p className="text-red-600 mb-4">{error || "Candidature non trouvée"}</p>
          <Button onClick={() => router.push("/admin/candidatures")} variant="outline">
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
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/admin/candidatures")}
          className="mb-4 text-[#737373] hover:text-[#1A1A1A]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Button>
        <div className="flex items-start gap-6">
          {/* Photo du candidat */}
          {formData?.photo && (
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-[#D4AF37] shadow-lg">
                <img
                  src={fileUrls.photo || formData.photo}
                  alt={`${formData?.firstName} ${formData?.lastName}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => window.open(fileUrls.photo || formData.photo, "_blank")}
                  onError={(e) => {
                    // Si l'image ne charge pas, essayer de recharger avec une URL signée
                    if (!fileUrls.photo && formData.photo) {
                      loadFileUrls(application)
                    }
                  }}
                />
              </div>
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">
              {formData?.firstName} {formData?.lastName}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <ApplicationStatusBadge status={application.status} decision={formData?.decision} />
              <span className="text-sm text-[#737373]">
                Candidature du {format(new Date(application.created_at), "dd MMMM yyyy 'à' HH:mm")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A] font-semibold flex items-center gap-2">
                <User className="w-5 h-5" />
                Informations Personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#737373] text-sm">Prénom</Label>
                  <p className="text-[#1A1A1A] font-medium">{formData?.firstName}</p>
                </div>
                <div>
                  <Label className="text-[#737373] text-sm">Nom</Label>
                  <p className="text-[#1A1A1A] font-medium">{formData?.lastName}</p>
                </div>
                <div>
                  <Label className="text-[#737373] text-sm">Âge</Label>
                  <p className="text-[#1A1A1A] font-medium">{formData?.age} ans</p>
                </div>
                <div>
                  <Label className="text-[#737373] text-sm">Genre</Label>
                  <p className="text-[#1A1A1A] font-medium">{genderLabels[formData?.gender || ""] || formData?.gender}</p>
                </div>
                <div>
                  <Label className="text-[#737373] text-sm">Taille</Label>
                  <p className="text-[#1A1A1A] font-medium">{formData?.height} cm</p>
                </div>
                <div>
                  <Label className="text-[#737373] text-sm">Poids</Label>
                  <p className="text-[#1A1A1A] font-medium">{formData?.weight} kg</p>
                </div>
                <div>
                  <Label className="text-[#737373] text-sm">Pays</Label>
                  <p className="text-[#1A1A1A] font-medium">{formData?.country}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#E5E7EB]">
                <div className="flex items-center gap-2 text-[#737373] mb-2">
                  <Mail className="w-4 h-4" />
                  <Label className="text-sm">Email</Label>
                </div>
                <a href={`mailto:${formData?.email}`} className="text-[#D4AF37] hover:underline">
                  {formData?.email}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[#737373]">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${formData?.phone}`} className="text-[#1A1A1A] hover:text-[#D4AF37]">
                    {formData?.phone}
                  </a>
                </div>
                {formData?.phone2 && (
                  <div className="flex items-center gap-2 text-[#737373]">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${formData?.phone2}`} className="text-[#1A1A1A] hover:text-[#D4AF37]">
                      {formData?.phone2}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Program & Background */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A] font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Programme & Parcours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#737373] text-sm">Programme</Label>
                  <p className="text-[#1A1A1A] font-medium">{programLabels[formData?.program || ""] || formData?.program}</p>
                </div>
                <div>
                  <Label className="text-[#737373] text-sm">Position</Label>
                  <p className="text-[#1A1A1A] font-medium">{positionLabels[formData?.position || ""] || formData?.position}</p>
                </div>
                <div>
                  <Label className="text-[#737373] text-sm">Expérience</Label>
                  <p className="text-[#1A1A1A] font-medium">{formData?.experience} ans</p>
                </div>
                <div>
                  <Label className="text-[#737373] text-sm">Club actuel</Label>
                  <p className="text-[#1A1A1A] font-medium">{formData?.currentClub || "N/A"}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#E5E7EB]">
                <Label className="text-[#737373] text-sm">Motivation</Label>
                <p className="text-[#1A1A1A] mt-2 whitespace-pre-wrap">{formData?.motivation}</p>
              </div>
              <div className="pt-4 border-t border-[#E5E7EB]">
                <Label className="text-[#737373] text-sm">Tuteur / Responsable</Label>
                <p className="text-[#1A1A1A] font-medium">{formData?.guardian}</p>
                <a href={`tel:${formData?.guardianPhone}`} className="text-[#D4AF37] hover:underline text-sm">
                  {formData?.guardianPhone}
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A] font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loadingFiles && (
                <div className="text-center py-4 text-sm text-[#737373]">
                  Chargement des documents...
                </div>
              )}
              {!loadingFiles && Object.keys(fileUrls).length === 0 && (formData?.birthCertificate || formData?.photo || formData?.medicalCertificate) && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                  <p className="text-sm text-yellow-800 font-medium mb-1">⚠️ Fichiers non accessibles</p>
                  <p className="text-xs text-yellow-700 mb-2">
                    Les fichiers ne peuvent pas être chargés. Vérifiez la console pour plus de détails.
                  </p>
                  <details className="text-xs text-yellow-600">
                    <summary className="cursor-pointer font-medium">Détails techniques</summary>
                    <div className="mt-2 space-y-1">
                      {formData?.photo && <p>Photo: {formData.photo}</p>}
                      {formData?.birthCertificate && <p>Acte de naissance: {formData.birthCertificate}</p>}
                      {formData?.medicalCertificate && <p>Certificat médical: {formData.medicalCertificate}</p>}
                    </div>
                  </details>
                </div>
              )}
              {formData?.birthCertificate ? (
                <div 
                  className="flex items-center justify-between p-4 border-2 border-[#E5E7EB] rounded-lg hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all cursor-pointer group"
                  onClick={() => window.open(fileUrls.birthCertificate || formData.birthCertificate, "_blank")}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                      <FileText className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors">Acte de naissance</p>
                      <p className="text-sm text-[#737373]">Cliquez pour ouvrir</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(fileUrls.birthCertificate || formData.birthCertificate, "_blank")
                    }}
                    className="group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Ouvrir
                  </Button>
                </div>
              ) : (
                <div className="p-4 border border-dashed border-[#E5E7EB] rounded-lg text-center text-[#737373]">
                  <p className="text-sm">Acte de naissance non fourni</p>
                </div>
              )}

              {formData?.medicalCertificate ? (
                <div 
                  className="flex items-center justify-between p-4 border-2 border-[#E5E7EB] rounded-lg hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all cursor-pointer group"
                  onClick={() => window.open(fileUrls.medicalCertificate || formData.medicalCertificate, "_blank")}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                      <FileText className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors">Certificat médical</p>
                      <p className="text-sm text-[#737373]">Cliquez pour ouvrir</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(fileUrls.medicalCertificate || formData.medicalCertificate, "_blank")
                    }}
                    className="group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Ouvrir
                  </Button>
                </div>
              ) : (
                <div className="p-4 border border-dashed border-[#E5E7EB] rounded-lg text-center text-[#737373]">
                  <p className="text-sm">Certificat médical non fourni</p>
                </div>
              )}

              {formData?.video ? (
                <div 
                  className="flex items-center justify-between p-4 border-2 border-[#E5E7EB] rounded-lg hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all cursor-pointer group"
                  onClick={() => window.open(fileUrls.video || formData.video, "_blank")}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                      <FileText className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors">Vidéo de compétences</p>
                      <p className="text-sm text-[#737373]">Cliquez pour ouvrir</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(fileUrls.video || formData.video, "_blank")
                    }}
                    className="group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Ouvrir
                  </Button>
                </div>
              ) : (
                <div className="p-4 border border-dashed border-[#E5E7EB] rounded-lg text-center text-[#737373]">
                  <p className="text-sm">Vidéo non fournie (optionnel)</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Management */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A] font-semibold">Gérer la Candidature</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-[#737373] text-sm mb-2 block">Statut</Label>
                <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as ApplicationStatus)}>
                  <SelectTrigger>
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
                <Label className="text-[#737373] text-sm mb-2 block">Décision</Label>
                <Select
                  value={selectedDecision || "none"}
                  onValueChange={(value) => setSelectedDecision(value === "none" ? null : (value as ApplicationDecision))}
                >
                  <SelectTrigger>
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
                <Label className="text-[#737373] text-sm mb-2 block">Notes internes</Label>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Ajoutez des notes internes..."
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button
                onClick={handleUpdateStatus}
                disabled={updating}
                className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white"
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
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A] font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Commentaires Internes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {comments.length === 0 ? (
                  <p className="text-sm text-[#737373] text-center py-4">Aucun commentaire</p>
                ) : (
                  comments.map((comment: any, index: number) => (
                    <div key={index} className="p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                      <p className="text-sm text-[#1A1A1A]">{comment.text}</p>
                      <p className="text-xs text-[#737373] mt-1">
                        {format(new Date(comment.created_at), "dd MMM yyyy 'à' HH:mm")}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="pt-4 border-t border-[#E5E7EB]">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ajouter un commentaire..."
                  rows={3}
                  className="resize-none mb-2"
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || updating}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ajouter un commentaire
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Actions Rapides */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A] font-semibold">Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={application.status === "archived" ? "default" : "outline"}
                className={`w-full justify-start ${
                  application.status === "archived"
                    ? "bg-[#10B981] hover:bg-[#059669] text-white"
                    : "border-[#6B7280] text-[#6B7280] hover:bg-[#6B7280]/10"
                }`}
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
                className="w-full justify-start"
                onClick={() => window.location.href = `mailto:${formData?.email}`}
              >
                <Mail className="w-4 h-4 mr-2" />
                Envoyer un email
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
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

