import { useState } from 'react'
import type { CreateAuthorModel } from '../authorModel'
import { Button, Input, Modal, Typography, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface CreateAuthorModalProps {
  onCreate: (author: CreateAuthorModel) => void
}

export function CreateAuthorModal({ onCreate }: CreateAuthorModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [form] = Form.useForm()

  const onClose = () => {
    form.resetFields()
    setFirstName('')
    setLastName('')
    setPhotoURL('')
    setIsOpen(false)
  }

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Create Author
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
              photoURL: values.photoURL,
            })
            form.resetFields()
            onClose()
          } catch {
            // validation errors; don't close
          }
        }}
      >
        <Typography.Title level={4}>Create a new author</Typography.Title>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ firstName, lastName, photoURL }}
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

          <Form.Item name="photoURL" label="Photo URL (optional)">
            <Input
              type="url"
              placeholder="URL"
              value={photoURL}
              onChange={e => setPhotoURL(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
