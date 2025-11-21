import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsHero } from "@/components/news/news-hero"
import { NewsGrid } from "@/components/news/news-grid"
import { NewsCTA } from "@/components/news/news-cta"
import type { Metadata } from "next"

const newsArticles = [
  {
    id: 1,
    title: "Farafina Foot Academy lance un nouveau programme de développement des talents",
    excerpt:
      "Nous sommes ravis d'annoncer le lancement de notre nouveau programme de développement des talents conçu pour identifier et développer les jeunes joueurs prometteurs à travers l'Afrique.",
    date: "15 Janvier 2025",
    author: "Équipe FFA",
    category: "Programmes",
    image: "/african-youth-football-training-action-shot.jpg",
    featured: true,
    readTime: 5,
    views: 1250,
  },
  {
    id: 2,
    title: "Partenariat stratégique avec des clubs européens majeurs",
    excerpt:
      "Farafina Foot Academy a signé des accords de partenariat avec plusieurs clubs européens de premier plan, offrant ainsi des opportunités de transfert direct à nos étudiants.",
    date: "10 Janvier 2025",
    author: "Équipe FFA",
    category: "Partenariats",
    image: "/african-football-academy-elite-training.jpg",
    featured: true,
    readTime: 4,
    views: 980,
  },
  {
    id: 3,
    title: "Cérémonie de remise des diplômes 2024 - Félicitations aux diplômés !",
    excerpt:
      "Nous célébrons la réussite de nos étudiants de la promotion 2024. Plusieurs d'entre eux ont déjà signé avec des clubs professionnels et poursuivent des études supérieures.",
    date: "5 Janvier 2025",
    author: "Équipe FFA",
    category: "Événements",
    image: "/young-african-football-players-training.jpg",
    featured: false,
    readTime: 6,
    views: 750,
  },
  {
    id: 4,
    title: "Programme de bourses d'études 2025/2026 maintenant ouvert",
    excerpt:
      "Les candidatures pour notre programme de bourses d'études pour l'année académique 2025/2026 sont maintenant ouvertes. Jusqu'à 60% de nos étudiants bénéficient d'une aide financière.",
    date: "1 Janvier 2025",
    author: "Équipe FFA",
    category: "Bourses",
    image: "/african-students-studying-in-modern-classroom.jpg",
    featured: false,
    readTime: 3,
    views: 1200,
  },
  {
    id: 5,
    title: "Installation de nouvelles installations d'entraînement de classe mondiale",
    excerpt:
      "Nous avons récemment inauguré de nouvelles installations d'entraînement, incluant un terrain synthétique dernier cri et un laboratoire d'analyse vidéo avancé.",
    date: "28 Décembre 2024",
    author: "Équipe FFA",
    category: "Infrastructure",
    image: "/african-football-academy-elite-training.jpg",
    featured: false,
    readTime: 5,
    views: 890,
  },
  {
    id: 6,
    title: "Succès de nos équipes dans les compétitions régionales",
    excerpt:
      "Nos équipes U17 et U19 ont remporté plusieurs titres lors des compétitions régionales, démontrant l'excellence de notre programme d'entraînement.",
    date: "20 Décembre 2024",
    author: "Équipe FFA",
    category: "Compétitions",
    image: "/african-youth-football-training-action-shot.jpg",
    featured: false,
    readTime: 4,
    views: 650,
  },
  {
    id: 7,
    title: "Interview exclusive avec notre Directeur Technique",
    excerpt:
      "Découvrez l'interview exclusive de notre Directeur Technique qui partage sa vision pour l'avenir du football africain et les projets de l'académie.",
    date: "15 Décembre 2024",
    author: "Équipe FFA",
    category: "Interview",
    image: "/african-technical-director-portrait.jpg",
    featured: false,
    readTime: 8,
    views: 1100,
  },
  {
    id: 8,
    title: "Communiqué officiel : Nouvelle saison 2025",
    excerpt:
      "L'académie Farafina annonce officiellement le début de la nouvelle saison 2025 avec de nombreux projets et ambitions pour nos jeunes talents.",
    date: "12 Décembre 2024",
    author: "Équipe FFA",
    category: "Officiel",
    image: "/african-football-academy-elite-training.jpg",
    featured: false,
    readTime: 3,
    views: 1450,
  },
]

export const metadata: Metadata = {
  title: "Actualités | Académie Farafina",
  description: "Restez informé des dernières actualités, événements et développements à Farafina Foot Academy.",
  keywords: "actualités, nouvelles, football, académie, farafina, événements",
  openGraph: {
    title: "Actualités | Académie Farafina",
    description: "Découvrez toutes les actualités de l'académie Farafina",
    type: "website",
  },
}

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="solid" />
      <main>
        <NewsHero />
        <NewsGrid articles={newsArticles} />
        <NewsCTA />
      </main>
      <Footer />
    </div>
  )
}
