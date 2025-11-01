"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Brain, ArrowRight } from "lucide-react"

export function ScoutingCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#2E2E2E] via-[#1a1a1a] to-[#2E2E2E] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(#f29200 1px, transparent 1px),
                           linear-gradient(90deg, #f29200 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f29200]/20 border border-[#f29200]/30 mb-6">
              <Brain className="w-4 h-4 text-[#f29200]" />
              <span className="text-sm font-medium text-[#f29200]">Demander une Démo</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-4 text-balance">
              Découvrez l'Avenir du Recrutement avec Farafina IA
            </h2>
            <p className="text-xl text-gray-300 text-balance">
              Découvrez comment notre plateforme alimentée par l'IA peut transformer l'identification des talents et le développement des joueurs
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-white/95 backdrop-blur-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nom Complet *
                  </label>
                  <Input id="name" placeholder="Entrez votre nom" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Adresse Email *
                  </label>
                  <Input id="email" type="email" placeholder="votre@email.com" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-foreground mb-2">
                    Organisation
                  </label>
                  <Input id="organization" placeholder="Nom de l'académie ou du club" />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                    Votre Rôle
                  </label>
                  <Input id="role" placeholder="Entraîneur, Recruteur, Directeur..." />
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
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  className="mt-1 w-4 h-4 rounded border-border text-[#f29200] focus:ring-[#f29200]"
                  required
                />
                <label htmlFor="consent" className="text-sm text-muted-foreground">
                  J'accepte de recevoir des communications concernant Farafina IA et je comprends que mes données seront traitées
                  conformément à la Politique de Confidentialité et aux règlements GDPR.
                </label>
              </div>

              <Button type="submit" size="lg" className="w-full bg-[#f29200] hover:bg-[#d17f00] text-white">
                Demander l'Accès à la Démo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Des questions ? Contactez notre équipe IA à{" "}
                <a href="mailto:ai@farafinafoot.com" className="text-[#f29200] hover:underline font-medium">
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
