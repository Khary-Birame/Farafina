"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, CheckCircle2, Shield, Lock } from "lucide-react"

export function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const progress = (currentStep / totalSteps) * 100

  return (
    <section id="application-form" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-balance">
              Formulaire de candidature
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Complétez toutes les sections pour soumettre votre candidature. Vos informations sont sécurisées et
              confidentielles.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Étape {currentStep} sur {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complété</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D4AF37] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="font-sans font-semibold text-xl mb-6">Informations personnelles</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input id="firstName" placeholder="Entrez votre prénom" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input id="lastName" placeholder="Entrez votre nom" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="age">Âge *</Label>
                    <Input id="age" type="number" placeholder="Entrez votre âge" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Genre *</Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Sélectionnez le genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Masculin</SelectItem>
                        <SelectItem value="female">Féminin</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="height">Taille (cm) *</Label>
                    <Input id="height" type="number" placeholder="Ex: 175" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Poids (kg) *</Label>
                    <Input id="weight" type="number" placeholder="Ex: 70" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Pays *</Label>
                  <Select>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Sélectionnez le pays" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="senegal">Sénégal</SelectItem>
                      <SelectItem value="mali">Mali</SelectItem>
                      <SelectItem value="ivory-coast">Côte d'Ivoire</SelectItem>
                      <SelectItem value="ghana">Ghana</SelectItem>
                      <SelectItem value="nigeria">Nigeria</SelectItem>
                      <SelectItem value="cameroon">Cameroun</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Adresse e-mail *</Label>
                  <Input id="email" type="email" placeholder="votre@email.com" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Numéro de téléphone *</Label>
                    <Input id="phone" type="tel" placeholder="+221 XX XXX XX XX" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone2">Deuxième numéro de téléphone</Label>
                    <Input id="phone2" type="tel" placeholder="+221 XX XXX XX XX (Optionnel)" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Program Selection & Background */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="font-sans font-semibold text-xl mb-6">Sélection du programme et parcours</h3>

                <div className="space-y-2">
                  <Label htmlFor="program">Programme préféré *</Label>
                  <Select>
                    <SelectTrigger id="program">
                      <SelectValue placeholder="Sélectionnez le programme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="resident">Programme Résident (Temps plein)</SelectItem>
                      <SelectItem value="external">Programme Externe (Temps partiel)</SelectItem>
                      <SelectItem value="girls">Programme Féminin</SelectItem>
                      <SelectItem value="elite">Programme Élite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Poste de jeu *</Label>
                  <Select>
                    <SelectTrigger id="position">
                      <SelectValue placeholder="Sélectionnez le poste" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="goalkeeper">Gardien de but</SelectItem>
                      <SelectItem value="defender-center">Défenseur central</SelectItem>
                      <SelectItem value="defender-lateral">Défenseur latéral</SelectItem>
                      <SelectItem value="midfielder-defensive">Milieu défensif</SelectItem>
                      <SelectItem value="midfielder-central">Milieu central</SelectItem>
                      <SelectItem value="midfielder-offensive">Milieu offensif</SelectItem>
                      <SelectItem value="winger">Ailier</SelectItem>
                      <SelectItem value="forward">Attaquant</SelectItem>
                      <SelectItem value="striker">Avant-centre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Expérience footballistique (années) *</Label>
                  <Input id="experience" type="number" placeholder="Années d'expérience" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentClub">Club actuel/précédent</Label>
                  <Input id="currentClub" placeholder="Entrez le nom du club (si applicable)" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivation">Pourquoi voulez-vous rejoindre FFA ? *</Label>
                  <Textarea
                    id="motivation"
                    placeholder="Parlez-nous de vos objectifs et motivations..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardian">Nom du parent/tuteur *</Label>
                  <Input id="guardian" placeholder="Entrez le nom du parent/tuteur" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardianPhone">Téléphone du parent/tuteur *</Label>
                  <Input id="guardianPhone" type="tel" placeholder="+221 XX XXX XX XX" required />
                </div>
              </div>
            )}

            {/* Step 3: Document Upload */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="font-sans font-semibold text-xl mb-6">Télécharger les documents</h3>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-[#D4AF37] transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium mb-1">Acte de naissance *</p>
                    <p className="text-sm text-muted-foreground mb-4">PDF, JPG ou PNG (Max 5MB)</p>
                    <Button variant="outline" size="sm">
                      Choisir un fichier
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-[#D4AF37] transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium mb-1">Photo récente *</p>
                    <p className="text-sm text-muted-foreground mb-4">JPG ou PNG (Max 2MB)</p>
                    <Button variant="outline" size="sm">
                      Choisir un fichier
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-[#D4AF37] transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium mb-1">Certificat médical *</p>
                    <p className="text-sm text-muted-foreground mb-4">PDF ou JPG (Max 5MB)</p>
                    <Button variant="outline" size="sm">
                      Choisir un fichier
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-[#D4AF37] transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium mb-1">Vidéo de compétences (Optionnel)</p>
                    <p className="text-sm text-muted-foreground mb-4">MP4 ou lien YouTube (Max 50MB)</p>
                    <Button variant="outline" size="sm">
                      Choisir un fichier ou coller le lien
                    </Button>
                  </div>
                </div>

                {/* Privacy Notice */}
                <div className="bg-muted/50 border border-border rounded-lg p-4 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">Vos données sont protégées</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Tous les documents sont cryptés et stockés en toute sécurité. Nous respectons les normes
                      internationales de protection des données et ne partagerons jamais vos informations sans
                      consentement.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Précédent
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                  className="bg-[#D4AF37] hover:bg-[#d17e00] text-white"
                >
                  Étape suivante
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => {
                    alert("Votre candidature a été soumise avec succès ! Nous vous contacterons sous peu.")
                  }}
                  className="bg-[#D4AF37] hover:bg-[#d17e00] text-white"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Soumettre la candidature
                </Button>
              )}
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <span>Sécurisé par cryptage SSL</span>
          </div>
        </div>
      </div>
    </section>
  )
}
