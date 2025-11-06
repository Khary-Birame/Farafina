"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX, Maximize, Radio, MapPin, Clock } from "lucide-react"

export function LiveStreamPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-[#2E2E2E] rounded-2xl overflow-hidden shadow-2xl border border-[#3a3a3a]">
        {/* Video Player */}
        <div className="relative aspect-video bg-black group">
          {/* Live Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold animate-pulse">
            <Radio size={14} />
            <span>EN DIRECT</span>
          </div>

          {/* Viewer Count */}
          <div className="absolute top-4 right-4 z-10 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium">
            <span className="text-[#16A34A]">●</span> 2 847 spectateurs
          </div>

          {/* Video Placeholder */}
          <img src="/african-youth-football-match-live-action.jpg" alt="Match en Direct" className="w-full h-full object-cover" />

          {/* Play Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <Button
                size="lg"
                className="w-20 h-20 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white shadow-2xl"
                onClick={() => setIsPlaying(true)}
              >
                <Play size={32} className="ml-1" />
              </Button>
            </div>
          )}

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </Button>

              <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-[#16A34A]" />
              </div>

              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </Button>

              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <Maximize size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Match Details */}
        <div className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Teams & Score */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#16A34A] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    FFA
                  </div>
                  <div>
                    <div className="font-sans font-bold text-xl text-white">FFA U-17</div>
                    <div className="text-sm text-gray-400">Domicile</div>
                  </div>
                </div>

                <div className="text-center px-6">
                  <div className="font-sans font-bold text-4xl text-white">2 - 1</div>
                  <div className="text-sm text-[#16A34A] font-medium">45' + 2</div>
                </div>

                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-sans font-bold text-xl text-white text-right">Dakar FC</div>
                    <div className="text-sm text-gray-400 text-right">Extérieur</div>
                  </div>
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    DFC
                  </div>
                </div>
              </div>

              {/* Match Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#16A34A]" />
                  <span>Stade FFA, Cayar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#16A34A]" />
                  <span>Match de Ligue U-17</span>
                </div>
              </div>
            </div>

            {/* Player Stats (Optional) */}
            <div className="lg:w-64 bg-[#1a1a1a] rounded-xl p-4 border border-[#3a3a3a]">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-3">Meilleur Performeur</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#16A34A] rounded-full flex items-center justify-center text-white font-bold">
                  10
                </div>
                <div>
                  <div className="font-sans font-bold text-white">Mamadou Diallo</div>
                  <div className="text-xs text-gray-400">Attaquant</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="font-sans font-bold text-lg text-[#16A34A]">2</div>
                  <div className="text-xs text-gray-400">Buts</div>
                </div>
                <div>
                  <div className="font-sans font-bold text-lg text-white">1</div>
                  <div className="text-xs text-gray-400">Passes D</div>
                </div>
                <div>
                  <div className="font-sans font-bold text-lg text-white">8.5</div>
                  <div className="text-xs text-gray-400">Note</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
