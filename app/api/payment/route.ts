import { NextRequest, NextResponse } from "next/server"

// Headers CORS pour toutes les réponses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

// Handler pour les requêtes OPTIONS (preflight CORS)
export async function OPTIONS() {
  console.log("[API Payment] OPTIONS request - CORS preflight")
  return NextResponse.json({}, { headers: corsHeaders })
}

// Route API pour créer une session de paiement Stripe
// TODO: Intégrer Stripe SDK

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  console.log("[API Payment] 🚀 POST request reçue")
  
  try {
    let body
    try {
      body = await request.json()
      console.log("[API Payment] ✅ Body parsé avec succès")
    } catch (parseError: any) {
      console.error("[API Payment] ❌ Erreur parsing body:", parseError.message)
      return NextResponse.json(
        { error: "Corps de la requête invalide", details: parseError.message },
        { status: 400, headers: corsHeaders }
      )
    }
    
    const { amount, currency, plan, paymentMethod } = body

    // Validation
    if (!amount || !currency) {
      console.error("[API Payment] ❌ Montant ou devise manquant")
      return NextResponse.json(
        { error: "Montant et devise requis" },
        { status: 400, headers: corsHeaders }
      )
    }

    // TODO: Créer une session Stripe Checkout
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [{
    //     price_data: {
    //       currency: currency.toLowerCase(),
    //       product_data: {
    //         name: `Paiement FFA - ${plan}`,
    //       },
    //       unit_amount: amount * 100, // Stripe utilise les centimes
    //     },
    //     quantity: 1,
    //   }],
    //   mode: 'payment',
    //   success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel`,
    // })

    // Pour l'instant, retourner une réponse de démonstration
    const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`[API Payment] ✅ POST terminé en ${totalElapsed}s`)
    
    return NextResponse.json({
      success: true,
      sessionId: "demo_session_" + Date.now(),
      message: "Session de paiement créée (démo)",
      // En production, retourner: { sessionId: session.id, url: session.url }
    }, { headers: corsHeaders })
  } catch (error: any) {
    const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(2)
    console.error(`[API Payment] ❌ Erreur après ${totalElapsed}s:`, {
      message: error.message,
      stack: error.stack,
    })
    return NextResponse.json(
      { 
        error: "Erreur lors de la création de la session",
        details: error.message 
      },
      { status: 500, headers: corsHeaders }
    )
  }
}

