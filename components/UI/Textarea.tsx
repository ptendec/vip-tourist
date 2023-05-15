import clsx from 'clsx'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'textarea'> {
  label?: string
  error?: string
  className?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, className, ...rest }: Props, ref) => {
    return (
      <label
        className={clsx(
          'mb-2 inline-block font-semibold text-sm text-lightDark w-full',
          className,
        )}
      >
        <span className='mb-1 inline-block'>{label}</span>
        <textarea
          ref={ref}
          className='block border-gray border bg-white py-3 px-5 w-full self-center rounded-lg outline-0 placeholder:text-sm text-sm font-normal'
          {...rest}
        />
        {error ? <span className='text-red !text-sm'>{error}</span> : ''}
      </label>
    )
  },
)

Textarea.displayName = 'Textarea'
