import classNames from 'classnames'
import type { HTMLAttributes } from 'react'
import { getSize } from '.'
import { IconCopy, IconDelete, IconEdit, IconShare } from '../icons'
import { sliceAddress } from '~/helpers'

type AddressProps = HTMLAttributes<HTMLDivElement> & {
    address: string;
}

export default function Address({ className, address }: AddressProps) {
    return (
        <div className={classNames(
            className,
            getSize('smaller'),
            'grid gap-4 grid-cols-[1fr_auto] items-center p-10 bg-black-tertiary border border-solid border-black-quaternary rounded-[0.5rem] text-grey-tertiary',
        )}>
            <div className='grid gap-4 grid-flow-col items-center justify-start'>
                <span>{sliceAddress(address)}</span>
                <button><IconCopy /></button>
                <button><IconShare /></button>
            </div>
            <div className='grid gap-4 grid-flow-col items-center justify-start'>
                <button><IconEdit /></button>
                <button><IconDelete /></button>
            </div>
        </div>
    )
}
