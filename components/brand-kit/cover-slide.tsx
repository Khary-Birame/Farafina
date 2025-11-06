export function CoverSlide() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#16A34A] via-[#00a045] to-[#D4AF37] opacity-90" />

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
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
            <span className="text-[#16A34A] font-sans font-bold text-5xl">FFA</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-sans font-bold text-white mb-6 leading-tight">
          Farafina Foot Academy
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl text-white/90 mb-4 font-mono">Digital Identity & Design Overview</p>

        <p className="text-lg md:text-xl text-white/80 mb-12 font-mono">
          Website Design System & UI Concept (2025 Edition)
        </p>

        {/* Tagline */}
        <div className="inline-block bg-white/20 backdrop-blur-md px-8 py-4 rounded-full border-2 border-white/40">
          <p className="text-xl md:text-2xl text-white font-sans font-semibold italic">
            "The future of African football starts here."
          </p>
        </div>
      </div>
    </section>
  )
}
