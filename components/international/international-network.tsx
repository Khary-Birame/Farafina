"use client"

import { Globe, MapPin } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import { useMemo } from "react"

export function InternationalNetwork() {
  const { t } = useTranslation()

  const partnerCountries = useMemo(() => [
    {
      code: "FR",
      name: t("international.map.countries.france.name", "France"),
      cities: [
        t("international.map.countries.france.cities.paris", "Paris"),
        t("international.map.countries.france.cities.lyon", "Lyon"),
        t("international.map.countries.france.cities.marseille", "Marseille"),
      ],
    },
    {
      code: "ES",
      name: t("international.map.countries.spain.name", "Espagne"),
      cities: [
        t("international.map.countries.spain.cities.barcelona", "Barcelone"),
        t("international.map.countries.spain.cities.madrid", "Madrid"),
        t("international.map.countries.spain.cities.valencia", "Valence"),
      ],
    },
    {
      code: "PT",
      name: t("international.map.countries.portugal.name", "Portugal"),
      cities: [
        t("international.map.countries.portugal.cities.lisbon", "Lisbonne"),
        t("international.map.countries.portugal.cities.porto", "Porto"),
      ],
    },
    {
      code: "AE",
      name: t("international.map.countries.uae.name", "Émirats Arabes Unis"),
      cities: [
        t("international.map.countries.uae.cities.dubai", "Dubai"),
        t("international.map.countries.uae.cities.abudhabi", "Abu Dhabi"),
        t("international.map.countries.uae.cities.sharjah", "Sharjah"),
      ],
    },
    {
      code: "MA",
      name: t("international.map.countries.morocco.name", "Maroc"),
      cities: [
        t("international.map.countries.morocco.cities.casablanca", "Casablanca"),
        t("international.map.countries.morocco.cities.rabat", "Rabat"),
        t("international.map.countries.morocco.cities.marrakech", "Marrakech"),
      ],
    },
    {
      code: "SN",
      name: t("international.map.countries.senegal.name", "Sénégal"),
      cities: [
        t("international.map.countries.senegal.cities.dakar", "Dakar"),
        t("international.map.countries.senegal.cities.thies", "Thiès"),
      ],
    },
    {
      code: "NG",
      name: t("international.map.countries.nigeria.name", "Nigeria"),
      cities: [
        t("international.map.countries.nigeria.cities.lagos", "Lagos"),
        t("international.map.countries.nigeria.cities.abuja", "Abuja"),
      ],
    },
    {
      code: "ZA",
      name: t("international.map.countries.southAfrica.name", "Afrique du Sud"),
      cities: [
        t("international.map.countries.southAfrica.cities.johannesburg", "Johannesburg"),
        t("international.map.countries.southAfrica.cities.capetown", "Le Cap"),
      ],
    },
  ], [t])

  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
              <Globe className="h-4 w-4" />
              {t("international.map.badge", "Réseau International")}
            </div>
            <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
              <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
                {t("international.map.title", "Notre réseau international")}
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t("international.map.description", "Des partenariats solides avec des clubs et académies prestigieuses à travers l'Europe, l'Afrique et le monde.")}
            </p>
          </div>

          {/* Countries Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-16">
            {partnerCountries.map((country, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 border-2 border-gray-900 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-4">
                  <div className="text-sm font-bold text-gray-900 mb-1">
                    {country.code}
                  </div>
                  <h3 className="font-sans font-black text-lg text-gray-900 group-hover:text-[#D4AF37] transition-colors">
                    {country.name}
                  </h3>
                </div>
                <div className="space-y-2">
                  {country.cities.map((city, cityIndex) => (
                    <div key={cityIndex} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                      <span>{city}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#D4AF37] mb-2">9+</div>
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {t("international.map.stats.countries", "Pays partenaires")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#D4AF37] mb-2">50+</div>
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {t("international.map.stats.clubs", "Clubs partenaires")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#D4AF37] mb-2">200+</div>
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {t("international.map.stats.players", "Joueurs accompagnés")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[#D4AF37] mb-2">95%</div>
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {t("international.map.stats.successRate", "Taux de réussite")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

