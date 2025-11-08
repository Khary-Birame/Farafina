import { Button } from "@/components/ui/button"
import { ArrowRight, Lock, MessageCircle, Bell } from "lucide-react"
import Link from "next/link"

export function UserEngagement() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Sign In CTA */}
      <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl p-8 lg:p-12 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={32} className="text-white" />
          </div>
          <h2 className="font-sans font-bold text-3xl lg:text-4xl text-white mb-4 text-balance">
            Connectez-vous pour Accéder aux Matchs Exclusifs
          </h2>
          <p className="text-lg text-white/90 mb-8 text-pretty max-w-2xl mx-auto">
            Accédez à des flux en direct, des replays de matchs complets, des interviews de joueurs et du contenu exclusif en coulisses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-white text-[#D4AF37] hover:bg-gray-100 text-base h-12 px-8">
                Se Connecter
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-base h-12 px-8 bg-transparent"
              >
                Créer un Compte
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#D4AF37] transition-all">
          <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center mb-4">
            <MessageCircle size={24} className="text-[#D4AF37]" />
          </div>
          <h3 className="font-sans font-bold text-white text-lg mb-2">Chat en Direct</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Rejoignez la conversation avec les fans pendant les matchs en direct et partagez vos pensées.
          </p>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#D4AF37] transition-all">
          <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center mb-4">
            <Bell size={24} className="text-[#D4AF37]" />
          </div>
          <h3 className="font-sans font-bold text-white text-lg mb-2">Alertes de Match</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Recevez des notifications lorsque vos équipes et joueurs favoris sont sur le point d'être en direct.
          </p>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#D4AF37] transition-all">
          <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center mb-4">
            <Lock size={24} className="text-[#D4AF37]" />
          </div>
          <h3 className="font-sans font-bold text-white text-lg mb-2">Contenu Premium</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Accédez à des interviews exclusives, des séances d'entraînement et du contenu documentaire.
          </p>
        </div>
      </div>
    </div>
  )
}
