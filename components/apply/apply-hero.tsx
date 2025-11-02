import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function ApplyHero() {
  return (
    <section className="relative text-white py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-[#2E2E2E] via-[#3a3a3a] to-[#2E2E2E]">
      {/* Modern Animated Background */}
      <div className="absolute inset-0">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f29200]/20 via-transparent to-[#D4AF37]/20 animate-pulse-glow" />
        
        {/* Geometric shapes */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#f29200]/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-[#f29200]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2.5s' }} />
        </div>

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white">Candidatures Ouvertes</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-sans font-bold text-white mb-6 leading-tight text-balance">
            Postulez à Farafina Foot Academy
          </h1>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed text-pretty">
            Faites le premier pas pour devenir l'une des futures légendes du football africain. Rejoignez une académie d'élite où
            l'entraînement de classe mondiale rencontre l'excellence académique.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-[#f29200] hover:bg-gray-100 font-semibold group w-full sm:w-auto"
              >
                Commencer la Candidature
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/admissions">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10">
                En Savoir Plus sur les Admissions
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D4AF37] mb-1">95%</div>
              <div className="text-sm text-white/80">Taux d'Acceptation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D4AF37] mb-1">12-18</div>
              <div className="text-sm text-white/80">Tranche d'Âge</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D4AF37] mb-1">30+</div>
              <div className="text-sm text-white/80">Pays</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
