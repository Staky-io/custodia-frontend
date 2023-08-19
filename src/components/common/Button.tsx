import classNames from 'classnames'
import type { ButtonHTMLAttributes } from 'react'
import type { Size } from '~/components/common'
import { getSize } from '~/components/common'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'stroke' | 'text' | 'cancel';
    size?: Size;
    gap?: 'sm' | 'md' | 'lg';
    justify?: 'start' | 'center' | 'end';
}

export default function Button({ children, size, gap = 'md', justify = 'center', disabled = false, className, variant = 'primary', onClick }: ButtonProps) {
    return (
        <button
            className={classNames(
                className,
                getSize(size),
                'grid grid-flow-col items-center py-12 px-16 rounded font-semibold transition-all duration-200 select-none',
                {
                    'gap-2': gap === 'sm',
                    'gap-4': gap === 'md',
                    'gap-8': gap === 'lg',
                    'justify-start': justify === 'start',
                    'justify-center': justify === 'center',
                    'justify-end': justify === 'end',
                },
                disabled
                    ? 'bg-black-secondary text-disabled cursor-not-allowed'
                    : {
                        'bg-primary hover:bg-primary-dark text-grey': variant === 'primary',
                        'bg-black-tertiary hover:bg-black-quaternary text-primary': variant === 'secondary',
                        'bg-black-tertiary hover:bg-black-quaternary text-grey': variant === 'tertiary',
                        'border border-primary hover:border-primary-dark text-primary hover:text-primary-dark': variant === 'stroke',
                        'text-primary hover:text-primary-dark': variant === 'text',
                        'bg-black-tertiary hover:bg-black-quaternar text-error hover:text-error-dark': variant === 'cancel',
                    },
            )}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
