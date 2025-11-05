export interface User {
  id: number
  firstname: string
  lastname: string
  email: string
}

export interface CreateUserDto {
  firstname: string
  lastname: string
  email: string
}

export interface UpdateUserDto {
  firstname?: string
  lastname?: string
  email?: string
}

export interface UserFormData extends CreateUserDto {}

export interface UserResponse {
  message: string
  errors?: Record<string, unknown>
}



