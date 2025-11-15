'use client'

import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/hooks/use-translation'
import { Truck, Clock, Package } from 'lucide-react'
import type { CheckoutData } from '../checkout-content'

type Props = {
  data: CheckoutData
  updateData: (data: Partial<CheckoutData>) => void
  onNext: () => void
  onPrev: () => void
}

const SHIPPING_METHODS = [
  {
    id: 'standard' as const,
    name: 'Livraison standard',
    description: 'Livraison sous 5-7 jours ouvrés',
    price: 0,
    icon: Package,
  },
  {
    id: 'express' as const,
    name: 'Livraison express',
    description: 'Livraison sous 2-3 jours ouvrés',
    price: 5000,
    icon: Truck,
  },
]

export function CheckoutStep3({ data, updateData, onNext, onPrev }: Props) {
  const { t } = useTranslation()

  const handleSelect = (method: typeof SHIPPING_METHODS[0]) => {
    updateData({
      shippingMethod: method.id,
      shippingCost: method.price,
    })
  }

  const handleNext = () => {
    if (!data.shippingMethod) {
      return
    }
    onNext()
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
      <h2 className="font-sans text-2xl font-bold text-[#1A1A1A] mb-6">
        {t('boutique.checkout.step3.title', 'Mode de livraison')}
      </h2>

      <div className="space-y-4 mb-8">
        {SHIPPING_METHODS.map((method) => {
          const Icon = method.icon
          const isSelected = data.shippingMethod === method.id
          
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
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-[#D4AF37]' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#1A1A1A] mb-1">
                      {t(`boutique.checkout.step3.${method.id}.name`, method.name)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t(`boutique.checkout.step3.${method.id}.description`, method.description)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-[#1A1A1A]">
                    {method.price === 0 
                      ? t('boutique.checkout.step3.free', 'Gratuit')
                      : `${method.price.toLocaleString()} XOF`}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
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
          disabled={!data.shippingMethod}
          className="bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold px-8 h-12 rounded-xl disabled:opacity-50"
        >
          {t('boutique.checkout.continue', 'Continuer')}
        </Button>
      </div>
    </div>
  )
}

