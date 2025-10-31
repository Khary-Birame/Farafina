export function CoachingStaff() {
  const staff = [
    {
      name: "Mamadou Dieng",
      role: "Entraîneur Principal de Football",
      qualifications: "Licence UEFA Pro, Ancien Joueur Professionnel",
      image: "/coach-mamadou-dieng.jpg",
      philosophy:
        "Chaque joueur a un potentiel unique. Mon travail est de le libérer par la discipline, le dévouement et l'entraînement intelligent.",
    },
    {
      name: "Dr. Aminata Sow",
      role: "Directrice Académique",
      qualifications: "Doctorat en Éducation, Plus de 15 Ans d'Expérience",
      image: "/dr-aminata-sow.jpg",
      philosophy:
        "L'éducation permet à nos étudiants de réussir au-delà du terrain. Nous formons des érudits qui sont aussi des athlètes exceptionnels.",
    },
    {
      name: "Ibrahim Koné",
      role: "Entraîneur de Performance Physique",
      qualifications: "MSc Sciences du Sport, Entraîneur de Force Certifié",
      image: "/coach-ibrahim-kone.jpg",
      philosophy:
        "La performance optimale nécessite un entraînement scientifique, une récupération appropriée et une résilience mentale. Nous optimisons chaque aspect.",
    },
    {
      name: "Fatou Diallo",
      role: "Psychologue du Sport",
      qualifications: "MSc Psychologie du Sport, Spécialiste de la Performance Mentale",
      image: "/dr-fatou-diallo.jpg",
      philosophy:
        "La force mentale est aussi importante que la capacité physique. Nous développons des champions qui excellent sous pression.",
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-sans font-bold text-4xl lg:text-5xl text-[#2E2E2E] mb-6 text-balance">
            Entraîneurs & Personnel <span className="text-[#f29200]">Académique</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Notre équipe de classe mondiale d'entraîneurs, d'éducateurs et de spécialistes se consacre au développement
            d'athlètes et d'érudits complets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {staff.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-border hover:border-[#f29200] transition-all hover:shadow-lg group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E2E2E]/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-sans font-bold text-xl text-[#2E2E2E] mb-1">{member.name}</h3>
                <div className="text-sm font-semibold text-[#f29200] mb-2">{member.role}</div>
                <div className="text-xs text-muted-foreground mb-4">{member.qualifications}</div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">"{member.philosophy}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
