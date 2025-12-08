"use client"

import { ResponsiveSidebar } from "./responsive-sidebar"
import { AdminHeader } from "./admin-header"
import { AdminProvider, useAdmin } from "./admin-context"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface AdminLayoutContentProps {
  children: React.ReactNode
}

function AdminLayoutContent({ children }: AdminLayoutContentProps) {
  const { sidebarCollapsed } = useAdmin()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F5F5F5] to-[#F0F0F0]">
      <ResponsiveSidebar />
      <div
        className={cn(
          "transition-all duration-300",
          isMobile ? "ml-0" : sidebarCollapsed ? "ml-20" : "ml-64"
        )}
      >
        <AdminHeader />
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

interface AdminLayoutEnhancedProps {
  children: React.ReactNode
}

export function AdminLayoutEnhanced({ children }: AdminLayoutEnhancedProps) {
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  )
}

