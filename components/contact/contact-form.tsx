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
  const { t, loading } = useTranslation()
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

  // Afficher un loader pendant le chargement des traductions
  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-7xl mx-auto">
          {/* Left Column - Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-500">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-3 py-1.5 rounded-full mb-4">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wide">Formulaire</span>
              </div>
              <h2 className="font-sans font-bold text-2xl md:text-3xl mb-3 text-[#1A1A1A] leading-tight">
                {t("contact.sendMessage", "Envoyez-nous un Message")}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">{t("contact.responseTime", "Nous vous répondrons dans les 24 heures.")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label={t("contact.fullName")}
                name="fullName"
                type="text"
                placeholder={t("contact.fullNamePlaceholder")}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                className="border-black/20 focus-visible:border-black/40"
              />

              <InputField
                label={t("contact.email")}
                name="email"
                type="email"
                placeholder={t("contact.emailPlaceholder")}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="border-black/20 focus-visible:border-black/40"
              />

              <SelectField
                label={t("contact.role")}
                name="role"
                placeholder={t("contact.rolePlaceholder")}
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
                required
                options={[
                  { value: "ong", label: t("contact.roles.ong", "ONG") },
                  { value: "fondation", label: t("contact.roles.fondation", "Fondation") },
                  { value: "recruiter", label: t("contact.roles.recruiter", "Recruteur") },
                  { value: "sponsor", label: t("contact.roles.sponsor", "Sponsor") },
                  { value: "media", label: t("contact.roles.media", "Média") },
                  { value: "other", label: t("contact.roles.other", "Autre") },
                ]}
                className="border-black/20 focus-visible:border-black/40"
              />

              <InputField
                label={t("contact.subject")}
                name="subject"
                type="text"
                placeholder={t("contact.subjectPlaceholder")}
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="border-black/20 focus-visible:border-black/40"
              />

              <TextareaField
                label={t("contact.message")}
                name="message"
                placeholder={t("contact.messagePlaceholder")}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="border-black/20 focus-visible:border-black/40"
              />

              {isSubmitted ? (
                <div className="w-full p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl flex items-center justify-center gap-4 shadow-lg animate-fade-in-up">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg text-green-800">{t("contact.sent", "Message envoyé avec succès !")}</p>
                    <p className="text-sm text-green-700 mt-1">{t("contact.sentDescription", "Nous vous répondrons dans les 24 heures.")}</p>
                  </div>
                </div>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#9a7a1a] text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {t("contact.sending", "Envoi en cours...")}
                    </>
                  ) : (
                    t("contact.sendButton", "Envoyer le Message")
                  )}
                </Button>
              )}
            </form>
          </div>

          {/* Right Column - Contact Details */}
          <div className="space-y-6">
            <div className="animate-slide-in-right">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-3 py-1.5 rounded-full mb-4">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wide">Informations</span>
              </div>
              <h2 className="font-sans font-bold text-2xl md:text-3xl mb-3 text-[#1A1A1A] leading-tight">
                {t("contact.title", "Contactez-nous")}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("contact.contactDirectly", "Contactez-nous directement via l'un des canaux ci-dessous.")}
              </p>
            </div>

            {/* Contact Information Cards */}
            <div className="space-y-4">
              {/* Location Card */}
              <a
                href="https://www.google.com/maps/search/fann+hock+boulevard+martin+luther+king+n+10+dakar/@14.6792747,-17.4652576,16z?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-6 hover:shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300 block transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#D4AF37]/30 group-hover:to-[#D4AF37]/20 transition-all duration-300 shadow-sm">
                    <MapPin className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" size={26} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base text-[#1A1A1A] mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {t("contact.location", "Notre Localisation")}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line group-hover:text-gray-700 transition-colors">
                      {t("contact.locationText", "Farafina Foot Academy\nFann Hock, Région de Dakar\nSénégal, Afrique de l'Ouest")}
                    </p>
                  </div>
                </div>
              </a>

              {/* Phone Card */}
              <div className="group bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-6 hover:shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#D4AF37]/30 group-hover:to-[#D4AF37]/20 transition-all duration-300 shadow-sm">
                    <Phone className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" size={26} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base text-[#1A1A1A] mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {t("contact.phone", "Téléphone")}
                    </h3>
                    <a href="tel:+221763171202" className="text-gray-600 text-sm hover:text-[#D4AF37] font-medium transition-colors block">
                      {t("footer.phone", "+221 XX XXX XX XX")}
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      {t("contact.phoneHours", "Lun-Ven, 9h00 - 18h00 (GMT)")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="group bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-6 hover:shadow-xl hover:border-[#D4AF37]/30 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#D4AF37]/30 group-hover:to-[#D4AF37]/20 transition-all duration-300 shadow-sm">
                    <Mail className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" size={26} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base text-[#1A1A1A] mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {t("contact.emailLabel", "Email")}
                    </h3>
                    <a href={`mailto:${t("footer.email", "info@farafinafootacademy.com")}`} className="text-gray-600 text-sm hover:text-[#D4AF37] font-medium transition-colors block break-all">
                      {t("footer.email", "info@farafinafootacademy.com")}
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      {t("contact.emailResponse", "Nous répondrons dans les 24 heures")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow Us Section */}
            <div className="bg-gradient-to-br from-[#D4AF37] via-[#B8941F] to-[#D4AF37] rounded-2xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden group">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <h3 className="font-semibold text-lg md:text-xl mb-2">
                  {t("contact.followUs", "Suivez-nous")}
                </h3>
                <p className="text-white/90 text-sm mb-6 leading-relaxed">
                  {t("contact.socialDescription", "Restez connectés sur les réseaux sociaux")}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-3 shadow-lg"
                    aria-label="Facebook"
                  >
                    <Facebook className="text-white" size={22} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-3 shadow-lg"
                    aria-label="Twitter"
                  >
                    <Twitter className="text-white" size={22} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-3 shadow-lg"
                    aria-label="Instagram"
                  >
                    <Instagram className="text-white" size={22} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-3 shadow-lg"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="text-white" size={22} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-3 shadow-lg"
                    aria-label="YouTube"
                  >
                    <Youtube className="text-white" size={22} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



