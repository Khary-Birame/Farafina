import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function ApplyCTA() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-[#f29200] via-[#f29200] to-[#d17f00] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-3xl lg:text-5xl font-sans font-bold text-white mb-6 leading-tight text-balance">
            Prêt à Commencer ? Créez Votre Compte Candidat Maintenant
          </h2>

          {/* Description */}
          <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto text-pretty">
            Rejoignez des centaines de jeunes joueurs talentueux qui ont fait le premier pas vers leur carrière de football professionnel.
            Votre parcours commence ici.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#2E2E2E] font-semibold group w-full sm:w-auto"
              >
                Créer un Compte
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 w-full sm:w-auto"
              >
                Contacter l'Équipe d'Admissions
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20">
            <div>
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-white/70">Support Candidature</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">48h</div>
              <div className="text-sm text-white/70">Réponse Initiale</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-white/70">Processus Sécurisé</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
