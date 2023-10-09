'use client'
import OrderCard from '@/modules/orders/components/orderCard'
import { Orders } from '@/lib/config/orders'

export default function OrderList() {
  return (
    <>
      {Orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </>
  )
}
