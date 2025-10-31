import Image from "next/image"

export function PageMockups() {
  const pages = [
    {
      title: "Homepage",
      description: "Dynamic hero section with academy vision, stats, programs, and values.",
      image: "/farafina-academy-homepage-hero-with-green-and-gold.jpg",
    },
    {
      title: "Academic & Sports Programs",
      description: "Dual excellence showcase with integrated schedule and age-group programs.",
      image: "/sports-and-academic-programs-page-layout.jpg",
    },
    {
      title: "Admissions & Payments",
      description: "Clear application process with multi-currency payment and scholarship info.",
      image: "/admissions-form-with-payment-options.jpg",
    },
    {
      title: "FFA TV",
      description: "Premium streaming platform with live matches, replays, and highlights.",
      image: "/video-streaming-platform-dark-theme.jpg",
    },
    {
      title: "AI & Talent Scouting",
      description: "Futuristic dashboard showcasing AI-powered player analytics and predictions.",
      image: "/ai-dashboard-with-player-metrics-and-analytics.jpg",
    },
    {
      title: "Partners & Contact",
      description: "Professional contact form with partnership opportunities and location map.",
      image: "/contact-page-with-form-and-map.jpg",
    },
  ]

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-sans font-bold text-[#2E2E2E] mb-6">Page Mockups</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#008037] to-[#D4AF37] mx-auto mb-6" />
          <p className="text-xl text-[#737373] font-mono max-w-3xl mx-auto">
            Complete website experience across all major sections
          </p>
        </div>

        {/* Page Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {pages.map((page, index) => (
            <div
              key={index}
              className="group bg-[#F5F5F5] rounded-3xl overflow-hidden border-2 border-[#E5E5E5] hover:border-[#008037] transition-all hover:shadow-2xl"
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
                    <div className="w-3 h-3 rounded-full bg-green-500" />
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
