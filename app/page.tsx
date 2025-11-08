import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { MissionVision } from "@/components/about/mission-vision"
import { Infrastructures } from "@/components/about/infrastructures"
import { Leadership } from "@/components/about/leadership"
import { SocialInclusion } from "@/components/about/social-inclusion"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <AboutHero />
        <MissionVision />
        <Infrastructures />
        <Leadership />
        <SocialInclusion />
      </main>
      <Footer />
    </div>
  )
}
