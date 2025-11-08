import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"
import Link from "next/link"

export function MapSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-3xl md:text-4xl mb-4 text-[#1A1A1A]">Visitez Notre Siège</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Situé au cœur de Dakar, notre siège administratif de Fann Hock offre un accès rapide depuis toute la capitale.
            </p>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            {/* Map Placeholder */}
            <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="text-white" size={32} />
                  </div>
                  <p className="text-gray-600 font-medium">Fann Hock, Boulevard Martin Luther King, Dakar</p>
                  <p className="text-sm text-gray-500 mt-1">14.67927° N, 17.46526° O</p>
                </div>
              </div>

              {/* Interactive Map Overlay */}
              <div className="absolute inset-0 bg-[url('/map-of-cayar-senegal.jpg')] bg-cover bg-center opacity-20" />
            </div>

            {/* Map Info Bar */}
            <div className="p-6 bg-white border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center">
                    <Navigation className="text-[#D4AF37]" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Situé dans le quartier Fann Hock</p>
                    <p className="text-sm text-gray-600">Accès rapide via le Boulevard Martin Luther King</p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/search/fann+hock+boulevard+martin+luther+king+n+10+dakar/@14.6792747,-17.4652576,16z?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#ffffff] font-semibold px-6">
                    Obtenir l'Itinéraire
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
