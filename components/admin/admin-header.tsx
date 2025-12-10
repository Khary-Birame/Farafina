"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, User, Settings as SettingsIcon, LogOut, Users, Calendar, CreditCard, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { signOut } from "@/lib/auth/auth-helpers"
import { useAuth } from "@/lib/auth/auth-context"
import { toast } from "sonner"
import { globalSearch, type SearchResult } from "@/lib/admin/search-helpers"
import { cn } from "@/lib/utils"

export function AdminHeader() {
  const router = useRouter()
  const { user, refreshUser } = useAuth()
  const [loggingOut, setLoggingOut] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  const handleLogout = async (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()

    setLoggingOut(true)
    try {
      console.log("Déconnexion en cours...")

      // Appeler signOut
      const result = await signOut()

      if (result.success) {
        console.log("Déconnexion réussie, redirection...")
        toast.success("Déconnexion réussie")

        // Attendre un peu pour que l'événement SIGNED_OUT soit propagé
        await new Promise(resolve => setTimeout(resolve, 100))

        // Rafraîchir l'utilisateur
        try {
          await refreshUser()
        } catch (refreshError) {
          console.warn("Erreur refreshUser (non bloquant):", refreshError)
        }

        // Rediriger immédiatement
        window.location.href = "/"
      } else {
        console.error("Erreur déconnexion:", result.error)
        toast.error(result.error || "Erreur lors de la déconnexion")
        setLoggingOut(false)
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
      toast.error("Une erreur s'est produite lors de la déconnexion")
      setLoggingOut(false)
    }
  }

  // Recherche avec debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (searchQuery.trim().length < 2) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true)
      const { results, error } = await globalSearch(searchQuery)

      if (error) {
        console.error("Erreur recherche:", error)
        setSearchResults([])
      } else {
        setSearchResults(results)
        setShowResults(results.length > 0)
      }
      setIsSearching(false)
    }, 300)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery])

  // Fermer les résultats quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  const handleResultClick = (result: SearchResult) => {
    setShowResults(false)
    setSearchQuery("")
    router.push(result.url)
  }

  const getResultIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "player":
        return <Users className="w-4 h-4" />
      case "match":
        return <Calendar className="w-4 h-4" />
      case "order":
        return <CreditCard className="w-4 h-4" />
      case "candidature":
        return <FileText className="w-4 h-4" />
      default:
        return <Search className="w-4 h-4" />
    }
  }

  const getResultTypeLabel = (type: SearchResult["type"]) => {
    switch (type) {
      case "player":
        return "Joueur"
      case "match":
        return "Match"
      case "order":
        return "Transaction"
      case "candidature":
        return "Candidature"
      default:
        return ""
    }
  }

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E5E7EB] shadow-md">
      <div className="flex items-center justify-between h-full px-6">
        {/* Search */}
        <div className="flex-1 max-w-xl" ref={searchContainerRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C0C0C0] z-10" />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C0C0C0] animate-spin z-10" />
            )}
            <Input
              type="search"
              placeholder="Rechercher un joueur, un match, une transaction..."
              className="pl-10 pr-10 h-10 bg-[#F5F5F5] border-[#C0C0C0] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => {
                if (searchResults.length > 0) {
                  setShowResults(true)
                }
              }}
            />

            {/* Résultats de recherche */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#C0C0C0]/30 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {searchResults.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className="w-full flex items-start gap-3 p-3 hover:bg-[#F5F5F5] transition-colors text-left border-b border-[#C0C0C0]/10 last:border-b-0"
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      result.type === "player" && "bg-blue-100 text-blue-600",
                      result.type === "match" && "bg-green-100 text-green-600",
                      result.type === "order" && "bg-purple-100 text-purple-600",
                      result.type === "candidature" && "bg-orange-100 text-orange-600"
                    )}>
                      {getResultIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-sm text-[#1A1A1A] truncate">{result.title}</p>
                        <Badge variant="outline" className="text-xs flex-shrink-0">
                          {getResultTypeLabel(result.type)}
                        </Badge>
                      </div>
                      {result.subtitle && (
                        <p className="text-xs text-[#737373] mt-1 truncate">{result.subtitle}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications - Masqué temporairement car non fonctionnel */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-10 w-10 p-0">
                <Bell className="w-5 h-5 text-[#1A1A1A]" />
                <Badge className="absolute top-1 right-1 h-5 w-5 p-0 flex items-center justify-center bg-[#D4AF37] text-white text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white border border-[#C0C0C0]/30 shadow-lg">
              <div className="p-3 font-semibold text-sm text-[#1A1A1A] border-b border-[#C0C0C0]/30 bg-[#F5F5F5]">
                Notifications
              </div>
              <div className="max-h-96 overflow-y-auto bg-white">
                <DropdownMenuItem className="flex-col items-start p-3 cursor-pointer hover:bg-[#F5F5F5] focus:bg-[#F5F5F5]">
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-medium text-sm text-[#1A1A1A]">Nouvelle candidature</span>
                    <span className="text-xs text-[#C0C0C0]">Il y a 5 min</span>
                  </div>
                  <span className="text-xs text-[#1A1A1A]/70">Amadou Diallo a soumis sa candidature</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#C0C0C0]/30" />
                <DropdownMenuItem className="flex-col items-start p-3 cursor-pointer hover:bg-[#F5F5F5] focus:bg-[#F5F5F5]">
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-medium text-sm text-[#1A1A1A]">Paiement reçu</span>
                    <span className="text-xs text-[#C0C0C0]">Il y a 1h</span>
                  </div>
                  <span className="text-xs text-[#1A1A1A]/70">Fatou Sarr - 1 800 000 XOF</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#C0C0C0]/30" />
                <DropdownMenuItem className="flex-col items-start p-3 cursor-pointer hover:bg-[#F5F5F5] focus:bg-[#F5F5F5]">
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-medium text-sm text-[#1A1A1A]">Match à venir</span>
                    <span className="text-xs text-[#C0C0C0]">Il y a 2h</span>
                  </div>
                  <span className="text-xs text-[#1A1A1A]/70">U16 vs ASC Diaraf - Demain 15h</span>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator className="bg-[#C0C0C0]/30" />
              <DropdownMenuItem className="justify-center text-[#D4AF37] font-medium cursor-pointer hover:bg-[#D4AF37]/10 focus:bg-[#D4AF37]/10">
                Voir toutes les notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-10 gap-2 px-2">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-[#1A1A1A]">
                    {user?.first_name && user?.last_name
                      ? `${user.first_name} ${user.last_name}`
                      : user?.email || "Admin User"}
                  </div>
                  <div className="text-xs text-[#C0C0C0]">Administrateur</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Mon profil
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <SettingsIcon className="w-4 h-4 mr-2" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:text-red-600"
                onSelect={(e) => {
                  e.preventDefault()
                  handleLogout(e as any)
                }}
                disabled={loggingOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                {loggingOut ? "Déconnexion..." : "Déconnexion"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

