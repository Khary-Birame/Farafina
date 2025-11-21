"use client"

import { useState, useEffect } from "react"
import { 
  Bed, 
  BookOpen, 
  Dumbbell, 
  UtensilsCrossed, 
  Gamepad2, 
  Shield, 
  Wifi, 
  Car,
  Camera,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Facility {
  id: string
  icon: React.ElementType
  title: string
  description: string
  image: string
  features: string[]
}

export function InternatFacilities() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)

  const facilities: Facility[] = [
    {
      id: "chambres",
      icon: Bed,
      title: t("internat.facilities.rooms.title", "Chambres Confortables"),
      description: t("internat.facilities.rooms.description", "Chambres spacieuses et modernes, équipées de lits confortables, bureaux d'étude et rangements personnels. Chaque chambre est conçue pour offrir un espace de repos optimal."),
      image: "/student-residence-dormitory.jpg",
      features: [
        t("internat.facilities.rooms.feature1", "Chambres individuelles ou partagées (2-3 personnes)"),
        t("internat.facilities.rooms.feature2", "Mobilier moderne et ergonomique"),
        t("internat.facilities.rooms.feature3", "Climatisation et ventilation"),
        t("internat.facilities.rooms.feature4", "Connexion Wi-Fi haut débit"),
      ]
    },
    {
      id: "etude",
      icon: BookOpen,
      title: t("internat.facilities.study.title", "Salles d'Étude"),
      description: t("internat.facilities.study.description", "Espaces dédiés au travail scolaire avec un environnement calme et propice à la concentration. Équipées de tables individuelles et de ressources pédagogiques."),
      image: "/african-students-studying-in-modern-classroom.jpg",
      features: [
        t("internat.facilities.study.feature1", "Salles silencieuses et climatisées"),
        t("internat.facilities.study.feature2", "Supervision par des éducateurs"),
        t("internat.facilities.study.feature3", "Horaires d'étude structurés"),
        t("internat.facilities.study.feature4", "Accès à la bibliothèque"),
      ]
    },
    {
      id: "sport",
      icon: Dumbbell,
      title: t("internat.facilities.sport.title", "Centre Sportif"),
      description: t("internat.facilities.sport.description", "Accès direct aux terrains d'entraînement et à la salle de musculation. Installations de pointe pour le développement physique et technique."),
      image: "/african-football-academy-elite-training.jpg",
      features: [
        t("internat.facilities.sport.feature1", "Terrains de football professionnels"),
        t("internat.facilities.sport.feature2", "Salle de musculation équipée"),
        t("internat.facilities.sport.feature3", "Piste d'athlétisme"),
        t("internat.facilities.sport.feature4", "Équipements de récupération"),
      ]
    },
    {
      id: "refectoire",
      icon: UtensilsCrossed,
      title: t("internat.facilities.dining.title", "Réfectoire"),
      description: t("internat.facilities.dining.description", "Restaurant moderne proposant une alimentation équilibrée et adaptée aux besoins des sportifs. Menus variés et nutritionnellement optimisés."),
      image: "/african-students-studying-in-modern-classroom.jpg",
      features: [
        t("internat.facilities.dining.feature1", "Cuisine équilibrée et variée"),
        t("internat.facilities.dining.feature2", "Menus adaptés aux sportifs"),
        t("internat.facilities.dining.feature3", "3 repas par jour + collations"),
        t("internat.facilities.dining.feature4", "Respect des régimes alimentaires"),
      ]
    },
    {
      id: "detente",
      icon: Gamepad2,
      title: t("internat.facilities.relaxation.title", "Espaces Détente"),
      description: t("internat.facilities.relaxation.description", "Zones de repos et de loisirs pour favoriser l'équilibre entre travail et détente. Espaces conviviaux pour les moments de partage."),
      image: "/african-students-studying-in-modern-classroom.jpg",
      features: [
        t("internat.facilities.relaxation.feature1", "Salle de détente avec TV"),
        t("internat.facilities.relaxation.feature2", "Espaces de jeux"),
        t("internat.facilities.relaxation.feature3", "Terrasse extérieure"),
        t("internat.facilities.relaxation.feature4", "Bibliothèque et médiathèque"),
      ]
    },
    {
      id: "securite",
      icon: Shield,
      title: t("internat.facilities.security.title", "Sécurité & Gestion"),
      description: t("internat.facilities.security.description", "Surveillance 24/7, contrôle d'accès et personnel de sécurité qualifié. Un environnement totalement sécurisé pour la tranquillité des familles."),
      image: "/student-residence-dormitory.jpg",
      features: [
        t("internat.facilities.security.feature1", "Surveillance vidéo 24/7"),
        t("internat.facilities.security.feature2", "Contrôle d'accès sécurisé"),
        t("internat.facilities.security.feature3", "Personnel de sécurité formé"),
        t("internat.facilities.security.feature4", "Infirmerie avec personnel médical"),
      ]
    },
  ]

  const currentFacility = facilities[currentIndex]

  // Auto-rotate facilities
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % facilities.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [facilities.length])

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <Camera className="h-4 w-4" />
            {t("internat.facilities.badge", "Installations Premium")}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
            <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
              {t("internat.facilities.title", "Installations & Infrastructures")}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("internat.facilities.description", "Découvrez nos installations modernes conçues pour offrir le meilleur cadre de vie à nos étudiants.")}
          </p>
        </div>

        {/* Featured Facility - Large Card */}
        <div className="mb-12">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-[400px] lg:h-auto">
                <Image
                  src={currentFacility.image}
                  alt={currentFacility.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={currentIndex === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Navigation */}
                {facilities.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentIndex((prev) => (prev - 1 + facilities.length) % facilities.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
                      aria-label="Précédent"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setCurrentIndex((prev) => (prev + 1) % facilities.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
                      aria-label="Suivant"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold z-10">
                      {currentIndex + 1} / {facilities.length}
                    </div>
                  </>
                )}
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center">
                    <currentFacility.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-sans font-black text-3xl md:text-4xl text-gray-900">
                    {currentFacility.title}
                  </h3>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {currentFacility.description}
                </p>

                <div className="space-y-3">
                  {currentFacility.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => (
            <div
              key={facility.id}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "group relative h-full rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer bg-white",
                index === currentIndex
                  ? "border-[#D4AF37] shadow-xl scale-105"
                  : "border-gray-200 hover:border-[#D4AF37]/50 hover:shadow-lg"
              )}
            >
              <div className="relative h-48">
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center shadow-lg">
                    <facility.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-sans font-bold text-xl text-gray-900 mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {facility.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

