/**
 * Helpers pour l'authentification Supabase
 * 
 * Ce fichier contient toutes les fonctions utilitaires pour gérer
 * l'authentification : login, signup, logout, etc.
 */

import { supabase } from "@/lib/supabase/client"

/**
 * Interface pour les données de connexion
 */
export interface LoginCredentials {
  email: string
  password: string
}

/**
 * Interface pour les données d'inscription
 */
export interface SignUpData {
  email: string
  password: string
  fullName: string
  role: "player" | "parent" | "coach" | "club" | "admin"
}

/**
 * Interface pour la réponse d'authentification
 */
export interface AuthResponse {
  success: boolean
  error?: string
  user?: any
}

/**
 * Se connecter avec email et mot de passe
 * 
 * @param credentials - Email et mot de passe
 * @returns Réponse avec succès/erreur et données utilisateur
 */
export async function signIn(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) {
      return {
        success: false,
        error: getErrorMessage(error),
      }
    }

    // Récupérer les informations utilisateur depuis la table users
    if (data.user) {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single()

      // Si l'utilisateur n'existe pas encore dans public.users, ce n'est pas grave
      // Le trigger le créera automatiquement, ou on utilisera les données de auth.users
      if (userError && userError.code !== 'PGRST116') {
        // PGRST116 = "no rows returned", ce qui est normal si l'utilisateur n'existe pas encore
        console.warn("Avertissement lors de la récupération des données utilisateur:", userError.message)
      }

      return {
        success: true,
        user: userData || data.user,
      }
    }

    return {
      success: true,
      user: data.user,
    }
  } catch (error: any) {
    console.error("Erreur lors de la connexion:", error)
    return {
      success: false,
      error: error.message || "Une erreur inattendue s'est produite",
    }
  }
}

/**
 * Créer un nouveau compte
 * 
 * @param signUpData - Données d'inscription
 * @returns Réponse avec succès/erreur et données utilisateur
 */
export async function signUp(signUpData: SignUpData): Promise<AuthResponse> {
  try {
    // 1. Créer le compte dans Supabase Auth
    // Options : personnaliser l'URL de redirection après confirmation
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: signUpData.email,
      password: signUpData.password,
      options: {
        emailRedirectTo: typeof window !== 'undefined'
          ? `${window.location.origin}/auth/callback`
          : undefined,
        data: {
          fullName: signUpData.fullName,
          role: signUpData.role,
        }
      }
    })

    if (authError) {
      return {
        success: false,
        error: getErrorMessage(authError),
      }
    }

    if (!authData.user) {
      return {
        success: false,
        error: "Impossible de créer le compte",
      }
    }

    // 2. Extraire le prénom et nom du fullName
    const nameParts = signUpData.fullName.trim().split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""

    // 3. Attendre un peu pour que le trigger crée l'utilisateur dans public.users
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 4. Utiliser upsert pour créer ou mettre à jour l'utilisateur avec toutes les infos
    // Cela garantit que les données sont bien sauvegardées même si le trigger a déjà créé l'utilisateur
    const { data: userData, error: userError } = await supabase
      .from("users")
      .upsert({
        id: authData.user.id,
        email: signUpData.email,
        role: signUpData.role,
        first_name: firstName,
        last_name: lastName,
        email_verified: false,
      }, {
        onConflict: 'id',
        ignoreDuplicates: false
      })
      .select()
      .single()

    if (userError) {
      // Si l'upsert échoue, essayer une mise à jour simple
      console.warn("Upsert échoué, tentative de mise à jour...", userError.message)

      await new Promise(resolve => setTimeout(resolve, 1000))

      // Réessayer avec update
      const { data: retryData, error: retryError } = await supabase
        .from("users")
        .update({
          role: signUpData.role,
          first_name: firstName,
          last_name: lastName,
        })
        .eq("id", authData.user.id)
        .select()
        .single()

      if (retryError) {
        // Si ça échoue encore, récupérer l'utilisateur et vérifier les données
        console.warn("Mise à jour échouée, récupération de l'utilisateur existant:", retryError.message)

        const { data: baseUser } = await supabase
          .from("users")
          .select("*")
          .eq("id", authData.user.id)
          .single()

        // Si l'utilisateur existe mais n'a pas les bonnes données, essayer une dernière fois
        if (baseUser && (!baseUser.first_name || !baseUser.last_name)) {
          console.warn("Tentative finale de mise à jour des données manquantes...")
          await supabase
            .from("users")
            .update({
              first_name: firstName,
              last_name: lastName,
              role: signUpData.role,
            })
            .eq("id", authData.user.id)
        }

        // Retourner l'utilisateur avec les données mises à jour manuellement si nécessaire
        const finalUser = baseUser ? {
          ...baseUser,
          first_name: baseUser.first_name || firstName,
          last_name: baseUser.last_name || lastName,
          role: baseUser.role || signUpData.role,
        } : {
          ...authData.user,
          first_name: firstName,
          last_name: lastName,
          role: signUpData.role,
        }

        return {
          success: true,
          user: finalUser,
        }
      }

      return {
        success: true,
        user: retryData,
      }
    }

    return {
      success: true,
      user: userData,
    }
  } catch (error: any) {
    console.error("Erreur lors de l'inscription:", error)
    return {
      success: false,
      error: error.message || "Une erreur inattendue s'est produite",
    }
  }
}

