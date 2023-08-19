'use client'

import classNames from 'classnames'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { Button, Container, getSize } from '~/components/common'
import { IconArrowRight, IconHome, IconMember, IconAssets, IconTransaction, LogoCustodia, IconChevronDown, LogoHana } from '~/components/icons'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const navigation: { name: string, href: LinkProps['href'], icon: React.JSX.Element }[] = [
        { name: 'Home', href: '/dashboard/home', icon: <IconHome /> },
        { name: 'Assets', href: '/dashboard/assets', icon: <IconAssets /> },
        { name: 'Members', href: '/dashboard/members', icon: <IconMember /> },
    ]

    const pathname = usePathname()

    return (
        <div className="grid grid-cols-[auto_1fr] h-screen-h">
            <aside className='grid grid-rows-[1fr_auto] bg-black-secondary border-r-1 border-solid border-black-tertiary'>
                <div className='grid gap-60 grid-rows-[auto_1fr_auto] pt-32 px-24 pb-56'>
                    <div className='grid gap-4 grid-flow-col items-center justify-center'>
                        <LogoCustodia width={24} height={24} />
                        <span className={classNames(getSize('small'), 'text-grey font-fractul font-semibold')}>Custodia</span>
                    </div>
                    <nav>
                        <ul className='grid gap-4'>
                            {navigation.map(({ name, href, icon }, i) => (
                                <li key={i}>
                                    <Link
                                        href={href}
                                        className={classNames(
                                            'grid gap-8 grid-flow-col items-center justify-start py-12 px-16 rounded text-primary font-semibold select-none transition-background duration-200 hover:bg-black-quaternary',
                                            getSize(),
                                            { 'bg-black-quaternary': pathname.slice(0, String(href).length) === href },
                                        )}
                                    >
                                        {icon}
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <Button variant="primary" size="smaller" justify="start">
                        <IconTransaction fill='currentColor' />
                        Create transaction
                    </Button>
                </div>
                <div className="grid gap-10 grid-cols-[1fr_auto] items-center p-10 border-t-1 border-solid border-black-tertiary">
                    <div className={classNames(getSize('small'), 'text-grey font-semibold')}>
                    0,00 <span className="text-primary">USD</span>
                    </div>
                    <button className='flex items-center justify-center w-20 h-20'>
                        <IconArrowRight />
                    </button>
                </div>
            </aside>
            <div className='grid gap-32 grid-rows-[auto_1fr] max-h-screen-h'>
                <header className='bg-black-secondary border-b-1 border-solid border-black-tertiary'>
                    <Container className='grid gap-10 grid-flow-col justify-end py-16'>
                        <Button variant="tertiary" size="smaller" justify="start">
                            cxc226...d7a5896
                            <IconChevronDown />
                        </Button>
                        <Button variant="tertiary" size="smaller" justify="start">
                            <LogoHana />
                            <div><span className='text-primary'>Hana</span> hxc226...d7a5896</div>
                            <IconChevronDown />
                        </Button>
                    </Container>
                </header>
                <Container className='overflow-hidden'>
                    {children}
                </Container>
            </div>
        </div>
    )
}
