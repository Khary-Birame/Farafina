"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { InputField, TextareaField, SelectField } from "@/components/ui/form-field"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, CheckCircle2, User, Mail, Phone, Calendar, Clock, Users, Target, UtensilsCrossed, FileText } from "lucide-react"
import { createFormSubmission } from "@/lib/supabase/form-submissions-helpers"
import { useAuth } from "@/lib/auth/auth-context"
import { toast } from "sonner"
import { useTranslation } from "@/lib/hooks/use-translation"

export function VisiteFFAForm() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    visitDate: "",
    arrivalTime: "",
    visitDuration: "full-day", // "full-day" | "specific-time"
    departureTime: "",
    numberOfVisitors: "",
    visitPurpose: "",
    visitPurposeOther: "",
    lunchOnSite: "no", // "yes" | "no"
    dietaryRestrictions: "",
    programRequest: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [confirmChecked, setConfirmChecked] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Le nom et prénom sont obligatoires"
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est obligatoire"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est obligatoire"
    }
    if (!formData.visitDate) {
      newErrors.visitDate = "La date de visite est obligatoire"
    }
    if (!formData.arrivalTime) {
      newErrors.arrivalTime = "L'heure d'arrivée est obligatoire"
    }
    if (formData.visitDuration === "specific-time" && !formData.departureTime) {
      newErrors.departureTime = "L'heure de départ est obligatoire"
    }
    if (!formData.numberOfVisitors || parseInt(formData.numberOfVisitors) < 1) {
      newErrors.numberOfVisitors = "Le nombre de visiteurs doit être au moins 1"
    }
    if (!formData.visitPurpose) {
      newErrors.visitPurpose = "L'objet de la visite est obligatoire"
    }
    if (formData.visitPurpose === "other" && !formData.visitPurposeOther.trim()) {
      newErrors.visitPurposeOther = "Veuillez préciser l'objet de la visite"
    }
    if (formData.lunchOnSite === "yes" && !formData.dietaryRestrictions.trim()) {
      // Les restrictions alimentaires sont optionnelles même si déjeuner = oui
    }
    if (!confirmChecked) {
      newErrors.confirm = "Vous devez confirmer que les informations sont exactes"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs dans le formulaire")
      return
    }

    setIsSubmitting(true)

    try {
      const submissionData = {
        form_type: "visite_ffa",
        form_data: {
          ...formData,
          numberOfVisitors: parseInt(formData.numberOfVisitors),
        },
        user_id: user?.id || null,
        status: "pending",
      }

      const { data, error } = await createFormSubmission(submissionData)

      if (error) {
        throw error
      }

      toast.success("Votre demande de visite a été envoyée", {
        description: "Vous recevrez une confirmation par email.",
      })

      setIsSubmitted(true)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        visitDate: "",
        arrivalTime: "",
        visitDuration: "full-day",
        departureTime: "",
        numberOfVisitors: "",
        visitPurpose: "",
        visitPurposeOther: "",
        lunchOnSite: "no",
        dietaryRestrictions: "",
        programRequest: "",
      })
      setConfirmChecked(false)
      setErrors({})

      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error: any) {
      console.error("Erreur lors de l'envoi de la demande:", error)
      toast.error("Erreur lors de l'envoi", {
        description: error.message || "Veuillez réessayer plus tard.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header du formulaire */}
      <div className="text-center mb-8">
        <h2 className="font-sans font-bold text-2xl md:text-3xl text-foreground mb-2">
          Formulaire de Visite
        </h2>
        <p className="text-muted-foreground">
          Veuillez remplir tous les champs obligatoires pour planifier votre visite
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Informations Personnelles */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
              <User className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-sans font-semibold text-xl text-foreground">Informations Personnelles</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="Nom et Prénom"
              name="fullName"
              type="text"
              placeholder="Entrez votre nom complet"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              error={errors.fullName}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="votre.email@exemple.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              error={errors.email}
            />
            <InputField
              label="Téléphone"
              name="phone"
              type="tel"
              placeholder="+221 XX XXX XX XX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              error={errors.phone}
              className="md:col-span-2"
            />
          </div>
        </div>

        {/* Section 2: Détails de la Visite */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-sans font-semibold text-xl text-foreground">Détails de la Visite</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="Date de visite"
              name="visitDate"
              type="date"
              value={formData.visitDate}
              onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
              required
              error={errors.visitDate}
            />
            <InputField
              label="Heure d'arrivée"
              name="arrivalTime"
              type="time"
              value={formData.arrivalTime}
              onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
              required
              error={errors.arrivalTime}
            />

            {/* Durée de la visite */}
            <div className="space-y-2 md:col-span-2">
              <Label className="text-sm font-medium text-foreground">
                Durée de la visite <span className="text-[#D4AF37] ml-1">*</span>
              </Label>
              <RadioGroup
                value={formData.visitDuration}
                onValueChange={(value) =>
                  setFormData({ ...formData, visitDuration: value as "full-day" | "specific-time" })
                }
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="full-day" id="full-day" />
                  <Label htmlFor="full-day" className="font-normal cursor-pointer flex-1">
                    Passe la journée complète
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="specific-time" id="specific-time" />
                  <Label htmlFor="specific-time" className="font-normal cursor-pointer flex-1">
                    Vient à une heure précise
                  </Label>
                </div>
              </RadioGroup>
              {formData.visitDuration === "specific-time" && (
                <div className="mt-4">
                  <InputField
                    label="Heure de départ"
                    name="departureTime"
                    type="time"
                    value={formData.departureTime}
                    onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                    required
                    error={errors.departureTime}
                  />
                </div>
              )}
            </div>

            {/* Nombre de visiteurs */}
            <InputField
              label="Nombre total de personnes"
              name="numberOfVisitors"
              type="number"
              placeholder="1"
              value={formData.numberOfVisitors}
              onChange={(e) => setFormData({ ...formData, numberOfVisitors: e.target.value })}
              required
              error={errors.numberOfVisitors}
              className="md:col-span-2"
            />
          </div>
        </div>

        {/* Section 3: Objet de la Visite */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-sans font-semibold text-xl text-foreground">Objet de la Visite</h3>
          </div>
          <div className="space-y-6">
            <SelectField
              label="Objet de la visite"
              name="visitPurpose"
              placeholder="Sélectionnez un objet"
              value={formData.visitPurpose}
              onValueChange={(value) => setFormData({ ...formData, visitPurpose: value })}
              required
              error={errors.visitPurpose}
              options={[
                { value: "discovery", label: "Découverte FFA" },
                { value: "campus", label: "Visite du campus" },
                { value: "administrative", label: "Rencontre administrative" },
                { value: "other", label: "Autre" },
              ]}
            />

            {formData.visitPurpose === "other" && (
              <TextareaField
                label="Précisez l'objet de la visite"
                name="visitPurposeOther"
                placeholder="Décrivez l'objet de votre visite"
                value={formData.visitPurposeOther}
                onChange={(e) => setFormData({ ...formData, visitPurposeOther: e.target.value })}
                required
                error={errors.visitPurposeOther}
                rows={3}
              />
            )}
          </div>
        </div>

        {/* Section 4: Logistique */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h3 className="font-sans font-semibold text-xl text-foreground">Logistique</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Déjeuner sur place ? <span className="text-[#D4AF37] ml-1">*</span>
              </Label>
              <RadioGroup
                value={formData.lunchOnSite}
                onValueChange={(value) => setFormData({ ...formData, lunchOnSite: value as "yes" | "no" })}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="yes" id="lunch-yes" />
                  <Label htmlFor="lunch-yes" className="font-normal cursor-pointer flex-1">
                    Oui
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="no" id="lunch-no" />
                  <Label htmlFor="lunch-no" className="font-normal cursor-pointer flex-1">
                    Non
                  </Label>
                </div>
              </RadioGroup>
              {formData.lunchOnSite === "yes" && (
                <div className="mt-4">
                  <TextareaField
                    label="Allergies / Restrictions alimentaires"
                    name="dietaryRestrictions"
                    placeholder="Indiquez vos allergies ou restrictions alimentaires (optionnel)"
                    value={formData.dietaryRestrictions}
                    onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                    rows={3}
                  />
                </div>
              )}
            </div>

            {/* Programme souhaité (optionnel) */}
            <TextareaField
              label="Programme souhaité (optionnel)"
              name="programRequest"
              placeholder="Ex: visite de classes, rencontre équipe pédagogique, etc."
              value={formData.programRequest}
              onChange={(e) => setFormData({ ...formData, programRequest: e.target.value })}
              rows={4}
            />
          </div>
        </div>

        {/* Section 5: Validation et Soumission */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
          <div className="space-y-6">
            {/* Checkbox de validation */}
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border">
                <Checkbox
                  id="confirm"
                  checked={confirmChecked}
                  onCheckedChange={(checked) => {
                    setConfirmChecked(checked as boolean)
                    if (errors.confirm) {
                      setErrors({ ...errors, confirm: "" })
                    }
                  }}
                  className="mt-1"
                />
                <Label htmlFor="confirm" className="text-sm text-foreground leading-relaxed cursor-pointer flex-1">
                  Je confirme que les informations fournies sont exactes. <span className="text-[#D4AF37]">*</span>
                </Label>
              </div>
              {errors.confirm && (
                <div className="flex items-center gap-1.5 text-sm text-destructive ml-7">
                  <span>{errors.confirm}</span>
                </div>
              )}
            </div>

            {/* Bouton Submit */}
            {isSubmitted ? (
              <div className="flex items-center justify-center gap-3 p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div className="text-center">
                  <p className="text-base font-semibold text-green-800 dark:text-green-200 mb-1">
                    Demande envoyée avec succès !
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Vous recevrez une confirmation par email.
                  </p>
                </div>
              </div>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold h-14 text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-5 w-5" />
                    Envoyer la demande de visite
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

