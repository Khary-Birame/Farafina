"use client"

import Link from "next/link"
import { Handshake, Globe, Users, ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"

export function ContactHero() {
  const { t } = useTranslation()

  const features = [
    {
      icon: Handshake,
      label: t("contact.hero.features.partnership"),
      href: "/partners",
    },
    {
      icon: Globe,
      label: t("contact.hero.features.network"),
      href: "/international",
    },
    {
      icon: Users,
      label: t("contact.hero.features.community"),
      href: "/club-connect",
    },
  ]

  return (
    <section className="relative text-white py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#2a2a2a] to-[#1A1A1A]">
      {/* Modern Animated Background */}
      <div className="absolute inset-0">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-[#d17e00]/20 animate-pulse-glow" />

        {/* Geometric shapes */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <span className="text-sm font-medium">Contact & Partenariats</span>
          </div>

          {/* Heading */}
          <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            {t("contact.hero.title")}
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-12">
            {t("contact.hero.description")}
          </p>

          {/* Icon Features - Now as clickable links */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-12">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link
                  key={index}
                  href={feature.href}
                  className="group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-[#D4AF37]/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                    <Icon className="text-white group-hover:text-[#D4AF37] transition-colors" size={24} />
                  </div>
                  <span className="text-sm font-medium group-hover:text-[#D4AF37] transition-colors">
                    {feature.label}
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              )
            })}
          </div>

          {/* Decorative elements */}
          <div className="flex items-center justify-center gap-2 mt-12">
            <div className="w-12 h-0.5 bg-[#D4AF37]" />
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <div className="w-12 h-0.5 bg-[#D4AF37]" />
          </div>
        </div>
      </div>
    </section>
  )
}
