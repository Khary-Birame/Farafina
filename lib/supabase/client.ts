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

// Récupérer les variables d'environnement
// NEXT_PUBLIC_ signifie que ces variables sont accessibles côté client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Vérifier que les variables sont définies
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Variables Supabase manquantes ! Vérifiez votre fichier .env.local'
  )
}

/**
 * Créer et exporter le client Supabase
 * 
 * createClient() prend 2 paramètres :
 * 1. L'URL de votre projet Supabase
 * 2. La clé anonyme (publique mais sécurisée)
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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

