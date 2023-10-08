import { useRouter } from 'next/navigation'
import Button from '@/modules/common/button'
import { Order } from '@/lib/types'

interface Props {
  order: Order
}

export default function OrderCard({ order }: Props) {
  const router = useRouter()

  const formatCurrency = (value: number) => {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }

  return (
    <div className="border-black-700 my-4 flex flex-col items-start rounded-md border bg-white p-4 shadow-md lg:flex-row lg:items-center lg:justify-between">
      <div className="border-red items- flex h-full w-full flex-col justify-between lg:flex-row lg:items-center">
        <h1 className="text-xl font-bold">Order #{order.id}</h1>

        <div className="my-4 flex-col text-right lg:mx-8 lg:my-0 ">
          <h3 className="text-lg">Items</h3>
          <p className="text-md text-gray-500">{order.products.length}</p>
        </div>
        <div className="my-4 flex-col text-right lg:mx-8 lg:my-0 ">
          <h3 className="text-lg">Total</h3>
          <p className="text-md text-gray-500">
            ${formatCurrency(order.total)}
          </p>
        </div>
      </div>

      <div className="my-4 flex w-full flex-row lg:w-3/12">
        <Button
          className="mx-4"
          variant="primary"
          onClick={() => router.push(`/order/${order.id}/pay`)}
        >
          Pay
        </Button>
        <Button
          variant="secondary"
          onClick={() => router.push(`/order/${order.id}`)}
        >
          View
        </Button>
      </div>
    </div>
  )
}
