"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Mail, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react"
import { resetPassword } from "@/lib/auth/auth-helpers"
import { toast } from "sonner"
import { useTranslation } from "@/lib/hooks/use-translation"

function ForgotPasswordContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { t } = useTranslation()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Vérifier les paramètres d'URL pour les messages d'erreur
    useEffect(() => {
        const errorParam = searchParams.get("error")
        const messageParam = searchParams.get("message")

        if (errorParam && messageParam) {
            setError(messageParam)
            // Nettoyer l'URL
            router.replace("/forgot-password")
        }
    }, [searchParams, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!email || !email.trim()) {
            setError("Veuillez entrer une adresse email valide.")
            setLoading(false)
            return
        }

        try {
            const result = await resetPassword(email.trim())

            if (result.success) {
                setSuccess(true)
                toast.success("Email envoyé", {
                    description: "Un lien de réinitialisation a été envoyé à votre adresse email.",
                })
            } else {
                const errorMessage = result.error || "Impossible d'envoyer l'email de réinitialisation."
                setError(errorMessage)
                toast.error("Erreur", {
                    description: errorMessage,
                })
            }
        } catch (error: any) {
            const errorMessage = error.message || "Une erreur inattendue s'est produite."
            setError(errorMessage)
            toast.error("Erreur", {
                description: errorMessage,
            })
        } finally {
            setLoading(false)
        }
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
                                    <Mail className="w-8 h-8 text-[#D4AF37]" />
                                </div>
                                <h1 className="font-sans font-bold text-3xl text-[#1A1A1A] mb-3">
                                    Mot de passe oublié ?
                                </h1>
                                <p className="text-muted-foreground text-pretty">
                                    {success
                                        ? "Vérifiez votre boîte de réception. Nous vous avons envoyé un lien pour réinitialiser votre mot de passe."
                                        : "Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe."}
                                </p>
                            </div>

                            {success ? (
                                <div className="space-y-6">
                                    {/* Message de succès */}
                                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="text-sm text-green-800 font-medium mb-1">
                                                Email envoyé avec succès
                                            </p>
                                            <p className="text-xs text-green-700">
                                                Si un compte existe avec l'adresse <strong>{email}</strong>, vous recevrez un email avec les instructions pour réinitialiser votre mot de passe.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="space-y-3">
                                        <Button
                                            onClick={() => {
                                                setSuccess(false)
                                                setEmail("")
                                            }}
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Envoyer un autre email
                                        </Button>
                                        <Button
                                            onClick={() => router.push("/login")}
                                            className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                                        >
                                            Retour à la connexion
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Message d'erreur */}
                                    {error && (
                                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="text-sm text-red-800 font-medium mb-1">
                                                    Erreur
                                                </p>
                                                <p className="text-xs text-red-700">
                                                    {error}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium text-[#1A1A1A]">
                                            Adresse Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="votre.email@exemple.com"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                                setError(null)
                                            }}
                                            required
                                            className={`h-12 transition-all duration-200 focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] ${error ? "border-red-500" : ""
                                                }`}
                                        />
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
                                                Envoi en cours...
                                            </>
                                        ) : (
                                            "Envoyer le lien de réinitialisation"
                                        )}
                                    </Button>
                                </form>
                            )}

                            {/* Info */}
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-xs text-blue-800">
                                            <strong>Conseil :</strong> Vérifiez également votre dossier spam si vous ne recevez pas l'email dans quelques minutes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default function ForgotPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="pt-20 pb-24">
                    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
                        <div className="w-full max-w-md">
                            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
                                <div className="flex items-center justify-center">
                                    <Loader2 className="w-6 h-6 animate-spin text-[#D4AF37]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        }>
            <ForgotPasswordContent />
        </Suspense>
    )
}

