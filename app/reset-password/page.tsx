"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2, Lock, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react"
import { updatePassword } from "@/lib/auth/auth-helpers"
import { toast } from "sonner"
import { useTranslation } from "@/lib/hooks/use-translation"
import { supabase } from "@/lib/supabase/client"

export default function ResetPasswordPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { t } = useTranslation()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [verifying, setVerifying] = useState(true)
    const [isValidToken, setIsValidToken] = useState(false)
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState({
        password: "",
        confirmPassword: "",
    })

    // Vérifier si le token est valide au chargement
    useEffect(() => {
        async function verifyToken() {
            try {
                // Vérifier si on a une session (créée par le callback)
                const { data: { session } } = await supabase.auth.getSession()

                if (session) {
                    setIsValidToken(true)
                } else {
                    // Si pas de session, vérifier les paramètres d'URL
                    const token = searchParams.get("token")
                    const tokenHash = searchParams.get("token_hash")

                    if (!token && !tokenHash) {
                        setIsValidToken(false)
                        toast.error("Lien invalide", {
                            description: "Le lien de réinitialisation est invalide ou a expiré.",
                        })
                        router.push("/forgot-password")
                    } else {
                        // Le token sera vérifié par le callback
                        setIsValidToken(true)
                    }
                }
            } catch (error) {
                console.error("Erreur vérification token:", error)
                setIsValidToken(false)
                router.push("/forgot-password")
            } finally {
                setVerifying(false)
            }
        }

        verifyToken()
    }, [searchParams, router])

    const validatePassword = (password: string): string => {
        if (password.length < 8) {
            return "Le mot de passe doit contenir au moins 8 caractères"
        }
        if (!/(?=.*[a-z])/.test(password)) {
            return "Le mot de passe doit contenir au moins une lettre minuscule"
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            return "Le mot de passe doit contenir au moins une lettre majuscule"
        }
        if (!/(?=.*\d)/.test(password)) {
            return "Le mot de passe doit contenir au moins un chiffre"
        }
        return ""
    }

    const handlePasswordChange = (value: string) => {
        setFormData({ ...formData, password: value })
        setErrors({ ...errors, password: validatePassword(value) })

        // Réinitialiser l'erreur de confirmation si le mot de passe change
        if (formData.confirmPassword && value !== formData.confirmPassword) {
            setErrors({ ...errors, password: errors.password, confirmPassword: "Les mots de passe ne correspondent pas" })
        } else if (formData.confirmPassword && value === formData.confirmPassword) {
            setErrors({ ...errors, password: errors.password, confirmPassword: "" })
        }
    }

    const handleConfirmPasswordChange = (value: string) => {
        setFormData({ ...formData, confirmPassword: value })

        if (value !== formData.password) {
            setErrors({ ...errors, confirmPassword: "Les mots de passe ne correspondent pas" })
        } else {
            setErrors({ ...errors, confirmPassword: "" })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validation
        const passwordError = validatePassword(formData.password)
        if (passwordError) {
            setErrors({ ...errors, password: passwordError })
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setErrors({ ...errors, confirmPassword: "Les mots de passe ne correspondent pas" })
            return
        }

        setLoading(true)

        try {
            const result = await updatePassword(formData.password)

            if (result.success) {
                toast.success("Mot de passe mis à jour", {
                    description: "Votre mot de passe a été réinitialisé avec succès.",
                })

                // Attendre un peu puis rediriger vers la connexion
                setTimeout(() => {
                    router.push("/login?message=password_reset_success")
                }, 2000)
            } else {
                toast.error("Erreur", {
                    description: result.error || "Impossible de réinitialiser le mot de passe.",
                })
            }
        } catch (error: any) {
            toast.error("Erreur", {
                description: error.message || "Une erreur inattendue s'est produite.",
            })
        } finally {
            setLoading(false)
        }
    }

    if (verifying) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-[#D4AF37] mx-auto mb-4" />
                    <p className="text-muted-foreground">Vérification du lien...</p>
                </div>
            </div>
        )
    }

    if (!isValidToken) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="pt-20 pb-24">
                    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
                        <div className="w-full max-w-md">
                            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
                                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                                <h1 className="font-sans font-bold text-2xl text-[#1A1A1A] mb-3">
                                    Lien invalide
                                </h1>
                                <p className="text-muted-foreground mb-6">
                                    Le lien de réinitialisation est invalide ou a expiré.
                                </p>
                                <Button
                                    onClick={() => router.push("/forgot-password")}
                                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                                >
                                    Demander un nouveau lien
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="pt-20 pb-24">
                <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md">
                        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
                            {/* Retour */}
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 text-sm text-[#D4AF37] hover:text-[#B8941F] mb-6 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Retour à la connexion
                            </Link>

                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Lock className="w-8 h-8 text-[#D4AF37]" />
                                </div>
                                <h1 className="font-sans font-bold text-3xl text-[#1A1A1A] mb-3">
                                    Réinitialiser votre mot de passe
                                </h1>
                                <p className="text-muted-foreground text-pretty">
                                    Entrez votre nouveau mot de passe ci-dessous.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Nouveau mot de passe */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium text-[#1A1A1A]">
                                        Nouveau mot de passe
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Entrez votre nouveau mot de passe"
                                            value={formData.password}
                                            onChange={(e) => handlePasswordChange(e.target.value)}
                                            required
                                            className={`h-12 pr-12 transition-all duration-200 focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] ${errors.password ? "border-red-500" : ""
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-xs text-red-600 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.password}
                                        </p>
                                    )}
                                    <p className="text-xs text-muted-foreground">
                                        Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.
                                    </p>
                                </div>

                                {/* Confirmer le mot de passe */}
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#1A1A1A]">
                                        Confirmer le mot de passe
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirmez votre nouveau mot de passe"
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                            required
                                            className={`h-12 pr-12 transition-all duration-200 focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] ${errors.confirmPassword ? "border-red-500" : ""
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-xs text-red-600 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={loading || !!errors.password || !!errors.confirmPassword}
                                    className="w-full h-12 bg-[#D4AF37] hover:bg-[#B8941F] text-[#ffffff] font-semibold text-base transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Réinitialisation en cours...
                                        </>
                                    ) : (
                                        "Réinitialiser le mot de passe"
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

