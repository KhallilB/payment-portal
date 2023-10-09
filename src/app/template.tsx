import DashboardLayout from '@/modules/layout/templates/dashboard'

export default function Template({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
