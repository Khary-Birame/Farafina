'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/providers/cart-provider'
import { useAuth } from '@/lib/auth/auth-context'
import { createOrder } from '@/lib/supabase/ecommerce-helpers'
import { toast } from 'sonner'
import { useTranslation } from '@/lib/hooks/use-translation'
import { CheckoutStep1 } from './checkout-steps/step1-customer-info'
import { CheckoutStep2 } from './checkout-steps/step2-shipping-address'
import { CheckoutStep3 } from './checkout-steps/step3-shipping-method'
import { CheckoutStep4 } from './checkout-steps/step4-payment'
import { CheckoutStep5 } from './checkout-steps/step5-review'
import { CheckCircle2, Circle } from 'lucide-react'

type CheckoutData = {
  // Étape 1
  email: string
  phone: string
  firstName: string
  lastName: string
  createAccount: boolean
  
  // Étape 2
  shippingAddress: {
    address_line1: string
    address_line2?: string
    city: string
    region?: string
    postal_code: string
    country: string
  }
  useSameForBilling: boolean
  billingAddress?: {
    address_line1: string
    address_line2?: string
    city: string
    region?: string
    postal_code: string
    country: string
  }
  
  // Étape 3
  shippingMethod: 'standard' | 'express' | null
  shippingCost: number
  
  // Étape 4
  paymentMethod: 'card' | 'paypal' | 'wave' | 'orange_money' | 'cash_on_delivery' | null
  
  // Étape 5
  acceptTerms: boolean
}

const STEPS = [
  { id: 1, label: 'Informations', key: 'customerInfo' },
  { id: 2, label: 'Adresse', key: 'address' },
  { id: 3, label: 'Livraison', key: 'shipping' },
  { id: 4, label: 'Paiement', key: 'payment' },
  { id: 5, label: 'Résumé', key: 'review' },
]

export function CheckoutContent() {
  const { t } = useTranslation()
  const router = useRouter()
  const { user } = useAuth()
  const { items, totalAmount, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    email: user?.email || '',
    phone: '',
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    createAccount: !user,
    shippingAddress: {
      address_line1: '',
      city: '',
      postal_code: '',
      country: 'SN',
    },
    useSameForBilling: true,
    shippingMethod: null,
    shippingCost: 0,
    paymentMethod: null,
    acceptTerms: false,
  })

  const updateCheckoutData = (data: Partial<CheckoutData>) => {
    setCheckoutData(prev => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!checkoutData.acceptTerms) {
      toast.error(t('boutique.checkout.acceptTerms', 'Vous devez accepter les conditions générales'))
      return
    }

    if (items.length === 0) {
      toast.error(t('boutique.checkout.emptyCart', 'Votre panier est vide'))
      router.push('/boutique/panier')
      return
    }

    setIsSubmitting(true)

    try {
      // Préparer les items de commande
      const orderItems = items.map(item => ({
        product_id: item.product_id,
        variant_id: item.variant_id || null,
        product_name: item.name,
        variant_name: item.variant_name || null,
        sku: item.sku || null,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
      }))

      // Créer la commande
      const { data: order, error } = await createOrder({
        user_id: user?.id || null,
        subtotal: totalAmount,
        shipping_cost: checkoutData.shippingCost,
        total: totalAmount + checkoutData.shippingCost,
        shipping_method: checkoutData.shippingMethod || 'standard',
        payment_method: checkoutData.paymentMethod || null,
        shipping_address: checkoutData.shippingAddress,
        billing_address: checkoutData.billingAddress || checkoutData.shippingAddress,
        guest_email: !user ? checkoutData.email : undefined,
        guest_phone: checkoutData.phone,
        guest_first_name: checkoutData.firstName,
        guest_last_name: checkoutData.lastName,
        items: orderItems,
      })

      if (error || !order) {
        throw error || new Error('Erreur lors de la création de la commande')
      }

      // Vider le panier
      clearCart()

      // Rediriger vers la page de confirmation
      router.push(`/boutique/confirmation?order=${order.order_number}`)
    } catch (error: any) {
      console.error('Error creating order:', error)
      toast.error(error.message || t('boutique.checkout.error', 'Erreur lors de la création de la commande'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-sans text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            {t('boutique.checkout.emptyCart', 'Votre panier est vide')}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {t('boutique.checkout.emptyDescription', 'Ajoutez des produits à votre panier pour continuer')}
          </p>
          <a href="/boutique/panier" className="inline-block">
            <button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold px-8 py-3 rounded-xl">
              {t('boutique.checkout.backToCart', 'Retour au panier')}
            </button>
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  currentStep > step.id
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-white'
                    : currentStep === step.id
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <span className="font-semibold">{step.id}</span>
                  )}
                </div>
                <span className={`text-xs mt-2 text-center ${
                  currentStep >= step.id ? 'text-gray-900 font-medium' : 'text-gray-400'
                }`}>
                  {t(`boutique.checkout.steps.${step.key}`, step.label)}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`h-0.5 flex-1 mx-2 ${
                  currentStep > step.id ? 'bg-[#D4AF37]' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Colonne principale - Formulaire */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <CheckoutStep1
              data={checkoutData}
              updateData={updateCheckoutData}
              onNext={nextStep}
            />
          )}
          {currentStep === 2 && (
            <CheckoutStep2
              data={checkoutData}
              updateData={updateCheckoutData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {currentStep === 3 && (
            <CheckoutStep3
              data={checkoutData}
              updateData={updateCheckoutData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {currentStep === 4 && (
            <CheckoutStep4
              data={checkoutData}
              updateData={updateCheckoutData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {currentStep === 5 && (
            <CheckoutStep5
              data={checkoutData}
              updateData={updateCheckoutData}
              onSubmit={handleSubmit}
              onPrev={prevStep}
              isSubmitting={isSubmitting}
            />
          )}
        </div>

        {/* Colonne droite - Résumé */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
            <h2 className="font-sans text-xl font-bold text-[#1A1A1A] mb-6">
              {t('boutique.checkout.summary', 'Résumé')}
            </h2>
            {/* Le résumé sera affiché dans chaque étape */}
          </div>
        </div>
      </div>
    </div>
  )
}

