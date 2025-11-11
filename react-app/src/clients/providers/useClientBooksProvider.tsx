import { useState, useCallback } from 'react'
import type { BookModel } from '../../books/BookModel'
import type { SaleModel } from '../../sales/SaleModel'

export const useClientBooksProvider = (clientId: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [books, setBooks] = useState<BookModel[]>([])
  const [sales, setSales] = useState<SaleModel[]>([])

  const loadBooks = useCallback(() => {
    // avoid calling when clientId is empty/undefined
    if (!clientId) {
      setBooks([])
      setSales([])
      return
    }

    setIsLoading(true)
    fetch(`http://localhost:3000/sales?clientId=${clientId}&limit=100`)
      .then(response => response.json())
      .then((data: { data: SaleModel[] }) => {
        const books = data.data.map(sale => sale.book)
        setBooks(books)
        const sales = data.data.map(sale => sale)
        setSales(sales)
      })
      .catch(() => {
        // on error, clear lists
        setBooks([])
        setSales([])
      })
      .finally(() => setIsLoading(false))
  }, [clientId])

  return { isLoading, books, sales, loadBooks }
}
