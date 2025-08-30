"use client"

import { useState } from "react"
import { EventList } from "@/components/event-list"
import { CreateEventModal } from "@/components/create-event-modal"
import { MobileFAB } from "@/components/mobile-fab"
import { Button } from "@/components/ui/button"
import { Plus, Calendar } from "lucide-react"

export interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  imageUrl?: string
  attendees: number
}

// Sample initial events data
const initialEvents: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2024",
    description:
      "Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.",
    date: "2024-03-15",
    location: "San Francisco, CA",
    imageUrl: "/tech-conference-stage-with-speakers.png",
    attendees: 245,
  },
  {
    id: "2",
    title: "Music Festival",
    description: "Three days of amazing music with top artists from around the world.",
    date: "2024-04-20",
    location: "Austin, TX",
    imageUrl: "/outdoor-music-festival-stage-with-crowd.png",
    attendees: 1200,
  },
]

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleCreateEvent = (eventData: Omit<Event, "id" | "attendees">) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      attendees: 0,
    }
    setEvents((prev) => [newEvent, ...prev])
    setIsCreateModalOpen(false)
  }

  const handleRefreshEvents = async () => {
    setIsRefreshing(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // In a real app, this would fetch from your database
    console.log("[v0] Refreshing events from database...")
    setIsRefreshing(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-foreground">EventHub</h1>
                <p className="text-sm sm:text-base text-muted-foreground hidden sm:block">
                  Discover and create amazing events
                </p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Button
                variant="outline"
                onClick={handleRefreshEvents}
                disabled={isRefreshing}
                className="flex items-center gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm px-2 sm:px-4"
                size="sm"
              >
                {isRefreshing ? (
                  <div className="h-3 w-3 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
                <span className="hidden sm:inline">{isRefreshing ? "Loading..." : "Refresh Events"}</span>
                <span className="sm:hidden">{isRefreshing ? "..." : "Refresh"}</span>
              </Button>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="hidden sm:flex items-center gap-2 text-sm px-4"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8 pb-20 sm:pb-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Upcoming Events</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Browse events or create your own to share with the community
          </p>
        </div>

        <EventList events={events} />

        {events.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">No events yet</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 px-4">
              Be the first to create an event for the community!
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)} size="sm" className="sm:size-default">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Event
            </Button>
          </div>
        )}
      </main>

      <MobileFAB onClick={() => setIsCreateModalOpen(true)} />

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateEvent={handleCreateEvent}
      />
    </div>
  )
}
