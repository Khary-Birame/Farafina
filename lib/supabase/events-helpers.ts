/**
 * Helpers pour interagir avec la table events dans Supabase
 */

import { createServerClient } from "./server"
import { generateSlug } from "@/lib/utils"

export type EventType = "détection" | "tournoi" | "visite" | "conférence" | "cérémonie" | "portes-ouvertes" | "camp"
export type EventStatus = "open" | "full" | "closed"

export interface Event {
  id: string
  slug: string
  date: string
  title: string
  location: string
  address?: string
  type: EventType
  description: string
  longDescription?: string
  image: string
  images?: string[]
  time?: string
  duration?: string
  price?: number
  isFree?: boolean
  participants?: number
  maxParticipants?: number
  status: EventStatus
  isFeatured?: boolean
  ageRange?: string
  requirements?: string[]
  provided?: string[]
  activities?: string[]
  testimonials?: Array<{ author: string; text: string; rating: number }>
}

/**
 * Récupérer un événement par son slug
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const supabase = await createServerClient()
    
    // Essayer de récupérer depuis Supabase
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single()

    if (error) {
      // Si la table n'existe pas ou erreur, utiliser les données mockées
      console.warn("Erreur lors de la récupération de l'événement depuis Supabase:", error.message)
      return getMockEventBySlug(slug)
    }

    if (!data) {
      return getMockEventBySlug(slug)
    }

    // Transformer les données Supabase en format Event
    return transformEventData(data)
  } catch (error: any) {
    console.warn("Erreur lors de la récupération de l'événement:", error.message)
    return getMockEventBySlug(slug)
  }
}

/**
 * Récupérer tous les événements
 */
export async function getEvents(options?: {
  type?: EventType
  status?: EventStatus
  featured?: boolean
  limit?: number
  offset?: number
}): Promise<{ data: Event[] | null; error: any }> {
  try {
    const supabase = await createServerClient()
    
    let query = supabase
      .from("events")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (options?.type) {
      query = query.eq("type", options.type)
    }

    if (options?.status) {
      query = query.eq("status", options.status)
    }

    if (options?.featured) {
      query = query.eq("is_featured", true)
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 20) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.warn("Erreur lors de la récupération des événements depuis Supabase:", error.message)
      // Retourner les données mockées en fallback
      return { data: getMockEvents(), error: null }
    }

    if (!data || data.length === 0) {
      return { data: getMockEvents(), error: null }
    }

    // Transformer les données
    const transformedEvents = data.map(transformEventData)
    return { data: transformedEvents, error: null }
  } catch (error: any) {
    console.warn("Erreur lors de la récupération des événements:", error.message)
    return { data: getMockEvents(), error: null }
  }
}

/**
 * Transformer les données Supabase en format Event
 */
function transformEventData(data: any): Event {
  return {
    id: data.id,
    slug: data.slug || generateSlug(data.title),
    date: data.date || data.event_date,
    title: data.title,
    location: data.location,
    address: data.address,
    type: data.type as EventType,
    description: data.description || data.short_description,
    longDescription: data.long_description || data.description,
    image: data.image || data.image_url || "/placeholder.jpg",
    images: data.images || (data.image ? [data.image] : []),
    time: data.time || data.event_time,
    duration: data.duration,
    price: data.price,
    isFree: data.is_free ?? (data.price === 0 || !data.price),
    participants: data.participants || data.current_participants || 0,
    maxParticipants: data.max_participants || data.max_participants_count,
    status: (data.status || "open") as EventStatus,
    isFeatured: data.is_featured || false,
    ageRange: data.age_range,
    requirements: Array.isArray(data.requirements) ? data.requirements : (data.requirements ? JSON.parse(data.requirements) : []),
    provided: Array.isArray(data.provided) ? data.provided : (data.provided ? JSON.parse(data.provided) : []),
    activities: Array.isArray(data.activities) ? data.activities : (data.activities ? JSON.parse(data.activities) : []),
    testimonials: Array.isArray(data.testimonials) ? data.testimonials : (data.testimonials ? JSON.parse(data.testimonials) : []),
  }
}

/**
 * Données mockées en fallback (même structure que dans app/events/[slug]/page.tsx)
 */
