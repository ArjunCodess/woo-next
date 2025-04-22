import React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

export function Container({ 
  className, 
  as: Component = "div", 
  children, 
  ...props 
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[90rem] px-4 md:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
} 