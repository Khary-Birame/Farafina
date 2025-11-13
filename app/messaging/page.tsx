"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Construction } from "lucide-react"

export default function MessagingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-24">
        <div className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Construction className="w-16 h-16 text-[#D4AF37]" />
              </div>
              <CardTitle className="text-3xl mb-2">Messagerie en Construction</CardTitle>
              <CardDescription className="text-lg">
                Cette fonctionnalité sera bientôt disponible.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Nous travaillons actuellement sur cette fonctionnalité. Elle sera disponible prochainement.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}