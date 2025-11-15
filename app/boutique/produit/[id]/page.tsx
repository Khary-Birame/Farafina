import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetails } from "@/components/boutique/product-details"
import { notFound } from "next/navigation"
import { getProductById } from "@/lib/supabase/ecommerce-helpers"

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { data: product, error } = await getProductById(params.id)

  if (error || !product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header variant="solid" />
      <main className="pt-20">
        <ProductDetails product={product} />
      </main>
      <Footer />
    </div>
  )
}

