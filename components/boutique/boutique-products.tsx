'use client'

import { useMemo, useState } from 'react'
import { boutiqueProducts } from '@/data/boutique-products'
import { ProductCard } from './product-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn, formatCurrency } from '@/lib/utils'
import { SlidersHorizontal, Sparkles, Filter, Search } from 'lucide-react'

const categories = [
  { label: 'Tous', value: 'all' },
  { label: 'Maillots', value: 'maillot' },
  { label: 'Survêtements', value: 'survetement' },
  { label: 'Accessoires', value: 'accessoire' },
]

const sortOptions = [
  { label: 'Recommandés', value: 'recommended' },
  { label: 'Prix croissant', value: 'price-asc' },
  { label: 'Prix décroissant', value: 'price-desc' },
  { label: 'Nouveautés', value: 'newest' },
]

export function BoutiqueProducts() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('recommended')

  const filteredProducts = useMemo(() => {
    let products = boutiqueProducts

    if (category !== 'all') {
      products = products.filter((product) => product.category === category)
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase()
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term),
      )
    }

    switch (sort) {
      case 'price-asc':
        products = [...products].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        products = [...products].sort((a, b) => b.price - a.price)
        break
      case 'newest':
        products = [...products].sort((a, b) => b.id.localeCompare(a.id))
        break
      default:
        products = [...products].sort((a, b) => Number(b.isPopular) - Number(a.isPopular))
        break
    }

    return products
  }, [category, searchTerm, sort])

  const popularProducts = filteredProducts.filter((product) => product.isPopular).slice(0, 3)
  const otherProducts = filteredProducts.filter((product) => !product.isPopular || !popularProducts.includes(product))

  const totalValue = useMemo(
    () => boutiqueProducts.reduce((total, product) => total + product.price, 0),
    [],
  )

  return (
    <section id="catalogue" className="relative overflow-hidden py-16 lg:py-24 bg-[#0f1012]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.12),_transparent_60%)]" />
      <div className="absolute inset-0 opacity-10 mix-blend-screen" style={{ backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 60%)" }} />
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37]">
            <Sparkles className="h-4 w-4" />
            Sélection premium 2025
          </div>
          <h2 className="mt-4 font-sans text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            La boutique officielle Farafina Foot Academy
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Maillots, survêtements, accessoires : des pièces premium pour représenter l'académie sur et en dehors
            du terrain.
          </p>
          <p className="mt-2 text-sm text-white/60">
            <span className="font-semibold text-[#D4AF37]">{filteredProducts.length}</span> articles disponibles •
            Valeur totale de la collection {formatCurrency(totalValue)}
          </p>
        </div>

        <div className="mb-12 rounded-3xl border border-[#ffffff14] bg-white/10 p-6 shadow-[0_15px_45px_rgba(0,0,0,0.35)] backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Rechercher un produit (maillot, sac, veste...)"
                className="h-12 rounded-xl border-white/20 bg-white/10 pl-11 text-white placeholder:text-white/50 focus-visible:border-[#D4AF37] focus-visible:ring-[#D4AF37]/30"
                aria-label="Rechercher un produit"
              />
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-white/60">
                <Filter className="h-4 w-4" />
                Catégories :
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    variant={category === cat.value ? 'default' : 'outline'}
                    className={cn(
                      'rounded-full px-4 py-0 text-xs font-semibold uppercase tracking-wide transition',
                      category === cat.value
                        ? 'bg-[#D4AF37] hover:bg-[#b98d2c] text-white'
                        : 'border-white/20 text-white/70 hover:border-[#D4AF37] hover:text-[#D4AF37]',
                    )}
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="hidden h-4 w-4 text-white/50 sm:block" />
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-11 rounded-xl border border-white/20 bg-white/10 px-4 text-sm font-medium text-white focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/30"
                aria-label="Trier les produits"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {popularProducts.length > 0 && (
          <div className="mb-16">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#D4AF37]">Best sellers</p>
                <h3 className="font-sans text-2xl font-semibold text-white">
                  Les incontournables de la saison
                </h3>
              </div>
              <Button
                variant="ghost"
                className="hidden sm:inline-flex gap-2 text-sm font-semibold text-white hover:text-[#D4AF37]"
              >
                Découvrir toute la collection
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {popularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-sans text-xl font-semibold text-white">Tous les produits</h3>
            <span className="text-sm text-white/60">
              {otherProducts.length} article{otherProducts.length > 1 ? 's' : ''}
            </span>
          </div>

          {otherProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#D4AF37]/40 bg-white/10 p-10 text-center text-white">
              <p className="text-lg font-medium">
                Aucun article ne correspond à votre recherche pour le moment.
              </p>
              <p className="mt-2 text-sm text-white/70">
                Essayez de modifier vos filtres ou contactez-nous pour toute demande spécifique.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
