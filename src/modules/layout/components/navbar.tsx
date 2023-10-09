import Image from 'next/image'

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-12 py-4 shadow-lg">
      <h1 className="text-4xl font-bold">Payment Portal</h1>

      <div className="flex flex-row items-center">
        <Image
          src="/avatar.png"
          alt="user avatar"
          width={50}
          height={0}
          className="h-auto rounded-full bg-gray-950 p-1"
        />
        <h3 className="ml-4 hidden text-xl font-bold lg:block">John Doe</h3>
      </div>
    </div>
  )
}
