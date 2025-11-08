import type React from "react"
interface StatCardProps {
  value: string
  label: string
  icon?: React.ReactNode
}

export function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-border hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg group hover:scale-105">
      {icon && (
        <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] transition-colors duration-300">
          <div className="text-[#D4AF37] group-hover:text-white transition-colors duration-300">{icon}</div>
        </div>
      )}
      <div className="font-sans font-bold text-4xl text-[#1A1A1A] mb-2">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
