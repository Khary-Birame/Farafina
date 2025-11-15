"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle, Loader2 } from "lucide-react"
import { createFormSubmission } from "@/lib/supabase/form-submissions-helpers"
import { useAuth } from "@/lib/auth/auth-context"
import { toast } from "sonner"
import { useTranslation } from "@/lib/hooks/use-translation"

export function NewsletterBanner() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { data, error } = await createFormSubmission({
        form_type: "newsletter",
        form_data: { email },
        user_id: user?.id || null,
        status: "pending",
      })

      if (error) {
        throw error
      }

      toast.success(t("newsletter.subscribeSuccess"), {
        description: t("newsletter.subscribeSuccessDescription"),
      })

      setSubscribed(true)
      setEmail("")
      setTimeout(() => {
        setSubscribed(false)
      }, 3000)
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error)
      toast.error(t("newsletter.subscribeError"), {
        description: error.message || t("newsletter.subscribeErrorDescription"),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1A1A1A] via-[#2a2a2a] to-[#1A1A1A] relative overflow-hidden">
      {/* Modern Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-500 group">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left Side - Text */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/30 to-[#D4AF37]/10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Mail className="text-[#D4AF37]" size={32} />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-xl md:text-2xl text-white mb-2">{t("newsletter.title", "Restez Informé")}</h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {t("newsletter.description", "Recevez les dernières actualités, événements et opportunités de Farafina Foot Academy directement dans votre boîte de réception.")}
                  </p>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="w-full md:w-auto md:min-w-96">
                {subscribed ? (
                  <div className="flex items-center gap-3 bg-[#D4AF37]/20 border-2 border-[#D4AF37] rounded-xl px-6 py-4 animate-fade-in-up">
                    <CheckCircle className="text-[#D4AF37]" size={24} />
                    <span className="text-white font-semibold">{t("newsletter.subscribed", "Inscrit avec succès !")}</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex gap-3">
                    <Input
                      type="email"
                      placeholder={t("newsletter.emailPlaceholder", "Votre adresse email")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-[#D4AF37] rounded-xl"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#9a7a1a] text-white font-semibold px-6 h-12 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 transform hover:scale-105 rounded-xl"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        t("newsletter.subscribe", "S'abonner")
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
