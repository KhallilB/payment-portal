import PayOrderTemplate from '@/modules/orders/templates/payOrderTemplate'

interface Props {
  params: {
    id: string
  }
}

export default function PayOrder({ params }: Props) {
  return (
    <div className="container mx-auto p-6">
      <PayOrderTemplate params={params} />
    </div>
  )
}
