import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SignUpForm } from "@/components/signup/signup-form"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20">
        <SignUpForm />
      </main>
      <Footer />
    </div>
  )
}
