/**
 * Helpers pour interagir avec la table players dans Supabase
 */

import { supabase } from "./client"
import { Database } from "./types"

type Player = Database["public"]["Tables"]["players"]["Row"]
type PlayerInsert = Database["public"]["Tables"]["players"]["Insert"]
type PlayerUpdate = Database["public"]["Tables"]["players"]["Update"]

/**
 * Récupérer tous les joueurs (avec pagination optionnelle)
 */
export async function getPlayers(options?: {
  limit?: number
  offset?: number
  category?: string
  position?: string
  search?: string
}) {
  try {
    let query = supabase
      .from("players")
      .select("*")
      .order("created_at", { ascending: false })

    // Filtres optionnels
    if (options?.category) {
      query = query.eq("category", options.category)
    }

    if (options?.position) {
      query = query.eq("position", options.position)
    }

    if (options?.search) {
      query = query.or(
        `first_name.ilike.%${options.search}%,last_name.ilike.%${options.search}%`
      )
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    if (options?.offset) {
      query = query.range(
        options.offset,
        options.offset + (options.limit || 10) - 1
      )
    }

    const { data, error } = await query

    if (error) {
      console.error("Erreur lors de la récupération des joueurs:", error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (error: any) {
    console.error("Erreur inattendue lors de la récupération des joueurs:", error)
    return { data: null, error }
  }
}

/**
 * Récupérer un joueur par son ID
 */
export async function getPlayerById(id: string) {
  try {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Erreur lors de la récupération du joueur:", error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (error: any) {
    console.error("Erreur inattendue lors de la récupération du joueur:", error)
    return { data: null, error }
  }
}

/**
 * Créer un nouveau joueur
 */
export async function createPlayer(playerData: PlayerInsert) {
  try {
    const { data, error } = await supabase
      .from("players")
      .insert(playerData)
      .select()
      .single()

    if (error) {
      console.error("Erreur lors de la création du joueur:", error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (error: any) {
    console.error("Erreur inattendue lors de la création du joueur:", error)
    return { data: null, error }
  }
}

/**
 * Mettre à jour un joueur
 */
export async function updatePlayer(id: string, playerData: PlayerUpdate) {
  try {
    const { data, error } = await supabase
      .from("players")
      .update(playerData)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Erreur lors de la mise à jour du joueur:", error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (error: any) {
    console.error("Erreur inattendue lors de la mise à jour du joueur:", error)
    return { data: null, error }
  }
}

/**
 * Supprimer un joueur
 */
export async function deletePlayer(id: string) {
  try {
    const { error } = await supabase.from("players").delete().eq("id", id)

    if (error) {
      console.error("Erreur lors de la suppression du joueur:", error)
      return { error }
    }

    return { error: null }
  } catch (error: any) {
    console.error("Erreur inattendue lors de la suppression du joueur:", error)
    return { error }
  }
}

/**
 * Formater un joueur pour l'affichage
 * Convertit les données de la base de données en format utilisable par le frontend
 */
export function formatPlayerForDisplay(player: any) {
  return {
    id: player.id,
    name: `${player.first_name || ""} ${player.last_name || ""}`.trim() || "Joueur",
    age: player.age || 0,
    position: player.position || "Non défini",
    category: player.category || "Non défini",
    nationality: player.nationality || "Non défini",
    country: player.country || player.nationality || "Non défini",
    city: player.city || "Non défini",
    performance: player.performance || 0,
    image: player.image || player.photo_url || "/placeholder-player.jpg",
    height: player.height || "Non défini",
    weight: player.weight || "Non défini",
    preferredFoot: player.preferred_foot || "Non défini",
    section: player.section || "Non défini",
    stats: player.stats || {},
    academic: player.academic || {},
    coachFeedback: player.coach_feedback || "",
    videos: player.videos || [],
    highlights: player.highlights || [],
    evaluations: player.evaluations || [],
    certificates: player.certificates || [],
  }
}

