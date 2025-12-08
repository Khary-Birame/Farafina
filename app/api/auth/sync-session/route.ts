/**
 * Route API pour synchroniser la session localStorage → cookies HTTPOnly
 * 
 * Cette route est appelée après chaque connexion pour synchroniser
 * la session stockée dans localStorage (côté client) vers les cookies
 * HTTPOnly (côté serveur).
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    
    // Récupérer la session depuis les cookies (si elle existe déjà)
    const { data: { session: existingSession } } = await supabase.auth.getSession()
    
    // Si la session existe déjà dans les cookies, la retourner
    if (existingSession) {
      return NextResponse.json({
        success: true,
        session: existingSession,
        message: 'Session déjà synchronisée',
      })
    }

    // Si pas de session dans les cookies, essayer de récupérer depuis le body
    // (le client envoie le token depuis localStorage)
    const body = await request.json()
    const { access_token, refresh_token } = body

    if (!access_token) {
      return NextResponse.json(
        { success: false, error: 'Token manquant' },
        { status: 400 }
      )
    }

    // Définir la session dans les cookies en utilisant setSession
    // Note: Supabase gère automatiquement les cookies via le client serveur
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token: refresh_token || '',
    })

    if (error) {
      console.error('Erreur synchronisation session:', error)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      session: data.session,
      message: 'Session synchronisée avec succès',
    })
  } catch (error: any) {
    console.error('Erreur inattendue synchronisation session:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur inattendue' },
      { status: 500 }
    )
  }
}

/**
 * Route GET pour vérifier la session actuelle
 */
export async function GET() {
  try {
    const supabase = await createServerClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      session,
      hasSession: !!session,
    })
  } catch (error: any) {
    console.error('Erreur vérification session:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur inattendue' },
      { status: 500 }
    )
  }
}

