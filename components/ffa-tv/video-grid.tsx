"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { VideoCard } from "./video-card"
import { Play } from "lucide-react"

const tabs = ["Tous", "En Direct", "Replays", "Moments Forts"]

const videos = [
  {
    id: 1,
    title: "FFA U-19 vs Senegal Academy - Full Match",
    thumbnail: "/african-youth-football-match-action.jpg",
    duration: "1:45:32",
    date: "2 days ago",
    views: "12.5K",
    category: "Replays",
    isLive: false,
  },
  {
    id: 2,
    title: "Best Goals of the Month - January 2025",
    thumbnail: "/football-goal-celebration-african-players.jpg",
    duration: "8:24",
    date: "5 days ago",
    views: "28.3K",
    category: "Highlights",
    isLive: false,
  },
  {
    id: 3,
    title: "Training Session: Speed & Agility Drills",
    thumbnail: "/football-training-drills-african-academy.jpg",
    duration: "15:47",
    date: "1 week ago",
    views: "9.2K",
    category: "Highlights",
    isLive: false,
  },
  {
    id: 4,
    title: "FFA Girls U-15 Championship Final",
    thumbnail: "/african-girls-football-match.jpg",
    duration: "1:32:18",
    date: "1 week ago",
    views: "15.7K",
    category: "Replays",
    isLive: false,
  },
  {
    id: 5,
    title: "Player Profile: Rising Star Aminata Sow",
    thumbnail: "/african-female-football-player-portrait.jpg",
    duration: "6:15",
    date: "2 weeks ago",
    views: "18.9K",
    category: "Highlights",
    isLive: false,
  },
  {
    id: 6,
    title: "Behind the Scenes: A Day at FFA",
    thumbnail: "/football-academy-campus-african-students.jpg",
    duration: "12:33",
    date: "2 weeks ago",
    views: "22.1K",
    category: "Highlights",
    isLive: false,
  },
]

export function VideoGrid() {
  const [activeTab, setActiveTab] = useState("Tous")

  const filteredVideos = activeTab === "Tous" ? videos : videos.filter((v) => {
    const tabMap: Record<string, string> = {
      "En Direct": "Live",
      "Replays": "Replays",
      "Moments Forts": "Highlights"
    }
    return v.category === tabMap[activeTab]
  })

  return (
    <div>
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <h2 className="font-sans font-bold text-3xl lg:text-4xl text-white mb-2">Replays et Moments Forts</h2>
          <p className="text-gray-400">Regardez les meilleurs moments des matchs et séances d'entraînement de la FFA</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 bg-[#2E2E2E] p-1 rounded-xl border border-[#3a3a3a]">
          {tabs.map((tab) => (
            <Button
              key={tab}
              size="sm"
              variant="ghost"
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-[#f29200] text-white hover:bg-[#d17f00]"
                  : "text-gray-400 hover:text-white hover:bg-[#3a3a3a]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button
          size="lg"
          variant="outline"
          className="border-[#3a3a3a] text-white hover:bg-[#2E2E2E] text-base h-12 px-8 bg-transparent"
        >
          <Play size={20} className="mr-2" />
          Charger Plus de Vidéos
        </Button>
      </div>
    </div>
  )
}
