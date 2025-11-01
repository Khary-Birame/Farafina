import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Calendar, User, ArrowRight, Newspaper } from "lucide-react"
import Link from "next/link"

const newsArticles = [
  {
    id: 1,
    title: "Farafina Foot Academy lance un nouveau programme de développement des talents",
    excerpt:
      "Nous sommes ravis d'annoncer le lancement de notre nouveau programme de développement des talents conçu pour identifier et développer les jeunes joueurs prometteurs à travers l'Afrique.",
    date: "15 Janvier 2025",
    author: "Équipe FFA",
    category: "Programmes",
    image: "/news/talent-development.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Partenariat stratégique avec des clubs européens majeurs",
    excerpt:
      "Farafina Foot Academy a signé des accords de partenariat avec plusieurs clubs européens de premier plan, offrant ainsi des opportunités de transfert direct à nos étudiants.",
    date: "10 Janvier 2025",
    author: "Équipe FFA",
    category: "Partenariats",
    image: "/news/european-partnership.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "Cérémonie de remise des diplômes 2024 - Félicitations aux diplômés !",
    excerpt:
      "Nous célébrons la réussite de nos étudiants de la promotion 2024. Plusieurs d'entre eux ont déjà signé avec des clubs professionnels et poursuivent des études supérieures.",
    date: "5 Janvier 2025",
    author: "Équipe FFA",
    category: "Événements",
    image: "/news/graduation-2024.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Programme de bourses d'études 2025/2026 maintenant ouvert",
    excerpt:
      "Les candidatures pour notre programme de bourses d'études pour l'année académique 2025/2026 sont maintenant ouvertes. Jusqu'à 60% de nos étudiants bénéficient d'une aide financière.",
    date: "1 Janvier 2025",
    author: "Équipe FFA",
    category: "Bourses",
    image: "/news/scholarships-2025.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Installation de nouvelles installations d'entraînement de classe mondiale",
    excerpt:
      "Nous avons récemment inauguré de nouvelles installations d'entraînement, incluant un terrain synthétique dernier cri et un laboratoire d'analyse vidéo avancé.",
    date: "28 Décembre 2024",
    author: "Équipe FFA",
    category: "Infrastructure",
    image: "/news/new-facilities.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "Succès de nos équipes dans les compétitions régionales",
    excerpt:
      "Nos équipes U17 et U19 ont remporté plusieurs titres lors des compétitions régionales, démontrant l'excellence de notre programme d'entraînement.",
    date: "20 Décembre 2024",
    author: "Équipe FFA",
    category: "Compétitions",
    image: "/news/regional-competitions.jpg",
    featured: false,
  },
]

export default function NewsPage() {
  const featuredNews = newsArticles.filter((article) => article.featured)
  const regularNews = newsArticles.filter((article) => !article.featured)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#f29200] to-[#d17e00] text-white py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Newspaper className="w-4 h-4 text-white" />
                <span className="text-sm font-medium">Actualités et Nouvelles</span>
              </div>

              <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
                Actualités & Nouvelles
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
                Restez informé des dernières actualités, événements et développements à Farafina Foot Academy.
              </p>
            </div>
          </div>
        </section>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
              <h2 className="font-sans font-bold text-3xl md:text-4xl mb-8 text-[#2E2E2E]">Actualités en Vedette</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredNews.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="h-48 bg-gradient-to-br from-[#f29200] to-[#d17e00] flex items-center justify-center">
                      <Newspaper className="w-16 h-16 text-white/50" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {article.date}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {article.author}
                        </span>
                      </div>
                      <span className="inline-block px-3 py-1 bg-[#f29200]/10 text-[#f29200] rounded-full text-xs font-semibold mb-3">
                        {article.category}
                      </span>
                      <h3 className="font-sans font-bold text-xl text-[#2E2E2E] mb-3">{article.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{article.excerpt}</p>
                      <Link
                        href="#"
                        className="inline-flex items-center gap-2 text-[#f29200] hover:text-[#d17e00] font-semibold text-sm"
                      >
                        Lire la suite
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular News */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-sans font-bold text-3xl md:text-4xl mb-8 text-[#2E2E2E]">Toutes les Actualités</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularNews.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-40 bg-gradient-to-br from-[#f29200]/20 to-[#d17e00]/20 flex items-center justify-center">
                    <Newspaper className="w-12 h-12 text-[#f29200]/30" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.author}</span>
                    </div>
                    <span className="inline-block px-2 py-1 bg-[#f29200]/10 text-[#f29200] rounded-full text-xs font-semibold mb-2">
                      {article.category}
                    </span>
                    <h3 className="font-sans font-bold text-lg text-[#2E2E2E] mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3 leading-relaxed">{article.excerpt}</p>
                    <Link
                      href="#"
                      className="inline-flex items-center gap-1 text-[#f29200] hover:text-[#d17e00] font-semibold text-sm"
                    >
                      Lire la suite
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#f29200] to-[#d17e00] rounded-2xl p-12 text-white">
              <h2 className="font-sans font-bold text-3xl md:text-4xl mb-4">Restez Informé</h2>
              <p className="text-lg text-white/90 mb-8">
                Abonnez-vous à notre newsletter pour recevoir les dernières actualités et événements directement dans votre boîte de réception.
              </p>
              <Link href="/contact">
                <button className="bg-white text-[#f29200] hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors">
                  S'abonner à la Newsletter
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

