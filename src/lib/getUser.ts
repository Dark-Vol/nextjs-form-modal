import { userService } from '@/services/user.service'

export async function getUser(id: number | string) {
  return userService.getUserById(id)
}
