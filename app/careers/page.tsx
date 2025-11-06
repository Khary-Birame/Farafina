import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Clock, ArrowRight, Users, Award, Heart, Target } from "lucide-react"
import Link from "next/link"

const jobOpenings = [
  {
    id: 1,
    title: "Entraîneur de Football - U17",
    department: "Entraînement",
    location: "Cayar, Sénégal",
    type: "Temps plein",
    description:
      "Nous recherchons un entraîneur expérimenté pour diriger notre équipe U17. Le candidat idéal possède une licence d'entraînement UEFA B ou équivalent et une expérience avec les jeunes joueurs.",
    requirements: [
      "Licence d'entraînement UEFA B ou équivalent",
      "Minimum 5 ans d'expérience avec les jeunes",
      "Maîtrise du français et de l'anglais",
      "Passion pour le développement des jeunes talents",
    ],
  },
  {
    id: 2,
    title: "Professeur de Mathématiques",
    department: "Académique",
    location: "Cayar, Sénégal",
    type: "Temps plein",
    description:
      "Rejoignez notre équipe académique en tant que professeur de mathématiques. Vous travaillerez avec des étudiants-athlètes pour leur fournir une éducation de qualité tout en respectant leur horaire d'entraînement.",
    requirements: [
      "Master en Mathématiques ou équivalent",
      "Expérience en enseignement secondaire",
      "Capacité à adapter l'enseignement aux horaires sportifs",
    ],
  },
  {
    id: 3,
    title: "Directeur des Partenariats",
    department: "Développement",
    location: "Cayar, Sénégal / Télétravail",
    type: "Temps plein",
    description:
      "Nous recherchons un directeur des partenariats pour développer et maintenir des relations stratégiques avec des clubs professionnels, sponsors et organisations internationales.",
    requirements: [
      "Bac+5 en Commerce, Marketing ou Relations Internationales",
      "Expérience dans la gestion de partenariats",
      "Réseau établi dans le football international",
      "Excellentes compétences en communication",
    ],
  },
  {
    id: 4,
    title: "Physiothérapeute du Sport",
    department: "Médical",
    location: "Cayar, Sénégal",
    type: "Temps plein",
    description:
      "Rejoignez notre équipe médicale pour fournir des soins de physiothérapie aux étudiants-athlètes, prévenir les blessures et assurer leur bien-être physique optimal.",
    requirements: [
      "Diplôme en Physiothérapie",
      "Spécialisation en médecine du sport (souhaitée)",
      "Expérience avec les athlètes de haut niveau",
    ],
  },
]

const benefits = [
  {
    icon: Award,
    title: "Développement Professionnel",
    description: "Opportunités de formation continue et de développement de carrière",
  },
  {
    icon: Heart,
    title: "Impact Social",
    description: "Contribuez au développement de la prochaine génération de talents africains",
  },
  {
    icon: Users,
    title: "Équipe Dynamique",
    description: "Rejoignez une équipe passionnée et dédiée à l'excellence",
  },
  {
    icon: Target,
    title: "Mission Inspirante",
    description: "Participez à une mission transformatrice dans le football africain",
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#16A34A] to-[#d17e00] text-white py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Briefcase className="w-4 h-4 text-white" />
                <span className="text-sm font-medium">Rejoignez Notre Équipe</span>
              </div>

              <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
                Carrières & Opportunités
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
                Rejoignez une équipe passionnée dédiée à développer la prochaine génération de talents du football africain.
                Votre expertise peut faire la différence.
              </p>
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-sans font-bold text-3xl md:text-4xl mb-4 text-[#2E2E2E]">Pourquoi Nous Rejoindre ?</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Chez Farafina Foot Academy, nous croyons que notre équipe est notre plus grande force. Découvrez pourquoi
                  vous devriez faire partie de notre mission.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                      <div className="w-14 h-14 bg-[#16A34A]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-7 h-7 text-[#16A34A]" />
                      </div>
                      <h3 className="font-sans font-bold text-lg text-[#2E2E2E] mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Job Openings */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-sans font-bold text-3xl md:text-4xl mb-4 text-[#2E2E2E]">Postes Disponibles</h2>
                <p className="text-lg text-muted-foreground">
                  Découvrez les opportunités actuelles et rejoignez notre équipe exceptionnelle.
                </p>
              </div>

              <div className="space-y-6">
                {jobOpenings.map((job) => (
                  <Card key={job.id} className="p-6 md:p-8 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="inline-block px-3 py-1 bg-[#16A34A]/10 text-[#16A34A] rounded-full text-xs font-semibold">
                            {job.department}
                          </span>
                          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </span>
                        </div>
                        <h3 className="font-sans font-bold text-2xl text-[#2E2E2E] mb-3">{job.title}</h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{job.description}</p>
                        <div className="mb-4">
                          <h4 className="font-semibold text-[#2E2E2E] mb-2">Exigences :</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {job.requirements.map((req, idx) => (
                              <li key={idx}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="md:ml-4">
                        <Link href={`/contact?job=${job.id}`}>
                          <Button className="bg-[#16A34A] hover:bg-[#d17e00] text-white whitespace-nowrap">
                            Postuler
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#16A34A] to-[#d17e00] rounded-2xl p-12 text-white">
              <h2 className="font-sans font-bold text-3xl md:text-4xl mb-4">Vous ne trouvez pas le poste idéal ?</h2>
              <p className="text-lg text-white/90 mb-8">
                Envoyez-nous une candidature spontanée. Nous sommes toujours à la recherche de talents exceptionnels
                qui partagent notre vision.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-[#16A34A] hover:bg-gray-100">
                  Envoyer une Candidature Spontanée
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

