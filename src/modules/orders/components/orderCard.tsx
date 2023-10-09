import { useRouter } from 'next/navigation'
import clsx from 'clsx'
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

  const formatStatus = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Paid'
      case 'unpaid':
        return 'Unpaid'
      case 'processing':
        return 'Processing'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="border-black-700 my-4 flex flex-col items-start rounded-md border bg-white p-4 shadow-md lg:flex-row lg:items-center lg:justify-between">
      <div className="border-red items- flex h-full w-full flex-col justify-between lg:flex-row lg:items-center">
        <h1 className="text-xl font-bold">Order #{order.id}</h1>

        <div className="my-4 flex-col text-right lg:mx-8 lg:my-0 ">
          <h3 className="text-lg">Items</h3>
          <p className="text-md text-gray-500">{order.products.length}</p>
        </div>
        <div className="my-4 flex-col text-center lg:mx-8 lg:my-0 ">
          <h3 className="text-lg">Status</h3>
          <p
            className={clsx('text-md rounded p-1 text-gray-500', {
              'bg-green-200 text-green-500': order.paid === 'paid',
              'bg-yellow-200 text-yellow-500': order.paid === 'processing',
              'bg-red-200 text-red-500': order.paid === 'unpaid',
            })}
          >
            {formatStatus(order.paid)}
          </p>
        </div>
        <div className="my-4 flex-col text-right lg:mx-8 lg:my-0 ">
          <h3 className="text-lg">Total</h3>
          <p className="text-md text-gray-500">
            ${formatCurrency(order.total)}
          </p>
        </div>
      </div>

      <div className="my-4 flex w-full flex-row lg:w-3/12">
        {order.paid === 'unpaid' && (
          <Button
            className="mx-4"
            variant="primary"
            onClick={() => router.push(`/order/${order.id}/pay`)}
          >
            Pay
          </Button>
        )}
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
