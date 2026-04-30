import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        clear: '',
        sm: 'h-9 rounded-full px-3 text-sm',
        default: 'h-12 px-4 py-3 rounded-full',
        lg: 'h-12 rounded-full px-8',
        icon: 'h-10 w-10',
      },
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-card hover:text-accent-foreground',
        link: 'text-primary hover:underline p-0 h-auto',
        outline: 'border border-border bg-background hover:bg-card hover:text-accent-foreground',

        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        primary: 'bg-primary text-white hover:bg-primary/80',
        accent: 'bg-accent text-white hover:bg-accent/80',

        'primary-outline': 'border border-primary text-primary bg-white hover:bg-primary/5',
        'secondary-outline': 'border border-secondary text-secondary bg-white hover:bg-secondary/5',
        'accent-outline': 'border border-accent text-accent bg-white hover:bg-accent/5',

        'primary-ghost': 'border border-primary text-primary bg-transparent hover:bg-primary/10',
        'secondary-ghost':
          'border border-secondary text-secondary bg-transparent hover:bg-secondary/10',
        'accent-ghost': 'border border-accent text-accent bg-transparent hover:bg-accent/10',

        'primary-inverse': 'border border-primary text-primary bg-white hover:bg-primary/10',
        'accent-inverse': 'border border-accent text-accent bg-white hover:bg-accent/10',
      },
    },
    defaultVariants: {
      size: 'sm',
      variant: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp ref={ref} className={cn(buttonVariants({ size, variant }), className)} {...props} />
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
