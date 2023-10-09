import Navbar from '@/modules/layout/components/navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">{children}</div>
    </div>
  )
}
