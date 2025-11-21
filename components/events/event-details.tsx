'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Star,
  ArrowLeft,
  Share2,
  Check,
  AlertCircle,
  Trophy,
  Award,
  Sparkles,
  Info,
  Package,
  Shield,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  Heart
} from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from '@/lib/hooks/use-translation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type EventType = "détection" | "tournoi" | "visite" | "conférence" | "cérémonie" | "portes-ouvertes" | "camp"

interface EventDetailsProps {
  event: {
    id: string
    slug: string
    date: string
    title: string
    location: string
    address?: string
    type: EventType
    description: string
    longDescription?: string
    image: string
    images?: string[]
    time?: string
    duration?: string
    price?: number
    isFree?: boolean
    participants?: number
    maxParticipants?: number
    status: "open" | "full" | "closed"
    isFeatured?: boolean
    ageRange?: string
    requirements?: string[]
    provided?: string[]
    activities?: string[]
    testimonials?: Array<{ author: string; text: string; rating: number }>
  }
}

const eventTypeColors: Record<EventType, { bg: string; text: string; border: string; icon: string }> = {
  détection: {
    bg: "bg-gradient-to-r from-[#D4AF37]/20 to-[#B8941F]/20",
    text: "text-[#D4AF37]",
    border: "border-[#D4AF37]/30",
    icon: "🎯"
  },
  tournoi: {
    bg: "bg-gradient-to-r from-blue-500/20 to-indigo-500/20",
    text: "text-blue-400",
    border: "border-blue-400/30",
    icon: "🏆"
  },
  visite: {
    bg: "bg-gradient-to-r from-green-500/20 to-emerald-500/20",
    text: "text-green-400",
    border: "border-green-400/30",
    icon: "📍"
  },
  conférence: {
    bg: "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
    text: "text-purple-400",
    border: "border-purple-400/30",
    icon: "🎤"
  },
  cérémonie: {
    bg: "bg-gradient-to-r from-amber-500/20 to-orange-500/20",
    text: "text-amber-400",
    border: "border-amber-400/30",
    icon: "🎉"
  },
  "portes-ouvertes": {
    bg: "bg-gradient-to-r from-cyan-500/20 to-teal-500/20",
    text: "text-cyan-400",
    border: "border-cyan-400/30",
    icon: "🚪"
  },
  camp: {
    bg: "bg-gradient-to-r from-red-500/20 to-rose-500/20",
    text: "text-red-400",
    border: "border-red-400/30",
    icon: "⛺"
  },
}

