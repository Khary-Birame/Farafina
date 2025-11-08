"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const facilities = [
  {
    title: "Terrains de Football aux Normes FIFA",
    description: "Terrains en gazon naturel et synthétique de niveau professionnel respectant les normes internationales.",
    image: "/fifa-standard-football-field.jpg",
  },
  {
    title: "Salles de Classe Modernes",
    description: "Espaces d'apprentissage de pointe équipés de technologie numérique et d'outils interactifs.",
    image: "/modern-classroom-technology.jpg",
  },
  {
    title: "Centre Médical",
    description: "Installation de soins de santé complète avec des spécialistes en médecine du sport et équipements de rééducation.",
    image: "/sports-medical-center.jpg",
  },
  {
    title: "Résidences Étudiantes",
    description: "Hébergement confortable et sécurisé avec espaces d'étude et installations récréatives.",
    image: "/student-residence-dormitory.jpg",
  },
  {
    title: "Centre de Performance",
    description: "Salle de sport et installations de conditionnement physique avancées avec équipements d'entraînement en force et conditionnement.",
    image: "/sports-performance-gym.jpg",
  },
  {
    title: "Espaces Recruteurs & VIP",
    description: "Espaces de coworking professionnels et salons d'observation pour recruteurs, agents et partenaires.",
    image: "/modern-coworking-space.jpg",
  },
]

export function Infrastructures() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % facilities.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + facilities.length) % facilities.length)
  }

  return (
    <section className="py-24 bg-[#1A1A1A]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-white mb-4">Infrastructures de Classe Mondiale</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Nos installations sont conçues pour fournir le meilleur environnement pour l'excellence athlétique et académique.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
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
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
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
