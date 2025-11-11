import { Quote } from "lucide-react"

const team = [
  {
    name: "Amadou Diallo",
    role: "Entraîneur Principal",
    bio: "Ancien joueur professionnel avec plus de 15 ans d'expérience d'entraînement dans des académies européennes.",
    image: "/african-football-coach-portrait.jpg",
  },
  {
    name: "Dr. Fatou Sow",
    role: "Directrice Académique",
    bio: "Doctorat en Éducation, spécialisée dans les programmes sport-études et le développement de la jeunesse.",
    image: "/african-female-educator-portrait.jpg",
  },
  {
    name: "Ibrahim Kane",
    role: "Directeur Technique",
    bio: "Titulaire de la Licence UEFA Pro avec une expertise en identification des talents et développement des joueurs.",
    image: "/african-technical-director-portrait.jpg",
  },
]

export function Leadership() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* CEO Quote */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <Quote className="text-[#ffffff] mb-6" size={48} />
              <blockquote className="text-2xl md:text-3xl font-sans font-semibold text-white mb-6 leading-relaxed text-balance">
                "À la Farafina Foot Academy, la discipline façonne le talent, et le respect crée les champions."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full overflow-hidden">
                  <img src="/african-ceo-portrait.jpg" alt="PDG" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-sans font-semibold text-lg text-white">M. Abdoulaye Galaye C. Diallo</p>
                  <p className="text-sm text-white/80">Président Directeur Général, Farafina Group</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-[#1A1A1A] mb-4">Notre Équipe de Direction</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des professionnels expérimentés dédiés au développement de la prochaine génération de talents du football africain.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-sans font-semibold text-xl text-[#1A1A1A] mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-[#D4AF37] mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
