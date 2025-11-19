/**
 * Helpers pour gérer les candidatures dans Supabase
 */

import { supabase } from "./client"
import { Database } from "./types"
import { createFormSubmission } from "./form-submissions-helpers"

/**
 * Génère un UUID v4 compatible navigateur et serveur
 */
function generateUUID(): string {
  // Utiliser crypto.randomUUID() si disponible (navigateurs modernes et Node.js 14.17+)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  
  // Fallback: générer un UUID simple
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

type FormSubmission = Database["public"]["Tables"]["form_submissions"]["Row"]
type FormSubmissionUpdate = Database["public"]["Tables"]["form_submissions"]["Update"]

const APPLICATION_BUCKET = "applications"

export type ApplicationStatus = "pending" | "reviewed" | "completed" | "archived"
export type ApplicationDecision = "accepted" | "rejected" | null

export interface Application extends FormSubmission {
  form_data: {
    firstName?: string
    lastName?: string
    age?: string
    gender?: string
    height?: string
    weight?: string
    country?: string
    email?: string
    phone?: string
    phone2?: string
    program?: string
    position?: string
    experience?: string
    currentClub?: string
    motivation?: string
    guardian?: string
    guardianPhone?: string
    birthCertificate?: string
    photo?: string
    medicalCertificate?: string
    video?: string
    [key: string]: any
  }
  admin_notes?: string
  admin_comments?: Array<{
    text: string
    created_at: string
    created_by: string
  }>
  decision?: ApplicationDecision
}

/**
 * Récupérer toutes les candidatures (pour les admins)
 */
export async function getApplications(options?: {
  status?: ApplicationStatus
  search?: string
  limit?: number
  offset?: number
}) {
  try {
    let query = supabase
      .from("form_submissions")
      .select("*")
      .eq("form_type", "application")
      .order("created_at", { ascending: false })

    if (options?.status) {
      query = query.eq("status", options.status)
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error("Erreur lors de la récupération des candidatures:", error)
      return { data: null, error }
    }

    // Filtrer par recherche si fourni
    let filteredData = data || []
    if (options?.search) {
      const searchLower = options.search.toLowerCase()
      filteredData = filteredData.filter((app) => {
        const formData = app.form_data as any
        return (
          formData?.firstName?.toLowerCase().includes(searchLower) ||
          formData?.lastName?.toLowerCase().includes(searchLower) ||
          formData?.email?.toLowerCase().includes(searchLower) ||
          formData?.phone?.includes(searchLower)
        )
      })
    }

    return { data: filteredData as Application[], error: null }
  } catch (error: any) {
    console.error("Erreur inattendue lors de la récupération des candidatures:", error)
    return { data: null, error }
  }
}

/**
 * Récupérer une candidature par ID
 */
export async function getApplicationById(id: string) {
  try {
    const { data, error } = await supabase
      .from("form_submissions")
      .select("*")
      .eq("id", id)
      .eq("form_type", "application")
      .single()

    if (error) {
      console.error("Erreur lors de la récupération de la candidature:", error)
      return { data: null, error }
    }

    return { data: data as Application, error: null }
  } catch (error: any) {
    console.error("Erreur inattendue lors de la récupération de la candidature:", error)
    return { data: null, error }
  }
}

/**
 * Mettre à jour le statut d'une candidature
 */
export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  decision?: ApplicationDecision,
  adminNotes?: string
) {
  try {
    const { data: currentData } = await getApplicationById(id)
    if (!currentData) {
      return { data: null, error: { message: "Candidature non trouvée" } }
    }

    const updateData: FormSubmissionUpdate = {
      status,
      updated_at: new Date().toISOString(),
      form_data: {
        ...(currentData.form_data as any),
        ...(decision && { decision }),
        ...(adminNotes && {
          admin_notes: adminNotes,
          admin_notes_updated_at: new Date().toISOString(),
        }),
      },
    }

    const { data, error } = await supabase
      .from("form_submissions")
      .update(updateData)
      .eq("id", id)
      .eq("form_type", "application")
      .select()
      .single()

    if (error) {
      console.error("Erreur lors de la mise à jour du statut:", error)
      return { data: null, error }
    }

    return { data: data as Application, error: null }
  } catch (error: any) {
    console.error("Erreur inattendue lors de la mise à jour du statut:", error)
    return { data: null, error }
  }
}

/**
 * Ajouter un commentaire interne à une candidature
 */
