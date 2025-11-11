import { Button, Modal, Space } from 'antd'
import type { BookModel } from '../BookModel'
import { CheckCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'

interface BuyBookModalProps {
  book: BookModel
  onBuy: (id: string) => void
}

export function BuyBookModal({ book, onBuy }: BuyBookModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        icon={<CheckCircleOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Acheter
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          onBuy(book.id)
          onClose()
        }}
        title="Acheter le livre"
        okText="Acheter"
        cancelText="Annuler"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <p>Voulez-vous acheter &quot;{book.title}&quot; ?</p>
        </Space>
      </Modal>
    </>
  )
}
