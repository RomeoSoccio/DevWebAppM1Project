import { useState } from 'react'
import { Button, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

interface DeleteClientModalProps {
  clientId: string
  clientName?: string
  onDelete: (id: string) => void
}

export function DeleteClientModal({
  clientId,
  clientName,
  onDelete,
}: DeleteClientModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)

  const handleConfirm = () => {
    onDelete(clientId)
    onClose()
  }

  return (
    <>
      <Button
        type="primary"
        danger
        icon={<DeleteOutlined />}
        onClick={() => setIsOpen(true)}
      >
        Supprimer
      </Button>

      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={handleConfirm}
        okText="Supprimer"
        cancelText="Annuler"
        title="Confirmer la suppression"
      >
        <p>Voulez-vous vraiment supprimer {clientName ?? 'ce client'} ?</p>
      </Modal>
    </>
  )
}
