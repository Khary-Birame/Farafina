import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function ProgramsHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/programs-hero-training-and-studying.jpg"
          alt="Students training and studying"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E2E2E]/95 via-[#2E2E2E]/80 to-[#2E2E2E]/60" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-3xl">
          <h1 className="font-sans font-bold text-5xl lg:text-7xl text-white mb-6 leading-tight text-balance">
            Programmes Sportifs et <span className="text-[#16A34A]">Académiques</span>
          </h1>
          <p className="text-xl text-white/90 leading-relaxed mb-8 text-pretty">
            L'excellence sur le terrain et en classe.
          </p>
          <Button
            size="lg"
            className="bg-[#16A34A] hover:bg-[#15803D] text-white text-base h-12 px-8 font-semibold"
          >
            Postuler maintenant
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
