import { Quote } from "lucide-react"

const team = [
  {
    name: "Amadou Diallo",
    role: "Head Coach",
    bio: "Former professional player with 15+ years of coaching experience in European academies.",
    image: "/african-football-coach-portrait.jpg",
  },
  {
    name: "Dr. Fatou Sow",
    role: "Academic Director",
    bio: "PhD in Education, specializing in sport-study programs and youth development.",
    image: "/african-female-educator-portrait.jpg",
  },
  {
    name: "Ibrahim Kane",
    role: "Technical Director",
    bio: "UEFA Pro License holder with expertise in talent identification and player development.",
    image: "/african-technical-director-portrait.jpg",
  },
]

export function Leadership() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* CEO Quote */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative bg-gradient-to-br from-[#008037] to-[#006629] rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <Quote className="text-[#D4AF37] mb-6" size={48} />
              <blockquote className="text-2xl md:text-3xl font-sans font-semibold text-white mb-6 leading-relaxed text-balance">
                "At Farafina, discipline shapes talent, and respect creates champions."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full overflow-hidden">
                  <img src="/african-ceo-portrait.jpg" alt="CEO" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-sans font-semibold text-lg text-white">Moussa Traoré</p>
                  <p className="text-sm text-white/80">Founder & CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-[#2E2E2E] mb-4">Our Leadership Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experienced professionals dedicated to developing the next generation of African football talent.
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
                <h3 className="font-sans font-semibold text-xl text-[#2E2E2E] mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-[#008037] mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
