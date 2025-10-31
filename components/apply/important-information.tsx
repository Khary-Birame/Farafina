import { GraduationCap, DollarSign, FileCheck, HelpCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ImportantInformation() {
  const infoCards = [
    {
      icon: GraduationCap,
      title: "Scholarship Opportunities",
      description:
        "Up to 40% of students receive financial aid based on merit and need. We believe talent should never be limited by financial circumstances.",
      link: "/admissions#scholarship",
      linkText: "Learn About Scholarships",
    },
    {
      icon: DollarSign,
      title: "Tuition & Fees",
      description:
        "Transparent pricing with multiple payment plans available. Tuition covers training, academics, accommodation, meals, and medical care.",
      link: "/admissions#tuition",
      linkText: "View Pricing Details",
    },
    {
      icon: FileCheck,
      title: "Parental Consent",
      description:
        "All applicants under 18 require signed parental/guardian consent. This ensures family support and commitment to the program.",
      link: "/admissions#faq",
      linkText: "Download Consent Form",
    },
  ]

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold text-[#2E2E2E] mb-4">Important Information</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Key policies and details you should know before applying
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className="bg-white border border-border rounded-xl p-6 hover:border-[#008037]/30 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-[#008037]/10 rounded-lg flex items-center justify-center mb-4">
                <card.icon className="w-6 h-6 text-[#008037]" />
              </div>
              <h3 className="text-xl font-bold text-[#2E2E2E] mb-3">{card.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{card.description}</p>
              <Link
                href={card.link}
                className="text-sm font-semibold text-[#008037] hover:text-[#006629] inline-flex items-center gap-1"
              >
                {card.linkText}
                <span>→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Link */}
        <div className="bg-muted/50 rounded-xl p-8 text-center border border-border">
          <HelpCircle className="w-12 h-12 text-[#008037] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#2E2E2E] mb-2">Have Questions?</h3>
          <p className="text-muted-foreground mb-4">
            Visit our FAQ section for answers to common questions about the application process
          </p>
          <Link href="/admissions#faq">
            <Button variant="outline">View FAQ</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
