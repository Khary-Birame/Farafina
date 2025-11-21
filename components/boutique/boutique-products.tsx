'use client'

import { useMemo, useState, useEffect } from 'react'
import { boutiqueProducts } from '@/data/boutique-products'
import { ProductCard } from './product-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn, formatCurrency } from '@/lib/utils'
import { SlidersHorizontal, Sparkles, Filter, Search, Grid3x3, List, TrendingUp, Award } from 'lucide-react'
import { useTranslation } from '@/lib/hooks/use-translation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function BoutiqueProducts() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('recommended')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const categories = useMemo(() => [
    { label: t('boutique.products.categories.all'), value: 'all' },
    { label: t('boutique.products.categories.jerseys'), value: 'maillot' },
    { label: t('boutique.products.categories.tracksuits'), value: 'survetement' },
    { label: t('boutique.products.categories.accessories'), value: 'accessoire' },
  ], [t])

  const sortOptions = useMemo(() => [
    { label: t('boutique.products.sort.recommended'), value: 'recommended' },
    { label: t('boutique.products.sort.priceAsc'), value: 'price-asc' },
    { label: t('boutique.products.sort.priceDesc'), value: 'price-desc' },
    { label: t('boutique.products.sort.newest'), value: 'newest' },
  ], [t])

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
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.12),_transparent_60%)]" />
      <div className="absolute inset-0 opacity-10 mix-blend-screen" style={{ backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 60%)" }} />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <Sparkles className="h-4 w-4" />
            {t('boutique.products.badge') || 'Collection Exclusive'}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
              {t('boutique.products.title') || 'Notre Catalogue'}
            </span>
          </h2>
          <p className="text-xl text-white/80 mb-4 max-w-2xl mx-auto">
            {t('boutique.products.description') || 'Découvrez notre sélection de produits officiels'}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#D4AF37] text-lg">{filteredProducts.length}</span>
              <span>{filteredProducts.length > 1 ? t('boutique.products.availableItemsPlural') || 'articles' : t('boutique.products.availableItems') || 'article'}</span>
            </div>
            <span>•</span>
            <span>{t('boutique.products.totalValue') || 'Valeur totale'} {formatCurrency(totalValue)}</span>
          </div>
        </div>

        {/* Filters Bar - Sticky Premium */}
        <div className={cn(
          "sticky top-0 z-40 mb-12 rounded-3xl border transition-all duration-300",
          isScrolled 
            ? "bg-[#1a1a1a]/95 backdrop-blur-md shadow-xl border-white/20" 
            : "bg-[#1a1a1a]/80 backdrop-blur-sm border-white/10"
        )}>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:max-w-md group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-[#B8941F]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder={t('boutique.products.searchPlaceholder') || 'Rechercher un produit...'}
                    className="h-14 pl-12 pr-4 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50 focus-visible:border-[#D4AF37] focus-visible:ring-[#D4AF37]/20 text-lg shadow-sm"
                    aria-label={t('boutique.products.searchLabel') || 'Rechercher'}
                  />
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
                  <Filter className="h-4 w-4" />
                  {t('boutique.products.categoriesLabel') || 'Catégories'}:
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat.value}
                      type="button"
                      onClick={() => setCategory(cat.value)}
                      variant={category === cat.value ? 'default' : 'outline'}
                      className={cn(
                        'rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md',
                        category === cat.value
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white border-0'
                          : 'border-2 border-white/20 text-white/70 hover:border-[#D4AF37] hover:text-[#D4AF37] bg-white/5 backdrop-blur-sm',
                      )}
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sort & View */}
              <div className="flex items-center gap-3">
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-[180px] h-12 border-2 border-white/20 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:border-[#D4AF37] transition-colors">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/20">
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1 p-1 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "h-9 px-3 rounded-lg transition-all",
                      viewMode === 'grid' ? "bg-white/10 shadow-sm text-[#D4AF37]" : "text-white/70 hover:text-white"
                    )}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={cn(
                      "h-9 px-3 rounded-lg transition-all",
                      viewMode === 'list' ? "bg-white/10 shadow-sm text-[#D4AF37]" : "text-white/70 hover:text-white"
                    )}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Sellers Section */}
        {popularProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  {t('boutique.products.bestsellers.badge') || 'Best Sellers'}
                </p>
                <h3 className="font-sans text-3xl font-bold text-white">
                  {t('boutique.products.bestsellers.title') || 'Les Plus Populaires'}
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* All Products Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-sans text-2xl font-bold text-white">
              {t('boutique.products.allProducts') || 'Tous les Produits'}
            </h3>
            <span className="text-sm text-white/70 font-medium">
              {otherProducts.length} {otherProducts.length > 1 ? t('boutique.products.itemsPlural') || 'articles' : t('boutique.products.items') || 'article'}
            </span>
          </div>

          {otherProducts.length > 0 ? (
            <div className={cn(
              "grid gap-8",
              viewMode === 'grid' 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            )}>
              {otherProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-[#D4AF37]/40 bg-white/5 backdrop-blur-sm p-16 text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-white/40" />
              </div>
              <p className="text-xl font-semibold text-white mb-2">
                {t('boutique.products.noResults.title') || 'Aucun produit trouvé'}
              </p>
              <p className="text-sm text-white/70">
                {t('boutique.products.noResults.description') || 'Essayez de modifier vos filtres de recherche'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
