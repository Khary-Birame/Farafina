"use client"

import { Card } from "@/components/ui/card"
import { Activity, TrendingUp, Target, Calendar } from "lucide-react"

export function AIDashboard() {
  const metrics = [
    {
      icon: Activity,
      label: "Speed",
      value: 87,
      unit: "km/h",
      trend: "+5%",
      color: "#008037",
    },
    {
      icon: Target,
      label: "Passing Accuracy",
      value: 92,
      unit: "%",
      trend: "+8%",
      color: "#D4AF37",
    },
    {
      icon: TrendingUp,
      label: "Endurance",
      value: 85,
      unit: "score",
      trend: "+12%",
      color: "#008037",
    },
    {
      icon: Calendar,
      label: "Attendance",
      value: 96,
      unit: "%",
      trend: "+3%",
      color: "#D4AF37",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-4">AI Dashboard Visualization</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time performance metrics powered by advanced analytics and machine learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-[#008037]/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-[#008037]/10">
                  <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
                </div>
                <span className="text-sm font-medium text-[#008037] bg-[#008037]/10 px-2 py-1 rounded">
                  {metric.trend}
                </span>
              </div>

              <div className="mb-2">
                <div className="text-3xl font-bold text-foreground mb-1">
                  {metric.value}
                  <span className="text-lg text-muted-foreground ml-1">{metric.unit}</span>
                </div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${metric.value}%`,
                    backgroundColor: metric.color,
                  }}
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Performance Chart Example */}
        <Card className="p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6">Performance Over Time</h3>
          <div className="relative h-64 flex items-end justify-between gap-4">
            {[65, 72, 68, 78, 85, 82, 87, 92, 89, 94, 91, 96].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-[#008037] to-[#00a045] hover:from-[#006629] hover:to-[#008037] transition-all duration-300 cursor-pointer"
                  style={{ height: `${value}%` }}
                />
                <span className="text-xs text-muted-foreground">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
