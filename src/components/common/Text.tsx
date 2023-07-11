import { useEffect, useState } from 'react'

type TextProps = {
    children: React.ReactNode;
    small?: boolean;
    className?: string;
}

export default function Text(props: TextProps) {
    const [classNameString, setClassNameString] = useState<string | undefined>(undefined)
    const { children, small, className } = props

    useEffect(() => {
        const classNameArray = className?.length ? className?.split(' ') : []

        if (small) {
            classNameArray?.push('small')
        }

        if (classNameArray?.length > 0) {
            setClassNameString(classNameArray?.join(' '))
        } else {
            setClassNameString(undefined)
        }
    }, [small, className])

    return <p className={classNameString}>{children}</p>
}
