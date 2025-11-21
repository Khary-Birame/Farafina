'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
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
  TrendingUp,
  CreditCard,
  Lock,
  Clock,
  MapPin,
  Users,
  ThumbsUp,
  Filter,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from '@/lib/hooks/use-translation'
import type { BoutiqueProduct } from '@/data/boutique-products'
import { boutiqueProducts } from '@/data/boutique-products'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ProductCard } from './product-card'

type ProductDetailsMockProps = {
  product: BoutiqueProduct
}

// Tailles disponibles pour les maillots
const SIZES_MAILLOT = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
// Tailles disponibles pour les survêtements
const SIZES_SURVETEMENT = ['S', 'M', 'L', 'XL', 'XXL']
// Couleurs disponibles
const COLORS = [
  { name: 'Or', hex: '#D4AF37' },
  { name: 'Noir', hex: '#000000' },
  { name: 'Blanc', hex: '#FFFFFF' },
  { name: 'Rouge', hex: '#DC2626' },
  { name: 'Bleu', hex: '#2563EB' },
]

// Données mockées pour les avis
const MOCK_REVIEWS = [
  { id: '1', rating: 5, author: 'Moussa D.', date: '2024-01-15', verified: true, comment: 'Excellent produit, qualité premium. Je recommande vivement !', helpful: 12 },
  { id: '2', rating: 5, author: 'Amadou K.', date: '2024-01-10', verified: true, comment: 'Très satisfait de mon achat. Le design est magnifique et le confort est au rendez-vous.', helpful: 8 },
  { id: '3', rating: 4, author: 'Fatou S.', date: '2024-01-05', verified: false, comment: 'Bon produit dans l\'ensemble, mais la taille est un peu petite. Je recommande de prendre une taille au-dessus.', helpful: 5 },
  { id: '4', rating: 5, author: 'Ibrahima T.', date: '2023-12-28', verified: true, comment: 'Produit de qualité, conforme à la description. Livraison rapide.', helpful: 15 },
  { id: '5', rating: 4, author: 'Aissatou D.', date: '2023-12-20', verified: true, comment: 'Très beau produit, je suis contente de mon achat.', helpful: 3 },
]

