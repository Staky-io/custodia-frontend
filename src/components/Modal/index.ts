export { useModal } from '~/hooks/ui'

export { default as Modal } from './Modal'
export { default as ModalSlider } from './ModalSlider'

export type ModalSliderRefType = {
    previous: () => void;
    next: () => void;
    reset: () => void;
    refreshHeight: () => void;
    getCurrentIndex: () => number;
}

export type ModalRefType = {
    open: () => void;
    close: () => void;
}
