import OrderCard from '@/modules/orders/components/orderCard'
import { Orders } from '@/lib/config'

export default function OrderList() {
  return (
    <div>
      <h1>OrderList</h1>
      {Orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}
