"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle } from "lucide-react"

export function NewsletterBanner() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter subscription:", email)
    setSubscribed(true)
    setTimeout(() => {
      setSubscribed(false)
      setEmail("")
    }, 3000)
  }

  return (
    <section className="py-16 bg-[#1A1A1A]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Side - Text */}
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-sans font-bold text-xl md:text-2xl text-white mb-2">Restez Informé</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Abonnez-vous à notre newsletter pour les dernières actualités, événements et opportunités.
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-auto md:min-w-96">
              {subscribed ? (
                <div className="flex items-center gap-3 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-lg px-4 py-3">
                  <CheckCircle className="text-[#D4AF37]" size={24} />
                  <span className="text-white font-medium">Abonnement réussi !</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Entrez votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Button
                    type="submit"
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#ffffff] font-semibold px-6 h-12"
                  >
                    S'abonner
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
