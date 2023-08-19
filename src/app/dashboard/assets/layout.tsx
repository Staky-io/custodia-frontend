'use client'

import classNames from 'classnames'
import { Button, Heading, Tabs, getSize } from '~/components/common'
import { IconUpload } from '~/components/icons'

export default function AssetsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid gap-32 grid-rows-[auto_1fr] h-full">
            <div className="grid gap-10">
                <div className='grid gap-4'>
                    <Heading level={6}>Transaction</Heading>
                    <p className={classNames(getSize('small'), 'text-grey-secondary')}>All your transactions</p>
                </div>
                <div className='grid gap-10 grid-cols-[1fr_auto] items-center'>
                    <Tabs tabs={[
                        { name: 'Tokens', href: '/dashboard/assets/tokens' },
                        { name: 'NFTs', href: '/dashboard/assets/nfts' },
                    ]} />
                    <Button variant="primary" size="smaller" justify="start">
                        <IconUpload fill='currentColor' />
                        Import token
                    </Button>
                </div>
            </div>
            <div className='grid overflow-hidden'>{children}</div>
        </div>
    )
}
