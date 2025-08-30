"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface MobileFABProps {
  onClick: () => void
}

export function MobileFAB({ onClick }: MobileFABProps) {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 z-50 sm:hidden"
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">Create Event</span>
    </Button>
  )
}
