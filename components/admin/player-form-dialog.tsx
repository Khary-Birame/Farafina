"use client"

import { useState, useEffect, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react"
import { createPlayer, updatePlayer, getPlayerById } from "@/lib/supabase/players-helpers"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase/client"
import Image from "next/image"

interface PlayerFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  playerId?: string | null
  onSuccess?: () => void
}

interface PlayerFormData {
  first_name: string
  last_name: string
  date_of_birth: string
  age: string
  position: string
  preferred_foot: string
  category: string
  height: string
  weight: string
  nationality: string
  country: string
  city: string
  status: string
  section: string
  performance: string
  photo_url: string
}

interface PlayerFormState {
  photoFile: File | null
  photoPreview: string | null
  photoUrl: string | null
}

export function PlayerFormDialog({
  open,
  onOpenChange,
  playerId,
  onSuccess,
}: PlayerFormDialogProps) {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<PlayerFormData>({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    age: "",
    position: "",
    preferred_foot: "",
    category: "",
    height: "",
    weight: "",
    nationality: "",
    country: "",
    city: "",
    status: "active",
    section: "Garçons",
    performance: "",
    photo_url: "",
  })
  const [photoState, setPhotoState] = useState<PlayerFormState>({
    photoFile: null,
    photoPreview: null,
    photoUrl: null,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Référence pour éviter les appels multiples
  const isFetchingRef = useRef(false)
  const lastPlayerIdRef = useRef<string | null | undefined>(null)

  // Charger les données du joueur si on est en mode édition
  useEffect(() => {
    // Si le modal est fermé, réinitialiser
    if (!open) {
      isFetchingRef.current = false
      setFetching(false)
      lastPlayerIdRef.current = null
      return
    }

    // Si on est en mode création (pas de playerId)
    if (!playerId) {
      // Réinitialiser le formulaire pour la création
      setFormData({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        age: "",
        position: "",
        preferred_foot: "",
        category: "",
        height: "",
        weight: "",
        nationality: "",
        country: "",
        city: "",
        status: "active",
        section: "Garçons",
        performance: "",
        photo_url: "",
      })
      setPhotoState({
        photoFile: null,
        photoPreview: null,
        photoUrl: null,
      })
      setErrors({})
      setFetching(false)
      isFetchingRef.current = false
      lastPlayerIdRef.current = null
      return
    }

    // Si on est déjà en train de charger, ne pas relancer
    if (isFetchingRef.current) {
      return
    }
    
    // Si on a déjà chargé ce joueur et que les données sont présentes, ne pas recharger
    if (lastPlayerIdRef.current === playerId && formData.first_name && formData.last_name) {
      setFetching(false)
      isFetchingRef.current = false
      return
    }

    // Charger les données du joueur
    isFetchingRef.current = true
    lastPlayerIdRef.current = playerId
    setFetching(true)

    const fetchPlayer = async () => {
      try {
        const { data, error } = await getPlayerById(playerId)
        
        // Si le modal a été fermé pendant le chargement, ne pas mettre à jour
        if (!open) {
          isFetchingRef.current = false
          setFetching(false)
          return
        }

        if (error || !data) {
          console.error("Erreur chargement joueur:", error)
          toast.error("Erreur lors du chargement du joueur", {
            description: error?.message || "Impossible de charger les données du joueur",
          })
          isFetchingRef.current = false
          setFetching(false)
          lastPlayerIdRef.current = null
          return
        }

        // Vérifier une dernière fois si le modal est toujours ouvert
        if (!open) {
          isFetchingRef.current = false
          setFetching(false)
          return
        }

        const photoUrl = data.photo_url || data.image || ""
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          date_of_birth: data.date_of_birth
            ? new Date(data.date_of_birth).toISOString().split("T")[0]
            : "",
          age: data.age?.toString() || "",
          position: data.position || "",
          preferred_foot: data.preferred_foot || "",
          category: data.category || "",
          height: data.height || "",
          weight: data.weight || "",
          nationality: data.nationality || "",
          country: data.country || "",
          city: data.city || "",
          status: data.status || "active",
          section: data.section || "Garçons",
          performance: data.performance?.toString() || "",
          photo_url: photoUrl,
        })
        
        // Charger la photo existante si disponible
        if (photoUrl) {
          setPhotoState({
            photoFile: null,
            photoPreview: null,
            photoUrl: photoUrl,
          })
        } else {
          setPhotoState({
            photoFile: null,
            photoPreview: null,
            photoUrl: null,
          })
        }
        
        isFetchingRef.current = false
        setFetching(false)
      } catch (err: any) {
        console.error("Erreur inattendue:", err)
        if (open) {
          toast.error("Erreur lors du chargement du joueur", {
            description: err?.message || "Une erreur inattendue s'est produite",
          })
        }
        isFetchingRef.current = false
        setFetching(false)
        lastPlayerIdRef.current = null
      }
    }

    fetchPlayer()
  }, [open, playerId])

  // Fonction pour uploader la photo vers Supabase Storage
  const uploadPlayerPhoto = async (file: File, playerId?: string): Promise<string | null> => {
    try {
      // Vérifier le type de fichier
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        toast.error("Type de fichier non autorisé", {
          description: "Veuillez sélectionner une image (JPEG, PNG ou WebP).",
        })
        return null
      }

      // Vérifier la taille (max 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        toast.error("Fichier trop volumineux", {
          description: "La photo ne doit pas dépasser 5MB.",
        })
        return null
      }

      // Générer un nom de fichier unique
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const fileName = playerId 
        ? `players/${playerId}/photo-${Date.now()}.${fileExtension}`
        : `players/temp/photo-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`

      // Uploader vers Supabase Storage (bucket 'players' ou utiliser 'applications' si 'players' n'existe pas)
      const bucket = 'players' // Vous pouvez créer un bucket 'players' dans Supabase Storage
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type,
        })

      if (error) {
        // Si le bucket 'players' n'existe pas, essayer 'applications'
        if (error.message?.includes('Bucket not found') || error.message?.includes('not found')) {
          console.warn(`Bucket '${bucket}' non trouvé, tentative avec 'applications'`)
          const { data: fallbackData, error: fallbackError } = await supabase.storage
            .from('applications')
            .upload(fileName, file, {
              cacheControl: '3600',
              upsert: true,
              contentType: file.type,
            })
          
          if (fallbackError) {
            console.error("Erreur upload photo:", fallbackError)
            toast.error("Erreur lors de l'upload", {
              description: fallbackError.message || "Impossible d'uploader la photo.",
            })
            return null
          }
          
          // Obtenir l'URL publique
          const { data: urlData } = supabase.storage
            .from('applications')
            .getPublicUrl(fallbackData.path)
          
          return urlData.publicUrl
        } else {
          console.error("Erreur upload photo:", error)
          toast.error("Erreur lors de l'upload", {
            description: error.message || "Impossible d'uploader la photo.",
          })
          return null
        }
      }

      // Obtenir l'URL publique
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)

      return urlData.publicUrl
    } catch (err: any) {
      console.error("Erreur inattendue upload:", err)
      toast.error("Erreur", {
        description: err.message || "Une erreur s'est produite lors de l'upload.",
      })
      return null
    }
  }

  // Gérer le changement de photo
  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Créer une preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotoState({
        photoFile: file,
        photoPreview: reader.result as string,
        photoUrl: null,
      })
    }
    reader.readAsDataURL(file)
  }

  // Supprimer la photo
  const handleRemovePhoto = () => {
    setPhotoState({
      photoFile: null,
      photoPreview: null,
      photoUrl: null,
    })
    setFormData({ ...formData, photo_url: "" })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.first_name.trim()) {
      newErrors.first_name = "Le prénom est requis"
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Le nom est requis"
    }
    if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) < 0)) {
      newErrors.age = "L'âge doit être un nombre positif"
    }
    if (formData.performance && (isNaN(Number(formData.performance)) || Number(formData.performance) < 0 || Number(formData.performance) > 100)) {
      newErrors.performance = "La performance doit être entre 0 et 100"
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

    setLoading(true)

    try {
      // Uploader la photo si un nouveau fichier a été sélectionné
      let photoUrl = formData.photo_url
      if (photoState.photoFile) {
        try {
          setUploadingPhoto(true)
          const uploadedUrl = await uploadPlayerPhoto(photoState.photoFile, playerId || undefined)
          
          if (uploadedUrl) {
            photoUrl = uploadedUrl
          } else {
            // Si l'upload échoue, continuer sans photo plutôt que d'arrêter
            toast.warning("Photo non uploadée", {
              description: "Le joueur sera créé/modifié sans photo. Vous pourrez ajouter une photo plus tard.",
            })
          }
        } catch (uploadError: any) {
          console.error("Erreur upload photo:", uploadError)
          toast.error("Erreur lors de l'upload de la photo", {
            description: uploadError.message || "Impossible d'uploader la photo. Le joueur sera créé/modifié sans photo.",
          })
          // Continuer sans photo
        } finally {
          setUploadingPhoto(false)
        }
      }
      
      // Pour créer un joueur, on doit d'abord créer un utilisateur
      // Pour simplifier, on va créer un utilisateur temporaire ou utiliser un user_id existant
      // Dans un vrai cas, il faudrait créer l'utilisateur d'abord
      
      if (playerId) {
        // Mise à jour
        const updateData: any = {
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          date_of_birth: formData.date_of_birth || null,
          age: formData.age ? parseInt(formData.age) : null,
          position: formData.position || null,
          preferred_foot: formData.preferred_foot || null,
          category: formData.category || null,
          height: formData.height || null,
          weight: formData.weight || null,
          nationality: formData.nationality || null,
          country: formData.country || null,
          city: formData.city || null,
          status: formData.status,
          section: formData.section,
          performance: formData.performance ? parseFloat(formData.performance) : null,
          photo_url: photoUrl || null,
          image: photoUrl || null, // Alias pour compatibilité
        }

        const { data, error } = await updatePlayer(playerId, updateData)

        if (error) {
          console.error("Erreur mise à jour:", error)
          toast.error(`Erreur: ${error.message || "Impossible de mettre à jour le joueur"}`)
          setLoading(false)
          setUploadingPhoto(false)
          return
        }

        toast.success("Joueur mis à jour avec succès")
        onOpenChange(false)
        onSuccess?.()
      } else {
        // Création - on doit créer un utilisateur d'abord
        // Pour l'instant, on va utiliser l'utilisateur actuel comme référence
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          toast.error("Vous devez être connecté pour créer un joueur")
          setLoading(false)
          setUploadingPhoto(false)
          return
        }

        // Vérifier si l'utilisateur a déjà un profil joueur
        const { data: existingPlayer } = await supabase
          .from("players")
          .select("id")
          .eq("user_id", user.id)
          .single()

        // Si on crée un joueur pour un autre utilisateur, il faudrait créer l'utilisateur d'abord
        // Pour simplifier, on va créer le joueur avec le user_id de l'admin (à améliorer)
        const createData: any = {
          user_id: user.id, // Temporaire - dans un vrai cas, il faudrait créer l'utilisateur d'abord
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          date_of_birth: formData.date_of_birth || null,
          age: formData.age ? parseInt(formData.age) : null,
          position: formData.position || null,
          preferred_foot: formData.preferred_foot || null,
          category: formData.category || null,
          height: formData.height || null,
          weight: formData.weight || null,
          nationality: formData.nationality || null,
          country: formData.country || null,
          city: formData.city || null,
          status: formData.status,
          section: formData.section,
          performance: formData.performance ? parseFloat(formData.performance) : null,
          photo_url: photoUrl || null,
          image: photoUrl || null, // Alias pour compatibilité
        }

        const { data, error } = await createPlayer(createData)

        if (error) {
          console.error("Erreur création:", error)
          toast.error(`Erreur: ${error.message || "Impossible de créer le joueur"}`)
          setLoading(false)
          setUploadingPhoto(false)
          return
        }

        toast.success("Joueur créé avec succès")
        onOpenChange(false)
        onSuccess?.()
      }
    } catch (error: any) {
      console.error("Erreur inattendue:", error)
      toast.error(`Erreur: ${error.message || "Une erreur inattendue s'est produite"}`)
    } finally {
      setLoading(false)
      setUploadingPhoto(false) // S'assurer que l'état d'upload est réinitialisé
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>
            {playerId ? "Modifier le joueur" : "Ajouter un nouveau joueur"}
          </DialogTitle>
          <DialogDescription>
            {playerId
              ? "Modifiez les informations du joueur ci-dessous."
              : "Remplissez le formulaire pour ajouter un nouveau joueur à l'académie."}
          </DialogDescription>
        </DialogHeader>

        {fetching ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-[#D4AF37]" />
            <span className="ml-2 text-[#737373]">Chargement...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Informations personnelles */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[#1A1A1A] border-b pb-2">
                Informations personnelles
              </h3>
              
              {/* Upload Photo */}
              <div className="space-y-2">
                <Label htmlFor="photo">Photo du joueur</Label>
                <div className="flex items-center gap-4">
                  {/* Afficher la photo actuelle ou la preview */}
                  {(photoState.photoUrl || photoState.photoPreview) && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-[#E5E7EB]">
                      <Image
                        src={photoState.photoPreview || photoState.photoUrl || "/placeholder.svg"}
                        alt="Photo du joueur"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="photo"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="photo"
                      className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-[#E5E7EB] rounded-lg cursor-pointer hover:border-[#D4AF37] transition-colors"
                    >
                      {uploadingPhoto ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                          <span className="text-sm text-[#737373]">Upload en cours...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 text-[#737373]" />
                          <span className="text-sm text-[#737373]">
                            {photoState.photoUrl || photoState.photoPreview ? "Changer la photo" : "Ajouter une photo"}
                          </span>
                        </>
                      )}
                    </label>
                    <p className="text-xs text-[#737373] mt-1">
                      Formats acceptés: JPEG, PNG, WebP (max 5MB)
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">
                    Prénom <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => {
                      setFormData({ ...formData, first_name: e.target.value })
                      if (errors.first_name) setErrors({ ...errors, first_name: "" })
                    }}
                    className={errors.first_name ? "border-red-500" : ""}
                  />
                  {errors.first_name && (
                    <p className="text-sm text-red-500">{errors.first_name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name">
                    Nom <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => {
                      setFormData({ ...formData, last_name: e.target.value })
                      if (errors.last_name) setErrors({ ...errors, last_name: "" })
                    }}
                    className={errors.last_name ? "border-red-500" : ""}
                  />
                  {errors.last_name && (
                    <p className="text-sm text-red-500">{errors.last_name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date de naissance</Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Âge</Label>
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    value={formData.age}
                    onChange={(e) => {
                      setFormData({ ...formData, age: e.target.value })
                      if (errors.age) setErrors({ ...errors, age: "" })
                    }}
                    className={errors.age ? "border-red-500" : ""}
                  />
                  {errors.age && (
                    <p className="text-sm text-red-500">{errors.age}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Informations football */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[#1A1A1A] border-b pb-2">
                Informations football
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) => setFormData({ ...formData, position: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Attaquant">Attaquant</SelectItem>
                      <SelectItem value="Milieu">Milieu</SelectItem>
                      <SelectItem value="Défenseur">Défenseur</SelectItem>
                      <SelectItem value="Gardien">Gardien</SelectItem>
                      <SelectItem value="Ailier">Ailier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferred_foot">Pied préféré</Label>
                  <Select
                    value={formData.preferred_foot}
                    onValueChange={(value) => setFormData({ ...formData, preferred_foot: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Droit">Droit</SelectItem>
                      <SelectItem value="Gauche">Gauche</SelectItem>
                      <SelectItem value="Ambidextre">Ambidextre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="U8">U8</SelectItem>
                      <SelectItem value="U10">U10</SelectItem>
                      <SelectItem value="U12">U12</SelectItem>
                      <SelectItem value="U15">U15</SelectItem>
                      <SelectItem value="U18">U18</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Select
                    value={formData.section}
                    onValueChange={(value) => setFormData({ ...formData, section: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Garçons">Garçons</SelectItem>
                      <SelectItem value="Filles">Filles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Informations physiques */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[#1A1A1A] border-b pb-2">
                Informations physiques
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Taille (ex: 1,78 m)</Label>
                  <Input
                    id="height"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    placeholder="1,78 m"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Poids (ex: 72 kg)</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="72 kg"
                  />
                </div>
              </div>
            </div>

            {/* Informations géographiques */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[#1A1A1A] border-b pb-2">
                Informations géographiques
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationalité</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Statut et performance */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[#1A1A1A] border-b pb-2">
                Statut et performance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                      <SelectItem value="graduated">Diplômé</SelectItem>
                      <SelectItem value="transferred">Transféré</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="performance">Performance (0-100)</Label>
                  <Input
                    id="performance"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.performance}
                    onChange={(e) => {
                      setFormData({ ...formData, performance: e.target.value })
                      if (errors.performance) setErrors({ ...errors, performance: "" })
                    }}
                    className={errors.performance ? "border-red-500" : ""}
                  />
                  {errors.performance && (
                    <p className="text-sm text-red-500">{errors.performance}</p>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {playerId ? "Mise à jour..." : "Création..."}
                  </>
                ) : (
                  playerId ? "Mettre à jour" : "Créer"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

