import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to API Engine',
}

export default function LoginLayout({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}
