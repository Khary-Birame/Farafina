import { Heart, Users, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function SocialInclusion() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#f29200] to-[#d17f00] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-white mb-6">Inclusion Sociale & Genres</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            À Farafina Foot Academy, nous croyons que le talent ne connaît pas de frontières. Notre engagement envers l'inclusion sociale
            garantit que chaque jeune joueur, quel que soit son origine ou son genre, a accès à une formation et une éducation de classe mondiale.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-white" size={32} />
            </div>
            <h3 className="font-sans font-semibold text-xl text-white mb-3">Programmes de Bourses</h3>
            <p className="text-white/80 leading-relaxed">
              Bourses basées sur le mérite et les besoins couvrant les frais de scolarité, l'hébergement et l'équipement pour les joueurs
              talentueux de tous horizons.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-white" size={32} />
            </div>
            <h3 className="font-sans font-semibold text-xl text-white mb-3">Programme de Football Féminin</h3>
            <p className="text-white/80 leading-relaxed">
              Programmes d'entraînement dédiés, installations et soutien pour les joueuses, promouvant l'égalité des genres dans
              le football africain.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-white" size={32} />
            </div>
            <h3 className="font-sans font-semibold text-xl text-white mb-3">Accès Égal</h3>
            <p className="text-white/80 leading-relaxed">
              Aucune discrimination basée sur l'ethnicité, la religion ou le statut socio-économique. Chaque joueur est évalué uniquement
              sur son talent et son potentiel.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/contact">
            <Button size="lg" className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#2E2E2E] font-semibold text-lg px-8 h-14">
              Soutenir nos Initiatives Sociales
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
          <p className="text-white/70 text-sm mt-4">Aidez-nous à offrir des opportunités aux jeunes joueurs talentueux</p>
        </div>
      </div>
    </section>
  )
}
