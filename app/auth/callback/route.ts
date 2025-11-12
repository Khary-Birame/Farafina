import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

/**
 * Route de callback pour la confirmation d'email Supabase
 * 
 * Cette route est appelée quand l'utilisateur clique sur le lien
 * de confirmation dans son email.
 * 
 * Supabase redirige vers cette route avec des paramètres :
 * - type: Le type d'action (ex: "signup", "recovery")
 * - token: Le token de confirmation
 * - redirect_to: L'URL de redirection après confirmation
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get("token_hash")
  const token = requestUrl.searchParams.get("token")
  const type = requestUrl.searchParams.get("type")
  const next = requestUrl.searchParams.get("next") || "/"

  // Créer le client Supabase côté serveur
  const supabase = await createServerClient()

  // Si un token_hash ou token est présent, c'est une confirmation d'email
  if ((token_hash || token) && type) {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token_hash || token || undefined,
        type: type as "signup" | "email" | "recovery" | "invite" | "magiclink" | "email_change",
      })

      if (error) {
        console.error("Erreur de vérification OTP:", error)
        // En cas d'erreur, rediriger vers la page de login avec un message d'erreur
        const errorUrl = new URL("/login", requestUrl.origin)
        errorUrl.searchParams.set("error", "token_invalid")
        errorUrl.searchParams.set("message", "Le lien de confirmation est invalide ou a expiré. Veuillez demander un nouveau lien.")
        return NextResponse.redirect(errorUrl.toString())
      }

      // Succès : rediriger vers la page de login avec un message de succès
      const successUrl = new URL("/login", requestUrl.origin)
      successUrl.searchParams.set("confirmed", "true")
      return NextResponse.redirect(successUrl.toString())
    } catch (err: any) {
      console.error("Erreur inattendue lors de la vérification:", err)
      const errorUrl = new URL("/login", requestUrl.origin)
      errorUrl.searchParams.set("error", "unexpected_error")
      errorUrl.searchParams.set("message", "Une erreur inattendue s'est produite. Veuillez réessayer.")
      return NextResponse.redirect(errorUrl.toString())
    }
  }

  // Si pas de token, vérifier la session actuelle
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    // L'utilisateur est déjà connecté, rediriger
    return NextResponse.redirect(new URL(next, requestUrl.origin).toString())
  }

  // Pas de session et pas de token : rediriger vers login
  return NextResponse.redirect(new URL("/login", requestUrl.origin).toString())
}

