import { Heart, Users, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SocialInclusion() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#008037] to-[#006629] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-white mb-6">Social & Gender Inclusion</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            At Farafina Foot Academy, we believe that talent knows no boundaries. Our commitment to social inclusion
            ensures that every young player, regardless of background or gender, has access to world-class training and
            education.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-white" size={32} />
            </div>
            <h3 className="font-sans font-semibold text-xl text-white mb-3">Scholarship Programs</h3>
            <p className="text-white/80 leading-relaxed">
              Merit-based and need-based scholarships covering tuition, accommodation, and equipment for talented
              players from all backgrounds.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-white" size={32} />
            </div>
            <h3 className="font-sans font-semibold text-xl text-white mb-3">Girls' Football Program</h3>
            <p className="text-white/80 leading-relaxed">
              Dedicated training programs, facilities, and support for female players, promoting gender equality in
              African football.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-white" size={32} />
            </div>
            <h3 className="font-sans font-semibold text-xl text-white mb-3">Equal Access</h3>
            <p className="text-white/80 leading-relaxed">
              No discrimination based on ethnicity, religion, or socioeconomic status. Every player is evaluated solely
              on talent and potential.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#2E2E2E] font-semibold text-lg px-8 h-14">
            Support Our Social Initiatives
            <ArrowRight className="ml-2" size={20} />
          </Button>
          <p className="text-white/70 text-sm mt-4">Help us provide opportunities to talented young players</p>
        </div>
      </div>
    </section>
  )
}
