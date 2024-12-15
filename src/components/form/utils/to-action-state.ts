import { ZodError } from 'zod'

export type ActionState = {
  status?: 'SUCCESS' | 'ERROR'
  message: string
  fieldErrors: Record<string, string[] | undefined>
  payload?: FormData
  timestamp: number
}

export const EMPTY_ACTION_STATE: ActionState = {
  message: '',
  fieldErrors: {},
  timestamp: Date.now(),
}

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState => {
  if (error instanceof ZodError) {
    // console.log('xxx', error.flatten().fieldErrors)
    // 如果是使用Zod的驗證錯誤，返回第一個錯誤信息
    return {
      status: 'ERROR',
      message: '',
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    }
  } else if (error instanceof Error) {
    // 如果是另一個錯誤實例，返回錯誤信息
    // 資料庫錯誤等
    return {
      status: 'ERROR',
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    }
  } else {
    // 如果不是錯誤實例，而是其他什麼東西崩潰了
    // 返回通用的錯誤信息
    return {
      status: 'ERROR',
      message: '發生了未知的錯誤',
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    }
  }
}

export const toActionState = (
  status: ActionState['status'],
  message: string
): ActionState => {
  return { status, message, fieldErrors: {}, timestamp: Date.now() }
}
