/**
 * Client Supabase pour le serveur (Server-side)
 * 
 * EXPLICATION :
 * Ce fichier crée une instance du client Supabase pour les requêtes
 * côté serveur (API routes, Server Components, Server Actions).
 * 
 * DIFFÉRENCE AVEC client.ts :
 * - Server : Utilisé dans les API routes et Server Components
 * - Client : Utilisé dans les composants React côté navigateur
 * 
 * SÉCURITÉ :
 * On peut utiliser la clé "service_role" côté serveur pour avoir
 * des permissions administrateur (à utiliser avec précaution).
 */

import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

// Récupérer les variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Vérifier que les variables sont définies
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Variables Supabase manquantes ! Vérifiez votre fichier .env.local'
  )
}

/**
 * Créer un client Supabase pour le serveur avec le contexte utilisateur
 * 
 * Cette fonction crée un client qui respecte la session de l'utilisateur
 * connecté. Utile pour les Server Components et Server Actions.
 */
export async function createServerClient() {
  const cookieStore = await cookies()
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // Les cookies ne peuvent pas être modifiés dans certains contextes
          // (par exemple dans les Server Components statiques)
          // C'est normal et ne pose pas de problème
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch (error) {
          // Même chose ici
        }
      },
    },
  })
}

/**
 * Créer un client Supabase avec permissions administrateur
 * 
 * ⚠️ ATTENTION : À utiliser uniquement côté serveur !
 * Cette fonction utilise la clé service_role qui donne
 * un accès complet à la base de données, en contournant le RLS.
 * 
 * UTILISATION :
 * - Pour les opérations administratives
 * - Pour les migrations de données
 * - Pour les tâches de maintenance
 * 
 * NE JAMAIS utiliser cette fonction côté client !
 */
export function createAdminClient() {
  if (!supabaseServiceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY n\'est pas définie')
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

/**
 * EXEMPLE D'UTILISATION :
 * 
 * // Dans une API route (app/api/players/route.ts)
 * import { createServerClient } from '@/lib/supabase/server'
 * 
 * export async function GET() {
 *   const supabase = await createServerClient()
 *   const { data, error } = await supabase
 *     .from('players')
 *     .select('*')
 *   return Response.json(data)
 * }
 * 
 * // Pour les opérations admin
 * import { createAdminClient } from '@/lib/supabase/server'
 * 
 * const adminSupabase = createAdminClient()
 * // Accès complet à toutes les données
 */

