'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/hooks/use-translation'
import { cn } from '@/lib/utils'
import { NewsCard } from './news-card'

interface NewsDetailsProps {
  article: {
    id: number
    slug: string
    title: string
    excerpt: string
    content: string
    date: string
    author: string
    category: string
    image: string
    images?: string[]
    featured?: boolean
    readTime?: number
    views?: number
  }
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Programmes": {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200"
  },
  "Partenariats": {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200"
  },
  "Événements": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200"
  },
  "Bourses": {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200"
  },
  "Infrastructure": {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200"
  },
  "Compétitions": {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200"
  },
  "Interview": {
    bg: "bg-pink-50",
    text: "text-pink-700",
    border: "border-pink-200"
  },
  "Officiel": {
    bg: "bg-[#D4AF37]/10",
    text: "text-[#D4AF37]",
    border: "border-[#D4AF37]/30"
  },
}

// Mock related articles
const relatedArticles = [
  {
    id: 3,
    title: "Cérémonie de remise des diplômes 2024 - Félicitations aux diplômés !",
    excerpt: "Nous célébrons la réussite de nos étudiants de la promotion 2024.",
    date: "5 Janvier 2025",
    author: "Équipe FFA",
    category: "Événements",
    image: "/young-african-football-players-training.jpg",
    readTime: 6,
    views: 750,
  },
  {
    id: 4,
    title: "Programme de bourses d'études 2025/2026 maintenant ouvert",
    excerpt: "Les candidatures pour notre programme de bourses d'études sont maintenant ouvertes.",
    date: "1 Janvier 2025",
    author: "Équipe FFA",
    category: "Bourses",
    image: "/african-students-studying-in-modern-classroom.jpg",
    readTime: 3,
    views: 1200,
  },
]

export function NewsDetails({ article }: NewsDetailsProps) {
  const { t } = useTranslation()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageFullscreen, setIsImageFullscreen] = useState(false)

  const images = article.images && article.images.length > 0 
    ? article.images 
    : [article.image]
  
  const primaryImage = images[currentImageIndex] || images[0]
  const categoryConfig = categoryColors[article.category] || categoryColors["Officiel"]

  const handleShare = async (platform: string) => {
    const url = window.location.href
    const text = article.title
    const encodedUrl = encodeURIComponent(url)
    const encodedText = encodeURIComponent(text)

    let shareUrl = ''
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  return (
    <article className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-gray-50 sticky top-0 z-30 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600" aria-label="Breadcrumb">
            <Link href="/news" className="hover:text-[#D4AF37] transition-colors font-medium">
              Actualités
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-semibold line-clamp-1">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
        <Image
          src={primaryImage}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Navigation for multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold z-10">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/news">
            <Button
              variant="outline"
              className="mb-8 border-2 border-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux actualités
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border",
                  categoryConfig.bg,
                  categoryConfig.text,
                  categoryConfig.border
                )}
              >
                {article.category}
              </span>
              {article.featured && (
                <span className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-sm font-bold shadow-lg">
                  À la une
                </span>
              )}
            </div>

            <h1 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">{article.date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{article.author}</span>
              </div>
              {article.readTime && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{article.readTime} min de lecture</span>
                  </div>
                </>
              )}
              {article.views && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-2 text-[#D4AF37]">
                    <TrendingUp className="w-5 h-5" />
                    <span>{article.views} vues</span>
                  </div>
                </>
              )}
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
              <span className="text-sm font-semibold text-gray-700">Partager :</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                  aria-label="Partager sur Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-colors"
                  aria-label="Partager sur Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center transition-colors"
                  aria-label="Partager sur LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors"
                  aria-label="Partager sur WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="mb-12 text-lg leading-relaxed text-gray-700 [&_p]:mb-6 [&_p]:leading-relaxed [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:mt-4 [&_ul]:mb-6 [&_ul]:pl-6 [&_ul]:list-disc [&_ol]:mt-4 [&_ol]:mb-6 [&_ol]:pl-6 [&_ol]:list-decimal [&_li]:mb-2 [&_li]:leading-relaxed [&_li_strong]:font-bold [&_li_strong]:text-gray-900 [&_a]:text-[#D4AF37] [&_a]:underline [&_a:hover]:text-[#B8941F]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Image Gallery */}
          {images.length > 1 && (
            <div className="mb-12">
              <h3 className="font-bold text-2xl text-gray-900 mb-6">Galerie</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index)
                      setIsImageFullscreen(true)
                    }}
                    className="relative aspect-square rounded-xl overflow-hidden border-2 border-gray-200 hover:border-[#D4AF37] transition-all group"
                  >
                    <Image
                      src={img}
                      alt={`${article.title} - ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles */}
          <div className="mt-16 pt-16 border-t-2 border-gray-200">
            <h2 className="font-black text-3xl md:text-4xl text-gray-900 mb-8">
              Articles Similaires
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedArticles.map((related) => (
                <NewsCard key={related.id} {...related} />
              ))}
            </div>
          </div>
        </div>
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
              src={primaryImage}
              alt={article.title}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </article>
  )
}

