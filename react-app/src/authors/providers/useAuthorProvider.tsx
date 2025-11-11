import { useState } from 'react'
import type {
  AuthorModel,
  CreateAuthorModel,
  UpdateAuthorModel,
} from '../authorModel'
import axios from 'axios'

export const useAuthorProvider = () => {
  const [authors, setAuthors] = useState<AuthorModel[]>([])

  const loadAuthors = async () => {
    try {
      // fetch authors and books in parallel to compute books count per author
      const [authorsRes, booksRes] = await Promise.all([
        axios.get('http://localhost:3000/authors'),
        axios.get('http://localhost:3000/books'),
      ])

      const authorsData: AuthorModel[] = authorsRes.data ?? []
      const booksData = booksRes.data?.data ?? []

      const counts: Record<string, number> = {}
      for (const b of booksData) {
        const aid = b.author?.id || b.authorId
        if (!aid) continue
        counts[aid] = (counts[aid] || 0) + 1
      }

      const merged = authorsData.map(a => ({
        ...a,
        booksCount: counts[a.id] ?? 0,
      }))
      setAuthors(merged)
    } catch (err) {
      console.error(err)
    }
  }

  const createAuthor = async (author: CreateAuthorModel) => {
    try {
      await axios.post('http://localhost:3000/authors', author)
      await loadAuthors()
    } catch (err) {
      console.error(err)
    }
  }

  const updateAuthor = async (id: string, input: UpdateAuthorModel) => {
    try {
      await axios.patch(`http://localhost:3000/authors/${id}`, input)
      await loadAuthors()
    } catch (err) {
      console.error(err)
    }
  }

  const deleteAuthor = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/authors/${id}`)
      await loadAuthors()
    } catch (err) {
      // note: backend may not implement DELETE for authors yet
      console.error(err)
    }
  }

  return { authors, loadAuthors, createAuthor, updateAuthor, deleteAuthor }
}
