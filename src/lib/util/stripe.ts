import Stripe from 'stripe'

export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET as string,
  {
    apiVersion: '2023-08-16',
  }
)

export async function createPaymentIntent(
  data: FormData
): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: Number(data.get('amount') as string),
      payment_method_types: ['card', 'us_bank_account'],
      currency: 'usd',
    })

  return { client_secret: paymentIntent.client_secret as string }
}
