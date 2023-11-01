import { Construction } from 'lucide-react'

export default function KeychainPage() {
  return (
    <div className="flex h-full flex-col gap-4">
      <h1 className="text-4xl font-bold">Keychains</h1>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center">
          <Construction />
          <h3 className="text-center">Work in progress</h3>
        </div>
      </div>
    </div>
  )
}
