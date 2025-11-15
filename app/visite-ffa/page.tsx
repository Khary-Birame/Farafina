import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VisiteFFAForm } from "@/components/visite-ffa/visite-ffa-form"

export const metadata = {
  title: "Planifier une visite de FFA - Farafina Foot Academy",
  description:
    "Remplissez ce formulaire pour planifier votre visite de Farafina Foot Academy et permettre à notre équipe de préparer votre accueil.",
}

export default function VisiteFFAPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative text-white py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#2a2a2a] to-[#1A1A1A]">
          {/* Modern Animated Background */}
          <div className="absolute inset-0">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-[#d17e00]/20 animate-pulse-glow" />

            {/* Geometric shapes */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(to right, white 1px, transparent 1px),
                  linear-gradient(to bottom, white 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <span className="text-sm font-medium">Planification de Visite</span>
              </div>

              {/* Heading */}
              <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                Planifier une visite de <span className="text-[#D4AF37]">FFA</span>
              </h1>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
                Remplissez ce formulaire pour nous permettre de préparer votre accueil et de vous offrir une expérience mémorable.
              </p>

              {/* Decorative elements */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <div className="w-12 h-0.5 bg-[#D4AF37]" />
                <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <div className="w-12 h-0.5 bg-[#D4AF37]" />
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <VisiteFFAForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

