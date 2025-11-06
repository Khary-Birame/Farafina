"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Shield, Lock, CheckCircle2 } from "lucide-react"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Login form submitted:", formData)
    // Handle login submission
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Illustration with gradient and photo */}
          <div className="hidden lg:block relative h-[600px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#008037] via-[#00a045] to-[#d4af37] opacity-90" />
            <img
              src="/african-youth-football-training-action-shot.jpg"
              alt="Football training action"
              className="w-full h-full object-cover mix-blend-overlay"
            />
            {/* Farafina Logo Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="text-white text-9xl font-bold">FFA</div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
              <div className="text-center space-y-6">
                <h2 className="font-sans font-bold text-4xl text-balance">Bienvenue à l'Excellence</h2>
                <p className="text-lg text-white/90 max-w-md mx-auto text-pretty">
                  Continuez votre parcours avec Farafina Foot Academy. Accédez à votre tableau de bord, suivez vos progrès et restez
                  connecté avec votre équipe.
                </p>
                <div className="flex items-center justify-center gap-8 pt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-sm text-white/80">Accès</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">100%</div>
                    <div className="text-sm text-white/80">Sécurisé</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm text-white/80">Utilisateurs Actifs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="font-sans font-bold text-3xl text-[#2E2E2E] mb-3">
                  Bienvenue à Farafina Foot Academy
                </h1>
                <p className="text-muted-foreground text-pretty">
                  Connectez-vous pour accéder à votre compte et continuer votre parcours.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6 mb-8 pb-8 border-b border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-[#16A34A]" />
                  <span>Sécurisé</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 text-[#16A34A]" />
                  <span>Chiffré</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Protégé</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-[#2E2E2E]">
                    Adresse Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12 transition-all duration-200 focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A]"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-[#2E2E2E]">
                    Mot de Passe
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Entrez votre mot de passe"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="h-12 pr-12 transition-all duration-200 focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-muted-foreground cursor-pointer">
                      Se souvenir de moi
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#16A34A] hover:text-[#15803D] hover:underline font-medium transition-colors"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#16A34A] hover:bg-[#15803D] text-[#ffffff] font-semibold text-base transition-all duration-200 hover:shadow-lg"
                >
                  Se Connecter
                </Button>
              </form>

              {/* Secondary Actions */}
              <div className="mt-8 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-muted-foreground">Nouveau sur Farafina ?</span>
                  </div>
                </div>
                <div className="text-center">
                  <Link
                    href="/signup"
                    className="text-sm text-[#16A34A] hover:text-[#15803D] hover:underline font-medium transition-colors"
                  >
                    Vous n'avez pas de compte ? Créez-en un
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
