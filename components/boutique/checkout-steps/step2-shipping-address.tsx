'use client'

import { InputField, TextareaField } from '@/components/ui/form-field'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useTranslation } from '@/lib/hooks/use-translation'
import type { CheckoutData } from '../checkout-content'

type Props = {
  data: CheckoutData
  updateData: (data: Partial<CheckoutData>) => void
  onNext: () => void
  onPrev: () => void
}

export function CheckoutStep2({ data, updateData, onNext, onPrev }: Props) {
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.shippingAddress.address_line1 || !data.shippingAddress.city || !data.shippingAddress.postal_code) {
      return
    }
    onNext()
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
      <h2 className="font-sans text-2xl font-bold text-[#1A1A1A] mb-6">
        {t('boutique.checkout.step2.title', 'Adresse de livraison')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label={t('boutique.checkout.step2.address', 'Adresse')}
          name="address_line1"
          type="text"
          required
          value={data.shippingAddress.address_line1}
          onChange={(e) => updateData({
            shippingAddress: { ...data.shippingAddress, address_line1: e.target.value }
          })}
        />

        <InputField
          label={t('boutique.checkout.step2.address2', 'Complément d\'adresse (optionnel)')}
          name="address_line2"
          type="text"
          value={data.shippingAddress.address_line2 || ''}
          onChange={(e) => updateData({
            shippingAddress: { ...data.shippingAddress, address_line2: e.target.value }
          })}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            label={t('boutique.checkout.step2.city', 'Ville')}
            name="city"
            type="text"
            required
            value={data.shippingAddress.city}
            onChange={(e) => updateData({
              shippingAddress: { ...data.shippingAddress, city: e.target.value }
            })}
          />
          <InputField
            label={t('boutique.checkout.step2.postalCode', 'Code postal')}
            name="postal_code"
            type="text"
            required
            value={data.shippingAddress.postal_code}
            onChange={(e) => updateData({
              shippingAddress: { ...data.shippingAddress, postal_code: e.target.value }
            })}
          />
        </div>

        <InputField
          label={t('boutique.checkout.step2.region', 'Région (optionnel)')}
          name="region"
          type="text"
          value={data.shippingAddress.region || ''}
          onChange={(e) => updateData({
            shippingAddress: { ...data.shippingAddress, region: e.target.value }
          })}
        />

        <div className="flex items-center gap-2">
          <Checkbox
            id="useSameForBilling"
            checked={data.useSameForBilling}
            onCheckedChange={(checked) => updateData({ useSameForBilling: checked as boolean })}
          />
          <label htmlFor="useSameForBilling" className="text-sm text-gray-700 cursor-pointer">
            {t('boutique.checkout.step2.useSameBilling', 'Utiliser la même adresse pour la facturation')}
          </label>
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
            type="submit"
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold px-8 h-12 rounded-xl"
          >
            {t('boutique.checkout.continue', 'Continuer')}
          </Button>
        </div>
      </form>
    </div>
  )
}

