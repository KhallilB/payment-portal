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

export type Account = {
  id: string
  name: string
  accountNumber: string
  balance: number
  transactions: Transaction[]
}

export type Transaction = {
  id: string
  amount: number
  method: 'wire' | 'check'
  timestamp: number
}

export type Check = {
  id: string
  checkNumber: string
  accountNumber: string
  amount: number
}
