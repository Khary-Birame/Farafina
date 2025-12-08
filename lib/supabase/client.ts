/**
 * Client Supabase pour le navigateur (Browser)
 * 
 * EXPLICATION :
 * Ce fichier crée une instance du client Supabase qui sera utilisée
 * dans les composants React côté client (dans le navigateur).
 * 
 * UTILISATION :
 * - Dans les composants avec "use client"
 * - Pour les interactions utilisateur (clics, formulaires)
 * - Pour l'authentification côté client
 * 
 * SÉCURITÉ :
 * On utilise la clé "anon" (anonyme) qui est publique mais sécurisée
 * grâce au Row Level Security (RLS) qu'on configurera plus tard.
 */

import { createClient } from '@supabase/supabase-js'

// Fonction pour obtenir la configuration Supabase
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
 * Créer et exporter le client Supabase
 * 
 * createClient() prend 2 paramètres :
 * 1. L'URL de votre projet Supabase
 * 2. La clé anonyme (publique mais sécurisée)
 * 
 * Note: La vérification des variables est faite au moment de l'utilisation,
 * pas au moment de l'import, pour permettre au build de continuer.
 * 
 * SÉCURITÉ :
 * - PersistSession: true pour sauvegarder la session dans localStorage
 * - AutoRefreshToken: true pour rafraîchir automatiquement les tokens expirés
 * - DetectSessionInUrl: true pour détecter les sessions dans les URLs (callback OAuth)
 * - FlowType: 'pkce' pour utiliser PKCE (Proof Key for Code Exchange) - plus sécurisé
 */
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    if (!supabaseInstance) {
      const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          flowType: 'pkce',
          storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        },
      })
    }
    return (supabaseInstance as any)[prop]
  },
})

/**
 * EXEMPLE D'UTILISATION :
 * 
 * import { supabase } from '@/lib/supabase/client'
 * 
 * // Récupérer des données
 * const { data, error } = await supabase
 *   .from('players')
 *   .select('*')
 * 
 * // Se connecter
 * const { data, error } = await supabase.auth.signInWithPassword({
 *   email: 'user@example.com',
 *   password: 'password'
 * })
 */
