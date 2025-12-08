"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  Calendar,
  GraduationCap,
  Brain,
  DollarSign,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  FileText,
  MapPin,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAdmin } from "./admin-context"
import { signOut } from "@/lib/auth/auth-helpers"
import { useAuth } from "@/lib/auth/auth-context"
import { toast } from "sonner"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const menuItems = [
  {
    title: "Tableau de bord",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Gestion des Joueurs",
    href: "/admin/players",
    icon: Users,
  },
  {
    title: "Entraînement & Matchs",
    href: "/admin/training",
    icon: Calendar,
  },
  {
    title: "Gestion Académique",
    href: "/admin/academic",
    icon: GraduationCap,
  },
  {
    title: "IA & Scouting",
    href: "/admin/scouting",
    icon: Brain,
  },
  {
    title: "Finance & Admissions",
    href: "/admin/finance",
    icon: DollarSign,
  },
  {
    title: "Candidatures",
    href: "/admin/candidatures",
    icon: FileText,
  },
  {
    title: "Visites",
    href: "/admin/visites",
    icon: MapPin,
  },
  {
    title: "Messagerie",
    href: "/admin/messaging",
    icon: MessageSquare,
  },
  {
    title: "Paramètres",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function ResponsiveSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, refreshUser } = useAuth()
  const { sidebarCollapsed: collapsed, setSidebarCollapsed: setCollapsed } = useAdmin()
  const [loggingOut, setLoggingOut] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  const SidebarContent = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-[#C0C0C0]/20">
        {!collapsed && !isMobile && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FF</span>
            </div>
            <div>
              <div className="font-bold text-sm">Farafina</div>
              <div className="text-xs text-[#C0C0C0]">Administration</div>
            </div>
          </div>
        )}
        {!isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto text-white hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] h-8 w-8 p-0"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#D4AF37] text-white shadow-md"
                  : "text-[#C0C0C0] hover:bg-[#D4AF37]/10 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {(!collapsed || isMobile) && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-[#C0C0C0]/20 p-4">
        <div className={cn("flex items-center gap-3 mb-3", (collapsed && !isMobile) && "justify-center")}>
          <div className="w-8 h-8 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-[#D4AF37]" />
          </div>
          {(!collapsed || isMobile) && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">
                {user?.first_name && user?.last_name
                  ? `${user.first_name} ${user.last_name}`
                  : user?.email || "Admin User"}
              </div>
              <div className="text-xs text-[#C0C0C0] truncate">{user?.email || "admin@farafina.com"}</div>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-[#C0C0C0] hover:text-white hover:bg-red-500/10",
            (collapsed && !isMobile) && "justify-center"
          )}
          size="sm"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {(!collapsed || isMobile) && <span>{loggingOut ? "Déconnexion..." : "Déconnexion"}</span>}
        </Button>
      </div>
    </>
  )

  // Mobile: Drawer
  if (isMobile) {
    return (
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="fixed top-4 left-4 z-50 lg:hidden h-10 w-10 p-0 bg-[#1A1A1A] text-white hover:bg-[#D4AF37]/10"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-[#1A1A1A] text-white border-r border-[#C0C0C0]/20">
          <SidebarContent onLinkClick={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop: Fixed Sidebar
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-[#1A1A1A] text-white transition-all duration-300 border-r border-[#C0C0C0]/20",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <SidebarContent />
    </aside>
  )
}

