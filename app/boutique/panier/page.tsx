import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartPageContent } from "@/components/boutique/cart-page-content"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="solid" />
      <main className="pt-20">
        <CartPageContent />
      </main>
      <Footer />
    </div>
  )
}

