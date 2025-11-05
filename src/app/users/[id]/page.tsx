import Link from 'next/link'
import { getUser } from '@/lib/getUser'
import { Button } from '@/components/ui/button'
import styles from './UserPage.module.scss'

interface Props {
  params: {
    id: string
  }
}

export default async function UserPage({ params }: Props) {
  const { id } = params

  try {
    const user = await getUser(id)

    return (
      <div className={styles.container}>
        <div className={styles.backButton}>
          <Link href="/users">
            <Button variant="outline">← Back to Users</Button>
          </Link>
        </div>

        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>User Details</h1>
            <Link href={`/users/edit/${user.id}`}>
              <Button className={styles.editButton}>Edit User</Button>
            </Link>
          </div>

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <label className={styles.label}>ID</label>
              <p className={styles.value}>{user.id}</p>
            </div>

            <div className={styles.detailItem}>
              <label className={styles.label}>Email</label>
              <p className={styles.value}>{user.email}</p>
            </div>

            <div className={styles.detailItem}>
              <label className={styles.label}>First Name</label>
              <p className={styles.value}>{user.firstname}</p>
            </div>

            <div className={styles.detailItem}>
              <label className={styles.label}>Last Name</label>
              <p className={styles.value}>{user.lastname}</p>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className={styles.container}>
        <div className={styles.backButton}>
          <Link href="/users">
            <Button variant="outline">← Back to Users</Button>
          </Link>
        </div>

        <div className={styles.emptyState}>
          <h1 className={styles.emptyTitle}>User Not Found</h1>
          <p className={styles.emptyText}>
            The user with ID {id} does not exist.
          </p>
          <Link href="/users">
            <Button>Go to Users List</Button>
          </Link>
        </div>
      </div>
    )
  }
}

