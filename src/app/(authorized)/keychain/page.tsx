'use client'

import { Button } from '@/components/ui/button'
import { apiEngine } from '@/services/api-engine'

export default function KeychainPage() {
  const handleOnClick = async () => {
    const keychains = await apiEngine.getAllKeychains()
    console.log(keychains)
  }

  return <Button onClick={handleOnClick}>Get Keychains</Button>
}
