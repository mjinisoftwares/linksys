import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'sm',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-12 px-4 py-3 rounded-full',
        icon: 'h-10 w-10',
        lg: 'h-12 rounded-full px-8',
        sm: 'h-9 rounded-full px-3 text-sm',
      },
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-card hover:text-accent-foreground',
        link: 'text-primary items-start justify-start hover:underline',
        outline: 'border border-border bg-background hover:bg-card hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 h-12 px-4 py-3',
        primary: 'bg-primary/90 text-white hover:bg-primary/80 h-12 px-4 py-3',
        accent: 'bg-accent text-white hover:bg-accent/80 h-12 px-4 py-3',
        'primary-outline':
          'border border-primary text-primary bg-white hover:bg-primary/5 h-12 px-4 py-3',
        'secondary-outline':
          'border border-secondary text-secondary bg-white hover:bg-secondary/5 h-12 px-4 py-3',
        'accent-outline':
          'border border-accent text-accent bg-white hover:bg-accent/5 h-12 px-4 py-3',
        'primary-ghost':
          'border border-primary text-primary bg-transparent hover:bg-primary/10 h-12 px-4 py-3',
        'secondary-ghost':
          'border border-secondary text-secondary bg-transparent hover:bg-secondary/10 h-12 px-3 py-3',
        'accent-ghost':
          'border border-accent text-accent bg-transparent hover:bg-accent/10 h-12 px-4 py-3',
        'primary-inverse':
          'border border-primary text-primary bg-white hover:bg-primary/10 h-12 px-4 py-3',
        'accent-inverse':
          'border border-accent text-accent bg-white hover:bg-accent/10 h-12 px-4 py-3',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />
}

export { Button, buttonVariants }
