import { Target, Zap, Users, TrendingUp } from "lucide-react"

export function BrandVision() {
  const keywords = [
    { icon: Target, label: "Discipline" },
    { icon: Zap, label: "Innovation" },
    { icon: Users, label: "Inclusion" },
    { icon: TrendingUp, label: "Performance" },
  ]

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-sans font-bold text-[#2E2E2E] mb-6">Brand Vision</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#f29200] to-[#D4AF37] mx-auto" />
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-br from-[#F5F5F5] to-white p-12 rounded-3xl shadow-lg mb-12 border border-[#E5E5E5]">
          <p className="text-2xl md:text-3xl text-[#2E2E2E] leading-relaxed text-center font-mono">
            Farafina Foot Academy empowers Africa's youth through sport, education, and technology.
          </p>
        </div>

        {/* Keywords */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {keywords.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl border-2 border-[#E5E5E5] hover:border-[#f29200] transition-all hover:shadow-lg group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#f29200] to-[#00a045] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-lg font-sans font-bold text-[#2E2E2E]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
