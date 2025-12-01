"use client"

import { useTranslation } from "@/lib/hooks/use-translation"
import { 
  Dumbbell, 
  Home, 
  BookOpen, 
  Users, 
  Shield, 
  UtensilsCrossed,
  Camera
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Facility {
  icon: React.ElementType
  title: string
  description: string
  image: string
  slug: string
}

export function VisiteWhatYoullSee() {
  const { t } = useTranslation()

  const facilities: Facility[] = [
    {
      icon: Dumbbell,
      title: t("visite.facilities.sport.title", "Infrastructures Sportives"),
      description: t("visite.facilities.sport.description", "Terrains de football professionnels, salle de musculation, piste d'athlétisme et équipements de récupération."),
      image: "/african-football-academy-elite-training.jpg",
      slug: "infrastructures-sportives",
    },
    {
      icon: Home,
      title: t("visite.facilities.internat.title", "Internat"),
      description: t("visite.facilities.internat.description", "Chambres modernes, espaces de vie communs et environnement sécurisé pour nos résidents."),
      image: "/student-residence-dormitory.jpg",
      slug: "internat",
    },
    {
      icon: BookOpen,
      title: t("visite.facilities.study.title", "Salles d'Étude"),
      description: t("visite.facilities.study.description", "Espaces dédiés au travail scolaire avec un environnement calme et propice à la concentration."),
      image: "/african-students-studying-in-modern-classroom.jpg",
      slug: "salles-etude",
    },
    {
      icon: Dumbbell,
      title: t("visite.facilities.gym.title", "Terrains & Gymnases"),
      description: t("visite.facilities.gym.description", "Installations sportives couvertes et extérieures pour tous types d'entraînements."),
      image: "/african-football-academy-elite-training.jpg",
      slug: "terrains-gymnases",
    },
    {
      icon: Users,
      title: t("visite.facilities.life.title", "Espaces de Vie"),
      description: t("visite.facilities.life.description", "Zones de détente, réfectoire moderne et espaces conviviaux pour les moments de partage."),
      image: "/african-students-studying-in-modern-classroom.jpg",
      slug: "espaces-vie",
    },
    {
      icon: Shield,
      title: t("visite.facilities.support.title", "Encadrement"),
      description: t("visite.facilities.support.description", "Rencontrez notre équipe d'éducateurs, entraîneurs et personnel médical."),
      image: "/student-residence-dormitory.jpg",
      slug: "encadrement",
    },
  ]

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <Camera className="h-4 w-4" />
            {t("visite.facilities.badge", "Découverte")}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
            <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
              {t("visite.facilities.title", "Ce que Vous Verrez lors de la Visite")}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("visite.facilities.description", "Découvrez en avant-première les installations et espaces que vous visiterez lors de votre venue.")}
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <Link
              key={index}
              href={`/visite-ffa/${facility.slug}`}
              style={{ animationDelay: `${index * 100}ms` }}
              className="reveal group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer block"
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
                <h3 className="font-sans font-black text-xl text-gray-900 mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {facility.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

