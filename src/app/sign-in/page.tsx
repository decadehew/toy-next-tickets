import Link from 'next/link'
import { CardCompact } from '@/components/card-compact'
import { signUpPath, passwordForgotPath } from '@/paths'
import { SignInForm } from '@/features/auth/components/sign-in-form'

export default function SignInPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Sign In"
        description="Sign in to start using TicketBounty"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<SignInForm />}
        footer={
          <>
            <Link className="text-sm text-muted-foreground" href={signUpPath()}>
              Don&apos;t have an account? Sign up
            </Link>
            <Link
              className="text-sm text-muted-foreground"
              href={passwordForgotPath()}
            >
              Forgot password?
            </Link>
          </>
        }
      />
    </div>
  )
}
