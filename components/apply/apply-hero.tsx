import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function ApplyHero() {
  return (
    <section className="relative bg-white py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/young-african-players-training-field.jpg"
          alt="Young players training"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#008037]/10 rounded-full mb-6">
            <div className="w-2 h-2 bg-[#008037] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#008037]">Applications Open</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-sans font-bold text-[#2E2E2E] mb-6 leading-tight text-balance">
            Apply to Farafina Foot Academy
          </h1>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
            Take the first step toward becoming one of Africa's future football legends. Join an elite academy where
            world-class training meets academic excellence.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#2E2E2E] font-semibold group w-full sm:w-auto"
              >
                Start Application
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/admissions">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Learn More About Admissions
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-border">
            <div>
              <div className="text-3xl font-bold text-[#008037] mb-1">95%</div>
              <div className="text-sm text-muted-foreground">Acceptance Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#008037] mb-1">12-18</div>
              <div className="text-sm text-muted-foreground">Age Range</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#008037] mb-1">30+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
