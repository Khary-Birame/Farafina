export function SponsorsSection() {
  const sponsors = [
    { name: "Farafina Group", logo: "/farafina-group-logo.jpg" },
    { name: "Nike", logo: "/nike-logo-white.png" },
    { name: "Adidas", logo: "/adidas-logo-white.jpg" },
    { name: "Puma", logo: "/puma-logo-white.jpg" },
    { name: "CAF", logo: "/caf-football-logo.jpg" },
    { name: "FIFA", logo: "/fifa-logo-white.jpg" },
  ]

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="font-sans font-bold text-3xl lg:text-4xl text-white mb-3">Official Partners</h2>
        <p className="text-gray-400">Supported by world-class organizations</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.name}
            className="flex items-center justify-center p-6 bg-[#2E2E2E] rounded-xl border border-[#3a3a3a] hover:border-[#D4AF37] transition-all group"
          >
            <img
              src={sponsor.logo || "/placeholder.svg"}
              alt={sponsor.name}
              className="w-full h-12 object-contain opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
