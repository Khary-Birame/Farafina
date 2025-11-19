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
      name: t("international.map.countries.portugal.name"),
      flag: "🇵🇹",
      cities: [
        t("international.map.countries.portugal.cities.lisbon"),
        t("international.map.countries.portugal.cities.porto"),
      ],
      color: "bg-green-600",
    },
    {
      name: t("international.map.countries.uae.name"),
      flag: "🇦🇪",
      cities: [
        t("international.map.countries.uae.cities.dubai"),
        t("international.map.countries.uae.cities.abudhabi"),
        t("international.map.countries.uae.cities.sharjah"),
      ],
      color: "bg-green-700",
    },
    {
      name: t("international.map.countries.morocco.name"),
      flag: "🇲🇦",
      cities: [
        t("international.map.countries.morocco.cities.casablanca"),
        t("international.map.countries.morocco.cities.rabat"),
        t("international.map.countries.morocco.cities.marrakech"),
      ],
      color: "bg-red-700",
    },
    {
      name: t("international.map.countries.senegal.name"),
      flag: "🇸🇳",
      cities: [
        t("international.map.countries.senegal.cities.dakar"),
        t("international.map.countries.senegal.cities.thies"),
      ],
      color: "bg-green-800",
    },
    {
      name: t("international.map.countries.nigeria.name"),
      flag: "🇳🇬",
      cities: [
        t("international.map.countries.nigeria.cities.lagos"),
        t("international.map.countries.nigeria.cities.abuja"),
      ],
      color: "bg-green-600",
    },
    {
      name: t("international.map.countries.southAfrica.name"),
      flag: "🇿🇦",
      cities: [
        t("international.map.countries.southAfrica.cities.johannesburg"),
        t("international.map.countries.southAfrica.cities.capetown"),
      ],
      color: "bg-blue-700",
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
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2">9+</div>
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

