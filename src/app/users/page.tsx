import { getUsers } from '@/lib/getUsers'
import UsersClient from './UsersClient'

export default async function Users() {
  const usersData = await getUsers()

  return <UsersClient users={usersData} />
}