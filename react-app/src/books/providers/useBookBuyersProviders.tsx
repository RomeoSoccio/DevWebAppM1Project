import { useState } from 'react'
import type { ClientModel } from '../../clients/ClientModel'
import type { SaleModel } from '../../sales/SaleModel'

export const useBookBuyersProvider = (bookId: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [buyers, setBuyers] = useState<ClientModel[]>([])

  const loadBuyers = () => {
    setIsLoading(true)
    fetch(`http://localhost:3000/sales?bookId=${bookId}&limit=100`)
      .then(response => response.json())
      .then((data: { data: SaleModel[] }) => {
        const clients = data.data.map(sale => sale.client)
        setBuyers(clients)
      })
      .finally(() => setIsLoading(false))
  }

  return { isLoading, buyers, loadBuyers }
}
