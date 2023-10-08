export type Order = {
  id: string
  total: number
  products: Product[]
}

export type Product = {
  id: string
  name: string
  price: number
  quantity: number
}
