import Link from 'next/link'
import { CardCompact } from '@/components/card-compact'
import { signInPath } from '@/paths'
import { SignUpForm } from '@/features/auth/components/sign-up-form'

export default function SignUpPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Sign Up"
        description="Sign up to start using TicketBounty"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<SignUpForm />}
        footer={
          <Link className="text-sm text-muted-foreground" href={signInPath()}>
            Have an account? Sign in
          </Link>
        }
      />
    </div>
  )
}
