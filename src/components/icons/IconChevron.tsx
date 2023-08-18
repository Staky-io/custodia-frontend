import type { IconProps } from '~/components/icons'

export default function IconChevron(props: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="20"
            height="20"
            fill="#637592"
            {...props}
        >
            <path d="M10 13L5 8.05155L6.0625 7L10 10.8969L13.9375 7L15 8.05155L10 13Z" />
        </svg>
    )
}
