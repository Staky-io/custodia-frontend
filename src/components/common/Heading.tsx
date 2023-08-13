import type { HTMLAttributes } from 'react'

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
}

export default function Heading({ level = 1, children, className }: HeadingProps) {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements

    return <Tag className={className}>{children}</Tag>
}
