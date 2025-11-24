"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { InputField, TextareaField, SelectField } from "@/components/ui/form-field"
import { createFormSubmission } from "@/lib/supabase/form-submissions-helpers"
import { useAuth } from "@/lib/auth/auth-context"
import { toast } from "sonner"
import { Loader2, CheckCircle2, Handshake, Building2, Mail, Phone, Target, FileText, Globe, TrendingUp, Award } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import { useMemo } from "react"

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
      // 1. Sauvegarder dans Supabase
      const { data: submissionData, error: submissionError } = await createFormSubmission({
        form_type: "partner",
        form_data: formData,
        user_id: user?.id || null,
        status: "pending",
      })
      if (submissionError) {
        console.error("Erreur sauvegarde Supabase:", submissionError)
        // On continue quand même pour essayer d'envoyer l'email
      }

      // 2. Envoyer l'email
      const emailResponse = await fetch("/api/partners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      // Vérifier que la réponse contient du contenu avant de parser le JSON
      const contentType = emailResponse.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const text = await emailResponse.text()
        throw new Error(text || "Erreur lors de l'envoi de l'email")
      }

      let emailResult
      try {
        const text = await emailResponse.text()
        emailResult = text ? JSON.parse(text) : {}
      } catch (parseError) {
        console.error("Erreur parsing JSON:", parseError)
        throw new Error("Réponse invalide du serveur")
      }

      if (!emailResponse.ok) {
        throw new Error(emailResult.error || "Erreur lors de l'envoi de l'email")
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

  const benefits = useMemo(() => [
    {
      icon: Globe,
      title: t("contact.partners.benefits.global.title"),
      description: t("contact.partners.benefits.global.description"),
    },
    {
      icon: TrendingUp,
      title: t("contact.partners.benefits.brand.title"),
      description: t("contact.partners.benefits.brand.description"),
    },
    {
      icon: Award,
      title: t("contact.partners.benefits.social.title"),
      description: t("contact.partners.benefits.social.description"),
    },
    {
      icon: Handshake,
      title: t("contact.partners.benefits.strategic.title"),
      description: t("contact.partners.benefits.strategic.description"),
    },
  ], [t])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative text-white py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#2a2a2a] to-[#1A1A1A]">
          {/* Modern Animated Background */}
          <div className="absolute inset-0">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-[#d17e00]/20 animate-pulse-glow" />

            {/* Geometric shapes */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
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
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <Handshake className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm font-medium">Partenariat Stratégique</span>
              </div>

              {/* Heading */}
              <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                {t("partners.title")}
              </h1>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
                {t("partners.subtitle")}
              </p>

              {/* Introduction Text */}
              <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto mb-8">
                {t("partners.introduction")}
              </p>

              {/* Decorative elements */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <div className="w-12 h-0.5 bg-[#D4AF37]" />
                <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <div className="w-12 h-0.5 bg-[#D4AF37]" />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground mb-4">
                  {t("contact.partners.whyPartner.title")}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t("contact.partners.description")}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div
                      key={index}
                      className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
                        <Icon className="w-6 h-6 text-[#D4AF37]" />
                      </div>
                      <h3 className="font-sans font-semibold text-lg text-foreground mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {isSubmitted ? (
                /* Success Message */
                <div className="bg-card border-2 border-green-200 dark:border-green-800 rounded-xl p-8 md:p-12 text-center shadow-lg">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {t("partners.submitSuccess")}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      {t("partners.submitSuccessDescription")}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Header du formulaire */}
                  <div className="text-center mb-8">
                    <h2 className="font-sans font-bold text-2xl md:text-3xl text-foreground mb-2">
                      Formulaire de Partenariat
                    </h2>
                    <p className="text-muted-foreground">
                      Remplissez ce formulaire pour initier un partenariat avec Farafina Foot Academy
                    </p>
                  </div>

                  {/* Form Container */}
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section 1: Informations de l'Organisation */}
                    <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                        <h3 className="font-sans font-semibold text-xl text-foreground">Informations de l'Organisation</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
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
                          className="md:col-span-2"
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
                      </div>
                    </div>

                    {/* Section 2: Coordonnées */}
                    <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                        <h3 className="font-sans font-semibold text-xl text-foreground">Coordonnées</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
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
                      </div>
                    </div>

                    {/* Section 3: Proposition de Partenariat */}
                    <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                        <h3 className="font-sans font-semibold text-xl text-foreground">Proposition de Partenariat</h3>
                      </div>
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
                    </div>

                    {/* Submit Button */}
                    <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold h-14 text-base shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            {t("partners.submitting")}
                          </>
                        ) : (
                          <>
                            <Handshake className="mr-2 h-5 w-5" />
                            {t("partners.submitButton")}
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
