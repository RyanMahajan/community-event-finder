"use client"

import type { Event } from "@/app/page"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"
import Image from "next/image"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleRSVP = () => {
    console.log("[v0] RSVP clicked for event:", event.title)
    // In a real app, this would send data to your database
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      <CardHeader className="p-0">
        {event.imageUrl && (
          <div className="relative h-40 sm:h-48 w-full">
            <Image src={event.imageUrl || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4 sm:p-6 flex-1">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-semibold line-clamp-2 flex-1">{event.title}</h3>
            <Badge variant="secondary" className="shrink-0 text-xs">
              <Users className="h-3 w-3 mr-1" />
              {event.attendees}
            </Badge>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground line-clamp-3">{event.description}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
              <span className="truncate">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 sm:p-6 pt-0 mt-auto">
        <Button onClick={handleRSVP} className="w-full h-9 sm:h-10 text-sm sm:text-base">
          RSVP to Event
        </Button>
      </CardFooter>
    </Card>
  )
}
