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
      ></Button>

      <Modal
        open={isOpen}
        onCancel={onClose}
        okButtonProps={{ danger: true }}
        onOk={handleConfirm}
        okText="Delete"
        cancelText="Cancel"
        title="Confirm Deletion"
      >
        <p>Do you really want to delete {authorName ?? 'this author'} ?</p>
      </Modal>
    </>
  )
}
