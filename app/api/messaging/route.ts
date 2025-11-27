import { NextRequest, NextResponse } from "next/server"

// Headers CORS pour toutes les réponses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

// Handler pour les requêtes OPTIONS (preflight CORS)
export async function OPTIONS() {
  console.log("[API Messaging] OPTIONS request - CORS preflight")
  return NextResponse.json({}, { headers: corsHeaders })
}

// Route API pour la messagerie
// TODO: Intégrer WebSocket ou Server-Sent Events pour le temps réel

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  console.log("[API Messaging] 🚀 GET request reçue")
  
  try {
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get("conversationId")

    if (!conversationId) {
      console.error("[API Messaging] ❌ ID de conversation manquant")
      return NextResponse.json(
        { error: "ID de conversation requis" },
        { status: 400, headers: corsHeaders }
      )
    }

    // TODO: Récupérer les messages depuis la base de données
    // const messages = await db.messages.findMany({
    //   where: { conversationId },
    //   orderBy: { createdAt: 'asc' }
    // })

    // Données de démonstration
    const messages = [
      {
        id: 1,
        sender: "Coach Mamadou Dieng",
        content: "Bonjour, j'espère que vous allez bien.",
        time: new Date().toISOString(),
        isOwn: false,
      },
    ]

    const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`[API Messaging] ✅ GET terminé en ${totalElapsed}s`)
    
    return NextResponse.json({ messages }, { headers: corsHeaders })
  } catch (error: any) {
    const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(2)
    console.error(`[API Messaging] ❌ Erreur après ${totalElapsed}s:`, {
      message: error.message,
      stack: error.stack,
    })
    return NextResponse.json(
      { 
        error: "Erreur lors de la récupération des messages",
        details: error.message 
      },
      { status: 500, headers: corsHeaders }
    )
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  console.log("[API Messaging] 🚀 POST request reçue")
  
  try {
    let body
    try {
      body = await request.json()
      console.log("[API Messaging] ✅ Body parsé avec succès")
    } catch (parseError: any) {
      console.error("[API Messaging] ❌ Erreur parsing body:", parseError.message)
      return NextResponse.json(
        { error: "Corps de la requête invalide", details: parseError.message },
        { status: 400, headers: corsHeaders }
      )
    }
    
    const { conversationId, content, senderId } = body

    if (!conversationId || !content) {
      console.error("[API Messaging] ❌ Champs obligatoires manquants")
      return NextResponse.json(
        { error: "Conversation ID et contenu requis" },
        { status: 400, headers: corsHeaders }
      )
    }

    // TODO: Sauvegarder le message dans la base de données
    // const message = await db.messages.create({
    //   data: {
    //     conversationId,
    //     content,
    //     senderId,
    //     createdAt: new Date(),
    //   }
    // })

    // TODO: Envoyer une notification en temps réel (WebSocket/SSE)

    const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`[API Messaging] ✅ POST terminé en ${totalElapsed}s`)

    return NextResponse.json({
      success: true,
      message: {
        id: Date.now(),
        content,
        time: new Date().toISOString(),
      },
    }, { headers: corsHeaders })
  } catch (error: any) {
    const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(2)
    console.error(`[API Messaging] ❌ Erreur après ${totalElapsed}s:`, {
      message: error.message,
      stack: error.stack,
    })
    return NextResponse.json(
      { 
        error: "Erreur lors de l'envoi du message",
        details: error.message 
      },
      { status: 500, headers: corsHeaders }
    )
  }
}

