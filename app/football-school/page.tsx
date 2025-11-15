import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FootballSchoolHero } from "@/components/football-school/football-school-hero"
import { AcademyComparison } from "@/components/football-school/academy-comparison"
import { AgeCategories } from "@/components/football-school/age-categories"
import { TrainingSchedule } from "@/components/football-school/training-schedule"
import { CoachingPhilosophy } from "@/components/football-school/coaching-philosophy"
import { PricingPayment } from "@/components/football-school/pricing-payment"
import { FootballSchoolFAQ } from "@/components/football-school/football-school-faq"
import { FootballSchoolCTA } from "@/components/football-school/football-school-cta"

export const metadata = {
  title: "École de Foot - Farafina Foot Academy",
  description:
    "Rejoignez notre programme d'entraînement de football local pour jeunes passionnés, sans internat.",
}

export default function FootballSchoolPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <FootballSchoolHero />
        <AcademyComparison />
        <AgeCategories />
        <TrainingSchedule />
        <CoachingPhilosophy />
        <PricingPayment />
        <FootballSchoolFAQ />
        <FootballSchoolCTA />
      </main>
      <Footer />
    </div>
  )
}

