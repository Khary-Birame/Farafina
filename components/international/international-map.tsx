"use client"

import { MapPin, Globe } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import { useMemo } from "react"

export function InternationalMap() {
  const { t } = useTranslation()

  const partnerCountries = useMemo(() => [
    {
      name: t("international.map.countries.france.name"),
      flag: "🇫🇷",
      cities: [
        t("international.map.countries.france.cities.paris"),
        t("international.map.countries.france.cities.lyon"),
        t("international.map.countries.france.cities.marseille"),
      ],
      color: "bg-blue-500",
    },
    {
      name: t("international.map.countries.spain.name"),
      flag: "🇪🇸",
      cities: [
        t("international.map.countries.spain.cities.barcelona"),
        t("international.map.countries.spain.cities.madrid"),
        t("international.map.countries.spain.cities.valencia"),
      ],
      color: "bg-red-500",
    },
    {
      name: t("international.map.countries.italy.name"),
      flag: "🇮🇹",
      cities: [
        t("international.map.countries.italy.cities.milan"),
        t("international.map.countries.italy.cities.rome"),
        t("international.map.countries.italy.cities.turin"),
      ],
      color: "bg-green-500",
    },
    {
      name: t("international.map.countries.england.name"),
      flag: "🇬🇧",
      cities: [
        t("international.map.countries.england.cities.london"),
        t("international.map.countries.england.cities.manchester"),
        t("international.map.countries.england.cities.liverpool"),
      ],
      color: "bg-blue-600",
    },
    {
      name: t("international.map.countries.germany.name"),
      flag: "🇩🇪",
      cities: [
        t("international.map.countries.germany.cities.munich"),
        t("international.map.countries.germany.cities.berlin"),
        t("international.map.countries.germany.cities.dortmund"),
      ],
      color: "bg-yellow-500",
    },
    {
      name: t("international.map.countries.portugal.name"),
      flag: "🇵🇹",
      cities: [
        t("international.map.countries.portugal.cities.lisbon"),
        t("international.map.countries.portugal.cities.porto"),
      ],
      color: "bg-green-600",
    },
    {
      name: t("international.map.countries.netherlands.name"),
      flag: "🇳🇱",
      cities: [
        t("international.map.countries.netherlands.cities.amsterdam"),
        t("international.map.countries.netherlands.cities.rotterdam"),
      ],
      color: "bg-orange-500",
    },
    {
      name: t("international.map.countries.belgium.name"),
      flag: "🇧🇪",
      cities: [
        t("international.map.countries.belgium.cities.brussels"),
        t("international.map.countries.belgium.cities.antwerp"),
      ],
      color: "bg-red-600",
    },
  ], [t])

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37]/20 rounded-full mb-6">
              <Globe className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-4 text-balance">
              {t("international.map.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("international.map.description")}
            </p>
          </div>

          {/* Countries Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {partnerCountries.map((country, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 border-2 border-border hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg text-center"
              >
                <div className="text-4xl mb-3">{country.flag}</div>
                <h3 className="font-sans font-bold text-lg text-[#1A1A1A] mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {country.name}
                </h3>
                <div className="space-y-1">
                  {country.cities.map((city, cityIndex) => (
                    <div key={cityIndex} className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span>{city}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2">8+</div>
              <div className="text-sm text-muted-foreground">{t("international.map.stats.countries")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2">50+</div>
              <div className="text-sm text-muted-foreground">{t("international.map.stats.clubs")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2">200+</div>
              <div className="text-sm text-muted-foreground">{t("international.map.stats.players")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2">95%</div>
              <div className="text-sm text-muted-foreground">{t("international.map.stats.successRate")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

