import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function ProgramsCTA() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f29200] to-[#d17f00]" />
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-sans font-bold text-4xl lg:text-5xl text-white mb-6 text-balance">
            Rejoignez un Programme Unique en <span className="text-[#ffffff]">Afrique</span>
          </h2>
          <p className="text-lg text-white/90 leading-relaxed mb-8 text-pretty">
            Faites le premier pas vers l'excellence sur le terrain et dans la vie. Postulez à Farafina Foot Academy dès
            aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button
                size="lg"
                className="bg-[#ffffff] hover:bg-[#B8962E] text-[#2E2E2E] text-base h-12 px-8 font-semibold"
              >
                Postuler maintenant
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-base h-12 px-8 bg-transparent"
              >
                Planifier une Visite
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
