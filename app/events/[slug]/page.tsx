import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventDetails } from "@/components/events/event-details"
import { notFound } from "next/navigation"
import { generateSlug } from "@/lib/utils"

// Mock data - À remplacer par une vraie source de données
const getEventBySlug = async (slug: string) => {
  // Simuler une récupération d'événement
  const events = [
    {
      id: "1",
      slug: generateSlug("Journée de Détection Nationale"),
      date: "15 Mars 2025",
      title: "Journée de Détection Nationale",
      location: "Stade de Cayar, Sénégal",
      address: "Académie Farafina, Cayar, Sénégal",
      type: "détection" as const,
      description: "Une journée exceptionnelle pour découvrir les talents du football africain. Évaluation complète des compétences techniques, tactiques et physiques.",
      longDescription: `
        <h3>À propos de cette journée</h3>
        <p>La Journée de Détection Nationale est un événement unique qui permet aux jeunes joueurs de démontrer leurs compétences devant nos entraîneurs professionnels. C'est l'opportunité parfaite pour intégrer notre académie d'excellence.</p>
        
        <h3>Programme de la journée</h3>
        <ul>
          <li><strong>09:00 - 09:30</strong> : Accueil et enregistrement</li>
          <li><strong>09:30 - 10:00</strong> : Briefing et présentation de l'académie</li>
          <li><strong>10:00 - 12:00</strong> : Tests techniques individuels</li>
          <li><strong>12:00 - 13:00</strong> : Pause déjeuner</li>
          <li><strong>13:00 - 15:00</strong> : Matchs d'évaluation</li>
          <li><strong>15:00 - 16:00</strong> : Tests physiques</li>
          <li><strong>16:00 - 17:00</strong> : Débriefing et résultats</li>
        </ul>
        
        <h3>Ce que nous évaluons</h3>
        <ul>
          <li>Technique individuelle (passe, contrôle, dribble)</li>
          <li>Vision de jeu et intelligence tactique</li>
          <li>Condition physique et endurance</li>
          <li>Attitude et mentalité</li>
          <li>Potentiel de progression</li>
        </ul>
      `,
      image: "/african-youth-football-training-action-shot.jpg",
      images: [
        "/african-youth-football-training-action-shot.jpg",
        "/african-football-academy-elite-training.jpg",
        "/young-african-football-players-training.jpg",
      ],
      time: "09:00 - 17:00",
      duration: "1 jour",
      price: 0,
      isFree: true,
      participants: 45,
      maxParticipants: 100,
      status: "open" as const,
      isFeatured: true,
      ageRange: "8-18 ans",
      requirements: [
        "Tenue de sport complète",
        "Chaussures de football",
        "Certificat médical (moins de 3 mois)",
        "Autorisation parentale pour les mineurs"
      ],
      provided: [
        "Équipements d'entraînement",
        "Encadrement professionnel",
        "Collation et boissons",
        "Certificat de participation"
      ],
      activities: [
        "Tests techniques individuels",
        "Matchs d'évaluation",
        "Tests physiques",
        "Rencontre avec les entraîneurs",
        "Visite des installations"
      ],
      testimonials: [
        {
          author: "Amadou D.",
          text: "Une expérience incroyable ! Les entraîneurs sont très professionnels et m'ont donné de précieux conseils.",
          rating: 5
        },
        {
          author: "Fatou K.",
          text: "Mon fils a adoré cette journée. L'organisation est parfaite et l'ambiance est excellente.",
          rating: 5
        }
      ]
    },
    {
      id: "2",
      slug: generateSlug("Stage d'Entraînement Intensif"),
      date: "20-25 Mars 2024",
      title: "Stage d'Entraînement Intensif",
      location: "Centre d'Entraînement",
      address: "Académie Farafina, Cayar, Sénégal",
      type: "camp" as const,
      description: "Stage complet de 5 jours pour perfectionner vos compétences techniques et tactiques.",
      longDescription: `
        <h3>Stage d'Excellence</h3>
        <p>Un stage intensif de 5 jours conçu pour les joueurs souhaitant améliorer leurs performances. Encadrement par nos entraîneurs professionnels.</p>
        
        <h3>Programme quotidien</h3>
        <ul>
          <li><strong>08:00 - 10:00</strong> : Séance technique</li>
          <li><strong>10:00 - 11:00</strong> : Pause</li>
          <li><strong>11:00 - 13:00</strong> : Séance tactique</li>
          <li><strong>13:00 - 15:00</strong> : Déjeuner et repos</li>
          <li><strong>15:00 - 17:00</strong> : Matchs et situations de jeu</li>
          <li><strong>17:00 - 18:00</strong> : Renforcement physique</li>
        </ul>
      `,
      image: "/african-football-academy-elite-training.jpg",
      images: [
        "/african-football-academy-elite-training.jpg",
        "/african-youth-football-training-action-shot.jpg",
      ],
      time: "08:00 - 18:00",
      duration: "5 jours",
      price: 50000,
      isFree: false,
      participants: 28,
      maxParticipants: 30,
      status: "open" as const,
      ageRange: "12-18 ans",
      requirements: [
        "Tenue de sport complète",
        "Chaussures de football",
        "Certificat médical",
        "Autorisation parentale"
      ],
      provided: [
        "Hébergement",
        "Repas",
        "Équipements",
        "Encadrement professionnel"
      ],
      activities: [
        "Séances techniques",
        "Séances tactiques",
        "Matchs",
        "Renforcement physique",
        "Analyse vidéo"
      ],
      testimonials: [
        {
          author: "Ibrahima T.",
          text: "Stage exceptionnel ! J'ai beaucoup progressé en seulement 5 jours.",
          rating: 5
        }
      ]
    },
    {
      id: "3",
      slug: generateSlug("Tournoi Inter-Académies"),
      date: "30 Mars 2024",
      title: "Tournoi Inter-Académies",
      location: "Complexe Sportif",
      address: "Complexe Sportif National, Dakar",
      type: "tournoi" as const,
      description: "Compétition amicale entre les meilleures académies de la région.",
      longDescription: `
        <h3>Tournoi de Prestige</h3>
        <p>Un tournoi réunissant les meilleures académies de football de la région. Format à 8 équipes avec phases de poules et élimination directe.</p>
      `,
      image: "/young-african-football-players-training.jpg",
      time: "10:00 - 20:00",
      duration: "1 jour",
      price: 0,
      isFree: true,
      participants: 120,
      maxParticipants: 150,
      status: "open" as const,
      ageRange: "U15, U17, U19",
      requirements: [
        "Équipe complète",
        "Licences en règle"
      ],
      provided: [
        "Terrains",
        "Arbitres",
        "Médecins",
        "Trophées"
      ],
      activities: [
        "Matchs de poules",
        "Demi-finales",
        "Finale",
        "Cérémonie de remise des prix"
      ]
    },
    {
      id: "4",
      slug: generateSlug("Visite Guidée du Centre"),
      date: "5 Avril 2024",
      title: "Visite Guidée du Centre",
      location: "Académie Farafina",
      address: "Académie Farafina, Cayar, Sénégal",
      type: "visite" as const,
      description: "Découvrez nos installations et notre méthode d'enseignement.",
      longDescription: `
        <h3>Découvrez l'Académie</h3>
        <p>Visite complète de nos installations : terrains, salles de classe, internat, centre médical.</p>
      `,
      image: "/african-students-studying-in-modern-classroom.jpg",
      time: "14:00 - 16:00",
      duration: "2 heures",
      price: 0,
      isFree: true,
      participants: 15,
      maxParticipants: 25,
      status: "open" as const,
      activities: [
        "Visite des terrains",
        "Visite des salles de classe",
        "Rencontre avec les équipes",
        "Présentation des programmes"
      ]
    },
    {
      id: "5",
      slug: generateSlug("Journée Portes Ouvertes"),
      date: "12 Avril 2024",
      title: "Journée Portes Ouvertes",
      location: "Académie Farafina",
      address: "Académie Farafina, Cayar, Sénégal",
      type: "portes-ouvertes" as const,
      description: "Rencontrez nos équipes et découvrez nos programmes.",
      longDescription: `
        <h3>Portes Ouvertes</h3>
        <p>Journée complète pour découvrir l'académie, rencontrer les équipes et poser toutes vos questions.</p>
      `,
      image: "/african-youth-football-training-action-shot.jpg",
      time: "09:00 - 17:00",
      duration: "1 jour",
      price: 0,
      isFree: true,
      participants: 80,
      maxParticipants: 200,
      status: "open" as const,
      activities: [
        "Visite libre",
        "Rencontres avec les entraîneurs",
        "Démonstrations",
        "Informations sur les inscriptions"
      ]
    },
    {
      id: "6",
      slug: generateSlug("Conférence sur le Football Professionnel"),
      date: "18 Avril 2024",
      title: "Conférence sur le Football Professionnel",
      location: "Salle de Conférence",
      address: "Académie Farafina, Cayar, Sénégal",
      type: "conférence" as const,
      description: "Intervention d'experts sur les carrières professionnelles.",
      longDescription: `
        <h3>Conférence Exclusive</h3>
        <p>Intervention d'anciens joueurs professionnels et d'experts sur les parcours de carrière dans le football.</p>
      `,
      image: "/african-students-studying-in-modern-classroom.jpg",
      time: "18:00 - 20:00",
      duration: "2 heures",
      price: 0,
      isFree: true,
      participants: 60,
      maxParticipants: 100,
      status: "open" as const,
      activities: [
        "Interventions d'experts",
        "Témoignages",
        "Questions-réponses",
        "Networking"
      ]
    },
    {
      id: "7",
      slug: generateSlug("Cérémonie de Remise des Diplômes"),
      date: "25 Avril 2024",
      title: "Cérémonie de Remise des Diplômes",
      location: "Grande Salle",
      address: "Académie Farafina, Cayar, Sénégal",
      type: "cérémonie" as const,
      description: "Célébration de la promotion 2024 de l'académie.",
      longDescription: `
        <h3>Cérémonie de Graduation</h3>
        <p>Cérémonie officielle de remise des diplômes pour les élèves de la promotion 2024.</p>
      `,
      image: "/african-football-academy-elite-training.jpg",
      time: "16:00 - 19:00",
      duration: "3 heures",
      price: 0,
      isFree: true,
      participants: 200,
      maxParticipants: 300,
      status: "open" as const,
      activities: [
        "Remise des diplômes",
        "Discours",
        "Cocktail",
        "Photos"
      ]
    },
    {
      id: "8",
      slug: generateSlug("Championnat National des Académies"),
      date: "1-3 Mai 2024",
      title: "Championnat National des Académies",
      location: "Stade National",
      address: "Stade Léopold Sédar Senghor, Dakar",
      type: "tournoi" as const,
      description: "Compétition nationale réunissant les meilleures académies.",
      longDescription: `
        <h3>Championnat National</h3>
        <p>Le plus grand tournoi de l'année réunissant les meilleures académies du pays sur 3 jours de compétition.</p>
      `,
      image: "/young-african-football-players-training.jpg",
      time: "09:00 - 21:00",
      duration: "3 jours",
      price: 0,
      isFree: true,
      participants: 250,
      maxParticipants: 300,
      status: "full" as const,
      activities: [
        "Phase de poules",
        "Élimination directe",
        "Finale",
        "Cérémonie de clôture"
      ]
    }
  ]

  return events.find(e => e.slug === slug) || null
}

export const dynamic = 'force-dynamic'

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#0f1012]">
      <Header variant="solid" />
      <main className="pt-20">
        <EventDetails event={event} />
      </main>
      <Footer />
    </div>
  )
}
