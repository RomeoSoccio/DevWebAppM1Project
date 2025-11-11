import { useEffect, useState } from 'react'
import { Button, Skeleton, Space, Typography, Select, Breadcrumb } from 'antd'
import {
  ArrowLeftOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as booksRoute } from '../../routes/books'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useBookBuyersProvider } from '../providers/useBookBuyersProviders'
import { useBookProvider } from '../providers/useBookProvider'
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders'
import { BuyBookModal } from './BuyBookModal'

interface BookDetailsProps {
  id: string
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { isLoading, book, loadBook } = useBookDetailsProvider(id)
  const { updateBook } = useBookProvider()
  const { authors, loadAuthors } = useBookAuthorsProviders()
  const [title, setTitle] = useState('')
  const [yearPublished, setYearPublished] = useState<number>(2024)
  const [photoURL, setPhotoURL] = useState('')
  const [authorId, setAuthorId] = useState<string | undefined>(undefined)
  const [isEditing, setIsEditing] = useState(false)

  const {
    isLoading: buyersLoading,
    buyers,
    loadBuyers,
  } = useBookBuyersProvider(id)

  useEffect(() => {
    loadBook()
    loadBuyers()
    if (isEditing) loadAuthors()
    // eslint-disable-next-line
  }, [id])

  useEffect(() => {
    if (book) {
      setTitle(book.title)
      setYearPublished(book.yearPublished)
      setPhotoURL(book.photoURL)
      setAuthorId(book.author.id)
    }
  }, [book, isEditing])

  const onCancelEdit = () => {
    setIsEditing(false)
    if (book) {
      setTitle(book.title)
      setYearPublished(book.yearPublished)
      setPhotoURL(book.photoURL)
      setAuthorId(book.author.id)
    }
  }
  const onValidateEdit = async () => {
    if (!book) return
    await updateBook(book.id, {
      title,
      yearPublished,
      photoURL,
      authorId,
    })
    setIsEditing(false)
    await loadBook()
  }

  if (isLoading || !book) {
    return <Skeleton active />
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
      <Breadcrumb
        items={[
          { title: <Link to="/books">Books</Link> },
          { title: book?.title || '...' },
        ]}
      />
      <Link to={booksRoute.to}>
        <ArrowLeftOutlined />
      </Link>
      <div
        style={{
          width: '100%',
          padding: '1.5rem 0 .5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        {isEditing ? (
          <>
            <input
              style={{ width: 200 }}
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Titre"
            />
            <input
              type="number"
              value={yearPublished}
              onChange={e => setYearPublished(Number(e.target.value))}
              placeholder="Année"
              style={{ width: 80 }}
            />
            <Select
              style={{ width: 200 }}
              value={authorId}
              options={authors.map(a => ({
                value: a.id,
                label: a.firstName + ' ' + a.lastName,
              }))}
              onChange={setAuthorId}
              placeholder="Auteur"
            />
            <input
              value={photoURL}
              onChange={e => setPhotoURL(e.target.value)}
              placeholder="Photo URL"
              style={{ width: 220 }}
            />
            <Button type="primary" onClick={onValidateEdit}>
              <CheckOutlined />
            </Button>
            <Button onClick={onCancelEdit}>
              <CloseOutlined />
            </Button>
          </>
        ) : (
          <>
            <Typography.Title level={1} style={{ display: 'inline' }}>
              {book.title}
            </Typography.Title>
            <Typography.Text style={{ marginLeft: 8, fontSize: 24 }}>
              {book.yearPublished}
            </Typography.Text>
            <Typography.Text strong style={{ marginLeft: 12 }}>
              {book.author.firstName} {book.author.lastName}
            </Typography.Text>
            <img
              src={book.photoURL}
              alt="couverture"
              style={{
                height: 56,
                marginLeft: 15,
                objectFit: 'cover',
                borderRadius: 4,
                verticalAlign: 'middle',
              }}
            />
            <Button
              type="primary"
              style={{ marginLeft: 32 }}
              onClick={() => setIsEditing(true)}
            >
              <EditOutlined />
            </Button>
          </>
        )}
      </div>

      <Typography.Title level={4}>
        Clients who bought this book
      </Typography.Title>
      {buyersLoading ? (
        <Skeleton active />
      ) : (
        <ul>
          {buyers.map(buyer => (
            <li key={buyer.id}>
              <Typography.Text>
                {buyer.firstName} {buyer.lastName}
                {buyer.email ? ` (${buyer.email})` : ''}
              </Typography.Text>
            </li>
          ))}
        </ul>
      )}
      <BuyBookModal book={book} onBuy={loadBuyers} />
    </Space>
  )
}
