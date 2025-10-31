import { Monitor, Tablet, Smartphone } from "lucide-react"

export function ResponsivePreview() {
  return (
    <section className="py-24 px-4 bg-[#2E2E2E]">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-sans font-bold text-white mb-6">Responsive Design</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#008037] to-[#D4AF37] mx-auto mb-6" />
          <p className="text-xl text-white/80 font-mono max-w-3xl mx-auto">
            Optimized experience across all devices and screen sizes
          </p>
        </div>

        {/* Device Previews */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Desktop */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-6 border border-white/20 hover:border-[#008037] transition-colors">
              <Monitor className="w-20 h-20 text-[#D4AF37] mx-auto mb-4" />
              <div className="bg-gradient-to-br from-[#008037] to-[#00a045] h-32 rounded-xl mb-4" />
            </div>
            <h3 className="text-2xl font-sans font-bold text-white mb-2">Desktop</h3>
            <p className="text-white/70 font-mono">1920px+ • Full Experience</p>
          </div>

          {/* Tablet */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-6 border border-white/20 hover:border-[#008037] transition-colors">
              <Tablet className="w-20 h-20 text-[#D4AF37] mx-auto mb-4" />
              <div className="bg-gradient-to-br from-[#008037] to-[#00a045] h-32 rounded-xl mb-4 max-w-[200px] mx-auto" />
            </div>
            <h3 className="text-2xl font-sans font-bold text-white mb-2">Tablet</h3>
            <p className="text-white/70 font-mono">768px - 1919px • Adaptive</p>
          </div>

          {/* Mobile */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-6 border border-white/20 hover:border-[#008037] transition-colors">
              <Smartphone className="w-20 h-20 text-[#D4AF37] mx-auto mb-4" />
              <div className="bg-gradient-to-br from-[#008037] to-[#00a045] h-32 rounded-xl mb-4 max-w-[120px] mx-auto" />
            </div>
            <h3 className="text-2xl font-sans font-bold text-white mb-2">Mobile</h3>
            <p className="text-white/70 font-mono">320px - 767px • Optimized</p>
          </div>
        </div>

        {/* Grid System Note */}
        <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <h3 className="text-2xl font-sans font-bold text-white mb-4">Design System</h3>
          <p className="text-white/80 font-mono leading-relaxed">
            Built on a flexible 12-column grid system with responsive breakpoints. Components adapt seamlessly across
            devices while maintaining visual hierarchy and brand consistency. Mobile-first approach ensures optimal
            performance on all platforms.
          </p>
        </div>
      </div>
    </section>
  )
}
