/**
 * Helpers pour gérer les soumissions de formulaires dans Supabase
 */

import { supabase } from "./client"
import { Database } from "./types"

type FormSubmission = Database["public"]["Tables"]["form_submissions"]["Row"]
type FormSubmissionInsert = Database["public"]["Tables"]["form_submissions"]["Insert"]

/**
 * Créer une nouvelle soumission de formulaire
 */
export async function createFormSubmission(
  formData: Omit<FormSubmissionInsert, "id" | "created_at" | "updated_at">
) {
  try {
    const { data, error } = await supabase
      .from("form_submissions")
      .insert({
        ...formData,
        status: formData.status || "pending",
      })
      .select()
      .single()

    if (error) {
      console.error("Erreur lors de la création de la soumission:", error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (error: any) {
    console.error("Erreur inattendue lors de la création de la soumission:", error)
    return { data: null, error }
  }
}

/**
 * Récupérer toutes les soumissions (pour les admins)
 */
export async function getFormSubmissions(options?: {
  formType?: string
  status?: string
  limit?: number
}) {
  try {
    let query = supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (options?.formType) {
      query = query.eq("form_type", options.formType)
    }

    if (options?.status) {
      query = query.eq("status", options.status)
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    const { data, error } = await query

    if (error) {
      console.error("Erreur lors de la récupération des soumissions:", error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (error: any) {
    console.error("Erreur inattendue lors de la récupération des soumissions:", error)
    return { data: null, error }
  }
}

