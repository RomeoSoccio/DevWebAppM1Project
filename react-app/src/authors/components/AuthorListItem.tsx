import type { AuthorModel } from '../authorModel'
import { Button, Col, Row } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { DeleteAuthorModal } from './DeleteAuthorModal'

interface AuthorListItemProps {
  author: AuthorModel
  onDelete: (id: string) => void
}

export function AuthorListItem({ author, onDelete }: AuthorListItemProps) {
  return (
    <Row
      style={{
        width: '100%',
        borderRadius: '10px',
        backgroundColor: '#EEEEEE',
        margin: '1rem 0',
        padding: '.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Col span={12} style={{ margin: 'auto 0' }}>
        <Link
          to={`/authors/${author.id}` as string}
          style={{ margin: 'auto 0', textAlign: 'left' }}
        >
          <div>
            <span style={{ fontWeight: 'bold' }}>
              {author.firstName} {author.lastName}
            </span>
          </div>
          <div style={{ fontSize: 12, color: '#666' }}>
            {author.booksCount ?? 0} Books
            {(author.booksCount ?? 0) > 1 ? 's' : ''}
          </div>
        </Link>
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
        <Link to={`/authors/${author.id}` as string}>
          <Button type="primary" icon={<EditOutlined />} />
        </Link>

        <DeleteAuthorModal
          authorId={author.id}
          authorName={`${author.firstName} ${author.lastName}`}
          onDelete={onDelete}
        />
      </Col>
    </Row>
  )
}
