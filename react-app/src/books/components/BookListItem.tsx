import { useState, useEffect } from 'react'
import type { BookModel, UpdateBookModel } from '../BookModel'
import { Button, Col, Row, Typography } from 'antd'
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import { DeleteBookModal } from './DeleteBookModal'
import { Link } from '@tanstack/react-router'

interface BookListItemProps {
  book: BookModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateBookModel) => void
}

export function BookListItem({ book, onDelete, onUpdate }: BookListItemProps) {
  const [title, setTitle] = useState(book.title)
  const [isEditing, setIsEditing] = useState(false)
  const [buyerCount, setBuyerCount] = useState<number | null>(null)

  const onCancelEdit = () => {
    setIsEditing(false)
    setTitle(book.title)
  }

  const onValidateEdit = () => {
    onUpdate(book.id, { title })
    setIsEditing(false)
  }

  useEffect(() => {
    let mounted = true
    fetch(`http://localhost:3000/sales?bookId=${book.id}&limit=1`)
      .then(r => r.json())
      .then(data => {
        if (!mounted) return
        const count = data.totalCount ?? 0
        setBuyerCount(typeof count === 'number' ? count : 0)
      })
      .catch(() => {
        if (mounted) setBuyerCount(0)
      })

    return () => {
      mounted = false
    }
  }, [book.id])

  return (
    <Row
      style={{
        width: '100%',
        height: '50px',
        borderRadius: '10px',
        backgroundColor: '#EEEEEE',
        margin: '1rem 0',
        padding: '.25rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Col span={12} style={{ margin: 'auto 0' }}>
        {isEditing ? (
          <input value={title} onChange={e => setTitle(e.target.value)} />
        ) : (
          <div style={{ margin: 'auto 0', textAlign: 'left', color: '#333' }}>
            <Link
              to={`/books/${book.id}` as string}
              style={{ fontWeight: 'bold' }}
            >
              {book.title}
            </Link>{' '}
            - {book.yearPublished}
            <div style={{ marginTop: 4 }}>
              <Typography.Text type="secondary">
                {buyerCount !== null
                  ? `${buyerCount} acheteur${buyerCount > 1 ? 's' : ''}`
                  : 'Chargement...'}
              </Typography.Text>
            </div>
          </div>
        )}
      </Col>
      <Col span={9} style={{ margin: 'auto 0', color: '#555' }}>
        by <span style={{ fontWeight: 'bold' }}>{book.author.firstName}</span>{' '}
        <span style={{ fontWeight: 'bold' }}>{book.author.lastName}</span>
      </Col>
      <Col
        span={3}
        style={{
          alignItems: 'right',
          display: 'flex',
          gap: '.25rem',
          margin: 'auto 0',
        }}
      >
        {isEditing ? (
          <>
            <Button type="primary" onClick={onValidateEdit}>
              <CheckOutlined />
            </Button>
            <Button onClick={onCancelEdit}>
              <CloseOutlined />
            </Button>
          </>
        ) : (
          <Button type="primary" onClick={() => setIsEditing(true)}>
            <EditOutlined />
          </Button>
        )}
        <DeleteBookModal book={book} onDelete={onDelete} />
      </Col>
    </Row>
  )
}
