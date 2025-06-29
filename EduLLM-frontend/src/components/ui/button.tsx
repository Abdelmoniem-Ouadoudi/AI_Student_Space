import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/30 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground shadow-2xl hover:shadow-3xl hover:shadow-primary/25 hover:scale-105 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
        destructive:
          "bg-gradient-to-br from-destructive via-red-500 to-destructive text-white shadow-2xl hover:shadow-3xl hover:shadow-destructive/25 hover:scale-105 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
        outline:
          "border-2 border-primary/40 bg-background/80 backdrop-blur-xl shadow-xl hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 active:scale-95 dark:bg-background/60 dark:border-primary/30 dark:hover:bg-primary transition-all duration-500",
        secondary:
          "bg-gradient-to-br from-secondary via-secondary/80 to-secondary text-secondary-foreground shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 backdrop-blur-sm border border-secondary/20",
        ghost:
          "hover:bg-accent/60 hover:text-accent-foreground backdrop-blur-sm hover:shadow-lg hover:scale-105 active:scale-95 dark:hover:bg-accent/40 transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline hover:text-accent transition-colors duration-300",
        glass:
          "bg-white/5 backdrop-blur-2xl border border-white/10 text-foreground shadow-2xl hover:bg-white/10 hover:shadow-3xl hover:scale-105 active:scale-95 dark:bg-black/5 dark:border-white/5 dark:hover:bg-black/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-1000",
        gradient:
          "bg-gradient-to-r from-primary via-accent to-success text-white shadow-2xl hover:shadow-3xl hover:shadow-primary/30 hover:scale-110 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-accent before:via-primary before:to-success before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 relative z-10",
      },
      size: {
        default: "h-12 px-8 py-3 text-base has-[>svg]:px-6",
        sm: "h-10 rounded-xl gap-1.5 px-6 has-[>svg]:px-4 text-sm",
        lg: "h-14 rounded-3xl px-10 has-[>svg]:px-8 text-lg",
        icon: "size-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
