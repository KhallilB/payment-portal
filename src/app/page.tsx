import OrderListTemplate from '@/modules/orders/templates/orderListTemplate'

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl">My Orders</h1>
      <OrderListTemplate />
    </div>
  )
}
