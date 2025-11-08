import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Trophy, ArrowRight } from "lucide-react"
import Link from "next/link"

export function FeaturedEvent() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#D4AF37]/10 via-white to-[#D4AF37]/5 rounded-3xl overflow-hidden border-2 border-[#D4AF37]/20 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-64 lg:h-auto min-h-[400px]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/african-youth-football-training-action-shot.jpg')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/90 to-[#D4AF37]/70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Trophy className="w-24 h-24 text-white/30" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 text-[#D4AF37] px-4 py-2 rounded-full text-sm font-medium mb-4 w-fit border border-[#D4AF37]/30">
                  <Trophy className="w-4 h-4" />
                  <span>Événement à la Une</span>
                </div>

                <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-4 leading-tight">
                  Journée de Détection Nationale 2025
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-[#D4AF37]" />
                    <span className="font-medium">15 Mars 2025 - 9h00 à 17h00</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    <span>Stade de Cayar, Sénégal</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="w-5 h-5 text-[#D4AF37]" />
                    <span>300+ participants attendus</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  Une journée exceptionnelle pour découvrir les talents du football africain. Évaluation complète des
                  compétences techniques, tactiques et physiques par nos coaches internationaux. Ouvert aux joueurs de
                  12 à 19 ans. Une opportunité unique de rejoindre la Farafina Foot Academy.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/apply">
                    <Button
                      size="lg"
                      className="bg-[#D4AF37] hover:bg-[#B8941F] text-white w-full sm:w-auto"
                    >
                      Participer maintenant
                      <ArrowRight size={20} className="ml-2" />
                    </Button>
                  </Link>
                  <Link href="#calendar">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Voir tous les événements
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

