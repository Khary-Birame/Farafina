'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"

const pricingPlans = [
  {
    name: "Programme Externe",
    secondaryLabel: "École de foot",
    description: "Formation à temps partiel pour étudiants locaux",
    price: {
      xof: "500 000",
      eur: "760",
      usd: "850",
    },
    period: "par an",
    features: [
      "3 séances d'entraînement par semaine",
      "Matchs le week-end",
      "Soutien académique",
      "Psychologie du sport",
      "Conseils nutritionnels",
      "Suivi des performances",
      "Assurance incluse",
    ],
    popular: false,
  },
  {
    name: "Programme Résident",
    secondaryLabel: "Internat",
    description: "Programme résidentiel à temps plein",
    price: {
      xof: "2 500 000",
      eur: "3 800",
      usd: "4 250",
    },
    period: "par an",
    features: [
      "Formation à temps plein (6 jours/semaine)",
      "Hébergement et repas",
      "Programme académique complet",
      "Psychologie du sport",
      "Soins médicaux et assurance",
      "Suivi des performances",
      "Exposition internationale",
      "Orientation de carrière",
    ],
    popular: true,
  },
  {
    name: "Programme Féminin",
    secondaryLabel: undefined,
    description: "Autonomisation des athlètes féminines",
    price: {
      xof: "1 800 000",
      eur: "2 750",
      usd: "3 100",
    },
    period: "par an",
    features: [
      "Formation à temps plein",
      "Hébergement et repas",
      "Programme académique",
      "Mentorat féminin",
      "Développement du leadership",
      "Suivi des performances",
      "Exposition internationale",
      "Assurance incluse",
    ],
    popular: false,
  },
]

export function TuitionPricing() {
  const [showContact, setShowContact] = useState(false)

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-balance">
            Nous rejoindre
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Tarification transparente pour une formation de classe mondiale. Choisissez le programme qui correspond à
            vos objectifs et votre budget.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <Button
              onClick={() => setShowContact((prev) => !prev)}
              className="rounded-full bg-[#D4AF37] px-6 text-white transition hover:bg-[#b98d2c]"
            >
              En savoir +
            </Button>
            {showContact && (
              <p className="text-sm font-medium text-[#1A1A1A]">
                Contactez-nous au <a href="tel:+221763171202" className="text-[#D4AF37] hover:underline font-semibold">+221 763171202</a>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card border-2 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl group ${plan.popular
                ? "border-[#D4AF37] shadow-xl scale-105 lg:scale-110"
                : "border-border hover:border-[#D4AF37]/50 hover:-translate-y-2"
                }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-[#D4AF37] to-[#d17e00] text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                    <Star className="w-4 h-4 fill-current" />
                    Plus populaire
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className={`font-sans font-bold text-2xl ${plan.popular ? 'text-[#D4AF37]' : 'text-foreground'}`}>
                  {plan.name}
                </h3>
                {plan.secondaryLabel && (
                  <p className="mt-2 font-semibold uppercase tracking-[0.3em] text-sm text-[#D4AF37]">
                    {plan.secondaryLabel}
                  </p>
                )}
                <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              {/* Pricing */}
              <div className="mb-6 rounded-xl border border-dashed border-[#D4AF37]/30 bg-[#D4AF37]/5 px-4 py-3 text-center text-sm font-medium text-[#1A1A1A]">
                Contactez-nous au <a href="tel:+221763171202" className="text-[#D4AF37] hover:underline font-semibold">+221 763171202</a> pour une proposition personnalisée.
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {Array.from(new Set([...plan.features])).map(
                  (feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ),
                )}
              </ul>

              {/* CTA Button */}
              <Button
                className={`w-full ${plan.popular
                  ? "bg-[#D4AF37] hover:bg-[#d17e00] text-white"
                  : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  }`}
              >
                Sélectionner {plan.name}
              </Button>
            </div>
          ))}
        </div>

        {/* Payment Info */}
        <div className="max-w-3xl mx-auto mt-12 bg-card border border-border rounded-xl p-6">
          <h3 className="font-sans font-semibold text-lg mb-4 text-center">Options de paiement flexibles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-semibold text-[#D4AF37] mb-1">Multi-devises</div>
              <div className="text-sm text-muted-foreground">Payez en XOF, EUR ou USD</div>
            </div>
            <div>
              <div className="font-semibold text-[#D4AF37] mb-1">Échelonnement</div>
              <div className="text-sm text-muted-foreground">Paiements fractionnés disponibles</div>
            </div>
            <div>
              <div className="font-semibold text-[#D4AF37] mb-1">Sécurisé</div>
              <div className="text-sm text-muted-foreground">Virement bancaire et carte</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
