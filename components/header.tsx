"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
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
            <Link href="/about" className="text-sm font-medium text-foreground hover:text-[#f29200] transition-colors">
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
            <Link href="/ffa-tv" className="text-sm font-medium text-foreground hover:text-[#f29200] transition-colors">
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
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
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
