import { useState } from 'react'
import type { ClientModel, UpdateClientModel } from '../ClientModel'
import { Button, Col, Row } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

interface ClientListItemProps {
  client: ClientModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateClientModel) => void
}

export function ClientListItem({
  client,
  onDelete,
  onUpdate,
}: ClientListItemProps) {
  const [firstName, setFirstName] = useState(client.firstName)
  const [lastName, setLastName] = useState(client.lastName)
  const [isEditing, setIsEditing] = useState(false)

  const onCancelEdit = () => {
    setIsEditing(false)
    setFirstName(client.firstName)
    setLastName(client.lastName)
  }

  const onValidateEdit = () => {
    onUpdate(client.id, { firstName, lastName })
    setIsEditing(false)
  }

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
          <input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        ) : (
          <Link
            to={`/clients/${client.id}` as any}
            style={{
              margin: 'auto 0',
              textAlign: 'left',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>
              {client.firstName} {client.lastName}
            </span>
          </Link>
        )}
      </Col>
      <Col span={12} style={{ margin: 'auto 0' }}>
        {isEditing ? (
          <input value={lastName} onChange={e => setLastName(e.target.value)} />
        ) : null}
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
        <Button type="primary" danger onClick={() => onDelete(client.id)}>
          <DeleteOutlined />
        </Button>
      </Col>
    </Row>
  )
}
