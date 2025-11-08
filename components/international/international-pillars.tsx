import { Compass, GraduationCap, Home, Handshake } from "lucide-react"

const pillars = [
  {
    icon: <Compass className="w-8 h-8" />,
    title: "Suivi Personnalisé",
    description:
      "Évaluation continue du développement du joueur : performances sportives, progression technique et tactique, suivi médical régulier. Un coach dédié suit chaque joueur dans son parcours.",
    color: "from-[#D4AF37]/20 to-[#D4AF37]/5",
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Encadrement Éducatif",
    description:
      "Suivi scolaire personnalisé, apprentissage linguistique (français, anglais, espagnol), préparation aux diplômes internationaux. Équilibre parfait entre sport et éducation.",
    color: "from-[#D4AF37]/20 to-[#D4AF37]/5",
  },
  {
    icon: <Home className="w-8 h-8" />,
    title: "Bien-être et Adaptation",
    description:
      "Accompagnement pour le logement, la nutrition adaptée, l'intégration culturelle et l'accompagnement psychologique. Nous veillons à ce que chaque joueur se sente chez lui, où qu'il soit.",
    color: "from-[#D4AF37]/20 to-[#D4AF37]/5",
  },
  {
    icon: <Handshake className="w-8 h-8" />,
    title: "Carrière & Partenariats",
    description:
      "Mise en relation avec des clubs et académies prestigieuses, gestion des contrats avec des agents agréés, préparation aux essais et aux transferts. Un réseau international à votre service.",
    color: "from-[#D4AF37]/20 to-[#D4AF37]/5",
  },
]

export function InternationalPillars() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider">
                Nos Piliers
              </span>
            </div>
            <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-4 text-balance">
              Les piliers de l'accompagnement international
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un accompagnement complet et personnalisé pour chaque joueur dans son parcours à l'étranger.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-[#D4AF37]/5 rounded-2xl p-8 border border-border hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>

                <h3 className="font-sans font-bold text-2xl text-[#1A1A1A] mb-4 group-hover:text-[#D4AF37] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

