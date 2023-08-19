'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Login } from '~/components/Login'
import { Button, Container, Heading, getSize } from '~/components/common'
import { LogoCustodia } from '~/components/icons'

export default function App() {
    const overlayRef = useRef<HTMLDivElement>(null)
    const [canLogIn, setCanLogIn] = useState(false)
    const { push } = useRouter()

    const confirmLogin = () => {
        push('/dashboard/home')
    }

    const cancelLogin = () => {
        setCanLogIn(false)
    }

    const rejectLogin = () => {
        // TODO
    }

    return (
        <>
            <div className='w-screen-w h-screen-h from-primary to-black to-50%' style={{ background: 'radial-gradient(250% 500% at 50% -150%, var(--tw-gradient-stops))' }}>
                <Container className='grid gap-10 place-items-center place-content-center h-full text-center'>
                    <LogoCustodia width={50} height={50} />
                    <Heading level={3}>Welcome to Custodia</Heading>
                    <p className={`-mt-4 mb-20 text-grey-secondary font-sora ${getSize()}`}>The most trusted decentralized custody protocol and collective asset management platform.</p>
                    <Button variant="primary" onClick={() => { setCanLogIn(true) }}>Get started</Button>
                </Container>
            </div>
            {canLogIn && (
                <div ref={overlayRef} className='fixed top-0 left-0 flex items-center justify-center w-screen-w h-screen-h p-20 bg-black bg-opacity-60'>
                    <Login onConfirm={confirmLogin} onCancel={cancelLogin} onReject={rejectLogin} />
                </div>
            )}
        </>
    )
}
