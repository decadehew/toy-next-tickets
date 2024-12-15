import { useEffect, useRef } from 'react'
import { ActionState } from '../utils/to-action-state'

interface OnArgs {
  actionState: ActionState
}
interface UseActionFeedbackOptions {
  onSuccess?: (onArgs: OnArgs) => void
  onError?: (onArgs: OnArgs) => void
}
export const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackOptions
) => {
  const prevTimestamp = useRef(actionState.timestamp)
  const isUpdate = prevTimestamp.current !== actionState.timestamp

  // console.log('prevTimestamp', prevTimestamp.current)
  // console.log('--------------------------------')
  // console.log('actionState.timestamp', actionState.timestamp)
  // console.log('--------------------------------')
  // console.log('isUpdate', isUpdate)
  // console.log('--------------------------------')
  // console.log('actionState', actionState)

  useEffect(() => {
    // isUpdate 為 true 時，表示 actionState 是新的
    // !true = false
    if (!isUpdate) return

    if (actionState.status === 'SUCCESS') {
      options.onSuccess?.({ actionState })
    }
    if (actionState.status === 'ERROR') {
      options.onError?.({ actionState })
    }

    prevTimestamp.current = actionState.timestamp
  }, [isUpdate, actionState, options])
}
