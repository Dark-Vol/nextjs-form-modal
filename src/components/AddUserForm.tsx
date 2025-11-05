'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { InputWithLabel } from '@/components/InputWithLabel'
import { UserSchema } from '@/schemas/User'
import type { CreateUserDto } from '@/types/user.types'
import { createUser } from '@/app/actions/actions'
import styles from './AddUserForm.module.scss'

export default function AddUserForm() {
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, unknown>>({})
  const router = useRouter()

  const form = useForm<CreateUserDto>({
    mode: 'onBlur',
    resolver: zodResolver(UserSchema.omit({ id: true })),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
    },
  })

  const onSubmit = async () => {
    setMessage('')
    setErrors({})

    const result = await createUser(form.getValues())

    if (result?.errors) {
      setMessage(result.message)
      setErrors(result.errors)
      return
    }

    setMessage(result.message)
    router.refresh()
    form.reset()

    // Close modal after successful creation
    setTimeout(() => {
      router.push('/users')
    }, 1000)
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
            <Button>Create User</Button>
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

