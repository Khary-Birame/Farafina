import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsDetails } from "@/components/news/news-details"
import { notFound } from "next/navigation"
import { generateSlug } from "@/lib/utils"

// Mock data - À remplacer par une vraie source de données
const getArticleBySlug = async (slug: string) => {
  const articles = [
    {
      id: 1,
      slug: generateSlug("Farafina Foot Academy lance un nouveau programme de développement des talents"),
      title: "Farafina Foot Academy lance un nouveau programme de développement des talents",
      excerpt: "Nous sommes ravis d'annoncer le lancement de notre nouveau programme de développement des talents conçu pour identifier et développer les jeunes joueurs prometteurs à travers l'Afrique.",
      content: `
        <p>Nous sommes fiers d'annoncer le lancement d'un programme révolutionnaire de développement des talents à la Farafina Foot Academy. Ce programme innovant a été conçu pour identifier, développer et promouvoir les jeunes joueurs les plus prometteurs à travers l'Afrique.</p>
        
        <h2>Objectifs du Programme</h2>
        <p>Ce nouveau programme vise à :</p>
        <ul>
          <li>Identifier les talents émergents dès le plus jeune âge</li>
          <li>Fournir un encadrement professionnel de haut niveau</li>
          <li>Développer les compétences techniques, tactiques et physiques</li>
          <li>Préparer les joueurs aux compétitions internationales</li>
          <li>Faciliter l'accès aux clubs professionnels</li>
        </ul>
        
        <h2>Structure du Programme</h2>
        <p>Le programme est structuré en plusieurs phases :</p>
        <ol>
          <li><strong>Phase d'Identification</strong> : Détection des talents à travers des journées de sélection</li>
          <li><strong>Phase de Développement</strong> : Entraînement intensif et personnalisé</li>
          <li><strong>Phase d'Intégration</strong> : Intégration dans les équipes compétitives</li>
          <li><strong>Phase de Promotion</strong> : Mise en relation avec les clubs professionnels</li>
        </ol>
        
        <h2>Impact Attendu</h2>
        <p>Nous espérons que ce programme contribuera significativement au développement du football africain en formant la prochaine génération de stars internationales.</p>
      `,
      date: "15 Janvier 2025",
      author: "Équipe FFA",
      category: "Programmes",
      image: "/african-youth-football-training-action-shot.jpg",
      images: [
        "/african-youth-football-training-action-shot.jpg",
        "/african-football-academy-elite-training.jpg",
        "/young-african-football-players-training.jpg",
      ],
      featured: true,
      readTime: 5,
      views: 1250,
    },
    {
      id: 2,
      slug: generateSlug("Partenariat stratégique avec des clubs européens majeurs"),
      title: "Partenariat stratégique avec des clubs européens majeurs",
      excerpt: "Farafina Foot Academy a signé des accords de partenariat avec plusieurs clubs européens de premier plan, offrant ainsi des opportunités de transfert direct à nos étudiants.",
      content: `
        <p>Farafina Foot Academy est fière d'annoncer la signature d'accords de partenariat stratégiques avec plusieurs clubs européens de premier plan. Ces partenariats ouvrent de nouvelles perspectives pour nos étudiants.</p>
        
        <h2>Clubs Partenaires</h2>
        <p>Nous avons établi des relations privilégiées avec :</p>
        <ul>
          <li>Clubs de Ligue 1 française</li>
          <li>Clubs de Premier League anglaise</li>
          <li>Clubs de La Liga espagnole</li>
          <li>Clubs de Serie A italienne</li>
        </ul>
        
        <h2>Bénéfices pour nos Étudiants</h2>
        <p>Ces partenariats offrent :</p>
        <ul>
          <li>Opportunités de transfert direct</li>
          <li>Stages d'entraînement dans les clubs partenaires</li>
          <li>Suivi personnalisé par des scouts professionnels</li>
          <li>Accès aux académies d'excellence européennes</li>
        </ul>
      `,
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
      slug: generateSlug("Cérémonie de remise des diplômes 2024 - Félicitations aux diplômés !"),
      title: "Cérémonie de remise des diplômes 2024 - Félicitations aux diplômés !",
      excerpt: "Nous célébrons la réussite de nos étudiants de la promotion 2024. Plusieurs d'entre eux ont déjà signé avec des clubs professionnels et poursuivent des études supérieures.",
      content: `
        <p>Nous sommes fiers de célébrer la réussite exceptionnelle de nos étudiants de la promotion 2024. Cette cérémonie marque un moment important dans leur parcours académique et sportif.</p>
        <h2>Résultats Exceptionnels</h2>
        <p>Plusieurs de nos diplômés ont déjà signé des contrats professionnels avec des clubs de renom, tandis que d'autres poursuivent brillamment leurs études supérieures.</p>
      `,
      date: "5 Janvier 2025",
      author: "Équipe FFA",
      category: "Événements",
      image: "/young-african-football-players-training.jpg",
      readTime: 6,
      views: 750,
    },
    {
      id: 4,
      slug: generateSlug("Programme de bourses d'études 2025/2026 maintenant ouvert"),
      title: "Programme de bourses d'études 2025/2026 maintenant ouvert",
      excerpt: "Les candidatures pour notre programme de bourses d'études pour l'année académique 2025/2026 sont maintenant ouvertes. Jusqu'à 60% de nos étudiants bénéficient d'une aide financière.",
      content: `
        <p>Nous sommes heureux d'annoncer l'ouverture des candidatures pour notre programme de bourses d'études pour l'année académique 2025/2026.</p>
        <h2>Critères d'Éligibilité</h2>
        <p>Les candidats doivent répondre à plusieurs critères incluant le mérite académique, le talent sportif et les besoins financiers.</p>
      `,
      date: "1 Janvier 2025",
      author: "Équipe FFA",
      category: "Bourses",
      image: "/african-students-studying-in-modern-classroom.jpg",
      readTime: 3,
      views: 1200,
    },
    {
      id: 5,
      slug: generateSlug("Installation de nouvelles installations d'entraînement de classe mondiale"),
      title: "Installation de nouvelles installations d'entraînement de classe mondiale",
      excerpt: "Nous avons récemment inauguré de nouvelles installations d'entraînement, incluant un terrain synthétique dernier cri et un laboratoire d'analyse vidéo avancé.",
      content: `
        <p>L'académie a récemment inauguré de nouvelles installations de classe mondiale pour améliorer l'expérience d'entraînement de nos étudiants.</p>
        <h2>Nouvelles Installations</h2>
        <ul>
          <li>Terrain synthétique dernier cri</li>
          <li>Laboratoire d'analyse vidéo avancé</li>
          <li>Centre de performance physique</li>
        </ul>
      `,
      date: "28 Décembre 2024",
      author: "Équipe FFA",
      category: "Infrastructure",
      image: "/african-football-academy-elite-training.jpg",
      readTime: 5,
      views: 890,
    },
    {
      id: 6,
      slug: generateSlug("Succès de nos équipes dans les compétitions régionales"),
      title: "Succès de nos équipes dans les compétitions régionales",
      excerpt: "Nos équipes U17 et U19 ont remporté plusieurs titres lors des compétitions régionales, démontrant l'excellence de notre programme d'entraînement.",
      content: `
        <p>Nos équipes U17 et U19 ont brillamment représenté l'académie lors des compétitions régionales, remportant plusieurs titres prestigieux.</p>
        <h2>Résultats</h2>
        <p>Ces succès démontrent l'excellence de notre programme d'entraînement et la qualité de nos jeunes talents.</p>
      `,
      date: "20 Décembre 2024",
      author: "Équipe FFA",
      category: "Compétitions",
      image: "/african-youth-football-training-action-shot.jpg",
      readTime: 4,
      views: 650,
    },
  ]

  return articles.find(a => a.slug === slug) || null
}

export const dynamic = 'force-dynamic'

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header variant="solid" />
      <main className="pt-20">
        <NewsDetails article={article} />
      </main>
      <Footer />
    </div>
  )
}

