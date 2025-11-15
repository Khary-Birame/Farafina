import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckoutContent } from "@/components/boutique/checkout-content"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="solid" />
      <main className="pt-20">
        <CheckoutContent />
      </main>
      <Footer />
    </div>
  )
}

