import { ZodError } from 'zod'

export type ActionState = {
  message: string
  fieldErrors: Record<string, string[] | undefined>
  payload?: FormData
}

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState => {
  if (error instanceof ZodError) {
    console.log('xxx', error.flatten().fieldErrors)
    // 如果是使用Zod的驗證錯誤，返回第一個錯誤信息
    return {
      message: '',
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
    }
  } else if (error instanceof Error) {
    // 如果是另一個錯誤實例，返回錯誤信息
    // 資料庫錯誤等
    return {
      message: error.message,
      fieldErrors: {},
      payload: formData,
    }
  } else {
    // 如果不是錯誤實例，而是其他什麼東西崩潰了
    // 返回通用的錯誤信息
    return { message: '發生了未知的錯誤', fieldErrors: {}, payload: formData }
  }
}
