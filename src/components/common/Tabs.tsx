import classNames from 'classnames'
import Link, { LinkProps } from 'next/link'
import { useRef, type HTMLAttributes, useEffect, useState } from 'react'
import { getSize } from '.'
import { usePathname } from 'next/navigation'

type HeadingProps = HTMLAttributes<HTMLDivElement> & {
    tabs: Array<{ name: string, href: LinkProps['href'] }>
}

export default function Tabs({ className, tabs }: HeadingProps) {
    const pathname = usePathname()
    const links = useRef<(HTMLAnchorElement | never)[]>([])
    const [barStyle, setBarStyle] = useState<{ translateX: number, scaleX: number }>({ translateX: 0, scaleX: 0 })

    useEffect(() => {
        const currentTabIndex = tabs.findIndex(({ href }) => pathname.slice(0, String(href).length) === href)
        if (currentTabIndex >= 0) {
            const currentLink = links.current[currentTabIndex]
            setBarStyle({ translateX: currentLink.offsetLeft, scaleX: currentLink.offsetWidth })
        }
    }, [links, pathname, tabs])

    return (
        <div className={classNames(className, 'relative grid grid-flow-col justify-start')}>
            {tabs.map(({ name, href }, i) => (
                <Link
                    key={i}
                    href={href}
                    ref={(element) => { if (element) links.current[i] = element }}
                    replace
                    className={classNames(
                        getSize('smaller'),
                        'px-16 py-12 font-semibold text-grey-secondary transition-color duration-100 hover:text-primary',
                        { 'text-primary': pathname === href },
                    )}>
                    {name}
                </Link>
            ))}
            <div
                className='absolute bottom-0 left-0 w-1 h-2 bg-primary origin-left transition-transform duration-200 will-change-transform'
                style={{ transform: `translateX(${barStyle.translateX}px) scaleX(${barStyle.scaleX})` }}
            />
        </div>
    )
}
