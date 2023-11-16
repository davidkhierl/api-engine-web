import { Construction } from 'lucide-react'

export function WorkInProgress() {
  return (
    <section className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center">
        <Construction />
        <h3 className="text-center">Work in progress</h3>
      </div>
    </section>
  )
}
