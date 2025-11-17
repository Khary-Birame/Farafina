"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, Trophy } from "lucide-react"

export function SuccessStories() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Aminata Mbaye",
      role: "Mère d'élève U12",
      content:
        "L'École de Foot Farafina a transformé la vie de mon fils. Non seulement il a progressé techniquement, mais il a aussi gagné en confiance et en discipline. Les coachs sont passionnés et vraiment investis dans le développement de chaque enfant.",
      rating: 5,
      image: "AM",
    },
    {
      name: "Ibrahima Diallo",
      role: "Père d'élève U15",
      content:
        "Mon fils rêve de devenir footballeur professionnel. Grâce à l'École de Foot, il s'entraîne dans une structure professionnelle avec des méthodes modernes. Sa progression est remarquable et il a été repéré pour intégrer l'Académie.",
      rating: 5,
      image: "ID",
    },
    {
      name: "Fatou Sarr",
      role: "Mère d'élève U10",
      content:
        "L'ambiance est incroyable ! Mon enfant adore aller à l'entraînement. Il a développé un vrai esprit d'équipe et a fait de nouveaux amis. Le programme est bien structuré et les coachs sont à l'écoute.",
      rating: 5,
      image: "FS",
    },
  ]

  const progressionStory = {
    title: "De l'École de Foot à l'Académie",
    name: "Moussa Diop",
    age: "16 ans",
    journey: [
      "Début à l'École de Foot (U10)",
      "Progression rapide grâce au suivi individuel",
      "Sélection pour l'équipe de compétition (U13)",
      "Intégration à l'Académie résidentielle (U15)",
      "Capitaine de l'équipe U16",
    ],
    quote:
      "L'École de Foot m'a donné les bases. Aujourd'hui, je suis à l'Académie et je vise le professionnalisme. C'est possible !",
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#1A1A1A]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-6">
            Histoires de Réussite
          </h2>
          <p className="text-xl text-[#1A1A1A]/70 max-w-3xl mx-auto leading-relaxed">
            Découvre les parcours de nos jeunes et de leurs familles
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="mb-16">
          <div className="relative max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 border-2 border-[#1A1A1A]/20 rounded-2xl bg-white shadow-lg">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-[#000000] border-2 border-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg">
                  {testimonials[currentIndex].image}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]"
                      />
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-[#000000] mb-1">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-sm text-[#1A1A1A]/70 mb-4">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
              <blockquote className="text-lg md:text-xl text-[#000000] leading-relaxed italic">
                "{testimonials[currentIndex].content}"
              </blockquote>
            </Card>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="border-[#1A1A1A]/30 hover:border-[#D4AF37] hover:bg-[#000000] hover:text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-[#D4AF37] w-8"
                        : "bg-[#1A1A1A]/30 hover:bg-[#D4AF37]/50"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="border-[#1A1A1A]/30 hover:border-[#D4AF37] hover:bg-[#000000] hover:text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Progression Story */}
        <Card className="p-8 md:p-12 border-2 border-[#D4AF37] bg-white rounded-2xl shadow-xl relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <div className="w-16 h-16 bg-[#000000] border-2 border-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
              <Trophy className="w-8 h-8 text-[#D4AF37]" />
            </div>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-full mb-6">
              <span className="text-sm font-bold text-[#D4AF37] uppercase tracking-wide">
                Parcours Inspirant
              </span>
            </div>
            <h3 className="text-3xl font-bold text-[#000000] mb-4">
              {progressionStory.title}
            </h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#000000] border-2 border-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold">
                MD
              </div>
              <div>
                <p className="font-bold text-[#000000]">{progressionStory.name}</p>
                <p className="text-sm text-[#1A1A1A]/70">{progressionStory.age}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="space-y-3">
                {progressionStory.journey.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#000000] border-2 border-[#D4AF37] rounded-full flex items-center justify-center text-[#D4AF37] font-bold text-sm flex-shrink-0 shadow-md">
                      {index + 1}
                    </div>
                    <p className="text-[#000000] leading-relaxed pt-1.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <blockquote className="text-lg md:text-xl text-[#000000] italic leading-relaxed border-l-4 border-[#D4AF37] pl-4">
              "{progressionStory.quote}"
            </blockquote>
          </div>
        </Card>
      </div>
    </section>
  )
}
