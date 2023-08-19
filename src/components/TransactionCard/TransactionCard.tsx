import classNames from 'classnames'
import { HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react'
import type { Transaction } from '.'
import { IconCircleCheck, IconChevronDown, IconCopy, IconMember, IconCirclePlus, IconSettings, IconShare, IconDot, IconCircle } from '../icons'
import { Button, getSize } from '../common'
import ReactTimeago from 'react-timeago'
import { sliceAddress } from '~/helpers'

type TransactionCardProps = HTMLAttributes<HTMLDivElement> & Transaction

export default function TransactionCard({ className, txId, createdAt, title, confirmationCount, confirmationRemaining, owner, address, custodiaTxHash }: TransactionCardProps) {
    const [isSmooth, setIsSmooth] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [containerHeight, setContainerHeight] = useState(0)
    const headerRef = useRef<HTMLDivElement>(null)
    const bodyRef = useRef<HTMLDivElement>(null)
    const isPending = useMemo<boolean>(() => confirmationRemaining > 0, [confirmationRemaining])

    useEffect(() => {
        setIsSmooth(true)
        setContainerHeight(isOpen ? (headerRef.current?.clientHeight ?? 0) + (bodyRef.current?.clientHeight ?? 0) : (headerRef.current?.clientHeight ?? 0))
    }, [isOpen, headerRef, bodyRef, txId])

    useEffect(() => {
        setIsSmooth(false)
        setIsOpen(false)
    }, [txId])

    return (
        <div className={classNames(className, 'rounded-[0.5rem] overflow-hidden transition-height', { 'duration-400': isSmooth })} style={{ ...containerHeight && { height: `${containerHeight}px` } }}>
            <div ref={headerRef} className='grid gap-10 grid-flow-col items-center justify-between p-20 cursor-pointer bg-black-secondary' onClick={() => { setIsOpen((currentIsOpen) => !currentIsOpen) }}>
                <div className='grid gap-10 grid-flow-col items-center'>
                    <span className={classNames(getSize('smaller'), 'text-grey-tertiary')}>{txId}</span>
                    <button className='flex items-center justify-center w-20 h-20' onClick={(event) => { event.stopPropagation() }}>
                        <IconSettings />
                    </button>
                    <span className={classNames(getSize('smaller'), 'text-grey')}>{title}</span>
                    <span className={classNames(getSize('smaller'), 'text-grey-secondary')}>
                        <ReactTimeago date={createdAt} />
                    </span>
                </div>
                <div className='grid gap-10 grid-flow-col items-center'>
                    {isPending && (
                        <>
                            <Button variant='primary' size='smaller' onClick={(event) => { event.stopPropagation() }}>Execute</Button>
                            <Button variant='cancel' size='smaller' onClick={(event) => { event.stopPropagation() }}>Replace</Button>
                        </>
                    )}
                    <div className='grid gap-4 grid-flow-col items-center'>
                        <IconMember />
                        <span className={classNames(getSize('smaller'), 'text-grey-secondary')}>{confirmationCount} out of {confirmationCount + confirmationRemaining}</span>
                    </div>
                    {isPending
                        ? <span className={classNames(getSize('smaller'), 'text-error')}>Awaiting execution</span>
                        : <span className={classNames(getSize('smaller'), 'text-success')}>Success</span>
                    }
                    <IconChevronDown className={classNames('origin-center transform transition-transform duration-100', isOpen ? 'rotate-180' : 'rotate-0' )} />
                </div>
            </div>
            <div ref={bodyRef} className='grid gap-10 grid-cols-2 items-center p-20 bg-black-quaternary'>
                <div className='grid gap-10'>
                    <div className={classNames(getSize('smaller'), 'text-grey font-semibold')}>
                        Add owner:{' '}
                        <span className='text-grey-secondary font-normal'>{owner}</span>
                    </div>
                    <div className='grid gap-10 grid-flow-col items-center justify-start'>
                        <div className={classNames(getSize('smaller'), 'text-grey font-semibold')}>
                        Address:{' '}
                            <span className='text-grey-secondary font-normal'>{sliceAddress(address)}</span>
                        </div>
                        <button className='inline-flex items-center justify-center w-20 h-20'>
                            <IconCopy />
                        </button>
                        <button className='inline-flex items-center justify-center w-20 h-20'>
                            <IconShare />
                        </button>
                    </div>
                    <div className={classNames(getSize('smaller'), 'text-grey font-semibold')}>
                        Required confirmation for new transaction:{' '}
                        <span className='text-grey-secondary font-normal'>{confirmationRemaining}</span>
                    </div>
                    <div className='grid gap-10 grid-flow-col items-center justify-start'>
                        <div className={classNames(getSize('smaller'), 'text-grey font-semibold')}>
                        CustiodiaTxHash:{' '}
                            <span className='text-grey-secondary font-normal'>{sliceAddress(custodiaTxHash)}</span>
                        </div>
                        <button className='inline-flex items-center justify-center w-20 h-20'>
                            <IconCopy />
                        </button>
                        <button className='inline-flex items-center justify-center w-20 h-20'>
                            <IconShare />
                        </button>
                    </div>
                    <div className={classNames(getSize('smaller'), 'text-grey font-semibold')}>
                        Created at:{' '}
                        <span className='text-grey-secondary font-normal'>{createdAt.toLocaleString()}</span>
                    </div>
                </div>
                <div className='grid gap-10 p-20 bg-black-secondary rounded-[0.5rem]'>
                    <div className={classNames(getSize('smaller'), 'grid gap-10 grid-flow-col items-center justify-start text-grey font-semibold')}>
                        <IconCirclePlus fill='currentColor' className='text-primary' />
                        Created
                    </div>
                    <div className={classNames(getSize('smaller'), 'grid gap-10 grid-flow-col items-center justify-start text-grey font-semibold')}>
                        <IconCircleCheck fill='currentColor' className='text-primary' />
                        Confirmation
                        <span className='text-grey-tertiary'>{confirmationCount} out of {confirmationCount + confirmationRemaining}</span>
                    </div>
                    <div className={classNames(getSize('smaller'), 'grid gap-10 grid-flow-col items-center justify-start text-grey font-semibold')}>
                        <IconCircleCheck fill='currentColor' className='text-primary' />
                        Address
                        <span className='text-grey-secondary'>{owner}</span>
                        <span className='text-grey-tertiary'>{sliceAddress(address)}</span>
                        <button className='inline-flex items-center justify-center w-20 h-20'>
                            <IconCopy />
                        </button>
                        <button className='inline-flex items-center justify-center w-20 h-20'>
                            <IconShare />
                        </button>
                    </div>
                    <div className={classNames(getSize('smaller'), 'grid gap-10 grid-flow-col items-center justify-start text-primary font-semibold')}>
                        <IconDot fill='currentColor' className='text-primary' />
                        Hide all
                    </div>
                    <div className={classNames(getSize('smaller'), 'grid gap-10 grid-flow-col items-center justify-start text-grey font-semibold')}>
                        <IconCircle fill='currentColor' className='text-primary' />
                        Can be executed
                    </div>
                </div>
            </div>
        </div>
    )
}
