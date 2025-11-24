"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, CheckCircle2, User, Mail, Phone, Calendar, Clock, Users, Target, UtensilsCrossed, FileText, Shield, ArrowRight, Building2, Newspaper, Briefcase, UserCircle } from "lucide-react"
import { createFormSubmission } from "@/lib/supabase/form-submissions-helpers"
import { useAuth } from "@/lib/auth/auth-context"
import { toast } from "sonner"
import { useTranslation } from "@/lib/hooks/use-translation"
import { cn } from "@/lib/utils"

export function VisiteFormPremium() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    visitorType: "",
    fullName: "",
    playerName: "",
    playerAge: "",
    phone: "",
    email: "",
    organization: "",
    program: "",
    visitDate: "",
    visitTime: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [rgpdChecked, setRgpdChecked] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.visitorType) {
      newErrors.visitorType = t("visite.form.errors.visitorType", "Le type de visiteur est obligatoire")
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = t("visite.form.errors.fullName", "Le nom complet est obligatoire")
    }
    
    // Validation conditionnelle pour les parents
    if (formData.visitorType === "parent") {
      if (!formData.playerName.trim()) {
        newErrors.playerName = t("visite.form.errors.playerName", "Le nom du joueur est obligatoire")
      }
      if (!formData.playerAge.trim()) {
        newErrors.playerAge = t("visite.form.errors.playerAge", "L'âge est obligatoire")
      } else if (parseInt(formData.playerAge) < 8) {
        newErrors.playerAge = t("visite.form.errors.playerAgeMin", "L'âge minimum est de 8 ans")
      }
      if (!formData.program) {
        newErrors.program = t("visite.form.errors.program", "Le programme est obligatoire")
      }
    }
    
    // Validation pour les collaborateurs
    if (formData.visitorType === "collaborateur" && !formData.organization.trim()) {
      newErrors.organization = t("visite.form.errors.organization", "L'organisation est obligatoire")
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t("visite.form.errors.phone", "Le téléphone est obligatoire")
    }
    if (!formData.email.trim()) {
      newErrors.email = t("visite.form.errors.email", "L'email est obligatoire")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("visite.form.errors.emailInvalid", "L'email n'est pas valide")
    }
    if (!formData.visitDate) {
      newErrors.visitDate = t("visite.form.errors.visitDate", "La date de visite est obligatoire")
    }
    if (!formData.visitTime) {
      newErrors.visitTime = t("visite.form.errors.visitTime", "Le créneau horaire est obligatoire")
    }
    if (!rgpdChecked) {
      newErrors.rgpd = t("visite.form.errors.rgpd", "Vous devez accepter les conditions")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error(t("visite.form.errors.general", "Veuillez corriger les erreurs dans le formulaire"))
      // Scroll to first error
      const firstError = Object.keys(errors)[0]
      if (firstError) {
        const element = document.querySelector(`[name="${firstError}"]`)
        element?.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    setIsSubmitting(true)

    try {
      // 1. Sauvegarder dans Supabase
      const submissionData = {
        form_type: "visite_ffa",
        form_data: {
          visitorType: formData.visitorType,
          fullName: formData.fullName,
          organization: formData.organization || undefined,
          playerName: formData.visitorType === "parent" ? formData.playerName : undefined,
          playerAge: formData.visitorType === "parent" && formData.playerAge ? parseInt(formData.playerAge) : undefined,
          phone: formData.phone,
          email: formData.email,
          program: formData.visitorType === "parent" ? formData.program : undefined,
          visitDate: formData.visitDate,
          arrivalTime: formData.visitTime,
          visitDuration: "specific-time",
          numberOfVisitors: 1,
          visitPurpose: "discovery",
          message: formData.message,
        },
        user_id: user?.id || null,
        status: "pending",
      }

      const { data, error: submissionError } = await createFormSubmission(submissionData)
      if (submissionError) {
        console.error("Erreur sauvegarde Supabase:", submissionError)
        // On continue quand même pour essayer d'envoyer l'email
      }

      // 2. Envoyer l'email
      const emailResponse = await fetch("/api/visite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visitorType: formData.visitorType,
          fullName: formData.fullName,
          organization: formData.organization,
          email: formData.email,
          phone: formData.phone,
          playerName: formData.playerName,
          playerAge: formData.playerAge,
          program: formData.program,
          visitDate: formData.visitDate,
          visitTime: formData.visitTime,
          message: formData.message,
        }),
      })

      // Vérifier que la réponse contient du contenu avant de parser le JSON
      const contentType = emailResponse.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const text = await emailResponse.text()
        throw new Error(text || "Erreur lors de l'envoi de l'email")
      }

      let emailResult
      try {
        const text = await emailResponse.text()
        emailResult = text ? JSON.parse(text) : {}
      } catch (parseError) {
        console.error("Erreur parsing JSON:", parseError)
        throw new Error("Réponse invalide du serveur")
      }

      if (!emailResponse.ok) {
        throw new Error(emailResult.error || "Erreur lors de l'envoi de l'email")
      }

      toast.success(t("visite.form.success.title", "Demande envoyée avec succès"), {
        description: t("visite.form.success.description", "Vous recevrez une confirmation par email."),
      })

      setIsSubmitted(true)
      setFormData({
        visitorType: "",
        fullName: "",
        playerName: "",
        playerAge: "",
        phone: "",
        email: "",
        organization: "",
        program: "",
        visitDate: "",
        visitTime: "",
        message: "",
      })
      setRgpdChecked(false)
      setErrors({})

      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error: any) {
      console.error("Erreur lors de l'envoi de la demande:", error)
      toast.error(t("visite.form.errors.submit", "Erreur lors de l'envoi"), {
        description: error.message || t("visite.form.errors.retry", "Veuillez réessayer plus tard."),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-3xl p-12 border-2 border-[#D4AF37]/30 shadow-2xl">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h3 className="font-sans font-black text-3xl text-gray-900 mb-4">
            {t("visite.form.success.title", "Demande envoyée avec succès !")}
          </h3>
          <p className="text-lg text-gray-700 mb-8">
            {t("visite.form.success.description", "Vous recevrez une confirmation par email dans les prochaines heures.")}
          </p>
          <p className="text-sm text-gray-600">
            {t("visite.form.success.note", "Notre équipe vous contactera pour confirmer votre visite.")}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div id="formulaire" className="bg-white rounded-3xl p-8 lg:p-12 border-2 border-gray-200 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 rounded-full px-4 py-2 mb-6">
          <FileText className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-sm font-bold text-[#D4AF37]">
            {t("visite.form.badge", "Formulaire de Visite")}
          </span>
        </div>
        <h2 className="font-sans font-black text-3xl md:text-4xl text-gray-900 mb-4">
          {t("visite.form.title", "Demander une Visite")}
        </h2>
        <p className="text-gray-700 text-lg">
          {t("visite.form.description", "Remplissez ce formulaire et notre équipe vous contactera pour confirmer votre visite.")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 0: Type de Visiteur */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-sans font-black text-2xl text-gray-900">
              {t("visite.form.section0.title", "Type de Visiteur")}
            </h3>
          </div>

          <div className="space-y-2">
            <Label htmlFor="visitorType" className="text-sm font-bold text-gray-900">
              {t("visite.form.section0.visitorType", "Je suis")} <span className="text-[#D4AF37]">*</span>
            </Label>
            <Select
              value={formData.visitorType}
              onValueChange={(value) => {
                setFormData({ 
                  ...formData, 
                  visitorType: value,
                  // Réinitialiser les champs conditionnels si on change de type
                  playerName: value !== "parent" ? "" : formData.playerName,
                  playerAge: value !== "parent" ? "" : formData.playerAge,
                  program: value !== "parent" ? "" : formData.program,
                  organization: value !== "collaborateur" ? "" : formData.organization,
                })
                if (errors.visitorType) setErrors({ ...errors, visitorType: "" })
              }}
            >
              <SelectTrigger
                id="visitorType"
                name="visitorType"
                className={cn(
                  "h-12 text-base",
                  errors.visitorType && "border-gray-400 focus:border-gray-500 focus:ring-gray-500"
                )}
              >
                <SelectValue placeholder={t("visite.form.section0.visitorTypePlaceholder", "Sélectionnez votre profil")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="parent">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {t("visite.form.section0.typeParent", "Parent (avec enfant/joueur)")}
                  </div>
                </SelectItem>
                <SelectItem value="collaborateur">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {t("visite.form.section0.typeCollaborateur", "Collaborateur/Partenaire")}
                  </div>
                </SelectItem>
                <SelectItem value="joueur">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    {t("visite.form.section0.typeJoueur", "Joueur (adulte)")}
                  </div>
                </SelectItem>
                <SelectItem value="media">
                  <div className="flex items-center gap-2">
                    <Newspaper className="w-4 h-4" />
                    {t("visite.form.section0.typeMedia", "Média/Journaliste")}
                  </div>
                </SelectItem>
                <SelectItem value="investisseur">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {t("visite.form.section0.typeInvestisseur", "Investisseur")}
                  </div>
                </SelectItem>
                <SelectItem value="autre">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t("visite.form.section0.typeAutre", "Autre")}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.visitorType && (
              <p className="text-sm text-gray-600">{errors.visitorType}</p>
            )}
          </div>
        </div>

        {/* Section 1: Informations Personnelles */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-sans font-black text-2xl text-gray-900">
              {t("visite.form.section1.title", "Informations Personnelles")}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-bold text-gray-900">
                {t("visite.form.section1.fullName", "Nom et Prénom")} <span className="text-[#D4AF37]">*</span>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder={t("visite.form.section1.fullNamePlaceholder", "Votre nom complet")}
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value })
                  if (errors.fullName) setErrors({ ...errors, fullName: "" })
                }}
                className={cn(
                  "h-12 text-base",
                  errors.fullName && "border-gray-400 focus:border-gray-500 focus:ring-gray-500"
                )}
              />
              {errors.fullName && (
                <p className="text-sm text-gray-600">{errors.fullName}</p>
              )}
            </div>

            {formData.visitorType === "collaborateur" && (
              <div className="space-y-2">
                <Label htmlFor="organization" className="text-sm font-bold text-gray-900">
                  {t("visite.form.section1.organization", "Organisation")} <span className="text-[#D4AF37]">*</span>
                </Label>
                <Input
                  id="organization"
                  name="organization"
                  type="text"
                  placeholder={t("visite.form.section1.organizationPlaceholder", "Nom de votre organisation")}
                  value={formData.organization}
                  onChange={(e) => {
                    setFormData({ ...formData, organization: e.target.value })
                    if (errors.organization) setErrors({ ...errors, organization: "" })
                  }}
                  className={cn(
                    "h-12 text-base",
                    errors.organization && "border-gray-400 focus:border-gray-500 focus:ring-gray-500"
                  )}
                />
                {errors.organization && (
                  <p className="text-sm text-gray-600">{errors.organization}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-gray-900">
                {t("visite.form.section1.email", "Email")} <span className="text-[#D4AF37]">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("visite.form.section1.emailPlaceholder", "votre.email@exemple.com")}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value })
                    if (errors.email) setErrors({ ...errors, email: "" })
                  }}
                  className={cn(
                    "h-12 text-base pl-10",
                    errors.email && "border-gray-400 focus:border-gray-500 focus:ring-gray-500"
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-gray-600">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="phone" className="text-sm font-bold text-gray-900">
                {t("visite.form.section1.phone", "Téléphone")} <span className="text-[#D4AF37]">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t("visite.form.section1.phonePlaceholder", "+221 763171202")}
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value })
                    if (errors.phone) setErrors({ ...errors, phone: "" })
                  }}
                  className={cn(
                    "h-12 text-base pl-10",
                    errors.phone && "border-gray-400 focus:border-gray-500 focus:ring-gray-500"
                  )}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-gray-600">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Informations Joueur (conditionnelle) */}
        {formData.visitorType === "parent" && (
          <div className="space-y-6 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3 pb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-sans font-black text-2xl text-gray-900">
                {t("visite.form.section2.title", "Informations du Joueur")}
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="playerName" className="text-sm font-bold text-gray-900">
                  {t("visite.form.section2.playerName", "Nom du Joueur")} <span className="text-[#D4AF37]">*</span>
                </Label>
                <Input
                  id="playerName"
                  name="playerName"
                  type="text"
                  placeholder={t("visite.form.section2.playerNamePlaceholder", "Nom complet du joueur")}
                  value={formData.playerName}
                  onChange={(e) => {
                    setFormData({ ...formData, playerName: e.target.value })
                    if (errors.playerName) setErrors({ ...errors, playerName: "" })
                  }}
                  className={cn(
                    "h-12 text-base",
                    errors.playerName && "border-gray-400 focus:border-gray-500 focus:ring-gray-500"
                  )}
                />
                {errors.playerName && (
                  <p className="text-sm text-gray-600">{errors.playerName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="playerAge" className="text-sm font-bold text-gray-900">
                  {t("visite.form.section2.playerAge", "Âge")} <span className="text-[#D4AF37]">*</span>
                </Label>
                <Input
                  id="playerAge"
                  name="playerAge"
                  type="number"
                  min="8"
                  placeholder={t("visite.form.section2.playerAgePlaceholder", "Âge du joueur")}
                  value={formData.playerAge}
                  onChange={(e) => {
                    setFormData({ ...formData, playerAge: e.target.value })
                    if (errors.playerAge) setErrors({ ...errors, playerAge: "" })
                  }}
                  className={cn(
                    "h-12 text-base",
                    errors.playerAge && "border-gray-400 focus:border-gray-500 focus:ring-gray-500"
                  )}
                />
                {errors.playerAge && (
                  <p className="text-sm text-gray-600">{errors.playerAge}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Détails de la Visite */}
        <div className="space-y-6 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-3 pb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-sans font-black text-2xl text-gray-900">
              {t("visite.form.section3.title", "Détails de la Visite")}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {formData.visitorType === "parent" && (
              <div className="space-y-2">
                <Label htmlFor="program" className="text-sm font-bold text-gray-900">
                  {t("visite.form.section3.program", "Programme Concerné")} <span className="text-[#D4AF37]">*</span>
                </Label>
                <Select
                  value={formData.program}
                  onValueChange={(value) => {
                    setFormData({ ...formData, program: value })
                    if (errors.program) setErrors({ ...errors, program: "" })
                  }}
                >
                  <SelectTrigger
                    id="program"
                    name="program"
                    className={cn(
                      "h-12 text-base",
                      errors.program && "border-gray-400 focus:border-gray-500 focus:ring-gray-500"
                    )}
                  >
                    <SelectValue placeholder={t("visite.form.section3.programPlaceholder", "Sélectionnez un programme")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internat">{t("visite.form.section3.programInternat", "Internat")}</SelectItem>
                    <SelectItem value="externe">{t("visite.form.section3.programExterne", "Externe")}</SelectItem>
                    <SelectItem value="resident">{t("visite.form.section3.programResident", "Résident")}</SelectItem>
                    <SelectItem value="all">{t("visite.form.section3.programAll", "Tous les programmes")}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.program && (
                  <p className="text-sm text-gray-600">{errors.program}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="visitDate" className="text-sm font-bold text-gray-900">
                {t("visite.form.section3.visitDate", "Date Souhaitée")} <span className="text-[#D4AF37]">*</span>
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="visitDate"
                  name="visitDate"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.visitDate}
                  onChange={(e) => {
                    setFormData({ ...formData, visitDate: e.target.value })
                    if (errors.visitDate) setErrors({ ...errors, visitDate: "" })
                  }}
                  className={cn(
                    "h-12 text-base pl-10",
                    errors.visitDate && "border-gray-400 focus:border-gray-500 focus:ring-gray-500"
                  )}
                />
              </div>
              {errors.visitDate && (
                <p className="text-sm text-gray-600">{errors.visitDate}</p>
              )}
            </div>

            <div className={cn("space-y-2", formData.visitorType === "parent" ? "md:col-span-1" : "md:col-span-2")}>
              <Label htmlFor="visitTime" className="text-sm font-bold text-gray-900">
                {t("visite.form.section3.visitTime", "Créneau Horaire Préféré")} <span className="text-[#D4AF37]">*</span>
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Select
                  value={formData.visitTime}
                  onValueChange={(value) => {
                    setFormData({ ...formData, visitTime: value })
                    if (errors.visitTime) setErrors({ ...errors, visitTime: "" })
                  }}
                >
                  <SelectTrigger
                    id="visitTime"
                    name="visitTime"
                    className={cn(
                      "h-12 text-base pl-10",
                      errors.visitTime && "border-gray-400 focus:border-gray-500 focus:ring-gray-500"
                    )}
                  >
                    <SelectValue placeholder={t("visite.form.section3.visitTimePlaceholder", "Sélectionnez un créneau")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">{t("visite.form.section3.time1", "09:00 - 10:00")}</SelectItem>
                    <SelectItem value="10:00">{t("visite.form.section3.time2", "10:00 - 11:00")}</SelectItem>
                    <SelectItem value="11:00">{t("visite.form.section3.time3", "11:00 - 12:00")}</SelectItem>
                    <SelectItem value="14:00">{t("visite.form.section3.time4", "14:00 - 15:00")}</SelectItem>
                    <SelectItem value="15:00">{t("visite.form.section3.time5", "15:00 - 16:00")}</SelectItem>
                    <SelectItem value="16:00">{t("visite.form.section3.time6", "16:00 - 17:00")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors.visitTime && (
                <p className="text-sm text-gray-600">{errors.visitTime}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="message" className="text-sm font-bold text-gray-900">
                {t("visite.form.section3.message", "Message / Précisions")} <span className="text-gray-500 text-xs">({t("visite.form.section3.messageOptional", "optionnel")})</span>
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder={t("visite.form.section3.messagePlaceholder", "Ajoutez des précisions sur votre visite (optionnel)")}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="text-base resize-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: RGPD */}
        <div className="space-y-6 pt-8 border-t border-gray-200">
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
            <Checkbox
              id="rgpd"
              checked={rgpdChecked}
              onCheckedChange={(checked) => {
                setRgpdChecked(checked as boolean)
                if (errors.rgpd) setErrors({ ...errors, rgpd: "" })
              }}
              className="mt-1"
            />
            <Label htmlFor="rgpd" className="text-sm text-gray-700 leading-relaxed cursor-pointer flex-1">
              {t("visite.form.rgpd.text", "J'accepte que mes données personnelles soient utilisées pour traiter ma demande de visite et me recontacter. ")}
              <span className="text-[#D4AF37]">*</span>
            </Label>
          </div>
          {errors.rgpd && (
            <p className="text-sm text-gray-600 ml-6">{errors.rgpd}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-8">
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="group w-full h-16 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                {t("visite.form.submitting", "Envoi en cours...")}
              </>
            ) : (
              <>
                {t("visite.form.submit", "Envoyer la Demande")}
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

