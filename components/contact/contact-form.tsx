"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { InputField, TextareaField, SelectField } from "@/components/ui/form-field"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube, Loader2, CheckCircle2 } from "lucide-react"
import { createFormSubmission } from "@/lib/supabase/form-submissions-helpers"
import { useAuth } from "@/lib/auth/auth-context"
import { toast } from "sonner"
import { useTranslation } from "@/lib/hooks/use-translation"

export function ContactForm() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    role: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { data, error } = await createFormSubmission({
        form_type: "contact",
        form_data: formData,
        user_id: user?.id || null,
        status: "pending",
      })

      if (error) {
        throw error
      }

      toast.success(t("contact.sent"), {
        description: t("contact.sentDescription"),
      })

      setIsSubmitted(true)
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        role: "",
        message: "",
      })

      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    } catch (error: any) {
      console.error("Erreur lors de l'envoi du message:", error)
      toast.error(t("contact.error"), {
        description: error.message || t("contact.errorDescription"),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Contact Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="font-sans font-bold text-3xl mb-2 text-[#1A1A1A]">{t("contact.sendMessage")}</h2>
            <p className="text-gray-600 mb-8">{t("contact.responseTime")}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label={t("contact.fullName")}
                name="fullName"
                type="text"
                placeholder={t("contact.fullNamePlaceholder")}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />

              <InputField
                label={t("contact.email")}
                name="email"
                type="email"
                placeholder={t("contact.emailPlaceholder")}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <SelectField
                label={t("contact.role")}
                name="role"
                placeholder={t("contact.rolePlaceholder")}
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
                required
                options={[
                  { value: "parent", label: t("contact.roles.parent") },
                  { value: "recruiter", label: t("contact.roles.recruiter") },
                  { value: "sponsor", label: t("contact.roles.sponsor") },
                  { value: "media", label: t("contact.roles.media") },
                  { value: "other", label: t("contact.roles.other") },
                ]}
              />

              <InputField
                label={t("contact.subject")}
                name="subject"
                type="text"
                placeholder={t("contact.subjectPlaceholder")}
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />

              <TextareaField
                label={t("contact.message")}
                name="message"
                placeholder={t("contact.messagePlaceholder")}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
              />

              {isSubmitted ? (
                <div className="w-full h-12 bg-green-50 border border-green-200 rounded-md flex items-center justify-center gap-2 text-green-700">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold">{t("contact.sent")}</span>
                </div>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold text-base transition-all duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t("contact.sending")}
                    </>
                  ) : (
                    t("contact.sendButton")
                  )}
                </Button>
              )}
            </form>
          </div>

          {/* Right Column - Contact Details */}
          <div className="space-y-8">
            <div>
              <h2 className="font-sans font-bold text-3xl mb-2 text-[#1A1A1A]">{t("contact.title")}</h2>
              <p className="text-gray-600 mb-8">{t("contact.contactDirectly")}</p>
            </div>

            {/* Contact Information Cards */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#1A1A1A] mb-1">{t("contact.location")}</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {t("contact.locationText")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#1A1A1A] mb-1">{t("contact.phone")}</h3>
                    <p className="text-gray-600">{t("footer.phone")}</p>
                    <p className="text-sm text-gray-500 mt-1">{t("contact.phoneHours")}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#1A1A1A] mb-1">{t("contact.emailLabel")}</h3>
                    <p className="text-gray-600">{t("footer.email")}</p>
                    <p className="text-sm text-gray-500 mt-1">{t("contact.emailResponse")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-4">{t("contact.followUs")}</h3>
              <p className="text-white/90 text-sm mb-4">{t("contact.socialDescription")}</p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
