"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, CheckCircle2, Shield, Lock, Loader2 } from "lucide-react"
import { createFormSubmission } from "@/lib/supabase/form-submissions-helpers"
import { useAuth } from "@/lib/auth/auth-context"
import { toast } from "sonner"
import { useTranslation } from "@/lib/hooks/use-translation"

export function ApplicationForm() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const totalSteps = 3

  const progress = (currentStep / totalSteps) * 100

  // État pour stocker toutes les données du formulaire
  const [formData, setFormData] = useState({
    // Étape 1
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    country: "",
    email: "",
    phone: "",
    phone2: "",
    // Étape 2
    program: "",
    position: "",
    experience: "",
    currentClub: "",
    motivation: "",
    guardian: "",
    guardianPhone: "",
    // Étape 3 (documents - pour l'instant juste les noms de fichiers)
    birthCertificate: null as File | null,
    photo: null as File | null,
    medicalCertificate: null as File | null,
    video: null as File | null,
  })

  const handleSubmitApplication = async () => {
    setIsSubmitting(true)

    try {
      const { data, error } = await createFormSubmission({
        form_type: "application",
        form_data: {
          ...formData,
          // Convertir les fichiers en noms seulement (pour l'instant)
          birthCertificate: formData.birthCertificate?.name || null,
          photo: formData.photo?.name || null,
          medicalCertificate: formData.medicalCertificate?.name || null,
          video: formData.video?.name || null,
        },
        user_id: user?.id || null,
        status: "pending",
      })

      if (error) {
        throw error
      }

      toast.success(t("admissions.submitSuccess"), {
        description: t("admissions.submitSuccessDescription"),
      })

      // Réinitialiser le formulaire
      setCurrentStep(1)
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        country: "",
        email: "",
        phone: "",
        phone2: "",
        program: "",
        position: "",
        experience: "",
        currentClub: "",
        motivation: "",
        guardian: "",
        guardianPhone: "",
        birthCertificate: null,
        photo: null,
        medicalCertificate: null,
        video: null,
      })
    } catch (error: any) {
      console.error("Erreur lors de la soumission:", error)
      toast.error(t("admissions.submitError"), {
        description: error.message || t("admissions.submitErrorDescription"),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="application-form" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-balance">
              {t("admissions.title")}
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              {t("admissions.description")}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                {t("admissions.step")} {currentStep} {t("admissions.of")} {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% {t("admissions.completed")}</span>
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
                <h3 className="font-sans font-semibold text-xl mb-6">{t("admissions.step1Title")}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("admissions.firstName")}</Label>
                    <Input id="firstName" placeholder={t("admissions.firstNamePlaceholder")} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("admissions.lastName")}</Label>
                    <Input id="lastName" placeholder={t("admissions.lastNamePlaceholder")} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="age">{t("admissions.age")}</Label>
                    <Input id="age" type="number" placeholder={t("admissions.agePlaceholder")} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">{t("admissions.gender")}</Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder={t("admissions.genderPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">{t("admissions.genders.male")}</SelectItem>
                        <SelectItem value="female">{t("admissions.genders.female")}</SelectItem>
                        <SelectItem value="other">{t("admissions.genders.other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="height">{t("admissions.height")}</Label>
                    <Input id="height" type="number" placeholder={t("admissions.heightPlaceholder")} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">{t("admissions.weight")}</Label>
                    <Input id="weight" type="number" placeholder={t("admissions.weightPlaceholder")} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">{t("admissions.country")}</Label>
                  <Select>
                    <SelectTrigger id="country">
                      <SelectValue placeholder={t("admissions.countryPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="senegal">{t("admissions.countries.senegal")}</SelectItem>
                      <SelectItem value="mali">{t("admissions.countries.mali")}</SelectItem>
                      <SelectItem value="ivory-coast">{t("admissions.countries.ivory-coast")}</SelectItem>
                      <SelectItem value="ghana">{t("admissions.countries.ghana")}</SelectItem>
                      <SelectItem value="nigeria">{t("admissions.countries.nigeria")}</SelectItem>
                      <SelectItem value="cameroon">{t("admissions.countries.cameroon")}</SelectItem>
                      <SelectItem value="other">{t("admissions.countries.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("admissions.email")}</Label>
                  <Input id="email" type="email" placeholder={t("admissions.emailPlaceholder")} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("admissions.phone")}</Label>
                    <Input id="phone" type="tel" placeholder={t("admissions.phonePlaceholder")} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone2">{t("admissions.phone2")}</Label>
                    <Input id="phone2" type="tel" placeholder={t("admissions.phone2Placeholder")} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Program Selection & Background */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="font-sans font-semibold text-xl mb-6">{t("admissions.step2Title")}</h3>

                <div className="space-y-2">
                  <Label htmlFor="program">{t("admissions.program")}</Label>
                  <Select>
                    <SelectTrigger id="program">
                      <SelectValue placeholder={t("admissions.programPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="resident">{t("admissions.programs.resident")}</SelectItem>
                      <SelectItem value="external">{t("admissions.programs.external")}</SelectItem>
                      <SelectItem value="girls">{t("admissions.programs.girls")}</SelectItem>
                      <SelectItem value="elite">{t("admissions.programs.elite")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">{t("admissions.position")}</Label>
                  <Select>
                    <SelectTrigger id="position">
                      <SelectValue placeholder={t("admissions.positionPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="goalkeeper">{t("admissions.positions.goalkeeper")}</SelectItem>
                      <SelectItem value="defender-center">{t("admissions.positions.defender-center")}</SelectItem>
                      <SelectItem value="defender-lateral">{t("admissions.positions.defender-lateral")}</SelectItem>
                      <SelectItem value="midfielder-defensive">{t("admissions.positions.midfielder-defensive")}</SelectItem>
                      <SelectItem value="midfielder-central">{t("admissions.positions.midfielder-central")}</SelectItem>
                      <SelectItem value="midfielder-offensive">{t("admissions.positions.midfielder-offensive")}</SelectItem>
                      <SelectItem value="winger">{t("admissions.positions.winger")}</SelectItem>
                      <SelectItem value="forward">{t("admissions.positions.forward")}</SelectItem>
                      <SelectItem value="striker">{t("admissions.positions.striker")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">{t("admissions.experience")}</Label>
                  <Input id="experience" type="number" placeholder={t("admissions.experiencePlaceholder")} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentClub">{t("admissions.currentClub")}</Label>
                  <Input id="currentClub" placeholder={t("admissions.currentClubPlaceholder")} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivation">{t("admissions.motivation")}</Label>
                  <Textarea
                    id="motivation"
                    placeholder={t("admissions.motivationPlaceholder")}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardian">{t("admissions.guardian")}</Label>
                  <Input id="guardian" placeholder={t("admissions.guardianPlaceholder")} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardianPhone">{t("admissions.guardianPhone")}</Label>
                  <Input id="guardianPhone" type="tel" placeholder={t("admissions.guardianPhonePlaceholder")} required />
                </div>
              </div>
            )}

            {/* Step 3: Document Upload */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="font-sans font-semibold text-xl mb-6">{t("admissions.step3Title")}</h3>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-[#D4AF37] transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium mb-1">{t("admissions.birthCertificate")}</p>
                    <p className="text-sm text-muted-foreground mb-4">{t("admissions.fileFormats.pdfJpgPng")}</p>
                    <Button variant="outline" size="sm">
                      {t("admissions.chooseFile")}
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-[#D4AF37] transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium mb-1">{t("admissions.photo")}</p>
                    <p className="text-sm text-muted-foreground mb-4">{t("admissions.fileFormats.jpgPng")}</p>
                    <Button variant="outline" size="sm">
                      {t("admissions.chooseFile")}
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-[#D4AF37] transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium mb-1">{t("admissions.medicalCertificate")}</p>
                    <p className="text-sm text-muted-foreground mb-4">{t("admissions.fileFormats.pdfJpg")}</p>
                    <Button variant="outline" size="sm">
                      {t("admissions.chooseFile")}
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-[#D4AF37] transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium mb-1">{t("admissions.video")}</p>
                    <p className="text-sm text-muted-foreground mb-4">{t("admissions.fileFormats.mp4Youtube")}</p>
                    <Button variant="outline" size="sm">
                      {t("admissions.chooseFileOrLink")}
                    </Button>
                  </div>
                </div>

                {/* Privacy Notice */}
                <div className="bg-muted/50 border border-border rounded-lg p-4 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">{t("admissions.privacyNotice")}</p>
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
                {t("common.previous")}
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                  className="bg-[#D4AF37] hover:bg-[#d17e00] text-white"
                >
                  {t("common.next")}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmitApplication}
                  disabled={isSubmitting}
                  className="bg-[#D4AF37] hover:bg-[#d17e00] text-white disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t("admissions.submitting")}
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {t("admissions.submitButton")}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
