import { Button } from "@/components/ui/button"
import { ArrowRight, Lock, MessageCircle, Bell } from "lucide-react"

export function UserEngagement() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Sign In CTA */}
      <div className="bg-gradient-to-br from-[#008037] to-[#006629] rounded-2xl p-8 lg:p-12 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={32} className="text-white" />
          </div>
          <h2 className="font-sans font-bold text-3xl lg:text-4xl text-white mb-4 text-balance">
            Sign In to Access Exclusive Matches
          </h2>
          <p className="text-lg text-white/90 mb-8 text-pretty max-w-2xl mx-auto">
            Get unlimited access to live streams, full match replays, player interviews, and exclusive behind-the-scenes
            content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#008037] hover:bg-gray-100 text-base h-12 px-8">
              Sign In
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-base h-12 px-8 bg-transparent"
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-[#2E2E2E] rounded-xl p-6 border border-[#3a3a3a] hover:border-[#008037] transition-all">
          <div className="w-12 h-12 bg-[#008037]/20 rounded-xl flex items-center justify-center mb-4">
            <MessageCircle size={24} className="text-[#008037]" />
          </div>
          <h3 className="font-sans font-bold text-white text-lg mb-2">Live Chat</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Join the conversation with fans during live matches and share your thoughts.
          </p>
        </div>

        <div className="bg-[#2E2E2E] rounded-xl p-6 border border-[#3a3a3a] hover:border-[#008037] transition-all">
          <div className="w-12 h-12 bg-[#008037]/20 rounded-xl flex items-center justify-center mb-4">
            <Bell size={24} className="text-[#008037]" />
          </div>
          <h3 className="font-sans font-bold text-white text-lg mb-2">Match Alerts</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Get notified when your favorite teams and players are about to go live.
          </p>
        </div>

        <div className="bg-[#2E2E2E] rounded-xl p-6 border border-[#3a3a3a] hover:border-[#008037] transition-all">
          <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center mb-4">
            <Lock size={24} className="text-[#D4AF37]" />
          </div>
          <h3 className="font-sans font-bold text-white text-lg mb-2">Premium Content</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Access exclusive interviews, training sessions, and documentary content.
          </p>
        </div>
      </div>
    </div>
  )
}
