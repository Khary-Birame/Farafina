import { Target, Eye, Heart, Award } from "lucide-react"

export function MissionVision() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Vision */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#008037] rounded-xl flex items-center justify-center flex-shrink-0">
                <Eye className="text-white" size={28} />
              </div>
              <h2 className="font-sans font-bold text-3xl md:text-4xl text-[#2E2E2E]">Our Vision</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              To become <span className="font-semibold text-[#008037]">Africa's reference</span> in sport-study
              education, producing world-class athletes who excel both on the field and in the classroom.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              We envision a future where African talent is recognized globally, where young players have access to
              world-class training facilities, and where education and sport work hand-in-hand to create well-rounded
              individuals ready to compete at the highest levels.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#008037]/10 rounded-lg">
                <Award className="text-[#008037]" size={18} />
                <span className="text-sm font-medium text-[#2E2E2E]">Excellence</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#008037]/10 rounded-lg">
                <Target className="text-[#008037]" size={18} />
                <span className="text-sm font-medium text-[#2E2E2E]">Innovation</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#008037]/10 rounded-lg">
                <Heart className="text-[#008037]" size={18} />
                <span className="text-sm font-medium text-[#2E2E2E]">Integrity</span>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#D4AF37] rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="text-white" size={28} />
              </div>
              <h2 className="font-sans font-bold text-3xl md:text-4xl text-[#2E2E2E]">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              To discover, train, and empower young African talent through{" "}
              <span className="font-semibold text-[#D4AF37]">innovation, education, and integrity</span>.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-[#008037] rounded-full mt-2 flex-shrink-0" />
                <p className="text-base text-gray-600 leading-relaxed">
                  <span className="font-semibold text-[#2E2E2E]">Discover:</span> Identify promising young talent across
                  Africa using cutting-edge AI scouting technology and traditional scouting networks.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-[#008037] rounded-full mt-2 flex-shrink-0" />
                <p className="text-base text-gray-600 leading-relaxed">
                  <span className="font-semibold text-[#2E2E2E]">Train:</span> Provide world-class coaching, modern
                  facilities, and comprehensive academic education to develop complete athletes.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-[#008037] rounded-full mt-2 flex-shrink-0" />
                <p className="text-base text-gray-600 leading-relaxed">
                  <span className="font-semibold text-[#2E2E2E]">Empower:</span> Equip our students with life skills,
                  values, and opportunities to succeed professionally and personally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
