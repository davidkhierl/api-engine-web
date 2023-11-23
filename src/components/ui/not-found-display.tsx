import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Frown } from 'lucide-react'

export interface NotFoundDisplayProps {
  title?: string
}

function NotFoundDisplay({ title }: NotFoundDisplayProps) {
  return (
    <Alert className="[&>svg~*]:pl-10">
      <Frown />
      <AlertTitle>404 Not Found</AlertTitle>
      <AlertDescription>Could not find requested resource</AlertDescription>
    </Alert>
  )
}

export { NotFoundDisplay }
