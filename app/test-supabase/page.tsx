/**
 * Page de test pour vérifier la connexion Supabase
 * 
 * Cette page permet de tester que Supabase est correctement configuré.
 * On la supprimera plus tard une fois que tout fonctionne.
 */

"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

export default function TestSupabasePage() {
  const [status, setStatus] = useState<{
    connected: boolean | null
    message: string
    loading: boolean
  }>({
    connected: null,
    message: "Test en cours...",
    loading: true,
  })

  const testConnection = async () => {
    setStatus({ connected: null, message: "Test en cours...", loading: true })

    try {
      // Tester la connexion en faisant une requête simple
      // On essaie d'accéder à une table qui n'existe probablement pas encore
      // Si on obtient une erreur "table not found", c'est bon signe : la connexion fonctionne !
      const { error } = await supabase.from('_test_connection').select('*').limit(1)
      
      if (error) {
        // Codes d'erreur qui indiquent que la connexion fonctionne mais la table n'existe pas
        if (error.code === 'PGRST116' || error.message?.includes('could not find the table')) {
          // ✅ C'est une bonne nouvelle ! La connexion fonctionne, la table n'existe juste pas encore
          setStatus({
            connected: true,
            message: "✅ Connexion réussie ! Supabase est correctement configuré. (La table n'existe pas encore, c'est normal)",
            loading: false,
          })
        } else if (error.message?.includes('JWT')) {
          // Erreur d'authentification - clé invalide
          setStatus({
            connected: false,
            message: `❌ Erreur d'authentification: Clé API invalide. Vérifiez votre NEXT_PUBLIC_SUPABASE_ANON_KEY`,
            loading: false,
          })
        } else if (error.message?.includes('Failed to fetch') || error.message?.includes('Network')) {
          // Erreur de réseau - URL incorrecte ou pas de connexion
          setStatus({
            connected: false,
            message: `❌ Erreur de connexion: Impossible de joindre Supabase. Vérifiez votre NEXT_PUBLIC_SUPABASE_URL`,
            loading: false,
          })
        } else {
          // Autre erreur
          setStatus({
            connected: false,
            message: `❌ Erreur: ${error.message}`,
            loading: false,
          })
        }
      } else {
        // Si pas d'erreur (peu probable), la connexion fonctionne
        setStatus({
          connected: true,
          message: "✅ Connexion réussie ! Supabase est correctement configuré.",
          loading: false,
        })
      }
    } catch (error: any) {
      console.error("Erreur de connexion:", error)
      setStatus({
        connected: false,
        message: `❌ Erreur inattendue: ${error.message || "Vérifiez votre configuration"}`,
        loading: false,
      })
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Test de Connexion Supabase</h1>
          <p className="text-muted-foreground">
            Cette page teste que Supabase est correctement configuré dans votre projet.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Statut de la Connexion</CardTitle>
            <CardDescription>
              Vérification de la configuration Supabase
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              {status.loading ? (
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              ) : status.connected ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
              <p className={status.loading ? "text-muted-foreground" : status.connected ? "text-green-600" : "text-red-600"}>
                {status.message}
              </p>
            </div>

            {!status.loading && (
              <Button onClick={testConnection} variant="outline" className="w-full">
                Tester à nouveau
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations de Configuration</CardTitle>
            <CardDescription>
              Variables d'environnement détectées
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium mb-1">NEXT_PUBLIC_SUPABASE_URL</p>
              <p className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded">
                {process.env.NEXT_PUBLIC_SUPABASE_URL || "❌ Non définie"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</p>
              <p className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded">
                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                  ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20)}...`
                  : "❌ Non définie"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prochaines Étapes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Si la connexion fonctionne : Passer à l'étape 2 (Schéma de base de données)</li>
              <li>Si erreur : Vérifier votre fichier .env.local et redémarrer le serveur</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

