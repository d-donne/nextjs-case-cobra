import { cn } from '@/lib/utils'
import React from 'react'

type MWWProps = {
  className?: string
  children: React.ReactNode
}

const MaxWidthWrapper = ({className, children}: MWWProps) => {
  return (
    <div className={cn("w-full h-full max-w-screen-xl mx-auto px-2.5 md:px-20", className)}>
      {children}
    </div>
  ) 
}

export default MaxWidthWrapper