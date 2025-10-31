import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScoutingHero } from "@/components/scouting/scouting-hero"
import { AIDashboard } from "@/components/scouting/ai-dashboard"
import { PlayerProfiles } from "@/components/scouting/player-profiles"
import { TechnologyInAction } from "@/components/scouting/technology-in-action"
import { EthicsSection } from "@/components/scouting/ethics-section"
import { ScoutingCTA } from "@/components/scouting/scouting-cta"

export default function ScoutingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <ScoutingHero />
        <AIDashboard />
        <PlayerProfiles />
        <TechnologyInAction />
        <EthicsSection />
        <ScoutingCTA />
      </main>
      <Footer />
    </div>
  )
}
