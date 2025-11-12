"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { languages as allLanguages, LanguageCode } from "@/lib/i18n"

// Convertir l'objet languages en tableau pour l'affichage
const languages = Object.values(allLanguages)

export function LanguageSelector({ className }: { className?: string }) {
  const { language, setLanguage, currentLanguage } = useLanguage()

  const handleLanguageChange = (langCode: LanguageCode) => {
    setLanguage(langCode)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn("gap-2", className)}
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLanguage.flag}</span>
          <span className="hidden md:inline text-sm">{language.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white border-gray-200">
        {languages.map((langItem) => (
          <DropdownMenuItem
            key={langItem.code}
            onClick={() => handleLanguageChange(langItem.code as LanguageCode)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>{langItem.flag}</span>
              <span>{langItem.name}</span>
            </div>
            {language === langItem.code && (
              <Check className="w-4 h-4 text-[#D4AF37]" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

