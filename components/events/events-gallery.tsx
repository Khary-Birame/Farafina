"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/hooks/use-translation"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function EventsGallery() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)

  const galleryItems = useMemo(() => [
    {
      id: 1,
      type: "image" as const,
      src: "/african-youth-football-training-action-shot.jpg",
      title: t("events.gallery.items.detection") || "Journée de Détection",
    },
    {
      id: 2,
      type: "image" as const,
      src: "/african-football-academy-elite-training.jpg",
      title: t("events.gallery.items.camp") || "Stage d'Entraînement",
    },
    {
      id: 3,
      type: "image" as const,
      src: "/young-african-football-players-training.jpg",
      title: t("events.gallery.items.tournament") || "Tournoi",
    },
    {
      id: 4,
      type: "image" as const,
      src: "/african-students-studying-in-modern-classroom.jpg",
      title: t("events.gallery.items.conference") || "Conférence",
    },
    {
      id: 5,
      type: "video" as const,
      src: "/african-youth-football-training-action-shot.jpg",
      title: t("events.gallery.items.highlights") || "Highlights",
    },
    {
      id: 6,
      type: "image" as const,
      src: "/african-football-academy-elite-training.jpg",
      title: t("events.gallery.items.visit") || "Visite",
    },
  ], [t])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
  }

  return (
    <section className="relative py-16 lg:py-24 bg-[#0f1012] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(212,175,55,0.06),_transparent_60%)]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-sm text-[#D4AF37] mb-6">
            <Play className="h-4 w-4" />
            {t("events.gallery.badge") || "Galerie"}
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6 text-balance">
            <span className="bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
              {t("events.gallery.title") || "Galerie des Événements"}
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {t("events.gallery.description") || "Découvrez les moments forts de nos événements passés"}
          </p>
        </div>

        {/* Gallery Carousel */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Main Image/Video */}
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden group shadow-2xl border-4 border-white/10">
              <Image
                src={galleryItems[currentIndex].src}
                alt={galleryItems[currentIndex].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 80vw"
                priority={currentIndex === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              {/* Video Play Button */}
              {galleryItems[currentIndex].type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl group/play">
                    <Play className="w-8 h-8 text-white ml-1 group-hover/play:scale-110 transition-transform" />
                  </button>
                </div>
              )}

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <h3 className="font-sans font-black text-3xl md:text-4xl text-white mb-3">
                  {galleryItems[currentIndex].title}
                </h3>
                <div className="flex items-center gap-2 text-white/80 font-semibold">
                  <span>{currentIndex + 1}</span>
                  <span>/</span>
                  <span>{galleryItems.length}</span>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-20 border border-white/20 hover:scale-110"
                aria-label={t("events.gallery.previousImage") || "Image précédente"}
              >
                <ChevronLeft className="w-7 h-7 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-20 border border-white/20 hover:scale-110"
                aria-label={t("events.gallery.nextImage") || "Image suivante"}
              >
                <ChevronRight className="w-7 h-7 text-white" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center justify-center gap-4 mt-8 overflow-x-auto pb-2 scrollbar-hide">
              {galleryItems.map((item, index) => (
                <button
                  key={item.id}
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
    </section>
  )
}
