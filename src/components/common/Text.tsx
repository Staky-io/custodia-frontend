import classNames from 'classnames'
import type { Size } from '~/components/common'
import { getSize } from '~/components/common'

type TextProps = {
    children: React.ReactNode;
    size?: Size;
    className?: string;
}

export default function Text({ children, size, className }: TextProps) {
    return <p className={classNames(className, getSize(size))}>{children}</p>
}
