'use client'

import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/hooks/use-translation'
import { CreditCard, Wallet, Smartphone, Truck } from 'lucide-react'
import type { CheckoutData } from '../checkout-content'

type Props = {
  data: CheckoutData
  updateData: (data: Partial<CheckoutData>) => void
  onNext: () => void
  onPrev: () => void
}

const PAYMENT_METHODS = [
  {
    id: 'card' as const,
    name: 'Carte bancaire',
    description: 'Visa, Mastercard',
    icon: CreditCard,
  },
  {
    id: 'paypal' as const,
    name: 'PayPal',
    description: 'Payer avec PayPal',
    icon: Wallet,
  },
  {
    id: 'wave' as const,
    name: 'Wave',
    description: 'Paiement mobile Wave',
    icon: Smartphone,
  },
  {
    id: 'orange_money' as const,
    name: 'Orange Money',
    description: 'Paiement mobile Orange Money',
    icon: Smartphone,
  },
  {
    id: 'cash_on_delivery' as const,
    name: 'Paiement à la livraison',
    description: 'Payer à la réception',
    icon: Truck,
  },
]

export function CheckoutStep4({ data, updateData, onNext, onPrev }: Props) {
  const { t } = useTranslation()

  const handleSelect = (method: typeof PAYMENT_METHODS[0]) => {
    updateData({ paymentMethod: method.id })
  }

  const handleNext = () => {
    if (!data.paymentMethod) {
      return
    }
    onNext()
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
      <h2 className="font-sans text-2xl font-bold text-[#1A1A1A] mb-6">
        {t('boutique.checkout.step4.title', 'Méthode de paiement')}
      </h2>

      <div className="space-y-4 mb-8">
        {PAYMENT_METHODS.map((method) => {
          const Icon = method.icon
          const isSelected = data.paymentMethod === method.id
          
          return (
            <button
              key={method.id}
              onClick={() => handleSelect(method)}
              className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                  : 'border-gray-200 hover:border-[#D4AF37]/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isSelected ? 'bg-[#D4AF37]' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#1A1A1A] mb-1">
                    {t(`boutique.checkout.step4.${method.id}.name`, method.name)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t(`boutique.checkout.step4.${method.id}.description`, method.description)}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800">
          {t('boutique.checkout.step4.security', 'Vos informations de paiement sont sécurisées et cryptées.')}
        </p>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          className="border-gray-300"
        >
          {t('boutique.checkout.back', 'Retour')}
        </Button>
        <Button
          onClick={handleNext}
          disabled={!data.paymentMethod}
          className="bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold px-8 h-12 rounded-xl disabled:opacity-50"
        >
          {t('boutique.checkout.continue', 'Continuer')}
        </Button>
      </div>
    </div>
  )
}

