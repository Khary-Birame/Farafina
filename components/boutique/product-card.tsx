'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { BoutiqueProduct } from '@/data/boutique-products'
import { useCart } from '@/components/providers/cart-provider'
import { formatCurrency } from '@/lib/utils'
import { ShoppingCart, Zap, Info, Star, ArrowRight, Heart } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function ProductCard({ product }: { product: BoutiqueProduct }) {
  const { addItem } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      { openCart: false },
    )
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      { openCart: true },
    )
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  return (
    <Link href={`/boutique/produit/${product.id}`}>
      <div
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 transition-all duration-500 cursor-pointer",
          "bg-gradient-to-br from-[#1a1a1a] to-[#0f1012] border-white/10",
          "hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-[#D4AF37]/20 hover:-translate-y-2",
          isHovered && "border-[#D4AF37] shadow-xl"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.isPopular && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
              <Star className="w-3 h-3 fill-white" />
              Best seller
            </span>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className={cn(
            "absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
            "bg-white/90 backdrop-blur-sm border border-gray-200",
            "hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:scale-110",
            isLiked && "bg-[#D4AF37] border-[#D4AF37]"
          )}
          aria-label="Ajouter aux favoris"
        >
          <Heart className={cn(
            "w-5 h-5 transition-all",
            isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
          )} />
        </button>

        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#0f1012] to-[#1a1a1a]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-transform duration-700",
              isHovered ? "scale-110" : "scale-100"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-white/80 font-semibold mb-2">
              {product.category}
            </p>
            <h3 className="font-sans text-xl font-bold leading-tight text-white">
              {product.name}
            </h3>
          </div>
          
          {/* Hover Overlay - Indicateur visuel que la carte est cliquable */}
          <div className={cn(
            "absolute inset-0 bg-[#D4AF37]/10 backdrop-blur-[2px] transition-all duration-300 pointer-events-none",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="px-4 py-2 bg-[#D4AF37]/90 backdrop-blur-md rounded-full text-white font-semibold text-sm flex items-center gap-2">
                <Info className="w-4 h-4" />
                Voir les détails
              </div>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="flex flex-1 flex-col gap-4 p-6">
          {/* Description */}
          <p className="text-sm leading-relaxed text-white/70 line-clamp-2 min-h-[2.5rem]">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div>
              <span className="font-sans text-3xl font-black text-[#D4AF37]">
                {formatCurrency(product.price)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold text-white/80">4.8</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            <Button
              onClick={handleBuyNow}
              className={cn(
                "w-full h-12 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37]",
                "text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300",
                "group/btn"
              )}
            >
              <Zap className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              Acheter maintenant
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              onClick={handleAddToCart}
              className={cn(
                "w-full h-11 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white",
                "rounded-xl font-semibold transition-all duration-300",
                "group/cart"
              )}
            >
              <ShoppingCart className="w-4 h-4 mr-2 group-hover/cart:scale-110 transition-transform" />
              Ajouter au panier
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
