"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  TrendingUp, 
  Award, 
  Activity,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Globe,
  Calendar,
  DollarSign,
  GraduationCap
} from "lucide-react"
import { 
  LineChart as RechartsLineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

const COLORS = ['#D4AF37', '#D4AF37', '#E8C966', '#E8C966', '#B8941F']

// Données de performance
const performanceData = [
  { month: 'Jan', admissions: 45, formations: 120, performances: 85 },
  { month: 'Fév', admissions: 52, formations: 135, performances: 88 },
  { month: 'Mar', admissions: 48, formations: 128, performances: 90 },
  { month: 'Avr', admissions: 61, formations: 145, performances: 92 },
  { month: 'Mai', admissions: 55, formations: 138, performances: 89 },
  { month: 'Juin', admissions: 68, formations: 152, performances: 94 },
]

// Données de répartition
const distributionData = [
  { name: 'Football', value: 45, color: '#D4AF37' },
  { name: 'Académique', value: 30, color: '#D4AF37' },
  { name: 'Formation', value: 15, color: '#E8C966' },
  { name: 'Autres', value: 10, color: '#E8C966' },
]

// Données géographiques
const geographicData = [
  { country: 'Sénégal', students: 320, percentage: 42 },
  { country: 'Mali', students: 180, percentage: 24 },
  { country: 'Côte d\'Ivoire', students: 120, percentage: 16 },
  { country: 'Burkina Faso', students: 85, percentage: 11 },
  { country: 'Autres', students: 55, percentage: 7 },
]

// Données de progression
const progressionData = [
  { year: '2020', students: 450, graduates: 120 },
  { year: '2021', students: 520, graduates: 145 },
  { year: '2022', students: 610, graduates: 168 },
  { year: '2023', students: 720, graduates: 195 },
  { year: '2024', students: 850, graduates: 230 },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-24">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* En-tête */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Tableau de Bord KPI - FFA
            </h1>
            <p className="text-muted-foreground text-lg">
              Indicateurs de performance et métriques clés de la Fédération Française d'Athlétisme
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-[#D4AF37]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Étudiants</CardTitle>
                <Users className="h-4 w-4 text-[#D4AF37]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,450</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-[#D4AF37]">+12.5%</span> vs mois dernier
                </p>
                <div className="mt-2 flex gap-2 text-xs">
                  <span className="text-muted-foreground">Filles: 980 (40%)</span>
                  <span className="text-muted-foreground">Garçons: 1,470 (60%)</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#D4AF37]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de Réussite</CardTitle>
                <Award className="h-4 w-4 text-[#D4AF37]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-[#D4AF37]">+2.3%</span> vs trimestre dernier
                </p>
                <div className="mt-2 flex gap-2 text-xs">
                  <span className="text-muted-foreground">Filles: 96.1%</span>
                  <span className="text-muted-foreground">Garçons: 92.8%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#E8C966]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Formations Actives</CardTitle>
                <GraduationCap className="h-4 w-4 text-[#E8C966]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-[#E8C966]">+8</span> nouvelles formations
                </p>
                <div className="mt-2 text-xs text-muted-foreground">
                  Assiduité moyenne: 92.5%
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#E8C966]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance Moyenne</CardTitle>
                <TrendingUp className="h-4 w-4 text-[#E8C966]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89.5%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-[#E8C966]">+1.8%</span> vs mois dernier
                </p>
                <div className="mt-2 text-xs text-muted-foreground">
                  Impact social: 85%
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs pour différents dashboards */}
          <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="geographic">Géographie</TabsTrigger>
              <TabsTrigger value="progression">Progression</TabsTrigger>
              <TabsTrigger value="financial">Financier</TabsTrigger>
            </TabsList>

            {/* Dashboard Performance */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Évolution Mensuelle</CardTitle>
                    <CardDescription>Admissions, formations et performances</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsLineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="admissions" 
                          stroke="#D4AF37" 
                          strokeWidth={2}
                          name="Admissions"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="formations" 
                          stroke="#D4AF37" 
                          strokeWidth={2}
                          name="Formations"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="performances" 
                          stroke="#E8C966" 
                          strokeWidth={2}
                          name="Performances"
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Répartition par Domaine</CardTitle>
                    <CardDescription>Distribution des activités</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={distributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {distributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Dashboard Géographique */}
            <TabsContent value="geographic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Répartition Géographique</CardTitle>
                  <CardDescription>Étudiants par pays d'origine</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={geographicData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="country" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="students" fill="#D4AF37" name="Nombre d'étudiants" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Dashboard Progression */}
            <TabsContent value="progression" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Évolution sur 5 Ans</CardTitle>
                  <CardDescription>Croissance des étudiants et diplômés</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RechartsLineChart data={progressionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="students" 
                        stroke="#D4AF37" 
                        strokeWidth={3}
                        name="Étudiants"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="graduates" 
                        stroke="#D4AF37" 
                        strokeWidth={3}
                        name="Diplômés"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Dashboard Financier */}
            <TabsContent value="financial" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-[#D4AF37]" />
                      Budget Annuel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">€2.4M</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Budget alloué pour 2024
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-[#D4AF37]" />
                      Dépenses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">€1.8M</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      75% du budget utilisé
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-[#E8C966]" />
                      ROI
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">142%</div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Retour sur investissement
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

