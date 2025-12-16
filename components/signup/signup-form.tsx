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
import { useTranslation } from "@/lib/hooks/use-translation"

export function SignUpForm() {
  const router = useRouter()
  const { refreshUser } = useAuth()
  const { t } = useTranslation()
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
      setError(t("signup.passwordMismatch"))
      return
    }

    if (formData.password.length < 6) {
      setError(t("signup.passwordTooShort"))
      return
    }

    if (!formData.role) {
      setError(t("signup.roleRequired"))
      return
    }

    if (!formData.agreeToTerms) {
      setError(t("signup.termsRequired"))
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
        setLoading(false) // Arrêter le loading même en cas de succès
        // Ne pas appeler refreshUser() car l'utilisateur n'est pas encore connecté
        // Il doit d'abord confirmer son email
        // Rediriger après 2 secondes
        setTimeout(() => {
          router.push("/")
        }, 2000)
      } else {
        setError(result.error || t("signup.signupError"))
      }
    } catch (err: any) {
      setError(err.message || t("login.unexpectedError"))
    } finally {
      setLoading(false) // S'assurer que le loading est toujours arrêté
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
                <h2 className="font-sans font-bold text-4xl text-balance">{t("signup.joinFuture")}</h2>
                <p className="text-lg text-white/90 max-w-md mx-auto text-pretty">
                  {t("signup.createAccount")}
                </p>
                <div className="flex items-center justify-center gap-8 pt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm text-white/80">{t("common.activeStudents")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">95%</div>
                    <div className="text-sm text-white/80">{t("common.successRate")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">20+</div>
                    <div className="text-sm text-white/80">{t("common.countries")}</div>
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
                <h1 className="font-sans font-bold text-3xl text-[#1A1A1A] mb-3">{t("signup.title")}</h1>
                <p className="text-muted-foreground text-pretty">
                  {t("signup.subtitle")}
                </p>
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
                  <span>{t("common.gdprCompliant")}</span>
                </div>
              </div>

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800 mb-1">{t("signup.successTitle")}</p>
                    <p className="text-xs text-green-700">
                      {t("signup.successDescription")}
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
                    {t("signup.fullNameLabel")}
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder={t("signup.fullNamePlaceholder")}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-[#1A1A1A]">
                    {t("signup.emailLabel")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("forms.emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-[#1A1A1A]">
                    {t("forms.password")} *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("forms.createPassword")}
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
                  <p className="text-xs text-muted-foreground">{t("forms.minCharacters")}</p>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#1A1A1A]">
                    {t("forms.confirmPassword")} *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t("forms.reEnterPassword")}
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
                    {t("signup.roleLabel")}
                  </Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={t("signup.rolePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parent">{t("signup.roles.parent")}</SelectItem>
                      <SelectItem value="player">{t("signup.roles.player")}</SelectItem>
                      <SelectItem value="coach">{t("signup.roles.coach")}</SelectItem>
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
                    {t("forms.acceptTerms")}{" "}
                    <Link href="/terms" className="text-[#D4AF37] hover:underline font-medium">
                      {t("forms.termsAndConditions")}
                    </Link>{" "}
                    {t("forms.and")}{" "}
                    <Link href="/privacy" className="text-[#D4AF37] hover:underline font-medium">
                      {t("forms.privacyPolicy")}
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
                      {t("signup.creating")}
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {t("signup.created")}
                    </>
                  ) : (
                    t("signup.createButton")
                  )}
                </Button>
              </form>

              {/* Login Redirect */}
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  {t("common.alreadyAccount")}{" "}
                  <Link href="/login" className="text-[#D4AF37] hover:underline font-medium">
                    {t("common.login")}
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
