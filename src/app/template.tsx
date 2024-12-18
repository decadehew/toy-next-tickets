import { RedirectToast } from '@/components/redirect-toast'

// https://bit.ly/3Xjyp14
// https://bit.ly/4f25Bkd

type RootTemplateProps = {
  children: React.ReactNode
}
export default function RootTemplate({ children }: RootTemplateProps) {
  return (
    <>
      <>{children}</>
      <RedirectToast />
    </>
  )
}
