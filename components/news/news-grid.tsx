"use client"

import { useState, useMemo, useEffect } from "react"
import { NewsCard } from "./news-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Search, X, TrendingUp, Calendar, Newspaper } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import { cn } from "@/lib/utils"

interface NewsArticle {
  id: number
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  image?: string
  featured?: boolean
  readTime?: number
  views?: number
}

interface NewsGridProps {
  articles: NewsArticle[]
}

export function NewsGrid({ articles }: NewsGridProps) {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous")
  const [selectedYear, setSelectedYear] = useState<string>("Tous")

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(articles.map(a => a.category)))
    return ["Tous", ...cats]
  }, [articles])

  // Extract unique years
  const years = useMemo(() => {
    const yearSet = new Set<string>()
    articles.forEach(article => {
      const yearMatch = article.date.match(/\d{4}/)
      if (yearMatch) {
        yearSet.add(yearMatch[0])
      }
    })
    return ["Tous", ...Array.from(yearSet).sort().reverse()]
  }, [articles])

  // Filter articles
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === "Tous" || article.category === selectedCategory
      
      const matchesYear = selectedYear === "Tous" || article.date.includes(selectedYear)
      
      return matchesSearch && matchesCategory && matchesYear
    })
  }, [articles, searchQuery, selectedCategory, selectedYear])

  const featuredArticles = useMemo(() => {
    return filteredArticles.filter(a => a.featured)
  }, [filteredArticles])

  const regularArticles = useMemo(() => {
    return filteredArticles.filter(a => !a.featured)
  }, [filteredArticles])

  // Activer les animations reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [filteredArticles])

  const hasActiveFilters = searchQuery || selectedCategory !== "Tous" || selectedYear !== "Tous"

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Search and Filters */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="relative mb-6 max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={t("news.search.placeholder", "Rechercher un article...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Effacer la recherche"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>

          {/* Filter Bar - Sticky */}
          <div className="sticky top-20 z-40 mb-8 rounded-2xl border-2 border-gray-200 bg-white/95 backdrop-blur-md shadow-lg">
            <div className="p-4 lg:p-6">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Filter className="h-4 w-4" />
                  {t("news.filters.label", "Filtrer")}:
                </div>
                
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                        selectedCategory === category
                          ? "bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white border-0 shadow-md"
                          : "border-2 border-gray-200 text-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37] bg-white"
                      )}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Year Filter */}
                {years.length > 1 && (
                  <div className="flex items-center gap-2 ml-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="px-4 py-2 rounded-full border-2 border-gray-200 text-sm font-semibold text-gray-700 hover:border-[#D4AF37] focus:border-[#D4AF37] focus:outline-none bg-white cursor-pointer transition-colors"
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("Tous")
                      setSelectedYear("Tous")
                    }}
                    className="rounded-full border-2 border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-600 bg-white"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Réinitialiser
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-gray-600 font-semibold">
              {filteredArticles.length} {filteredArticles.length > 1 ? "articles trouvés" : "article trouvé"}
            </p>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-16 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-full" />
              <h2 className="font-sans font-black text-3xl md:text-4xl text-gray-900">
                {t("news.featured.title", "À la Une")}
              </h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <div
                  key={article.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="reveal"
                >
                  <NewsCard {...article} featured />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        {regularArticles.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-16 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-full" />
              <h2 className="font-sans font-black text-3xl md:text-4xl text-gray-900">
                {t("news.all.title", "Toutes les Actualités")}
              </h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {regularArticles.map((article, index) => (
                <div
                  key={article.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="reveal"
                >
                  <NewsCard {...article} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <Newspaper className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-600 text-lg font-semibold mb-2">
              {t("news.empty.title", "Aucun article trouvé")}
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Essayez de modifier vos critères de recherche
            </p>
            {hasActiveFilters && (
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("Tous")
                  setSelectedYear("Tous")
                }}
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white"
              >
                Réinitialiser les filtres
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

