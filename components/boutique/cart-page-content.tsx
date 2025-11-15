'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/components/providers/cart-provider'
import { formatCurrency } from '@/lib/utils'
import { 
  ShoppingCart, 
  Minus, 
  Plus, 
  Trash2, 
  ArrowRight,
  Tag,
  AlertCircle,
  CheckCircle2
} from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from '@/lib/hooks/use-translation'
import { validateCoupon } from '@/lib/supabase/ecommerce-helpers'

export function CartPageContent() {
  const { t } = useTranslation()
  const {
    items,
    totalQuantity,
    totalAmount,
    formattedTotal,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
  } = useCart()

  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false)
  const [shippingCost, setShippingCost] = useState(0)

  // Calcul du total final
  const finalTotal = totalAmount - discountAmount + shippingCost

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error(t('boutique.cart.enterCoupon', 'Veuillez entrer un code promo'))
      return
    }

    setIsValidatingCoupon(true)
    try {
      const { valid, discount, error, coupon } = await validateCoupon(couponCode, totalAmount)
      
      if (valid && discount) {
        setAppliedCoupon(coupon)
        setDiscountAmount(discount)
        toast.success(t('boutique.cart.couponApplied', 'Code promo appliqué avec succès'))
      } else {
        toast.error(error?.message || t('boutique.cart.invalidCoupon', 'Code promo invalide'))
      }
    } catch (err: any) {
      toast.error(err.message || t('boutique.cart.couponError', 'Erreur lors de la validation du code promo'))
    } finally {
      setIsValidatingCoupon(false)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setDiscountAmount(0)
    setCouponCode('')
    toast.success(t('boutique.cart.couponRemoved', 'Code promo retiré'))
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="font-sans text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            {t('boutique.cart.empty', 'Votre panier est vide')}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {t('boutique.cart.emptyDescription', 'Découvrez nos produits et ajoutez-les à votre panier')}
          </p>
          <Link href="/boutique">
            <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold px-8 h-12 rounded-xl">
              {t('boutique.cart.continueShopping', 'Continuer les achats')}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="font-sans text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
          {t('boutique.cart.title', 'Mon Panier')}
        </h1>
        <p className="text-gray-600">
          {t('boutique.cart.itemsCount', `${totalQuantity} article${totalQuantity > 1 ? 's' : ''} dans votre panier`)}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Colonne gauche - Produits */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                {/* Image */}
                <Link href={`/boutique/produit/${item.product_id}`} className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </Link>

                {/* Informations */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <Link 
                        href={`/boutique/produit/${item.product_id}`}
                        className="font-semibold text-lg text-[#1A1A1A] hover:text-[#D4AF37] transition-colors block mb-1"
                      >
                        {item.name}
                      </Link>
                      {item.variant_name && (
                        <p className="text-sm text-gray-600 mb-1">
                          {item.variant_name}
                        </p>
                      )}
                      {(item.size || item.shoe_size || item.color) && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          {item.size && <span>{t('boutique.cart.size', 'Taille')}: {item.size}</span>}
                          {item.shoe_size && <span>{t('boutique.cart.shoeSize', 'Pointure')}: {item.shoe_size}</span>}
                          {item.color && (
                            <span className="flex items-center gap-1">
                              {t('boutique.cart.color', 'Couleur')}: {item.color}
                              {item.color_hex && (
                                <span
                                  className="w-4 h-4 rounded-full border border-gray-300"
                                  style={{ backgroundColor: item.color_hex }}
                                />
                              )}
                            </span>
                          )}
                        </div>
                      )}
                      {item.stock_quantity !== undefined && item.stock_quantity < 10 && (
                        <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          {t('boutique.cart.lowStock', `Il reste ${item.stock_quantity} article${item.stock_quantity > 1 ? 's' : ''}`)}
                        </div>
                      )}
                    </div>

                    {/* Prix unitaire */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-lg text-[#1A1A1A]">
                        {formatCurrency(item.price)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t('boutique.cart.unit', 'unité')}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    {/* Quantité */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decrementItem(item.id)}
                        className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-[#D4AF37] flex items-center justify-center transition-colors"
                        aria-label="Diminuer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => {
                          if (item.stock_quantity !== undefined && item.quantity >= item.stock_quantity) {
                            toast.error(t('boutique.cart.maxStock', 'Stock maximum atteint'))
                            return
                          }
                          incrementItem(item.id)
                        }}
                        className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-[#D4AF37] flex items-center justify-center transition-colors"
                        aria-label="Augmenter"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Total et supprimer */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-lg text-[#1A1A1A]">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {t('boutique.cart.total', 'total')}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-10 h-10 rounded-lg border-2 border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Vider le panier */}
          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => {
                if (confirm(t('boutique.cart.clearConfirm', 'Êtes-vous sûr de vouloir vider le panier ?'))) {
                  clearCart()
                  toast.success(t('boutique.cart.cleared', 'Panier vidé'))
                }
              }}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t('boutique.cart.clear', 'Vider le panier')}
            </Button>
          </div>
        </div>

        {/* Colonne droite - Résumé */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
            <h2 className="font-sans text-xl font-bold text-[#1A1A1A] mb-6">
              {t('boutique.cart.summary', 'Résumé de la commande')}
            </h2>

            {/* Code promo */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {t('boutique.cart.coupon', 'Code promo')}
              </label>
              {appliedCoupon ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">{appliedCoupon.code}</span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                      {t('boutique.cart.remove', 'Retirer')}
                    </button>
                  </div>
                  <p className="text-sm text-green-700">
                    {appliedCoupon.discount_type === 'percentage'
                      ? `-${appliedCoupon.discount_value}%`
                      : `-${formatCurrency(appliedCoupon.discount_value)}`}
                  </p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder={t('boutique.cart.couponPlaceholder', 'Entrez votre code')}
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleApplyCoupon()
                      }
                    }}
                  />
                  <Button
                    onClick={handleApplyCoupon}
                    disabled={isValidatingCoupon || !couponCode.trim()}
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                  >
                    {isValidatingCoupon ? '...' : <Tag className="w-4 h-4" />}
                  </Button>
                </div>
              )}
            </div>

            {/* Détails */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {t('boutique.cart.subtotal', 'Sous-total')}
                </span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {t('boutique.cart.discount', 'Réduction')}
                  </span>
                  <span className="font-medium text-green-600">
                    -{formatCurrency(discountAmount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {t('boutique.cart.shipping', 'Livraison')}
                </span>
                <span className="font-medium text-gray-900">
                  {shippingCost === 0 
                    ? t('boutique.cart.freeShipping', 'Gratuite')
                    : formatCurrency(shippingCost)}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-6 border-t-2 border-gray-300 mb-6">
              <span className="font-sans text-lg font-bold text-[#1A1A1A]">
                {t('boutique.cart.total', 'Total')}
              </span>
              <span className="font-sans text-2xl font-bold text-[#D4AF37]">
                {formatCurrency(finalTotal)}
              </span>
            </div>

            {/* Bouton checkout */}
            <Link href="/boutique/checkout" className="block">
              <Button className="w-full h-14 bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all">
                {t('boutique.cart.checkout', 'Passer la commande')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            {/* Continuer les achats */}
            <Link href="/boutique" className="block mt-4 text-center text-sm text-gray-600 hover:text-[#D4AF37] transition-colors">
              {t('boutique.cart.continueShopping', 'Continuer les achats')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

