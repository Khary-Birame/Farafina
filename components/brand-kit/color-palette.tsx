export function ColorPalette() {
  const colors = [
    {
      name: "Farafina Green",
      hex: "#008037",
      rgb: "0, 128, 55",
      description: "Vitality, growth, and African heritage",
      gradient: "from-[#008037] to-[#00a045]",
    },
    {
      name: "Anthracite Gray",
      hex: "#2E2E2E",
      rgb: "46, 46, 46",
      description: "Strength, professionalism, and stability",
      gradient: "from-[#2E2E2E] to-[#3a3a3a]",
    },
    {
      name: "Gold",
      hex: "#D4AF37",
      rgb: "212, 175, 55",
      description: "Excellence, prestige, and achievement",
      gradient: "from-[#D4AF37] to-[#e6c966]",
    },
    {
      name: "White",
      hex: "#FFFFFF",
      rgb: "255, 255, 255",
      description: "Clarity, purity, and openness",
      gradient: "from-white to-[#F5F5F5]",
    },
    {
      name: "Light Gray",
      hex: "#F5F5F5",
      rgb: "245, 245, 245",
      description: "Subtle backgrounds and soft contrast",
      gradient: "from-[#F5F5F5] to-[#E5E5E5]",
    },
  ]

  return (
    <section className="py-24 px-4 bg-[#2E2E2E]">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-sans font-bold text-white mb-6">Color Palette</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#008037] to-[#D4AF37] mx-auto" />
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
                  color.name === "White" ? "border-b-2 border-[#E5E5E5]" : ""
                }`}
              />

              {/* Color Info */}
              <div className="p-6">
                <h3 className="text-2xl font-sans font-bold text-[#2E2E2E] mb-2">{color.name}</h3>
                <div className="flex gap-4 mb-4 font-mono text-sm">
                  <div>
                    <span className="text-[#737373]">HEX</span>
                    <p className="text-[#2E2E2E] font-bold">{color.hex}</p>
                  </div>
                  <div>
                    <span className="text-[#737373]">RGB</span>
                    <p className="text-[#2E2E2E] font-bold">{color.rgb}</p>
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
