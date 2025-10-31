import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdmissionsHero } from "@/components/admissions/admissions-hero"
import { AdmissionsProcess } from "@/components/admissions/admissions-process"
import { ApplicationForm } from "@/components/admissions/application-form"
import { TuitionPricing } from "@/components/admissions/tuition-pricing"
import { ScholarshipSection } from "@/components/admissions/scholarship-section"
import { AdmissionsFAQ } from "@/components/admissions/admissions-faq"

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <AdmissionsHero />
        <AdmissionsProcess />
        <ApplicationForm />
        <TuitionPricing />
        <ScholarshipSection />
        <AdmissionsFAQ />
      </main>
      <Footer />
    </div>
  )
}
