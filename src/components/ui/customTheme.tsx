import { cn } from "@/lib/utils"
import { useState } from "react"

const HoverBorderGradient = ({
  children,
  className,
  containerClassName,
  ...props
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  return (
    <div className={cn("group relative rounded-md p-[1px] overflow-hidden", containerClassName)} {...props}>
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className={cn("relative rounded-[calc(0.5rem-1px)]", className)}>{children}</div>
    </div>
  )
}

function AnimatedGradientButton({
  children,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-md bg-gradient-to-r from-primary to-primary/70 px-4 py-2 text-white transition-all hover:shadow-lg",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 animate-shimmer" />
      <div className="relative z-10">{children}</div>
      
    </button>
  )
}

// BackgroundGradient Component
 const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  ...props
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const [hovering, setHovering] = useState(false)

  return (
    <div
      className={cn("relative group/bg-gradient", containerClassName)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-[inherit] bg-gradient-to-r from-primary to-primary/50 opacity-[0.15] blur-xl transition-all duration-300",
          hovering ? "opacity-[0.25] blur-xl" : "opacity-[0.15] blur-xl",
        )}
      />
      <div className={cn("relative", className)}>{children}</div>
    </div>
  )
}

export {
  HoverBorderGradient,
  AnimatedGradientButton,
  BackgroundGradient
}