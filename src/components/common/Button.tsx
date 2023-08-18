import classNames from 'classnames'
import type { ButtonHTMLAttributes } from 'react'
import type { Size } from '~/components/common'
import { getSize } from '~/components/common'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'stroke' | 'text' | 'cancel';
    size?: Size;
}

export default function Button({ children, size, disabled = false, className, variant = 'primary', onClick }: ButtonProps) {
    return (
        <button
            className={classNames(
                className,
                'py-12 px-16 rounded transition-all duration-200 select-none flex flex-row items-center justify-center',
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
            <span className={`font-semibold ${getSize(size)}`}>{children}</span>
        </button>
    )
}
