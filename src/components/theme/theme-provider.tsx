import { ThemeProvider as BaseThemeProvider } from 'next-themes'

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // console.log('我是 ThemeProvider 🐑🐑🐑🐑')
  return (
    <BaseThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </BaseThemeProvider>
  )
}
