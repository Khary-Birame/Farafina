"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Shield, Lock, CheckCircle2, Loader2, AlertCircle } from "lucide-react"
import { signIn } from "@/lib/auth/auth-helpers"
import { useAuth } from "@/lib/auth/auth-context"
import { useTranslation } from "@/lib/hooks/use-translation"
import { supabase } from "@/lib/supabase/client"
import { toast } from "sonner"

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { refreshUser } = useAuth()
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  // Vérifier s'il y a une redirection demandée pour afficher un message
  const redirectParam = searchParams.get("redirect")

  // Lire les paramètres d'URL pour les messages de confirmation/erreur et redirection
  useEffect(() => {
    const errorParam = searchParams.get("error")
    const messageParam = searchParams.get("message")
    const confirmedParam = searchParams.get("confirmed")
    const redirectParam = searchParams.get("redirect")

    if (confirmedParam === "true") {
      setSuccess(t("login.emailConfirmed"))
      // Nettoyer l'URL mais garder redirect si présent
      if (redirectParam) {
        router.replace(`/login?redirect=${encodeURIComponent(redirectParam)}`)
      } else {
        router.replace("/login")
      }
    } else if (errorParam && messageParam) {
      setError(messageParam)
      // Nettoyer l'URL mais garder redirect si présent
      if (redirectParam) {
        router.replace(`/login?redirect=${encodeURIComponent(redirectParam)}`)
      } else {
        router.replace("/login")
      }
    } else if (messageParam === "admin_required") {
      setError("Accès administrateur requis. Veuillez vous connecter avec un compte administrateur.")
    }
  }, [searchParams, router, t])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const result = await signIn({
        email: formData.email,
        password: formData.password,
      })

      if (result.success) {
        // Synchroniser la session de manière non-bloquante (en arrière-plan)
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          // Ne pas attendre la synchronisation, la faire en arrière-plan
          fetch('/api/auth/sync-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              access_token: session.access_token,
              refresh_token: session.refresh_token,
            }),
          }).catch(err => console.warn('Sync session error (non-blocking):', err))
        }

        // Rafraîchir les données utilisateur de manière non-bloquante
        refreshUser().catch(err => console.warn('Refresh user error (non-blocking):', err))

        // Vérifier s'il y a une redirection demandée
        const redirectParam = searchParams.get("redirect")

        // Rediriger immédiatement sans attendre
        if (redirectParam) {
          // Si c'est une redirection vers /admin, vérifier rapidement
          if (redirectParam === "/admin") {
            // Vérification admin en arrière-plan, rediriger immédiatement
            // Le layout admin fera la vérification finale
            toast.success("Connexion réussie", {
              description: "Vous allez être redirigé vers la console d'administration.",
              duration: 2000,
            })
            router.push(redirectParam)
            router.refresh()
          } else {
            toast.success("Connexion réussie", {
              description: "Vous allez être redirigé.",
              duration: 2000,
            })
            router.push(redirectParam)
            router.refresh()
          }
        } else {
          router.push("/")
          router.refresh()
        }
        
        // Réinitialiser le loading immédiatement après redirection
        setLoading(false)
      } else {
        setError(result.error || t("login.connectionError"))
        setLoading(false)
      }
    } catch (err: any) {
      setError(err.message || t("login.unexpectedError"))
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Illustration with gradient and photo */}
          <div className="hidden lg:block relative h-[600px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#008037] via-[#00a045] to-[#d4af37] opacity-90" />
            <img
              src="/african-youth-football-training-action-shot.jpg"
              alt="Football training action"
              className="w-full h-full object-cover mix-blend-overlay"
            />
            {/* Farafina Logo Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="text-white text-9xl font-bold">FFA</div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
              <div className="text-center space-y-6">
                <h2 className="font-sans font-bold text-4xl text-balance">{t("login.welcomeExcellence")}</h2>
                <p className="text-lg text-white/90 max-w-md mx-auto text-pretty">
                  {t("login.continueJourney")}
                </p>
                <div className="flex items-center justify-center gap-8 pt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-sm text-white/80">{t("common.access")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">100%</div>
                    <div className="text-sm text-white/80">{t("common.secure")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm text-white/80">{t("common.activeUsers")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="font-sans font-bold text-3xl text-[#1A1A1A] mb-3">
                  {t("login.title")}
                </h1>
                <p className="text-muted-foreground text-pretty">
                  {redirectParam === "/admin"
                    ? "Connectez-vous avec un compte administrateur pour accéder à la console d'administration."
                    : redirectParam
                      ? "Connectez-vous pour accéder au formulaire de candidature. C'est rapide et sécurisé !"
                      : t("login.subtitle")
                  }
                </p>
                {redirectParam === "/admin" && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 font-medium">
                      ⚠️ Seuls les comptes administrateurs peuvent accéder à cette section.
                    </p>
                  </div>
                )}
                {redirectParam && redirectParam !== "/admin" && (
                  <div className="mt-4 p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg">
                    <p className="text-sm text-[#1A1A1A] font-medium">
                      💡 Après votre connexion, vous serez automatiquement redirigé vers le formulaire de candidature.
                    </p>
                  </div>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6 mb-8 pb-8 border-b border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-[#D4AF37]" />
                  <span>{t("common.secure")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 text-[#D4AF37]" />
                  <span>{t("common.encrypted")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>{t("common.protected")}</span>
                </div>
              </div>

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-800">{success}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-[#1A1A1A]">
                    {t("login.emailLabel")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("forms.emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12 transition-all duration-200 focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-[#1A1A1A]">
                    {t("login.passwordLabel")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("forms.passwordPlaceholder")}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="h-12 pr-12 transition-all duration-200 focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-muted-foreground cursor-pointer">
                      {t("common.rememberMe")}
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#D4AF37] hover:text-[#B8941F] hover:underline font-medium transition-colors"
                  >
                    {t("common.forgotPassword")}
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-[#D4AF37] hover:bg-[#B8941F] text-[#ffffff] font-semibold text-base transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t("login.connecting")}
                    </>
                  ) : (
                    t("login.connectButton")
                  )}
                </Button>
              </form>

              {/* Secondary Actions */}
              {redirectParam !== "/admin" && (
                <div className="mt-8 space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-muted-foreground">{t("common.newToFarafina")}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <Link
                      href="/signup"
                      className="text-sm text-[#D4AF37] hover:text-[#B8941F] hover:underline font-medium transition-colors"
                    >
                      {t("common.noAccount")}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
