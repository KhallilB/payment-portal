import OrderList from '@/modules/orders/templates/orderList'

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <h1>Home</h1>
      <OrderList />
    </div>
  )
}
