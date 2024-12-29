import { FileText, Pencil, CircleCheck } from 'lucide-react'

export const TICKET_ICONS = {
  OPEN: <FileText className="w-4 h-4" />,
  IN_PROGRESS: <Pencil className="w-4 h-4" />,
  DONE: <CircleCheck className="w-4 h-4" />,
}

export const TICKET_STATUS_LABELS = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}
