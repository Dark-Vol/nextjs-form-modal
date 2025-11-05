'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import UserRow from './UserRow'
import UserFilter from '@/components/UserFilter'
import type { User } from '@/types/user.types'
import styles from './UsersClient.module.scss'

interface Props {
  users: User[]
}

function UsersList({ users }: Props) {
  const searchParams = useSearchParams()
  const emailFilter = searchParams.get('email') || ''
  const firstnameFilter = searchParams.get('firstname') || ''
  const lastnameFilter = searchParams.get('lastname') || ''

  const filteredUsers = users.filter((user) => {
    const matchesEmail =
      !emailFilter ||
      user.email.toLowerCase().includes(emailFilter.toLowerCase())
    const matchesFirstname =
      !firstnameFilter ||
      user.firstname.toLowerCase().includes(firstnameFilter.toLowerCase())
    const matchesLastname =
      !lastnameFilter ||
      user.lastname.toLowerCase().includes(lastnameFilter.toLowerCase())

    return matchesEmail && matchesFirstname && matchesLastname
  })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Users List</h1>
        <Link href="/users/add">
          <Button className={styles.addButton}>Add New User</Button>
        </Link>
      </div>

      <div className={styles.filtersContainer}>
        <Suspense fallback={<div>Loading filters...</div>}>
          <UserFilter />
        </Suspense>
      </div>

      <div className={styles.tableWrapper}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>First</TableHead>
              <TableHead>Last</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <td colSpan={3} className={styles.emptyState}>
                  No users found
                </td>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <UserRow key={user.id} user={user} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default function UsersClient({ users }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UsersList users={users} />
    </Suspense>
  )
}

