'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import OrderDetails from '@/modules/orders/components/orderDetails'
import Button from '@/modules/common/button'

import { Orders } from '@/lib/config/orders'

interface Props {
  params: {
    id: string
  }
}

export default function OrderDetailsTemplate({ params }: Props) {
  const [order, setOrder] = useState(Orders.find((o) => o.id === params.id))

  const router = useRouter()

  return (
    <div className="container mx-auto w-9/12 p-6">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-bold">Order #{params.id}</h2>
        <div>
          <Button variant="secondary" onClick={() => router.back()}>
            Back
          </Button>
        </div>
      </div>

      <OrderDetails order={order!} />

      <div className='my-4'>
        <Button
          variant="primary"
          onClick={() => router.push(`/order/${params.id}/pay`)}
        >
          Pay
        </Button>
      </div>
    </div>
  )
}
