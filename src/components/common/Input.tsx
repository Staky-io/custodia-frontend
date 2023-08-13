import classNames from 'classnames'
import type { HTMLAttributes, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import { useState } from 'react'
import type { Size } from '~/components/common'
import { getSize } from '~/components/common'

type InputProps = HTMLAttributes<HTMLDivElement> & {
    label?: boolean;
    value?: Extract<InputHTMLAttributes<HTMLInputElement>['value'], string | readonly string[]>;
    type?: Extract<HTMLInputTypeAttribute, 'text' | 'password' | 'email' | 'number'>;
    disabled?: InputHTMLAttributes<HTMLInputElement>['disabled'];
    placeholder?: InputHTMLAttributes<HTMLInputElement>['placeholder'];
    size?: Size;
    onChange?: (value: string) => void;
    error?: string;
}

export default function Input(props: InputProps) {
    const [isInputFocused, setIsInputFocused] = useState(false)

    return (
        <div className={classNames(props.className, 'relative h-auto')}>
            {props.error && <span className={`text-error mt-4 ${getSize(props.size)}`}>{props.error}</span>}
            {props.label && <label className={classNames(
                'absolute select-none pointer-events-none origin-left left-16 transition-all duration-250 text-grey-secondary mb-4',
                getSize(props.size),
                isInputFocused || (props.value && props.value?.length > 0)
                    ? 'translate-y-0 scale-75 top-0'
                    : {
                        'translate-y-1/2 scale-100 top-2': props.size === 'regular' || props.size === 'small',
                        'translate-y-1/2 scale-100 top-4': props.size === 'smaller',
                    },
            )}>{props.placeholder}</label>}
            <input
                className={classNames(
                    props.disabled
                        ? 'placeholder:text-grey-secondary bg-disabled text-grey-secondary cursor-not-allowed user-select-none py-12 px-16 rounded'
                        : [
                            'border transition-all duration-200 bg-black-secondary hover:bg-black-quaternary px-16 rounded text-grey placeholder:text-grey-secondary outline-none',
                            props.label && (isInputFocused || (props.value && props.value?.length > 0)) ? 'pt-16 pb-8' : 'pt-12 pb-12',
                            props.error ? 'border-error' : 'border-black-quaternary focus:border-primary',
                        ],
                    getSize(props.size),
                )}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder={props.label ? undefined : props.placeholder}
                type={props.type}
                value={props.value}
                onChange={(e) => props.onChange && props.onChange(e.target.value)}
                disabled={props.disabled}
            />
        </div>
    )
}
