import classNames from 'classnames'
import type { HTMLAttributes } from 'react'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
}

export default function Container({ children, className }: ContainerProps) {
    return <div className={classNames(className, 'container mx-auto px-20')}>{children}</div>
}
