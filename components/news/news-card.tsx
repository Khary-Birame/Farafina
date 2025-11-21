"use client"

import React, { useState } from "react"
import { Calendar, User, ArrowRight, Clock, TrendingUp, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn, generateSlug } from "@/lib/utils"

interface NewsCardProps {
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

export function NewsCard({ 
  id,
  title, 
  excerpt, 
  date, 
  author, 
  category, 
  image,
  featured = false,
  readTime = 5,
  views
}: NewsCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const categoryConfig = categoryColors[category] || categoryColors["Officiel"]
  const slug = generateSlug(title)

  return (
    <Link href={`/news/${slug}`}>
      <article
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 transition-all duration-500 cursor-pointer bg-white",
          featured 
            ? "shadow-xl hover:shadow-2xl hover:-translate-y-2 border-[#D4AF37]/30"
            : "shadow-md hover:shadow-xl hover:-translate-y-1 border-gray-200 hover:border-[#D4AF37]/50"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className={cn(
          "relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200",
          featured ? "h-64" : "h-48"
        )}>
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className={cn(
                "object-cover transition-transform duration-700",
                isHovered ? "scale-110" : "scale-100"
              )}
              sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-12 h-12 text-[#D4AF37]/40" />
              </div>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2 z-10">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm",
                categoryConfig.bg,
                categoryConfig.text,
                categoryConfig.border
              )}
            >
              {category}
            </span>
            {featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white border border-[#D4AF37]/30 shadow-lg">
                <Star className="w-3 h-3 fill-white" />
                À la une
              </span>
            )}
          </div>

          {/* Hover Overlay */}
          <div className={cn(
            "absolute inset-0 bg-[#D4AF37]/10 backdrop-blur-[2px] transition-all duration-300 pointer-events-none",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="px-6 py-3 bg-[#D4AF37]/90 backdrop-blur-md rounded-full text-white font-bold text-sm flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                Lire l'article
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={cn("flex flex-1 flex-col p-6", featured && "p-8")}>
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{author}</span>
            </div>
            {readTime && (
              <>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readTime} min</span>
                </div>
              </>
            )}
            {views && (
              <>
                <span>•</span>
                <div className="flex items-center gap-2 text-[#D4AF37]">
                  <TrendingUp className="w-4 h-4" />
                  <span>{views} vues</span>
                </div>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className={cn(
            "font-sans font-black text-gray-900 mb-3 group-hover:text-[#D4AF37] transition-colors leading-tight",
            featured ? "text-2xl" : "text-xl"
          )}>
            {title}
          </h3>

          {/* Excerpt */}
          <p className={cn(
            "text-gray-600 leading-relaxed mb-4 flex-1",
            featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"
          )}>
            {excerpt}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm group-hover:gap-3 transition-all">
            <span>Lire la suite</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  )
}

