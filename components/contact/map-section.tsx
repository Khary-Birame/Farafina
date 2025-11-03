import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"
import Link from "next/link"

export function MapSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-3xl md:text-4xl mb-4 text-[#2E2E2E]">Visitez Notre Campus</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Situé dans la ville côtière de Cayar, nos installations de classe mondiale sont facilement accessibles depuis Dakar.
            </p>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            {/* Map Placeholder */}
            <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#f29200] rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="text-white" size={32} />
                  </div>
                  <p className="text-gray-600 font-medium">Cayar, Région de Thiès, Sénégal</p>
                  <p className="text-sm text-gray-500 mt-1">14.7333° N, 17.1667° O</p>
                </div>
              </div>

              {/* Interactive Map Overlay */}
              <div className="absolute inset-0 bg-[url('/map-of-cayar-senegal.jpg')] bg-cover bg-center opacity-20" />
            </div>

            {/* Map Info Bar */}
            <div className="p-6 bg-white border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#f29200]/10 rounded-lg flex items-center justify-center">
                    <Navigation className="text-[#f29200]" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2E2E2E]">Environ 50 km de Dakar</p>
                    <p className="text-sm text-gray-600">Environ 1 heure de route via la Route de Kayar</p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Cayar,+Thiès,+Sénégal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#f29200] hover:bg-[#d17f00] text-[#ffffff] font-semibold px-6">
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
