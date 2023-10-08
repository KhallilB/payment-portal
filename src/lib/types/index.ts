export type Order = {
  id: string
  total: number
  products: Product[]
  paid: 'paid' | 'unpaid' | 'processing'
}

export type Product = {
  id: string
  name: string
  price: number
  quantity: number
}
