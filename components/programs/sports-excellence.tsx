import { Dumbbell, Video, Trophy, Target } from "lucide-react"

export function SportsExcellence() {
  const facilities = [
    { icon: <Target size={20} />, label: "Terrains FIFA" },
    { icon: <Dumbbell size={20} />, label: "Salle de Sport Moderne" },
    { icon: <Trophy size={20} />, label: "Lieux de Compétition" },
    { icon: <Video size={20} />, label: "Laboratoire d'Analyse Vidéo" },
  ]

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <h2 className="font-sans font-bold text-4xl lg:text-5xl text-[#1A1A1A] mb-6 text-balance">
              Excellence <span className="text-[#D4AF37]">Sportive</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Notre programme d'entraînement de football de niveau professionnel est conçu pour développer des athlètes
              complets. Nous combinons la maîtrise technique avec l'intelligence tactique, le conditionnement physique
              et la résilience mentale.
            </p>

            {/* Program Highlights */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-1">Sessions Techniques et Tactiques Quotidiennes</h4>
                  <p className="text-sm text-muted-foreground">
                    Entraînement intensif axé sur le contrôle du ballon, le positionnement et l'intelligence de jeu
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-1">Préparation Physique et Mentale</h4>
                  <p className="text-sm text-muted-foreground">
                    Conditionnement de force, prévention des blessures et psychologie sportive
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-1">Analyse Vidéo et Performance</h4>
                  <p className="text-sm text-muted-foreground">
                    Analyses avancées et évaluations de performance personnalisées
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-1">Compétitions Officielles</h4>
                  <p className="text-sm text-muted-foreground">
                    Participation régulière aux tournois régionaux et internationaux
                  </p>
                </div>
              </div>
            </div>

            {/* Facilities Icons */}
            <div className="grid grid-cols-2 gap-4">
              {facilities.map((facility, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl hover:bg-[#D4AF37]/10 transition-colors group"
                >
                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors">
                    <div className="text-[#D4AF37] group-hover:text-white transition-colors">{facility.icon}</div>
                  </div>
                  <span className="text-sm font-medium text-[#1A1A1A]">{facility.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image/Video */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/football-training-intensive-session.jpg"
                alt="Football training session"
                className="w-full h-auto"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#D4AF37] rounded-2xl shadow-xl p-6">
              <div className="text-white">
                <div className="font-sans font-bold text-3xl mb-1">20+</div>
                <div className="text-sm text-white/90">Heures d'Entraînement par Semaine</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
