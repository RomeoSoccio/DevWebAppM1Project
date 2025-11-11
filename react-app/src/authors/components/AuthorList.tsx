import { useEffect } from 'react'
import { useAuthorProvider } from '../providers/useAuthorProvider'
import { AuthorListItem } from './AuthorListItem'
import { CreateAuthorModal } from './CreateAuthorModal'

export function AuthorList() {
  const { authors, loadAuthors, deleteAuthor, createAuthor } =
    useAuthorProvider()

  useEffect(() => {
    loadAuthors()
  }, [loadAuthors])

  return (
    <>
      <CreateAuthorModal onCreate={createAuthor} />
      <div style={{ padding: '0 1rem' }}>
        {authors.map(current => (
          <AuthorListItem
            key={current.id}
            author={current}
            onDelete={deleteAuthor}
          />
        ))}
      </div>
    </>
  )
}
