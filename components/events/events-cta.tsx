import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Trophy } from "lucide-react"
import Link from "next/link"

export function EventsCTA() {
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
            <Trophy className="w-8 h-8 text-white" />
          </div>

          <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 text-balance">
            Ne manquez pas nos prochaines journées de détection
          </h2>

          <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Rejoignez la prochaine génération de stars du football africain. Inscrivez-vous dès maintenant et
            donnez-vous la chance de briller sur les terrains internationaux.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#calendar">
              <Button
                size="lg"
                className="bg-white text-[#D4AF37] hover:bg-gray-100 text-base h-12 px-8 shadow-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Voir le calendrier
              </Button>
            </Link>
            <Link href="/apply">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-base h-12 px-8 backdrop-blur-sm bg-white/5"
              >
                S'inscrire maintenant
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

