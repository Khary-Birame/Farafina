import { FileText, Search, MessageSquare, CheckCircle, UserCheck } from "lucide-react"

export function ApplicationTimeline() {
  const steps = [
    {
      icon: FileText,
      title: "Soumettre le Formulaire",
      description: "Complétez la candidature en ligne avec tous les documents requis",
      duration: "15-20 minutes",
    },
    {
      icon: Search,
      title: "Évaluation",
      description: "Notre équipe examine votre candidature et les documents à l'appui",
      duration: "5-7 jours",
    },
    {
      icon: MessageSquare,
      title: "Entretien",
      description: "Les candidats sélectionnés sont invités pour un entretien virtuel ou en personne",
      duration: "1-2 semaines",
    },
    {
      icon: CheckCircle,
      title: "Confirmation",
      description: "Recevez la décision d'admission et les prochaines étapes par email",
      duration: "3-5 jours",
    },
    {
      icon: UserCheck,
      title: "Inscription",
      description: "Complétez le processus d'inscription et préparez-vous pour la vie à l'académie",
      duration: "2-4 semaines",
    },
  ]

  return (
    <section className="py-20 lg:py-24 bg-[#2E2E2E]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-4">Calendrier de Candidature</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            De la soumission à l'inscription — voici ce à quoi s'attendre pendant votre parcours de candidature
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-white/20" />
            <div className="absolute top-12 left-0 w-1/5 h-0.5 bg-[#D4AF37]" />

            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Icon Circle */}
                  <div
                    className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
                      index === 0 ? "bg-[#D4AF37]" : "bg-white/10"
                    } border-4 border-[#2E2E2E] relative z-10`}
                  >
                    <step.icon className={`w-10 h-10 ${index === 0 ? "text-[#2E2E2E]" : "text-white"}`} />
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <div className="text-sm font-semibold text-[#D4AF37] mb-2">Étape {index + 1}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-white/70 mb-3 leading-relaxed">{step.description}</p>
                    <div className="text-xs text-white/50">{step.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                  index === 0 ? "bg-[#D4AF37]" : "bg-white/10"
                }`}
              >
                <step.icon className={`w-7 h-7 ${index === 0 ? "text-[#2E2E2E]" : "text-white"}`} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#D4AF37] mb-1">Étape {index + 1}</div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/70 mb-2 leading-relaxed">{step.description}</p>
                <div className="text-xs text-white/50">{step.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
