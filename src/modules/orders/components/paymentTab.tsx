import Image from 'next/image'
import clsx from 'clsx'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'stripe' | 'wire-transfer' | 'check'
  selected: boolean
}

export default function PaymentTab({ variant, selected, ...props }: Props) {
  let content

  switch (variant) {
    case 'stripe':
      content = (
        <Image
          src="/stripe.svg"
          width={0}
          height={0}
          alt="Stripe"
          className="h-full w-auto"
        />
      )
      break
    case 'wire-transfer':
      content = <h2 className="text-md text-center font-bold">Wire Transfer</h2>
      break
    case 'check':
      content = <h2 className="text-md text-center font-bold">Check</h2>
      break
    default:
      content = null
  }

  return (
    <div
      {...props}
      className={clsx(
        'flex w-1/4 cursor-pointer items-center justify-center rounded-md border border-gray-700 p-4 shadow-inner shadow-md transition-all',
        {
          'bg-gray-400 text-gray-100': selected,
          'bg-white': !selected,
        },
        props.className
      )}
    >
      {content}
    </div>
  )
}
