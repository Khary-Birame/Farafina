import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ApplyHero } from "@/components/apply/apply-hero"
import { EligibilityRequirements } from "@/components/apply/eligibility-requirements"
import { ApplicationTimeline } from "@/components/apply/application-timeline"
import { ImportantInformation } from "@/components/apply/important-information"
import { ApplyCTA } from "@/components/apply/apply-cta"

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <ApplyHero />
        <EligibilityRequirements />
        <ApplicationTimeline />
        <ImportantInformation />
        <ApplyCTA />
      </main>
      <Footer />
    </div>
  )
}
