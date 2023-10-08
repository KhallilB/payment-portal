import { Order } from '@/lib/types'

interface Props {
  order: Order
}

export default function OrderCard({ order }: Props) {
  return (
    <div className="rounded-md bg-white p-4 shadow-md">
      <h1 className="text-xl font-bold">{order.id}</h1>
      <p className="text-gray-500">{order.total}</p>
    </div>
  )
}
