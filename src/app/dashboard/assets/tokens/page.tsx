'use client'

import classNames from 'classnames'
import React, { useState } from 'react'
import { Button, getSize } from '~/components/common'
import { CurrencyICX, CurrencyiETH, IconInfo, IconSend } from '~/components/icons'
import { sliceAddress } from '~/helpers'

const currencies: {
    [k in string]: { name: string; logo: React.JSX.Element }
} = {
    icx: { name: 'ICX', logo: <CurrencyICX /> },
    ieth: { name: 'iETH', logo: <CurrencyiETH /> },
}

export default function AssetsTokens() {
    const [assets] = useState<{
        currency: typeof currencies[string];
        address?: string;
        balance: number;
        usd: number;
    }[]>([
        { currency: currencies['icx'], balance: 3_340_230.21, usd: 500_310 },
        { currency: currencies['ieth'], address: 'cx8944ae1668c428585e5a5cc8f6016006f624631a', balance: 234.23, usd: 351_000 },
    ])

    return (
        <table className="grid content-start rounded-[0.5rem] mb-20 overflow-hidden">
            <thead className="grid bg-black-secondary text-grey-secondary text-left">
                <tr className="grid grid-cols-4 px-10 py-20">
                    <th className="px-10 font-normal">Asset</th>
                    <th className="px-10 font-normal">Balance</th>
                    <th className="px-10 font-normal">USD value</th>
                </tr>
            </thead>
            <tbody className="grid overflow-auto bg-black-quaternary rounded-b-[0.5rem]">
                {assets.map(({ currency, address, balance, usd }, i) => (
                    <tr className={classNames('grid grid-cols-4 items-center px-10 py-32', getSize('smaller'))} key={i}>
                        <td className="grid gap-6 grid-flow-col items-center justify-start px-10">
                            {currency.logo}
                            <div className='grid gap-4 text-grey font-normal'>
                                {currency.name}
                                {address && <span className='font-semibold text-primary'>{sliceAddress(address)}</span>}
                            </div>
                        </td>
                        <td className="px-10">
                            {balance.toLocaleString('en-US')} <span className='text-grey-secondary'>{currency.name}</span>
                        </td>
                        <td className="grid gap-4 grid-flow-col items-center justify-start px-10">
                            <div>{usd.toLocaleString('en-US')} <span className='text-grey-secondary'>USD</span></div>
                            <IconInfo />
                        </td>
                        <td className="flex justify-end px-10">
                            <Button variant='primary' size='smaller'>
                                <IconSend fill='currentColor' />
                                Send
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
