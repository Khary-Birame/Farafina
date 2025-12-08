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

// Fonction pour vérifier les variables d'environnement
function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    const isProduction = process.env.NODE_ENV === 'production'
    const errorMessage = isProduction
      ? 'Variables Supabase manquantes ! Configurez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY dans Vercel Dashboard → Settings → Environment Variables'
      : 'Variables Supabase manquantes ! Vérifiez votre fichier .env.local'
    throw new Error(errorMessage)
  }
  
  return { supabaseUrl, supabaseAnonKey }
}

/**
 * Configuration des options de cookies pour Supabase
 * 
 * Ces options garantissent la sécurité et la persistance des sessions
 */
function getCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production'
  const isSecure = isProduction || process.env.NEXT_PUBLIC_FORCE_SECURE_COOKIES === 'true'
  
  return {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  }
}

/**
 * Créer un client Supabase pour le serveur avec le contexte utilisateur
 * 
 * Cette fonction crée un client qui respecte la session de l'utilisateur
 * connecté. Utile pour les Server Components et Server Actions.
 * 
 * SÉCURITÉ :
 * - Cookies HTTPOnly pour protéger contre XSS
 * - Secure en production (HTTPS uniquement)
 * - SameSite=Lax pour protéger contre CSRF
 * - Path=/ pour que les cookies soient disponibles sur tout le site
 */
export async function createServerClient() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()
  const cookieStore = await cookies()
  const cookieOptions = getCookieOptions()
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        try {
          // Fusionner les options par défaut avec les options spécifiques
          cookieStore.set({ 
            name, 
            value, 
            ...cookieOptions,
            ...options,
            // S'assurer que httpOnly est toujours true pour les cookies d'auth
            httpOnly: name.includes('auth-token') || name.includes('supabase') ? true : (options?.httpOnly ?? cookieOptions.httpOnly),
          })
        } catch (error) {
          // Les cookies ne peuvent pas être modifiés dans certains contextes
          // (par exemple dans les Server Components statiques)
          // C'est normal et ne pose pas de problème
          console.warn(`Impossible de définir le cookie ${name}:`, error)
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ 
            name, 
            value: '', 
            ...cookieOptions,
            ...options,
            maxAge: 0, // Supprimer immédiatement
          })
        } catch (error) {
          // Même chose ici
          console.warn(`Impossible de supprimer le cookie ${name}:`, error)
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
  const { supabaseUrl } = getSupabaseConfig()
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
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

