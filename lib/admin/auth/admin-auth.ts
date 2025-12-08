import { supabase } from '@/lib/supabase/client'

/**
 * Vérifier l'accès administrateur
 * 
 * Cette fonction vérifie :
 * 1. Si l'utilisateur est connecté
 * 2. Si la session est valide
 * 3. Si l'utilisateur a le rôle 'admin'
 */
export async function checkAdminAccess() {
  try {
    // D'abord vérifier la session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      console.error('Erreur de session:', sessionError)
      return { isAdmin: false, user: null, error: sessionError }
    }

    if (!session) {
      return { isAdmin: false, user: null, error: null }
    }

    // Vérifier que le token n'est pas expiré
    const now = Math.floor(Date.now() / 1000)
    if (session.expires_at && session.expires_at < now) {
      console.log("Session expirée, tentative de rafraîchissement...")
      // Essayer de rafraîchir la session avec retry
      let refreshAttempts = 0
      const maxRetries = 3
      let refreshData = null
      let refreshError = null

      while (refreshAttempts < maxRetries) {
        const result = await supabase.auth.refreshSession()
        refreshData = result.data
        refreshError = result.error

        if (!refreshError && refreshData?.session) {
          break // Succès
        }

        refreshAttempts++
        if (refreshAttempts < maxRetries) {
          // Attendre avant de réessayer (backoff exponentiel)
          await new Promise(resolve => setTimeout(resolve, 1000 * refreshAttempts))
        }
      }

      if (refreshError || !refreshData?.session) {
        console.error("Impossible de rafraîchir la session après", maxRetries, "tentatives:", refreshError)
        return { isAdmin: false, user: null, error: refreshError || new Error("Session expirée") }
      }
    }

    // Récupérer l'utilisateur
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', userError)
      return { isAdmin: false, user: null, error: userError }
    }

    if (!user) {
      return { isAdmin: false, user: null, error: null }
    }

    // Vérifier le rôle dans la table users
    const { data: userData, error: dbError } = await supabase
      .from('users')
      .select('role, id, email, first_name, last_name')
      .eq('id', user.id)
      .single()

    if (dbError) {
      console.error('Erreur vérification admin:', dbError)
      return { isAdmin: false, user: null, error: dbError }
    }

    const isAdmin = userData?.role === 'admin'

    return {
      isAdmin,
      user: userData,
      error: null,
    }
  } catch (error: any) {
    console.error('Erreur checkAdminAccess:', error)
    return { isAdmin: false, user: null, error: error.message || 'Erreur inconnue' }
  }
}


