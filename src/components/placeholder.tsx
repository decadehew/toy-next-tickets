import { LucideMessageSquareWarning } from 'lucide-react'
import { cloneElement } from 'react'

interface PlaceholderProps {
  label: string
  icon?: React.ReactElement
  button?: React.ReactElement
}

const Placeholder = ({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <div />,
}: PlaceholderProps) => {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
      {cloneElement(icon, {
        className: 'w-16 h-16',
      })}
      <h2 className="text-center text-lg">{label}</h2>
      {cloneElement(button, { className: 'h-10' })}
    </div>
  )
}

export { Placeholder }
