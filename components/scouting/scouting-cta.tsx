"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Brain, ArrowRight, Loader2 } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { createFormSubmission } from "@/lib/supabase/form-submissions-helpers"
import { toast } from "sonner"

export function ScoutingCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    message: "",
    consent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.consent) {
      alert("Veuillez accepter les conditions pour continuer.")
      return
    }

    setIsSubmitting(true)

    try {
      const { data, error } = await createFormSubmission({
        form_type: "scouting",
        form_data: formData,
        user_id: null, // Pas besoin d'être connecté pour cette demande
        status: "pending",
      })

      if (error) {
        throw error
      }

      toast.success("Demande envoyée !", {
        description: "Notre équipe vous contactera sous peu.",
      })

      setFormData({
        name: "",
        email: "",
        organization: "",
        role: "",
        message: "",
        consent: false,
      })
    } catch (error: any) {
      console.error("Erreur lors de l'envoi:", error)
      toast.error("Erreur lors de l'envoi", {
        description: error.message || "Veuillez réessayer plus tard.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-[#1A1A1A] via-[#1a1a1a] to-[#1A1A1A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(#D4AF37 1px, transparent 1px),
                           linear-gradient(90deg, #D4AF37 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 mb-6">
              <Brain className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm font-medium text-[#D4AF37]">Demander une Démo</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-4 text-balance">
              Découvrez l'Avenir du Recrutement avec Farafina IA
            </h2>
            <p className="text-xl text-gray-300 text-balance">
              Découvrez comment notre plateforme alimentée par l'IA peut transformer l'identification des talents et le développement des joueurs
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-white border-2 border-[#D4AF37]/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nom Complet *
                  </label>
                  <Input
                    id="name"
                    placeholder="Entrez votre nom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Adresse Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-foreground mb-2">
                    Organisation
                  </label>
                  <Input
                    id="organization"
                    placeholder="Nom de l'académie ou du club"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                    Votre Rôle
                  </label>
                  <Input
                    id="role"
                    placeholder="Entraîneur, Recruteur, Directeur..."
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Parlez-nous de votre intérêt pour notre plateforme de recrutement IA..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  className="mt-1 w-4 h-4 rounded border-border text-[#D4AF37] focus:ring-[#D4AF37]"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  required
                />
                <label htmlFor="consent" className="text-sm text-muted-foreground">
                  J'accepte de recevoir des communications concernant Farafina IA et je comprends que mes données seront traitées
                  conformément à la Politique de Confidentialité et aux règlements GDPR.
                </label>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Demander une démo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Des questions ? Contactez notre équipe IA à{" "}
                <a href="mailto:ai@farafinafoot.com" className="text-[#D4AF37] hover:underline font-medium">
                  ai@farafinafoot.com
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
