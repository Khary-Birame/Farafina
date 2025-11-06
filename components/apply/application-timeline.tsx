import { FileText, Search, MessageSquare, CheckCircle, UserCheck } from "lucide-react"

export function ApplicationTimeline() {
  const steps = [
    {
      icon: FileText,
      title: "Soumettre le Formulaire",
      description: "Complétez la candidature en ligne avec tous les documents requis",
      duration: "15-20 minutes",
      color: "from-[#16A34A] to-[#d17e00]",
    },
    {
      icon: Search,
      title: "Évaluation",
      description: "Notre équipe examine votre candidature et les documents à l'appui",
      duration: "5-7 jours",
      color: "from-[#D4AF37] to-[#B8962E]",
    },
    {
      icon: MessageSquare,
      title: "Entretien",
      description: "Les candidats sélectionnés sont invités pour un entretien virtuel ou en personne",
      duration: "1-2 semaines",
      color: "from-[#16A34A] to-[#22C55E]",
    },
    {
      icon: CheckCircle,
      title: "Confirmation",
      description: "Recevez la décision d'admission et les prochaines étapes par email",
      duration: "3-5 jours",
      color: "from-[#D4AF37] to-[#E6C966]",
    },
    {
      icon: UserCheck,
      title: "Inscription",
      description: "Complétez le processus d'inscription et préparez-vous pour la vie à l'académie",
      duration: "2-4 semaines",
      color: "from-[#16A34A] to-[#d17e00]",
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-[#1a1a1a] via-[#2E2E2E] to-[#1a1a1a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#16A34A] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#16A34A]/20 to-[#D4AF37]/20 px-4 py-2 rounded-full mb-4 border border-[#16A34A]/30">
            <CheckCircle className="w-4 h-4 text-[#16A34A]" />
            <span className="text-sm font-medium text-[#16A34A]">Parcours de Candidature</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-sans font-bold text-white mb-4 text-balance">
            Calendrier de Candidature
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            De la soumission à l'inscription — voici ce à quoi s'attendre pendant votre parcours de candidature
          </p>
        </div>

        {/* Modern Timeline Cards - Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#16A34A] hover:shadow-2xl hover:shadow-[#16A34A]/20 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Gradient Accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Icon Container */}
              <div className="relative mb-6">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-xl`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                {/* Step Number Badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1">
                  <span className="text-xs font-bold text-white">ÉTAPE {index + 1}</span>
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#16A34A] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-white/70 mb-4 leading-relaxed min-h-[50px]">{step.description}</p>
                
                {/* Duration */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-white/80">{step.duration}</span>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#16A34A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-[#16A34A]/20 to-[#D4AF37]/20 backdrop-blur-sm border border-[#16A34A]/30 rounded-2xl p-6 max-w-2xl">
            <CheckCircle className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Prêt à Commencer ?</h3>
            <p className="text-white/80 mb-4">
              Notre processus d'admission est conçu pour être simple, transparent et accessible à tous les talents africains.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
