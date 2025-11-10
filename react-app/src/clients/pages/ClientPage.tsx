import { Outlet } from '@tanstack/react-router'
import { ClientList } from '../components/ClientList'

export function ClientPage() {
  return (
    <div>
      <ClientList />
      <Outlet />
    </div>
  )
}
