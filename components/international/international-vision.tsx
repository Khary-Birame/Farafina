export function InternationalVision() {
  return (
    <section id="program" className="py-16 lg:py-24 bg-gradient-to-b from-white to-[#D4AF37]/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider">
                  Notre Engagement
                </span>
              </div>

              <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] leading-tight">
                Accompagnement au-delà des frontières
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Notre engagement ne s'arrête pas aux frontières. Farafina Foot Academy assure un suivi complet
                  des joueurs intégrés dans des clubs étrangers : accompagnement sportif, éducatif, médical et
                  moral.
                </p>
                <p>
                  Nous croyons que chaque talent mérite un encadrement de qualité, quelle que soit sa destination.
                  Notre mission est de former, accompagner et propulser les talents africains sur la scène
                  mondiale, tout en préservant leur bien-être et leur épanouissement.
                </p>
                <p>
                  Grâce à notre réseau international de partenaires et à notre équipe dédiée, nous offrons un
                  accompagnement personnalisé qui garantit la réussite sportive et académique de chaque joueur.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                  <span className="text-sm font-medium text-[#1A1A1A]">Suivi continu</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                  <span className="text-sm font-medium text-[#1A1A1A]">Réseau international</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                  <span className="text-sm font-medium text-[#1A1A1A]">Accompagnement complet</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/african-football-academy-elite-training.jpg')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="text-lg font-medium italic">
                  "Formation, accompagnement et protection pour chaque talent."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

