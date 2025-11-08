"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { InputField, TextareaField, SelectField } from "@/components/ui/form-field"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    role: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Contact Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="font-sans font-bold text-3xl mb-2 text-[#1A1A1A]">Envoyez-nous un Message</h2>
            <p className="text-gray-600 mb-8">Nous vous répondrons dans les 24 heures.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Nom Complet"
                name="fullName"
                type="text"
                placeholder="Entrez votre nom complet"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />

              <InputField
                label="Adresse Email"
                name="email"
                type="email"
                placeholder="votre.email@exemple.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <SelectField
                label="Je suis un(e)"
                name="role"
                placeholder="Sélectionnez votre rôle"
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
                required
                options={[
                  { value: "parent", label: "Parent" },
                  { value: "recruiter", label: "Recruteur" },
                  { value: "sponsor", label: "Sponsor" },
                  { value: "media", label: "Média" },
                  { value: "other", label: "Autre" },
                ]}
              />

              <InputField
                label="Sujet"
                name="subject"
                type="text"
                placeholder="De quoi s'agit-il ?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />

              <TextareaField
                label="Message"
                name="message"
                placeholder="Parlez-nous de votre demande..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
              />

              <Button
                type="submit"
                className="w-full h-12 bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold text-base transition-all duration-200"
              >
                Envoyer le Message
              </Button>
            </form>
          </div>

          {/* Right Column - Contact Details */}
          <div className="space-y-8">
            <div>
              <h2 className="font-sans font-bold text-3xl mb-2 text-[#1A1A1A]">Contactez-nous</h2>
              <p className="text-gray-600 mb-8">Contactez-nous directement via l'un des canaux ci-dessous.</p>
            </div>

            {/* Contact Information Cards */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#1A1A1A] mb-1">Notre Localisation</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Farafina Foot Academy
                      <br />
                      Cayar, Région de Thiès
                      <br />
                      Sénégal, Afrique de l'Ouest
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#1A1A1A] mb-1">Téléphone</h3>
                    <p className="text-gray-600">+221 XX XXX XX XX</p>
                    <p className="text-sm text-gray-500 mt-1">Lun-Ven, 9h00 - 18h00 (GMT)</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#1A1A1A] mb-1">Email</h3>
                    <p className="text-gray-600">info@farafinafootacademy.com</p>
                    <p className="text-sm text-gray-500 mt-1">Nous répondrons dans les 24 heures</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-4">Suivez-nous</h3>
              <p className="text-white/90 text-sm mb-4">Restez connectés sur les réseaux sociaux</p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
