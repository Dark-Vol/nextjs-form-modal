import AddUserForm from '@/components/AddUserForm'
import styles from './page.module.scss'

export default function AddUser() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New User</h1>
      <AddUserForm />
    </div>
  )
}

