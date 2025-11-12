"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut } from "lucide-react"
import { LanguageSelector } from "@/components/ui/language-selector"
import { CartSheet } from "@/components/boutique/cart-sheet"
import { useAuth } from "@/lib/auth/auth-context"
import { signOut } from "@/lib/auth/auth-helpers"
import { useTranslation } from "@/lib/hooks/use-translation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


type HeaderVariant = "default" | "solid"
type HeaderProps = { variant?: HeaderVariant }

export function Header({ variant = "default" }: HeaderProps) {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await signOut()
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    } finally {
      setLoggingOut(false)
    }
  }

  const isSolid = variant === "solid" || scrolled

  // Styles PSG.fr : Fond sombre par défaut, Blanc/Clair au scroll
  const bgColor = "bg-white shadow-lg border-b border-gray-200"
  const textColor = "text-[#1A1A1A]"

  // Conservation des entrées de navigation originales avec traductions
  const navItems = [
    [t("common.home"), "/"],
    [t("navigation.programs"), "/programs"],
    [t("navigation.admissions"), "/admissions"],
    [t("navigation.events"), "/events"],
    [t("navigation.players"), "/players"],
    [t("navigation.international"), "/international"],
    [t("navigation.boutique"), "/boutique"],
    [t("navigation.ffaTV"), "/ffa-tv"],
    [t("navigation.scouting"), "/scouting"],
    [t("common.contact"), "/contact"],
    [t("navigation.partners"), "/partners"],
  ]

  const mobileNavItems = navItems

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgColor}`}
    >
      <div className={`max-w-[1400px] mx-auto flex items-center justify-between px-2 sm:px-4 lg:px-6 transition-all duration-300 h-16 lg:h-20 ${textColor}`}>

        {/* --- Partie Gauche (Menu & Logo) --- */}
        <div className="flex items-center gap-4">

          {/* Bouton Menu (Style PSG : Menu + Texte) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col items-center justify-center p-1 rounded-md transition-colors text-sm font-medium text-[#1A1A1A] hover:bg-gray-100"
            aria-label="Menu Principal"
          >
            {mobileMenuOpen ? (
              <X size={22} className="text-[#1A1A1A]" />
            ) : (
              <Menu size={22} className="text-[#1A1A1A]" />
            )}
            <span className="text-[10px] mt-0.5 uppercase tracking-wide">{t("common.menu")}</span>
          </button>

          {/* Logo FFA */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 transition-all duration-300 flex-shrink-0">
              <Image
                src="/ffa.jpg"
                alt="Farafina Foot Academy"
                width={48}
                height={48}
                className="w-full h-full object-contain rounded-full"
                priority
              />
            </div>
            <span className={`hidden md:block font-bold text-lg lg:text-xl tracking-tight transition-colors ${textColor}`}>
              Farafina Foot Academy
            </span>
          </Link>
        </div>

        {/* Navigation desktop masquée : toutes les entrées sont dans le menu */}
        <div className="hidden lg:flex flex-1" />

        {/* --- Actions de Droite (Style PSG) --- */}
        <div className="ml-auto flex items-center gap-2 lg:gap-4 xl:gap-6">
          {loading ? (
            // Pendant le chargement, afficher le bouton de connexion par défaut
            <>
              <Link
                href="/login"
                className="hidden lg:inline-flex items-center uppercase tracking-wider text-xs font-semibold px-3 py-2 rounded-md transition-colors text-[#1A1A1A] hover:bg-gray-100"
              >
                {t("common.login")}
              </Link>
              <Link
                href="/login"
                aria-label={t("common.login")}
                className="lg:hidden p-2 rounded-md text-[#1A1A1A] hover:bg-gray-100"
              >
                <User size={22} />
              </Link>
            </>
          ) : user ? (
            <>
              {/* Menu utilisateur connecté (Desktop) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hidden lg:inline-flex items-center gap-2 uppercase tracking-wider text-xs font-semibold px-3 py-2 text-[#1A1A1A] hover:bg-gray-100"
                  >
                    <User size={18} />
                    <span className="max-w-[120px] truncate">
                      {user.first_name || user.email?.split("@")[0] || "Utilisateur"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-[#1A1A1A] truncate">
                      {user.first_name && user.last_name
                        ? `${user.first_name} ${user.last_name}`
                        : user.email}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    <p className="text-xs text-muted-foreground mt-1 capitalize">
                      {t("header.role")}: {user.role}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      {t("common.profile")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {loggingOut ? `${t("common.logout")}...` : t("common.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Bouton utilisateur connecté (Mobile) */}
              <Link
                href="/profile"
                aria-label="Profil"
                className="lg:hidden p-2 rounded-md text-[#1A1A1A] hover:bg-gray-100"
              >
                <User size={22} />
              </Link>
            </>
          ) : (
            <>
              {/* Bouton connexion (Desktop) */}
              <Link
                href="/login"
                className="hidden lg:inline-flex items-center uppercase tracking-wider text-xs font-semibold px-3 py-2 rounded-md transition-colors text-[#1A1A1A] hover:bg-gray-100"
              >
                {t("common.login")}
              </Link>
              {/* Bouton connexion (Mobile) */}
              <Link
                href="/login"
                aria-label={t("common.login")}
                className="lg:hidden p-2 rounded-md text-[#1A1A1A] hover:bg-gray-100"
              >
                <User size={22} />
              </Link>
            </>
          )}
          <LanguageSelector
            className="hidden lg:inline-flex text-xs font-semibold uppercase tracking-wider transition-colors text-[#1A1A1A] hover:text-[#D4AF37]"
          />
          <Button
            size="sm"
            asChild
            className="hidden lg:inline-flex bg-[#D4AF37] hover:bg-[#b98d2c] text-white text-xs font-semibold uppercase tracking-widest"
          >
            <Link href="/apply">{t("common.apply")}</Link>
          </Button>
          <CartSheet />
        </div>
      </div>

      {/* --- Menu Mobile --- */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white/95 text-[#1A1A1A] animate-in slide-in-from-top duration-200">
          <nav className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-sm lg:grid lg:grid-cols-2 lg:gap-6">
            {mobileNavItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="font-semibold uppercase tracking-wide transition-colors text-[#1A1A1A] hover:text-[#D4AF37]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-gray-200 pt-4 lg:col-span-2">
              <div className="mb-2">
                <LanguageSelector className="w-full justify-start" />
              </div>
              {!loading && (
                <>
                  {user ? (
                    <>
                      <div className="mb-2 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm font-medium text-[#1A1A1A]">
                          {user.first_name && user.last_name
                            ? `${user.first_name} ${user.last_name}`
                            : user.email}
                        </p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground mt-1 capitalize">
                          {t("header.role")}: {user.role}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="uppercase tracking-widest border-[#1A1A1A] text-[#1A1A1A] hover:border-[#D4AF37] hover:text-[#D4AF37]"
                      >
                        <Link href="/profile">{t("common.profile")}</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="uppercase tracking-widest border-red-300 text-red-600 hover:border-red-400 hover:text-red-700"
                      >
                        {loggingOut ? `${t("common.logout")}...` : t("common.logout")}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="uppercase tracking-widest border-[#1A1A1A] text-[#1A1A1A] hover:border-[#D4AF37] hover:text-[#D4AF37]"
                      >
                        <Link href="/login">{t("common.login")}</Link>
                      </Button>
                      <Button
                        size="sm"
                        asChild
                        className="bg-[#D4AF37] hover:bg-[#b38f1f] text-white uppercase tracking-widest"
                      >
                        <Link href="/apply">{t("common.apply")}</Link>
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}