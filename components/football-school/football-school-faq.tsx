"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FootballSchoolFAQ() {
  const faqs = [
    {
      question: "Quel équipement est nécessaire pour commencer ?",
      answer:
        "Pour les premières séances, un short, un t-shirt et des baskets suffisent. L'école fournira progressivement le kit d'entraînement officiel (maillot, short, chaussettes). Les chaussures de football à crampons sont recommandées après le premier mois.",
    },
    {
      question: "Les horaires sont-ils flexibles ?",
      answer:
        "Les horaires sont fixes selon la catégorie d'âge. Toutefois, en cas d'absence justifiée, une séance de rattrapage peut être organisée selon les disponibilités.",
    },
    {
      question: "Comment se passent les paiements ?",
      answer:
        "Les paiements peuvent être effectués en espèces, par virement bancaire ou via Mobile Money. Le règlement se fait au début de chaque période (mois, trimestre ou année).",
    },
    {
      question: "Y a-t-il une limite d'âge pour s'inscrire ?",
      answer:
        "L'École de Foot accueille les jeunes de 7 à 18 ans, répartis en quatre catégories d'âge. Au-delà de 18 ans, des programmes spécifiques peuvent être proposés sur demande.",
    },
    {
      question: "Organisez-vous des essais avant l'inscription ?",
      answer:
        "Oui, une séance d'essai gratuite est proposée à tous les nouveaux participants avant l'inscription définitive. Cela permet à l'enfant de découvrir le programme et aux coachs d'évaluer son niveau.",
    },
    {
      question: "Des bourses ou réductions sont-elles disponibles ?",
      answer:
        "Oui, la Farafina Foot Academy propose des bourses partielles ou totales pour les jeunes talents issus de familles à revenus modestes. Un dossier de demande peut être déposé lors de l'inscription.",
    },
    {
      question: "Les parents peuvent-ils assister aux entraînements ?",
      answer:
        "Les parents sont les bienvenus pour observer les séances depuis les tribunes. Cependant, pour garantir la concentration des jeunes, nous demandons de ne pas intervenir pendant l'entraînement.",
    },
  ]

  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">
            Questions Fréquemment Posées
          </h2>
          <p className="text-lg text-[#1A1A1A]/70 leading-relaxed">
            Tout ce que vous devez savoir avant de rejoindre l'École de Foot.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-[#C0C0C0] rounded-lg px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left font-semibold text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#1A1A1A]/70 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

