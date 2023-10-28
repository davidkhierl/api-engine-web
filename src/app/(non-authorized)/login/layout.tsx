import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'LOGIN to API Engine',
}

export default function LoginLayout({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}
