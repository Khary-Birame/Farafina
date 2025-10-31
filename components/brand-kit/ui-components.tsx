import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Play } from "lucide-react"

export function UIComponents() {
  return (
    <section className="py-24 px-4 bg-[#F5F5F5]">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-sans font-bold text-[#2E2E2E] mb-6">UI Components</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#008037] to-[#D4AF37] mx-auto" />
        </div>

        {/* Buttons */}
        <div className="mb-16">
          <h3 className="text-3xl font-sans font-bold text-[#2E2E2E] mb-8">Buttons</h3>
          <div className="bg-white p-12 rounded-3xl border border-[#E5E5E5] shadow-lg">
            <div className="flex flex-wrap gap-6 items-center">
              <Button className="bg-[#008037] hover:bg-[#006629] text-white">Primary Button</Button>
              <Button className="bg-[#D4AF37] hover:bg-[#b8962e] text-[#2E2E2E]">Gold Button</Button>
              <Button
                variant="outline"
                className="border-[#008037] text-[#008037] hover:bg-[#008037] hover:text-white bg-transparent"
              >
                Outline Button
              </Button>
              <Button variant="ghost" className="text-[#2E2E2E] hover:bg-[#F5F5F5]">
                Ghost Button
              </Button>
              <Button className="bg-[#008037] hover:bg-[#006629] text-white">
                <Play className="w-4 h-4 mr-2" />
                With Icon
              </Button>
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="mb-16">
          <h3 className="text-3xl font-sans font-bold text-[#2E2E2E] mb-8">Form Inputs</h3>
          <div className="bg-white p-12 rounded-3xl border border-[#E5E5E5] shadow-lg">
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
              <div>
                <label className="block text-sm font-mono font-medium text-[#2E2E2E] mb-2">Text Input</label>
                <Input placeholder="Enter your name" className="border-[#E5E5E5] focus:border-[#008037]" />
              </div>
              <div>
                <label className="block text-sm font-mono font-medium text-[#2E2E2E] mb-2">Email Input</label>
                <Input type="email" placeholder="your@email.com" className="border-[#E5E5E5] focus:border-[#008037]" />
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-16">
          <h3 className="text-3xl font-sans font-bold text-[#2E2E2E] mb-8">Cards</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border-[#E5E5E5] hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#008037] rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-sans font-bold text-xl">01</span>
              </div>
              <h4 className="text-xl font-sans font-bold text-[#2E2E2E] mb-2">Card Title</h4>
              <p className="text-[#737373] font-mono">Card description with supporting text and details.</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-[#008037] to-[#00a045] text-white hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-sans font-bold text-xl">02</span>
              </div>
              <h4 className="text-xl font-sans font-bold mb-2">Accent Card</h4>
              <p className="text-white/90 font-mono">Card with gradient background for emphasis.</p>
            </Card>

            <Card className="p-6 bg-[#2E2E2E] text-white hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center mb-4">
                <span className="text-[#2E2E2E] font-sans font-bold text-xl">03</span>
              </div>
              <h4 className="text-xl font-sans font-bold mb-2">Dark Card</h4>
              <p className="text-white/80 font-mono">Card with dark background and gold accent.</p>
            </Card>
          </div>
        </div>

        {/* Navigation Bar */}
        <div>
          <h3 className="text-3xl font-sans font-bold text-[#2E2E2E] mb-8">Navigation Bar</h3>
          <div className="bg-white p-6 rounded-3xl border border-[#E5E5E5] shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#008037] rounded-lg flex items-center justify-center">
                  <span className="text-white font-sans font-bold text-xl">FFA</span>
                </div>
                <div>
                  <div className="font-sans font-bold text-lg text-[#2E2E2E]">Farafina Foot Academy</div>
                  <div className="text-xs text-[#737373]">Cayar, Senegal</div>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <span className="text-sm font-mono text-[#2E2E2E]">About</span>
                <span className="text-sm font-mono text-[#2E2E2E]">Programs</span>
                <span className="text-sm font-mono text-[#2E2E2E]">Contact</span>
                <Button size="sm" className="bg-[#008037] hover:bg-[#006629] text-white">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
