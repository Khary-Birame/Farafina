import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Play } from "lucide-react"
import Link from "next/link"

export function UIComponents() {
  return (
    <section className="py-24 px-4 bg-[#F5F5F5]">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-sans font-bold text-[#1A1A1A] mb-6">Composants UI</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] mx-auto" />
        </div>

        {/* Buttons */}
        <div className="mb-16">
          <h3 className="text-3xl font-sans font-bold text-[#1A1A1A] mb-8">Boutons</h3>
          <div className="bg-white p-12 rounded-3xl border border-[#E5E5E5] shadow-lg">
            <div className="flex flex-wrap gap-6 items-center">
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">Bouton Principal</Button>
              <Button className="bg-[#D4AF37] hover:bg-[#b8962e] text-[#1A1A1A]">Bouton Or</Button>
              <Button
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white bg-transparent"
              >
                Bouton Contour
              </Button>
              <Button variant="ghost" className="text-[#1A1A1A] hover:bg-[#F5F5F5]">
                Bouton Fantôme
              </Button>
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
                <Play className="w-4 h-4 mr-2" />
                Avec Icône
              </Button>
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="mb-16">
          <h3 className="text-3xl font-sans font-bold text-[#1A1A1A] mb-8">Champs de Formulaire</h3>
          <div className="bg-white p-12 rounded-3xl border border-[#E5E5E5] shadow-lg">
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
              <div>
                <label className="block text-sm font-mono font-medium text-[#1A1A1A] mb-2">Saisie de Texte</label>
                <Input placeholder="Entrez votre nom" className="border-[#E5E5E5] focus:border-[#D4AF37]" />
              </div>
              <div>
                <label className="block text-sm font-mono font-medium text-[#1A1A1A] mb-2">Saisie Email</label>
                <Input type="email" placeholder="votre@email.com" className="border-[#E5E5E5] focus:border-[#D4AF37]" />
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-16">
          <h3 className="text-3xl font-sans font-bold text-[#1A1A1A] mb-8">Cartes</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border-[#E5E5E5] hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-sans font-bold text-xl">01</span>
              </div>
              <h4 className="text-xl font-sans font-bold text-[#1A1A1A] mb-2">Titre de Carte</h4>
              <p className="text-[#737373] font-mono">Description de la carte avec texte et détails à l'appui.</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-[#D4AF37] to-[#E8C966] text-white hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-sans font-bold text-xl">02</span>
              </div>
              <h4 className="text-xl font-sans font-bold mb-2">Carte Accent</h4>
              <p className="text-white/90 font-mono">Carte avec arrière-plan dégradé pour l'emphase.</p>
            </Card>

            <Card className="p-6 bg-[#1A1A1A] text-white hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center mb-4">
                <span className="text-[#1A1A1A] font-sans font-bold text-xl">03</span>
              </div>
              <h4 className="text-xl font-sans font-bold mb-2">Carte Sombre</h4>
              <p className="text-white/80 font-mono">Carte avec arrière-plan sombre et accent doré.</p>
            </Card>
          </div>
        </div>

        {/* Navigation Bar */}
        <div>
          <h3 className="text-3xl font-sans font-bold text-[#1A1A1A] mb-8">Barre de Navigation</h3>
          <div className="bg-white p-6 rounded-3xl border border-[#E5E5E5] shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                  <span className="text-white font-sans font-bold text-xl">FFA</span>
                </div>
                <div>
                  <div className="font-sans font-bold text-lg text-[#1A1A1A]">Farafina Foot Academy</div>
                  <div className="text-xs text-[#737373]">Cayar, Sénégal</div>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <span className="text-sm font-mono text-[#1A1A1A]">À Propos</span>
                <span className="text-sm font-mono text-[#1A1A1A]">Programmes</span>
                <span className="text-sm font-mono text-[#1A1A1A]">Contact</span>
                <Link href="/apply">
                  <Button size="sm" className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
                    Postuler Maintenant
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
