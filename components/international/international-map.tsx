"use client"

import { MapPin, Globe } from "lucide-react"

const partnerCountries = [
  { name: "France", flag: "🇫🇷", cities: ["Paris", "Lyon", "Marseille"], color: "bg-blue-500" },
  { name: "Espagne", flag: "🇪🇸", cities: ["Barcelone", "Madrid", "Valence"], color: "bg-red-500" },
  { name: "Italie", flag: "🇮🇹", cities: ["Milan", "Rome", "Turin"], color: "bg-green-500" },
  { name: "Angleterre", flag: "🇬🇧", cities: ["Londres", "Manchester", "Liverpool"], color: "bg-blue-600" },
  { name: "Allemagne", flag: "🇩🇪", cities: ["Munich", "Berlin", "Dortmund"], color: "bg-yellow-500" },
  { name: "Portugal", flag: "🇵🇹", cities: ["Lisbonne", "Porto"], color: "bg-green-600" },
  { name: "Pays-Bas", flag: "🇳🇱", cities: ["Amsterdam", "Rotterdam"], color: "bg-orange-500" },
  { name: "Belgique", flag: "🇧🇪", cities: ["Bruxelles", "Anvers"], color: "bg-red-600" },
]

export function InternationalMap() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37]/20 rounded-full mb-6">
              <Globe className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] mb-4 text-balance">
              Notre réseau international
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des partenariats solides avec des clubs et académies prestigieuses à travers l'Europe et le monde.
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
              <div className="text-sm text-muted-foreground">Pays partenaires</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Clubs partenaires</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2">200+</div>
              <div className="text-sm text-muted-foreground">Joueurs accompagnés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Taux de réussite</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

