"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { DataTable } from "@/components/admin/data-table"
import { KPICard } from "@/components/admin/kpi-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, AlertCircle, Download } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useAdminOrders } from "@/lib/admin/hooks/use-admin-orders"
import { useAdminDashboard } from "@/lib/admin/hooks/use-admin-dashboard"
import { getFinancialData } from "@/lib/admin/services/dashboard-stats"
import { useEffect, useState } from "react"

// Données de démonstration (fallback)
const defaultPayments = [
  {
    id: "1",
    etudiant: "Amadou Diallo",
    montant: 2500000,
    devise: "XOF",
    statut: "Complété",
    date: "2025-01-15",
    methode: "Carte bancaire",
    order_number: "ORD-001",
  },
  {
    id: "2",
    etudiant: "Fatou Sarr",
    montant: 1800000,
    devise: "XOF",
    statut: "En attente",
    date: "2025-01-14",
    methode: "Virement bancaire",
    order_number: "ORD-002",
  },
  {
    id: "3",
    etudiant: "Ibrahim Koné",
    montant: 150,
    devise: "EUR",
    statut: "Complété",
    date: "2025-01-13",
    methode: "Mobile Money",
    order_number: "ORD-003",
  },
  {
    id: "4",
    etudiant: "Aissatou Ba",
    montant: 2000,
    devise: "USD",
    statut: "En attente",
    date: "2025-01-10",
    methode: "Virement bancaire",
    order_number: "ORD-004",
  },
]

const defaultRevenueData = [
  { month: "Jan", XOF: 45000, EUR: 3500, USD: 4200 },
  { month: "Fév", XOF: 52000, EUR: 4000, USD: 4800 },
  { month: "Mar", XOF: 48000, EUR: 3700, USD: 4500 },
  { month: "Avr", XOF: 61000, EUR: 4700, USD: 5600 },
  { month: "Mai", XOF: 55000, EUR: 4200, USD: 5100 },
  { month: "Juin", XOF: 68000, EUR: 5200, USD: 6200 },
]

export default function FinanceAdmissionsPage() {
  const { kpis, loading: kpisLoading } = useAdminDashboard()
  const { orders, loading: ordersLoading } = useAdminOrders()
  const [revenueData, setRevenueData] = useState(defaultRevenueData)
  const [loadingCharts, setLoadingCharts] = useState(true)

  useEffect(() => {
    async function loadRevenueData() {
      try {
        const financialData = await getFinancialData()
        if (financialData && financialData.length > 0) {
          // Convertir les données financières en format pour le graphique multi-devises
          // Pour l'instant, on garde le format par défaut car getFinancialData ne sépare pas par devise
          // Vous pouvez adapter cette logique selon vos besoins
        }
      } catch (error) {
        console.error('Erreur chargement données revenus:', error)
      } finally {
        setLoadingCharts(false)
      }
    }

    loadRevenueData()
  }, [])

  // Utiliser les données Supabase si disponibles, sinon fallback
  const displayPayments = orders.length > 0 ? orders : defaultPayments

  // Calculer les statistiques
  const pendingPayments = displayPayments.filter(p => p.statut === 'En attente').length
  const completedPayments = displayPayments.filter(p => p.statut === 'Complété').length
  const totalRevenue = displayPayments
    .filter(p => p.statut === 'Complété')
    .reduce((sum, p) => sum + p.montant, 0)

  const formatRevenue = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M XOF`
    }
    return `${amount.toLocaleString()} XOF`
  }

  const columns = [
    {
      key: "etudiant",
      header: "Étudiant",
    },
    {
      key: "montant",
      header: "Montant",
      render: (row: typeof displayPayments[0]) => (
        <span className="font-semibold">
          {row.montant.toLocaleString()} {row.devise}
        </span>
      ),
    },
    {
      key: "methode",
      header: "Méthode",
    },
    {
      key: "date",
      header: "Date",
    },
    {
      key: "statut",
      header: "Statut",
      render: (row: typeof displayPayments[0]) => (
        <Badge
          className={
            row.statut === "Complété"
              ? "bg-[#D4AF37] text-white"
              : row.statut === "En attente"
              ? "bg-[#E8C966] text-white"
              : "bg-[#C0C0C0] text-white"
          }
        >
          {row.statut}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Download className="w-4 h-4 text-[#D4AF37]" />
        </Button>
      ),
    },
  ]

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Finance & Admissions</h1>
        <p className="text-[#737373]">Gestion financière et admissions</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Revenus Totaux"
          value={kpisLoading ? "..." : formatRevenue(kpis.monthlyRevenue)}
          change={kpis.monthlyRevenue > 0 ? { value: "+12%", type: "increase" } : undefined}
          icon={DollarSign}
          description="Ce mois-ci"
        />
        <KPICard
          title="Paiements En Attente"
          value={kpisLoading ? "..." : kpis.pendingPayments.toString()}
          icon={AlertCircle}
          iconColor="text-[#E8C966]"
          borderColor="border-l-[#E8C966]"
          description="Nécessitent une attention"
        />
        <KPICard
          title="Paiements Complétés"
          value={ordersLoading ? "..." : completedPayments.toString()}
          icon={TrendingUp}
          iconColor="text-[#10B981]"
          borderColor="border-l-[#10B981]"
          description="Ce mois-ci"
        />
        <KPICard
          title="Croissance"
          value="+18%"
          change={{ value: "+5%", type: "increase" }}
          icon={TrendingUp}
          iconColor="text-[#D4AF37]"
          borderColor="border-l-[#D4AF37]"
          description="Par rapport au mois dernier"
        />
      </div>

      {/* Revenue Chart */}
      <Card className="mb-6 bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-[#1A1A1A] font-semibold">Revenus par Devise</CardTitle>
          <CardDescription className="text-[#737373]">Évolution mensuelle en XOF, EUR et USD</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingCharts ? (
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-[#737373]">Chargement...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#737373" tick={{ fill: "#737373" }} />
                <YAxis stroke="#737373" tick={{ fill: "#737373" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar dataKey="XOF" fill="#D4AF37" radius={[8, 8, 0, 0]} name="XOF (milliers)" />
                <Bar dataKey="EUR" fill="#1A1A1A" radius={[8, 8, 0, 0]} name="EUR" />
                <Bar dataKey="USD" fill="#E8C966" radius={[8, 8, 0, 0]} name="USD" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-[#1A1A1A] font-semibold">Gestion des Paiements</CardTitle>
          <CardDescription className="text-[#737373]">Suivez tous les paiements et transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {ordersLoading ? (
            <div className="py-12 text-center">
              <p className="text-[#737373]">Chargement des paiements...</p>
            </div>
          ) : (
            <DataTable
              data={displayPayments}
              columns={columns}
              searchPlaceholder="Rechercher un paiement..."
              onExport={() => console.log("Export payments")}
            />
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  )
}
