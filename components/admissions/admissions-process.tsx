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
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de la Section */}
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="font-serif font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 text-gray-900 dark:text-white leading-tight px-2">
            {t("admissions.process.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto px-2 leading-relaxed">
            {t("admissions.process.description")}
          </p>
        </div>

        {/* Conteneur de la Timeline & Cartes */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            
            {/* Ligne de Connexion Verticale (Tablette) */}
            <div className="hidden md:block md:absolute md:left-1/2 md:-translate-x-1/2 md:top-0 md:bottom-0 md:w-1 md:bg-gray-200 dark:md:bg-gray-700 lg:hidden" />
            
            {/* Ligne de Connexion Horizontale (Desktop) */}
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-700" />

            {/* Grille des Étapes */}
            <div className="flex gap-2 sm:gap-2.5 md:grid md:grid-cols-2 lg:grid-cols-5 md:gap-6 lg:gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isOdd = index % 2 !== 0 // Pour l'alignement alterné sur tablette

                return (
                  <div 
                    key={index} 
                    className={`relative group flex-shrink-0 flex-1 min-w-0 md:w-auto ${isOdd ? 'md:pt-16 lg:pt-0' : 'md:pb-16 lg:pb-0'}`}
                  >
                    
                    {/* Point de Connexion (Cercle) */}
                    <div 
                      className={`hidden md:block absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-[#D4AF37] border-4 border-gray-50 dark:border-gray-900 rounded-full z-20 
                        ${isOdd ? 'lg:top-0' : 'lg:bottom-auto'}
                      `} 
                    />
                    
                    {/* Carte de l'Étape (Raffinée) */}
                    <div 
                      className={`h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl lg:rounded-2xl p-2 sm:p-2.5 md:p-5 lg:p-6 shadow-md md:shadow-lg 
                        hover:shadow-lg md:hover:shadow-xl transition-all duration-500 md:transform md:hover:scale-[1.03] 
                        group-hover:border-[#D4AF37] relative overflow-hidden flex flex-col`}
                    >
                      
                      {/* Accent de couleur sur la carte */}
                      <div className="absolute top-0 left-0 w-full h-0.5 md:h-1 bg-[#D4AF37] md:group-hover:h-2 transition-all duration-300" />
                      
                      {/* Icône */}
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gray-100 dark:bg-gray-700 rounded-md md:rounded-xl flex items-center justify-center mb-1 sm:mb-1.5 md:mb-3 lg:mb-4 border border-[#D4AF37]/50 md:border-2 flex-shrink-0">
                        <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#D4AF37] group-hover:text-amber-600 transition-colors duration-300" />
                      </div>

                      {/* Numéro de l'Étape */}
                      <div className="text-[7px] sm:text-[8px] md:text-xs lg:text-sm font-bold text-gray-500 dark:text-gray-400 mb-0.5 sm:mb-1 md:mb-2 tracking-wider uppercase leading-tight">
                        {t("admissions.process.stepLabel")} {index + 1}
                      </div>

                      {/* Titre */}
                      <h3 className="font-serif font-bold text-[8px] sm:text-[9px] md:text-base lg:text-lg xl:text-xl mb-0.5 sm:mb-1 md:mb-2 lg:mb-3 text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors duration-300 leading-tight">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[7px] sm:text-[8px] md:text-xs lg:text-sm text-gray-600 dark:text-gray-400 leading-tight sm:leading-snug md:leading-relaxed text-pretty flex-grow">
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
