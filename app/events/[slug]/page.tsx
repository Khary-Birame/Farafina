import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventDetails } from "@/components/events/event-details"
import { notFound } from "next/navigation"
import { getEventBySlug } from "@/lib/supabase/events-helpers"
import { ProtectedServerContent } from "@/components/auth/protected-server-content"

export const dynamic = 'force-dynamic'

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    notFound()
  }

  return (
    <ProtectedServerContent>
      <div className="min-h-screen bg-[#0f1012]">
        <Header variant="solid" />
        <main className="pt-20">
          <EventDetails event={event} />
        </main>
        <Footer />
      </div>
    </ProtectedServerContent>
  )
}
