'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import PaymentTab from '@/modules/orders/components/paymentTab'
import StripePayment from '@/modules/orders/components/stripePayment'
import CheckPayment from '@/modules/orders/components/checkPayment'
import WirePayment from '@/modules/orders/components/wirePayment'
import Button from '@/modules/common/button'

import { Orders } from '@/lib/config/orders'
import OrderDetails from '../components/orderDetails'

interface Props {
  params: {
    id: string
  }
}

export default function PayOrderTemplate({ params }: Props) {
  const [selected, setSelected] = useState('stripe')
  const [order, setOrder] = useState(Orders.find((o) => o.id === params.id))

  const router = useRouter()

  useEffect(() => {
    if (order?.paid === 'paid') {
      return router.replace('/')
    }
  }, [order])

  return (
    <div className="container mx-auto lg:w-9/12 lg:p-6">
      <div className="flex w-full flex-row items-center justify-between">
        <h2 className="text-2xl">Pay Order #{params.id}</h2>
        <div>
          <Button variant="secondary" onClick={() => router.back()}>
            Back
          </Button>
        </div>
      </div>

      <OrderDetails order={order!} />

      <div className="my-4">
        <h2 className="my-4 text-xl font-bold">Choose a payment type</h2>
        <div className="flex h-16 w-full flex-row justify-start">
          <PaymentTab
            variant="stripe"
            selected={selected === 'stripe' ? true : false}
            onClick={() => setSelected('stripe')}
            className="mr-4"
          />
          <PaymentTab
            variant="wire-transfer"
            selected={selected === 'wire-transfer' ? true : false}
            onClick={() => setSelected('wire-transfer')}
            className="mr-4"
          />
          <PaymentTab
            variant="check"
            selected={selected === 'check' ? true : false}
            onClick={() => setSelected('check')}
          />
        </div>
      </div>

      <div className="mt-4">
        {selected === 'stripe' && (
          <StripePayment total={order?.total!} id={order?.id!} />
        )}
        {selected === 'wire-transfer' && (
          <WirePayment total={order?.total!} id={order?.id!} />
        )}
        {selected === 'check' && (
          <CheckPayment total={order?.total!} id={order?.id!} />
        )}
      </div>
    </div>
  )
}
