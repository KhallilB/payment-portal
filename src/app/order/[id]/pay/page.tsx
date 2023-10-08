interface Props {
    params: {
      id: string
    }
  }
  
  export default function PayOrder({ params }: Props) {
    return (
      <div className="container mx-auto p-6">
        <h1>Pay Order {params.id}</h1>
      </div>
    )
  }
  