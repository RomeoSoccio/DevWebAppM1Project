import { useState } from 'react'
import type { CreateClientModel } from '../ClientModel'
import { Button, Input, Modal, Typography, Form } from 'antd'
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
  const [form] = Form.useForm()

  const onClose = () => {
    form.resetFields()
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
        onCancel={() => {
          form.resetFields()
          onClose()
        }}
        onOk={async () => {
          try {
            const values = await form.validateFields()
            onCreate({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              photoUrl: values.photoUrl,
            })
            form.resetFields()
            onClose()
          } catch {
            // validation errors; don't close
          }
        }}
      >
        <Typography.Title level={4}>Create a new client</Typography.Title>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ firstName, lastName, email, photoUrl }}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'First name is required' }]}
          >
            <Input
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Last name is required' }]}
          >
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="email" label="Email (optional)">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="photoUrl" label="Photo URL (optional)">
            <Input
              type="url"
              placeholder="URL"
              value={photoUrl}
              onChange={e => setPhotoUrl(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
