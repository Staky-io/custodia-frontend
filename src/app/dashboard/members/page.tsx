'use client'

import classNames from 'classnames'
import { useState } from 'react'
import { Address, Button, Card, Heading, getSize } from '~/components/common'
import { IconPlus } from '~/components/icons'

export default function Members() {
    const [addresses] = useState<string[]>([
        'hx7cb0a8a4b506a392924e4fe93060fd313dde87f6',
        'hxa227b42b28f80d1487aab9d1c653615c0e2c328e',
    ])

    return (
        <div className="grid gap-20 w-full max-w-576 mx-auto my-24">
            <div className="grid gap-4">
                <Heading level={6}>Manage Custodia account owners</Heading>
                <p className={classNames(getSize('small'), 'text-grey-secondary')}>add, remove and replace or rename existing owners. Owner names are only stored locally and will never be shared with us or any third parties.</p>
            </div>
            <Card className='grid gap-20' background='black-secondary'>
                <p className={classNames(getSize(), 'text-grey')}>Members</p>
                <div className='grid gap-4'>
                    {addresses.map((address, i) => <Address address={address} key={i} />)}
                </div>
                <Button variant='secondary' size='small' gap='lg'>
                    <IconPlus />
                    Add new member
                </Button>
            </Card>
            <Card className='grid gap-20' background='black-secondary'>
                <div className='grid gap-10'>
                    <p className={classNames(getSize(), 'text-grey')}>Any transaction requires the confirmation of:</p>
                    <p className={classNames(getSize('smaller'), 'text-warning')}>Required confirmation</p>
                </div>
                <div className={classNames(getSize('small'), 'text-grey-secondary')}>
                    <span className='text-grey'>2</span> out of <span className='text-grey'>4</span> owners.
                </div>
                <Button size='small'>Change</Button>
            </Card>
        </div>
    )
}
