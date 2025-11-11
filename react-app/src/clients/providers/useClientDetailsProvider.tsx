import { useState, useCallback } from 'react'
import type { ClientModel, UpdateClientModel } from '../ClientModel'
import axios from 'axios'

export const useClientDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [client, setClient] = useState<ClientModel | null>(null)

  const loadClient = useCallback(() => {
    setIsLoading(true)
    axios
      .get(`http://localhost:3000/clients/${id}`)
      .then(res => setClient(res.data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false))
  }, [id])

  const updateClient = useCallback(
    (input: UpdateClientModel) => {
      return axios
        .patch(`http://localhost:3000/clients/${id}`, input)
        .then(() => loadClient())
        .catch(err => {
          console.error(err)
          throw err
        })
    },
    [id, loadClient],
  )

  const deleteClient = useCallback(() => {
    return axios
      .delete(`http://localhost:3000/clients/${id}`)
      .then(() => setClient(null))
      .catch(err => {
        console.error(err)
        throw err
      })
  }, [id])

  return { isLoading, client, loadClient, updateClient, deleteClient }
}
