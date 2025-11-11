import { useState } from 'react'
import { Button, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

interface DeleteAuthorModalProps {
  authorId: string
  authorName?: string
  onDelete: (id: string) => void
}

export function DeleteAuthorModal({
  authorId,
  authorName,
  onDelete,
}: DeleteAuthorModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)

  const handleConfirm = () => {
    onDelete(authorId)
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
        <p>Voulez-vous vraiment supprimer {authorName ?? 'cet auteur'} ?</p>
      </Modal>
    </>
  )
}
