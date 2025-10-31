"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const facilities = [
  {
    title: "FIFA-Standard Football Fields",
    description: "Professional-grade natural and synthetic turf fields meeting international standards.",
    image: "/fifa-standard-football-field.jpg",
  },
  {
    title: "Modern Classrooms",
    description: "State-of-the-art learning spaces equipped with digital technology and interactive tools.",
    image: "/modern-classroom-technology.jpg",
  },
  {
    title: "Medical Center",
    description: "Comprehensive healthcare facility with sports medicine specialists and rehabilitation equipment.",
    image: "/sports-medical-center.jpg",
  },
  {
    title: "Student Residences",
    description: "Comfortable, secure accommodation with study areas and recreational facilities.",
    image: "/student-residence-dormitory.jpg",
  },
  {
    title: "Performance Center",
    description: "Advanced gym and fitness facilities with strength training and conditioning equipment.",
    image: "/sports-performance-gym.jpg",
  },
  {
    title: "Scout & VIP Spaces",
    description: "Professional coworking areas and viewing lounges for scouts, agents, and partners.",
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
    <section className="py-24 bg-[#2E2E2E]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-white mb-4">World-Class Infrastructures</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our facilities are designed to provide the best environment for athletic and academic excellence.
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
                    index === currentIndex ? "bg-[#008037] w-8" : "bg-white/30"
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