export function ProductDetailsMock({ product }: ProductDetailsMockProps) {
  const { t } = useTranslation()
  const { addItem, openCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isImageFullscreen, setIsImageFullscreen] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews' | 'shipping'>('description')
  const [reviewFilter, setReviewFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all')
  const [showAllReviews, setShowAllReviews] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  // Déterminer les tailles disponibles selon la catégorie
  const availableSizes = useMemo(() => {
    if (product.category === 'maillot') return SIZES_MAILLOT
    if (product.category === 'survetement') return SIZES_SURVETEMENT
    return []
  }, [product.category])

  // Images du produit (on génère plusieurs vues pour la galerie)
  const images = useMemo(() => [
    { image_url: product.image, alt_text: product.name },
    { image_url: product.image, alt_text: `${product.name} - Vue 2` },
    { image_url: product.image, alt_text: `${product.name} - Vue 3` },
  ], [product.image, product.name])

  // Image principale
  const primaryImage = images[currentImageIndex] || images[0]

  // Calcul de la note moyenne
  const averageRating = useMemo(() => {
    const total = MOCK_REVIEWS.reduce((sum, review) => sum + review.rating, 0)
    return total / MOCK_REVIEWS.length
  }, [])

  // Distribution des notes pour l'histogramme
  const ratingDistribution = useMemo(() => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    MOCK_REVIEWS.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++
    })
    return distribution
  }, [])

  // Avis filtrés
  const filteredReviews = useMemo(() => {
    if (reviewFilter === 'all') return MOCK_REVIEWS
    return MOCK_REVIEWS.filter(r => r.rating === parseInt(reviewFilter))
  }, [reviewFilter])

  // Produits similaires (même catégorie)
  const similarProducts = useMemo(() => {
    return boutiqueProducts
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 4)
  }, [product.id, product.category])

  // Produits souvent achetés ensemble
  const frequentlyBoughtTogether = useMemo(() => {
    return boutiqueProducts
      .filter(p => p.id !== product.id && p.category !== product.category)
      .slice(0, 3)
  }, [product.id, product.category])

  const handleAddToCart = async () => {
    if (availableSizes.length > 0 && !selectedSize) {
      toast.error('Veuillez sélectionner une taille')
      return
    }

    setIsAddingToCart(true)
    
    // Animation de feedback
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }

    // Simuler un délai pour l'animation
    await new Promise(resolve => setTimeout(resolve, 300))

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    }, { openCart: true })

    toast.success('Produit ajouté au panier !', {
      icon: '🛒',
      duration: 2000,
    })

    setIsAddingToCart(false)
  }

  const handleBuyNow = async () => {
    if (availableSizes.length > 0 && !selectedSize) {
      toast.error('Veuillez sélectionner une taille')
      return
    }

    await handleAddToCart()
    // Rediriger vers la page de paiement (à implémenter)
    // router.push('/checkout')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description || '',
          url: window.location.href,
        })
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Lien copié dans le presse-papier')
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

  // Zoom au survol de l'image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return
    
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    imageRef.current.style.transformOrigin = `${x}% ${y}%`
  }

  return (
    <div className="bg-[#0f1012] min-h-screen">
      {/* Breadcrumb Premium */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#0f1012] to-[#1a1a1a] sticky top-0 z-30 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-white/70" aria-label="Breadcrumb">
            <Link href="/boutique" className="hover:text-[#D4AF37] transition-colors font-medium">
              Boutique
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white/40 capitalize">{product.category}</span>
            <span className="text-white/40">/</span>
            <span className="text-white font-semibold line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-16">
        {/* Section principale - Layout 2 colonnes */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Colonne gauche - Galerie Premium */}
          <div className="space-y-6">
            {/* Image principale avec zoom */}
            <div 
              ref={imageRef}
              className="relative aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#0f1012] rounded-3xl overflow-hidden group shadow-2xl border-4 border-white/10 cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <Image
                src={primaryImage?.image_url || '/placeholder.svg'}
                alt={primaryImage?.alt_text || product.name}
                fill
                className={cn(
                  "object-cover transition-transform duration-500",
                  isZoomed && "scale-150"
                )}
                priority
                onClick={() => setIsImageFullscreen(true)}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10 border border-white/20"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImageIndex((prev) => (prev + 1) % images.length)
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10 border border-white/20"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              
              {/* Zoom button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsImageFullscreen(true)
                }}
                className="absolute bottom-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10 border border-white/20"
                aria-label="Voir en plein écran"
              >
                <ZoomIn className="w-6 h-6" />
              </button>

              {/* Image counter */}
              {images.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold z-10">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}

              {/* Badge Best-seller sur l'image */}
              {product.isPopular && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-xs font-bold shadow-lg">
                    <Star className="w-3 h-3 fill-white" />
                    Best-seller
                  </span>
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
                        : 'border-white/10 hover:border-white/30 hover:scale-105'
                    )}
                    aria-label={`Voir l'image ${index + 1}`}
                  >
                    <Image
                      src={image.image_url}
                      alt={image.alt_text || `${product.name} - ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 25vw, 12.5vw"
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
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              {product.isPopular && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-sm font-bold shadow-lg">
                  <Star className="w-4 h-4 fill-white" />
                  Best-seller
                </span>
              )}
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-bold shadow-lg">
                <Check className="w-4 h-4" />
                En stock
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-semibold">
                <Shield className="w-4 h-4" />
                Garantie qualité
              </span>
            </div>

            {/* Titre */}
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {product.name}
            </h1>

            {/* Note et avis */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-5 h-5",
                      i < Math.floor(averageRating)
                        ? 'fill-[#D4AF37] text-[#D4AF37]'
                        : 'fill-white/20 text-white/20'
                    )}
                  />
                ))}
                <span className="text-white font-bold ml-2">{averageRating.toFixed(1)}</span>
              </div>
              <span className="text-white/60">•</span>
              <button
                onClick={() => {
                  setActiveTab('reviews')
                  document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-white/60 hover:text-[#D4AF37] transition-colors underline"
              >
                {MOCK_REVIEWS.length} avis
              </button>
            </div>

            {/* Prix Premium */}
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-black bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">
                {formatCurrency(product.price)}
              </span>
              <span className="text-xl text-white/40 line-through">
                {formatCurrency(product.price * 1.2)}
              </span>
              <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm font-bold shadow-lg">
                -17%
              </span>
            </div>

            {/* Description courte */}
            <p className="text-lg text-white/80 leading-relaxed">
              {product.description}
            </p>

            {/* Sélection des variantes */}
            {availableSizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-bold text-white uppercase tracking-wide">
                    Taille
                  </label>
                  <button className="text-sm text-[#D4AF37] hover:underline">
                    Guide des tailles
                  </button>
                </div>
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

            {/* Sélection couleur */}
            <div>
              <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                Couleur
              </label>
              <div className="flex flex-wrap gap-4">
                {COLORS.slice(0, 4).map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color.name)}
                    className={cn(
                      "w-16 h-16 rounded-full border-4 transition-all duration-300 shadow-lg hover:scale-110",
                      selectedColor === color.name
                        ? 'border-[#D4AF37] ring-4 ring-[#D4AF37]/30 scale-110'
                        : 'border-white/20 hover:border-[#D4AF37]/50'
                    )}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  >
                    {selectedColor === color.name && (
                      <Check className="w-6 h-6 text-white mx-auto drop-shadow-lg" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantité */}
            <div>
              <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                Quantité
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-14 h-14 rounded-xl border-2 border-white/20 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white flex items-center justify-center transition-all duration-300 font-bold text-xl shadow-sm hover:shadow-lg bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Diminuer"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-20 text-center font-black text-2xl text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(99, quantity + 1))}
                  className="w-14 h-14 rounded-xl border-2 border-white/20 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white flex items-center justify-center transition-all duration-300 font-bold text-xl shadow-sm hover:shadow-lg bg-white/5"
                  aria-label="Augmenter"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Actions Premium */}
            <div className="space-y-4 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={isAddingToCart || (availableSizes.length > 0 && !selectedSize)}
                className={cn(
                  "w-full h-16 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group",
                  isAddingToCart && "animate-pulse"
                )}
              >
                {isAddingToCart ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    Ajout en cours...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                    Ajouter au panier
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleBuyNow}
                disabled={isAddingToCart || (availableSizes.length > 0 && !selectedSize)}
                variant="outline"
                className="w-full h-14 border-2 border-white/30 hover:border-white/50 text-white hover:bg-white/10 backdrop-blur-sm font-bold text-lg rounded-xl transition-all duration-300"
              >
                Acheter maintenant
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
                  <Heart className={cn("w-5 h-5 transition-all", isLiked && "fill-red-500 text-red-500 scale-110")} />
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

            {/* Informations rapides */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t-2 border-white/10">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white mb-1">Livraison</p>
                  <p className="text-xs text-white/60">3-5 jours ouvrés</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg flex-shrink-0">
                  <RotateCcw className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white mb-1">Retours</p>
                  <p className="text-xs text-white/60">30 jours gratuits</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg flex-shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white mb-1">Garantie</p>
                  <p className="text-xs text-white/60">2 ans qualité</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs pour Description, Spécifications, Avis, Livraison */}
        <div className="mb-16" id="product-tabs">
          <div className="flex flex-wrap gap-2 border-b-2 border-white/10 mb-8">
            {[
              { id: 'description', label: 'Description', icon: Info },
              { id: 'specs', label: 'Caractéristiques', icon: Package },
              { id: 'reviews', label: `Avis (${MOCK_REVIEWS.length})`, icon: Star },
              { id: 'shipping', label: 'Livraison & Paiement', icon: Truck },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-300 border-b-2 -mb-[2px]",
                  activeTab === tab.id
                    ? "border-[#D4AF37] text-[#D4AF37]"
                    : "border-transparent text-white/60 hover:text-white/80"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contenu des tabs */}
          <div className="max-w-4xl">
            {activeTab === 'description' && (
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-white/80 leading-relaxed text-lg mb-6">
                  {product.description}
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                      Matériaux Premium
                    </h3>
                    <p className="text-white/70 text-sm">
                      Fabriqué avec des matériaux de haute qualité pour une durabilité et un confort optimaux.
                    </p>
                  </div>
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                      Performance
                    </h3>
                    <p className="text-white/70 text-sm">
                      Conçu pour les athlètes exigeants, ce produit offre des performances exceptionnelles.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-white font-bold mb-4">Caractéristiques techniques</h3>
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-white/60">Catégorie</dt>
                        <dd className="text-white font-semibold capitalize">{product.category}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-white/60">Matériau</dt>
                        <dd className="text-white font-semibold">Polyester 100%</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-white/60">Poids</dt>
                        <dd className="text-white font-semibold">~200g</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-white/60">Entretien</dt>
                        <dd className="text-white font-semibold">Lavage machine 30°C</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-white font-bold mb-4">Avantages</h3>
                    <ul className="space-y-2">
                      {['Respiration optimale', 'Séchage rapide', 'Anti-transpiration', 'Design moderne'].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-white/80">
                          <Check className="w-4 h-4 text-[#D4AF37]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div id="reviews-section" className="space-y-8">
                {/* Résumé des avis */}
                <div className="grid md:grid-cols-2 gap-8 p-8 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-center">
                    <div className="text-6xl font-black text-[#D4AF37] mb-2">{averageRating.toFixed(1)}</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-6 h-6",
                            i < Math.floor(averageRating)
                              ? 'fill-[#D4AF37] text-[#D4AF37]'
                              : 'fill-white/20 text-white/20'
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-white/60 text-sm">Basé sur {MOCK_REVIEWS.length} avis</p>
                  </div>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = ratingDistribution[rating as keyof typeof ratingDistribution]
                      const percentage = (count / MOCK_REVIEWS.length) * 100
                      return (
                        <div key={rating} className="flex items-center gap-3">
                          <span className="text-white/80 text-sm w-8">{rating}★</span>
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-white/60 text-sm w-8">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Filtres */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setReviewFilter('all')}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                      reviewFilter === 'all'
                        ? "bg-[#D4AF37] text-white"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    )}
                  >
                    Tous ({MOCK_REVIEWS.length})
                  </button>
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = ratingDistribution[rating as keyof typeof ratingDistribution]
                    if (count === 0) return null
                    return (
                      <button
                        key={rating}
                        onClick={() => setReviewFilter(rating.toString() as typeof reviewFilter)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                          reviewFilter === rating.toString()
                            ? "bg-[#D4AF37] text-white"
                            : "bg-white/5 text-white/70 hover:bg-white/10"
                        )}
                      >
                        {rating}★ ({count})
                      </button>
                    )
                  })}
                </div>

                {/* Liste des avis */}
                <div className="space-y-6">
                  {(showAllReviews ? filteredReviews : filteredReviews.slice(0, 3)).map((review) => (
                    <div key={review.id} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "w-4 h-4",
                                    i < review.rating
                                      ? 'fill-[#D4AF37] text-[#D4AF37]'
                                      : 'fill-white/20 text-white/20'
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-white font-semibold">{review.author}</span>
                            {review.verified && (
                              <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-semibold">
                                ✓ Achat vérifié
                              </span>
                            )}
                          </div>
                          <p className="text-white/80 leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                        <span className="text-white/60 text-sm">
                          {new Date(review.date).toLocaleDateString('fr-FR', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                        <button className="flex items-center gap-2 text-white/60 hover:text-[#D4AF37] transition-colors text-sm">
                          <ThumbsUp className="w-4 h-4" />
                          Utile ({review.helpful})
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {filteredReviews.length > 3 && (
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="w-full py-4 rounded-xl border-2 border-white/20 hover:border-[#D4AF37] text-white font-semibold transition-all bg-white/5 hover:bg-white/10"
                    >
                      {showAllReviews ? 'Voir moins' : `Voir tous les avis (${filteredReviews.length})`}
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-8">
                {/* Livraison */}
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                    <Truck className="w-6 h-6 text-[#D4AF37]" />
                    Options de livraison
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Livraison Standard', price: 'Gratuite', delay: '3-5 jours ouvrés', icon: Package },
                      { name: 'Livraison Express', price: '5 000 FCFA', delay: '24-48h', icon: Clock },
                      { name: 'Retrait en magasin', price: 'Gratuit', delay: 'Immédiat', icon: MapPin },
                    ].map((option, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center">
                            <option.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">{option.name}</p>
                            <p className="text-white/60 text-sm">{option.delay}</p>
                          </div>
                        </div>
                        <span className="text-[#D4AF37] font-bold">{option.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Paiement */}
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-[#D4AF37]" />
                    Modes de paiement
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: 'Carte bancaire', icon: CreditCard, secure: true },
                      { name: 'Mobile Money', icon: '📱', secure: true },
                      { name: 'Paiement à la livraison', icon: Package, secure: false },
                    ].map((method, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                          {typeof method.icon === 'string' ? method.icon : <method.icon className="w-6 h-6 text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold">{method.name}</p>
                          {method.secure && (
                            <div className="flex items-center gap-1 mt-1">
                              <Lock className="w-3 h-3 text-green-400" />
                              <span className="text-green-400 text-xs">Sécurisé</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Retours */}
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                    <RotateCcw className="w-6 h-6 text-[#D4AF37]" />
                    Politique de retour
                  </h3>
                  <div className="space-y-4 text-white/80">
                    <p>Vous disposez de <strong className="text-white">30 jours</strong> pour retourner votre article non porté, non lavé et dans son emballage d'origine.</p>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Retour gratuit sous 30 jours</li>
                      <li>Échange possible</li>
                      <li>Remboursement sous 5-7 jours</li>
                      <li>Produit doit être en état neuf</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Produits similaires */}
        {similarProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-white">Produits similaires</h2>
              <Link href="/boutique" className="text-[#D4AF37] hover:underline font-semibold">
                Voir tout →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Produits souvent achetés ensemble */}
        {frequentlyBoughtTogether.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-black text-white mb-8">Souvent achetés ensemble</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {frequentlyBoughtTogether.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
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
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImageIndex((prev) => (prev + 1) % images.length)
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
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
