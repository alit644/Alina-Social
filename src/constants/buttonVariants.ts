import { cva, type VariantProps } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary-900)] hover:bg-[var(--primary-800)]  text-white shadow ",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive/60",
        outline:
          "border border-[var(--neutral-500)] bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        neutral: "bg-[var(--neutral-900)] dark:bg-[var(--neutral-50)] dark:text-[var(--neutral-50)] shadow-sm hover:bg-[var(--neutral-800)]/90",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        full: "w-full px-4 py-2",
        fit: "w-fit px-4 py-2",
        rounded: "h-9 px-5 py-2 rounded-full ",
        
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
