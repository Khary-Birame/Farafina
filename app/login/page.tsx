import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
