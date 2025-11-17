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
        "Les horaires sont fixes selon la catégorie d'âge pour garantir la cohérence du programme. Toutefois, en cas d'absence justifiée, une séance de rattrapage peut être organisée selon les disponibilités.",
    },
    {
      question: "Comment se passent les paiements ?",
      answer:
        "Les paiements peuvent être effectués en espèces, par virement bancaire ou via Mobile Money. Le règlement se fait au début de chaque période (mois, trimestre ou année). Des facilités de paiement peuvent être discutées pour les formules annuelles.",
    },
    {
      question: "Y a-t-il une limite d'âge pour s'inscrire ?",
      answer:
        "L'École de Foot accueille les jeunes à partir de 7 ans (U7) jusqu'à 18 ans, répartis en quatre catégories d'âge. Au-delà de 18 ans, des programmes spécifiques peuvent être proposés sur demande.",
    },
    {
      question: "Organisez-vous des essais avant l'inscription ?",
      answer:
        "Oui, une séance d'essai gratuite est proposée à tous les nouveaux participants avant l'inscription définitive. Cela permet à l'enfant de découvrir le programme, de rencontrer les coachs et aux coachs d'évaluer son niveau pour l'intégrer dans le bon groupe.",
    },
    {
      question: "Des bourses ou réductions sont-elles disponibles ?",
      answer:
        "Oui, la Farafina Foot Academy propose des bourses partielles ou totales pour les jeunes talents issus de familles à revenus modestes. Un dossier de demande peut être déposé lors de l'inscription. Les critères incluent le potentiel sportif, la motivation et la situation financière de la famille.",
    },
    {
      question: "Les parents peuvent-ils assister aux entraînements ?",
      answer:
        "Les parents sont les bienvenus pour observer les séances depuis les tribunes. Cependant, pour garantir la concentration des jeunes et l'autonomie nécessaire à leur développement, nous demandons de ne pas intervenir pendant l'entraînement. Des moments de rencontre avec les coachs sont organisés régulièrement.",
    },
  ]

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#1A1A1A]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-6">
            Questions Fréquemment Posées
          </h2>
          <p className="text-xl text-[#1A1A1A]/70 leading-relaxed">
            Tout ce que tu dois savoir avant de rejoindre l'École de Foot.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border-2 border-[#1A1A1A]/20 rounded-xl px-6 shadow-sm hover:border-[#D4AF37]/50 transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold text-[#000000] hover:text-[#D4AF37] transition-colors text-lg py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#1A1A1A]/70 leading-relaxed pb-6 text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
