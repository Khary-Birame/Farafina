import { Button } from "@/components/ui/button"
import { Heart, Users, Award, TrendingUp } from "lucide-react"
import Link from "next/link"

const scholarshipTypes = [
  {
    icon: Award,
    title: "Bourses au mérite",
    description: "Pour les talents exceptionnels et les performances académiques",
    coverage: "Jusqu'à 100%",
  },
  {
    icon: Heart,
    title: "Aide financière",
    description: "Assistance financière pour les étudiants méritants",
    coverage: "Jusqu'à 75%",
  },
  {
    icon: Users,
    title: "Impact communautaire",
    description: "Pour les étudiants issus de communautés défavorisées",
    coverage: "Jusqu'à 50%",
  },
  {
    icon: TrendingUp,
    title: "Autonomisation des filles",
    description: "Financement spécial pour les athlètes féminines",
    coverage: "Jusqu'à 60%",
  },
]

export function ScholarshipSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f29200]/10 px-4 py-2 rounded-full mb-4">
              <Heart className="w-4 h-4 text-[#f29200]" />
              <span className="text-sm font-semibold text-[#f29200]">Inclusion sociale et opportunités</span>
            </div>
            <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-balance">
              Bourses et aide financière
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed max-w-2xl mx-auto">
              À la Farafina Foot Academy, le talent ne devrait jamais être limité par les circonstances financières.
              Nous nous engageons à rendre l'excellence accessible à tous.
            </p>
          </div>

          {/* Scholarship Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {scholarshipTypes.map((scholarship, index) => {
              const Icon = scholarship.icon
              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:border-[#f29200] hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#f29200]/10 to-[#f29200]/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#f29200] group-hover:to-[#d17e00] transition-transform duration-300">
                    <Icon className="w-7 h-7 text-[#f29200] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-sans font-semibold text-lg mb-2 group-hover:text-[#f29200] transition-colors duration-300">{scholarship.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{scholarship.description}</p>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 px-3 py-2 rounded-full border border-[#D4AF37]/20 group-hover:from-[#D4AF37] group-hover:to-[#B8962E] group-hover:text-white transition-all duration-300">
                    <span className="text-xs font-semibold text-[#D4AF37] group-hover:text-white transition-colors duration-300">Couverture {scholarship.coverage}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Values Statement */}
          <div className="bg-gradient-to-br from-[#f29200] to-[#d17e00] text-white rounded-xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="font-sans font-bold text-2xl md:text-3xl mb-4">Notre engagement envers l'inclusion</h3>
              <p className="text-lg text-white/90 mb-6 leading-relaxed text-pretty">
                Nous croyons que chaque jeune joueur talentueux mérite l'opportunité de développer ses compétences,
                quelle que soit son origine. Notre programme de bourses reflète nos valeurs fondamentales d'équité,
                d'excellence et d'autonomisation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/apply">
                  <Button size="lg" className="bg-white text-[#f29200] hover:bg-gray-100 font-semibold">
                    Demander une bourse
                  </Button>
                </Link>
                <Link href="/admissions#scholarship">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 bg-transparent"
                  >
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#f29200] mb-2">60%</div>
              <div className="text-sm text-muted-foreground">Des étudiants reçoivent une aide financière</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#f29200] mb-2">€500K+</div>
              <div className="text-sm text-muted-foreground">Attribués en bourses annuellement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#f29200] mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Organisations partenaires soutenant l'accès</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
