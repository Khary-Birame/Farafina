import { CheckCircle2, FileText, ImageIcon, FileCheck, Heart } from "lucide-react"

export function EligibilityRequirements() {
  const eligibilityCriteria = [
    "Age between 12-18 years old",
    "Passion for football and commitment to excellence",
    "Basic academic proficiency (grade-level appropriate)",
    "Physical fitness and medical clearance",
    "Parental/guardian consent for minors",
    "Open to all genders and nationalities",
  ]

  const requiredDocuments = [
    {
      icon: ImageIcon,
      title: "Recent Photo",
      description: "Passport-sized photograph (digital format)",
    },
    {
      icon: FileText,
      title: "Academic Transcript",
      description: "Latest school report or transcript",
    },
    {
      icon: FileCheck,
      title: "Parental Consent",
      description: "Signed consent form from parent/guardian",
    },
    {
      icon: Heart,
      title: "Medical Form",
      description: "Health clearance from licensed physician",
    },
  ]

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold text-[#2E2E2E] mb-4">Eligibility & Requirements</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Review the criteria and prepare your documents before starting your application
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Eligibility Criteria */}
          <div>
            <h3 className="text-2xl font-sans font-bold text-[#2E2E2E] mb-6">Who Can Apply</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Farafina Foot Academy welcomes talented young players from across Africa and beyond. We believe in
              inclusive excellence and provide equal opportunities regardless of gender, nationality, or socioeconomic
              background.
            </p>
            <div className="space-y-3">
              {eligibilityCriteria.map((criterion, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#008037] flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{criterion}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Required Documents */}
          <div>
            <h3 className="text-2xl font-sans font-bold text-[#2E2E2E] mb-6">Required Documents</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Prepare these documents before starting your application. All documents can be uploaded in PDF, JPG, or
              PNG format.
            </p>
            <div className="space-y-4">
              {requiredDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg border border-border hover:border-[#008037]/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#008037]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <doc.icon className="w-5 h-5 text-[#008037]" />
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
