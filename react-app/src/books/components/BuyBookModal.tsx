import { useState, useEffect } from 'react'
import {
  Button,
  Modal,
  Select,
  DatePicker,
  Form,
  Typography,
  message,
} from 'antd'
import type { BookModel } from '../BookModel'
import type { ClientModel } from '../../clients/ClientModel'

interface BuyBookModalProps {
  book: BookModel
  onBuy?: () => void // callback pour rafraîchir la liste d’achats si besoin
}

export function BuyBookModal({ book, onBuy }: BuyBookModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [clients, setClients] = useState<ClientModel[]>([])
  const [clientId, setClientId] = useState<string | undefined>()
  const [date, setDate] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Charger la liste des clients à l’ouverture de la modale
  useEffect(() => {
    if (isOpen) {
      fetch('http://localhost:3000/clients?limit=100')
        .then(res => res.json())
        .then(data => setClients(data.data ?? []))
    }
  }, [isOpen])

  const onClose = () => {
    setIsOpen(false)
    setClientId(undefined)
    setDate(null)
  }

  const onConfirm = async () => {
    if (!clientId || !date) {
      message.error('Veuillez choisir un client et une date')
      return
    }
    setIsLoading(true)
    try {
      const resp = await fetch('http://localhost:3000/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          bookId: book.id,
          date,
        }),
      })
      if (!resp.ok) throw new Error("Erreur lors de l'achat")
      message.success('Achat enregistré !')
      onClose()
      if (onBuy) onBuy()
    } catch (err) {
      message.error("Erreur lors de l'achat" + err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Acheter
      </Button>
      <Modal
        open={isOpen}
        title={`Acheter le livre « ${book.title} »`}
        onCancel={onClose}
        onOk={onConfirm}
        okText="Acheter"
        cancelText="Annuler"
        confirmLoading={isLoading}
        okButtonProps={{ disabled: !clientId || !date }}
      >
        <Form layout="vertical">
          <Form.Item label="Client">
            <Select
              placeholder="Choisir un client"
              value={clientId}
              onChange={setClientId}
              options={clients.map(cli => ({
                value: cli.id,
                label: `${cli.firstName} ${cli.lastName}`,
              }))}
            />
          </Form.Item>
          <Form.Item label="Date d'achat">
            <DatePicker
              style={{ width: '100%' }}
              onChange={val =>
                setDate(val ? val.toISOString().slice(0, 10) : null)
              }
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </Form>
        <Typography.Paragraph type="secondary">
          Sélectionnez un client et la date de l’achat avant d’enregistrer.
        </Typography.Paragraph>
      </Modal>
    </>
  )
}
