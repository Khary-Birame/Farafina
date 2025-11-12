/**
 * Page de vérification des politiques RLS
 * 
 * Cette page vérifie que RLS est activé et que les politiques sont créées.
 */

"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Loader2, Shield, Lock, Unlock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface TableRLSInfo {
  name: string
  rlsEnabled: boolean
  policiesCount: number
  policies: string[]
}

export default function VerifyRLSPage() {
  const [tables, setTables] = useState<TableRLSInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)

  const expectedTables = [
    "users",
    "players",
    "messages",
    "notifications",
    "conversations",
  ]

  // Vérifier l'utilisateur connecté
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUser(user)
    }
    checkUser()
  }, [])

  const verifyRLS = async () => {
    setLoading(true)
    setError(null)

    try {
      const tablesInfo: TableRLSInfo[] = []

      // Essayer d'utiliser la fonction RPC pour vérifier RLS
      let useRPC = false
      let rlsMap = new Map()

      try {
        const { data: rlsData, error: rlsError } = await supabase.rpc('check_rls_status')
        
        if (!rlsError && rlsData && Array.isArray(rlsData) && rlsData.length > 0) {
          useRPC = true
          rlsMap = new Map(rlsData.map((row: any) => [row.tablename, row]))
        } else if (rlsError) {
          // Erreur RPC mais pas grave si la fonction n'existe pas
          if (!rlsError.message?.includes('function') && !rlsError.message?.includes('does not exist')) {
            console.warn("Erreur RPC:", rlsError.message)
          }
        }
      } catch (rpcError: any) {
        // La fonction RPC n'existe pas encore, c'est normal
        if (rpcError?.message && !rpcError.message.includes('function') && !rpcError.message.includes('does not exist')) {
          console.warn("Erreur lors de l'appel RPC:", rpcError.message)
        }
      }

      // Vérifier chaque table
      for (const tableName of expectedTables) {
        // Politiques attendues selon la table
        const policies: string[] = []
        if (tableName === "users") {
          policies.push("Users can view their own profile", "Admins can view all users", "Users can update their own profile")
        } else if (tableName === "players") {
          policies.push("Players can view their own profile", "Parents can view players", "Coaches can view players", "Clubs can view players")
        } else if (tableName === "messages") {
          policies.push("Users can view their own messages", "Users can send messages")
        } else if (tableName === "notifications") {
          policies.push("Users can view their own notifications", "Users can update their own notifications")
        } else if (tableName === "conversations") {
          policies.push("Users can view their own conversations", "Users can create conversations")
        }

        let rlsEnabled = false
        let policiesCount = 0

        if (useRPC) {
          // Utiliser les données de la fonction RPC
          const rlsInfo = rlsMap.get(tableName)
          rlsEnabled = rlsInfo?.rls_enabled === true
          policiesCount = rlsInfo?.policy_count || 0
        } else {
          // Méthode alternative : tester l'accès à la table
          try {
            const { data, error: testError } = await supabase
              .from(tableName)
              .select("*")
              .limit(0)

            // Si on a une erreur de permission (42501), RLS est activé mais on n'a pas accès
            // Si pas d'erreur, RLS peut être activé avec des politiques permissives OU désactivé
            // On considère RLS activé si on a une erreur de permission
            if (testError) {
              if (testError.code === "42501" || 
                  testError.message?.toLowerCase().includes("permission denied") ||
                  testError.message?.toLowerCase().includes("row-level security")) {
                rlsEnabled = true
                policiesCount = policies.length // Estimation basée sur les politiques attendues
              } else if (testError.code === "PGRST116" || testError.message?.includes("could not find")) {
                // Table n'existe pas encore
                rlsEnabled = false
                policiesCount = 0
              } else {
                // Autre type d'erreur
                rlsEnabled = false
                policiesCount = 0
              }
            } else {
              // Pas d'erreur = soit RLS désactivé, soit politiques très permissives
              // On considère que RLS n'est probablement pas activé si on peut lire sans erreur
              rlsEnabled = false
              policiesCount = 0
            }
          } catch (testErr: any) {
            // Erreur lors du test
            const errorMsg = testErr?.message || testErr?.toString() || "Erreur inconnue"
            console.error(`Erreur lors du test de ${tableName}:`, errorMsg)
            rlsEnabled = false
            policiesCount = 0
          }
        }

        tablesInfo.push({
          name: tableName,
          rlsEnabled: rlsEnabled,
          policiesCount: policiesCount,
          policies: policies,
        })
      }

      setTables(tablesInfo)
    } catch (err: any) {
      const errorMessage = err?.message || err?.toString() || "Erreur lors de la vérification"
      // Limiter la longueur du message d'erreur pour éviter les messages trop longs
      const truncatedError = errorMessage.length > 500 
        ? errorMessage.substring(0, 500) + "... (erreur tronquée)"
        : errorMessage
      setError(truncatedError)
      console.error("Erreur lors de la vérification RLS:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    verifyRLS()
  }, [])

  const allRLSEnabled = tables.every((t) => t.rlsEnabled)
  const totalTables = tables.length
  const rlsEnabledTables = tables.filter((t) => t.rlsEnabled).length

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Vérification Row Level Security (RLS)</h1>
          <p className="text-muted-foreground">
            Vérification que RLS est activé et que les politiques de sécurité sont en place.
          </p>
        </div>

        {/* Statut utilisateur */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Statut de l'Utilisateur
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentUser ? (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Connecté en tant que :</p>
                <p className="font-mono text-sm">{currentUser.email || currentUser.id}</p>
                <Badge className="mt-2">Utilisateur authentifié</Badge>
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Statut :</p>
                <Badge variant="outline">Non connecté</Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  Les tests RLS nécessitent une authentification. Connectez-vous pour tester les politiques.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Résumé */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Résumé RLS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tables à sécuriser</p>
                <p className="text-2xl font-bold">{totalTables}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">RLS activé</p>
                <p className="text-2xl font-bold text-green-600">{rlsEnabledTables}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Statut</p>
                {allRLSEnabled ? (
                  <Badge className="bg-green-500">✅ Sécurisé</Badge>
                ) : (
                  <Badge className="bg-yellow-500">⚠️ Partiel</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Détails des tables */}
        <div className="space-y-4">
          {tables.map((table) => (
            <Card key={table.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {table.rlsEnabled ? (
                    <Lock className="w-5 h-5 text-green-500" />
                  ) : (
                    <Unlock className="w-5 h-5 text-red-500" />
                  )}
                  Table: <code className="text-sm font-mono">{table.name}</code>
                </CardTitle>
                <CardDescription>
                  {table.rlsEnabled
                    ? `RLS activé${table.policiesCount > 0 ? ` (${table.policiesCount} politique${table.policiesCount !== 1 ? "s" : ""} attendue${table.policiesCount !== 1 ? "s" : ""})` : ""}`
                    : "RLS non activé"}
                </CardDescription>
              </CardHeader>
              {table.rlsEnabled && table.policies.length > 0 && (
                <CardContent>
                  <div>
                    <p className="text-sm font-medium mb-2">Politiques attendues :</p>
                    <div className="flex flex-wrap gap-2">
                      {table.policies.map((policy) => (
                        <Badge key={policy} variant="outline" className="text-xs">
                          {policy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={verifyRLS} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Vérification en cours...
                </>
              ) : (
                "Vérifier à nouveau"
              )}
            </Button>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800 mb-2">
                  <strong>❌ Erreur:</strong>
                </p>
                <p className="text-xs text-red-700 font-mono bg-red-100 p-2 rounded break-all">
                  {error}
                </p>
                <p className="text-xs text-red-600 mt-2">
                  💡 Vérifiez votre connexion Supabase et que les tables existent dans votre base de données.
                </p>
              </div>
            )}

            {!allRLSEnabled && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800 mb-2">
                  <strong>⚠️ Attention:</strong> RLS n'est pas activé sur toutes les tables.
                </p>
                <p className="text-xs text-yellow-700">
                  Assurez-vous d'avoir exécuté toutes les migrations RLS dans l'ordre :
                </p>
                <ol className="list-decimal list-inside text-xs text-yellow-700 mt-2 space-y-1">
                  <li>006_enable_rls.sql - Activer RLS</li>
                  <li>007_create_rls_policies_users.sql - Politiques users</li>
                  <li>008_create_rls_policies_players.sql - Politiques players</li>
                  <li>009_create_rls_policies_messages.sql - Politiques messages</li>
                  <li>010_create_rls_policies_notifications.sql - Politiques notifications</li>
                  <li>011_create_rls_policies_conversations.sql - Politiques conversations</li>
                  <li>012_create_rls_check_function.sql - Fonction de vérification (optionnel)</li>
                </ol>
              </div>
            )}

            {allRLSEnabled && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800 mb-2">
                  <strong>✅ Excellent !</strong> RLS est activé sur toutes les tables.
                </p>
                <p className="text-xs text-green-700">
                  Vos données sont maintenant sécurisées. Chaque utilisateur ne peut accéder qu'aux données qui lui sont autorisées.
                </p>
                <p className="text-sm text-green-800 mt-3">
                  <strong>Prochaine étape :</strong> Intégrer l'authentification Supabase (login, signup)
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Note importante */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">ℹ️ Note Importante</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-800">
              Cette vérification est basique. Pour une vérification complète des politiques RLS, 
              vous pouvez exécuter cette requête SQL dans Supabase :
            </p>
            <pre className="mt-2 p-3 bg-blue-100 rounded text-xs font-mono text-blue-900 overflow-x-auto">
{`SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

