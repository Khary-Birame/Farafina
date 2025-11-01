import Image from "next/image"

export function PageMockups() {
  const pages = [
    {
      title: "Page d'accueil",
      description: "Section hero dynamique avec la vision de l'académie, statistiques, programmes et valeurs.",
      image: "/farafina-academy-homepage-hero-with-green-and-gold.jpg",
    },
    {
      title: "Programmes Académiques & Sportifs",
      description: "Vitrine de double excellence avec planning intégré et programmes par groupes d'âge.",
      image: "/sports-and-academic-programs-page-layout.jpg",
    },
    {
      title: "Admissions & Paiements",
      description: "Processus de candidature clair avec paiement multi-devises et informations sur les bourses.",
      image: "/admissions-form-with-payment-options.jpg",
    },
    {
      title: "FFA TV",
      description: "Plateforme de streaming premium avec matchs en direct, rediffusions et highlights.",
      image: "/video-streaming-platform-dark-theme.jpg",
    },
    {
      title: "IA & Détection de Talents",
      description: "Tableau de bord futuriste présentant les analyses et prédictions de joueurs alimentées par l'IA.",
      image: "/ai-dashboard-with-player-metrics-and-analytics.jpg",
    },
    {
      title: "Partenaires & Contact",
      description: "Formulaire de contact professionnel avec opportunités de partenariat et carte de localisation.",
      image: "/contact-page-with-form-and-map.jpg",
    },
  ]

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-sans font-bold text-[#2E2E2E] mb-6">Maquettes de Pages</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#f29200] to-[#D4AF37] mx-auto mb-6" />
          <p className="text-xl text-[#737373] font-mono max-w-3xl mx-auto">
            Expérience complète du site web à travers toutes les sections principales
          </p>
        </div>

        {/* Page Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {pages.map((page, index) => (
            <div
              key={index}
              className="group bg-[#F5F5F5] rounded-3xl overflow-hidden border-2 border-[#E5E5E5] hover:border-[#f29200] transition-all hover:shadow-2xl"
            >
              {/* Mockup Image */}
              <div className="relative aspect-video bg-gradient-to-br from-[#2E2E2E] to-[#3a3a3a] overflow-hidden">
                <Image
                  src={page.image || "/placeholder.svg"}
                  alt={page.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Browser Chrome */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-white/10 backdrop-blur-sm flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-[#f29200]" />
                  </div>
                </div>
              </div>

              {/* Page Info */}
              <div className="p-8">
                <h3 className="text-2xl font-sans font-bold text-[#2E2E2E] mb-3">{page.title}</h3>
                <p className="text-[#737373] font-mono leading-relaxed">{page.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
