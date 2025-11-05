import UserForm from '@/app/users/edit/[id]/UserForm'
import { getUser } from '@/lib/getUser'
import { Modal } from '@/components/Modal'
import styles from './page.module.scss'

interface Props {
  params: {
    id: string
  }
}

export default async function EditUser({ params }: Props) {
  const { id } = params

  const user = await getUser(id)

  if (!user?.id) {
    return (
      <Modal>
        <div className={styles.emptyState}>
          <h1 className={styles.emptyTitle}>No User Found for that ID.</h1>
        </div>
      </Modal>
    )
  }

  return (
    <Modal>
      <div className={styles.container}>
        <h1 className={styles.title}>Edit User {id}</h1>
        <UserForm user={user} />
      </div>
    </Modal>
  )
}