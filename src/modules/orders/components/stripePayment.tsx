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

export function PaymentForm({ total }: { total: number }) {
  const [paymentType, setPaymentType] = useState<string>('')
  const [payment, setPayment] = useState<{
    status: 'initial' | 'processing' | 'error' | 'success'
  }>({ status: 'initial' })
  const [loading, setLoading] = useState<boolean>(false)

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault()
      if (!e.currentTarget.reportValidity()) return
      console.log('submitting payment')
      setLoading(true)
      if (!elements || !stripe) return

      const { error: submitError } = await elements.submit()

      if (submitError) {
        setPayment({ status: 'error' })
        toast.error(submitError.message ?? 'An unknown error occurred')
        setLoading(false)
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
        .then((result) => {
          console.log('result', result.error)
          if (result.error) {
            setPayment({ status: 'error' })
            setLoading(false)
            toast.error(result.error.message ?? 'An unknown error occurred')
            return
          }
          toast.success('Payment successful')
          setLoading(false)
        })
        .catch((err) => {
          console.log('err', err)
          setLoading(false)
        })
    } catch (err) {
      const { message } = err as StripeError

      setPayment({ status: 'error' })
      toast.error(message ?? 'An unknown error occurred')
      setLoading(false)
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
