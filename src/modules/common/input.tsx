import clsx from 'clsx'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

export default function Input({ name, label, ...props }: Props) {
  return (
    <div className="my-4 flex flex-col">
      <label htmlFor={name} className="font-light text-gray-500">
        {label}
      </label>
      <input
        {...props}
        name={name}
        className={clsx(
          ' w-full rounded-md border border-gray-300 px-4 py-2 text-black shadow-sm transition-all hover:opacity-80',
          props.className,
          'bg-white'
        )}
      />
    </div>
  )
}
