"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { InputField, TextareaField, SelectField } from "@/components/ui/form-field"
import { createFormSubmission } from "@/lib/supabase/form-submissions-helpers"
import { useAuth } from "@/lib/auth/auth-context"
import { toast } from "sonner"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"

export default function BecomePartnerPage() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    partnershipType: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { data, error } = await createFormSubmission({
        form_type: "partner",
        form_data: formData,
        user_id: user?.id || null,
        status: "pending",
      })

      if (error) {
        throw error
      }

      toast.success(t("partners.submitSuccess"), {
        description: t("partners.submitSuccessDescription"),
      })

      setIsSubmitted(true)
      setFormData({
        organizationName: "",
        contactName: "",
        email: "",
        phone: "",
        partnershipType: "",
        message: "",
      })

      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    } catch (error: any) {
      console.error("Erreur lors de l'envoi:", error)
      toast.error(t("partners.submitError"), {
        description: error.message || t("partners.submitErrorDescription"),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const partnershipTypes = [
    { value: "club", label: t("partners.partnershipTypes.club") },
    { value: "institution", label: t("partners.partnershipTypes.institution") },
    { value: "brand", label: t("partners.partnershipTypes.brand") },
    { value: "foundation", label: t("partners.partnershipTypes.foundation") },
    { value: "media", label: t("partners.partnershipTypes.media") },
    { value: "other", label: t("partners.partnershipTypes.other") },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              {t("partners.title")}
            </h1>
            <p className="text-xl md:text-2xl text-black/80 mb-12 max-w-2xl mx-auto">
              {t("partners.subtitle")}
            </p>
          </div>
        </section>

        {/* Introduction Text */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-black text-center leading-relaxed max-w-3xl mx-auto">
              {t("partners.introduction")}
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              /* Success Message */
              <div className="bg-white border border-[#1A1A1A] rounded-lg p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-black mb-4">
                    {t("partners.submitSuccess")}
                  </h2>
                  <p className="text-lg text-black">
                    {t("partners.submitSuccessDescription")}
                  </p>
                </div>
              </div>
            ) : (
              /* Form Container - Style similaire à Contact */
              <div className="bg-white border border-[#1A1A1A] rounded-lg p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <InputField
                    label={t("partners.organizationName")}
                    name="organizationName"
                    type="text"
                    placeholder={t("partners.organizationNamePlaceholder")}
                    value={formData.organizationName}
                    onChange={(e) =>
                      setFormData({ ...formData, organizationName: e.target.value })
                    }
                    required
                  />

                  <InputField
                    label={t("partners.contactName")}
                    name="contactName"
                    type="text"
                    placeholder={t("partners.contactNamePlaceholder")}
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                    required
                  />

                  <InputField
                    label={t("partners.email")}
                    name="email"
                    type="email"
                    placeholder={t("partners.emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />

                  <InputField
                    label={t("partners.phone")}
                    name="phone"
                    type="tel"
                    placeholder={t("partners.phonePlaceholder")}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />

                  <SelectField
                    label={t("partners.partnershipType")}
                    name="partnershipType"
                    placeholder={t("partners.partnershipTypePlaceholder")}
                    value={formData.partnershipType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, partnershipType: value })
                    }
                    options={partnershipTypes}
                    required
                  />

                  <TextareaField
                    label={t("partners.message")}
                    name="message"
                    placeholder={t("partners.messagePlaceholder")}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={6}
                  />

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-black hover:bg-[#1A1A1A] text-white border border-[#D4AF37] font-semibold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? t("partners.submitting") : t("partners.submitButton")}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
