"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/hooks/use-translation"

export function EventsGallery() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)

  const galleryItems = useMemo(() => [
    {
      id: 1,
      type: "image" as const,
      src: "/african-youth-football-training-action-shot.jpg",
      title: t("events.gallery.items.detection"),
    },
    {
      id: 2,
      type: "image" as const,
      src: "/african-football-academy-elite-training.jpg",
      title: t("events.gallery.items.camp"),
    },
    {
      id: 3,
      type: "image" as const,
      src: "/young-african-football-players-training.jpg",
      title: t("events.gallery.items.tournament"),
    },
    {
      id: 4,
      type: "image" as const,
      src: "/african-students-studying-in-modern-classroom.jpg",
      title: t("events.gallery.items.conference"),
    },
    {
      id: 5,
      type: "video" as const,
      src: "/african-youth-football-training-action-shot.jpg",
      title: t("events.gallery.items.highlights"),
    },
    {
      id: 6,
      type: "image" as const,
      src: "/african-football-academy-elite-training.jpg",
      title: t("events.gallery.items.visit"),
    },
  ], [t])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
  }

  return (
    <section className="py-16 lg:py-24 bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4 text-balance">
            {t("events.gallery.title")}
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {t("events.gallery.description")}
          </p>
        </div>

        {/* Gallery Carousel */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Main Image/Video */}
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{
                  backgroundImage: `url(${galleryItems[currentIndex].src})`,
                  transform: `scale(${1 + (currentIndex % 2) * 0.05})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Video Play Button */}
              {galleryItems[currentIndex].type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center hover:bg-[#B8941F] transition-colors shadow-2xl group/play">
                    <Play className="w-8 h-8 text-white ml-1 group-hover/play:scale-110 transition-transform" />
                  </button>
                </div>
              )}

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <h3 className="font-sans font-bold text-2xl md:text-3xl text-white mb-2">
                  {galleryItems[currentIndex].title}
                </h3>
                <div className="flex items-center gap-2 text-white/80">
                  <span>{currentIndex + 1}</span>
                  <span>/</span>
                  <span>{galleryItems.length}</span>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-20"
                aria-label={t("events.gallery.previousImage")}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-20"
                aria-label={t("events.gallery.nextImage")}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center justify-center gap-3 mt-6 overflow-x-auto pb-2">
              {galleryItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? "border-[#D4AF37] scale-110"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.src})` }}
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
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

