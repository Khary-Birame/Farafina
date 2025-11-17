"use client"

import { Sparkles, Users, Target, Trophy } from "lucide-react"

export function WhyItMatters() {
  const messages = [
    {
      question: "Tu rêves de devenir meilleur ?",
      icon: Target,
    },
    {
      question: "Tu veux apprendre avec des entraîneurs certifiés ?",
      icon: Users,
    },
    {
      question: "Tu veux t'entraîner dans une structure professionnelle ?",
      icon: Trophy,
    },
    {
      question: "Tu veux jouer, progresser, t'exprimer ?",
      icon: Sparkles,
    },
  ]

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1A1A1A]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-6">
            Rêve, Passion, Progression
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {messages.map((item, index) => {
            const Icon = item.icon
            const isEven = index % 2 === 0
            
            return (
              <div
                key={index}
                className={`flex items-center gap-6 p-8 rounded-2xl transition-all duration-300 hover:shadow-xl border-2 ${
                  isEven
                    ? "bg-white border-[#1A1A1A]/10 hover:border-[#D4AF37]/30"
                    : "bg-[#1A1A1A]/5 border-[#1A1A1A]/10 hover:border-[#D4AF37]/30"
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-[#000000] rounded-xl flex items-center justify-center shadow-lg">
                    <Icon className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-[#000000] leading-tight">
                  {item.question}
                </p>
              </div>
            )
          })}
        </div>

        {/* Visual rhythm separator */}
        <div className="mt-16 flex items-center justify-center gap-2">
          <div className="w-12 h-0.5 bg-[#1A1A1A]/30" />
          <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          <div className="w-12 h-0.5 bg-[#1A1A1A]/30" />
        </div>
      </div>
    </section>
  )
}
