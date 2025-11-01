import { GraduationCap, DollarSign, FileCheck, HelpCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ImportantInformation() {
  const infoCards = [
    {
      icon: GraduationCap,
      title: "Opportunités de Bourses",
      description:
        "Jusqu'à 40% des étudiants reçoivent une aide financière basée sur le mérite et les besoins. Nous croyons que le talent ne devrait jamais être limité par les circonstances financières.",
      link: "/admissions#scholarship",
      linkText: "En Savoir Plus sur les Bourses",
    },
    {
      icon: DollarSign,
      title: "Frais de Scolarité",
      description:
        "Tarification transparente avec plusieurs plans de paiement disponibles. Les frais de scolarité couvrent la formation, les études, l'hébergement, les repas et les soins médicaux.",
      link: "/admissions#tuition",
      linkText: "Voir les Détails de Tarification",
    },
    {
      icon: FileCheck,
      title: "Consentement Parental",
      description:
        "Tous les candidats de moins de 18 ans nécessitent un consentement signé du parent/tuteur. Cela garantit le soutien familial et l'engagement envers le programme.",
      link: "/admissions#faq",
      linkText: "Télécharger le Formulaire de Consentement",
    },
  ]

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold text-[#2E2E2E] mb-4">Informations Importantes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Politiques et détails clés à connaître avant de postuler
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className="bg-white border border-border rounded-xl p-6 hover:border-[#f29200]/30 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-[#f29200]/10 rounded-lg flex items-center justify-center mb-4">
                <card.icon className="w-6 h-6 text-[#f29200]" />
              </div>
              <h3 className="text-xl font-bold text-[#2E2E2E] mb-3">{card.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{card.description}</p>
              <Link
                href={card.link}
                className="text-sm font-semibold text-[#f29200] hover:text-[#d17f00] inline-flex items-center gap-1"
              >
                {card.linkText}
                <span>→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Link */}
        <div className="bg-muted/50 rounded-xl p-8 text-center border border-border">
          <HelpCircle className="w-12 h-12 text-[#f29200] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#2E2E2E] mb-2">Des Questions ?</h3>
          <p className="text-muted-foreground mb-4">
            Visitez notre section FAQ pour obtenir des réponses aux questions courantes sur le processus de candidature
          </p>
          <Link href="/faq">
            <Button variant="outline">Voir la FAQ</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
