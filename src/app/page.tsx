'use client'

import { useState, useRef } from 'react'
import { Button, Dropdown, Heading, Input, Text } from '~/components/common'
import Modal, { ModalRefType } from '~/components/common/Modal'
import { useModal } from '~/hooks/ui'

export default function Home() {
    const [inputValue, setInputValue] = useState('')
    const [inputValue2, setInputValue2] = useState('')
    const modalRef = useRef<ModalRefType>(null)
    const [openModal] = useModal(modalRef)

    return (
        <main>
            <Text>Hello world</Text>
            <Heading>Heading 1</Heading>
            <Heading level={2}>Heading 2</Heading>
            <Heading level={3}>Heading 3</Heading>
            <Heading level={4}>Heading 4</Heading>
            <Heading level={5}>Heading 5</Heading>
            <Heading level={6}>Heading 6</Heading>

            <div className='flex flex-row mt-128'>
                <Button variant="primary" className='mr-10'>Button primary</Button>
                <Button variant="secondary" className='mr-10'>Button secondary</Button>
                <Button variant="tertiary" onClick={openModal}>Open modal</Button>
            </div>

            <Input
                value={inputValue}
                label={false}
                placeholder='Classic placeholder'
                className='mt-60'
                onChange={(value) => setInputValue(value)}
            />
            <Input
                value={inputValue2}
                label={true}
                placeholder='Placeholder with label'
                className='mt-10'
                onChange={(value) => setInputValue2(value)}
            />

            <Dropdown
                className='mt-10 w-448'
                placeholder='Select an option'
                options={[
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                    { label: 'Option 3', value: '3' }
                ]}
                onChange={(value) => console.log(value)}
            />

            <Modal
                ref={modalRef}
                title='Modal title'
                subtitle='Modal subtitle'
                closable={true}
                onOpen={() => console.log('Modal opened')}
                onClose={() => console.log('Modal closed')}
            >
                This is a cool modal !!
            </Modal>
        </main>
    )
}
