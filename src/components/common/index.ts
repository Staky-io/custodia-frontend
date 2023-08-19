export type Size = 'regular' | 'small' | 'smaller'

export const getSize = (size?: Size) => {
    switch (size) {
        case 'smaller':
            return 'text-12'
        case 'small':
            return 'text-14'
        case 'regular':
        default:
            return 'text-16'
    }
}

export { default as Button } from './Button'
export { default as Card } from './Card'
export { default as Container } from './Container'
export { default as Dropdown } from './Dropdown'
export { default as Heading } from './Heading'
export { default as Input } from './Input'
export { default as Text } from './Text'
