import { forwardRef } from "react"
import { cn } from "../../lib/utils"

const Button = forwardRef(({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                {
                    "bg-primary text-white hover:bg-primary-dark shadow-sm": variant === "primary",
                    "bg-navy text-white hover:bg-navy-light shadow-sm": variant === "secondary",
                    "border border-slate-200 bg-transparent hover:bg-slate-50 text-navy": variant === "outline",
                    "bg-transparent hover:bg-slate-50 text-navy": variant === "ghost",
                    "h-9 px-4 py-2 text-sm": size === "sm",
                    "h-11 px-6 py-3 text-base": size === "md",
                    "h-12 px-8 py-4 text-lg": size === "lg",
                },
                className
            )}
            {...props}
        />
    )
})
Button.displayName = "Button"

export { Button }
