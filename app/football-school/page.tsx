import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FootballSchoolHero } from "@/components/football-school/football-school-hero"
import { WhyItMatters } from "@/components/football-school/why-it-matters"
import { MethodeFarafina } from "@/components/football-school/methode-farafina"
import { AgeTrainingPath } from "@/components/football-school/age-training-path"
import { TrainingExperience } from "@/components/football-school/training-experience"
import { SuccessStories } from "@/components/football-school/success-stories"
import { PricingAccessibility } from "@/components/football-school/pricing-accessibility"
import { FootballSchoolFAQ } from "@/components/football-school/football-school-faq"
import { FootballSchoolCTA } from "@/components/football-school/football-school-cta"

export const metadata = {
  title: "École de Foot - Farafina Foot Academy",
  description:
    "École de Foot – Le Premier Pas Vers Ton Rêve. Un programme ouvert à tous pour progresser, s'amuser et révéler son potentiel.",
}

export default function FootballSchoolPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <FootballSchoolHero />
        <WhyItMatters />
        <MethodeFarafina />
        <AgeTrainingPath />
        <TrainingExperience />
        <SuccessStories />
        <PricingAccessibility />
        <FootballSchoolFAQ />
        <FootballSchoolCTA />
      </main>
      <Footer />
    </div>
  )
}
