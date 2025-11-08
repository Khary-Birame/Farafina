export function ColorPalette() {
  const colors = [
    {
      name: "Farafina Gold",
      hex: "#D4AF37",
      rgb: "212, 175, 55",
      description: "Prestige, excellence et réussite",
      gradient: "from-[#D4AF37] to-[#E8C966]",
    },
    {
      name: "Noir",
      hex: "#1A1A1A",
      rgb: "26, 26, 26",
      description: "Force, professionnalisme et stabilité",
      gradient: "from-[#1A1A1A] to-[#000000]",
    },
    {
      name: "Blanc",
      hex: "#FFFFFF",
      rgb: "255, 255, 255",
      description: "Clarté, pureté et ouOrure",
      gradient: "from-white to-[#F5F5F5]",
    },
    {
      name: "Noir Pur",
      hex: "#000000",
      rgb: "0, 0, 0",
      description: "Élégance, modernité et distinction",
      gradient: "from-[#000000] to-[#1A1A1A]",
    },
  ]

  return (
    <section className="py-24 px-4 bg-[#1A1A1A]">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-sans font-bold text-white mb-6">Palette de Couleurs</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#E8C966] mx-auto" />
        </div>

        {/* Color Swatches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colors.map((color, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform"
            >
              {/* Color Swatch */}
              <div
                className={`h-48 bg-gradient-to-br ${color.gradient} ${
                  color.name === "Blanc" ? "border-b-2 border-[#E5E5E5]" : ""
                }`}
              />

              {/* Color Info */}
              <div className="p-6">
                <h3 className="text-2xl font-sans font-bold text-[#1A1A1A] mb-2">{color.name}</h3>
                <div className="flex gap-4 mb-4 font-mono text-sm">
                  <div>
                    <span className="text-[#737373]">HEX</span>
                    <p className="text-[#1A1A1A] font-bold">{color.hex}</p>
                  </div>
                  <div>
                    <span className="text-[#737373]">RGB</span>
                    <p className="text-[#1A1A1A] font-bold">{color.rgb}</p>
                  </div>
                </div>
                <p className="text-[#737373] leading-relaxed">{color.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
