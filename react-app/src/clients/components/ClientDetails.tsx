import { Skeleton, Space, Typography, Image } from 'antd'
import { useClientDetailsProvider } from '../providers/useClientDetailsProvider'
import { useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as clientRoute } from '../../routes/clients'

interface ClientDetailsProps {
  id: string
}

export const ClientDetails = ({ id }: ClientDetailsProps) => {
  const { isLoading, client, loadClient } = useClientDetailsProvider(id)

  useEffect(() => {
    loadClient()
  }, [id, loadClient])

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
      <Link to={clientRoute.to}>
        <ArrowLeftOutlined />
      </Link>

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
      <Typography.Title level={1}>
        {client?.firstName} {client?.lastName}
      </Typography.Title>
      <Typography.Title level={3}>Email : {client?.email}</Typography.Title>
    </Space>
  )
}
