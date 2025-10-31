import { Dumbbell, Moon, Sun, Sunset } from "lucide-react"

export function IntegratedSchedule() {
  const schedule = [
    {
      time: "07:00 - 12:00",
      period: "Matin",
      icon: <Sun size={24} />,
      title: "Cours Académiques",
      activities: ["Mathématiques et Sciences", "Langues (Français/Anglais)", "Études Sociales et Histoire"],
      color: "bg-[#D4AF37]",
    },
    {
      time: "12:00 - 14:00",
      period: "Midi",
      icon: <Sunset size={24} />,
      title: "Déjeuner et Repos",
      activities: ["Repas nutritifs", "Temps de récupération", "Préparation mentale"],
      color: "bg-[#f29200]",
    },
    {
      time: "14:00 - 18:00",
      period: "Après-midi",
      icon: <Dumbbell size={24} />,
      title: "Entraînement Sportif",
      activities: ["Exercices techniques", "Sessions tactiques", "Conditionnement physique"],
      color: "bg-[#f29200]",
    },
    {
      time: "18:00 - 21:00",
      period: "Soir",
      icon: <Moon size={24} />,
      title: "Étude et Récupération",
      activities: ["Devoirs et tutorat", "Analyse vidéo", "Repos et bien-être"],
      color: "bg-[#2E2E2E]",
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-sans font-bold text-4xl lg:text-5xl text-[#2E2E2E] mb-6 text-balance">
            Une Journée Typique à <span className="text-[#f29200]">FFA</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Notre planning intégré équilibre la rigueur académique avec un entraînement sportif intensif, assurant un
            développement holistique pour chaque étudiant-athlète.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schedule.map((item, index) => (
              <div key={index} className="relative group">
                {index < schedule.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-border -translate-x-1/2 z-0" />
                )}

                <div className="relative bg-white border-2 border-border rounded-2xl p-6 hover:border-[#f29200] transition-all hover:shadow-lg z-10">
                  <div
                    className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <div className="text-white">{item.icon}</div>
                  </div>

                  <div className="text-sm font-semibold text-[#f29200] mb-2">{item.time}</div>

                  <h3 className="font-sans font-bold text-xl text-[#2E2E2E] mb-3">{item.title}</h3>

                  <ul className="space-y-2">
                    {item.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-[#f29200] rounded-full mt-1.5 flex-shrink-0" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
