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

// Données de démonstration
const payments = [
  {
    id: 1,
    etudiant: "Amadou Diallo",
    montant: 2500000,
    devise: "XOF",
    statut: "Complété",
    date: "2025-01-15",
    methode: "Carte bancaire",
  },
  {
    id: 2,
    etudiant: "Fatou Sarr",
    montant: 1800000,
    devise: "XOF",
    statut: "En attente",
    date: "2025-01-14",
    methode: "Virement bancaire",
  },
  {
    id: 3,
    etudiant: "Ibrahim Koné",
    montant: 150,
    devise: "EUR",
    statut: "Complété",
    date: "2025-01-13",
    methode: "Mobile Money",
  },
  {
    id: 4,
    etudiant: "Aissatou Ba",
    montant: 2000,
    devise: "USD",
    statut: "En retard",
    date: "2025-01-10",
    methode: "Virement bancaire",
  },
]

const revenueData = [
  { month: "Jan", XOF: 45000, EUR: 3500, USD: 4200 },
  { month: "Fév", XOF: 52000, EUR: 4000, USD: 4800 },
  { month: "Mar", XOF: 48000, EUR: 3700, USD: 4500 },
  { month: "Avr", XOF: 61000, EUR: 4700, USD: 5600 },
  { month: "Mai", XOF: 55000, EUR: 4200, USD: 5100 },
  { month: "Juin", XOF: 68000, EUR: 5200, USD: 6200 },
]

export default function FinanceAdmissionsPage() {
  const columns = [
    {
      key: "etudiant",
      header: "Étudiant",
    },
    {
      key: "montant",
      header: "Montant",
      render: (row: typeof payments[0]) => (
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
      render: (row: typeof payments[0]) => (
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
        <p className="text-[#C0C0C0]">Gestion financière et admissions</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Revenus Totaux"
          value="68 000 €"
          change={{ value: "+12%", type: "increase" }}
          icon={DollarSign}
          description="Ce mois-ci"
        />
        <KPICard
          title="Paiements En Attente"
          value="23"
          icon={AlertCircle}
          iconColor="text-[#E8C966]"
          borderColor="border-l-[#E8C966]"
          description="Nécessitent une attention"
        />
        <KPICard
          title="Paiements En Retard"
          value="8"
          icon={AlertCircle}
          iconColor="text-[#C0C0C0]"
          borderColor="border-l-[#C0C0C0]"
          description="Action requise"
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
      <Card className="mb-6">
        <CardHeader>
            <CardTitle className="text-[#1A1A1A]">Revenus par Devise</CardTitle>
            <CardDescription>Évolution mensuelle en XOF, EUR et USD</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C0C0C0" />
                <XAxis dataKey="month" stroke="#1A1A1A" />
                <YAxis stroke="#1A1A1A" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #C0C0C0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="XOF" fill="#D4AF37" radius={[8, 8, 0, 0]} name="XOF (milliers)" />
                <Bar dataKey="EUR" fill="#1A1A1A" radius={[8, 8, 0, 0]} name="EUR" />
                <Bar dataKey="USD" fill="#E8C966" radius={[8, 8, 0, 0]} name="USD" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1A1A1A]">Gestion des Paiements</CardTitle>
          <CardDescription>Suivez tous les paiements et transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={payments}
            columns={columns}
            searchPlaceholder="Rechercher un paiement..."
            onExport={() => console.log("Export payments")}
          />
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

