'use client'

import { formatCurrency } from '@/lib/utils'
import { useTranslation } from '@/lib/hooks/use-translation'
import { CheckCircle2, Package, Truck, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Order } from '@/lib/supabase/ecommerce-helpers'

type Props = {
  order: Order
}

export function OrderConfirmation({ order }: Props) {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
      <div className="max-w-3xl mx-auto">
        {/* Succès */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="font-sans text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            {t('boutique.confirmation.title', 'Commande confirmée !')}
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            {t('boutique.confirmation.thankYou', 'Merci pour votre achat')}
          </p>
          <p className="text-sm text-gray-500">
            {t('boutique.confirmation.emailSent', 'Un email de confirmation a été envoyé à votre adresse')}
          </p>
        </div>

        {/* Numéro de commande */}
        <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 border-2 border-[#D4AF37] rounded-2xl p-8 mb-8 text-center">
          <p className="text-sm text-gray-600 mb-2">
            {t('boutique.confirmation.orderNumber', 'Numéro de commande')}
          </p>
          <p className="font-mono text-3xl font-bold text-[#D4AF37]">
            {order.order_number}
          </p>
        </div>

        {/* Détails de la commande */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-sans text-xl font-bold text-[#1A1A1A] mb-6">
            {t('boutique.confirmation.orderDetails', 'Détails de la commande')}
          </h2>

          {/* Produits */}
          {order.items && order.items.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                {t('boutique.confirmation.products', 'Produits')}
              </h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{item.product_name}</p>
                      {item.variant_name && (
                        <p className="text-sm text-gray-600">{item.variant_name}</p>
                      )}
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(item.total_price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Totaux */}
          <div className="border-t border-gray-200 pt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t('boutique.confirmation.subtotal', 'Sous-total')}</span>
              <span className="font-medium">{formatCurrency(order.subtotal)}</span>
            </div>
            {order.shipping_cost > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('boutique.confirmation.shipping', 'Livraison')}</span>
                <span className="font-medium">{formatCurrency(order.shipping_cost)}</span>
              </div>
            )}
            {order.discount_amount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>{t('boutique.confirmation.discount', 'Réduction')}</span>
                <span className="font-medium">-{formatCurrency(order.discount_amount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
              <span>{t('boutique.confirmation.total', 'Total')}</span>
              <span className="text-[#D4AF37]">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Informations de livraison */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-sans text-xl font-bold text-[#1A1A1A] mb-6">
            {t('boutique.confirmation.shippingInfo', 'Informations de livraison')}
          </h2>
          
          {order.shipping_address && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    {t('boutique.confirmation.address', 'Adresse de livraison')}
                  </p>
                  <p className="text-sm text-gray-600">
                    {typeof order.shipping_address === 'object' 
                      ? `${order.shipping_address.address_line1 || ''}${order.shipping_address.address_line2 ? `, ${order.shipping_address.address_line2}` : ''}, ${order.shipping_address.city || ''} ${order.shipping_address.postal_code || ''}`
                      : order.shipping_address}
                  </p>
                </div>
              </div>
              
              {order.shipping_method && (
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      {t('boutique.confirmation.method', 'Mode de livraison')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.shipping_method === 'standard' 
                        ? t('boutique.confirmation.standard', 'Livraison standard (5-7 jours)')
                        : t('boutique.confirmation.express', 'Livraison express (2-3 jours)')}
                    </p>
                  </div>
                </div>
              )}

              {order.tracking_number && (
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      {t('boutique.confirmation.tracking', 'Numéro de suivi')}
                    </p>
                    <p className="text-sm text-gray-600 font-mono">
                      {order.tracking_number}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Statut */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-900 mb-1">
                {t('boutique.confirmation.status', 'Statut de la commande')}
              </p>
              <p className="text-sm text-blue-700">
                {order.status === 'pending' && t('boutique.confirmation.statusPending', 'En attente de traitement')}
                {order.status === 'processing' && t('boutique.confirmation.statusProcessing', 'En cours de préparation')}
                {order.status === 'shipped' && t('boutique.confirmation.statusShipped', 'Expédiée')}
                {order.status === 'delivered' && t('boutique.confirmation.statusDelivered', 'Livrée')}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/mon-compte/commandes">
            <Button variant="outline" className="border-gray-300 w-full sm:w-auto">
              {t('boutique.confirmation.viewOrders', 'Voir mes commandes')}
            </Button>
          </Link>
          <Link href="/boutique">
            <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold w-full sm:w-auto">
              {t('boutique.confirmation.continueShopping', 'Continuer les achats')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

