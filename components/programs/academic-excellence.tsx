import { BookOpen, Globe, Laptop, Users } from "lucide-react"

export function AcademicExcellence() {
  return (
    <section className="py-20 lg:py-32 bg-[#1A1A1A]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src="/modern-classroom-african-students.jpg" alt="Modern classroom" className="w-full h-auto" />
            </div>
            {/* Floating Stats */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-6">
              <div className="text-[#1A1A1A]">
                <div className="font-sans font-bold text-3xl mb-1 text-[#D4AF37]">98%</div>
                <div className="text-sm text-muted-foreground">Taux de Réussite Académique</div>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="order-1 lg:order-2">
            <h2 className="font-sans font-bold text-4xl lg:text-5xl text-white mb-6 text-balance">
              Excellence <span className="text-[#D4AF37]">Académique</span>
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              L'éducation est au cœur de notre mission. Nous offrons un programme complet qui prépare nos étudiants au
              succès au-delà du football, en veillant à ce qu'ils aient les connaissances et les compétences nécessaires
              pour réussir dans n'importe quel domaine.
            </p>

            {/* Key Features */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen size={24} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Salles de Classe Modernes</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Environnements d'apprentissage de pointe équipés des dernières technologies éducatives
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe size={24} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Éducation Bilingue (Français/Anglais)</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    La maîtrise des deux langues ouvre les portes aux opportunités internationales
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Laptop size={24} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Littératie Numérique et Leadership</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Compétences technologiques et développement du leadership pour le monde moderne
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users size={24} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Développement Personnel et Éthique</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Formation du caractère et éducation aux valeurs pour développer des individus complets
                  </p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="border-l-4 border-[#D4AF37] pl-6 py-2">
              <p className="text-lg font-medium text-white italic mb-2">
                "La discipline forme le talent, et le respect construit les champions."
              </p>
              <p className="text-sm text-white/60">— Philosophie de Farafina Foot Academy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
