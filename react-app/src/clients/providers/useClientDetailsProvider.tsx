import { useState, useCallback } from 'react'
import type { ClientModel } from '../ClientModel'

export const useClientDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [client, setClient] = useState<ClientModel | null>(null)

  const loadClient = useCallback(() => {
    setIsLoading(true)
    fetch(`http://localhost:3000/clients/${id}`)
      .then(response => response.json())
      .then(data => setClient(data))
      .finally(() => setIsLoading(false))
  }, [id])

  return { isLoading, client, loadClient }
}
