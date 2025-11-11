import { useState, useCallback } from 'react'
import type { SaleModel } from '../../sales/SaleModel'

export const useClientSalesProvider = (clientId: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [sales, setSales] = useState<SaleModel[]>([])

  const loadSales = useCallback(() => {
    // avoid calling when clientId is empty/undefined
    if (!clientId) {
      setSales([])
      return
    }

    setIsLoading(true)
    fetch(`http://localhost:3000/sales?clientId=${clientId}&limit=100`)
      .then(response => response.json())
      .then((data: { data: SaleModel[] }) => {
        const sales = data.data.map(sale => sale)
        setSales(sales)
      })
      .catch(() => {
        // on error, clear lists
        setSales([])
      })
      .finally(() => setIsLoading(false))
  }, [clientId])

  return { isLoading, sales, loadSales }
}
