import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { z } from 'zod'
import { UserSchema } from '@/schemas/User'
import type { User, CreateUserDto, UpdateUserDto } from '@/types/user.types'
import { FILE_PATHS } from '@/constants/api.constants'

const USERS_FILE = join(process.cwd(), FILE_PATHS.USERS_DATA)

class UserService {
  private async readUsersFromFile(): Promise<User[]> {
    try {
      const fileContents = await readFile(USERS_FILE, 'utf8')
      const data = JSON.parse(fileContents)
      return z.array(UserSchema).parse(data.users)
    } catch (error) {
      console.error('Error reading users from file:', error)
      throw new Error('Failed to read users')
    }
  }

  private async writeUsersToFile(users: User[]): Promise<void> {
    try {
      await writeFile(USERS_FILE, JSON.stringify({ users }, null, 2), 'utf8')
    } catch (error) {
      console.error('Error writing users to file:', error)
      throw new Error('Failed to save users')
    }
  }

  async getAllUsers(): Promise<User[]> {
    return this.readUsersFromFile()
  }

  async getUserById(id: number | string): Promise<User> {
    const userId = typeof id === 'string' ? parseInt(id, 10) : id
    const users = await this.readUsersFromFile()
    const user = users.find((u) => u.id === userId)

    if (!user) {
      throw new Error('User not found')
    }

    return UserSchema.parse(user)
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const users = await this.readUsersFromFile()

    // Find the next available ID
    const maxId = users.reduce((max, u) => Math.max(max, u.id), 0)
    const newId = maxId + 1

    const newUser: User = {
      id: newId,
      ...userData,
    }

    users.push(newUser)
    await this.writeUsersToFile(users)

    return newUser
  }

  async updateUser(id: number | string, userData: UpdateUserDto): Promise<User> {
    const userId = typeof id === 'string' ? parseInt(id, 10) : id
    const users = await this.readUsersFromFile()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    users[userIndex] = {
      ...users[userIndex],
      ...userData,
    }

    await this.writeUsersToFile(users)

    return users[userIndex]
  }

  async deleteUser(id: number | string): Promise<void> {
    const userId = typeof id === 'string' ? parseInt(id, 10) : id
    const users = await this.readUsersFromFile()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    users.splice(userIndex, 1)
    await this.writeUsersToFile(users)
  }
}

export const userService = new UserService()



