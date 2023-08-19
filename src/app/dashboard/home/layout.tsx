'use client'

import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import type { Transaction } from '~/components/TransactionCard'
import { TransactionCard } from '~/components/TransactionCard'
import { Heading, Tabs, getSize } from '~/components/common'
import { IconList } from '~/components/icons'

type TransactionsByDate = { [key in string]: Transaction[] }

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const pathName = usePathname()

    useEffect(() => {
        async function fetchTransaction(): Promise<Transaction[]> {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([
                        { txId: 6, createdAt: new Date(1533187969057), title: 'Add owner', confirmationCount: 1, confirmationRemaining: 2, owner: 'Aymeric', address: 'hx13b3265eec0ab7cd5ba22d62af0beed577349ec6', custodiaTxHash: 'hx075abaa0e0f47083e4326f67a75bf015599b6daf' },
                        { txId: 45, createdAt: new Date(1533204793049), title: 'Balanced Swap', confirmationCount: 0, confirmationRemaining: 3, owner: 'Lucas', address: 'hxd5758d045051a1ceaf74e6bfc2cdbc5c39563ca0', custodiaTxHash: 'hx4cfe8a8ea5ab2303610afd77dcacb4e21f35b4be' },
                        { txId: 30, createdAt: new Date(1562147530452), title: 'Add owner', confirmationCount: 4, confirmationRemaining: 0, owner: 'Alain', address: 'hx242ae44f6d22b47c082907f3a83cea29ac836114', custodiaTxHash: 'hx3b729139c5d755e3bf4c52fff8ddcb48f8003fa8' },
                        { txId: 7, createdAt: new Date(1562648972148), title: 'Add owner', confirmationCount: 0, confirmationRemaining: 1, owner: 'Ambroise', address: 'hx6812bd6cd580fbd432c1da300b37c4e252e2a385', custodiaTxHash: 'hx8efcd113a2b6cc658f58d22075402220dd42d36d' },
                        { txId: 14, createdAt: new Date(1612889589738), title: 'bnUSD Transfer', confirmationCount: 2, confirmationRemaining: 7, owner: 'Tristan', address: 'hx4d4048627a828262af45711285fba3e5c7b1ecc3', custodiaTxHash: 'hx0abab2137f1c62155a8df2624281b52a8f8b90c2' },
                        { txId: 22, createdAt: new Date(1640960735524), title: 'Add owner with treshold', confirmationCount: 1, confirmationRemaining: 0, owner: 'Nathan', address: 'hxa7325feca568beaf83210720b61d3693cf061619', custodiaTxHash: 'hxcebd14d5e779603fe991b0ed7301538e8ecef5a5' },
                    ])
                }, 1000)
            })
        }
        fetchTransaction().then((transactions) => { setTransactions(transactions) })
    })

    const currentTransactions = useMemo(() => {
        let filteredTransations: Transaction[] = transactions
        switch (pathName) {
            case '/dashboard/home/queue':
                filteredTransations = transactions.filter(({ confirmationRemaining }) => confirmationRemaining > 0)
                break
            case '/dashboard/home/history':
                filteredTransations = transactions.filter(({ confirmationRemaining }) => confirmationRemaining === 0)
                break
        }
        return filteredTransations.reduce<TransactionsByDate>((accu, curr) => {
            const dateString = new Date(curr.createdAt).toLocaleDateString()
            return { ...accu, [dateString]: [...accu[dateString] ? accu[dateString] : [], curr] }
        }, {})
    }, [transactions, pathName])

    return (
        <div className="grid gap-32 grid-rows-[auto_1fr] h-full">
            <div className="grid gap-10">
                <div className='grid gap-4'>
                    <Heading level={6}>Transaction</Heading>
                    <p className={classNames(getSize('small'), 'text-grey-secondary')}>All your transactions</p>
                </div>
                <Tabs tabs={[
                    { name: 'Queue', href: '/dashboard/home/queue' },
                    { name: 'History', href: '/dashboard/home/history' },
                ]} />
            </div>
            <div className='grid overflow-hidden'>
                {!Object.keys(currentTransactions).length
                    ? (
                        <div className='grid gap-20 justify-items-center content-center w-full mx-auto max-w-512 pb-320 text-center'>
                            <span className='flex items-center justify-center w-32 h-32 bg-primary bg-opacity-20 rounded-[0.5rem]'>
                                <IconList fill='currentColor' className='text-primary' />
                            </span>
                            <span className={classNames(getSize('smaller'), 'text-grey-secondary')}>
                                {children}
                            </span>
                        </div>
                    ) : (
                        <div className='grid gap-20 content-start pb-20 overflow-auto'>
                            {Object.entries(currentTransactions).map(([dateString, transactionsInDate], i) => (
                                <div key={i} className='grid gap-16'>
                                    <span className={classNames(getSize('smaller'), 'text-grey-secondary')}>{dateString}</span>
                                    <div className='grid gap-4'>
                                        {transactionsInDate.map((transaction, j) => <TransactionCard key={`${i}-${j}`} {...transaction} />)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}
