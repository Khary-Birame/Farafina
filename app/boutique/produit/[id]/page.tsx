import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetailsMock } from "@/components/boutique/product-details-mock"
import { notFound } from "next/navigation"
import { boutiqueProducts } from "@/data/boutique-products"
import { ProtectedServerContent } from "@/components/auth/protected-server-content"

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = boutiqueProducts.find(p => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <ProtectedServerContent>
      <div className="min-h-screen bg-[#0f1012]">
        <Header variant="solid" />
        <main className="pt-20">
          <ProductDetailsMock product={product} />
        </main>
        <Footer />
      </div>
    </ProtectedServerContent>
  )
}
