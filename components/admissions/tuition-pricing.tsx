import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"

const pricingPlans = [
  {
    name: "Programme Externe",
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
    ],
    popular: false,
  },
  {
    name: "Programme Résident",
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
    ],
    popular: false,
  },
]

export function TuitionPricing() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-balance">
            Frais de scolarité et investissement
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Tarification transparente pour une formation de classe mondiale. Choisissez le programme qui correspond à
            vos objectifs et votre budget.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card border rounded-xl p-8 ${
                plan.popular ? "border-[#f29200] shadow-xl scale-105" : "border-border"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-[#f29200] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Plus populaire
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="font-sans font-bold text-2xl mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-6 pb-6 border-b border-border">
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-3xl font-bold text-[#f29200]">{plan.price.xof}</span>
                    <span className="text-sm text-muted-foreground">XOF</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    €{plan.price.eur} / ${plan.price.usd}
                  </div>
                  <div className="text-xs text-muted-foreground">{plan.period}</div>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#f29200] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-[#f29200] hover:bg-[#d17e00] text-white"
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
              <div className="font-semibold text-[#f29200] mb-1">Multi-devises</div>
              <div className="text-sm text-muted-foreground">Payez en XOF, EUR ou USD</div>
            </div>
            <div>
              <div className="font-semibold text-[#f29200] mb-1">Échelonnement</div>
              <div className="text-sm text-muted-foreground">Paiements fractionnés disponibles</div>
            </div>
            <div>
              <div className="font-semibold text-[#f29200] mb-1">Sécurisé</div>
              <div className="text-sm text-muted-foreground">Virement bancaire et carte</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
