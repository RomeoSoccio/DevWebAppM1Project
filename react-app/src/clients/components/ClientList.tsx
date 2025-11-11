import { useEffect } from 'react'
import { useClientProvider } from '../providers/useClientProvider'
import { ClientListItem } from './ClientListItem'
import { CreateClientModal } from './CreateClientModal'

export function ClientList() {
  const { client, loadClient, deleteClient, createClient } = useClientProvider()

  useEffect(() => {
    loadClient()
  }, [loadClient])

  return (
    <>
      <CreateClientModal onCreate={createClient} />
      <div style={{ padding: '0 1rem' }}>
        {client.map(current_client => (
          <ClientListItem
            key={current_client.id}
            client={current_client}
            onDelete={deleteClient}
          />
        ))}
      </div>
    </>
  )
}
