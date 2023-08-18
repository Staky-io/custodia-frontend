import type { IconProps } from '~/components/icons'

export default function IconSpinner({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="20"
            height="20"
            fill="none"
            {...props}
            className={`${className} animate-[spin_2s_linear_infinite]`}
        >
            <circle className="animate-[dash_1.5s_ease-in-out_infinite]" cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="square" />
        </svg>
    )
}
