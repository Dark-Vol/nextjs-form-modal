'use client'

import { useRouter } from 'next/navigation'
import { TableCell, TableRow } from '@/components/ui/table'
import type { User } from '@/types/user.types'
import styles from './UserRow.module.scss'

interface Props {
  user: User
}

export default function UserRow({ user }: Props) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/users/${user.id}`)
  }

  return (
    <TableRow onClick={handleClick} className={styles.row}>
      <TableCell className={styles.cell}>{user.email}</TableCell>
      <TableCell className={styles.cell}>{user.firstname}</TableCell>
      <TableCell className={styles.cell}>{user.lastname}</TableCell>
    </TableRow>
  )
}