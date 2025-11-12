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

export default function BecomePartnerPage() {
  const { user } = useAuth()
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

      toast.success("Demande de partenariat envoyée !", {
        description: "Nous vous contacterons sous peu.",
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
      toast.error("Erreur lors de l'envoi", {
        description: error.message || "Veuillez réessayer plus tard.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const partnershipTypes = [
    { value: "club", label: "Club de football" },
    { value: "institution", label: "Institution" },
    { value: "brand", label: "Marque" },
    { value: "foundation", label: "Fondation" },
    { value: "media", label: "Média" },
    { value: "other", label: "Autre" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Devenir Partenaire
            </h1>
            <p className="text-xl md:text-2xl text-black/80 mb-12 max-w-2xl mx-auto">
              Rejoignez notre vision et construisons l'avenir du football africain.
            </p>
          </div>
        </section>

        {/* Introduction Text */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-black text-center leading-relaxed max-w-3xl mx-auto">
              La Farafina Foot Academy construit des partenariats durables avec les clubs, institutions, marques et fondations engagées dans le développement du football et de la jeunesse africaine.
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
                    Merci pour votre intérêt
                  </h2>
                  <p className="text-lg text-black">
                    Notre équipe vous contactera sous 72 heures.
                  </p>
                </div>
              </div>
            ) : (
              /* Form Container - Style similaire à Contact */
              <div className="bg-white border border-[#1A1A1A] rounded-lg p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <InputField
                    label="Nom de l'organisation"
                    name="organizationName"
                    type="text"
                    placeholder="Nom de votre organisation"
                    value={formData.organizationName}
                    onChange={(e) =>
                      setFormData({ ...formData, organizationName: e.target.value })
                    }
                    required
                  />

                  <InputField
                    label="Nom et prénom du contact"
                    name="contactName"
                    type="text"
                    placeholder="Nom et prénom"
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                    required
                  />

                  <InputField
                    label="Email professionnel"
                    name="email"
                    type="email"
                    placeholder="votre.email@organisation.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />

                  <InputField
                    label="Numéro de téléphone"
                    name="phone"
                    type="tel"
                    placeholder="+221 XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />

                  <SelectField
                    label="Type de partenariat souhaité"
                    name="partnershipType"
                    placeholder="Sélectionnez un type de partenariat"
                    value={formData.partnershipType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, partnershipType: value })
                    }
                    options={partnershipTypes}
                    required
                  />

                  <TextareaField
                    label="Message / Présentation du projet"
                    name="message"
                    placeholder="Présentez votre projet et vos objectifs de partenariat..."
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
                      {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
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
