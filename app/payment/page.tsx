"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SelectField, InputField } from "@/components/ui/form-field"
import { useState } from "react"
import { CreditCard, Shield, CheckCircle2, DollarSign, Calendar, Lock } from "lucide-react"

const currencies = [
  { code: "XOF", name: "Franc CFA", symbol: "FCFA", rate: 1 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.00152 },
  { code: "USD", name: "US Dollar", symbol: "$", rate: 0.0017 },
]

const paymentPlans = [
  { id: "full", name: "Paiement Complet", discount: 0 },
  { id: "semester", name: "Par Semestre", discount: 0, installments: 2 },
  { id: "quarterly", name: "Trimestriel", discount: 0, installments: 4 },
  { id: "monthly", name: "Mensuel", discount: 5, installments: 12 },
]

export default function PaymentPage() {
  const [selectedCurrency, setSelectedCurrency] = useState("XOF")
  const [selectedPlan, setSelectedPlan] = useState("full")
  const [amount, setAmount] = useState(2500000)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const currentCurrency = currencies.find((c) => c.code === selectedCurrency) || currencies[0]
  const currentPlan = paymentPlans.find((p) => p.id === selectedPlan) || paymentPlans[0]

  const calculateAmount = () => {
    let baseAmount = amount
    if (selectedCurrency !== "XOF") {
      baseAmount = Math.round(amount * currentCurrency.rate)
    }
    if (currentPlan.discount > 0) {
      baseAmount = Math.round(baseAmount * (1 - currentPlan.discount / 100))
    }
    if (currentPlan.installments) {
      baseAmount = Math.round(baseAmount / currentPlan.installments)
    }
    return baseAmount
  }

  const handlePayment = () => {
    // TODO: Intégrer Stripe Checkout
    console.log("Paiement:", {
      amount: calculateAmount(),
      currency: selectedCurrency,
      plan: selectedPlan,
      method: paymentMethod,
    })
    alert("Redirection vers le paiement sécurisé...")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-24">
        <div className="container mx-auto px-4 lg:px-8 py-12 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-sans font-bold text-4xl md:text-5xl text-foreground mb-4">
              Paiement Sécurisé
            </h1>
            <p className="text-lg text-muted-foreground">
              Choisissez votre devise et votre plan de paiement
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Payment Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Currency Selector */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#16A34A]" />
                    Sélection de la Devise
                  </CardTitle>
                  <CardDescription>
                    Choisissez la devise de votre paiement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => setSelectedCurrency(currency.code)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedCurrency === currency.code
                            ? "border-[#16A34A] bg-[#16A34A]/20"
                            : "border-border hover:border-[#16A34A]/50"
                        }`}
                      >
                        <div className="font-bold text-lg">{currency.code}</div>
                        <div className="text-sm text-muted-foreground">{currency.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{currency.symbol}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#16A34A]" />
                    Plan de Paiement
                  </CardTitle>
                  <CardDescription>
                    Choisissez votre mode de paiement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paymentPlans.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          selectedPlan === plan.id
                            ? "border-[#16A34A] bg-[#16A34A]/20"
                            : "border-border hover:border-[#16A34A]/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold">{plan.name}</div>
                            {plan.installments && (
                              <div className="text-sm text-muted-foreground">
                                {plan.installments} versements
                              </div>
                            )}
                            {plan.discount > 0 && (
                              <div className="text-sm text-[#16A34A] font-medium">
                                Réduction de {plan.discount}%
                              </div>
                            )}
                          </div>
                          {selectedPlan === plan.id && (
                            <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#16A34A]" />
                    Mode de Paiement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentMethod("card")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          paymentMethod === "card"
                            ? "border-[#16A34A] bg-[#16A34A]/20"
                            : "border-border hover:border-[#16A34A]/50"
                        }`}
                    >
                      <CreditCard className="w-6 h-6 mx-auto mb-2" />
                      <div className="font-semibold">Carte Bancaire</div>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("bank")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          paymentMethod === "bank"
                            ? "border-[#16A34A] bg-[#16A34A]/20"
                            : "border-border hover:border-[#16A34A]/50"
                        }`}
                    >
                      <DollarSign className="w-6 h-6 mx-auto mb-2" />
                      <div className="font-semibold">Virement Bancaire</div>
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Security Badge */}
              <Card className="bg-gradient-to-br from-[#16A34A]/20 to-[#10B981]/15 border-[#16A34A]/30">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-[#16A34A] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Paiement 100% Sécurisé</h3>
                      <p className="text-sm text-muted-foreground">
                        Vos données sont cryptées et protégées. Nous utilisons Stripe, leader mondial
                        des paiements en ligne sécurisés. Aucune information bancaire n'est stockée sur nos serveurs.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Résumé du Paiement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Montant de base</span>
                      <span className="font-medium">
                        {amount.toLocaleString()} XOF
                      </span>
                    </div>
                    {currentPlan.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Réduction</span>
                        <span className="text-[#16A34A] font-medium">
                          -{currentPlan.discount}%
                        </span>
                      </div>
                    )}
                    {currentPlan.installments && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Nombre de versements</span>
                        <span className="font-medium">{currentPlan.installments}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Montant {currentPlan.installments ? "par versement" : "total"}</span>
                        <span className="text-[#16A34A]">
                          {calculateAmount().toLocaleString()} {currentCurrency.symbol}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handlePayment}
                    className="w-full h-12 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Payer Maintenant
                  </Button>

                  <div className="text-xs text-center text-muted-foreground">
                    En cliquant sur "Payer Maintenant", vous acceptez nos conditions de paiement
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

