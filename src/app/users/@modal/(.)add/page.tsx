import AddUserForm from '@/components/AddUserForm'
import { Modal } from '@/components/Modal'
import styles from './page.module.scss'

export default function AddUserModal() {
  return (
    <Modal>
      <div className={styles.container}>
        <h1 className={styles.title}>Add New User</h1>
        <AddUserForm />
      </div>
    </Modal>
  )
}

