import OrderCard from '@/modules/orders/components/orderCard'
import { Orders } from '@/lib/config'

export default function OrderList() {
  return (
    <>
      {Orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </>
  )
}
