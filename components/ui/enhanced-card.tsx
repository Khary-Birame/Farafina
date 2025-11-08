"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface EnhancedCardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "elevated" | "outlined" | "gradient"
  hover?: boolean
}

interface CardWithIconProps extends EnhancedCardProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

// Carte de base harmonisée
export function EnhancedCard({
  children,
  className,
  variant = "default",
  hover = true,
}: EnhancedCardProps) {
  const variants = {
    default: "bg-card border-border shadow-sm",
    elevated: "bg-card border-border shadow-lg",
    outlined: "bg-transparent border-2 border-border shadow-none",
    gradient: "bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 border-[#D4AF37]/20",
  }

  return (
    <Card
      className={cn(
        variants[variant],
        hover && "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        className
      )}
    >
      {children}
    </Card>
  )
}

// Carte avec icône et action
export function CardWithIcon({
  icon,
  title,
  description,
  action,
  variant = "default",
  hover = true,
  className,
}: CardWithIconProps) {
  return (
    <EnhancedCard variant={variant} hover={hover} className={className}>
      <CardHeader>
        {icon && (
          <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-4">
            <div className="text-[#D4AF37]">{icon}</div>
          </div>
        )}
        <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground leading-relaxed">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      {action && (
        <CardFooter>
          {action.href ? (
            <a
              href={action.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37] hover:text-[#B8941F] transition-colors group"
            >
              {action.label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          ) : (
            <button
              onClick={action.onClick}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37] hover:text-[#B8941F] transition-colors group"
            >
              {action.label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </CardFooter>
      )}
    </EnhancedCard>
  )
}

// Carte statistique harmonisée
export function StatCard({
  value,
  label,
  icon,
  trend,
  className,
}: {
  value: string | number
  label: string
  icon?: React.ReactNode
  trend?: {
    value: string
    isPositive: boolean
  }
  className?: string
}) {
  return (
    <EnhancedCard
      variant="elevated"
      className={cn("border-l-4 border-l-[#D4AF37]", className)}
    >
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            {icon && (
              <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center">
                <div className="text-[#D4AF37]">{icon}</div>
              </div>
            )}
            <div className="text-3xl font-bold text-foreground">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
          {trend && (
            <div
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                trend.isPositive
                  ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                  : "bg-destructive/10 text-destructive"
              )}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}
            </div>
          )}
        </div>
      </CardContent>
    </EnhancedCard>
  )
}

// Carte de programme harmonisée
export function ProgramCardEnhanced({
  title,
  description,
  image,
  category,
  features,
  action,
  className,
}: {
  title: string
  description: string
  image?: string
  category: string
  features?: string[]
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  className?: string
}) {
  return (
    <EnhancedCard
      variant="elevated"
      className={cn("overflow-hidden group", className)}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-[#D4AF37] text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
              {category}
            </span>
          </div>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground group-hover:text-[#D4AF37] transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      {features && features.length > 0 && (
        <CardContent>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      )}
      {action && (
        <CardFooter>
          {action.href ? (
            <a
              href={action.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37] hover:text-[#B8941F] transition-colors group"
            >
              {action.label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          ) : (
            <button
              onClick={action.onClick}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37] hover:text-[#B8941F] transition-colors group"
            >
              {action.label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </CardFooter>
      )}
    </EnhancedCard>
  )
}

