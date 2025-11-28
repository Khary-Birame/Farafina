"use client"

import { useTranslation } from "@/lib/hooks/use-translation"
import Image from "next/image"
import Link from "next/link"
import { 
  Dumbbell, 
  Home, 
  BookOpen, 
  Users, 
  Shield,
  ArrowLeft,
  CheckCircle2
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Dumbbell,
  Home,
  BookOpen,
  Users,
  Shield,
}

interface Facility {
  slug: string
  key: string
  icon: string
  title: string
  description: string
  image: string
  content: {
    overview: string
    highlights: string[]
    details: string
  }
}

interface FacilityDetailProps {
  facility: Facility
}

export function FacilityDetail({ facility }: FacilityDetailProps) {
  const { t } = useTranslation()
  const Icon = iconMap[facility.icon] || Dumbbell

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="relative h-full w-full">
            <Image
              src={facility.image}
              alt={facility.title}
              fill
              className="object-cover opacity-40"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Back Button */}
          <Link
            href="/visite-ffa"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">
              {t("common.back", "Retour à la visite")}
            </span>
          </Link>

          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl shadow-lg mb-6">
            <Icon className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h1 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {facility.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
            {facility.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Overview */}
            <div className="mb-12">
              <h2 className="font-sans font-black text-3xl md:text-4xl text-gray-900 mb-6">
                {t("common.overview", "Vue d'ensemble")}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {facility.content.overview}
              </p>
            </div>

            {/* Highlights */}
            <div className="mb-12">
              <h2 className="font-sans font-black text-3xl md:text-4xl text-gray-900 mb-6">
                {t("common.highlights", "Points Forts")}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {facility.content.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <CheckCircle2 className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="mb-12">
              <h2 className="font-sans font-black text-3xl md:text-4xl text-gray-900 mb-6">
                {t("common.details", "En Détail")}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {facility.content.details}
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent border-2 border-[#D4AF37]/20">
              <h3 className="font-sans font-black text-2xl md:text-3xl text-gray-900 mb-4">
                {t("visite.facility.visitTitle", "Visitez cette installation")}
              </h3>
              <p className="text-gray-700 mb-6">
                {t("visite.facility.visitDescription", "Découvrez cette installation et bien plus encore lors de votre visite à Farafina Foot Academy.")}
              </p>
              <Link
                href="/visite-ffa"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
              >
                {t("visite.hero.cta", "Demander une visite")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

