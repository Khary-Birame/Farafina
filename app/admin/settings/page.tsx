"use client"

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

export default function SettingsPermissionsPage() {
  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Paramètres & Permissions</h1>
        <p className="text-[#C0C0C0]">Gérez les paramètres système et les permissions utilisateur</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white border border-[#C0C0C0]/30">
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
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1A1A1A]">Profil Utilisateur</CardTitle>
              <CardDescription>Gérez vos informations personnelles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#1A1A1A]">
                    Prénom
                  </Label>
                  <Input
                    id="firstName"
                    defaultValue="Admin"
                    className="border-[#C0C0C0] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#1A1A1A]">
                    Nom
                  </Label>
                  <Input
                    id="lastName"
                    defaultValue="User"
                    className="border-[#C0C0C0] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
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
                  defaultValue="admin@farafina.com"
                  className="border-[#C0C0C0] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-[#1A1A1A]">
                  Rôle
                </Label>
                <Select defaultValue="admin">
                  <SelectTrigger className="border-[#C0C0C0] focus:border-[#D4AF37]">
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
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
                Enregistrer les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1A1A1A]">Gestion des Permissions</CardTitle>
              <CardDescription>Configurez les permissions par rôle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border border-[#C0C0C0]/30 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-semibold text-[#1A1A1A] mb-1">Administrateur</div>
                      <div className="text-sm text-[#C0C0C0]">Accès complet à toutes les fonctionnalités</div>
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

                <div className="p-4 border border-[#C0C0C0]/30 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-semibold text-[#1A1A1A] mb-1">Coach</div>
                      <div className="text-sm text-[#C0C0C0]">Gestion des entraînements et performances</div>
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
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1A1A1A]">Paramètres de Langue</CardTitle>
              <CardDescription>Sélectionnez la langue de l'interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language" className="text-[#1A1A1A]">
                  Langue par défaut
                </Label>
                <Select defaultValue="fr">
                  <SelectTrigger className="border-[#C0C0C0] focus:border-[#D4AF37]">
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
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1A1A1A]">Préférences de Notifications</CardTitle>
              <CardDescription>Configurez vos notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#1A1A1A]">Notifications Email</div>
                    <div className="text-sm text-[#C0C0C0]">Recevoir les notifications par email</div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-[#D4AF37]" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#1A1A1A]">Notifications Push</div>
                    <div className="text-sm text-[#C0C0C0]">Notifications dans le navigateur</div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-[#D4AF37]" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#1A1A1A]">Alertes Urgentes</div>
                    <div className="text-sm text-[#C0C0C0]">Toujours recevoir les alertes urgentes</div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-[#D4AF37]" />
                </div>
              </div>
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1A1A1A] flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#D4AF37]" />
                  Sauvegarde
                </CardTitle>
                <CardDescription>Configuration des sauvegardes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#1A1A1A]">Sauvegarde Automatique</div>
                    <div className="text-sm text-[#C0C0C0]">Sauvegarde quotidienne</div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-[#D4AF37]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#1A1A1A]">Fréquence</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger className="border-[#C0C0C0]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Quotidienne</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      <SelectItem value="monthly">Mensuelle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white">
                  Sauvegarder Maintenant
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1A1A1A] flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#D4AF37]" />
                  Sécurité
                </CardTitle>
                <CardDescription>Paramètres de sécurité</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#1A1A1A]">Authentification à Deux Facteurs</div>
                    <div className="text-sm text-[#C0C0C0]">Sécurité renforcée</div>
                  </div>
                  <Switch className="data-[state=checked]:bg-[#D4AF37]" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#1A1A1A]">Logs d'Activité</div>
                    <div className="text-sm text-[#C0C0C0]">Enregistrer toutes les activités</div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-[#D4AF37]" />
                </div>
                <Button className="w-full bg-[#1A1A1A] hover:bg-[#000000] text-white">
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

