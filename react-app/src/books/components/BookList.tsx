import { useEffect } from 'react'
import { useBookProvider } from '../providers/useBookProvider'
import { BookListItem } from './BookListItem'
import { CreateBookModal } from './CreateBookModal'
import { Breadcrumb } from 'antd'
import { Link } from '@tanstack/react-router'

export function BookList() {
  const { books, loadBooks, deleteBook, updateBook, createBook } =
    useBookProvider()

  useEffect(() => {
    loadBooks()
  }, [])

  return (
    <>
      <Breadcrumb items={[{ title: <Link to="/books">Books</Link> }]} />
      <CreateBookModal onCreate={createBook} />
      <div style={{ padding: '0 .5rem' }}>
        {books.map(book => (
          <BookListItem
            key={book.id}
            book={book}
            onDelete={deleteBook}
            onUpdate={updateBook}
          />
        ))}
      </div>
    </>
  )
}
