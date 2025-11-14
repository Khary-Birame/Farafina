"use client"

import { useTranslation } from "@/lib/hooks/use-translation"

export function EventsIntroduction() {
  const { t } = useTranslation()

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-6 text-balance">
            {t("events.introduction.title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            {t("events.introduction.description")}
          </p>
        </div>
      </div>
    </section>
  )
}

