'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { BoutiqueProduct } from '@/data/boutique-products'
import { useCart } from '@/components/providers/cart-provider'
import { formatCurrency } from '@/lib/utils'
import { ShoppingCart, Zap, Info } from 'lucide-react'
import Link from 'next/link'

export function ProductCard({ product }: { product: BoutiqueProduct }) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
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

  const handleBuyNow = () => {
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

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111418]/90 shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D4AF37]/60 hover:shadow-[0_30px_80px_rgba(17,20,24,0.9)]">
      {product.isPopular && (
        <span className="absolute right-4 top-4 z-20 inline-flex items-center gap-1 rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-lg">
          Best seller
        </span>
      )}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="scale-105 object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">{product.category}</p>
          <h3 className="font-sans text-xl font-semibold leading-tight">{product.name}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <p className="text-sm leading-relaxed text-white/70 line-clamp-3">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-sans text-2xl font-semibold text-[#D4AF37]">
            {formatCurrency(product.price)}
          </span>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hidden sm:flex h-10 w-10 rounded-full border border-white/10 text-white/70 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
          >
            <Link href={`/boutique/${product.id}`} aria-label={`Découvrir ${product.name}`}>
              <Info className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
          <Button
            onClick={handleBuyNow}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] text-white transition-colors hover:bg-[#b98d2c]"
          >
            Acheter maintenant
          </Button>
          <Button
            variant="outline"
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 rounded-xl border-[#D4AF37] text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/10"
          >
            <ShoppingCart className="w-4 h-4" />
            Ajouter au panier
          </Button>
        </div>
      </div>
    </div>
  )
}
