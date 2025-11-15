'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/providers/cart-provider'
import { formatCurrency } from '@/lib/utils'
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Check, 
  AlertCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Package,
  Truck,
  RotateCcw,
  Info
} from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from '@/lib/hooks/use-translation'
import type { Product, ProductVariant } from '@/lib/supabase/ecommerce-helpers'
import Link from 'next/link'

type ProductDetailsProps = {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { t } = useTranslation()
  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  )
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedShoeSize, setSelectedShoeSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  // Images du produit
  const images = useMemo(() => {
    if (!product.images || product.images.length === 0) {
      return [{ image_url: product.images?.[0]?.image_url || '/placeholder.svg', alt_text: product.name }]
    }
    return product.images.sort((a, b) => a.sort_order - b.sort_order)
  }, [product.images, product.name])

  // Variantes disponibles selon les sélections
  const availableVariants = useMemo(() => {
    if (!product.variants || product.variants.length === 0) return []
    
    return product.variants.filter(v => {
      if (!v.is_active) return false
      if (selectedSize && v.size !== selectedSize) return false
      if (selectedShoeSize && v.shoe_size !== selectedShoeSize) return false
      if (selectedColor && v.color !== selectedColor) return true // On garde toutes les couleurs pour l'affichage
      return true
    })
  }, [product.variants, selectedSize, selectedShoeSize, selectedColor])

  // Variante sélectionnée finale
  const finalVariant = useMemo(() => {
    if (!selectedSize && !selectedShoeSize && !selectedColor && availableVariants.length > 0) {
      return availableVariants[0]
    }
    
    return availableVariants.find(v => {
      const sizeMatch = !selectedSize || v.size === selectedSize
      const shoeSizeMatch = !selectedShoeSize || v.shoe_size === selectedShoeSize
      const colorMatch = !selectedColor || v.color === selectedColor
      return sizeMatch && shoeSizeMatch && colorMatch
    }) || null
  }, [availableVariants, selectedSize, selectedShoeSize, selectedColor])

  // Prix final (variante ou produit de base)
  const finalPrice = useMemo(() => {
    if (finalVariant && finalVariant.price) {
      return finalVariant.price
    }
    return product.base_price
  }, [finalVariant, product.base_price])

  // Stock disponible
  const stockAvailable = useMemo(() => {
    if (finalVariant) {
      return finalVariant.stock_quantity
    }
    return null
  }, [finalVariant])

  // Tailles disponibles
  const availableSizes = useMemo(() => {
    if (!product.variants) return []
    const sizes = new Set(product.variants.filter(v => v.is_active && v.size).map(v => v.size))
    return Array.from(sizes).filter(Boolean).sort()
  }, [product.variants])

  // Pointures disponibles
  const availableShoeSizes = useMemo(() => {
    if (!product.variants) return []
    const shoeSizes = new Set(product.variants.filter(v => v.is_active && v.shoe_size).map(v => v.shoe_size))
    return Array.from(shoeSizes).filter(Boolean).sort((a, b) => {
      const numA = parseInt(a || '0')
      const numB = parseInt(b || '0')
      return numA - numB
    })
  }, [product.variants])

  // Couleurs disponibles
  const availableColors = useMemo(() => {
    if (!product.variants) return []
    const colors = product.variants
      .filter(v => v.is_active && v.color)
      .map(v => ({ color: v.color, hex: v.color_hex }))
      .filter((v, i, self) => i === self.findIndex(t => t.color === v.color))
    return colors
  }, [product.variants])

  // Image principale
  const primaryImage = images[currentImageIndex] || images[0]

  const handleAddToCart = () => {
    if (product.variants && product.variants.length > 0 && !finalVariant) {
      toast.error(t('boutique.product.selectVariant', 'Veuillez sélectionner une variante'))
      return
    }

    if (finalVariant && stockAvailable !== null && stockAvailable < quantity) {
      toast.error(t('boutique.product.insufficientStock', 'Stock insuffisant'))
      return
    }

    const imageUrl = primaryImage?.image_url || '/placeholder.svg'
    
    addItem({
      product_id: product.id,
      variant_id: finalVariant?.id || null,
      name: product.name,
      variant_name: finalVariant?.name || null,
      price: finalPrice,
      image: imageUrl,
      sku: finalVariant?.sku || product.sku || null,
      size: finalVariant?.size || selectedSize || null,
      shoe_size: finalVariant?.shoe_size || selectedShoeSize || null,
      color: finalVariant?.color || selectedColor || null,
      color_hex: finalVariant?.color_hex || null,
      stock_quantity: stockAvailable || undefined,
    }, { openCart: true })

    toast.success(t('boutique.product.addedToCart', 'Produit ajouté au panier'))
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.short_description || product.description || '',
          url: window.location.href,
        })
      } catch (err) {
        // L'utilisateur a annulé
      }
    } else {
      // Fallback : copier le lien
      navigator.clipboard.writeText(window.location.href)
      toast.success(t('boutique.product.linkCopied', 'Lien copié'))
    }
  }

  // Note moyenne des avis
  const averageRating = useMemo(() => {
    if (!product.reviews || product.reviews.length === 0) return 0
    const approvedReviews = product.reviews.filter(r => r.is_approved)
    if (approvedReviews.length === 0) return 0
    const sum = approvedReviews.reduce((acc, r) => acc + r.rating, 0)
    return sum / approvedReviews.length
  }, [product.reviews])

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/boutique" className="hover:text-[#D4AF37] transition-colors">
              {t('boutique.title', 'Boutique')}
            </Link>
            <span>/</span>
            {product.category && (
              <>
                <Link href={`/boutique/categories/${product.category.slug}`} className="hover:text-[#D4AF37] transition-colors">
                  {product.category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Colonne gauche - Images */}
          <div className="space-y-4">
            {/* Image principale */}
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
              <Image
                src={primaryImage?.image_url || '/placeholder.svg'}
                alt={primaryImage?.alt_text || product.name}
                fill
                className="object-cover"
                priority
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                aria-label="Zoom"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            {/* Miniatures */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/20'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image.image_url}
                      alt={image.alt_text || `${product.name} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Colonne droite - Informations */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              {product.is_new && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {t('boutique.product.new', 'Nouveau')}
                </span>
              )}
              {product.is_bestseller && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#D4AF37] text-white rounded-full text-xs font-semibold">
                  <Star className="w-3 h-3 fill-current" />
                  {t('boutique.product.bestseller', 'Best-seller')}
                </span>
              )}
              {product.is_featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                  {t('boutique.product.featured', 'En vedette')}
                </span>
              )}
              {averageRating > 0 && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  <span className="font-medium">{averageRating.toFixed(1)}</span>
                  <span className="text-gray-400">
                    ({product.reviews?.filter(r => r.is_approved).length || 0})
                  </span>
                </div>
              )}
            </div>

            {/* Titre */}
            <h1 className="font-sans text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              {product.name}
            </h1>

            {/* Prix */}
            <div className="flex items-center gap-4">
              <span className="font-sans text-3xl font-bold text-[#D4AF37]">
                {formatCurrency(finalPrice)}
              </span>
              {product.compare_at_price && product.compare_at_price > finalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {formatCurrency(product.compare_at_price)}
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-semibold">
                    -{Math.round(((product.compare_at_price - finalPrice) / product.compare_at_price) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* SKU */}
            {product.sku && (
              <p className="text-sm text-gray-500">
                {t('boutique.product.sku', 'Référence')}: <span className="font-mono">{product.sku}</span>
              </p>
            )}

            {/* Description courte */}
            {product.short_description && (
              <p className="text-lg text-gray-700 leading-relaxed">
                {product.short_description}
              </p>
            )}

            {/* Variantes - Taille */}
            {availableSizes.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('boutique.product.size', 'Taille')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                        selectedSize === size
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                          : 'border-gray-300 hover:border-[#D4AF37]/50 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variantes - Pointure */}
            {availableShoeSizes.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('boutique.product.shoeSize', 'Pointure')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableShoeSizes.map((shoeSize) => (
                    <button
                      key={shoeSize}
                      onClick={() => setSelectedShoeSize(shoeSize)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                        selectedShoeSize === shoeSize
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                          : 'border-gray-300 hover:border-[#D4AF37]/50 text-gray-700'
                      }`}
                    >
                      {shoeSize}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variantes - Couleur */}
            {availableColors.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('boutique.product.color', 'Couleur')}
                </label>
                <div className="flex flex-wrap gap-3">
                  {availableColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color.color || null)}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color.color
                          ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/20 scale-110'
                          : 'border-gray-300 hover:border-[#D4AF37]/50'
                      }`}
                      style={{ backgroundColor: color.hex || '#ccc' }}
                      aria-label={color.color || 'Couleur'}
                    >
                      {selectedColor === color.color && (
                        <Check className="w-5 h-5 text-white mx-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            {stockAvailable !== null && (
              <div className="flex items-center gap-2">
                  {stockAvailable > 0 ? (
                    <>
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700">
                        {stockAvailable > 10
                          ? t('boutique.product.inStock', 'En stock')
                          : t('boutique.product.lowStock', `Il reste ${stockAvailable} article${stockAvailable > 1 ? 's' : ''}`)}
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-sm text-red-600 font-medium">
                        {t('boutique.product.outOfStock', 'Rupture de stock')}
                      </span>
                    </>
                  )}
              </div>
            )}

            {/* Quantité */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {t('boutique.product.quantity', 'Quantité')}
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-[#D4AF37] flex items-center justify-center transition-colors"
                  aria-label="Diminuer"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => {
                    const maxQty = stockAvailable !== null ? stockAvailable : 99
                    setQuantity(Math.min(maxQty, quantity + 1))
                  }}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-[#D4AF37] flex items-center justify-center transition-colors"
                  aria-label="Augmenter"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={stockAvailable === 0 || (product.variants && product.variants.length > 0 && !finalVariant)}
                className="flex-1 h-14 bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {t('boutique.product.addToCart', 'Ajouter au panier')}
              </Button>
              <Button
                variant="outline"
                className="h-14 px-6 border-2 border-gray-300 hover:border-[#D4AF37] rounded-xl"
                aria-label="Ajouter à la wishlist"
              >
                <Heart className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="h-14 px-6 border-2 border-gray-300 hover:border-[#D4AF37] rounded-xl"
                aria-label="Partager"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Informations supplémentaires */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-gray-900">
                    {t('boutique.product.shipping', 'Livraison')}
                  </p>
                  <p className="text-xs text-gray-600">
                    {t('boutique.product.shippingInfo', 'Livraison sous 3-5 jours')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-gray-900">
                    {t('boutique.product.returns', 'Retours')}
                  </p>
                  <p className="text-xs text-gray-600">
                    {t('boutique.product.returnsInfo', '30 jours pour retourner')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-gray-900">
                    {t('boutique.product.exchange', 'Échange')}
                  </p>
                  <p className="text-xs text-gray-600">
                    {t('boutique.product.exchangeInfo', 'Échange gratuit')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description complète */}
        {product.description && (
          <div className="mt-12 pt-12 border-t border-gray-200">
            <h2 className="font-sans text-2xl font-bold text-[#1A1A1A] mb-6">
              {t('boutique.product.description', 'Description')}
            </h2>
            <div 
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}

        {/* Avis clients */}
        {product.reviews && product.reviews.filter(r => r.is_approved).length > 0 && (
          <div className="mt-12 pt-12 border-t border-gray-200">
            <h2 className="font-sans text-2xl font-bold text-[#1A1A1A] mb-6">
              {t('boutique.product.reviews', 'Avis clients')}
            </h2>
            <div className="space-y-6">
              {product.reviews.filter(r => r.is_approved).map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-[#D4AF37] text-[#D4AF37]'
                                : 'fill-gray-300 text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      {review.title && (
                        <h4 className="font-semibold text-gray-900">{review.title}</h4>
                      )}
                    </div>
                    {review.is_verified_purchase && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                        {t('boutique.product.verifiedPurchase', 'Achat vérifié')}
                      </span>
                    )}
                  </div>
                  {review.comment && (
                    <p className="text-gray-700 leading-relaxed mb-2">{review.comment}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    {review.user?.first_name && review.user?.last_name
                      ? `${review.user.first_name} ${review.user.last_name}`
                      : t('boutique.product.anonymous', 'Anonyme')}
                    {' • '}
                    {new Date(review.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

