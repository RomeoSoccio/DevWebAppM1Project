import { useState } from 'react'
import type { CreateClientModel } from '../ClientModel'
import { Button, Input, Modal, Space, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface CreateClientModalProps {
  onCreate: (client: CreateClientModel) => void
}

export function CreateClientModal({ onCreate }: CreateClientModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')

  const onClose = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhotoUrl('')
    setIsOpen(false)
  }

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Create Client
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          onCreate({
            firstName,
            lastName,
            email,
            photoUrl,
          })
          onClose()
        }}
      >
        <Typography.Title level={4}>Create a new client</Typography.Title>
        <Space
          direction="vertical"
          style={{ width: '100%', marginBottom: '.3rem' }}
        >
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </Space>
        <Space
          direction="vertical"
          style={{ width: '100%', marginBottom: '.3rem' }}
        >
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Space>
        <Space
          direction="vertical"
          style={{ width: '100%', marginBottom: '.3rem' }}
        >
          <Input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Space>
        <Space
          direction="vertical"
          style={{ width: '100%', marginBottom: '.3rem' }}
        >
          <Input
            type="url"
            placeholder="Profile Picture URL (optional)"
            value={photoUrl}
            onChange={e => setPhotoUrl(e.target.value)}
          />
        </Space>
      </Modal>
    </>
  )
}
