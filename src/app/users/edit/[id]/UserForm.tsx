'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { InputWithLabel } from '@/components/InputWithLabel'
import { UserSchema } from '@/schemas/User'
import type { User } from '@/types/user.types'
import { saveUser } from '@/app/actions/actions'
import styles from './UserForm.module.scss'

interface Props {
  user: User
}

export default function UserForm({ user }: Props) {
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, unknown>>({})
  const router = useRouter()

  const form = useForm<User>({
    mode: 'onBlur',
    resolver: zodResolver(UserSchema),
    defaultValues: { ...user },
  })

  useEffect(() => {
    localStorage.setItem('userFormModified', form.formState.isDirty.toString())
  }, [form.formState.isDirty])

  const onSubmit = async () => {
    setMessage('')
    setErrors({})

    const result = await saveUser(form.getValues())

    if (result?.errors) {
      setMessage(result.message)
      setErrors(result.errors)
      return
    }

    setMessage(result.message)
    router.refresh()
    form.reset(form.getValues())
  }

  return (
    <div className={styles.container}>
      {message && <h2 className={styles.message}>{message}</h2>}

      {Object.keys(errors).length > 0 && (
        <div className={styles.errors}>
          {Object.keys(errors).map((key) => (
            <p key={key} className={styles.errorItem}>{`${key}: ${errors[key]}`}</p>
          ))}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit(onSubmit)()
          }}
          className={styles.form}
        >
          <InputWithLabel fieldTitle="First Name" nameInSchema="firstname" />
          <InputWithLabel fieldTitle="Last Name" nameInSchema="lastname" />
          <InputWithLabel fieldTitle="Email" nameInSchema="email" />

          <div className={styles.buttons}>
            <Button>Submit</Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => form.reset()}
              className={styles.resetButton}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}