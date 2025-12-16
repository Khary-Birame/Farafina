"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { MissionVision } from "@/components/about/mission-vision"
import { Infrastructures } from "@/components/about/infrastructures"
import { Leadership } from "@/components/about/leadership"
import { SocialInclusion } from "@/components/about/social-inclusion"

function HomePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Gérer les erreurs d'authentification qui arrivent depuis Supabase
  useEffect(() => {
    const error = searchParams.get("error")
    const errorCode = searchParams.get("error_code")
    const errorDescription = searchParams.get("error_description")

    // Vérifier si c'est une erreur d'OTP expiré (lien de réinitialisation)
    if (error === "access_denied" && errorCode === "otp_expired") {
      // Vérifier si c'est pour la réinitialisation de mot de passe
      const hash = typeof window !== "undefined" ? window.location.hash : ""
      const isRecovery = hash.includes("type=recovery") || hash.includes("recovery")

      if (isRecovery) {
        router.replace("/forgot-password?error=token_expired&message=Le lien de réinitialisation a expiré. Veuillez demander un nouveau lien.")
      } else {
        router.replace("/login?error=token_expired&message=Le lien de confirmation a expiré. Veuillez demander un nouveau lien.")
      }
      return
    }

    // Autres erreurs d'authentification
    if (error && errorCode) {
      console.error("Erreur d'authentification:", { error, errorCode, errorDescription })
      // Nettoyer l'URL
      router.replace("/")
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <AboutHero />
        <MissionVision />
        <Infrastructures />
        <Leadership />
        <SocialInclusion />
      </main>
      <Footer />
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-pulse text-muted-foreground">Chargement...</div>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <HomePageContent />
    </Suspense>
  )
}
