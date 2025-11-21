"use client"

import { Button } from "@/components/ui/button"
import { Home, ArrowRight, Phone, Mail, Calendar } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/hooks/use-translation"

export function InternatCTA() {
  const { t } = useTranslation()

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#D4AF37] via-[#E5C158] to-[#D4AF37]">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B8941F] rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-2xl border-2 border-white/50">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full mb-6 shadow-lg">
                <Home className="w-10 h-10 text-white" />
              </div>

              <h2 className="font-sans font-black text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
                {t("internat.cta.title", "Prêt à Rejoindre l'Internat ?")}
              </h2>

              <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto">
                {t("internat.cta.description", "Contactez-nous pour une visite, une inscription ou pour toute question. Notre équipe est à votre disposition.")}
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-10">
                <Link href="#visite" className="group">
                  <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/10 rounded-2xl p-6 border-2 border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 group-hover:shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-bold text-gray-900 mb-2">
                      {t("internat.cta.visit.title", "Visite")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("internat.cta.visit.description", "Demander une visite")}
                    </div>
                  </div>
                </Link>
                <Link href="/admissions" className="group">
                  <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/10 rounded-2xl p-6 border-2 border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 group-hover:shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-bold text-gray-900 mb-2">
                      {t("internat.cta.apply.title", "Inscription")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("internat.cta.apply.description", "Inscrire un joueur")}
                    </div>
                  </div>
                </Link>
                <Link href="/contact" className="group">
                  <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/10 rounded-2xl p-6 border-2 border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 group-hover:shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-bold text-gray-900 mb-2">
                      {t("internat.cta.contact.title", "Contact")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("internat.cta.contact.description", "Nous contacter")}
                    </div>
                  </div>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/admissions">
                  <Button
                    size="lg"
                    className="group h-14 px-10 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    {t("internat.cta.primaryButton", "Demander une Visite")}
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-10 border-2 border-gray-300 text-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37] font-bold text-lg rounded-xl transition-all duration-300 bg-white"
                  >
                    {t("internat.cta.secondaryButton", "Prendre Contact")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

