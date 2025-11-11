import type { ClientModel } from '../ClientModel'
import { Button, Col, Row, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { DeleteClientModal } from './DeleteClientModal'

interface ClientListItemProps {
  client: ClientModel
  onDelete: (id: string) => void
}

export function ClientListItem({ client, onDelete }: ClientListItemProps) {
  const [orderCount, setOrderCount] = useState<number | null>(null)

  useEffect(() => {
    let mounted = true
    // fetch only one sale but rely on the API returning totalCount
    fetch(`http://localhost:3000/sales?clientId=${client.id}&limit=1`)
      .then(r => r.json())
      .then(data => {
        if (!mounted) return
        const count = data.totalCount
        setOrderCount(typeof count === 'number' ? count : 0)
      })
      .catch(() => {
        if (mounted) setOrderCount(0)
      })

    return () => {
      mounted = false
    }
  }, [client.id])

  const orderLabel =
    orderCount !== null
      ? `${orderCount} command${orderCount > 1 ? 's' : ''}`
      : 'Loading...'
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

      <Col span={8} style={{ margin: 'auto 0' }}>
        <div>
          <Typography.Text type="secondary">{orderLabel}</Typography.Text>
        </div>
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
