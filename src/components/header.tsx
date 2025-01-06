import Link from 'next/link'
import { LucideKanban, LucideLogOut } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { homePath, ticketsPath, signUpPath, signInPath } from '@/paths'
import { ThemeSwitcher } from '@/components/theme/theme-switcher'
import { SubmitButton } from '@/components/form/submit-button'
import { signOut } from '@/features/auth/actions/sign-out'
const Header = () => {
  const navItems = (
    <>
      <Link
        href={ticketsPath()}
        className={buttonVariants({ variant: 'default' })}
      >
        Tickets
      </Link>
      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: 'outline' })}
      >
        註冊
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({ variant: 'outline' })}
      >
        登入
      </Link>
      <form action={signOut}>
        <SubmitButton label="登出" icon={<LucideLogOut />} />
      </form>
    </>
  )
  return (
    <nav
      className="supports-backdrop-blur:bg-background/60
          bg-background/95 fixed top-0 right-0 left-0 z-20 
          flex w-full justify-between border-b
          px-5 py-2.5 backdrop-blur"
    >
      <div className="flex items-center gap-x-2">
        {/* <Button asChild variant="outline">
              <Link href={homePath()}>Home</Link>
            </Button> */}
        <Link
          href={homePath()}
          className={buttonVariants({ variant: 'ghost' })}
        >
          <LucideKanban />
          <h1 className="text-lg font-bold">TicketBounty</h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-2">
        <ThemeSwitcher />
        {/* <Button asChild variant="outline">
              <Link href={ticketsPath()}>Tickets</Link>
            </Button> */}
        {navItems}
      </div>
    </nav>
  )
}

export { Header }
