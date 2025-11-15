import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrderConfirmation } from "@/components/boutique/order-confirmation"
import { getOrderByNumber } from "@/lib/supabase/ecommerce-helpers"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function ConfirmationPage({ 
  searchParams 
}: { 
  searchParams: { order?: string } 
}) {
  if (!searchParams.order) {
    notFound()
  }

  const { data: order, error } = await getOrderByNumber(searchParams.order)

  if (error || !order) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header variant="solid" />
      <main className="pt-20">
        <OrderConfirmation order={order} />
      </main>
      <Footer />
    </div>
  )
}

