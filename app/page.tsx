import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StatCard } from "@/components/stat-card"
import { ProgramCard } from "@/components/program-card"
import { Button } from "@/components/ui/button"
import { Trophy, GraduationCap, Users, Globe, Play, ArrowRight, Target, Award, BookOpen, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f29200]/5 via-transparent to-[#D4AF37]/5" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-[#f29200]/10 text-[#f29200] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles size={16} />
                <span>Institution Sport-Études d'Élite</span>
              </div>
              <h1 className="font-sans font-bold text-5xl lg:text-7xl text-[#2E2E2E] mb-6 leading-tight text-balance">
                L'avenir du football africain <span className="text-[#f29200]">commence ici</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty">
                Farafina Foot Academy combine un entraînement de football de classe mondiale avec l'excellence
                académique à Cayar, Sénégal. Nous découvrons, développons et promouvons la prochaine génération de stars
                du football africain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#f29200] hover:bg-[#d97f00] text-white text-base h-12 px-8">
                  Postuler maintenant
                  <ArrowRight size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-base h-12 px-8 group bg-transparent">
                  <Play size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                  Voir notre histoire
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f29200] to-[#d97f00] rounded-3xl transform rotate-3" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/african-youth-football-training-action-shot.jpg"
                  alt="FFA Training"
                  className="w-full h-auto"
                />
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#f29200] rounded-xl flex items-center justify-center">
                    <Trophy size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-sans font-bold text-2xl text-[#2E2E2E]">500+</div>
                    <div className="text-xs text-muted-foreground">Joueurs formés</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard value="500+" label="Jeunes athlètes" icon={<Users size={24} />} />
            <StatCard value="98%" label="Taux de réussite académique" icon={<GraduationCap size={24} />} />
            <StatCard value="15+" label="Clubs partenaires" icon={<Trophy size={24} />} />
            <StatCard value="12" label="Pays africains" icon={<Globe size={24} />} />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-sans font-bold text-4xl lg:text-5xl text-[#2E2E2E] mb-6 text-balance">
              Une vision panafricaine pour <span className="text-[#f29200]">l'excellence</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Soutenu par Farafina Group et le PDG Abdoulaye Galaye C. Diallo, nous construisons la destination de
              référence pour le développement des talents du football africain — où la performance sportive rencontre la
              réussite académique.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-border hover:border-[#f29200] transition-all hover:shadow-lg group">
              <div className="w-14 h-14 bg-[#f29200]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#f29200] transition-colors">
                <Target size={28} className="text-[#f29200] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-sans font-bold text-xl text-[#2E2E2E] mb-4">Formation d'élite</h3>
              <p className="text-muted-foreground leading-relaxed">
                Personnel d'entraîneurs de classe mondiale et installations de pointe conçues pour développer des
                champions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-border hover:border-[#f29200] transition-all hover:shadow-lg group">
              <div className="w-14 h-14 bg-[#f29200]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#f29200] transition-colors">
                <BookOpen size={28} className="text-[#f29200] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-sans font-bold text-xl text-[#2E2E2E] mb-4">Excellence académique</h3>
              <p className="text-muted-foreground leading-relaxed">
                Programmes éducatifs complets garantissant que nos athlètes excellent sur et en dehors du terrain.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-border hover:border-[#f29200] transition-all hover:shadow-lg group">
              <div className="w-14 h-14 bg-[#f29200]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#f29200] transition-colors">
                <Award size={28} className="text-[#f29200] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-sans font-bold text-xl text-[#2E2E2E] mb-4">Parcours internationaux</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connexions directes avec des clubs professionnels et des opportunités internationales à travers le
                monde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="font-sans font-bold text-4xl lg:text-5xl text-[#2E2E2E] mb-6 text-balance">
              Nos programmes
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Programmes de formation et d'éducation complets conçus pour développer des athlètes et des érudits
              complets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProgramCard
              title="Programme de développement jeunes"
              description="Âges 12-16. Formation de base combinant compétences techniques, conscience tactique et études académiques."
              image="/young-african-football-players-training.jpg"
              category="Sport"
            />
            <ProgramCard
              title="Parcours performance élite"
              description="Âges 16-19. Formation avancée pour les athlètes à haut potentiel avec exposition aux clubs professionnels."
              image="/african-football-academy-elite-training.jpg"
              category="Sport"
            />
            <ProgramCard
              title="Excellence académique"
              description="Programme complet aligné sur les normes internationales, préparant les étudiants à l'université et au-delà."
              image="/african-students-studying-in-modern-classroom.jpg"
              category="Éducation"
            />
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="text-base h-12 px-8 bg-transparent">
              Voir tous les programmes
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f29200] to-[#d97f00]" />
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-sans font-bold text-4xl lg:text-5xl text-white mb-6 text-balance">
              Prêt à rejoindre Farafina Foot Academy ?
            </h2>
            <p className="text-lg text-white/90 leading-relaxed mb-8 text-pretty">
              Rejoignez des centaines de jeunes athlètes qui transforment leurs rêves en réalité à Farafina Foot
              Academy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#f29200] hover:bg-gray-100 text-base h-12 px-8">
                Postuler maintenant
                <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-base h-12 px-8 bg-transparent"
              >
                Planifier une visite
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
