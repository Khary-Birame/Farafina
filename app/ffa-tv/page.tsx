import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LiveStreamPlayer } from "@/components/ffa-tv/live-stream-player"
import { VideoGrid } from "@/components/ffa-tv/video-grid"
import { SponsorsSection } from "@/components/ffa-tv/sponsors-section"
import { UserEngagement } from "@/components/ffa-tv/user-engagement"
import { Button } from "@/components/ui/button"
import { Play, Radio } from "lucide-react"

export default function FFATVPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* Background Video Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#008037]/20 via-[#1a1a1a]/90 to-[#1a1a1a]" />
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, #008037 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              <Radio size={16} />
              <span>LIVE NOW</span>
            </div>
            <h1 className="font-sans font-bold text-5xl lg:text-7xl text-white mb-6 leading-tight text-balance">
              FFA TV — Watch the <span className="text-[#008037]">Legends of Tomorrow</span> in Action
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 text-pretty">
              Experience live matches, exclusive highlights, and behind-the-scenes training sessions from Farafina Foot
              Academy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#008037] hover:bg-[#006629] text-white text-base h-12 px-8">
                <Play size={20} className="mr-2" />
                Watch Live Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-base h-12 px-8 bg-transparent"
              >
                Browse Replays
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stream Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <LiveStreamPlayer />
        </div>
      </section>

      {/* Replay & Highlights Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <VideoGrid />
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-12 lg:py-16 bg-[#2E2E2E]/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SponsorsSection />
        </div>
      </section>

      {/* User Engagement Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <UserEngagement />
        </div>
      </section>

      <Footer />
    </div>
  )
}
