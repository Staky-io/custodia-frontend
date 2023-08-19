'use client'

import { useState } from 'react'
import { NFTCard } from '~/components/common'

export default function AssetsNFTs() {
    const [nfts] = useState([
        { title: 'Neo Unigiraffe', tokenId: 4648, image: 'https://source.unsplash.com/random/320x320/' },
        { title: 'Neo Unigiraffe', tokenId: 4483, image: 'https://source.unsplash.com/random/320x320/' },
        { title: 'Neo Unigiraffe', tokenId: 7891, image: 'https://source.unsplash.com/random/320x320/' },
        { title: 'Neo Unigiraffe', tokenId: 1287, image: 'https://source.unsplash.com/random/320x320/' },
        { title: 'Neo Unigiraffe', tokenId: 8904, image: 'https://source.unsplash.com/random/320x320/' },
        { title: 'Neo Unigiraffe', tokenId: 7410, image: 'https://source.unsplash.com/random/320x320/' },
        { title: 'Neo Unigiraffe', tokenId: 6104, image: 'https://source.unsplash.com/random/320x320/' },
        { title: 'Neo Unigiraffe', tokenId: 2444, image: 'https://source.unsplash.com/random/320x320/' },
    ])

    return (
        <div className='grid gap-40 m:grid-cols-2 l:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6'>
            {nfts.map((nft, i) => <NFTCard key={i} {...nft} />)}
        </div>
    )
}
