"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Brain, ArrowRight } from "lucide-react"

export function ScoutingCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#2E2E2E] via-[#1a1a1a] to-[#2E2E2E] relative overflow-hidden">
      {/* Background Pattern */}
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

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008037]/20 border border-[#008037]/30 mb-6">
              <Brain className="w-4 h-4 text-[#008037]" />
              <span className="text-sm font-medium text-[#008037]">Request a Demo</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-4 text-balance">
              Discover the Future of Scouting with Farafina AI
            </h2>
            <p className="text-xl text-gray-300 text-balance">
              See how our AI-powered platform can transform talent identification and player development
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-white/95 backdrop-blur-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input id="name" placeholder="Enter your name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-foreground mb-2">
                    Organization
                  </label>
                  <Input id="organization" placeholder="Academy or club name" />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                    Your Role
                  </label>
                  <Input id="role" placeholder="Coach, Scout, Director..." />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your interest in our AI scouting platform..."
                  rows={4}
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  className="mt-1 w-4 h-4 rounded border-border text-[#008037] focus:ring-[#008037]"
                  required
                />
                <label htmlFor="consent" className="text-sm text-muted-foreground">
                  I agree to receive communications about Farafina AI and understand that my data will be processed
                  according to the Privacy Policy and GDPR regulations.
                </label>
              </div>

              <Button type="submit" size="lg" className="w-full bg-[#008037] hover:bg-[#006629] text-white">
                Request Demo Access
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Questions? Contact our AI team at{" "}
                <a href="mailto:ai@farafinafoot.com" className="text-[#008037] hover:underline font-medium">
                  ai@farafinafoot.com
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
