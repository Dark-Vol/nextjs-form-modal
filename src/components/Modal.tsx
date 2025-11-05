'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogOverlay, DialogContent } from '@/components/ui/dialog'
import { AlertConfirmation } from './AlertConfirmation'

interface ModalProps {
  children: React.ReactNode
}

export function Modal({ children }: ModalProps) {
  const [showExitConfirmation, setShowExitConfirmation] = useState(false)
  const router = useRouter()

  const closeModal = () => {
    router.back()
  }

  const handleOpenChange = () => {
    const isUserFormModified = localStorage.getItem('userFormModified')
    if (isUserFormModified && JSON.parse(isUserFormModified)) {
      setShowExitConfirmation(true)
    } else {
      router.back()
    }
  }

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogContent className="overflow-y-hidden">
          <AlertConfirmation
            open={showExitConfirmation}
            setOpen={setShowExitConfirmation}
            confirmationAction={closeModal}
            message="You haven't saved your changes. Please confirm you want to exit without saving."
          />
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}