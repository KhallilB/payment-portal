'use client'
import { useState } from 'react'

import PaymentTab from '@/modules/orders/components/paymentTab'
import StripePayment from '@/modules/orders/components/stripePayment'
import CheckPayment from '@/modules/orders/components/checkPayment'
import WirePayment from '@/modules/orders/components/wirePayment'

import { Orders } from '@/lib/config/index'

interface Props {
  params: {
    id: string
  }
}

export default function PayOrderTemplate({ params }: Props) {
  const [selected, setSelected] = useState('stripe')
  const [order, setOrder] = useState(Orders.find((o) => o.id === params.id))

  return (
    <div className="container mx-auto p-6">
      <h1>Pay Order {params.id}</h1>
      <div>
        <h2>PaymentType</h2>
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
        {selected === 'stripe' && <StripePayment total={order?.total!} id={order?.id!} />}
        {selected === 'wire-transfer' && <WirePayment />}
        {selected === 'check' && <CheckPayment />}
      </div>
    </div>
  )
}
