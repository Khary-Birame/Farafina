"use client"

import { useTranslation } from "@/lib/hooks/use-translation"
import { Clock, MapPin, Calendar, FileText, Phone, Mail, Info } from "lucide-react"

export function VisitePracticalInfo() {
  const { t } = useTranslation()

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
              <Info className="h-4 w-4" />
              {t("visite.practical.badge", "Informations Pratiques")}
            </div>
            <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
              <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
                {t("visite.practical.title", "Informations Pratiques")}
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t("visite.practical.description", "Toutes les informations nécessaires pour préparer votre visite dans les meilleures conditions.")}
            </p>
          </div>

          {/* Info Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Horaires */}
            <div className="reveal bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-sans font-black text-2xl text-gray-900 mb-4">
                {t("visite.practical.hours.title", "Horaires de Visites")}
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">{t("visite.practical.hours.weekdays", "Lundi - Vendredi")}</p>
                <p>{t("visite.practical.hours.weekdaysTime", "9h00 - 17h00")}</p>
                <p className="font-semibold mt-4">{t("visite.practical.hours.weekend", "Samedi")}</p>
                <p>{t("visite.practical.hours.weekendTime", "9h00 - 13h00")}</p>
                <p className="text-sm text-gray-600 mt-4">
                  {t("visite.practical.hours.note", "Sur rendez-vous uniquement")}
                </p>
              </div>
            </div>

            {/* Point de Rendez-vous */}
            <div className="reveal bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-sans font-black text-2xl text-gray-900 mb-4">
                {t("visite.practical.meeting.title", "Point de Rendez-vous")}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("visite.practical.meeting.description", "Accueil à l'entrée principale de l'académie. Un membre de notre équipe vous attendra pour vous guider.")}
              </p>
              <p className="text-sm text-gray-600">
                {t("visite.practical.meeting.address", "Farafina Foot Academy, [Adresse complète]")}
              </p>
            </div>

            {/* Durée */}
            <div className="reveal bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-sans font-black text-2xl text-gray-900 mb-4">
                {t("visite.practical.duration.title", "Durée de la Visite")}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t("visite.practical.duration.description", "Une visite complète dure environ 2 à 3 heures, incluant la découverte des installations, la rencontre avec l'équipe et un échange personnalisé.")}
              </p>
            </div>

            {/* Documents */}
            <div className="reveal bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-sans font-black text-2xl text-gray-900 mb-4">
                {t("visite.practical.documents.title", "Documents")}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t("visite.practical.documents.description", "Aucun document spécifique n'est requis pour la visite. Une pièce d'identité peut être demandée à l'entrée.")}
              </p>
            </div>

            {/* Contact */}
            <div className="reveal bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl md:col-span-2 lg:col-span-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-sans font-black text-2xl text-gray-900 mb-6">
                {t("visite.practical.contact.title", "Contact Direct")}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t("visite.practical.contact.phoneLabel", "Téléphone")}</p>
                    <p className="font-bold text-gray-900">+221 XX XXX XX XX</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t("visite.practical.contact.emailLabel", "Email")}</p>
                    <p className="font-bold text-gray-900">contact@farafina.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

