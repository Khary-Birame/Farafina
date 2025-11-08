import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-[#D4AF37] focus-visible:ring-[#D4AF37]/20 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-[100px] w-full rounded-lg border bg-background px-4 py-3 text-base shadow-sm transition-all duration-200 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none',
        'hover:border-[#D4AF37]/50',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
