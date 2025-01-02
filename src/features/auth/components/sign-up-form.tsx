'use client'

import { useActionState } from 'react'
import { Form } from '@/components/form/form'
import { Input } from '@/components/ui/input'
import { FieldError } from '@/components/form/field-error'
import { SubmitButton } from '@/components/form/submit-button'
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state'
import { signUp } from '@/features/auth/actions/sign-up'

export const SignUpForm = () => {
  const [actionState, formAction] = useActionState(signUp, EMPTY_ACTION_STATE)

  return (
    <Form action={formAction} actionState={actionState}>
      <Input name="username" placeholder="Username" />
      <FieldError actionState={actionState} name="username" />

      <Input name="email" placeholder="Email" />
      <FieldError actionState={actionState} name="email" />

      <Input type="password" name="password" placeholder="Password" />
      <FieldError actionState={actionState} name="password" />

      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="Sign Up" />
    </Form>
  )
}
