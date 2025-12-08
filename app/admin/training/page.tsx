"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, MapPin, Plus } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useAdminTraining } from "@/lib/admin/hooks/use-admin-training"
import { toast } from "sonner"

export default function TrainingMatchManagementPage() {
  const { trainingSessions, matches, loading, error } = useAdminTraining()
  
  const handleNewSession = () => {
    toast.info("Fonctionnalité à venir", {
      description: "La création de nouvelles sessions sera bientôt disponible.",
    })
  }
  
  // Calculer les statistiques depuis les données réelles
  const upcomingSessionsCount = trainingSessions.length
  const upcomingMatchesCount = matches.length
  const averageAttendance = trainingSessions.length > 0
    ? Math.round(
        trainingSessions.reduce((sum, s) => {
          const rate = s.total > 0 ? (s.presence / s.total) * 100 : 0
          return sum + rate
        }, 0) / trainingSessions.length
      )
    : 0
  
  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Entraînement & Matchs</h1>
          <p className="text-[#737373]">Gérez les sessions d'entraînement et les matchs</p>
        </div>
        <Button 
          className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
          onClick={handleNewSession}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Session
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-2xl font-bold text-[#1A1A1A]">
                {loading ? "..." : upcomingSessionsCount}
              </span>
            </div>
            <p className="text-sm text-[#737373]">Sessions à venir</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-2xl font-bold text-[#1A1A1A]">
                {loading ? "..." : `${averageAttendance}%`}
              </span>
            </div>
            <p className="text-sm text-[#737373]">Taux de Présence Moyen</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-[#E8C966]" />
              <span className="text-2xl font-bold text-[#1A1A1A]">
                {loading ? "..." : upcomingMatchesCount}
              </span>
            </div>
            <p className="text-sm text-[#737373]">Matchs à Venir</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <MapPin className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-2xl font-bold text-[#1A1A1A]">
                {loading ? "..." : new Set(matches.map(m => m.lieu).filter(Boolean)).size}
              </span>
            </div>
            <p className="text-sm text-[#737373]">Lieux Actifs</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Training Sessions */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] font-semibold">Prochaines Sessions d'Entraînement</CardTitle>
            <CardDescription className="text-[#737373]">Calendrier des entraînements à venir</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-12 text-center">
                <p className="text-[#737373]">Chargement des sessions...</p>
              </div>
            ) : error ? (
              <div className="py-12 text-center">
                <p className="text-red-600 mb-2">Erreur: {error}</p>
              </div>
            ) : trainingSessions.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-[#737373] mb-4">Aucune session d'entraînement trouvée</p>
              </div>
            ) : (
              <div className="space-y-4">
                {trainingSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors shadow-sm"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-[#1A1A1A] mb-1">{session.type}</h3>
                      <div className="flex items-center gap-2 text-sm text-[#737373]">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(session.date), "EEEE d MMMM", { locale: fr })}</span>
                        {session.heure && (
                          <>
                            <Clock className="w-4 h-4 ml-2" />
                            <span>{session.heure}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Badge className="bg-[#D4AF37] text-white">{session.categorie}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#737373] mt-2">
                    <span>Coach: {session.coach}</span>
                    {session.lieu && (
                      <>
                        <span>•</span>
                        <span>{session.lieu}</span>
                      </>
                    )}
                    <span>•</span>
                    <span className="text-[#D4AF37] font-medium">
                      Présence: {session.presence}/{session.total}
                    </span>
                  </div>
                </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Matches */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] font-semibold">Prochains Matchs</CardTitle>
            <CardDescription className="text-[#737373]">Matchs programmés</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-12 text-center">
                <p className="text-[#737373]">Chargement des matchs...</p>
              </div>
            ) : error ? (
              <div className="py-12 text-center">
                <p className="text-red-600 mb-2">Erreur: {error}</p>
              </div>
            ) : matches.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-[#737373] mb-4">Aucun match à venir trouvé</p>
              </div>
            ) : (
              <div className="space-y-4">
                {matches.map((match) => (
                <div
                  key={match.id}
                  className="p-4 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors shadow-sm"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-[#1A1A1A] mb-1">
                        {match.adversaire ? `vs ${match.adversaire}` : 'Match à venir'}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-[#737373]">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(match.date), "EEEE d MMMM", { locale: fr })}</span>
                        {match.heure && (
                          <>
                            <Clock className="w-4 h-4 ml-2" />
                            <span>{match.heure}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Badge className={match.lieu === "Domicile" ? "bg-[#D4AF37] text-white" : "bg-[#E8C966] text-white"}>
                      {match.lieu}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                      {match.categorie}
                    </Badge>
                  </div>
                </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

