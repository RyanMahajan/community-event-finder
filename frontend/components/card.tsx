
interface CardProps {
  imageSource: string
  caption: string
}

export default function Card({ imageSource, caption }: CardProps) {
  return (
    <div className="w-full">
      <img src={imageSource || "/placeholder.svg"} alt="Card image" className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-sm text-gray-600 leading-relaxed">{caption}</p>
      </div>
    </div>
  )
}
