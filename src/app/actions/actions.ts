'use server'

import { UserSchema } from '@/schemas/User'
import type { User, CreateUserDto } from '@/types/user.types'
import { userService } from '@/services/user.service'

export interface UserResponse {
  message: string
  errors?: Record<string, unknown>
}

export async function saveUser(user: User): Promise<UserResponse> {
  const parsed = UserSchema.safeParse(user)

  if (!parsed.success) {
    return {
      message: 'Submission Failed',
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    await userService.updateUser(user.id, {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return {
      message: 'Submission Failed',
      errors: { server: ['Failed to update user'] },
    }
  }

  return { message: 'User Updated! 🎉' }
}

export async function createUser(userData: CreateUserDto): Promise<UserResponse> {
  const parsed = UserSchema.omit({ id: true }).safeParse(userData)

  if (!parsed.success) {
    return {
      message: 'Submission Failed',
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    await userService.createUser(userData)
  } catch (error) {
    console.error('Error creating user:', error)
    return {
      message: 'Submission Failed',
      errors: { server: ['Failed to create user'] },
    }
  }

  return { message: 'User Created! 🎉' }
}
