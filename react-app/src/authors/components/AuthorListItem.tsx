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
        <Link
          to={`/authors/${author.id}` as string}
          style={{ margin: 'auto 0', textAlign: 'left' }}
        >
          <span style={{ fontWeight: 'bold' }}>
            {author.firstName} {author.lastName}
          </span>
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
