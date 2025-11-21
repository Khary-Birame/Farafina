"use client"

import { useTranslation } from "@/lib/hooks/use-translation"
import { Star, Quote, Globe } from "lucide-react"

interface Testimonial {
  author: string
  country: string
  role: string
  text: string
  rating: number
}

export function InternationalTestimonialsPremium() {
  const { t } = useTranslation()

  const testimonials: Testimonial[] = [
    {
      author: "Ahmed Al-Mansouri",
      country: "Maroc",
      role: t("international.testimonials.player1.role", "Joueur U19"),
      text: t("international.testimonials.player1.text", "Venir à Farafina a été la meilleure décision de ma vie. L'encadrement est exceptionnel, les installations sont de niveau professionnel et l'ambiance est vraiment internationale. Je me sens comme chez moi !"),
      rating: 5
    },
    {
      author: "Sarah Johnson",
      country: "États-Unis",
      role: t("international.testimonials.parent1.role", "Mère d'un joueur"),
      text: t("international.testimonials.parent1.text", "En tant que parent, je suis rassurée. Mon fils est bien encadré, il progresse énormément et l'équipe est vraiment professionnelle. L'intégration culturelle est parfaite."),
      rating: 5
    },
    {
      author: "Diego Martinez",
      country: "Espagne",
      role: t("international.testimonials.player2.role", "Joueur U17"),
      text: t("international.testimonials.player2.text", "L'accompagnement est complet : transport, visa, hébergement, entraînement, études... Tout est pris en charge. Je me concentre uniquement sur mon développement."),
      rating: 5
    },
    {
      author: "Fatima Diallo",
      country: "Sénégal",
      role: t("international.testimonials.player3.role", "Joueuse U19"),
      text: t("international.testimonials.player3.text", "Les installations sont incroyables et l'encadrement médical est au top. Je me sens en sécurité et bien entourée pour progresser vers le niveau professionnel."),
      rating: 5
    },
    {
      author: "James O'Brien",
      country: "Irlande",
      role: t("international.testimonials.parent2.role", "Père d'un joueur"),
      text: t("international.testimonials.parent2.text", "Le suivi académique est remarquable. Mon fils progresse scolairement et sportivement. L'équipe communique régulièrement avec nous. Je recommande vivement !"),
      rating: 5
    },
    {
      author: "Yusuf Kaya",
      country: "Turquie",
      role: t("international.testimonials.player4.role", "Joueur U17"),
      text: t("international.testimonials.player4.text", "L'intégration culturelle est excellente. J'ai rencontré des joueurs du monde entier, appris de nouvelles cultures tout en développant mon football. Une expérience unique !"),
      rating: 5
    },
  ]

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <Quote className="h-4 w-4" />
            {t("international.testimonials.badge", "Témoignages")}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
            <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
              {t("international.testimonials.title", "Témoignages Internationaux")}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("international.testimonials.description", "Découvrez les témoignages de nos joueurs internationaux et de leurs familles.")}
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
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Quote className="w-8 h-8 text-white" />
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
                <div className="flex-1">
                  <div className="font-bold text-gray-900">{testimonial.author}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe className="w-3 h-3" />
                    <span>{testimonial.country}</span>
                  </div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

