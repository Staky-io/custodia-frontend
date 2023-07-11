type TextProps = {
    children: React.ReactNode;
    size?: 'regular' | 'small' | 'smaller';
    className?: string;
}

export default function Text(props: TextProps) {
    const { children, size, className } = props

    const getClasses = () => {
        if (size === 'smaller') {
            return `smaller${className ? ' ' + className : ''}`
        } else if (size === 'small') {
            return `small${className ? ' ' + className : ''}`
        } else {
            return className
        }
    }

    return <p className={getClasses()}>{children}</p>
}
