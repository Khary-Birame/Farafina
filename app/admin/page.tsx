"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { InputField, SelectField } from "@/components/ui/form-field"
import {
  Users,
  FileText,
  DollarSign,
  Settings,
  BarChart3,
  Shield,
  Download,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

// Données de démonstration
const applications = [
  {
    id: 1,
    name: "Amadou Diallo",
    email: "amadou@example.com",
    program: "Programme Résident",
    status: "pending",
    date: "2025-01-15",
    gender: "M",
  },
  {
    id: 2,
    name: "Fatou Sarr",
    email: "fatou@example.com",
    program: "Programme Féminin",
    status: "approved",
    date: "2025-01-14",
    gender: "F",
  },
  {
    id: 3,
    name: "Ibrahim Koné",
    email: "ibrahim@example.com",
    program: "Programme Élite",
    status: "rejected",
    date: "2025-01-13",
    gender: "M",
  },
]

const payments = [
  {
    id: 1,
    student: "Amadou Diallo",
    amount: 2500000,
    currency: "XOF",
    status: "completed",
    date: "2025-01-10",
    method: "card",
  },
  {
    id: 2,
    student: "Fatou Sarr",
    amount: 1800000,
    currency: "XOF",
    status: "pending",
    date: "2025-01-12",
    method: "bank",
  },
]

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-24">
        <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-sans font-bold text-4xl md:text-5xl text-foreground mb-2">
                Back-Office Administratif
              </h1>
              <p className="text-muted-foreground text-lg">
                Gestion complète de la plateforme Farafina
              </p>
            </div>
            <Button className="bg-[#16A34A] hover:bg-[#15803D] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-[#16A34A]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Candidatures</CardTitle>
                <FileText className="h-4 w-4 text-[#16A34A]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-[#16A34A]">12</span> en attente
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#10B981]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
                <Users className="h-4 w-4 text-[#10B981]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,450</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-[#10B981]">+45</span> ce mois
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#22C55E]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paiements</CardTitle>
                <DollarSign className="h-4 w-4 text-[#22C55E]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€125K</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-[#22C55E]">+8.2%</span> ce mois
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#34D399]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clubs</CardTitle>
                <Shield className="h-4 w-4 text-[#34D399]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-[#34D399]">3</span> nouveaux
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="applications" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="applications">Candidatures</TabsTrigger>
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="payments">Paiements</TabsTrigger>
              <TabsTrigger value="content">Contenu</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            {/* Applications Tab */}
            <TabsContent value="applications" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Gestion des Candidatures</CardTitle>
                      <CardDescription>
                        Consultez et gérez toutes les candidatures
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Rechercher..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A]"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtres
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Exporter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#16A34A]/10 rounded-lg flex items-center justify-center">
                            <span className="text-[#16A34A] font-bold">
                              {app.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold">{app.name}</div>
                            <div className="text-sm text-muted-foreground">{app.email}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {app.program} • {app.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              app.status === "approved"
                                ? "bg-[#16A34A]"
                                : app.status === "rejected"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            }
                          >
                            {app.status === "approved"
                              ? "Approuvé"
                              : app.status === "rejected"
                              ? "Rejeté"
                              : "En attente"}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des Utilisateurs</CardTitle>
                  <CardDescription>
                    Gérez les comptes utilisateurs, parents, joueurs et coachs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Interface de gestion des utilisateurs à implémenter
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des Paiements</CardTitle>
                  <CardDescription>
                    Suivez tous les paiements et transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payments.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <div className="font-semibold">{payment.student}</div>
                          <div className="text-sm text-muted-foreground">
                            {payment.amount.toLocaleString()} {payment.currency} • {payment.date}
                          </div>
                        </div>
                        <Badge
                          className={
                            payment.status === "completed"
                              ? "bg-[#16A34A]"
                              : "bg-yellow-500"
                          }
                        >
                          {payment.status === "completed" ? "Complété" : "En attente"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion de Contenu (CMS)</CardTitle>
                  <CardDescription>
                    Gérez les actualités, pages et médias
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Interface CMS à implémenter
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres Système</CardTitle>
                  <CardDescription>
                    Configuration générale de la plateforme
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Sécurité</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Authentification à deux facteurs</div>
                          <div className="text-sm text-muted-foreground">
                            Améliorez la sécurité des comptes
                          </div>
                        </div>
                        <Button variant="outline">Activer</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Sauvegarde automatique</div>
                          <div className="text-sm text-muted-foreground">
                            Sauvegarde quotidienne des données
                          </div>
                        </div>
                        <Button variant="outline">Configurer</Button>
                      </div>
                    </div>
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

