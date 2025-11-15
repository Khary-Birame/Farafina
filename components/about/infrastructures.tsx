"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/hooks/use-translation"

export function Infrastructures() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Charger les installations depuis les traductions
  const facilities = useMemo(() => [
    {
      title: t("home.infrastructures.facilities.fifa.title"),
      description: t("home.infrastructures.facilities.fifa.description"),
      image: "/fifa-standard-football-field.jpg",
      link: null, // Pas de page dédiée pour l'instant
    },
    {
      title: t("home.infrastructures.facilities.classrooms.title"),
      description: t("home.infrastructures.facilities.classrooms.description"),
      image: "/modern-classroom-technology.jpg",
      link: null, // Pas de page dédiée pour l'instant
    },
    {
      title: t("home.infrastructures.facilities.medical.title"),
      description: t("home.infrastructures.facilities.medical.description"),
      image: "/sports-medical-center.jpg",
      link: null, // Pas de page dédiée pour l'instant
    },
    {
      title: t("home.infrastructures.facilities.residence.title"),
      description: t("home.infrastructures.facilities.residence.description"),
      image: "/student-residence-dormitory.jpg",
      link: "/internat", // Lien vers la page espace de l'internat
    },
    {
      title: t("home.infrastructures.facilities.performance.title"),
      description: t("home.infrastructures.facilities.performance.description"),
      image: "/sports-performance-gym.jpg",
      link: null, // Pas de page dédiée pour l'instant
    },
    {
      title: t("home.infrastructures.facilities.vip.title"),
      description: t("home.infrastructures.facilities.vip.description"),
      image: "/modern-coworking-space.jpg",
      link: null, // Pas de page dédiée pour l'instant
    },
  ], [t])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % facilities.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + facilities.length) % facilities.length)
  }

  return (
    <section data-section="infrastructures" className="py-24 bg-[#1A1A1A]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-white mb-4">{t("home.infrastructures.title")}</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t("home.infrastructures.description")}
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => {
            const CardContent = (
              <div className="group relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={facility.image || "/placeholder.svg"}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-sans font-semibold text-xl text-white mb-2">{facility.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{facility.description}</p>
                </div>
              </div>
            )

            return facility.link ? (
              <Link key={index} href={facility.link}>
                {CardContent}
              </Link>
            ) : (
              <div key={index}>
                {CardContent}
              </div>
            )
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          {facilities[currentIndex].link ? (
            <Link href={facilities[currentIndex].link}>
              <div className="overflow-hidden rounded-2xl bg-white/5 cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={facilities[currentIndex].image || "/placeholder.svg"}
                    alt={facilities[currentIndex].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-sans font-semibold text-xl text-white mb-2">{facilities[currentIndex].title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{facilities[currentIndex].description}</p>
                </div>
              </div>
            </Link>
          ) : (
            <div className="overflow-hidden rounded-2xl bg-white/5">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={facilities[currentIndex].image || "/placeholder.svg"}
                  alt={facilities[currentIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-sans font-semibold text-xl text-white mb-2">{facilities[currentIndex].title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{facilities[currentIndex].description}</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronLeft size={20} />
            </Button>
            <div className="flex gap-2">
              {facilities.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-[#D4AF37] w-8" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
