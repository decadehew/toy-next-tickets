import { LucideLoaderCircle } from 'lucide-react'

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center flex-1 self-center">
      <LucideLoaderCircle className="h-16 w-16 animate-spin" />
    </div>
  )
}
