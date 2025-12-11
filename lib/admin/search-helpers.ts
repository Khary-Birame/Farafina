/**
 * Helpers pour la recherche globale dans l'administration
 */

import { supabase } from "@/lib/supabase/client"

export interface SearchResult {
    type: "player" | "match" | "order" | "candidature"
    id: string
    title: string
    subtitle?: string
    url: string
}

/**
 * Recherche globale dans les joueurs, matchs, commandes et candidatures
 */
export async function globalSearch(query: string): Promise<{
    results: SearchResult[]
    error: any | null
}> {
    if (!query || query.trim().length < 2) {
        return { results: [], error: null }
    }

    const trimmedQuery = query.trim()
    const results: SearchResult[] = []

    try {
        // Recherche dans les joueurs
        const { data: players, error: playersError } = await supabase
            .from("players")
            .select("id, first_name, last_name, position, category")
            .or(`first_name.ilike.%${trimmedQuery}%,last_name.ilike.%${trimmedQuery}%`)
            .limit(5)

        if (!playersError && players) {
            players.forEach((player) => {
                results.push({
                    type: "player",
                    id: player.id,
                    title: `${player.first_name || ""} ${player.last_name || ""}`.trim(),
                    subtitle: `${player.position || ""} • ${player.category || ""}`.trim(),
                    url: `/admin/players?search=${encodeURIComponent(trimmedQuery)}&highlight=${player.id}`,
                })
            })
        }

        // Recherche dans les matchs
        const { data: matches, error: matchesError } = await supabase
            .from("matches")
            .select("id, opponent, venue, date, category")
            .or(`opponent.ilike.%${trimmedQuery}%,venue.ilike.%${trimmedQuery}%`)
            .limit(5)

        if (!matchesError && matches) {
            matches.forEach((match) => {
                const date = match.date ? new Date(match.date).toLocaleDateString("fr-FR") : ""
                results.push({
                    type: "match",
                    id: match.id,
                    title: match.opponent || "Match",
                    subtitle: `${match.venue || ""} • ${date}`.trim(),
                    url: `/admin/training`,
                })
            })
        }

        // Recherche dans les commandes
        const { data: orders, error: ordersError } = await supabase
            .from("orders")
            .select(`
        id,
        order_number,
        total,
        currency,
        users(first_name, last_name, email)
      `)
            .ilike("order_number", `%${trimmedQuery}%`)
            .limit(5)

        if (!ordersError && orders) {
            orders.forEach((order: any) => {
                const userName = order.users
                    ? `${order.users.first_name || ""} ${order.users.last_name || ""}`.trim() || order.users.email
                    : "Client invité"
                results.push({
                    type: "order",
                    id: order.id,
                    title: `Commande ${order.order_number}`,
                    subtitle: `${userName} • ${order.total} ${order.currency || "XOF"}`,
                    url: `/admin/finance?search=${encodeURIComponent(trimmedQuery)}`,
                })
            })
        }

        // Recherche dans les candidatures
        const { data: candidatures, error: candidaturesError } = await supabase
            .from("form_submissions")
            .select("id, first_name, last_name, email, program")
            .or(`first_name.ilike.%${trimmedQuery}%,last_name.ilike.%${trimmedQuery}%,email.ilike.%${trimmedQuery}%`)
            .limit(5)

        if (!candidaturesError && candidatures) {
            candidatures.forEach((candidature) => {
                results.push({
                    type: "candidature",
                    id: candidature.id,
                    title: `${candidature.first_name || ""} ${candidature.last_name || ""}`.trim() || candidature.email,
                    subtitle: candidature.program || "Candidature",
                    url: `/admin/candidatures?search=${encodeURIComponent(trimmedQuery)}`,
                })
            })
        }

        return { results, error: null }
    } catch (error: any) {
        console.error("Erreur lors de la recherche globale:", error)
        return { results: [], error }
    }
}

