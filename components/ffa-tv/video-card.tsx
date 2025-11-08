"use client"

import { Play, Eye } from "lucide-react"

interface VideoCardProps {
  title: string
  thumbnail: string
  duration: string
  date: string
  views: string
  isLive?: boolean
}

export function VideoCard({ title, thumbnail, duration, date, views, isLive = false }: VideoCardProps) {
  return (
    <div className="group cursor-pointer">
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-[#1A1A1A]">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#D4AF37] flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all shadow-2xl">
            <Play size={24} className="text-white ml-1" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
          {duration}
        </div>

        {/* Live Badge */}
        {isLive && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
            EN DIRECT
          </div>
        )}
      </div>

      {/* Video Info */}
      <div>
        <h3 className="font-sans font-bold text-white text-lg mb-2 leading-tight group-hover:text-[#D4AF37] transition-colors line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Eye size={14} />
            <span>{views} vues</span>
          </div>
          <span>•</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  )
}
