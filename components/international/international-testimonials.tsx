"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Amadou Diallo",
    role: "Joueur professionnel",
    club: "FC Nantes, France",
    image: "/african-youth-football-training-action-shot.jpg",
    quote:
      "Farafina Foot Academy m'a accompagné dans mon intégration en France. Le suivi éducatif et l'accompagnement psychologique m'ont permis de m'adapter rapidement et de performer sur le terrain.",
    country: "🇫🇷",
  },
  {
    id: 2,
    name: "Fatou Sarr",
    role: "Joueuse professionnelle",
    club: "FC Barcelona Femeni, Espagne",
    image: "/african-football-academy-elite-training.jpg",
    quote:
      "Grâce à l'accompagnement de Farafina, j'ai pu intégrer le FC Barcelona. L'apprentissage de l'espagnol et le suivi personnalisé ont été essentiels pour mon épanouissement.",
    country: "🇪🇸",
  },
  {
    id: 3,
    name: "Mamadou Koné",
    role: "Joueur professionnel",
    club: "AS Roma, Italie",
    image: "/young-african-football-players-training.jpg",
    quote:
      "L'académie m'a ouvert les portes de l'Europe. Le réseau de partenaires et l'accompagnement administratif ont facilité mon intégration en Italie. Je recommande vivement !",
    country: "🇮🇹",
  },
  {
    id: 4,
    name: "Mariama Diop",
    role: "Parent d'un joueur",
    club: "Manchester City Academy, Angleterre",
    image: "/african-students-studying-in-modern-classroom.jpg",
    quote:
      "En tant que parent, je suis rassurée par l'accompagnement de Farafina. Mon fils est bien encadré, son éducation est suivie et il s'épanouit dans son nouveau club. Merci !",
    country: "🇬🇧",
  },
]

export function InternationalTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#D4AF37]/5 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider">
                Témoignages
              </span>
            </div>
            <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-4 text-balance">
              Découvrez les parcours de nos jeunes qui brillent à l'étranger
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des témoignages authentiques de joueurs et de parents qui ont fait confiance à notre
              accompagnement international.
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-border">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Image */}
                <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentTestimonial.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-4xl mb-2">{currentTestimonial.country}</div>
                    <p className="font-semibold text-lg">{currentTestimonial.club}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Quote className="w-12 h-12 text-[#D4AF37] flex-shrink-0" />
                    <p className="text-lg text-muted-foreground leading-relaxed italic">
                      "{currentTestimonial.quote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="font-sans font-bold text-xl text-[#1A1A1A]">{currentTestimonial.name}</p>
                    <p className="text-muted-foreground">{currentTestimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-[#D4AF37] w-8" : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Témoignage ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

