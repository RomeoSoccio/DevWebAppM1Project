import { Skeleton, Space, Typography } from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as booksRoute } from '../../routes/books'
import { useBookBuyersProvider } from '../providers/useBookBuyersProviders'

interface BookDetailsProps {
  id: string
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { isLoading, book, loadBook } = useBookDetailsProvider(id)
  const {
    isLoading: buyersLoading,
    buyers,
    loadBuyers,
  } = useBookBuyersProvider(id)
  useEffect(() => {
    loadBook()
    loadBuyers()
  }, [id])

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
      <Link to={booksRoute.to}>
        <ArrowLeftOutlined />
      </Link>
      <Typography.Title level={1}>{book?.title}</Typography.Title>
      <Typography.Title level={3}>{book?.yearPublished}</Typography.Title>
      <Typography.Text>
        Auteur : {book?.author.firstName} {book?.author.lastName}
      </Typography.Text>
      <Typography.Text>
        Photo : <img src={book?.photoURL} alt="" />
      </Typography.Text>
      <>
        <Typography.Title level={4}>
          Clients ayant acheté ce livre
        </Typography.Title>
        {buyersLoading ? (
          <Skeleton active />
        ) : (
          <ul>
            {buyers.map(buyer => (
              <li key={buyer.id}>
                <Typography.Text>
                  {buyer.firstName} {buyer.lastName} ({buyer.email})
                </Typography.Text>
              </li>
            ))}
          </ul>
        )}
      </>
    </Space>
  )
}
