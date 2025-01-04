'use client'

import { useActionState } from 'react'
import { Form } from '@/components/form/form'
import { Input } from '@/components/ui/input'
import { FieldError } from '@/components/form/field-error'
import { SubmitButton } from '@/components/form/submit-button'
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state'
import { signIn } from '@/features/auth/actions/sign-in'

export const SignInForm = () => {
  const [actionState, formAction] = useActionState(signIn, EMPTY_ACTION_STATE)

  return (
    <Form action={formAction} actionState={actionState}>
      <Input
        name="email"
        placeholder="Email"
        defaultValue={actionState.payload?.get('email') as string}
      />
      <FieldError actionState={actionState} name="email" />

      <Input
        type="password"
        name="password"
        placeholder="Password"
        defaultValue={actionState.payload?.get('password') as string}
      />
      <FieldError actionState={actionState} name="password" />

      <SubmitButton label="Sign In" />
    </Form>
  )
}
