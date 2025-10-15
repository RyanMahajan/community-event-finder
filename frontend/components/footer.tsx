"use client"

interface FooterProps {
  buttons?: Array<{
    label: string
    onPress: () => void
    variant?: "primary" | "secondary"
  }>
}

export default function Footer({ buttons = [] }: FooterProps) {
  if (buttons.length === 0) return null

  return (
    <div className="flex gap-3 p-4 border-t border-gray-200">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onPress}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${
            button.variant === "secondary"
              ? "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {button.label}
        </button>
      ))}
    </div>
  )
}
