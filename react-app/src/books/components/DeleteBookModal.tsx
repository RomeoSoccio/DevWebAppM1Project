import { useState } from 'react'
import { Button, Modal, Space } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import type { BookModel } from '../BookModel'

interface DeleteBookModalProps {
  book: BookModel
  onDelete: (id: string) => void
}

export function DeleteBookModal({ book, onDelete }: DeleteBookModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        icon={<DeleteOutlined />}
        type="primary"
        danger
        onClick={() => setIsOpen(true)}
      >
        Supprimer
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          onDelete(book.id)
          onClose()
        }}
        okButtonProps={{ danger: true }}
        title="Supprimer le livre"
        okText="Supprimer"
        cancelText="Annuler"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <p>Voulez-vous vraiment supprimer &quot;{book.title}&quot; ?</p>
        </Space>
      </Modal>
    </>
  )
}
