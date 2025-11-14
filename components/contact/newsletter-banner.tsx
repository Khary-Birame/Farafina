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
    <section className="py-16 bg-[#1A1A1A]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Side - Text */}
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-sans font-bold text-xl md:text-2xl text-white mb-2">{t("newsletter.title")}</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  {t("newsletter.description")}
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-auto md:min-w-96">
              {subscribed ? (
                <div className="flex items-center gap-3 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-lg px-4 py-3">
                  <CheckCircle className="text-[#D4AF37]" size={24} />
                  <span className="text-white font-medium">{t("newsletter.subscribed")}</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder={t("newsletter.emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#ffffff] font-semibold px-6 h-12 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      t("newsletter.subscribe")
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
