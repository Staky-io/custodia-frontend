import classNames from 'classnames'
import type { HTMLAttributes } from 'react'
import type { Size } from '~/components/common'
import { getSize } from '~/components/common'

type TextProps = HTMLAttributes<HTMLParagraphElement> & {
    children: React.ReactNode;
    size?: Size;
}

export default function Text({ children, size, className }: TextProps) {
    return <p className={classNames(className, getSize(size))}>{children}</p>
}
