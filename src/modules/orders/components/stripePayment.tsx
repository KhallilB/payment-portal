import { useState } from 'react'
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from '@stripe/react-stripe-js'
import { StripeError } from '@stripe/stripe-js'
import { toast } from 'react-toastify'

import Loading from '@/modules/common/loading'
import Button from '@/modules/common/button'

import getStripe from '@/lib/util/load-stripe'
import { createPaymentIntent } from '@/lib/util/stripe'
import { get } from 'http'

export function PaymentForm({ amount, id }: { amount: number; id: string }) {
  const [paymentType, setPaymentType] = useState<string>('')
  const [payment, setPayment] = useState<{
    status: 'initial' | 'processing' | 'error' | 'success'
  }>({ status: 'initial' })
  const [loading, setLoading] = useState<boolean>(false)

  const stripe = useStripe()
  const elements = useElements()

  const handlePaymentError = (err: StripeError) => {
    const { message } = err
    setPayment({ status: 'error' })
    toast.error(message ?? 'An unknown error occurred')
    setLoading(false)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault()
      if (!e.currentTarget.reportValidity()) return
      console.log('submitting payment')
      setLoading(true)
      if (!elements || !stripe) return

      const { error: submitError } = await elements.submit()

      if (submitError) {
        handlePaymentError(submitError)
        return
      }

      const { client_secret: clientSecret } = await createPaymentIntent(
        new FormData(e.target as HTMLFormElement)
      )

      await stripe!
        .confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}`,
          },
          redirect: 'if_required',
        })
        .then(async (result) => {
          if (result.error) {
            handlePaymentError(result.error)
            return
          }
          setPayment({ status: 'success' })
          toast.success('Payment successful')
          setLoading(false)
        })
        .catch((err) => {
          handlePaymentError(err)
        })
    } catch (err) {
      handlePaymentError(err as StripeError)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} onChange={(e) => console.log(e)}>
        {!stripe || !elements ? (
          <div className="my-8 flex h-12 w-full items-center">
            <Loading />
          </div>
        ) : (
          <>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="amount" value={amount} />
            <input type="hidden" name="paymentType" value={paymentType} />
            <PaymentElement
              onChange={(e) => {
                setPaymentType(e.value.type)
              }}
            />
            <div className="my-8 flex h-12 w-full items-center">
              <Button
                type="submit"
                className="mt-4 h-full disabled:opacity-50"
                variant="primary"
                disabled={!stripe || !elements || loading}
              >
                {loading ? <Loading /> : 'Pay'}
              </Button>
            </div>
          </>
        )}
      </form>
    </>
  )
}

export default function StripePayment({
  total,
  id,
}: {
  total: number
  id: string
}): JSX.Element {
  const amount = total * 100
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
        amount,
      }}
    >
      <PaymentForm amount={amount} id={id} />
    </Elements>
  )
}
