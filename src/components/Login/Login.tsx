import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { Button, FunnelCard, Heading, getSize } from '~/components/common'
import { UtilSpinner, LogoHana, LogoLedger } from '~/components/icons'

type LoginProps = {
    onConfirm: () => void;
    onCancel: () => void;
    onReject: (error: unknown) => void;
}

type Wallet = {
    id: string;
    name: string;
    logo: JSX.Element;
}

const wallets: Wallet[] = [
    { id: 'hana', name: 'Hana', logo: <LogoHana /> },
    { id: 'ledger', name: 'Ledger', logo: <LogoLedger /> },
]

export default function Login({ onConfirm, onCancel, onReject }: LoginProps) {
    const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false)

    const updateSelectedWallet = (wallet: Wallet) => {
        if (!isLoggingIn) {
            { setSelectedWallet((currentSelectedWallet) => currentSelectedWallet?.id === wallet.id ? null : wallet) }
        }
    }

    const escFunction = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onCancel()
        }
    }, [onCancel])

    useEffect(() => {
        document.addEventListener('keydown', escFunction, false)

        return () => {
            document.removeEventListener('keydown', escFunction, false)
        }
    }, [escFunction])

    const login = async () => {
        if (!isLoggingIn) {
            try {
                setIsLoggingIn(true)

                // TODO: authentication
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true)
                    }, 1000)
                })

                onConfirm()
            } catch (error) {
                onReject(error)
            } finally {
                setIsLoggingIn(false)
            }
        }
    }

    return (
        <FunnelCard className='grid gap-20'>
            <div className='grid gap-4 text-center'>
                <Heading level={6}>Connect your wallet</Heading>
                <span className={`${getSize('small')} text-grey-secondary`}>Choose a wallet to access Custodia</span>
            </div>
            <div className='grid p-10 rounded-[8px] bg-black-secondary'>
                {wallets.map((wallet, i) => (
                    <button
                        key={i}
                        className={classNames(
                            'grid gap-10 grid-cols-[auto_1fr_auto] items-center h-40 p-10 text-left rounded-[6px] bg-black-tertiary bg-opacity-0 transition-background duration-100',
                            { 'bg-opacity-100': selectedWallet?.id === wallet.id },
                            isLoggingIn ? 'cursor-not-allowed' : 'hover:bg-opacity-50',
                        )}
                        onClick={() => { updateSelectedWallet(wallet) }}
                    >
                        {wallet.logo}
                        <span className={classNames(getSize('small'), 'text-grey-secondary')}>{wallet.name}</span>
                        <div className={classNames(
                            'relative flex items-center justify-center w-20 h-20',
                            'before:content-[""] before:absolute before:w-[14px] before:h-[14px] before:rounded-[3px] before:border before:border-grey-secondary before:transition-border before:duration-100',
                            'after:content-[""] after:absolute after:w-[8px] after:h-[8px] after:rounded-[1px] after:bg-primary after:bg-opacity-0 after:transition-background after:duration-100',
                            { 'before:border-primary after:bg-opacity-100': selectedWallet?.id === wallet.id },
                        )} />
                    </button>
                ))}
            </div>
            <Button variant="primary" disabled={!selectedWallet} onClick={login} className={classNames({ 'cursor-not-allowed': isLoggingIn })}>
                <span className='grid gap-8 grid-flow-col items-center'>Connect wallet {isLoggingIn && <UtilSpinner className='text-grey' />}</span>
            </Button>
        </FunnelCard>
    )
}