function getMockEvents(): Event[] {
  return [
    {
      id: "9",
      slug: generateSlug("Inscriptions Ouvertes - Saison 2025-2026"),
      date: "Saison 2025-2026",
      title: "Inscriptions Ouvertes - Saison 2025-2026",
      location: "FARAFINA FOOT ACADEMY",
      address: "FANN HOCK LOTS N°10 DAKAR",
      type: "portes-ouvertes",
      description: "Rejoignez l'élite de demain. Formez des talents, bâtissez des légendes. Inscriptions ouvertes pour la saison 2025-2026.",
      longDescription: `
        <div style="text-align: center; margin-bottom: 2rem;">
          <h2 style="font-size: 2.5rem; font-weight: bold; color: #D4AF37; margin-bottom: 1rem;">FORMEZ DES TALENTS, BATIR DES LÉGENDES</h2>
          <p style="font-size: 1.25rem; color: rgba(255, 255, 255, 0.9); margin-bottom: 2rem;">
            Rejoignez une académie d'excellence dédiée à la<br/>
            formation des jeunes footballeurs et footballeuses
          </p>
        </div>
        
        <div style="text-align: center; margin: 3rem 0;">
          <div style="display: flex; justify-content: center; align-items: center; gap: 1rem; flex-wrap: wrap; font-size: 2rem; font-weight: bold; color: #D4AF37;">
            <span>DISCIPLINE</span>
            <span style="color: #D4AF37;">•</span>
            <span>PASSION</span>
            <span style="color: #D4AF37;">•</span>
            <span>PERFORMANCE</span>
          </div>
        </div>
        
        <div style="background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%); padding: 2rem; border-radius: 1rem; margin: 2rem 0;">
          <div style="background: rgba(0, 0, 0, 0.3); padding: 1rem; border-radius: 0.5rem; display: inline-block; margin-bottom: 1.5rem;">
            <p style="color: white; font-weight: bold; font-size: 1.25rem; margin: 0;">ÂGE : 6 À 20 ANS</p>
          </div>
          
          <div style="color: #1A1A1A; margin-top: 1.5rem;">
            <p style="font-weight: bold; margin-bottom: 0.5rem; font-size: 1.1rem;">LIEU: FARAFINA FOOT ACADEMY</p>
            <p style="font-weight: bold; margin-bottom: 0.5rem; font-size: 1.1rem;">HORAIRES: MERCREDI, SAMEDI, DIMANCHE</p>
            <p style="font-weight: bold; margin-bottom: 1rem; font-size: 1.1rem;">TERRAIN ÉCOLE MEDINE & ENA</p>
            
            <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 2px solid rgba(0, 0, 0, 0.2);">
              <p style="font-weight: bold; margin-bottom: 0.5rem; font-size: 1.1rem;">Tél.: +221 76 317 12 02</p>
              <p style="font-weight: bold; margin-bottom: 0.5rem; font-size: 1.1rem;">info@farafinafootacademy.com</p>
              <p style="font-weight: bold; margin-top: 1rem; font-size: 1.1rem;">ADRESSE: FANN HOCK LOTS N°10 DAKAR</p>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.05); border-radius: 0.5rem; border: 1px solid rgba(255, 255, 255, 0.1);">
          <h3 style="color: #D4AF37; font-size: 1.5rem; margin-bottom: 1rem;">Nos Valeurs</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 1rem; padding-left: 1.5rem; position: relative;">
              <span style="position: absolute; left: 0; color: #D4AF37; font-weight: bold;">•</span>
              <strong style="color: #D4AF37;">DISCIPLINE</strong> : Un encadrement rigoureux pour développer l'excellence
            </li>
            <li style="margin-bottom: 1rem; padding-left: 1.5rem; position: relative;">
              <span style="position: absolute; left: 0; color: #D4AF37; font-weight: bold;">•</span>
              <strong style="color: #D4AF37;">PASSION</strong> : L'amour du football au cœur de notre méthode
            </li>
            <li style="margin-bottom: 1rem; padding-left: 1.5rem; position: relative;">
              <span style="position: absolute; left: 0; color: #D4AF37; font-weight: bold;">•</span>
              <strong style="color: #D4AF37;">PERFORMANCE</strong> : Des résultats mesurables et une progression constante
            </li>
          </ul>
        </div>
      `,
      image: "/affiche.png",
      images: [
        "/affiche.png",
        "/african-youth-football-training-action-shot.jpg",
        "/african-football-academy-elite-training.jpg",
        "/young-african-football-players-training.jpg",
      ],
      time: "Mercredi, Samedi, Dimanche",
      duration: "Saison complète",
      price: 0,
      isFree: false,
      participants: 0,
      maxParticipants: 200,
      status: "open",
      isFeatured: true,
      ageRange: "6-20 ans",
      requirements: [
        "Certificat médical (moins de 3 mois)",
        "Autorisation parentale pour les mineurs",
        "Dossier d'inscription complet",
        "Tenue de sport complète",
        "Chaussures de football"
      ],
      provided: [
        "Encadrement professionnel",
        "Équipements d'entraînement",
        "Installations modernes",
        "Suivi personnalisé",
        "Formation académique et sportive"
      ],
      activities: [
        "Entraînements techniques",
        "Entraînements tactiques",
        "Matchs et compétitions",
        "Formation physique",
        "Suivi académique",
        "Développement personnel"
      ],
      testimonials: [
        {
          author: "Parent d'élève",
          text: "Une académie exceptionnelle qui forme vraiment les talents de demain. L'encadrement est professionnel et les résultats sont au rendez-vous.",
          rating: 5
        }
      ]
    },
    {
      id: "1",
      slug: generateSlug("Journée de Détection Nationale"),
      date: "15 Mars 2025",
      title: "Journée de Détection Nationale",
      location: "Stade de Cayar, Sénégal",
      address: "Académie Farafina, Cayar, Sénégal",
      type: "détection",
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
      status: "open",
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
      type: "camp",
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
      status: "open",
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
      type: "tournoi",
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
      status: "open",
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
      type: "visite",
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
      status: "open",
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
      type: "portes-ouvertes",
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
      status: "open",
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
      type: "conférence",
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
      status: "open",
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
      type: "cérémonie",
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
      status: "open",
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
      type: "tournoi",
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
      status: "full",
      activities: [
        "Phase de poules",
        "Élimination directe",
        "Finale",
        "Cérémonie de clôture"
      ]
    },
  ]
}

/**
 * Récupérer un événement mocké par slug
 */
function getMockEventBySlug(slug: string): Event | null {
  const mockEvents = getMockEvents()
  return mockEvents.find(e => e.slug === slug) || null
}

