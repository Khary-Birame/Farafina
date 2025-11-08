import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"

export function InternationalCTA() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-br from-[#D4AF37] to-[#B8941F]">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
            <Star className="w-8 h-8 text-white" />
          </div>

          <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 text-balance">
            Votre talent mérite un accompagnement à la hauteur de vos ambitions
          </h2>

          <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Rejoignez Farafina Foot Academy et bénéficiez d'un accompagnement international complet pour
            propulser votre carrière vers le sommet. Formation, suivi et protection, nous sommes à vos côtés à
            chaque étape.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button
                size="lg"
                className="bg-white text-[#D4AF37] hover:bg-gray-100 text-base h-12 px-8 shadow-lg"
              >
                Postuler à Farafina Foot Academy
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-base h-12 px-8 backdrop-blur-sm bg-white/5"
              >
                En savoir plus sur notre réseau
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="grid md:grid-cols-3 gap-6 text-white/90 text-sm">
              <div>
                <p className="font-semibold mb-1">Formation d'élite</p>
                <p className="text-white/70">Coaching international de haut niveau</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Réseau solide</p>
                <p className="text-white/70">Partenariats avec les meilleurs clubs</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Suivi complet</p>
                <p className="text-white/70">Accompagnement 360° pour chaque joueur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

