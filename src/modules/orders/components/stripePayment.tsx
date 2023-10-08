import { useState } from 'react'
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from '@stripe/react-stripe-js'
import { StripeError } from '@stripe/stripe-js'

import Loading from '@/modules/common/loading'
import Button from '@/modules/common/button'

import getStripe from '@/lib/util/load-stripe'

export function PaymentForm({ total }: { total: number }) {
  const [paymentType, setPaymentType] = useState<string>('')
  const [payment, setPayment] = useState<{
    status: 'initial' | 'processing' | 'error'
  }>({ status: 'initial' })
  const [errorMessage, setErrorMessage] = useState<string>('')

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault()
      console.log('submitting payment')
    } catch (err) {
      const { message } = err as StripeError

      setPayment({ status: 'error' })
      setErrorMessage(message ?? 'An unknown error occurred')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {!stripe || !elements ? (
          <div className="my-8 flex h-12 w-full items-center">
            <Loading />
          </div>
        ) : (
          <>
            <input type="hidden" name="amount" value={total} />
            <PaymentElement />
            <Button type="submit" className="mt-4" variant="primary">
              Pay
            </Button>
          </>
        )}
      </form>
    </>
  )
}

export default function StripePayment({
  total,
}: {
  total: number
}): JSX.Element {
  return (
    <Elements
      stripe={getStripe()}
      options={{
        appearance: {
          variables: {
            colorIcon: '#6772e5',
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
          },
        },
        currency: 'usd',
        mode: 'payment',
        payment_method_types: ['card', 'us_bank_account'],
        amount: total,
      }}
    >
      <PaymentForm total={total} />
    </Elements>
  )
}
