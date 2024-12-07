import { ZodError } from 'zod'

export type ActionState = {
  message: string
  payload?: FormData
}

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState => {
  if (error instanceof ZodError) {
    // 如果是使用Zod的驗證錯誤，返回第一個錯誤信息
    return {
      message: error.errors[0].message,
      payload: formData,
    }
  } else if (error instanceof Error) {
    // 如果是另一個錯誤實例，返回錯誤信息
    // 資料庫錯誤等
    return {
      message: error.message,
      payload: formData,
    }
  } else {
    // 如果不是錯誤實例，而是其他什麼東西崩潰了
    // 返回通用的錯誤信息
    return { message: '發生了未知的錯誤', payload: formData }
  }
}
