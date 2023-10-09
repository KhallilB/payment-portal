import { Disclosure, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Order } from '@/lib/types'

export default function OrderDetails({ order }: { order: Order }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }
  return (
    <div className="my-8 flex flex-col justify-start">
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between rounded bg-blue-200 p-2">
              <h3>Prouducts</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#000000"
                viewBox="0 0 16 16"
                className={clsx('mt-1 transform transition-transform', {
                  'rotate-90': open,
                })}
              >
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Disclosure.Panel className="px-2 py-6">
                {order.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-row justify-between border-b-2 border-gray-200 py-2"
                  >
                    <div className="flex flex-col">
                      <span className="text-md py-2 font-bold text-gray-500">
                        {product.name}
                      </span>
                      <div className="flex flex-col">
                        <span className="mr-2 text-gray-950">Price:</span>
                        <span>{formatPrice(product.price)}</span>
                      </div>
                    </div>
                    <div>
                      <span className="mr-2 text-gray-950">Quantity:</span>
                      <span>{product.quantity}</span>
                    </div>
                  </div>
                ))}

                <div className="flex flex-row items-center justify-between py-2">
                  <span className="py-2 text-xl font-bold text-gray-950">
                    Total
                  </span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  )
}
