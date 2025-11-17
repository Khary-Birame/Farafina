"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Award, Sparkles } from "lucide-react"

export function PricingAccessibility() {
  const pricingPlans = [
    {
      name: "Mensuel",
      price: "25 000",
      currency: "FCFA",
      period: "/mois",
      features: [
        "2 séances par semaine",
        "Équipement d'entraînement fourni",
        "Suivi individuel",
        "Accès aux matchs amicaux",
      ],
    },
    {
      name: "Trimestriel",
      price: "65 000",
      currency: "FCFA",
      period: "/trimestre",
      popular: true,
      savings: "5% de réduction",
      features: [
        "2 séances par semaine",
        "Équipement complet fourni",
        "Suivi individuel + bilan trimestriel",
        "Accès à tous les matchs",
        "5% de réduction",
      ],
    },
    {
      name: "Annuel",
      price: "240 000",
      currency: "FCFA",
      period: "/an",
      savings: "10% de réduction",
      features: [
        "2 séances par semaine",
        "Équipement complet fourni",
        "Suivi individuel + bilans trimestriels",
        "Accès à tous les matchs et tournois",
        "10% de réduction",
        "Priorité inscriptions",
        "Performance Lab inclus",
      ],
    },
  ]

  return (
    <section id="inscription" className="py-24 bg-[#1A1A1A]/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, #D4AF37 1px, transparent 1px),
              linear-gradient(to bottom, #D4AF37 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-6">
            Tarifs & Accessibilité
          </h2>
          <p className="text-xl text-[#1A1A1A]/70 max-w-3xl mx-auto leading-relaxed">
            Des formules flexibles adaptées à tous les budgets. Bourses disponibles pour les talents méritants.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`p-8 hover:shadow-2xl transition-all duration-300 rounded-2xl relative ${
                plan.popular
                  ? "border-2 border-[#D4AF37] shadow-xl bg-white scale-105"
                  : "border-2 border-[#1A1A1A]/20 bg-white"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-[#000000] border-2 border-[#D4AF37] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Plus Populaire
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#000000] mb-4">{plan.name}</h3>
                <div className="flex items-end justify-center gap-1 mb-2">
                  <span className="text-5xl font-bold text-[#D4AF37]">{plan.price}</span>
                  <span className="text-lg text-[#1A1A1A]/70 mb-2">{plan.currency}</span>
                </div>
                <p className="text-sm text-[#1A1A1A]/70 mb-4">{plan.period}</p>
                {plan.savings && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#D4AF37]/10 rounded-full">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-sm font-semibold text-[#D4AF37]">
                      {plan.savings}
                    </span>
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="p-1 bg-[#D4AF37]/10 rounded-full mt-0.5 flex-shrink-0">
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <span className="text-sm text-[#000000] leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full rounded-lg font-semibold h-12 ${
                  plan.popular
                    ? "bg-[#000000] hover:bg-[#1A1A1A] hover:border-[#D4AF37] hover:border-2 text-white shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                    : "bg-[#000000] hover:bg-[#1A1A1A] hover:border-[#D4AF37] hover:border-2 text-white"
                }`}
              >
                <Link href="/admissions">Choisir ce Plan</Link>
              </Button>
            </Card>
          ))}
        </div>

        {/* Scholarships Section */}
        <Card className="p-8 md:p-12 bg-white border-2 border-[#D4AF37]/30 rounded-2xl shadow-lg">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-[#000000] border-2 border-[#D4AF37] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Award className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#000000] mb-3">
                Bourses Disponibles pour les Talents Méritants
              </h3>
              <p className="text-[#1A1A1A]/70 mb-6 leading-relaxed">
                Nous croyons que le talent ne doit pas être limité par les moyens financiers.
                La Farafina Foot Academy offre des bourses partielles et totales aux jeunes
                issus de familles à revenus modestes. Les dossiers sont étudiés en toute
                confidentialité avec une attention particulière portée au potentiel et à la motivation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-[#000000] hover:bg-[#1A1A1A] hover:border-[#D4AF37] hover:border-2 text-white font-semibold px-8 h-12 shadow-lg"
                >
                  <Link href="/admissions">Demander une Bourse</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-[#1A1A1A]/30 text-[#000000] hover:border-[#D4AF37] hover:text-[#D4AF37] font-semibold px-8 h-12"
                >
                  <Link href="/contact">Plus d'Informations</Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
