import { Order } from '@/lib/types'

export const Orders: Order[] = [
  {
    id: '1',
    total: 100.0,
    products: [
      {
        id: '1',
        name: 'Product 1',
        price: 10.0,
        quantity: 6,
      },
      {
        id: '2',
        name: 'Product 2',
        price: 20.0,
        quantity: 2,
      },
    ],
    paid: 'paid',
  },
  {
    id: '2',
    total: 200.0,
    products: [
      {
        id: '3',
        name: 'Product 3',
        price: 20.0,
        quantity: 2,
      },
      {
        id: '4',
        name: 'Product 4',
        price: 40.0,
        quantity: 4,
      },
    ],
    paid: 'unpaid',
  },
  {
    id: '3',
    total: 300.0,
    products: [
      {
        id: '5',
        name: 'Product 5',
        price: 30.0,
        quantity: 2,
      },
      {
        id: '6',
        name: 'Product 6',
        price: 60.0,
        quantity: 4,
      },
    ],
    paid: 'unpaid',
  },
]

export const payOrder = (id: string) => {
  const order = Orders.find((order) => order.id === id)
  if (order) {
    order.paid = 'paid'
  }
}

export const processOrder = (id: string) => {
  const order = Orders.find((order) => order.id === id)
  if (order) {
    order.paid = 'processing'
  }
}
