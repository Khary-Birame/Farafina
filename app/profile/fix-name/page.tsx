"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

/**
 * Page utilitaire pour corriger les noms manquants
 * Cette page permet de mettre à jour le prénom et nom pour les comptes existants
 */
export default function FixNamePage() {
  const router = useRouter()
  const { user, loading, refreshUser } = useAuth()
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
      })
    }
  }, [user, loading, router])

  const handleSave = async () => {
    if (!user) return

    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      toast.error("Veuillez remplir le prénom et le nom")
      return
    }

    setSaving(true)
    try {
      const { error } = await supabase
        .from("users")
        .update({
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
        })
        .eq("id", user.id)

      if (error) {
        toast.error("Erreur lors de la mise à jour", {
          description: error.message,
        })
      } else {
        toast.success("Nom et prénom mis à jour avec succès")
        await refreshUser()
        router.push("/profile")
      }
    } catch (error: any) {
      toast.error("Une erreur s'est produite", {
        description: error.message,
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Compléter votre profil</CardTitle>
          <CardDescription>
            Il semble que votre prénom et nom n'ont pas été enregistrés lors de la création du compte.
            Veuillez les compléter maintenant.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">Prénom *</Label>
            <Input
              id="first_name"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              placeholder="Votre prénom"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Nom *</Label>
            <Input
              id="last_name"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              placeholder="Votre nom"
              required
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => router.push("/profile")}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-[#D4AF37] hover:bg-[#B8941F]"
            >
              {saving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

