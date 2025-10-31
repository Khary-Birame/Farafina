import { CheckCircle2, FileText, Users, CreditCard, Trophy } from "lucide-react"

const steps = [
  {
    icon: FileText,
    title: "Candidature en ligne",
    description:
      "Remplissez le formulaire en ligne avec vos informations personnelles et téléchargez les documents requis.",
  },
  {
    icon: Users,
    title: "Vérification du dossier",
    description: "Notre équipe d'admission examine votre candidature sous 5 à 7 jours ouvrables.",
  },
  {
    icon: Trophy,
    title: "Évaluation des compétences",
    description: "Participez à un essai virtuel ou en personne pour démontrer vos capacités footballistiques.",
  },
  {
    icon: CheckCircle2,
    title: "Décision d'admission",
    description: "Recevez votre décision d'admission et notification d'éligibilité aux bourses.",
  },
  {
    icon: CreditCard,
    title: "Paiement et inscription",
    description: "Effectuez le paiement et finalisez votre inscription pour sécuriser votre place.",
  },
]

export function AdmissionsProcess() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-balance">
            Votre Chemin vers l'Excellence
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Notre processus d'admission simplifié est conçu pour identifier et développer les talents tout en
            garantissant la transparence à chaque étape.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-border" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="relative">
                    {/* Step Card */}
                    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                      {/* Icon */}
                      <div className="w-12 h-12 bg-[#f29200] rounded-lg flex items-center justify-center mb-4 mx-auto lg:mx-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Step Number */}
                      <div className="text-xs font-semibold text-[#f29200] mb-2">ÉTAPE {index + 1}</div>

                      {/* Title */}
                      <h3 className="font-sans font-semibold text-lg mb-2 text-balance">{step.title}</h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{step.description}</p>
                    </div>

                    {/* Connector Dot */}
                    <div className="hidden lg:block absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#f29200] border-4 border-background rounded-full z-10" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
