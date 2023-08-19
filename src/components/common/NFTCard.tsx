import classNames from 'classnames'
import type { HTMLAttributes } from 'react'
import { Button, getSize } from '.'

type NFTCardProps = HTMLAttributes<HTMLDivElement> & {
    title: string;
    tokenId: number;
    image: string;
}

export default function NFTCard({ className, title, tokenId, image }: NFTCardProps) {
    return (
        <div className={classNames(
            className,
            'grid rounded-[12px] overflow-hidden',
        )}>
            <img src={image} alt={title} className='aspect-square object-cover w-full' />
            <div className='grid gap-10 p-10 bg-black-secondary'>
                <div className='grid gap-4 grid-cols-[1fr_auto]'>
                    <p className={classNames(getSize('small'), 'text-grey')}>{title}</p>
                    <span className={classNames(getSize('small'), 'text-grey-secondary')}>#{tokenId}</span>
                </div>
                <Button variant='secondary' size='smaller'>Send</Button>
            </div>
        </div>
    )
}