export async function addApplicationComment(id: string, comment: string) {
  try {
    const { data: currentData } = await getApplicationById(id)
    if (!currentData) {
      return { data: null, error: { message: "Candidature non trouvée" } }
    }

    const comments = (currentData.form_data as any).admin_comments || []
    const newComment = {
      text: comment,
      created_at: new Date().toISOString(),
      created_by: "admin", // TODO: Récupérer l'ID de l'admin connecté
    }

    const { data, error } = await supabase
      .from("form_submissions")
      .update({
        form_data: {
          ...(currentData.form_data as any),
          admin_comments: [...comments, newComment],
        },
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error)
      return { data: null, error }
    }

    return { data: data as Application, error: null }
  } catch (error: any) {
    console.error("Erreur inattendue lors de l'ajout du commentaire:", error)
    return { data: null, error }
  }
}

/**
 * Obtenir les statistiques des candidatures
 */
export async function getApplicationStats() {
  try {
    const { data, error } = await supabase
      .from("form_submissions")
      .select("status")
      .eq("form_type", "application")

    if (error) {
      console.error("Erreur lors de la récupération des statistiques:", error)
      return { data: null, error }
    }

    // Compter les acceptées et rejetées depuis form_data.decision
    const accepted = data?.filter((a) => {
      const formData = a.form_data as any
      return formData?.decision === "accepted"
    }).length || 0

    const rejected = data?.filter((a) => {
      const formData = a.form_data as any
      return formData?.decision === "rejected"
    }).length || 0

    const stats = {
      total: data?.length || 0,
      pending: data?.filter((a) => a.status === "pending").length || 0,
      reviewed: data?.filter((a) => a.status === "reviewed").length || 0,
      completed: data?.filter((a) => a.status === "completed").length || 0,
      archived: data?.filter((a) => a.status === "archived").length || 0,
      accepted,
      rejected,
    }

    return { data: stats, error: null }
  } catch (error: any) {
    console.error("Erreur inattendue lors de la récupération des statistiques:", error)
    return { data: null, error }
  }
}

/**
 * Valider les données d'une candidature
 */
export function validateApplicationData(formData: {
  firstName?: string
  lastName?: string
  age?: string
  gender?: string
  height?: string
  weight?: string
  country?: string
  email?: string
  phone?: string
  phone2?: string
  program?: string
  position?: string
  experience?: string
  currentClub?: string
  motivation?: string
  guardian?: string
  guardianPhone?: string
}) {
  const errors: Record<string, string> = {}

  if (!formData.firstName?.trim()) {
    errors.firstName = "Le prénom est requis"
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = "Le nom est requis"
  }

  if (!formData.age || parseInt(formData.age) < 8) {
    errors.age = "L'âge doit être de 8 ans ou plus"
  }

  if (!formData.gender) {
    errors.gender = "Le genre est requis"
  }

  if (!formData.height || parseFloat(formData.height) <= 0) {
    errors.height = "La taille est requise"
  }

  if (!formData.weight || parseFloat(formData.weight) <= 0) {
    errors.weight = "Le poids est requis"
  }

  if (!formData.country) {
    errors.country = "Le pays est requis"
  }

  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Un email valide est requis"
  }

  if (!formData.phone?.trim()) {
    errors.phone = "Le numéro de téléphone est requis"
  }

  if (!formData.program) {
    errors.program = "Le programme est requis"
  }

  if (!formData.position) {
    errors.position = "La position est requise"
  }

  if (!formData.experience || parseInt(formData.experience) < 0) {
    errors.experience = "L'expérience est requise"
  }

  if (!formData.motivation?.trim()) {
    errors.motivation = "La motivation est requise"
  }

  if (!formData.guardian?.trim()) {
    errors.guardian = "Le nom du tuteur est requis"
  }

  if (!formData.guardianPhone?.trim()) {
    errors.guardianPhone = "Le téléphone du tuteur est requis"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Uploader un fichier d'application vers Supabase Storage
 */
async function uploadApplicationFile(
  file: File,
  applicationId: string,
  fileType: string
): Promise<{ url: string | null; error: any }> {
  const fileExtension = file.name.split(".").pop()
  const filePath = `${applicationId}/${fileType}-${generateUUID()}.${fileExtension}`
  const bucket = APPLICATION_BUCKET

  // Définir les limites de taille et les types MIME autorisés
  const allowedMimeTypes: Record<string, string[]> = {
    birthCertificate: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
    photo: ["image/jpeg", "image/jpg", "image/png"],
    medicalCertificate: ["application/pdf", "image/jpeg", "image/jpg"],
    video: ["video/mp4", "video/quicktime"],
  }

  const maxSizes: Record<string, number> = {
    birthCertificate: 5 * 1024 * 1024, // 5MB
    photo: 2 * 1024 * 1024, // 2MB
    medicalCertificate: 5 * 1024 * 1024, // 5MB
    video: 100 * 1024 * 1024, // 100MB
  }

  if (!allowedMimeTypes[fileType]?.includes(file.type)) {
    return {
      url: null,
      error: { message: `Type de fichier non autorisé pour ${fileType}.` },
    }
  }

  const maxSize = maxSizes[fileType]
  if (file.size > maxSize) {
    return {
      url: null,
      error: { message: `Le fichier est trop volumineux (max ${maxSize / 1024 / 1024}MB)` },
    }
  }

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    })

  if (error) {
    console.error(`Erreur lors de l'upload de ${fileType}:`, error)
    return { url: null, error }
  }

  // Pour un bucket privé, on stocke le chemin du fichier plutôt que l'URL publique
  // L'URL signée sera générée lors de l'accès au fichier via getSignedFileUrl()
  // Le chemin est au format: {applicationId}/{fileType}-{uuid}.{ext}
  return { url: filePath, error: null }
}

