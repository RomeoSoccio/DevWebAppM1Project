import { useState, useCallback } from 'react'
import type { AuthorModel, UpdateAuthorModel } from '../authorModel'
import type { BookModel } from '../../books/BookModel'
import axios from 'axios'

export const useAuthorDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [author, setAuthor] = useState<AuthorModel | null>(null)
  const [booksByAuthor, setBooksByAuthor] = useState<
    Array<BookModel & { authorId?: string }>
  >([])
  const [averageSalesPerBook, setAverageSalesPerBook] = useState<number | null>(
    null,
  )

  const loadAuthor = useCallback(async () => {
    setIsLoading(true)
    try {
      // Use dedicated endpoint to fetch a single author by id
      const [authorRes, booksRes, salesRes] = await Promise.all([
        axios.get(`http://localhost:3000/authors/${id}`),
        axios.get('http://localhost:3000/books'),
        axios.get(`http://localhost:3000/sales/summary/author/${id}`),
      ])

      const found: AuthorModel | null = authorRes.data ?? null
      const books: Array<BookModel & { authorId?: string }> =
        booksRes.data?.data ?? []

      if (found) {
        const matches = books.filter(b => (b.author?.id ?? b.authorId) === id)
        const count = matches.length
        setAuthor({ ...found, booksCount: count })
        setBooksByAuthor(matches)
        const avg = salesRes?.data?.averageSalesPerBook ?? null
        setAverageSalesPerBook(typeof avg === 'number' ? avg : null)
      } else {
        setAuthor(null)
        setBooksByAuthor([])
      }
    } catch (err) {
      console.error(err)
      setAuthor(null)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  const updateAuthor = useCallback(
    (input: UpdateAuthorModel) => {
      return axios
        .patch(`http://localhost:3000/authors/${id}`, input)
        .then(() => loadAuthor())
        .catch(err => {
          console.error(err)
          throw err
        })
    },
    [id, loadAuthor],
  )

  const deleteAuthor = useCallback(() => {
    return axios
      .delete(`http://localhost:3000/authors/${id}`)
      .then(() => setAuthor(null))
      .catch(err => {
        console.error(err)
        throw err
      })
  }, [id])

  return {
    isLoading,
    author,
    booksByAuthor,
    averageSalesPerBook,
    loadAuthor,
    updateAuthor,
    deleteAuthor,
  }
}
