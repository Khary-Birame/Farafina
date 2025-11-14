"use client"

import { useTranslation } from "@/lib/hooks/use-translation"

export function InternationalVision() {
  const { t } = useTranslation()

  return (
    <section id="program" className="py-16 lg:py-24 bg-gradient-to-b from-white to-[#D4AF37]/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider">
                  {t("international.vision.badge")}
                </span>
              </div>

              <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] leading-tight">
                {t("international.vision.title")}
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {t("international.vision.description.paragraph1")}
                </p>
                <p>
                  {t("international.vision.description.paragraph2")}
                </p>
                <p>
                  {t("international.vision.description.paragraph3")}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                  <span className="text-sm font-medium text-[#1A1A1A]">{t("international.vision.features.continuous")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                  <span className="text-sm font-medium text-[#1A1A1A]">{t("international.vision.features.network")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                  <span className="text-sm font-medium text-[#1A1A1A]">{t("international.vision.features.complete")}</span>
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
                  "{t("international.vision.quote")}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

