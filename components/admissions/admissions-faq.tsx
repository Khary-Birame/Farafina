"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Quelles sont les conditions d'âge pour l'admission ?",
    answer:
      "Nous acceptons les joueurs âgés de 8 ans et plus. Les conditions d'âge peuvent varier légèrement selon le programme spécifique.",
  },
  {
    question: "Quand la période de candidature ouvre-t-elle ?",
    answer:
      "Les candidatures ouvriront début décembre 2025. Nous acceptons les candidatures toute l'année.",
  },
  {
    question: "Ai-je besoin d'une expérience footballistique préalable pour postuler ?",
    answer:
      "Bien que l'expérience préalable soit bénéfique, elle n'est pas obligatoire. Nous évaluons le potentiel, l'attitude et la volonté d'apprendre de chaque candidat. Notre évaluation des compétences nous aide à identifier les talents bruts qui peuvent être développés.",
  },
  {
    question: "Quels documents sont requis pour la candidature ?",
    answer:
      "Les documents requis comprennent : acte de naissance, photo d'identité récente, certificat médical , relevés académiques et formulaire de consentement parental/tuteur. Optionnel : vidéo de compétences ou bande de moments forts.",
  },
  {
    question: "Combien de temps dure le processus d'admission ?",
    answer:
      "Le processus complet prend généralement 3 à 4 semaines de la soumission de la candidature à la décision finale. L'examen initial prend 5 à 7 jours ouvrables, suivi de la planification et de l'évaluation des compétences.",
  },
  {
    question: "Des plans de paiement sont-ils disponibles ?",
    answer:
      "Oui ! Nous proposons des plans de paiement flexibles incluant des versements trimestriels et mensuels. Nous acceptons également les paiements en plusieurs devises (XOF, EUR, USD) pour accommoder les familles internationales.",
  },
  // {
  //   question: "Les étudiants internationaux peuvent-ils postuler ?",
  //   answer:
  //     "Nous accueillons les étudiants de toute l'Afrique et au-delà. Nous aidons avec les demandes de visa et fournissons des conseils sur la relocalisation. Notre communauté diversifiée comprend des étudiants de plus de 15 pays.",
  // },
  {
    question: "Qu'est-ce qui est inclus dans les frais de scolarité ?",
    answer:
      "Pour toute information détaillée sur les frais de scolarité et ce qui est inclus, contactez-nous au +221 763171202. Les frais couvrent généralement la formation, le coaching, l'éducation académique, la psychologie du sport, les conseils nutritionnels, le soutien médical, l'assurance et le suivi des performances. Les programmes résidents incluent également l'hébergement, les repas et les services de blanchisserie.",
  },
  {
    question: "Y a-t-il un essai ou une journée d'évaluation ?",
    answer:
      "Oui, tous les candidats participent à une évaluation des compétences. Cela peut se faire en personne sur notre campus ou virtuellement en soumettant une vidéo de compétences. Nous évaluons la capacité technique, la compréhension tactique, la condition physique et l'attitude.",
  },
]

export function AdmissionsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-balance">
              Questions fréquemment posées
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Tout ce que les parents et les étudiants doivent savoir sur notre processus d'admission.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-card border border-border rounded-xl p-8">
            <h3 className="font-sans font-semibold text-xl mb-2">Vous avez encore des questions ?</h3>
            <p className="text-muted-foreground mb-6">
              Notre équipe d'admission est là pour vous aider à chaque étape du processus.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-[#D4AF37] hover:bg-[#d17e00] text-white">Contacter l'équipe d'admission</Button>
              </Link>
              <Link href="/visite-ffa">
                <Button variant="outline">Planifier une visite de FFA</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
