interface Props {
  params: {
    id: string
  }
}

export default function Order({ params }: Props) {
  return (
    <div className="container mx-auto p-6">
      <h1>Order {params.id}</h1>
    </div>
  )
}
