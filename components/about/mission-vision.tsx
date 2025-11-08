import { Target, Eye, Heart, Award } from "lucide-react"

export function MissionVision() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Vision */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#D4AF37] rounded-xl flex items-center justify-center flex-shrink-0">
                <Eye className="text-white" size={28} />
              </div>
              <h2 className="font-sans font-bold text-3xl md:text-4xl text-[#1A1A1A]">Notre Vision</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Devenir la <span className="font-semibold text-[#D4AF37]">référence de l'Afrique</span> en éducation sport-études,
              produisant des athlètes de classe mondiale qui excellent à la fois sur le terrain et en classe.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              Nous envisageons un avenir où le talent africain est reconnu mondialement, où les jeunes joueurs ont accès à
              des installations d'entraînement de classe mondiale, et où l'éducation et le sport travaillent main dans la main pour créer des
              individus complets prêts à concourir aux plus hauts niveaux.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-lg">
                <Award className="text-[#D4AF37]" size={18} />
                <span className="text-sm font-medium text-[#1A1A1A]">Excellence</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-lg">
                <Target className="text-[#D4AF37]" size={18} />
                <span className="text-sm font-medium text-[#1A1A1A]">Innovation</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-lg">
                <Heart className="text-[#D4AF37]" size={18} />
                <span className="text-sm font-medium text-[#1A1A1A]">Intégrité</span>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#D4AF37] rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="text-white" size={28} />
              </div>
              <h2 className="font-sans font-bold text-3xl md:text-4xl text-[#1A1A1A]">Notre Mission</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Découvrir, former et autonomiser les jeunes talents africains grâce à{" "}
              <span className="font-semibold text-[#D4AF37]">l'innovation, l'éducation et l'intégrité</span>.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0" />
                <p className="text-base text-gray-600 leading-relaxed">
                  <span className="font-semibold text-[#1A1A1A]">Découvrir :</span> Identifier les jeunes talents prometteurs à travers
                  l'Afrique en utilisant une technologie de détection IA de pointe et des réseaux de recrutement traditionnels.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0" />
                <p className="text-base text-gray-600 leading-relaxed">
                  <span className="font-semibold text-[#1A1A1A]">Former :</span> Fournir un encadrement de classe mondiale, des installations modernes
                  et une éducation académique complète pour développer des athlètes complets.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0" />
                <p className="text-base text-gray-600 leading-relaxed">
                  <span className="font-semibold text-[#1A1A1A]">Autonomiser :</span> Équiper nos étudiants de compétences de vie,
                  de valeurs et d'opportunités pour réussir professionnellement et personnellement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
