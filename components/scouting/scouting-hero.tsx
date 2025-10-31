"use client"

import { Button } from "@/components/ui/button"
import { Brain, TrendingUp } from "lucide-react"

export function ScoutingHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2E2E2E] via-[#1a1a1a] to-[#2E2E2E]">
      {/* Neural Network Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #008037 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, #D4AF37 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, #008037 0%, transparent 50%)`,
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(#008037 1px, transparent 1px),
                           linear-gradient(90deg, #008037 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008037]/10 border border-[#008037]/20 mb-6 animate-fade-in-up">
          <Brain className="w-4 h-4 text-[#008037]" />
          <span className="text-sm font-medium text-[#008037]">Powered by Artificial Intelligence</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white mb-6 animate-fade-in-up text-balance">
          AI & Talent Scouting
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up text-balance">
          Empowering coaches and players through data-driven insights
        </p>

        <p className="text-base md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto animate-fade-in-up">
          Farafina Foot Academy integrates cutting-edge AI technology to identify, track, and develop football talent
          across Africa with precision and fairness.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
          <Button size="lg" className="bg-[#008037] hover:bg-[#006629] text-white px-8">
            <TrendingUp className="w-5 h-5 mr-2" />
            View Demo Dashboard
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
            Learn More
          </Button>
        </div>

        {/* Floating Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { value: "10K+", label: "Players Tracked" },
            { value: "98%", label: "Accuracy Rate" },
            { value: "24/7", label: "Real-time Analysis" },
            { value: "100%", label: "Gender Inclusive" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#008037]/50 transition-all duration-300"
            >
              <div className="text-3xl font-bold text-[#D4AF37] mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
