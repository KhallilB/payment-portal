import clsx from 'clsx'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant: 'primary' | 'secondary'
}

export default function Button({
  children,
  variant,
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={clsx(
        'w-full rounded-md px-4 py-2 text-white shadow-md transition-all hover:opacity-80',
        {
          'bg-blue-500': variant === 'primary',
          'bg-gray-500': variant === 'secondary',
        },
        className
      )}
    >
      {children}
    </button>
  )
}
