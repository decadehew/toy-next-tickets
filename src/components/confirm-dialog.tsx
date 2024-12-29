import { useState, cloneElement, useActionState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Form } from '@/components/form/form'
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from '@/components/form/utils/to-action-state'
import { SubmitButton } from '@/components/form/submit-button'

interface UseConfirmDialogArgs {
  title?: string
  description?: string
  action: () => Promise<ActionState>
  trigger: React.ReactElement
}

export const useConfirmDialog = ({
  title = 'Are you absolutely sure?',
  description = '刪除後將無法恢復，請謹慎操作',
  action,
  trigger,
}: UseConfirmDialogArgs) => {
  const [isOpen, setIsOpen] = useState(false)

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((state) => !state),
  })

  const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE)
  const handleSuccess = () => {
    setIsOpen(false)
  }

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Form
              action={formAction}
              actionState={actionState}
              onSuccess={handleSuccess}
            >
              <SubmitButton label="確認" />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return [dialogTrigger, dialog] as const
}