/**
 * Se déconnecter
 * 
 * Cette fonction déconnecte l'utilisateur et nettoie toutes les données de session :
 * - Session Supabase
 * - Cookies de session
 * - localStorage (si utilisé)
 * 
 * @returns Réponse avec succès/erreur
 */
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  try {
    console.log("Déconnexion en cours...")

    // Nettoyer le localStorage AVANT la déconnexion Supabase
    if (typeof window !== 'undefined') {
      try {
        // Nettoyer les clés Supabase dans localStorage
        const keysToRemove: string[] = []
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key && (key.includes('supabase') || key.includes('auth'))) {
            keysToRemove.push(key)
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key))
        console.log("localStorage nettoyé")

        // Nettoyer aussi sessionStorage
        const sessionKeysToRemove: string[] = []
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i)
          if (key && (key.includes('supabase') || key.includes('auth') || key.includes('admin'))) {
            sessionKeysToRemove.push(key)
          }
        }
        sessionKeysToRemove.forEach(key => sessionStorage.removeItem(key))
        console.log("sessionStorage nettoyé")
      } catch (storageError) {
        console.warn("Erreur lors du nettoyage du storage:", storageError)
        // Ne pas faire échouer la déconnexion si le storage ne peut pas être nettoyé
      }
    }

    // Déconnecter de Supabase (nettoie automatiquement les cookies et localStorage)
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Erreur Supabase lors de la déconnexion:", error)
      // Même en cas d'erreur, on considère la déconnexion réussie si le storage est nettoyé
      return {
        success: true, // On retourne success même en cas d'erreur pour forcer la redirection
        error: getErrorMessage(error),
      }
    }

    // Nettoyer les cookies serveur en appelant l'API
    try {
      await fetch('/api/auth/sync-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: '',
          refresh_token: '',
        }),
      }).catch(() => {
        // Ignorer les erreurs de nettoyage des cookies serveur
      })
    } catch (apiError) {
      console.warn("Erreur nettoyage cookies serveur (non bloquant):", apiError)
    }

    console.log("Déconnexion réussie")
    return {
      success: true,
    }
  } catch (error: any) {
    console.error("Erreur lors de la déconnexion:", error)
    // Même en cas d'erreur, on retourne success pour forcer la redirection
    return {
      success: true,
      error: error.message || "Une erreur inattendue s'est produite",
    }
  }
}

/**
 * Récupérer l'utilisateur actuellement connecté
 * 
 * @returns Utilisateur connecté ou null
 */
export async function getCurrentUser() {
  try {
    // D'abord vérifier la session pour s'assurer qu'elle est valide
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      console.error("Erreur de session:", sessionError)
      return null
    }

    if (!session) {
      return null
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
        return null
      }
    }

    // Récupérer l'utilisateur
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError) {
      console.error("Erreur lors de la récupération de l'utilisateur:", userError)
      return null
    }

    if (!user) {
      return null
    }

    // Récupérer les données complètes depuis la table users
    const { data: userData, error: dbError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single()

    // Si erreur DB mais utilisateur existe dans auth, retourner l'utilisateur auth
    if (dbError && dbError.code !== 'PGRST116') {
      console.warn("Erreur lors de la récupération des données utilisateur:", dbError)
    }

    return userData || user
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error)
    return null
  }
}

/**
 * Vérifier si l'utilisateur est connecté
 * 
 * @returns true si connecté, false sinon
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return !!user
  } catch (error) {
    return false
  }
}

/**
 * Demander une réinitialisation de mot de passe
 * 
 * @param email - Email de l'utilisateur
 * @returns Réponse avec succès/erreur
 */
export async function resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    // URL de redirection : Supabase ajoutera automatiquement token_hash et type=recovery
    // On utilise le callback pour vérifier le token de manière sécurisée
    const redirectUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/auth/callback?type=recovery&next=/reset-password`
      : undefined

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    })

    if (error) {
      return {
        success: false,
        error: getErrorMessage(error),
      }
    }

    return {
      success: true,
    }
  } catch (error: any) {
    console.error("Erreur lors de la demande de réinitialisation:", error)
    return {
      success: false,
      error: error.message || "Une erreur inattendue s'est produite",
    }
  }
}

/**
 * Mettre à jour le mot de passe avec un token de réinitialisation
 * 
 * @param newPassword - Nouveau mot de passe
 * @returns Réponse avec succès/erreur
 */
export async function updatePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      return {
        success: false,
        error: getErrorMessage(error),
      }
    }

    return {
      success: true,
    }
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du mot de passe:", error)
    return {
      success: false,
      error: error.message || "Une erreur inattendue s'est produite",
    }
  }
}

/**
 * Convertir les erreurs Supabase en messages lisibles en français
 * 
 * @param error - Erreur Supabase
 * @returns Message d'erreur en français
 */
function getErrorMessage(error: any): string {
  const errorMessages: Record<string, string> = {
    "Invalid login credentials": "Email ou mot de passe incorrect",
    "Email not confirmed": "Veuillez confirmer votre email avant de vous connecter",
    "User already registered": "Cet email est déjà utilisé",
    "Password should be at least 6 characters": "Le mot de passe doit contenir au moins 6 caractères",
    "Signup is disabled": "L'inscription est désactivée",
    "Email rate limit exceeded": "Trop de tentatives. Veuillez réessayer plus tard",
    "Invalid email": "Adresse email invalide",
    "User not found": "Aucun compte trouvé avec cet email",
    "For security purposes, you can only request this once every 60 seconds": "Veuillez attendre 60 secondes avant de redemander un lien de réinitialisation",
  }

  // Chercher un message correspondant
  const errorCode = error.message || error.code || ""

  for (const [key, message] of Object.entries(errorMessages)) {
    if (errorCode.includes(key) || errorCode === key) {
      return message
    }
  }

  // Message par défaut
  return error.message || "Une erreur s'est produite. Veuillez réessayer."
}

