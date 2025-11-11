import { Skeleton, Space, Typography, Image, Button, Form, Input } from 'antd'
import { useAuthorDetailsProvider } from '../providers/useAuthorDetailsProvider'
import { useEffect, useState } from 'react'
import {
  ArrowLeftOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from '@tanstack/react-router'
import { Route as authorRoute } from '../../routes/authors'
import { DeleteAuthorModal } from './DeleteAuthorModal'

interface AuthorDetailsProps {
  id: string
}

export const AuthorDetails = ({ id }: AuthorDetailsProps) => {
  const {
    isLoading,
    author,
    booksByAuthor,
    averageSalesPerBook,
    loadAuthor,
    updateAuthor,
    deleteAuthor,
  } = useAuthorDetailsProvider(id)
  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  useEffect(() => {
    loadAuthor()
  }, [id, loadAuthor])

  useEffect(() => {
    if (author) {
      form.setFieldsValue({
        firstName: author.firstName,
        lastName: author.lastName,
        photoURL: author.photoURL,
      })
    }
  }, [author, form])

  if (isLoading) {
    return <Skeleton active />
  }

  const onSave = async () => {
    try {
      const values = await form.validateFields()
      await updateAuthor({
        firstName: values.firstName,
        lastName: values.lastName,
        photoURL: values.photoURL,
      })
      setIsEditing(false)
      // reload handled by provider
    } catch {
      // validation or update error
    }
  }

  const handleDeleteConfirmed = async () => {
    try {
      await deleteAuthor()
      // after deletion, go back to authors list
      navigate({ to: authorRoute.to })
    } catch {
      // handle delete error
    }
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
      <Link to={authorRoute.to}>
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

        <DeleteAuthorModal
          authorId={author?.id ?? ''}
          authorName={`${author?.firstName ?? ''} ${author?.lastName ?? ''}`}
          onDelete={() => {
            void handleDeleteConfirmed()
          }}
        />
      </div>
      {author?.photoURL ? (
        <Image
          src={author.photoURL}
          alt={`${author?.firstName ?? ''} ${author?.lastName ?? ''}`.trim()}
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
          <Typography.Title level={1} style={{ margin: 0, color: '#fff' }}>
            {author?.firstName} {author?.lastName}
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
        <>
          <Typography.Title level={3} style={{ color: '#fff' }}>
            Books : {author?.booksCount ?? 0}
          </Typography.Title>

          <div style={{ color: '#fff', marginBottom: '.5rem' }}>
            Average book sell :{' '}
            {averageSalesPerBook === null
              ? '—'
              : Math.round(averageSalesPerBook * 100) / 100}
          </div>

          <div style={{ color: '#fff' }}>
            {booksByAuthor.length === 0 ? (
              <div>Aucun livre trouvé pour cet auteur.</div>
            ) : (
              <ul style={{ paddingLeft: 16 }}>
                {booksByAuthor.map(b => (
                  <li key={b.id} style={{ margin: '0.25rem 0' }}>
                    <Link to={`/books/${b.id}` as string}>
                      <Typography.Text style={{ color: '#fff' }}>
                        {b.title} ({b.yearPublished})
                      </Typography.Text>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
      {isEditing && (
        <Form form={form} layout="vertical">
          <Form.Item name="photoURL" label="Photo URL">
            <Input />
          </Form.Item>
        </Form>
      )}
    </Space>
  )
}
