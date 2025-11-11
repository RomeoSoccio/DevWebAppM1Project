import { useState, useCallback } from 'react'
import type { AuthorModel, UpdateAuthorModel } from '../authorModel'
import type { BookModel } from '../../books/BookModel'
import axios from 'axios'

export const useAuthorDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [author, setAuthor] = useState<AuthorModel | null>(null)

  const loadAuthor = useCallback(async () => {
    setIsLoading(true)
    try {
      // Use dedicated endpoint to fetch a single author by id
      const [authorRes, booksRes] = await Promise.all([
        axios.get(`http://localhost:3000/authors/${id}`),
        axios.get('http://localhost:3000/books'),
      ])

      const found: AuthorModel | null = authorRes.data ?? null
      const books: Array<BookModel & { authorId?: string }> =
        booksRes.data?.data ?? []

      if (found) {
        const count = books.filter(
          b => (b.author?.id ?? b.authorId) === id,
        ).length
        setAuthor({ ...found, booksCount: count })
      } else {
        setAuthor(null)
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

  return { isLoading, author, loadAuthor, updateAuthor, deleteAuthor }
}
