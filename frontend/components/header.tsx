interface HeaderProps {
    title: string
  }
  
  export default function Header({ title }: HeaderProps) {
    return (
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
    )
  }
  