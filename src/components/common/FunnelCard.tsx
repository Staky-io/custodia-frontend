import classNames from 'classnames'
import type { HTMLAttributes } from 'react'

type FunnelCardProps = HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    size?: 'lg' | 'sm';
}

export default function FunnelCard({ children, className, size = 'sm' }: FunnelCardProps) {
    return (
        <div className={classNames(
            className,
            'w-full p-20 rounded-15 bg-black border-1 border-black-quaternary',
            {
                's:w-[560px]': size === 'lg',
                'xs:w-[370px]': size === 'sm',
            }
        )}>
            {children}
        </div>
    )
}
