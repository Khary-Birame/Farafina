"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Award } from "lucide-react"

export function PricingPayment() {
  const pricingPlans = [
    {
      name: "Mensuel",
      price: "25 000",
      currency: "FCFA",
      period: "/mois",
      features: ["2 séances par semaine", "Équipement d'entraînement fourni", "Suivi individuel"],
    },
    {
      name: "Trimestriel",
      price: "65 000",
      currency: "FCFA",
      period: "/trimestre",
      popular: true,
      features: [
        "2 séances par semaine",
        "Équipement complet fourni",
        "Suivi individuel + bilan",
        "5% de réduction",
      ],
    },
    {
      name: "Annuel",
      price: "240 000",
      currency: "FCFA",
      period: "/an",
      features: [
        "2 séances par semaine",
        "Équipement complet fourni",
        "Suivi individuel + bilans trimestriels",
        "10% de réduction",
        "Priorité inscriptions",
      ],
    },
  ]

  return (
    <section id="inscription" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">Tarifs & Paiement</h2>
          <p className="text-lg text-[#1A1A1A]/70 max-w-3xl mx-auto leading-relaxed">
            Des formules flexibles adaptées à tous les budgets. Bourses disponibles pour les
            jeunes talents.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`p-8 hover:shadow-xl transition-all duration-300 rounded-xl ${
                plan.popular
                  ? "border-2 border-[#D4AF37] shadow-lg relative bg-white"
                  : "border-2 border-[#C0C0C0] bg-white"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-[#D4AF37] text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
                    Plus Populaire
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">{plan.name}</h3>
                <div className="flex items-end justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold text-[#D4AF37]">{plan.price}</span>
                  <span className="text-lg text-[#1A1A1A]/70 mb-1">{plan.currency}</span>
                </div>
                <p className="text-sm text-[#1A1A1A]/70">{plan.period}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="p-1 bg-[#D4AF37]/10 rounded-full mt-0.5">
                      <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    </div>
                    <span className="text-sm text-[#1A1A1A] leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full rounded-lg font-semibold ${
                  plan.popular
                    ? "bg-[#D4AF37] hover:bg-[#B8941F] text-white shadow-md"
                    : "bg-[#1A1A1A] hover:bg-[#000000] text-white"
                }`}
              >
                <Link href="/admissions">Choisir ce Plan</Link>
              </Button>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-[#D4AF37]/5 border-2 border-[#D4AF37]/20 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#D4AF37]/20 rounded-lg flex-shrink-0">
              <Award className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                Programme de Bourses & Aide Communautaire
              </h3>
              <p className="text-[#1A1A1A]/70 mb-4 leading-relaxed">
                Nous croyons que le talent ne doit pas être limité par les moyens financiers.
                La Farafina Foot Academy offre des bourses partielles et totales aux jeunes
                issus de familles à revenus modestes. Les dossiers sont étudiés en toute
                confidentialité.
              </p>
              <Button asChild variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white rounded-lg">
                <Link href="/admissions">Demander une Bourse</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

