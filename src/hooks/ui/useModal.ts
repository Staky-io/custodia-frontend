import React from 'react'
import { ModalRefType } from '~/components/common/Modal'

export default function useModal(modalRef: React.RefObject<ModalRefType>) {
    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.open()
        }
    }

    const closeModal = () => {
        if (modalRef.current) {
            modalRef.current.close()
        }
    }

    return [openModal, closeModal]
}
