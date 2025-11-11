import { Skeleton, Space, Typography, Image, Button, Form, Input } from 'antd'
import { useClientDetailsProvider } from '../providers/useClientDetailsProvider'
import { useEffect, useState } from 'react'
import {
  ArrowLeftOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from '@tanstack/react-router'
import { Route as clientRoute } from '../../routes/clients'
import { DeleteClientModal } from './DeleteClientModal'
import { useClientBooksProvider } from '../../clients/providers/useClientBooksProvider'

interface ClientDetailsProps {
  id: string
}

export const ClientDetails = ({ id }: ClientDetailsProps) => {
  const { isLoading, client, loadClient, updateClient, deleteClient } =
    useClientDetailsProvider(id)
  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const {
    isLoading: booksLoading,
    books,
    loadBooks,
  } = useClientBooksProvider(id)

  useEffect(() => {
    loadClient()
    loadBooks()
  }, [id, loadClient, loadBooks])

  useEffect(() => {
    if (client) {
      form.setFieldsValue({
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        photoUrl: client.photoUrl,
      })
    }
  }, [client, form])

  if (isLoading) {
    return <Skeleton active />
  }

  const onSave = async () => {
    try {
      const values = await form.validateFields()
      await updateClient({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        photoUrl: values.photoUrl,
      })
      setIsEditing(false)
      // reload handled by provider
    } catch {
      // validation or update error
    }
  }

  const handleDeleteConfirmed = async () => {
    try {
      await deleteClient()
      // after deletion, go back to clients list
      navigate({ to: clientRoute.to })
    } catch {
      // handle delete error
    }
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
      <Link to={clientRoute.to}>
        <ArrowLeftOutlined />
      </Link>
      <div
        style={{
          marginLeft: 'auto',
          display: 'flex',
          justifyContent: 'end',
          gap: '.5rem',
        }}
      >
        {isEditing ? (
          <>
            <Button type="primary" onClick={onSave} icon={<CheckOutlined />} />
            <Button
              onClick={() => setIsEditing(false)}
              icon={<CloseOutlined />}
            />
          </>
        ) : (
          <Button
            type="primary"
            onClick={() => setIsEditing(true)}
            icon={<EditOutlined />}
          />
        )}

        <DeleteClientModal
          clientId={client?.id ?? ''}
          clientName={`${client?.firstName ?? ''} ${client?.lastName ?? ''}`}
          onDelete={id => {
            void id
            void handleDeleteConfirmed()
          }}
        />
      </div>
      {client?.photoUrl ? (
        <Image
          src={client.photoUrl}
          alt={`${client?.firstName ?? ''} ${client?.lastName ?? ''}`.trim()}
          width={200}
          style={{ borderRadius: 8 }}
        />
      ) : (
        <div
          style={{
            width: 200,
            height: 200,
            background: '#f0f0f0',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#888',
          }}
        >
          Pas de photo
        </div>
      )}

      <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
        {!isEditing ? (
          <Typography.Title level={1} style={{ margin: 0 }}>
            {client?.firstName} {client?.lastName}
          </Typography.Title>
        ) : (
          <Form form={form} layout="inline">
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: 'First name is required' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: 'Last name is required' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        )}
      </div>

      {!isEditing && (
        <Typography.Title level={3}>Email : {client?.email}</Typography.Title>
      )}
      {isEditing && (
        <Form form={form} layout="vertical">
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="photoUrl" label="Photo URL">
            <Input />
          </Form.Item>
        </Form>
      )}
      <Typography.Title level={4}>Books</Typography.Title>
      {booksLoading ? (
        <Skeleton active />
      ) : books && books.length > 0 ? (
        <ul>
          {books.map((book, idx) => (
            <li key={book?.id ?? idx}>
              <Typography.Text>
                {book?.title ?? 'Untitled'}
                {book?.author
                  ? ` (${book.author.firstName ?? ''} ${book.author.lastName ?? ''})`
                  : ''}
              </Typography.Text>
            </li>
          ))}
        </ul>
      ) : (
        <Typography.Text type="secondary">Aucun livre associé</Typography.Text>
      )}
    </Space>
  )
}
