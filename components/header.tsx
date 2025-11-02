"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-[#f29200]/10" : "bg-white/95 backdrop-blur-md border-b border-border"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#f29200] rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="https://res.cloudinary.com/drkudvdmd/image/upload/v1762007821/ffa_kbbb86.jpg"
                alt="Farafina Foot Academy"
                width={48}
                height={48}
                // className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-sans font-bold text-xl text-[#2E2E2E]">Farafina Foot Academy</div>
              <div className="text-xs text-muted-foreground">Cayar, Sénégal</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/about"
              className="relative text-sm font-medium text-foreground hover:text-[#f29200] transition-colors group"
            >
              À Propos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f29200] group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/programs"
              className="relative text-sm font-medium text-foreground hover:text-[#f29200] transition-colors group"
            >
              Programmes
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f29200] group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/admissions"
              className="relative text-sm font-medium text-foreground hover:text-[#f29200] transition-colors group"
            >
              Admissions
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f29200] group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/ffa-tv"
              className="relative text-sm font-medium text-foreground hover:text-[#f29200] transition-colors group"
            >
              FFA TV
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f29200] group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/scouting"
              className="relative text-sm font-medium text-foreground hover:text-[#f29200] transition-colors group"
            >
              IA Scouting
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f29200] group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/contact"
              className="relative text-sm font-medium text-foreground hover:text-[#f29200] transition-colors group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f29200] group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Connexion</Link>
            </Button>
            <Button size="sm" className="bg-[#f29200] hover:bg-[#d17f00] text-white" asChild>
              <Link href="/apply">Postuler Maintenant</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {mobileMenuOpen ? <X size={24} className="animate-in fade-in duration-200" /> : <Menu size={24} className="animate-in fade-in duration-200" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col gap-4">
              <Link
                href="/about"
                className="text-sm font-medium text-foreground hover:text-[#f29200] transition-colors"
              >
                À Propos
              </Link>
              <Link
                href="/programs"
                className="text-sm font-medium text-foreground hover:text-[#f29200] transition-colors"
              >
                Programmes
              </Link>
              <Link
                href="/admissions"
                className="text-sm font-medium text-foreground hover:text-[#f29200] transition-colors"
              >
                Admissions
              </Link>
              <Link
                href="/ffa-tv"
                className="text-sm font-medium text-foreground hover:text-[#f29200] transition-colors"
              >
                FFA TV
              </Link>
              <Link
                href="/scouting"
                className="text-sm font-medium text-foreground hover:text-[#f29200] transition-colors"
              >
                IA Scouting
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-foreground hover:text-[#f29200] transition-colors"
              >
                Contact
              </Link>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Connexion</Link>
                </Button>
                <Button size="sm" className="bg-[#f29200] hover:bg-[#d17f00] text-white" asChild>
                  <Link href="/apply">Postuler Maintenant</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
