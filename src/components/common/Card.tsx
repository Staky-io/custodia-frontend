import classNames from 'classnames'
import type { HTMLAttributes } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    background?: 'black' | 'black-secondary';
    size?: 'lg' | 'sm';
}

export default function Card({ children, className, background, size }: CardProps) {
    return (
        <div className={classNames(
            className,
            'w-full p-20 rounded-15 bg-black border-1 border-black-quaternary',
            {
                'bg-black': background === 'black',
                'bg-black-secondary': background === 'black-secondary',
                's:w-[560px]': size === 'lg',
                'xs:w-[370px]': size === 'sm',
            }
        )}>
            {children}
        </div>
    )
}
