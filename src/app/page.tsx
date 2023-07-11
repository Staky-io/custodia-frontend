'use client'

import { Button, Heading, Text } from '~/components/common'

export default function Home() {
    return (
        <main>
            <Text>Hello world</Text>
            <Heading>Heading 1</Heading>
            <Heading level={2}>Heading 2</Heading>
            <Heading level={3}>Heading 3</Heading>
            <Heading level={4}>Heading 4</Heading>
            <Heading level={5}>Heading 5</Heading>
            <Heading level={6}>Heading 6</Heading>
            <Button
                variant="primary"
                onClick={() => console.log('hello')}
            >Button</Button>
        </main>
    )
}
