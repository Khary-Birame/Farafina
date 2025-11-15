"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/hooks/use-translation"

export function MapSection() {
  const { t } = useTranslation()

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-3 py-1.5 rounded-full mb-4">
              <MapPin className="w-3 h-3 text-[#D4AF37]" />
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wide">Localisation</span>
            </div>
            <h2 className="font-sans font-bold text-3xl md:text-4xl mb-4 text-[#1A1A1A]">{t("contact.map.title", "Visitez Notre Siège")}</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              {t("contact.map.description", "Situé au cœur de Dakar, notre siège administratif de Fann Hock offre un accès rapide depuis toute la capitale.")}
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
            {/* Map Placeholder */}
            <div className="relative h-96 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center z-10">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl animate-pulse-slow">
                    <MapPin className="text-white" size={44} />
                  </div>
                  <p className="text-[#1A1A1A] font-bold text-xl mb-1">Fann Hock, Boulevard Martin Luther King, Dakar</p>
                  <p className="text-sm text-gray-500 mt-2">14.67927° N, 17.46526° O</p>
                </div>
              </div>

              {/* Interactive Map Overlay */}
              <div className="absolute inset-0 bg-[url('/fann_hock.jpg')] bg-cover bg-center opacity-20" />
              
              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #D4AF37 1px, transparent 1px),
                    linear-gradient(to bottom, #D4AF37 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }}
              />
            </div>

            {/* Map Info Bar */}
            <div className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-t border-gray-200/80">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/10 rounded-xl flex items-center justify-center shadow-sm">
                    <Navigation className="text-[#D4AF37]" size={30} />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-[#1A1A1A]">{t("contact.map.location.title", "Situé dans le quartier Fann Hock")}</p>
                    <p className="text-sm text-gray-600 mt-1">{t("contact.map.location.description", "Accès rapide via le Boulevard Martin Luther King")}</p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/search/fann+hock+boulevard+martin+luther+king+n+10+dakar/@14.6792747,-17.4652576,16z?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#9a7a1a] text-white font-semibold px-8 h-12 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    {t("contact.map.getDirections", "Obtenir l'Itinéraire")}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
