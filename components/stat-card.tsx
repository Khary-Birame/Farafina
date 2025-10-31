import type React from "react"
interface StatCardProps {
  value: string
  label: string
  icon?: React.ReactNode
}

export function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-border hover:border-[#f29200] transition-all hover:shadow-lg group">
      {icon && (
        <div className="w-12 h-12 bg-[#f29200]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#f29200] transition-colors">
          <div className="text-[#f29200] group-hover:text-white transition-colors">{icon}</div>
        </div>
      )}
      <div className="font-sans font-bold text-4xl text-[#2E2E2E] mb-2">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
