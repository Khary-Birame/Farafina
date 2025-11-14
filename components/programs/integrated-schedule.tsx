"use client"

import { Dumbbell, Moon, Sun, Sunset } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import { useMemo } from "react"

export function IntegratedSchedule() {
  const { t } = useTranslation()

  const schedule = useMemo(() => [
    {
      time: "07:00 - 12:00",
      period: t("programs.schedule.morning.period"),
      icon: <Sun size={24} />,
      title: t("programs.schedule.morning.title"),
      activities: [
        t("programs.schedule.morning.activities.math"),
        t("programs.schedule.morning.activities.languages"),
        t("programs.schedule.morning.activities.social"),
      ],
      color: "bg-[#D4AF37]",
    },
    {
      time: "12:00 - 14:00",
      period: t("programs.schedule.noon.period"),
      icon: <Sunset size={24} />,
      title: t("programs.schedule.noon.title"),
      activities: [
        t("programs.schedule.noon.activities.meals"),
        t("programs.schedule.noon.activities.recovery"),
        t("programs.schedule.noon.activities.mental"),
      ],
      color: "bg-[#D4AF37]",
    },
    {
      time: "14:00 - 18:00",
      period: t("programs.schedule.afternoon.period"),
      icon: <Dumbbell size={24} />,
      title: t("programs.schedule.afternoon.title"),
      activities: [
        t("programs.schedule.afternoon.activities.technical"),
        t("programs.schedule.afternoon.activities.tactical"),
        t("programs.schedule.afternoon.activities.conditioning"),
      ],
      color: "bg-[#D4AF37]",
    },
    {
      time: "18:00 - 21:00",
      period: t("programs.schedule.evening.period"),
      icon: <Moon size={24} />,
      title: t("programs.schedule.evening.title"),
      activities: [
        t("programs.schedule.evening.activities.homework"),
        t("programs.schedule.evening.activities.video"),
        t("programs.schedule.evening.activities.rest"),
      ],
      color: "bg-[#1A1A1A]",
    },
  ], [t])

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-sans font-bold text-4xl lg:text-5xl text-[#1A1A1A] mb-6 text-balance">
            {t("programs.schedule.title")} <span className="text-[#D4AF37]">{t("programs.schedule.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("programs.schedule.description")}
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

                <div className="relative bg-white border-2 border-border rounded-2xl p-6 hover:border-[#D4AF37] transition-all hover:shadow-lg z-10">
                  <div
                    className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <div className="text-white">{item.icon}</div>
                  </div>

                  <div className="text-sm font-semibold text-[#D4AF37] mb-2">{item.time}</div>

                  <h3 className="font-sans font-bold text-xl text-[#1A1A1A] mb-3">{item.title}</h3>

                  <ul className="space-y-2">
                    {item.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-1.5 flex-shrink-0" />
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