export function EventDetails({ event }: EventDetailsProps) {
  const { t } = useTranslation()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageFullscreen, setIsImageFullscreen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'program' | 'practical'>('overview')

  const images = useMemo(() => {
    if (event.images && event.images.length > 0) {
      return event.images
    }
    return [event.image]
  }, [event.images, event.image])

  const primaryImage = images[currentImageIndex] || images[0]
  const typeConfig = eventTypeColors[event.type] || eventTypeColors.détection

  const averageRating = useMemo(() => {
    if (!event.testimonials || event.testimonials.length === 0) return 4.8
    const sum = event.testimonials.reduce((acc, t) => acc + t.rating, 0)
    return sum / event.testimonials.length
  }, [event.testimonials])

  const handleRegister = () => {
    if (event.status !== 'open') {
      toast.error('Les inscriptions sont fermées pour cet événement')
      return
    }
    // Rediriger vers le formulaire d'inscription
    toast.success('Redirection vers le formulaire d\'inscription...')
    // router.push(`/events/${event.slug}/register`)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        })
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Lien copié dans le presse-papier')
    }
  }

  return (
    <div className="bg-[#0f1012] min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#0f1012] to-[#1a1a1a] sticky top-0 z-30 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-white/70" aria-label="Breadcrumb">
            <Link href="/events" className="hover:text-[#D4AF37] transition-colors font-medium">
              Événements
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-semibold line-clamp-1">{event.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1012] via-[#1a1a1a] to-[#0f1012]" />
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-[#1a1a1a] to-[#0f1012] rounded-3xl overflow-hidden group shadow-2xl border-4 border-white/10">
                <Image
                  src={primaryImage}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 cursor-zoom-in group-hover:scale-105"
                  priority
                  onClick={() => setIsImageFullscreen(true)}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10 border border-white/20"
                      aria-label="Image précédente"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex((prev) => (prev + 1) % images.length)
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10 border border-white/20"
                      aria-label="Image suivante"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsImageFullscreen(true)
                  }}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10 border border-white/20"
                  aria-label="Voir en plein écran"
                >
                  <ZoomIn className="w-6 h-6" />
                </button>

                {images.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold z-10">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Miniatures */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "relative aspect-square rounded-2xl overflow-hidden border-4 transition-all duration-300 group",
                        index === currentImageIndex
                          ? 'border-[#D4AF37] ring-4 ring-[#D4AF37]/20 shadow-lg scale-105'
                          : 'border-white/10 hover:border-white/30 hover:scale-105'
                      )}
                      aria-label={`Voir l'image ${index + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`${event.title} - ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 25vw, 12.5vw"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 bg-[#D4AF37]/10" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informations */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Badges */}
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border backdrop-blur-sm",
                    typeConfig.bg,
                    typeConfig.text,
                    typeConfig.border
                  )}
                >
                  <span>{typeConfig.icon}</span>
                  {event.type}
                </span>
                {event.isFeatured && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-sm font-bold shadow-lg">
                    <Star className="w-4 h-4 fill-white" />
                    Événement phare
                  </span>
                )}
                {event.status === 'open' && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-bold border border-green-500/30">
                    <Check className="w-4 h-4" />
                    Inscriptions ouvertes
                  </span>
                )}
                {event.status === 'full' && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm font-bold border border-red-500/30">
                    <AlertCircle className="w-4 h-4" />
                    Complet
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                {event.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < Math.floor(averageRating)
                          ? 'fill-[#D4AF37] text-[#D4AF37]'
                          : 'fill-white/20 text-white/20'
                      )}
                    />
                  ))}
                  <span className="text-white font-bold ml-2">{averageRating.toFixed(1)}</span>
                </div>
                {event.testimonials && (
                  <span className="text-white/60">
                    ({event.testimonials.length} avis)
                  </span>
                )}
              </div>

              {/* Key Info */}
              <div className="space-y-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-semibold uppercase tracking-wide">Date</p>
                    <p className="text-white font-bold text-lg">{event.date}</p>
                    {event.time && (
                      <p className="text-white/80 text-sm">{event.time}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-semibold uppercase tracking-wide">Lieu</p>
                    <p className="text-white font-bold text-lg">{event.location}</p>
                    {event.address && (
                      <p className="text-white/80 text-sm">{event.address}</p>
                    )}
                  </div>
                </div>

                {event.duration && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm font-semibold uppercase tracking-wide">Durée</p>
                      <p className="text-white font-bold text-lg">{event.duration}</p>
                    </div>
                  </div>
                )}

                {event.maxParticipants && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60 text-sm font-semibold uppercase tracking-wide mb-2">Participants</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] transition-all duration-500"
                            style={{ width: `${((event.participants || 0) / event.maxParticipants) * 100}%` }}
                          />
                        </div>
                        <span className="text-white font-bold text-sm">
                          {event.participants || 0}/{event.maxParticipants}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {event.price !== undefined && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm font-semibold uppercase tracking-wide">Tarif</p>
                      {event.isFree ? (
                        <p className="text-green-400 font-black text-2xl">Gratuit</p>
                      ) : (
                        <p className="text-[#D4AF37] font-black text-2xl">{formatCurrency(event.price)}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Description courte */}
              <p className="text-lg text-white/80 leading-relaxed">
                {event.description}
              </p>

              {/* Actions */}
              <div className="space-y-4 pt-4">
                <Button
                  onClick={handleRegister}
                  disabled={event.status !== 'open'}
                  className={cn(
                    "w-full h-16 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300",
                    event.status !== 'open' && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {event.status === 'open' ? (
                    <>
                      <Trophy className="w-6 h-6 mr-3" />
                      S'inscrire maintenant
                    </>
                  ) : event.status === 'full' ? (
                    <>
                      <AlertCircle className="w-6 h-6 mr-3" />
                      Complet
                    </>
                  ) : (
                    <>
                      <X className="w-6 h-6 mr-3" />
                      Inscriptions fermées
                    </>
                  )}
                </Button>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsLiked(!isLiked)}
                    className={cn(
                      "flex-1 h-14 border-2 rounded-xl transition-all duration-300",
                      isLiked 
                        ? "border-red-500 bg-red-500/20 text-red-400" 
                        : "border-white/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-white bg-white/5"
                    )}
                    aria-label="Ajouter aux favoris"
                  >
                    <Heart className={cn("w-5 h-5 transition-all", isLiked && "fill-red-500 text-red-500 scale-110")} />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="flex-1 h-14 border-2 border-white/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-white bg-white/5 rounded-xl transition-all duration-300"
                    aria-label="Partager"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b-2 border-white/10 mb-8">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: Info },
              { id: 'program', label: 'Programme', icon: Calendar },
              { id: 'practical', label: 'Infos pratiques', icon: Package },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-300 border-b-2 -mb-[2px]",
                  activeTab === tab.id
                    ? "border-[#D4AF37] text-[#D4AF37]"
                    : "border-transparent text-white/60 hover:text-white/80"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {event.longDescription ? (
                  <div 
                    className="text-white/80 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: event.longDescription }}
                  />
                ) : (
                  <p className="text-white/80 leading-relaxed text-lg">
                    {event.description}
                  </p>
                )}

                {event.activities && event.activities.length > 0 && (
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-white font-bold text-2xl mb-6 flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                      À quoi s'attendre
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {event.activities.map((activity, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center flex-shrink-0">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                          <p className="text-white/90 font-medium">{activity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {event.testimonials && event.testimonials.length > 0 && (
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-white font-bold text-2xl mb-6 flex items-center gap-3">
                      <Star className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37]" />
                      Témoignages
                    </h3>
                    <div className="space-y-6">
                      {event.testimonials.map((testimonial, i) => (
                        <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex items-center gap-2 mb-3">
                            {[...Array(5)].map((_, j) => (
                              <Star
                                key={j}
                                className={cn(
                                  "w-4 h-4",
                                  j < testimonial.rating
                                    ? 'fill-[#D4AF37] text-[#D4AF37]'
                                    : 'fill-white/20 text-white/20'
                                )}
                              />
                            ))}
                          </div>
                          <p className="text-white/80 leading-relaxed mb-3">{testimonial.text}</p>
                          <p className="text-white/60 text-sm font-semibold">— {testimonial.author}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'program' && (
              <div className="space-y-8">
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-white font-bold text-2xl mb-6 flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-[#D4AF37]" />
                    Programme détaillé
                  </h3>
                  {event.longDescription && event.longDescription.includes('<h3>Programme') ? (
                    <div 
                      className="text-white/80 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: event.longDescription.split('<h3>Programme')[1]?.split('</ul>')[0] + '</ul>' || '' }}
                    />
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-white/60 text-sm font-semibold mb-2">09:00 - 09:30</p>
                        <p className="text-white font-semibold">Accueil et enregistrement</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-white/60 text-sm font-semibold mb-2">09:30 - 12:00</p>
                        <p className="text-white font-semibold">Tests et évaluations</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-white/60 text-sm font-semibold mb-2">12:00 - 13:00</p>
                        <p className="text-white font-semibold">Pause déjeuner</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-white/60 text-sm font-semibold mb-2">13:00 - 17:00</p>
                        <p className="text-white font-semibold">Suite des évaluations et débriefing</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'practical' && (
              <div className="space-y-8">
                {event.requirements && event.requirements.length > 0 && (
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-white font-bold text-2xl mb-6 flex items-center gap-3">
                      <Package className="w-6 h-6 text-[#D4AF37]" />
                      À apporter
                    </h3>
                    <ul className="space-y-3">
                      {event.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/80">
                          <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.provided && event.provided.length > 0 && (
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-white font-bold text-2xl mb-6 flex items-center gap-3">
                      <Shield className="w-6 h-6 text-[#D4AF37]" />
                      Fourni par l'académie
                    </h3>
                    <ul className="space-y-3">
                      {event.provided.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/80">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.ageRange && (
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-white font-bold text-2xl mb-6 flex items-center gap-3">
                      <Users className="w-6 h-6 text-[#D4AF37]" />
                      Informations importantes
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-white/60 font-semibold">Tranche d'âge</span>
                        <span className="text-white font-bold">{event.ageRange}</span>
                      </div>
                      {event.maxParticipants && (
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-white/60 font-semibold">Places disponibles</span>
                          <span className="text-white font-bold">
                            {event.maxParticipants - (event.participants || 0)} / {event.maxParticipants}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
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
              alt={event.title}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}

