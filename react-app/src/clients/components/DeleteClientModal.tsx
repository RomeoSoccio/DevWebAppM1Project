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
      ></Button>

      <Modal
        open={isOpen}
        okButtonProps={{ danger: true }}
        onCancel={onClose}
        onOk={handleConfirm}
        okText="Delete"
        cancelText="Cancel"
        title="Confirm Deletion"
      >
        <p>Do you really want to delete {clientName ?? 'this client'} ?</p>
      </Modal>
    </>
  )
}
