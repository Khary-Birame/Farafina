import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FacilityDetail } from "@/components/visite-ffa/facility-detail"
import { notFound } from "next/navigation"
import { RevealScript } from "@/components/reveal-script"
import type { Metadata } from "next"
import { ProtectedServerContent } from "@/components/auth/protected-server-content"

// Définition des facilities avec leurs détails
const facilities = [
  {
    slug: "infrastructures-sportives",
    key: "sport",
    icon: "Dumbbell",
    title: "Infrastructures Sportives",
    description: "Terrains de football professionnels, salle de musculation, piste d'athlétisme et équipements de récupération.",
    image: "/african-football-academy-elite-training.jpg",
    content: {
      overview: "Nos infrastructures sportives de pointe offrent un environnement optimal pour le développement des talents. Chaque installation est conçue pour répondre aux standards internationaux.",
      highlights: [
        "Terrains de football professionnels avec gazon naturel et synthétique",
        "Salle de musculation équipée des derniers équipements",
        "Piste d'athlétisme aux normes internationales",
        "Salles de récupération avec équipements de cryothérapie",
        "Système d'éclairage professionnel pour les entraînements du soir"
      ],
      details: "Nos terrains de football respectent les normes FIFA avec des dimensions standard et un système de drainage optimal. La salle de musculation est équipée de machines modernes permettant un entraînement complet et sécurisé. La piste d'athlétisme permet aux athlètes de travailler leur vitesse et leur endurance dans les meilleures conditions."
    }
  },
  {
    slug: "internat",
    key: "internat",
    icon: "Home",
    title: "Internat",
    description: "Chambres modernes, espaces de vie communs et environnement sécurisé pour nos résidents.",
    image: "/student-residence-dormitory.jpg",
    content: {
      overview: "L'internat de Farafina Foot Academy offre un cadre de vie exceptionnel qui allie confort, sécurité et convivialité. Un environnement propice au développement personnel et académique.",
      highlights: [
        "Chambres modernes et spacieuses avec climatisation",
        "Espaces de vie communs pour la détente et les loisirs",
        "Environnement sécurisé 24/7 avec surveillance continue",
        "Accès Wi-Fi haut débit dans toutes les chambres",
        "Services de restauration de qualité"
      ],
      details: "Nos chambres sont conçues pour offrir confort et intimité, tout en favorisant la cohésion entre les résidents. Chaque chambre dispose d'espaces de rangement optimisés et d'un mobilier ergonomique. Les espaces communs permettent aux élèves de se détendre, étudier ensemble et créer des liens durables."
    }
  },
  {
    slug: "salles-etude",
    key: "study",
    icon: "BookOpen",
    title: "Salles d'Étude",
    description: "Espaces dédiés au travail scolaire avec un environnement calme et propice à la concentration.",
    image: "/african-students-studying-in-modern-classroom.jpg",
    content: {
      overview: "Nos salles d'étude offrent un environnement optimal pour l'apprentissage et la réussite académique. Des espaces calmes, bien équipés et propices à la concentration.",
      highlights: [
        "Salles spacieuses et bien éclairées",
        "Équipements informatiques modernes",
        "Bibliothèque avec ressources pédagogiques",
        "Salles de groupe pour le travail collaboratif",
        "Accompagnement personnalisé par des tuteurs"
      ],
      details: "Chaque salle d'étude est équipée de tables ergonomiques et de chaises confortables. L'éclairage naturel et artificiel est optimisé pour réduire la fatigue oculaire. Notre bibliothèque contient des ouvrages de référence et des ressources pédagogiques adaptées à tous les niveaux. Les tuteurs sont disponibles pour accompagner les élèves dans leur parcours académique."
    }
  },
  {
    slug: "terrains-gymnases",
    key: "gym",
    icon: "Dumbbell",
    title: "Terrains & Gymnases",
    description: "Installations sportives couvertes et extérieures pour tous types d'entraînements.",
    image: "/african-football-academy-elite-training.jpg",
    content: {
      overview: "Nos terrains et gymnases offrent une variété d'espaces pour tous types d'entraînements, quelles que soient les conditions météorologiques. Des installations modernes et polyvalentes.",
      highlights: [
        "Gymnase couvert avec terrain de basket/futsal",
        "Terrains extérieurs avec gazon naturel et synthétique",
        "Salles polyvalentes pour l'entraînement fonctionnel",
        "Équipements adaptables pour différents sports",
        "Système de gestion des créneaux optimisé"
      ],
      details: "Le gymnase couvert permet de continuer les entraînements même en cas de mauvais temps. Il est équipé pour accueillir différents sports collectifs et individuels. Les terrains extérieurs sont régulièrement entretenus pour garantir une surface de jeu optimale. Notre système de réservation permet une utilisation efficace des installations par tous les groupes d'entraînement."
    }
  },
  {
    slug: "espaces-vie",
    key: "life",
    icon: "Users",
    title: "Espaces de Vie",
    description: "Zones de détente, réfectoire moderne et espaces conviviaux pour les moments de partage.",
    image: "/african-students-studying-in-modern-classroom.jpg",
    content: {
      overview: "Les espaces de vie sont le cœur battant de notre académie. Des lieux où les élèves se retrouvent, partagent et construisent une communauté solide dans un cadre moderne et accueillant.",
      highlights: [
        "Réfectoire moderne avec menu équilibré et varié",
        "Salles de détente avec jeux et activités",
        "Espaces extérieurs aménagés pour le repos",
        "Cafétéria avec boissons chaudes et snacks",
        "Salles de réunion pour les activités de groupe"
      ],
      details: "Notre réfectoire propose des repas équilibrés préparés par des chefs nutritionnistes qui tiennent compte des besoins spécifiques des sportifs. Les espaces de détente permettent aux élèves de se relaxer entre les cours et les entraînements. Les espaces extérieurs offrent des zones ombragées pour les pauses et les moments de détente en plein air."
    }
  },
  {
    slug: "encadrement",
    key: "support",
    icon: "Shield",
    title: "Encadrement",
    description: "Rencontrez notre équipe d'éducateurs, entraîneurs et personnel médical.",
    image: "/student-residence-dormitory.jpg",
    content: {
      overview: "Notre équipe pluridisciplinaire d'encadrement est dédiée à l'épanouissement complet de chaque élève. Un accompagnement personnalisé dans tous les aspects de leur développement.",
      highlights: [
        "Équipe d'entraîneurs professionnels certifiés",
        "Éducateurs spécialisés dans le suivi scolaire",
        "Personnel médical et kinésithérapeutes",
        "Conseillers d'orientation et psychologues",
        "Mentors et accompagnateurs personnalisés"
      ],
      details: "Chaque membre de notre équipe est sélectionné pour son expertise et sa passion pour le développement des jeunes. Nos entraîneurs possèdent des certifications internationales et une expérience approfondie. L'équipe médicale assure un suivi régulier de la santé et de la condition physique. Les éducateurs travaillent en étroite collaboration avec les familles pour assurer un suivi optimal du développement académique et personnel."
    }
  }
]

const getFacilityBySlug = async (slug: string) => {
  return facilities.find(f => f.slug === slug)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const facility = await getFacilityBySlug(slug)

  if (!facility) {
    return {
      title: "Facilité non trouvée | Farafina Foot Academy",
    }
  }

  return {
    title: `${facility.title} | Visite FFA | Farafina Foot Academy`,
    description: facility.description,
    keywords: `visite académie, ${facility.title.toLowerCase()}, farafina, football academy, infrastructures`,
    openGraph: {
      title: `${facility.title} | Farafina Foot Academy`,
      description: facility.description,
      type: "website",
    },
  }
}

export const dynamic = 'force-dynamic'

export default async function FacilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const facility = await getFacilityBySlug(slug)

  if (!facility) {
    notFound()
  }

  return (
    <ProtectedServerContent>
      <div className="min-h-screen bg-white">
        <Header variant="solid" />
        <main>
          <FacilityDetail facility={facility} />
        </main>
        <Footer />
        <RevealScript />
      </div>
    </ProtectedServerContent>
  )
}

