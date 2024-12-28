import { toast } from 'sonner'
import { ActionState } from './utils/to-action-state'
import { useActionFeedback } from './hooks/use-action-feedback'

type FormProps = {
  action: (formData: FormData) => void
  actionState: ActionState
  children: React.ReactNode
  onSuccess?: (actionState: ActionState) => void
  onError?: (actionState: ActionState) => void
}
export const Form = ({
  action,
  actionState,
  children,
  onSuccess,
  onError,
}: FormProps) => {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message)
      }

      onSuccess?.(actionState)
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message)
      }

      onError?.(actionState)
    },
  })

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  )
}
