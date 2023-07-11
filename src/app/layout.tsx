import './globals.css'
import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import localFont from 'next/font/local'

const sora = Sora({
    weight: ['400', '500', '600'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-sora'
})

const fractul = localFont({
    variable: '--font-fractul',
    src: [
        {
            path: './assets/fonts/Fractul/Fractul-SemiBold.ttf',
            weight: '500',
            style: 'normal'
        },
        {
            path: './assets/fonts/Fractul/Fractul-Bold.ttf',
            weight: '600',
            style: 'normal'
        }
    ]
})

export const metadata: Metadata = {
    title: 'Custodia',
    description: 'Custodia is a multisig wallet built for the ICON blockchain.'
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${sora.variable} ${fractul.variable} font-sans bg-black text-grey`}>{children}</body>
        </html>
    )
}

// bold, semibold
