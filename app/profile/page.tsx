"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  Shield,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Lock,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"
import { signOut } from "@/lib/auth/auth-helpers"
import { supabase } from "@/lib/supabase/client"
import { toast } from "sonner"

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading, refreshUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar_url: "",
  })

  // Charger les données utilisateur
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        avatar_url: user.avatar_url || "",
      })
    }
  }, [user])

  // Rediriger si non connecté
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from("users")
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          avatar_url: formData.avatar_url,
        })
        .eq("id", user.id)

      if (error) {
        toast.error("Erreur lors de la mise à jour", {
          description: error.message,
        })
      } else {
        toast.success("Profil mis à jour avec succès")
        setIsEditing(false)
        await refreshUser()
      }
    } catch (error: any) {
      toast.error("Une erreur s'est produite", {
        description: error.message,
      })
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        avatar_url: user.avatar_url || "",
      })
    }
    setIsEditing(false)
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await signOut()
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    } finally {
      setLoggingOut(false)
    }
  }

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      player: "Joueur",
      parent: "Parent",
      coach: "Entraîneur",
      club: "Club",
      admin: "Administrateur",
    }
    return labels[role] || role
  }

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      player: "bg-blue-500",
      parent: "bg-green-500",
      coach: "bg-purple-500",
      club: "bg-orange-500",
      admin: "bg-red-500",
    }
    return colors[role] || "bg-gray-500"
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

  const displayName = user.first_name && user.last_name
    ? `${user.first_name} ${user.last_name}`
    : user.email?.split("@")[0] || "Utilisateur"

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-24">
        <div className="container mx-auto px-4 lg:px-8 py-8 max-w-6xl">
          {/* Header avec Avatar */}
          <div className="mb-8">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-[#D4AF37]">
                      <AvatarImage src={user.avatar_url || undefined} />
                      <AvatarFallback className="text-3xl bg-[#D4AF37] text-white">
                        {displayName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute -bottom-2 -right-2 rounded-full h-8 w-8"
                        onClick={() => {
                          // TODO: Implémenter l'upload d'image
                          toast.info("Fonctionnalité d'upload d'image à venir")
                        }}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="font-sans font-bold text-3xl md:text-4xl text-foreground mb-2">
                          {displayName}
                        </h1>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={`${getRoleColor(user.role)} text-white`}>
                            {getRoleLabel(user.role)}
                          </Badge>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Mail className="w-4 h-4" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                        {(user as any).email_verified ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Email vérifié
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                            Email non vérifié
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancel}
                              disabled={saving}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Annuler
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleSave}
                              disabled={saving}
                              className="bg-[#D4AF37] hover:bg-[#B8941F]"
                            >
                              <Save className="w-4 h-4 mr-2" />
                              {saving ? "Enregistrement..." : "Enregistrer"}
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="informations" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="informations">Informations</TabsTrigger>
              <TabsTrigger value="securite">Sécurité</TabsTrigger>
              <TabsTrigger value="parametres">Paramètres</TabsTrigger>
            </TabsList>

            {/* Tab: Informations */}
            <TabsContent value="informations" className="mt-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Gérez vos informations personnelles et votre profil
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">Prénom</Label>
                      {isEditing ? (
                        <Input
                          id="first_name"
                          value={formData.first_name}
                          onChange={(e) =>
                            setFormData({ ...formData, first_name: e.target.value })
                          }
                          placeholder="Votre prénom"
                        />
                      ) : (
                        <div>
                          <p className="text-foreground font-medium py-2">
                            {user.first_name || (
                              <span className="text-muted-foreground italic">Non renseigné</span>
                            )}
                          </p>
                          {!user.first_name && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Cliquez sur "Modifier" pour ajouter votre prénom
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Nom</Label>
                      {isEditing ? (
                        <Input
                          id="last_name"
                          value={formData.last_name}
                          onChange={(e) =>
                            setFormData({ ...formData, last_name: e.target.value })
                          }
                          placeholder="Votre nom"
                        />
                      ) : (
                        <div>
                          <p className="text-foreground font-medium py-2">
                            {user.last_name || (
                              <span className="text-muted-foreground italic">Non renseigné</span>
                            )}
                          </p>
                          {!user.last_name && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Cliquez sur "Modifier" pour ajouter votre nom
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <p className="text-foreground font-medium py-2 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {user.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        L'email ne peut pas être modifié
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Rôle</Label>
                      <p className="text-foreground font-medium py-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-muted-foreground" />
                        {getRoleLabel(user.role)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Le rôle ne peut pas être modifié
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Sécurité */}
            <TabsContent value="securite" className="mt-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Sécurité</CardTitle>
                  <CardDescription>
                    Gérez votre mot de passe et la sécurité de votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Mot de passe</Label>
                    <p className="text-sm text-muted-foreground mb-4">
                      Pour des raisons de sécurité, vous devez vous déconnecter et utiliser la
                      fonction "Mot de passe oublié" pour réinitialiser votre mot de passe.
                    </p>
                    <Button variant="outline" asChild>
                      <a href="/forgot-password">Réinitialiser le mot de passe</a>
                    </Button>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Déconnexion</Label>
                        <p className="text-sm text-muted-foreground">
                          Déconnectez-vous de votre compte
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        onClick={handleLogout}
                        disabled={loggingOut}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        {loggingOut ? "Déconnexion..." : "Se déconnecter"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Paramètres */}
            <TabsContent value="parametres" className="mt-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Paramètres</CardTitle>
                  <CardDescription>
                    Personnalisez vos préférences et paramètres
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Les paramètres de notifications seront disponibles prochainement.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Langue</Label>
                    <p className="text-sm text-muted-foreground">
                      Vous pouvez changer la langue depuis le sélecteur dans le header.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

