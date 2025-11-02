import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ProgramCardProps {
  title: string
  description: string
  image: string
  category: string
}

export function ProgramCard({ title, description, image, category }: ProgramCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-border hover:border-[#f29200] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#f29200] text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">{category}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="font-sans font-bold text-xl text-[#2E2E2E] mb-3 text-balance group-hover:text-[#f29200] transition-colors duration-300">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
        <Button variant="ghost" className="text-[#f29200] hover:text-[#d97f00] p-0 h-auto font-medium group/btn">
          En savoir plus
          <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-2 transition-transform duration-300" />
        </Button>
      </div>
    </div>
  )
}
