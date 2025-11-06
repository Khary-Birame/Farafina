import { Handshake, Globe, Users } from "lucide-react"

export function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#16A34A] to-[#15803D] text-white py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
        <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-white rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border-2 border-white rounded-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
            Contact et Partenariats
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed text-pretty">
            Collaborez avec Farafina Foot Academy et aidez à façonner l'avenir du football africain.
          </p>

          {/* Icon Features */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Handshake className="text-white" size={24} />
              </div>
              <span className="text-sm font-medium">Partenariat</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Globe className="text-white" size={24} />
              </div>
              <span className="text-sm font-medium">Réseau Mondial</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Users className="text-white" size={24} />
              </div>
              <span className="text-sm font-medium">Communauté</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
