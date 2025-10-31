import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProgramsHero } from "@/components/programs/programs-hero"
import { SportsExcellence } from "@/components/programs/sports-excellence"
import { AcademicExcellence } from "@/components/programs/academic-excellence"
import { IntegratedSchedule } from "@/components/programs/integrated-schedule"
import { ProgramsByAge } from "@/components/programs/programs-by-age"
import { CoachingStaff } from "@/components/programs/coaching-staff"
import { ProgramsCTA } from "@/components/programs/programs-cta"

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProgramsHero />
      <SportsExcellence />
      <AcademicExcellence />
      <IntegratedSchedule />
      <ProgramsByAge />
      <CoachingStaff />
      <ProgramsCTA />
      <Footer />
    </div>
  )
}
