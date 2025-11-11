import { createFileRoute } from '@tanstack/react-router'
import { AuthorPage } from '../../authors/pages/AuthorPage'

export const Route = createFileRoute('/authors/')({
  component: AuthorPage,
})
