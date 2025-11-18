"use client"

import { supabase } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdminLayout } from '@/components/admin/admin-layout'

export default function TestSupabasePage() {
  const [tests, setTests] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function runTests() {
      const results: Record<string, any> = {}

      // Test 1: Players
      try {
        const { data, error, count } = await supabase
          .from('players')
          .select('*', { count: 'exact' })
          .limit(5)

        results.players = {
          success: !error,
          error: error ? {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
          } : null,
          count: count || 0,
          sampleData: data?.slice(0, 2) || null,
        }
      } catch (err: any) {
        results.players = {
          success: false,
          error: {
            message: err.message,
            stack: err.stack,
          },
        }
      }

      // Test 2: Orders
      try {
        const { data, error, count } = await supabase
          .from('orders')
          .select('*', { count: 'exact' })
          .limit(5)

        results.orders = {
          success: !error,
          error: error ? {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
          } : null,
          count: count || 0,
          sampleData: data?.slice(0, 2) || null,
        }
      } catch (err: any) {
        results.orders = {
          success: false,
          error: {
            message: err.message,
            stack: err.stack,
          },
        }
      }

      // Test 3: Academic data
      try {
        const { data, error } = await supabase
          .from('players')
          .select('academic')
          .not('academic', 'is', null)
          .limit(5)

        results.academic = {
          success: !error,
          error: error ? {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
          } : null,
          sampleData: data?.slice(0, 2) || null,
        }
      } catch (err: any) {
        results.academic = {
          success: false,
          error: {
            message: err.message,
            stack: err.stack,
          },
        }
      }

      // Test 4: Financial data
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('total, created_at, payment_status')
          .limit(5)

        results.financial = {
          success: !error,
          error: error ? {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
          } : null,
          sampleData: data?.slice(0, 2) || null,
        }
      } catch (err: any) {
        results.financial = {
          success: false,
          error: {
            message: err.message,
            stack: err.stack,
          },
        }
      }

      // Test 5: Notifications
      try {
        const { data, error, count } = await supabase
          .from('notifications')
          .select('*', { count: 'exact' })
          .limit(5)

        results.notifications = {
          success: !error,
          error: error ? {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
          } : null,
          count: count || 0,
        }
      } catch (err: any) {
        results.notifications = {
          success: false,
          error: {
            message: err.message,
            stack: err.stack,
          },
        }
      }

      setTests(results)
      setLoading(false)
    }

    runTests()
  }, [])

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Test de Connexion Supabase</h1>
        <p className="text-[#737373]">Diagnostic des erreurs de connexion</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-[#737373]">Exécution des tests...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(tests).map(([key, result]) => (
            <Card key={key} className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-[#1A1A1A] font-semibold capitalize">
                  Test: {key}
                  {result.success ? (
                    <span className="ml-2 text-green-600">✓</span>
                  ) : (
                    <span className="ml-2 text-red-600">✗</span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result.success ? (
                  <div>
                    {result.count !== undefined && (
                      <p className="text-sm text-[#737373] mb-2">
                        Nombre d'enregistrements: <strong>{result.count}</strong>
                      </p>
                    )}
                    {result.sampleData && (
                      <details className="mt-4">
                        <summary className="cursor-pointer text-sm font-semibold text-[#1A1A1A]">
                          Aperçu des données (cliquez pour voir)
                        </summary>
                        <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto max-h-64">
                          {JSON.stringify(result.sampleData, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-red-600 font-semibold mb-2">Erreur détectée:</p>
                    <pre className="p-4 bg-red-50 rounded text-xs overflow-auto">
                      {JSON.stringify(result.error, null, 2)}
                    </pre>
                    {result.error?.hint && (
                      <p className="mt-2 text-sm text-[#737373]">
                        <strong>Conseil:</strong> {result.error.hint}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="mt-6 bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-[#1A1A1A] font-semibold">Solutions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-[#1A1A1A]">
            <p><strong>Si vous voyez des erreurs "permission denied" ou "row-level security":</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Allez sur Supabase Dashboard → Authentication → Policies</li>
              <li>Créez des politiques RLS pour permettre la lecture</li>
              <li>Voir le fichier <code className="bg-gray-200 px-1 rounded">lib/admin/TROUBLESHOOTING.md</code> pour plus de détails</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

