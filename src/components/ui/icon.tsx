'use client'

import * as AccessibleIconPrimitive from '@radix-ui/react-accessible-icon'
import * as React from 'react'

const Icon: React.FC<AccessibleIconPrimitive.AccessibleIconProps> = ({ children, label }) => {
  return <AccessibleIconPrimitive.Root label={label}>{children}</AccessibleIconPrimitive.Root>
}

export { Icon }
