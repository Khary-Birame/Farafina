"use client"

import { Clock, Sun, Coffee, GraduationCap, Dumbbell, BookOpen, UtensilsCrossed, Moon } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import { cn } from "@/lib/utils"

interface ScheduleItem {
  time: string
  icon: React.ElementType
  title: string
  description: string
  color: string
}

export function InternatDailySchedule() {
  const { t } = useTranslation()

  const schedule: ScheduleItem[] = [
    {
      time: "06:00",
      icon: Sun,
      title: t("internat.schedule.wakeup.title", "Réveil"),
      description: t("internat.schedule.wakeup.description", "Réveil matinal avec routine d'étirement et préparation pour la journée"),
      color: "from-yellow-400 to-orange-500"
    },
    {
      time: "06:30",
      icon: Coffee,
      title: t("internat.schedule.breakfast.title", "Petit-déjeuner"),
      description: t("internat.schedule.breakfast.description", "Petit-déjeuner équilibré et énergisant pour bien commencer la journée"),
      color: "from-amber-500 to-yellow-600"
    },
    {
      time: "07:30",
      icon: GraduationCap,
      title: t("internat.schedule.school.title", "École"),
      description: t("internat.schedule.school.description", "Cours académiques selon le programme scolaire officiel"),
      color: "from-blue-500 to-indigo-600"
    },
    {
      time: "12:00",
      icon: UtensilsCrossed,
      title: t("internat.schedule.lunch.title", "Déjeuner"),
      description: t("internat.schedule.lunch.description", "Repas complet et nutritif adapté aux besoins des sportifs"),
      color: "from-green-500 to-emerald-600"
    },
    {
      time: "14:00",
      icon: Dumbbell,
      title: t("internat.schedule.training.title", "Entraînement"),
      description: t("internat.schedule.training.description", "Séances d'entraînement technique, tactique et physique"),
      color: "from-red-500 to-rose-600"
    },
    {
      time: "17:00",
      icon: BookOpen,
      title: t("internat.schedule.study.title", "Études Surveillées"),
      description: t("internat.schedule.study.description", "Séances d'étude encadrées avec aide aux devoirs et tutorat"),
      color: "from-purple-500 to-pink-600"
    },
    {
      time: "19:00",
      icon: UtensilsCrossed,
      title: t("internat.schedule.dinner.title", "Dîner"),
      description: t("internat.schedule.dinner.description", "Dîner équilibré suivi d'un moment de détente"),
      color: "from-indigo-500 to-purple-600"
    },
    {
      time: "21:00",
      icon: Moon,
      title: t("internat.schedule.rest.title", "Repos"),
      description: t("internat.schedule.rest.description", "Temps libre, détente et préparation au coucher pour une récupération optimale"),
      color: "from-gray-600 to-gray-800"
    },
  ]

  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <Clock className="h-4 w-4" />
            {t("internat.schedule.badge", "Routine Quotidienne")}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
            <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
              {t("internat.schedule.title", "Une Journée Type à l'Internat")}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("internat.schedule.description", "Un planning équilibré entre études, sport, repos et développement personnel.")}
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4AF37] via-[#B8941F] to-[#D4AF37] hidden md:block" />

            {/* Schedule Items */}
            <div className="space-y-8">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="reveal relative flex items-start gap-6 group"
                >
                  {/* Time & Icon */}
                  <div className="flex-shrink-0">
                    <div className={cn(
                      "w-16 h-16 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform",
                      `bg-gradient-to-br ${item.color}`
                    )}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center mt-2">
                      <div className="font-black text-lg text-gray-900">{item.time}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white rounded-2xl p-6 border-2 border-gray-200 group-hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl">
                    <h3 className="font-sans font-black text-2xl text-gray-900 mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

