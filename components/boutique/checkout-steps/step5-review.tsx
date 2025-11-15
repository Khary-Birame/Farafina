'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useCart } from '@/components/providers/cart-provider'
import { formatCurrency } from '@/lib/utils'
import { useTranslation } from '@/lib/hooks/use-translation'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import type { CheckoutData } from '../checkout-content'

type Props = {
  data: CheckoutData
  updateData: (data: Partial<CheckoutData>) => void
  onSubmit: () => void
  onPrev: () => void
  isSubmitting: boolean
}

export function CheckoutStep5({ data, updateData, onSubmit, onPrev, isSubmitting }: Props) {
  const { t } = useTranslation()
  const { items, totalAmount } = useCart()

  const finalTotal = totalAmount + data.shippingCost

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
      <h2 className="font-sans text-2xl font-bold text-[#1A1A1A] mb-6">
        {t('boutique.checkout.step5.title', 'Résumé de la commande')}
      </h2>

      {/* Produits */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-[#1A1A1A] mb-4">
          {t('boutique.checkout.step5.products', 'Produits')}
        </h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                {item.variant_name && (
                  <p className="text-gray-600 text-xs">{item.variant_name}</p>
                )}
                <p className="text-gray-500 text-xs">x{item.quantity}</p>
              </div>
              <p className="font-semibold text-gray-900">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Totaux */}
      <div className="border-t border-gray-200 pt-4 mb-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{t('boutique.checkout.step5.subtotal', 'Sous-total')}</span>
          <span className="font-medium">{formatCurrency(totalAmount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{t('boutique.checkout.step5.shipping', 'Livraison')}</span>
          <span className="font-medium">
            {data.shippingCost === 0 
              ? t('boutique.checkout.step5.free', 'Gratuite')
              : formatCurrency(data.shippingCost)}
          </span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
          <span>{t('boutique.checkout.step5.total', 'Total')}</span>
          <span className="text-[#D4AF37]">{formatCurrency(finalTotal)}</span>
        </div>
      </div>

      {/* Conditions */}
      <div className="mb-6">
        <div className="flex items-start gap-2">
          <Checkbox
            id="acceptTerms"
            checked={data.acceptTerms}
            onCheckedChange={(checked) => updateData({ acceptTerms: checked as boolean })}
            className="mt-1"
          />
          <label htmlFor="acceptTerms" className="text-sm text-gray-700 cursor-pointer">
            {t('boutique.checkout.step5.acceptTerms', 'J\'accepte les')}{' '}
            <Link href="/terms" className="text-[#D4AF37] hover:underline">
              {t('boutique.checkout.step5.terms', 'conditions générales de vente')}
            </Link>
          </label>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          className="border-gray-300"
          disabled={isSubmitting}
        >
          {t('boutique.checkout.back', 'Retour')}
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!data.acceptTerms || isSubmitting}
          className="bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold px-8 h-12 rounded-xl disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              {t('boutique.checkout.step5.processing', 'Traitement...')}
            </>
          ) : (
            t('boutique.checkout.step5.confirm', 'Confirmer la commande')
          )}
        </Button>
      </div>
    </div>
  )
}

