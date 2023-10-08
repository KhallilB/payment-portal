import { Order } from '@/lib/types'

export const Orders: Order[] = [
  {
    id: '1',
    total: 100,
    products: [
      {
        id: '1',
        name: 'Product 1',
        price: 10,
        quantity: 6,
      },
      {
        id: '2',
        name: 'Product 2',
        price: 20,
        quantity: 2,
      },
    ],
  },
  {
    id: '2',
    total: 200,
    products: [
      {
        id: '3',
        name: 'Product 3',
        price: 20,
        quantity: 2,
      },
      {
        id: '4',
        name: 'Product 4',
        price: 40,
        quantity: 4,
      },
    ],
  },
]
