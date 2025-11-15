'use client'

import { InputField } from '@/components/ui/form-field'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useTranslation } from '@/lib/hooks/use-translation'
import type { CheckoutData } from '../checkout-content'

type Props = {
  data: CheckoutData
  updateData: (data: Partial<CheckoutData>) => void
  onNext: () => void
}

export function CheckoutStep1({ data, updateData, onNext }: Props) {
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.email || !data.firstName || !data.lastName || !data.phone) {
      return
    }
    onNext()
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
      <h2 className="font-sans text-2xl font-bold text-[#1A1A1A] mb-6">
        {t('boutique.checkout.step1.title', 'Informations client')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            label={t('boutique.checkout.step1.firstName', 'Prénom')}
            name="firstName"
            type="text"
            required
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
          />
          <InputField
            label={t('boutique.checkout.step1.lastName', 'Nom')}
            name="lastName"
            type="text"
            required
            value={data.lastName}
            onChange={(e) => updateData({ lastName: e.target.value })}
          />
        </div>

        <InputField
          label={t('boutique.checkout.step1.email', 'Email')}
          name="email"
          type="email"
          required
          value={data.email}
          onChange={(e) => updateData({ email: e.target.value })}
        />

        <InputField
          label={t('boutique.checkout.step1.phone', 'Téléphone')}
          name="phone"
          type="tel"
          required
          value={data.phone}
          onChange={(e) => updateData({ phone: e.target.value })}
        />

        <div className="flex items-center gap-2">
          <Checkbox
            id="createAccount"
            checked={data.createAccount}
            onCheckedChange={(checked) => updateData({ createAccount: checked as boolean })}
          />
          <label htmlFor="createAccount" className="text-sm text-gray-700 cursor-pointer">
            {t('boutique.checkout.step1.createAccount', 'Créer un compte pour suivre ma commande')}
          </label>
        </div>

        <div className="flex justify-end pt-4">
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

