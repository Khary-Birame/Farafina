"use client"

import { useState } from "react"
import { Camera, ChevronLeft, ChevronRight, X, Play } from "lucide-react"
import { useTranslation } from "@/lib/hooks/use-translation"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function InternationalGallery() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const galleryItems = [
    {
      type: "image" as const,
      src: "/african-football-academy-elite-training.jpg",
      title: t("international.gallery.item1", "Entraînement Élite"),
    },
    {
      type: "image" as const,
      src: "/student-residence-dormitory.jpg",
      title: t("international.gallery.item2", "Hébergement Premium"),
    },
    {
      type: "image" as const,
      src: "/african-students-studying-in-modern-classroom.jpg",
      title: t("international.gallery.item3", "Salles d'Étude"),
    },
    {
      type: "image" as const,
      src: "/african-youth-football-training-action-shot.jpg",
      title: t("international.gallery.item4", "Vie à l'Académie"),
    },
    {
      type: "image" as const,
      src: "/young-african-football-players-training.jpg",
      title: t("international.gallery.item5", "Espaces Communs"),
    },
    {
      type: "video" as const,
      src: "/african-football-academy-elite-training.jpg",
      title: t("international.gallery.item6", "Vidéo de Présentation"),
    },
  ]

  const currentItem = galleryItems[currentIndex]

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length)
  }

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
  }

  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <Camera className="h-4 w-4" />
            {t("international.gallery.badge", "Galerie")}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 text-balance">
            <span className="bg-gradient-to-r from-gray-900 via-[#D4AF37] to-gray-900 bg-clip-text text-transparent">
              {t("international.gallery.title", "Photos & Vidéos Immersives")}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("international.gallery.description", "Découvrez en images la vie quotidienne des joueurs internationaux à Farafina Foot Academy.")}
          </p>
        </div>

        {/* Main Gallery */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Main Image/Video */}
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden group shadow-2xl border-4 border-white">
              <Image
                src={currentItem.src}
                alt={currentItem.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 80vw"
                priority={currentIndex === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Video Play Button */}
              {currentItem.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl group/play">
                    <Play className="w-8 h-8 text-white ml-1 group-hover/play:scale-110 transition-transform" />
                  </button>
                </div>
              )}

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <h3 className="font-sans font-black text-3xl md:text-4xl text-white mb-3">
                  {currentItem.title}
                </h3>
                <div className="flex items-center gap-2 text-white/80 font-semibold">
                  <span>{currentIndex + 1}</span>
                  <span>/</span>
                  <span>{galleryItems.length}</span>
                </div>
              </div>

              {/* Navigation */}
              <button
                onClick={prevItem}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-20 border border-white/20 hover:scale-110"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-7 h-7 text-white" />
              </button>
              <button
                onClick={nextItem}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-20 border border-white/20 hover:scale-110"
                aria-label="Suivant"
              >
                <ChevronRight className="w-7 h-7 text-white" />
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 z-20 border border-white/20"
                aria-label="Plein écran"
              >
                <Camera className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center justify-center gap-4 mt-8 overflow-x-auto pb-2">
              {galleryItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-4 transition-all duration-300 group",
                    index === currentIndex
                      ? "border-[#D4AF37] ring-4 ring-[#D4AF37]/20 shadow-lg scale-110"
                      : "border-white/10 hover:border-white/30 hover:scale-105"
                  )}
                  aria-label={`Voir ${item.title}`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="96px"
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-[#D4AF37]/10" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevItem()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextItem()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
            aria-label="Suivant"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
          <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
            <Image
              src={currentItem.src}
              alt={currentItem.title}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  )
}

