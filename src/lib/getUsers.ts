import { userService } from '@/services/user.service'

export async function getUsers() {
  return userService.getAllUsers()
}
