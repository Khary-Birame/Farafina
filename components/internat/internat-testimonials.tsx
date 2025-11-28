"use client"

import { Star, Quote, User, Users } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import Image from "next/image"

interface Testimonial {
  author: string
  role: string
  text: string
  rating: number
  image?: string
  type: "player" | "parent" | "educator"
}

export function InternatTestimonials() {
  const { t } = useTranslation()

  const testimonials: Testimonial[] = [
    {
      author: "Amadou Diallo",
      role: t("internat.testimonials.player1.role", "Joueur U17"),
      text: t("internat.testimonials.player1.text", "L'internat m'a permis de progresser énormément. L'encadrement est excellent et l'ambiance est vraiment familiale. Je me sens comme chez moi !"),
      rating: 5,
      type: "player"
    },
    {
      author: "Fatou Sarr",
      role: t("internat.testimonials.parent1.role", "Mère d'un joueur"),
      text: t("internat.testimonials.parent1.text", "En tant que parent, je suis rassurée. Mon fils est bien encadré, il progresse scolairement et sportivement. L'équipe est vraiment professionnelle."),
      rating: 5,
      type: "parent"
    },
    {
      author: "Mamadou Dieng",
      role: t("internat.testimonials.educator1.role", "Éducateur"),
      text: t("internat.testimonials.educator1.text", "Travailler ici est un plaisir. Les jeunes sont motivés, les installations sont excellentes et l'ambiance de travail est vraiment positive."),
      rating: 5,
      type: "educator"
    },
    {
      author: "Ibrahima Traoré",
      role: t("internat.testimonials.player2.role", "Joueur U19"),
      text: t("internat.testimonials.player2.text", "La discipline et la structure de l'internat m'ont aidé à devenir plus mature et responsable. C'est un vrai plus pour ma carrière."),
      rating: 5,
      type: "player"
    },
    {
      author: "Aissatou Ba",
      role: t("internat.testimonials.parent2.role", "Mère d'une joueuse"),
      text: t("internat.testimonials.parent2.text", "Ma fille a gagné en autonomie et en confiance. Le suivi scolaire est remarquable et les résultats sont là. Je recommande vivement !"),
      rating: 5,
      type: "parent"
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "player":
        return <User className="w-5 h-5" />
      case "parent":
        return <Users className="w-5 h-5" />
      case "educator":
        return <Star className="w-5 h-5" />
      default:
        return <User className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    // Toutes les icônes utilisent la couleur de la charte graphique
    return "from-[#D4AF37] to-[#B8941F]"
  }

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <Quote className="h-4 w-4" />
            {t("internat.testimonials.badge", "Témoignages")}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
            <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
              {t("internat.testimonials.title", "Ce qu'ils Disent de Nous")}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("internat.testimonials.description", "Découvrez les témoignages de nos étudiants, parents et éducateurs.")}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 100}ms` }}
              className="reveal group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${getTypeColor(testimonial.type)} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {getTypeIcon(testimonial.type)}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center text-white font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

