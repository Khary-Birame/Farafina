"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Shield, Lock, CheckCircle2, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { signUp } from "@/lib/auth/auth-helpers"
import { useAuth } from "@/lib/auth/auth-context"

export function SignUpForm() {
  const router = useRouter()
  const { refreshUser } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as "player" | "parent" | "coach" | "club" | "admin",
    agreeToTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères")
      return
    }

    if (!formData.role) {
      setError("Veuillez sélectionner un rôle")
      return
    }

    if (!formData.agreeToTerms) {
      setError("Veuillez accepter les conditions d'utilisation")
      return
    }

    setLoading(true)

    try {
      const result = await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: formData.role,
      })

      if (result.success) {
        setSuccess(true)
        // Rafraîchir les données utilisateur
        await refreshUser()
        // Rediriger après 2 secondes
        setTimeout(() => {
          router.push("/")
          router.refresh()
        }, 2000)
      } else {
        setError(result.error || "Erreur lors de l'inscription")
      }
    } catch (err: any) {
      setError(err.message || "Une erreur inattendue s'est produite")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Illustration */}
          <div className="hidden lg:block relative h-[700px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#008037] via-[#00a045] to-[#d4af37] opacity-90" />
            <img
              src="/young-african-players-training-field.jpg"
              alt="Young players training"
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
              <div className="text-center space-y-6">
                <h2 className="font-sans font-bold text-4xl text-balance">Rejoignez l'Avenir du Football Africain</h2>
                <p className="text-lg text-white/90 max-w-md mx-auto text-pretty">
                  Créez votre compte pour accéder à votre portail de candidature, suivre votre statut d'admission et commencer votre
                  parcours avec Farafina Foot Academy.
                </p>
                <div className="flex items-center justify-center gap-8 pt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm text-white/80">Étudiants Actifs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">95%</div>
                    <div className="text-sm text-white/80">Taux de Réussite</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">20+</div>
                    <div className="text-sm text-white/80">Pays</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="font-sans font-bold text-3xl text-[#1A1A1A] mb-3">Créez Votre Compte Farafina</h1>
                <p className="text-muted-foreground text-pretty">
                  Accédez à votre candidature, téléchargez des documents et suivez votre statut d'admission.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6 mb-8 pb-8 border-b border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-[#D4AF37]" />
                  <span>Sécurisé</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 text-[#D4AF37]" />
                  <span>Chiffré</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Conforme RGPD</span>
                </div>
              </div>

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800 mb-1">Compte créé avec succès !</p>
                    <p className="text-xs text-green-700">
                      Vérifiez votre email pour confirmer votre compte. Redirection en cours...
                    </p>
                  </div>
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
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-[#1A1A1A]">
                    Nom Complet *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Entrez votre nom complet"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-[#1A1A1A]">
                    Adresse Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-[#1A1A1A]">
                    Mot de Passe *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Créez un mot de passe fort"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="h-12 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">Minimum 8 caractères</p>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#1A1A1A]">
                    Confirmer le Mot de Passe *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Ré-entrez votre mot de passe"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                      className="h-12 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium text-[#1A1A1A]">
                    Je suis un(e) *
                  </Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Sélectionnez votre rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parent">Parent / Tuteur</SelectItem>
                      <SelectItem value="player">Joueur / Étudiant</SelectItem>
                      <SelectItem value="coach">Entraîneur / Recruteur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    J'accepte les{" "}
                    <Link href="/terms" className="text-[#D4AF37] hover:underline font-medium">
                      Conditions d'Utilisation
                    </Link>{" "}
                    et la{" "}
                    <Link href="/privacy" className="text-[#D4AF37] hover:underline font-medium">
                      Politique de Confidentialité
                    </Link>
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#D4AF37] hover:bg-[#B8941F] text-[#ffffff] font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!formData.agreeToTerms || loading || success}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Création du compte...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Compte créé !
                    </>
                  ) : (
                    "Créer le Compte"
                  )}
                </Button>
              </form>

              {/* Login Redirect */}
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Vous avez déjà un compte ?{" "}
                  <Link href="/login" className="text-[#D4AF37] hover:underline font-medium">
                    Se connecter
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
