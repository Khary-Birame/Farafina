export function CreditsSlide() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] via-[#e6c966] to-[#008037] opacity-95" />
      </div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-[#008037] font-sans font-bold text-4xl">FFA</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-5xl md:text-6xl font-sans font-bold text-white mb-8 leading-tight">
          Farafina Foot Academy
        </h2>

        <p className="text-2xl md:text-3xl text-white/90 mb-6 font-mono">Digital Experience Design</p>

        {/* Divider */}
        <div className="w-32 h-1 bg-white/40 mx-auto mb-8" />

        {/* Quote */}
        <div className="bg-white/20 backdrop-blur-md px-8 py-6 rounded-2xl border-2 border-white/40 mb-12 max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl text-white font-sans italic leading-relaxed">
            "Designed with passion and purpose in Dakar, Senegal."
          </p>
        </div>

        {/* Credits */}
        <div className="space-y-3 text-white/80 font-mono">
          <p className="text-lg">Design System & UI/UX</p>
          <p className="text-lg">Brand Identity & Visual Direction</p>
          <p className="text-lg">Web Development & Implementation</p>
        </div>

        {/* Year */}
        <div className="mt-12">
          <p className="text-white/60 font-mono text-sm">© 2025 Farafina Foot Academy</p>
        </div>
      </div>
    </section>
  )
}
