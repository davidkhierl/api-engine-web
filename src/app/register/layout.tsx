import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register to API Engine',
}

export default function RegisterLayout({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}
