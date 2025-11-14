"use client"

import { CheckCircle2, FileText, Users, CreditCard, Trophy } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import { useMemo } from "react"

export function AdmissionsProcess() {
  const { t } = useTranslation()

  const steps = useMemo(() => [
    {
      icon: FileText,
      title: t("admissions.process.steps.online.title"),
      description: t("admissions.process.steps.online.description"),
    },
    {
      icon: Users,
      title: t("admissions.process.steps.review.title"),
      description: t("admissions.process.steps.review.description"),
    },
    {
      icon: Trophy,
      title: t("admissions.process.steps.evaluation.title"),
      description: t("admissions.process.steps.evaluation.description"),
    },
    {
      icon: CheckCircle2,
      title: t("admissions.process.steps.decision.title"),
      description: t("admissions.process.steps.decision.description"),
    },
    {
      icon: CreditCard,
      title: t("admissions.process.steps.payment.title"),
      description: t("admissions.process.steps.payment.description"),
    },
  ], [t])

  return (
    <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900">
  <div className="container mx-auto px-4 lg:px-8">
    
    {/* En-tête de la Section */}
    <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">
      <h2 className="font-serif font-extrabold text-4xl md:text-5xl lg:text-6xl mb-4 text-gray-900 dark:text-white leading-tight">
        {t("admissions.process.title")}
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto">
        {t("admissions.process.description")}
      </p>
    </div>

    {/* Conteneur de la Timeline & Cartes */}
    <div className="max-w-6xl mx-auto">
      <div className="relative">
        
        {/* Ligne de Connexion Verticale (Mobile/Tablette) */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700 md:left-1/2 md:-translate-x-1/2 lg:hidden" />
        
        {/* Ligne de Connexion Horizontale (Desktop) */}
        <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-700" />

        {/* Grille des Étapes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isOdd = index % 2 !== 0 // Pour l'alignement alterné sur tablette

            return (
              <div 
                key={index} 
                className={`relative group ${isOdd ? 'md:pt-16 lg:pt-0' : 'md:pb-16 lg:pb-0'}`} // Décalage alterné sur md
              >
                
                {/* Point de Connexion (Cercle) */}
                <div 
                  className={`absolute left-0 top-0 mt-2 ml-1.5 w-6 h-6 bg-[#D4AF37] border-4 border-gray-50 dark:border-gray-900 rounded-full z-20 
                    md:left-1/2 md:-translate-x-1/2 md:top-auto md:bottom-auto 
                    ${isOdd ? 'lg:top-0' : 'lg:bottom-auto'}
                  `} 
                />
                
                {/* Carte de l'Étape (Raffinée) */}
                <div 
                  className={`h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg 
                    hover:shadow-xl transition-all duration-500 transform hover:scale-[1.03] 
                    group-hover:border-[#D4AF37] relative overflow-hidden`}
                >
                  
                  {/* Accent de couleur sur la carte */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37] group-hover:h-2 transition-all duration-300" />
                  
                  {/* Icône */}
                  <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4 border-2 border-[#D4AF37]/50">
                    <Icon className="w-7 h-7 text-[#D4AF37] group-hover:text-amber-600 transition-colors duration-300" />
                  </div>

                  {/* Numéro de l'Étape */}
                  <div className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2 tracking-wider uppercase">{t("admissions.process.stepLabel")} {index + 1}</div>

                  {/* Titre */}
                  <h3 className="font-serif font-bold text-xl mb-3 text-balance text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-pretty min-h-[60px] lg:min-h-[70px]">
                    {step.description}
                  </p>
                </div>
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
