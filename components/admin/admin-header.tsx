"use client"

import { Bell, Search, User, Settings as SettingsIcon } from "lucide-react"
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

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#E5E7EB] shadow-md">
      <div className="flex items-center justify-between h-full px-6">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C0C0C0]" />
            <Input
              type="search"
              placeholder="Rechercher un joueur, un match, une transaction..."
              className="pl-10 pr-4 h-10 bg-[#F5F5F5] border-[#C0C0C0] focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <DropdownMenu>
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
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-10 gap-2 px-2">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-[#1A1A1A]">Admin User</div>
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
              <DropdownMenuItem className="cursor-pointer text-red-600">
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

