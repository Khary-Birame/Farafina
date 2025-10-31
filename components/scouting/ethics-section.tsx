"use client"

import { Card } from "@/components/ui/card"
import { Shield, Lock, Heart, CheckCircle } from "lucide-react"

export function EthicsSection() {
  const principles = [
    {
      icon: Shield,
      title: "GDPR Compliant",
      description: "Full compliance with European data protection regulations and international privacy standards.",
    },
    {
      icon: Lock,
      title: "Parental Consent",
      description: "All data collection requires explicit parental or guardian consent for players under 18 years old.",
    },
    {
      icon: Heart,
      title: "Gender Inclusion",
      description: "Equal evaluation criteria for male and female players, promoting diversity and fair opportunities.",
    },
  ]

  const commitments = [
    "Data is encrypted and stored securely",
    "Players can request data deletion at any time",
    "No data is shared with third parties without consent",
    "AI models are regularly audited for bias",
    "Transparent scoring methodology available to all families",
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008037]/10 border border-[#008037]/20 mb-4">
            <Shield className="w-4 h-4 text-[#008037]" />
            <span className="text-sm font-medium text-[#008037]">Trust & Transparency</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-4">Ethics & Data Privacy</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trust is our foundation. We are committed to the highest standards of data protection and ethical AI
            use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {principles.map((principle, index) => (
            <Card
              key={index}
              className="p-8 text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-[#008037]/20"
            >
              <div className="inline-flex p-4 rounded-full bg-[#008037]/10 mb-4">
                <principle.icon className="w-8 h-8 text-[#008037]" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{principle.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
            </Card>
          ))}
        </div>

        {/* Commitments Card */}
        <Card className="p-8 md:p-12 bg-gradient-to-br from-[#008037]/5 to-transparent border-2 border-[#008037]/20">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Our Data Protection Commitments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commitments.map((commitment, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#008037] flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{commitment}</span>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border">
                <Lock className="w-5 h-5 text-[#008037]" />
                <span className="text-sm font-medium text-foreground">SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border">
                <Shield className="w-5 h-5 text-[#008037]" />
                <span className="text-sm font-medium text-foreground">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border">
                <Heart className="w-5 h-5 text-[#008037]" />
                <span className="text-sm font-medium text-foreground">Ethically Designed</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
