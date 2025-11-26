"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, CheckCircle2, Lock, Loader2, X, FileCheck } from "lucide-react"
import { submitApplication, validateApplicationData } from "@/lib/supabase/application-helpers"
import { useAuth } from "@/lib/auth/auth-context"
import { toast } from "sonner"
import { useTranslation } from "@/lib/hooks/use-translation"
import { compressPhoto, compressDocumentImage } from "@/lib/utils/image-compression"
import { fetchWithTimeout } from "@/lib/utils/fetch-with-timeout"

export function ApplicationForm() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
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
    // Étape 3 (documents)
    birthCertificate: null as File | null,
    photo: null as File | null,
    medicalCertificate: null as File | null,
    video: null as File | null,
  })

  // Fonction pour mettre à jour un champ
  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Effacer l'erreur pour ce champ
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Gestion des fichiers
  const handleFileChange = (field: "birthCertificate" | "photo" | "medicalCertificate" | "video", file: File | null) => {
    updateField(field, file)
  }

  // Validation avant de passer à l'étape suivante
  const validateStep = (step: number): boolean => {
    const stepErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.firstName.trim()) stepErrors.firstName = t("admissions.errors.firstName", "Le prénom est requis")
      if (!formData.lastName.trim()) stepErrors.lastName = t("admissions.errors.lastName", "Le nom est requis")
      if (!formData.age || parseInt(formData.age) < 8) {
        stepErrors.age = t("admissions.errors.age", "L'âge doit être de 8 ans ou plus")
      }
      if (!formData.gender) stepErrors.gender = t("admissions.errors.gender", "Le genre est requis")
      if (!formData.height || parseFloat(formData.height) <= 0) {
        stepErrors.height = t("admissions.errors.height", "La taille est requise")
      }
      if (!formData.weight || parseFloat(formData.weight) <= 0) {
        stepErrors.weight = t("admissions.errors.weight", "Le poids est requis")
      }
      if (!formData.country) stepErrors.country = t("admissions.errors.country", "Le pays est requis")
      if (!formData.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        stepErrors.email = t("admissions.errors.email", "Un email valide est requis")
      }
      if (!formData.phone?.trim()) stepErrors.phone = t("admissions.errors.phone", "Le téléphone est requis")
    }

    if (step === 2) {
      if (!formData.program) stepErrors.program = t("admissions.errors.program", "Le programme est requis")
      if (!formData.position) stepErrors.position = t("admissions.errors.position", "La position est requise")
      if (!formData.experience || parseInt(formData.experience) < 0) {
        stepErrors.experience = t("admissions.errors.experience", "L'expérience est requise")
      }
      if (!formData.motivation?.trim() || formData.motivation.length < 50) {
        stepErrors.motivation = t("admissions.errors.motivation", "La motivation doit contenir au moins 50 caractères")
      }
      if (!formData.guardian?.trim()) {
        stepErrors.guardian = t("admissions.errors.guardian", "Le nom du tuteur est requis")
      }
      if (!formData.guardianPhone?.trim()) {
        stepErrors.guardianPhone = t("admissions.errors.guardianPhone", "Le téléphone du tuteur est requis")
      }
    }

    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(totalSteps, currentStep + 1))
    } else {
      toast.error(t("admissions.validationError", "Veuillez corriger les erreurs avant de continuer"))
    }
  }

  const handleSubmitApplication = async () => {
    setIsSubmitting(true)
    setErrors({})
    
    // Variable pour stocker le timeout client (définie au niveau de la fonction)
    let clientTimeout: NodeJS.Timeout | null = null

    try {
      // Validation finale des champs texte
      const validation = validateApplicationData(formData)
      const allErrors: Record<string, string> = { ...validation.errors }

      // Validation des fichiers obligatoires
      if (!formData.birthCertificate) {
        allErrors.birthCertificate = t("admissions.errors.birthCertificate", "L'acte de naissance est requis")
      }

      if (!formData.photo) {
        allErrors.photo = t("admissions.errors.photo", "La photo est requise")
      }

      if (!formData.medicalCertificate) {
        allErrors.medicalCertificate = t("admissions.errors.medicalCertificate", "Le certificat médical est requis")
      }

      // Si des erreurs existent
      if (Object.keys(allErrors).length > 0) {
        setErrors(allErrors)

        // Déterminer l'étape contenant la première erreur
        const errorFields = Object.keys(allErrors)
        let errorStep = 1

        if (errorFields.some(field => ['program', 'position', 'experience', 'motivation', 'guardian', 'guardianPhone'].includes(field))) {
          errorStep = 2
        } else if (errorFields.some(field => ['birthCertificate', 'photo', 'medicalCertificate'].includes(field))) {
          errorStep = 3
        }

        // Aller à l'étape contenant l'erreur
        setCurrentStep(errorStep)

        // Créer un message d'erreur détaillé
        const errorCount = errorFields.length
        const firstError = allErrors[errorFields[0]]
        const errorMessage = errorCount === 1
          ? `1 erreur détectée : ${firstError}`
          : `${errorCount} erreurs détectées. Veuillez vérifier les champs marqués en rouge ci-dessous.`

        toast.error(t("admissions.validationError", "Erreurs de validation"), {
          description: errorMessage,
          duration: 6000,
        })

        // Faire défiler vers le premier champ en erreur après un court délai
        setTimeout(() => {
          const firstErrorField = errorFields[0]
          const errorElement = document.getElementById(firstErrorField)
          if (errorElement) {
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            errorElement.focus()
          } else {
            // Si c'est un fichier, faire défiler vers le label
            const labelElement = document.querySelector(`label[for="${firstErrorField}"]`)
            if (labelElement) {
              labelElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
          }
        }, 100)

        setIsSubmitting(false)
        return
      }

      // Afficher un message de progression clair et rassurant avec timeout visible
      toast.info("📤 Soumission en cours...", {
        description: "Veuillez patienter pendant le téléchargement de vos fichiers. ⏳ Cela peut prendre jusqu'à 2 minutes selon la taille de vos fichiers et votre connexion. Ne fermez pas cette page.",
        duration: 20000,
      })
      
      // Ajouter un timeout de sécurité côté client pour éviter les blocages infinis
      clientTimeout = setTimeout(() => {
        if (isSubmitting) {
          setIsSubmitting(false)
          toast.error("⏱️ Timeout de sécurité", {
            description: "La soumission prend trop de temps. Veuillez vérifier votre connexion internet et réessayer. Si le problème persiste, réduisez la taille de vos fichiers (notamment la vidéo).",
            duration: 10000,
          })
        }
      }, 150000) // 2,5 minutes côté client (légèrement plus que le timeout serveur)

      // Compression des images avant upload (optimisation mobile)
      setUploadProgress({ compression: 10 })
      toast.info("🖼️ Compression des images...", {
        description: "Optimisation des fichiers pour un upload plus rapide.",
        duration: 5000,
      })

      let compressedFiles = {
        birthCertificate: formData.birthCertificate,
        photo: formData.photo,
        medicalCertificate: formData.medicalCertificate,
        video: formData.video,
      }

      // Compresser les images (pas les PDF ni les vidéos)
      if (formData.photo && formData.photo.type.startsWith('image/')) {
        try {
          setUploadProgress({ compression: 30 })
          compressedFiles.photo = await compressPhoto(formData.photo)
          console.log(`[ApplicationForm] Photo compressée: ${formData.photo.size} → ${compressedFiles.photo.size} bytes`)
        } catch (error) {
          console.warn("Erreur compression photo, utilisation du fichier original:", error)
        }
      }

      if (formData.birthCertificate && formData.birthCertificate.type.startsWith('image/')) {
        try {
          setUploadProgress({ compression: 50 })
          compressedFiles.birthCertificate = await compressDocumentImage(formData.birthCertificate)
          console.log(`[ApplicationForm] Acte de naissance compressé: ${formData.birthCertificate.size} → ${compressedFiles.birthCertificate.size} bytes`)
        } catch (error) {
          console.warn("Erreur compression acte de naissance, utilisation du fichier original:", error)
        }
      }

      if (formData.medicalCertificate && formData.medicalCertificate.type.startsWith('image/')) {
        try {
          setUploadProgress({ compression: 70 })
          compressedFiles.medicalCertificate = await compressDocumentImage(formData.medicalCertificate)
          console.log(`[ApplicationForm] Certificat médical compressé: ${formData.medicalCertificate.size} → ${compressedFiles.medicalCertificate.size} bytes`)
        } catch (error) {
          console.warn("Erreur compression certificat médical, utilisation du fichier original:", error)
        }
      }

      setUploadProgress({ compression: 100 })
      toast.info("✅ Compression terminée, début de l'upload...", {
        duration: 3000,
      })

      // Soumettre la candidature avec upload des fichiers compressés
      // Wrapper dans un try-catch pour gérer les timeouts
      let result
      try {
        result = await submitApplication(
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age,
          gender: formData.gender,
          height: formData.height,
          weight: formData.weight,
          country: formData.country,
          email: formData.email,
          phone: formData.phone,
          phone2: formData.phone2 || undefined,
          program: formData.program,
          position: formData.position,
          experience: formData.experience,
          currentClub: formData.currentClub || undefined,
          motivation: formData.motivation,
          guardian: formData.guardian,
          guardianPhone: formData.guardianPhone,
        },
        {
          birthCertificate: compressedFiles.birthCertificate,
          photo: compressedFiles.photo,
          medicalCertificate: compressedFiles.medicalCertificate,
          video: compressedFiles.video,
        },
        user?.id || null
        )
        
        // Annuler le timeout client si la soumission réussit
        clearTimeout(clientTimeout)
      } catch (uploadError: any) {
        clearTimeout(clientTimeout)
        // Si c'est un timeout d'upload, lancer une erreur claire
        if (uploadError.message?.includes("trop de temps") || uploadError.message?.includes("timeout")) {
          throw {
            code: "UPLOAD_TIMEOUT",
            message: uploadError.message || "Le téléchargement des fichiers prend trop de temps. Veuillez vérifier votre connexion internet et réessayer avec des fichiers plus petits."
          }
        }
        throw uploadError
      }

      if (result.error) {
        clearTimeout(clientTimeout)
        throw result.error
      }

      if (!result.data) {
        throw new Error("Erreur : la candidature n'a pas pu être créée. Veuillez réessayer.")
      }

      // Type assertion pour accéder à l'id
      const applicationData = result.data as { id: string }
      if (!applicationData.id) {
        throw new Error("Erreur : la candidature n'a pas pu être créée. Veuillez réessayer.")
      }

      const applicationId = applicationData.id

      // Envoyer les emails (admin + accusé de réception)
      // Utiliser fetchWithTimeout pour éviter les blocages sur mobile
      // Timeout de 25 secondes (Vercel limite à 10s sur gratuit, mais on laisse une marge)
      try {
        const emailResponse = await fetchWithTimeout("/api/application", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            program: formData.program,
            position: formData.position,
            age: formData.age,
            country: formData.country,
            applicationId: applicationId,
          }),
          timeout: 25000, // 25 secondes (Vercel limite à 10s, mais on essaie quand même)
        })

        // Vérifier que la réponse contient du contenu avant de parser le JSON
        const contentType = emailResponse.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          const text = await emailResponse.text()
          console.warn("⚠️ Réponse email non-JSON:", text)
          // On continue même si l'email échoue, la candidature est déjà sauvegardée
        } else {
          let emailResult
          try {
            const text = await emailResponse.text()
            emailResult = text ? JSON.parse(text) : {}
          } catch (parseError) {
            console.error("Erreur parsing JSON:", parseError)
            // On continue même si l'email échoue
          }

          if (!emailResponse.ok) {
            console.warn("⚠️ Erreur lors de l'envoi de l'email:", emailResult.error)
            // On continue même si l'email échoue, la candidature est déjà sauvegardée
          } else {
            console.log("✅ Emails envoyés avec succès")
          }
        }
      } catch (emailError: any) {
        console.error("⚠️ Erreur lors de l'envoi de l'email (non bloquant):", emailError)
        
        // Afficher un avertissement si c'est un timeout, mais ne pas bloquer
        if (emailError.message?.includes("timeout") || emailError.message?.includes("trop de temps")) {
          toast.warning("Candidature sauvegardée", {
            description: "Votre candidature a été enregistrée avec succès, mais l'email de confirmation n'a pas pu être envoyé immédiatement. Vous recevrez un email de confirmation sous peu.",
            duration: 8000,
          })
        }
        // On continue même si l'email échoue, la candidature est déjà sauvegardée
      }

      // Annuler le timeout client si tout réussit
      clearTimeout(clientTimeout)
      
      toast.success(t("admissions.submitSuccess", "Candidature soumise avec succès"), {
        description: t("admissions.submitSuccessDescription", "Vous recevrez une confirmation par email. Nous vous contacterons bientôt."),
        duration: 6000,
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
      
      // S'assurer que le timeout client est annulé en cas d'erreur
      if (clientTimeout) {
        clearTimeout(clientTimeout)
      }
      
      // Messages d'erreur plus clairs et intuitifs selon le type d'erreur
      let errorMessage = error.message || error.details || t("admissions.submitErrorDescription", "Veuillez réessayer plus tard.")
      let errorTitle = t("admissions.submitError", "Erreur lors de la soumission")

      if (error.code === "UPLOAD_TIMEOUT" || error.message?.includes("trop de temps") || error.message?.includes("timeout")) {
        errorTitle = "⏱️ Connexion lente détectée"
        errorMessage = "Le téléchargement prend trop de temps. 💡 Conseils pour mobile :\n• Vérifiez votre connexion internet (WiFi ou 4G/5G)\n• Réduisez la taille de vos fichiers (notamment la vidéo)\n• Essayez de vous rapprocher du routeur WiFi\n• Réessayez dans quelques instants"
      } else if (error.message?.includes("téléchargement") || error.code === "UPLOAD_ERROR") {
        errorTitle = "📤 Erreur de téléchargement"
        errorMessage = `${error.message}\n\n💡 Que faire ?\n• Vérifiez que vos fichiers sont valides\n• Réduisez leur taille si nécessaire\n• Vérifiez votre connexion internet\n• Réessayez`
      } else if (error.message?.includes("Configuration email")) {
        errorTitle = "⚙️ Configuration manquante"
        errorMessage = "Le système d'envoi d'emails n'est pas configuré. Votre candidature a été sauvegardée, mais l'email de confirmation ne peut pas être envoyé. Contactez-nous directement."
      } else if (error.message?.includes("AbortError") || error.message?.includes("aborted")) {
        errorTitle = "🔌 Connexion interrompue"
        errorMessage = "La connexion a été interrompue. 💡 Conseils :\n• Vérifiez votre connexion internet\n• Assurez-vous d'avoir un signal stable\n• Réessayez dans quelques instants"
      } else {
        errorTitle = "❌ Erreur lors de la soumission"
        errorMessage = `${errorMessage}\n\n💡 Que faire ?\n• Vérifiez tous les champs du formulaire\n• Assurez-vous que vos fichiers sont valides\n• Vérifiez votre connexion internet\n• Réessayez dans quelques instants\n• Si le problème persiste, contactez-nous`
      }

      toast.error(errorTitle, {
        description: errorMessage,
        duration: 10000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="application-form" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12">
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
          <div className="bg-card border border-border rounded-xl p-4 xs:p-5 sm:p-6 md:p-8 shadow-sm">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="font-sans font-semibold text-xl mb-6">{t("admissions.step1Title")}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("admissions.firstName")}</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      placeholder={t("admissions.firstNamePlaceholder")}
                      required
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("admissions.lastName")}</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      placeholder={t("admissions.lastNamePlaceholder")}
                      required
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="age">{t("admissions.age")}</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => updateField("age", e.target.value)}
                      onInput={(e) => updateField("age", (e.target as HTMLInputElement).value)}
                      placeholder={t("admissions.agePlaceholder")}
                      required
                      min={8}
                      inputMode="numeric"
                      className={errors.age ? "border-red-500" : ""}
                    />
                    {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">{t("admissions.gender")}</Label>
                    <Select value={formData.gender} onValueChange={(value) => updateField("gender", value)}>
                      <SelectTrigger id="gender" className={errors.gender ? "border-red-500" : ""}>
                        <SelectValue placeholder={t("admissions.genderPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">{t("admissions.genders.male")}</SelectItem>
                        <SelectItem value="female">{t("admissions.genders.female")}</SelectItem>
                        <SelectItem value="other">{t("admissions.genders.other")}</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="height">{t("admissions.height")}</Label>
                    <Input
                      id="height"
                      type="number"
                      value={formData.height}
                      onChange={(e) => updateField("height", e.target.value)}
                      onInput={(e) => updateField("height", (e.target as HTMLInputElement).value)}
                      placeholder={t("admissions.heightPlaceholder")}
                      required
                      step="0.01"
                      min="0"
                      inputMode="decimal"
                      className={errors.height ? "border-red-500" : ""}
                    />
                    {errors.height && <p className="text-sm text-red-500">{errors.height}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">{t("admissions.weight")}</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => updateField("weight", e.target.value)}
                      placeholder={t("admissions.weightPlaceholder")}
                      required
                      step="0.01"
                      className={errors.weight ? "border-red-500" : ""}
                    />
                    {errors.weight && <p className="text-sm text-red-500">{errors.weight}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">{t("admissions.country")}</Label>
                  <Select value={formData.country} onValueChange={(value) => updateField("country", value)}>
                    <SelectTrigger id="country" className={errors.country ? "border-red-500" : ""}>
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
                  {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("admissions.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder={t("admissions.emailPlaceholder")}
                    required
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("admissions.phone")}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder={t("admissions.phonePlaceholder")}
                      required
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone2">{t("admissions.phone2")}</Label>
                    <Input
                      id="phone2"
                      type="tel"
                      value={formData.phone2}
                      onChange={(e) => updateField("phone2", e.target.value)}
                      placeholder={t("admissions.phone2Placeholder")}
                    />
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
                  <Select value={formData.program} onValueChange={(value) => updateField("program", value)}>
                    <SelectTrigger id="program" className={errors.program ? "border-red-500" : ""}>
                      <SelectValue placeholder={t("admissions.programPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="resident">{t("admissions.programs.resident")}</SelectItem>
                      <SelectItem value="external">{t("admissions.programs.external")}</SelectItem>
                      <SelectItem value="girls">{t("admissions.programs.girls")}</SelectItem>
                      <SelectItem value="elite">{t("admissions.programs.elite")}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.program && <p className="text-sm text-red-500">{errors.program}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">{t("admissions.position")}</Label>
                  <Select value={formData.position} onValueChange={(value) => updateField("position", value)}>
                    <SelectTrigger id="position" className={errors.position ? "border-red-500" : ""}>
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
                  {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">{t("admissions.experience")}</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => updateField("experience", e.target.value)}
                    placeholder={t("admissions.experiencePlaceholder")}
                    required
                    min={0}
                    className={errors.experience ? "border-red-500" : ""}
                  />
                  {errors.experience && <p className="text-sm text-red-500">{errors.experience}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentClub">{t("admissions.currentClub")}</Label>
                  <Input
                    id="currentClub"
                    value={formData.currentClub}
                    onChange={(e) => updateField("currentClub", e.target.value)}
                    placeholder={t("admissions.currentClubPlaceholder")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivation">{t("admissions.motivation")}</Label>
                  <Textarea
                    id="motivation"
                    value={formData.motivation}
                    onChange={(e) => updateField("motivation", e.target.value)}
                    placeholder={t("admissions.motivationPlaceholder")}
                    rows={4}
                    required
                    className={errors.motivation ? "border-red-500" : ""}
                  />
                  {errors.motivation && <p className="text-sm text-red-500">{errors.motivation}</p>}
                  {formData.motivation && (
                    <p className="text-xs text-muted-foreground">
                      {formData.motivation.length}/50 caractères minimum
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardian">{t("admissions.guardian")}</Label>
                  <Input
                    id="guardian"
                    value={formData.guardian}
                    onChange={(e) => updateField("guardian", e.target.value)}
                    placeholder={t("admissions.guardianPlaceholder")}
                    required
                    className={errors.guardian ? "border-red-500" : ""}
                  />
                  {errors.guardian && <p className="text-sm text-red-500">{errors.guardian}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardianPhone">{t("admissions.guardianPhone")}</Label>
                  <Input
                    id="guardianPhone"
                    type="tel"
                    value={formData.guardianPhone}
                    onChange={(e) => updateField("guardianPhone", e.target.value)}
                    placeholder={t("admissions.guardianPhonePlaceholder")}
                    required
                    className={errors.guardianPhone ? "border-red-500" : ""}
                  />
                  {errors.guardianPhone && <p className="text-sm text-red-500">{errors.guardianPhone}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Document Upload */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="font-sans font-semibold text-xl mb-6">{t("admissions.step3Title")}</h3>

                <div className="space-y-4">
                  {/* Birth Certificate */}
                  <div className="space-y-2">
                    <Label htmlFor="birthCertificate">{t("admissions.birthCertificate")}</Label>
                    <div className={`border-2 border-dashed rounded-lg p-6 transition-colors ${errors.birthCertificate
                      ? "border-red-500 bg-red-50/50"
                      : "border-border hover:border-[#D4AF37]"
                      }`}>
                      <input
                        type="file"
                        id="birthCertificate"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange("birthCertificate", e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label htmlFor="birthCertificate" className="cursor-pointer">
                        <div className="text-center">
                          {formData.birthCertificate ? (
                            <div className="flex items-center justify-center gap-2 text-[#D4AF37]">
                              <FileCheck className="w-5 h-5" />
                              <span className="text-sm font-medium">{formData.birthCertificate.name}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleFileChange("birthCertificate", null)
                                }}
                                className="ml-2 text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground mb-2">{t("admissions.fileFormats.pdfJpgPng")}</p>
                              <Button variant="outline" size="sm" type="button">
                                {t("admissions.chooseFile")}
                              </Button>
                            </>
                          )}
                        </div>
                      </label>
                    </div>
                    {errors.birthCertificate && (
                      <p className="text-sm text-red-500 mt-2">{errors.birthCertificate}</p>
                    )}
                  </div>

                  {/* Photo */}
                  <div className="space-y-2">
                    <Label htmlFor="photo">{t("admissions.photo")}</Label>
                    <div className={`border-2 border-dashed rounded-lg p-6 transition-colors ${errors.photo
                      ? "border-red-500 bg-red-50/50"
                      : "border-border hover:border-[#D4AF37]"
                      }`}>
                      <input
                        type="file"
                        id="photo"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange("photo", e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label htmlFor="photo" className="cursor-pointer">
                        <div className="text-center">
                          {formData.photo ? (
                            <div className="flex items-center justify-center gap-2 text-[#D4AF37]">
                              <FileCheck className="w-5 h-5" />
                              <span className="text-sm font-medium">{formData.photo.name}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleFileChange("photo", null)
                                }}
                                className="ml-2 text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground mb-2">{t("admissions.fileFormats.jpgPng")}</p>
                              <Button variant="outline" size="sm" type="button">
                                {t("admissions.chooseFile")}
                              </Button>
                            </>
                          )}
                        </div>
                      </label>
                    </div>
                    {errors.photo && (
                      <p className="text-sm text-red-500 mt-2">{errors.photo}</p>
                    )}
                  </div>

                  {/* Medical Certificate */}
                  <div className="space-y-2">
                    <Label htmlFor="medicalCertificate">{t("admissions.medicalCertificate")}</Label>
                    <div className={`border-2 border-dashed rounded-lg p-6 transition-colors ${errors.medicalCertificate
                      ? "border-red-500 bg-red-50/50"
                      : "border-border hover:border-[#D4AF37]"
                      }`}>
                      <input
                        type="file"
                        id="medicalCertificate"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange("medicalCertificate", e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label htmlFor="medicalCertificate" className="cursor-pointer">
                        <div className="text-center">
                          {formData.medicalCertificate ? (
                            <div className="flex items-center justify-center gap-2 text-[#D4AF37]">
                              <FileCheck className="w-5 h-5" />
                              <span className="text-sm font-medium">{formData.medicalCertificate.name}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleFileChange("medicalCertificate", null)
                                }}
                                className="ml-2 text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground mb-2">{t("admissions.fileFormats.pdfJpg")}</p>
                              <Button variant="outline" size="sm" type="button">
                                {t("admissions.chooseFile")}
                              </Button>
                            </>
                          )}
                        </div>
                      </label>
                    </div>
                    {errors.medicalCertificate && (
                      <p className="text-sm text-red-500 mt-2">{errors.medicalCertificate}</p>
                    )}
                  </div>

                  {/* Video */}
                  <div className="space-y-2">
                    <Label>{t("admissions.video")}</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-[#D4AF37] transition-colors">
                      <input
                        type="file"
                        id="video"
                        accept=".mp4,.mov"
                        onChange={(e) => handleFileChange("video", e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label htmlFor="video" className="cursor-pointer">
                        <div className="text-center">
                          {formData.video ? (
                            <div className="flex items-center justify-center gap-2 text-[#D4AF37]">
                              <FileCheck className="w-5 h-5" />
                              <span className="text-sm font-medium">{formData.video.name}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleFileChange("video", null)
                                }}
                                className="ml-2 text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground mb-2">{t("admissions.fileFormats.mp4Youtube")}</p>
                              <Button variant="outline" size="sm" type="button">
                                {t("admissions.chooseFileOrLink")}
                              </Button>
                            </>
                          )}
                        </div>
                      </label>
                    </div>
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
                <Button onClick={handleNext} className="bg-[#D4AF37] hover:bg-[#d17e00] text-white min-h-[44px] text-sm xs:text-base flex-1 sm:flex-initial">
                  {t("common.next")}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmitApplication}
                  disabled={isSubmitting}
                  className="bg-[#D4AF37] hover:bg-[#d17e00] text-white disabled:opacity-50 min-h-[44px] text-sm xs:text-base flex-1 sm:flex-initial"
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
