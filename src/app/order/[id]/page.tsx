import OrderDetailsTemplate from '@/modules/orders/templates/orderDetailsTemplate'

interface Props {
  params: {
    id: string
  }
}

export default function Order({ params }: Props) {
  return <OrderDetailsTemplate params={params} />
}
