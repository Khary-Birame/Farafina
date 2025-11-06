import { NextRequest, NextResponse } from "next/server"

// Route API pour créer une session de paiement Stripe
// TODO: Intégrer Stripe SDK

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, plan, paymentMethod } = body

    // Validation
    if (!amount || !currency) {
      return NextResponse.json(
        { error: "Montant et devise requis" },
        { status: 400 }
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
    return NextResponse.json({
      success: true,
      sessionId: "demo_session_" + Date.now(),
      message: "Session de paiement créée (démo)",
      // En production, retourner: { sessionId: session.id, url: session.url }
    })
  } catch (error) {
    console.error("Erreur création session paiement:", error)
    return NextResponse.json(
      { error: "Erreur lors de la création de la session" },
      { status: 500 }
    )
  }
}

