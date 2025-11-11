import type { ClientModel } from '../ClientModel'
import { Button, Col, Row } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { DeleteClientModal } from './DeleteClientModal'

interface ClientListItemProps {
  client: ClientModel
  onDelete: (id: string) => void
}

export function ClientListItem({ client, onDelete }: ClientListItemProps) {
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
          to={`/clients/${client.id}` as string}
          style={{ margin: 'auto 0', textAlign: 'left' }}
        >
          <span style={{ fontWeight: 'bold' }}>
            {client.firstName} {client.lastName}
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
        <Link to={`/clients/${client.id}` as string}>
          <Button type="primary" icon={<EditOutlined />} />
        </Link>

        <DeleteClientModal
          clientId={client.id}
          clientName={`${client.firstName} ${client.lastName}`}
          onDelete={onDelete}
        />
      </Col>
    </Row>
  )
}