/**
 * Soumettre une candidature complète avec upload des fichiers
 */
export async function submitApplication(
  formData: {
    firstName: string
    lastName: string
    age: string
    gender: string
    height: string
    weight: string
    country: string
    email: string
    phone: string
    phone2?: string
    program: string
    position: string
    experience: string
    currentClub?: string
    motivation: string
    guardian: string
    guardianPhone: string
  },
  files: {
    birthCertificate?: File | null
    photo?: File | null
    medicalCertificate?: File | null
    video?: File | null
  },
  userId: string | null
) {
  try {
    // 1. Créer la soumission de formulaire initiale pour obtenir un ID
    const { data: submissionData, error: submissionError } = await createFormSubmission({
      form_type: "application",
      form_data: formData,
      user_id: userId,
      status: "pending",
    })

    if (submissionError || !submissionData) {
      return {
        data: null,
        error: submissionError || { message: "Erreur lors de la création de la soumission initiale." },
      }
    }

    const applicationId = submissionData.id

    // 2. Uploader les fichiers vers Supabase Storage
    const uploadedFileUrls: Record<string, string | null> = {
      birthCertificate: null,
      photo: null,
      medicalCertificate: null,
      video: null,
    }

    const uploadPromises: Promise<void>[] = []

    if (files.birthCertificate) {
      uploadPromises.push(
        uploadApplicationFile(files.birthCertificate, applicationId, "birthCertificate").then((res) => {
          if (res.error) throw res.error
          uploadedFileUrls.birthCertificate = res.url
        })
      )
    }

    if (files.photo) {
      uploadPromises.push(
        uploadApplicationFile(files.photo, applicationId, "photo").then((res) => {
          if (res.error) throw res.error
          uploadedFileUrls.photo = res.url
        })
      )
    }

    if (files.medicalCertificate) {
      uploadPromises.push(
        uploadApplicationFile(files.medicalCertificate, applicationId, "medicalCertificate").then((res) => {
          if (res.error) throw res.error
          uploadedFileUrls.medicalCertificate = res.url
        })
      )
    }

    if (files.video) {
      uploadPromises.push(
        uploadApplicationFile(files.video, applicationId, "video").then((res) => {
          if (res.error) throw res.error
          uploadedFileUrls.video = res.url
        })
      )
    }

    await Promise.all(uploadPromises)

    // 3. Mettre à jour la soumission de formulaire avec les URLs des fichiers
    const { data: updatedData, error: updateError } = await supabase
      .from("form_submissions")
      .update({
        form_data: {
          ...formData,
          ...uploadedFileUrls,
        },
        status: "pending",
      })
      .eq("id", applicationId)
      .select()
      .single()

    if (updateError) {
      return {
        data: null,
        error: updateError || { message: "Erreur lors de la mise à jour des URLs de fichiers." },
      }
    }

    return { data: updatedData, error: null }
  } catch (error: any) {
    console.error("Erreur lors de la soumission de la candidature:", error)
    return {
      data: null,
      error: error || { message: "Erreur inattendue lors de la soumission." },
    }
  }
}
