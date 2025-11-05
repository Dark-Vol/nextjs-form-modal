interface UsersLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function UsersLayout({ children, modal }: UsersLayoutProps) {
  return (
    <>
      {modal}
      {children}
    </>
  )
}
