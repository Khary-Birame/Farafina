import { CheckCircle2, FileText, ImageIcon, FileCheck, Heart } from "lucide-react"

export function EligibilityRequirements() {
  const eligibilityCriteria = [
    "Âge entre 12-18 ans",
    "Passion pour le football et engagement envers l'excellence",
    "Maîtrise académique de base (niveau scolaire approprié)",
    "Condition physique et certificat médical",
    "Consentement parental/tuteur pour les mineurs",
    "OuOr à tous les genres et nationalités",
  ]

  const requiredDocuments = [
    {
      icon: ImageIcon,
      title: "Photo Récente",
      description: "Photographie format passeport (format numérique)",
    },
    {
      icon: FileText,
      title: "Bulletin Scolaire",
      description: "Dernier bulletin scolaire ou relevé de notes",
    },
    {
      icon: FileCheck,
      title: "Consentement Parental",
      description: "Formulaire de consentement signé par le parent/tuteur",
    },
    {
      icon: Heart,
      title: "Formulaire Médical",
      description: "Certificat médical d'un médecin agréé",
    },
  ]

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold text-[#1A1A1A] mb-4">Éligibilité et Exigences</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Consultez les critères et préparez vos documents avant de commencer votre candidature
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Eligibility Criteria */}
          <div>
            <h3 className="text-2xl font-sans font-bold text-[#1A1A1A] mb-6">Qui Peut Postuler</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Farafina Foot Academy accueille de jeunes joueurs talentueux de toute l'Afrique et au-delà. Nous croyons en
              l'excellence inclusive et offrons des opportunités égales, quel que soit le genre, la nationalité ou le milieu
              socio-économique.
            </p>
            <div className="space-y-3">
              {eligibilityCriteria.map((criterion, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{criterion}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Required Documents */}
          <div>
            <h3 className="text-2xl font-sans font-bold text-[#1A1A1A] mb-6">Documents Requis</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Préparez ces documents avant de commencer votre candidature. Tous les documents peuvent être téléchargés aux formats PDF, JPG ou
              PNG.
            </p>
            <div className="space-y-4">
              {requiredDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg border border-border hover:border-[#D4AF37]/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <doc.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{doc.title}</h4>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
