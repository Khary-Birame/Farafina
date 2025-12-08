"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Settings, User, Shield, Globe, Bell, Database } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

export default function SettingsPermissionsPage() {
  const [profileData, setProfileData] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@farafina.com",
    role: "admin",
  })
  const [language, setLanguage] = useState("fr")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    urgent: true,
  })
  
  const handleSaveProfile = () => {
    toast.success("Profil mis à jour", {
      description: "Vos informations ont été enregistrées avec succès.",
    })
    // TODO: Implémenter la sauvegarde réelle
  }
  
  const handleSaveLanguage = () => {
    toast.success("Langue enregistrée", {
      description: `La langue a été changée en ${language === "fr" ? "Français" : language === "en" ? "Anglais" : language === "ar" ? "Arabe" : "Portugais"}.`,
    })
    // TODO: Implémenter le changement de langue réel
  }
  
  const handleSaveNotifications = () => {
    toast.success("Préférences enregistrées", {
      description: "Vos préférences de notifications ont été enregistrées.",
    })
    // TODO: Implémenter la sauvegarde réelle
  }
  
  const handleBackup = () => {
    toast.info("Sauvegarde en cours", {
      description: "La sauvegarde de la base de données est en cours...",
    })
    // TODO: Implémenter la sauvegarde réelle
  }
  
  const handleViewLogs = () => {
    toast.info("Logs", {
      description: "Affichage des logs d'activité...",
    })
    // TODO: Implémenter l'affichage des logs
  }
  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Paramètres & Permissions</h1>
        <p className="text-[#737373]">Gérez les paramètres système et les permissions utilisateur</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white border border-[#E5E7EB] shadow-sm">
          <TabsTrigger value="profile" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white">
            <User className="w-4 h-4 mr-2" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="permissions" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white">
            <Shield className="w-4 h-4 mr-2" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="language" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white">
            <Globe className="w-4 h-4 mr-2" />
            Langue
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white">
            <Settings className="w-4 h-4 mr-2" />
            Système
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A] font-semibold">Profil Utilisateur</CardTitle>
              <CardDescription className="text-[#737373]">Gérez vos informations personnelles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#1A1A1A]">
                    Prénom
                  </Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    className="border-[#E5E7EB] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#1A1A1A]">
                    Nom
                  </Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    className="border-[#E5E7EB] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 shadow-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#1A1A1A]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="border-[#C0C0C0] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-[#1A1A1A]">
                  Rôle
                </Label>
                <Select value={profileData.role} onValueChange={(value) => setProfileData({ ...profileData, role: value })}>
                  <SelectTrigger className="border-[#E5E7EB] focus:border-[#D4AF37] shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="coach">Coach</SelectItem>
                    <SelectItem value="teacher">Enseignant</SelectItem>
                    <SelectItem value="recruiter">Recruteur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                onClick={handleSaveProfile}
              >
                Enregistrer les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A] font-semibold">Gestion des Permissions</CardTitle>
              <CardDescription className="text-[#737373]">Configurez les permissions par rôle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border border-[#E5E7EB] rounded-lg bg-gradient-to-br from-[#F9FAFB] to-white shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-semibold text-[#1A1A1A] mb-1">Administrateur</div>
                      <div className="text-sm text-[#737373]">Accès complet à toutes les fonctionnalités</div>
                    </div>
                    <Badge className="bg-[#D4AF37] text-white">Actif</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#1A1A1A]">Gestion des joueurs</span>
                      <Switch defaultChecked className="data-[state=checked]:bg-[#D4AF37]" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#1A1A1A]">Gestion financière</span>
                      <Switch defaultChecked className="data-[state=checked]:bg-[#D4AF37]" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#1A1A1A]">Paramètres système</span>
                      <Switch defaultChecked className="data-[state=checked]:bg-[#D4AF37]" />
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-[#E5E7EB] rounded-lg bg-gradient-to-br from-[#F9FAFB] to-white shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-semibold text-[#1A1A1A] mb-1">Coach</div>
                      <div className="text-sm text-[#737373]">Gestion des entraînements et performances</div>
                    </div>
                    <Badge className="bg-[#E8C966] text-white">Actif</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#1A1A1A]">Gestion des joueurs</span>
                      <Switch defaultChecked className="data-[state=checked]:bg-[#D4AF37]" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#1A1A1A]">Gestion financière</span>
                      <Switch className="data-[state=checked]:bg-[#D4AF37]" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#1A1A1A]">Paramètres système</span>
                      <Switch className="data-[state=checked]:bg-[#D4AF37]" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Language Tab */}
        <TabsContent value="language">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A] font-semibold">Paramètres de Langue</CardTitle>
              <CardDescription className="text-[#737373]">Sélectionnez la langue de l'interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language" className="text-[#1A1A1A]">
                  Langue par défaut
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="border-[#E5E7EB] focus:border-[#D4AF37] shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A] font-semibold">Préférences de Notifications</CardTitle>
              <CardDescription className="text-[#737373]">Configurez vos notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#1A1A1A]">Notifications Email</div>
                    <div className="text-sm text-[#737373]">Recevoir les notifications par email</div>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    className="data-[state=checked]:bg-[#D4AF37]" 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#1A1A1A]">Notifications Push</div>
                    <div className="text-sm text-[#737373]">Notifications dans le navigateur</div>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    className="data-[state=checked]:bg-[#D4AF37]" 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#1A1A1A]">Alertes Urgentes</div>
                    <div className="text-sm text-[#737373]">Toujours recevoir les alertes urgentes</div>
                  </div>
                  <Switch 
                    checked={notifications.urgent}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, urgent: checked })}
                    className="data-[state=checked]:bg-[#D4AF37]" 
                  />
                </div>
              </div>
              <Button 
                className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                onClick={handleSaveNotifications}
              >
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-[#1A1A1A] flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#D4AF37]" />
                  Sauvegarde
                </CardTitle>
                <CardDescription className="text-[#737373]">Configuration des sauvegardes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#1A1A1A]">Sauvegarde Automatique</div>
                    <div className="text-sm text-[#737373]">Sauvegarde quotidienne</div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-[#D4AF37]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1A1A1A]">Fréquence</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger className="border-[#E5E7EB] shadow-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Quotidienne</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      <SelectItem value="monthly">Mensuelle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                  onClick={handleBackup}
                >
                  Sauvegarder Maintenant
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-[#1A1A1A] flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#D4AF37]" />
                  Sécurité
                </CardTitle>
                <CardDescription className="text-[#737373]">Paramètres de sécurité</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#1A1A1A]">Authentification à Deux Facteurs</div>
                    <div className="text-sm text-[#737373]">Sécurité renforcée</div>
                  </div>
                  <Switch className="data-[state=checked]:bg-[#D4AF37]" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#1A1A1A]">Logs d'Activité</div>
                    <div className="text-sm text-[#737373]">Enregistrer toutes les activités</div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-[#D4AF37]" />
                </div>
                <Button 
                  className="w-full bg-[#1A1A1A] hover:bg-[#000000] text-white"
                  onClick={handleViewLogs}
                >
                  Voir les Logs
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  )
}

