'use client'

import { useState, useMemo, useEffect } from 'react'
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
  Info,
  Minus,
  Plus,
  ArrowLeft,
  Sparkles,
  Award,
  Shield,
  TrendingUp
} from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from '@/lib/hooks/use-translation'
import type { Product, ProductVariant } from '@/lib/supabase/ecommerce-helpers'
import Link from 'next/link'
import { cn } from '@/lib/utils'

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
  const [isLiked, setIsLiked] = useState(false)
  const [isImageFullscreen, setIsImageFullscreen] = useState(false)

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
      if (selectedColor && v.color !== selectedColor) return true
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

  // Prix final
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

  // Note moyenne des avis
  const averageRating = useMemo(() => {
    if (!product.reviews || product.reviews.length === 0) return 0
    const approvedReviews = product.reviews.filter(r => r.is_approved)
    if (approvedReviews.length === 0) return 0
    const sum = approvedReviews.reduce((acc, r) => acc + r.rating, 0)
    return sum / approvedReviews.length
  }, [product.reviews])

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
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success(t('boutique.product.linkCopied', 'Lien copié'))
    }
  }

  // Keyboard navigation for images
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isImageFullscreen) {
        if (e.key === 'ArrowLeft') {
          setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
        } else if (e.key === 'ArrowRight') {
          setCurrentImageIndex((prev) => (prev + 1) % images.length)
        } else if (e.key === 'Escape') {
          setIsImageFullscreen(false)
        }
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isImageFullscreen, images.length])

  return (
    <div className="bg-[#0f1012] min-h-screen">
      {/* Breadcrumb Premium */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#0f1012] to-[#1a1a1a]">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-white/70" aria-label="Breadcrumb">
            <Link href="/boutique" className="hover:text-[#D4AF37] transition-colors font-medium">
              {t('boutique.title', 'Boutique')}
            </Link>
            <span className="text-white/40">/</span>
            {product.category && (
              <>
                <Link href={`/boutique/categories/${product.category.slug}`} className="hover:text-[#D4AF37] transition-colors font-medium">
                  {product.category.name}
                </Link>
                <span className="text-white/40">/</span>
              </>
            )}
            <span className="text-white font-semibold">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Colonne gauche - Galerie Premium */}
          <div className="space-y-6">
            {/* Image principale avec zoom */}
            <div className="relative aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#0f1012] rounded-3xl overflow-hidden group shadow-2xl border-4 border-white/10">
              <Image
                src={primaryImage?.image_url || '/placeholder.svg'}
                alt={primaryImage?.alt_text || product.name}
                fill
                className={cn(
                  "object-cover transition-transform duration-700 cursor-zoom-in",
                  isZoomed && "scale-150"
                )}
                priority
                onClick={() => setIsImageFullscreen(true)}
              />
              
              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10 border border-white/20"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImageIndex((prev) => (prev + 1) % images.length)
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10 border border-white/20"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}
              
              {/* Zoom button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsZoomed(!isZoomed)
                }}
                className="absolute bottom-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10 border border-white/20 text-white"
                aria-label="Zoom"
              >
                <ZoomIn className="w-6 h-6" />
              </button>

              {/* Image counter */}
              {images.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold z-10">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Miniatures avec design premium */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "relative aspect-square rounded-2xl overflow-hidden border-4 transition-all duration-300 group",
                      index === currentImageIndex
                        ? 'border-[#D4AF37] ring-4 ring-[#D4AF37]/20 shadow-lg scale-105'
                        : 'border-transparent hover:border-white/30 hover:scale-105'
                    )}
                    aria-label={`Voir l'image ${index + 1}`}
                  >
                    <Image
                      src={image.image_url}
                      alt={image.alt_text || `${product.name} - ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {index === currentImageIndex && (
                      <div className="absolute inset-0 bg-[#D4AF37]/10" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Colonne droite - Informations Premium */}
          <div className="space-y-8">
            {/* Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              {product.is_new && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-bold shadow-lg">
                  <Sparkles className="w-4 h-4" />
                  {t('boutique.product.new', 'Nouveau')}
                </span>
              )}
              {product.is_bestseller && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-sm font-bold shadow-lg">
                  <Star className="w-4 h-4 fill-white" />
                  {t('boutique.product.bestseller', 'Best-seller')}
                </span>
              )}
              {product.is_featured && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm font-bold shadow-lg">
                  <Award className="w-4 h-4" />
                  {t('boutique.product.featured', 'En vedette')}
                </span>
              )}
              {averageRating > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                  <Star className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                  <span className="font-bold text-white">{averageRating.toFixed(1)}</span>
                  <span className="text-white/60 text-sm">
                    ({product.reviews?.filter(r => r.is_approved).length || 0})
                  </span>
                </div>
              )}
            </div>

            {/* Titre */}
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {product.name}
            </h1>

            {/* Prix Premium */}
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-black bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">
                {formatCurrency(finalPrice)}
              </span>
              {product.compare_at_price && product.compare_at_price > finalPrice && (
                <>
                  <span className="text-2xl text-white/40 line-through">
                    {formatCurrency(product.compare_at_price)}
                  </span>
                  <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm font-bold shadow-lg">
                    -{Math.round(((product.compare_at_price - finalPrice) / product.compare_at_price) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* SKU */}
            {product.sku && (
              <p className="text-sm text-white/60">
                {t('boutique.product.sku', 'Référence')}: <span className="font-mono font-semibold text-white/80">{product.sku}</span>
              </p>
            )}

            {/* Description courte */}
            {product.short_description && (
              <p className="text-lg text-white/80 leading-relaxed">
                {product.short_description}
              </p>
            )}

            {/* Variantes - Taille */}
            {availableSizes.length > 0 && (
              <div>
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                  {t('boutique.product.size', 'Taille')}
                </label>
                <div className="flex flex-wrap gap-3">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "px-6 py-3 rounded-xl border-2 font-bold text-lg transition-all duration-300 min-w-[60px]",
                        selectedSize === size
                          ? 'border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white shadow-lg scale-105'
                          : 'border-white/20 hover:border-[#D4AF37]/50 text-white/70 hover:bg-[#D4AF37]/10 bg-white/5'
                      )}
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
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                  {t('boutique.product.shoeSize', 'Pointure')}
                </label>
                <div className="flex flex-wrap gap-3">
                  {availableShoeSizes.map((shoeSize) => (
                    <button
                      key={shoeSize}
                      onClick={() => setSelectedShoeSize(shoeSize)}
                      className={cn(
                        "px-6 py-3 rounded-xl border-2 font-bold text-lg transition-all duration-300 min-w-[60px]",
                        selectedShoeSize === shoeSize
                          ? 'border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white shadow-lg scale-105'
                          : 'border-white/20 hover:border-[#D4AF37]/50 text-white/70 hover:bg-[#D4AF37]/10 bg-white/5'
                      )}
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
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                  {t('boutique.product.color', 'Couleur')}
                </label>
                <div className="flex flex-wrap gap-4">
                  {availableColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color.color || null)}
                      className={cn(
                        "w-16 h-16 rounded-full border-4 transition-all duration-300 shadow-lg hover:scale-110",
                        selectedColor === color.color
                          ? 'border-[#D4AF37] ring-4 ring-[#D4AF37]/30 scale-110'
                          : 'border-white/20 hover:border-[#D4AF37]/50'
                      )}
                      style={{ backgroundColor: color.hex || '#ccc' }}
                      aria-label={color.color || 'Couleur'}
                    >
                      {selectedColor === color.color && (
                        <Check className="w-6 h-6 text-white mx-auto drop-shadow-lg" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            {stockAvailable !== null && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-white/10">
                {stockAvailable > 0 ? (
                  <>
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white">
                        {stockAvailable > 10
                          ? t('boutique.product.inStock', 'En stock')
                          : t('boutique.product.lowStock', `Il reste ${stockAvailable} article${stockAvailable > 1 ? 's' : ''}`)}
                      </p>
                      <p className="text-sm text-white/60">{stockAvailable} disponible{stockAvailable > 1 ? 's' : ''}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <p className="font-bold text-red-400">
                        {t('boutique.product.outOfStock', 'Rupture de stock')}
                      </p>
                      <p className="text-sm text-white/60">Réapprovisionnement en cours</p>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Quantité */}
            <div>
              <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                {t('boutique.product.quantity', 'Quantité')}
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-14 h-14 rounded-xl border-2 border-white/20 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white flex items-center justify-center transition-all duration-300 font-bold text-xl shadow-sm hover:shadow-lg bg-white/5"
                  aria-label="Diminuer"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-20 text-center font-black text-2xl text-white">{quantity}</span>
                <button
                  onClick={() => {
                    const maxQty = stockAvailable !== null ? stockAvailable : 99
                    setQuantity(Math.min(maxQty, quantity + 1))
                  }}
                  className="w-14 h-14 rounded-xl border-2 border-white/20 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white flex items-center justify-center transition-all duration-300 font-bold text-xl shadow-sm hover:shadow-lg bg-white/5"
                  aria-label="Augmenter"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Actions Premium */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={stockAvailable === 0 || (product.variants && product.variants.length > 0 && !finalVariant)}
                className="w-full h-16 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <ShoppingCart className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                {t('boutique.product.addToCart', 'Ajouter au panier')}
              </Button>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsLiked(!isLiked)}
                  className={cn(
                    "flex-1 h-14 border-2 rounded-xl transition-all duration-300",
                    isLiked 
                      ? "border-red-500 bg-red-500/20 text-red-400" 
                      : "border-white/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-white bg-white/5"
                  )}
                  aria-label="Ajouter à la wishlist"
                >
                  <Heart className={cn("w-5 h-5", isLiked && "fill-red-500 text-red-500")} />
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="flex-1 h-14 border-2 border-white/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-white bg-white/5 rounded-xl transition-all duration-300"
                  aria-label="Partager"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Informations supplémentaires Premium */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t-2 border-white/10">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white mb-1">
                    {t('boutique.product.shipping', 'Livraison')}
                  </p>
                  <p className="text-xs text-white/60">
                    {t('boutique.product.shippingInfo', 'Sous 3-5 jours')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white mb-1">
                    {t('boutique.product.returns', 'Retours')}
                  </p>
                  <p className="text-xs text-white/60">
                    {t('boutique.product.returnsInfo', '30 jours')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                  <RotateCcw className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white mb-1">
                    {t('boutique.product.exchange', 'Échange')}
                  </p>
                  <p className="text-xs text-white/60">
                    {t('boutique.product.exchangeInfo', 'Gratuit')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description complète Premium */}
        {product.description && (
          <div className="mt-16 pt-16 border-t-2 border-white/10">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl shadow-lg">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-black text-white">
                  {t('boutique.product.description', 'Description')}
                </h2>
              </div>
              <div 
                className="prose prose-lg prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>
        )}

        {/* Avis clients Premium */}
        {product.reviews && product.reviews.filter(r => r.is_approved).length > 0 && (
          <div className="mt-16 pt-16 border-t-2 border-white/10">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl shadow-lg">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <h2 className="text-3xl font-black text-white">
                  {t('boutique.product.reviews', 'Avis clients')}
                </h2>
              </div>
              <div className="space-y-6">
                {product.reviews.filter(r => r.is_approved).map((review) => (
                  <div key={review.id} className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-5 h-5",
                                i < review.rating
                                  ? 'fill-[#D4AF37] text-[#D4AF37]'
                                  : 'fill-white/20 text-white/20'
                              )}
                            />
                          ))}
                        </div>
                        {review.title && (
                          <h4 className="font-bold text-lg text-white mb-2">{review.title}</h4>
                        )}
                      </div>
                      {review.is_verified_purchase && (
                        <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-xs font-bold shadow-md">
                          {t('boutique.product.verifiedPurchase', 'Achat vérifié')}
                        </span>
                      )}
                    </div>
                    {review.comment && (
                      <p className="text-white/80 leading-relaxed mb-4">{review.comment}</p>
                    )}
                    <p className="text-sm text-white/60">
                      {review.user?.first_name && review.user?.last_name
                        ? `${review.user.first_name} ${review.user.last_name}`
                        : t('boutique.product.anonymous', 'Anonyme')}
                      {' • '}
                      {new Date(review.created_at).toLocaleDateString('fr-FR', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Image Modal */}
      {isImageFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsImageFullscreen(false)}
        >
          <button
            onClick={() => setIsImageFullscreen(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
            aria-label="Fermer"
          >
            <ArrowLeft className="w-6 h-6 rotate-90" />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImageIndex((prev) => (prev + 1) % images.length)
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          )}
          <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
            <Image
              src={primaryImage?.image_url || '/placeholder.svg'}
              alt={primaryImage?.alt_text || product.name}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}
