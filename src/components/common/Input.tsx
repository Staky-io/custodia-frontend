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

export default function Input({ className, label, value, type, disabled, placeholder, size = 'regular', onChange, error }: InputProps) {
    const [isInputFocused, setIsInputFocused] = useState(false)

    return (
        <div className={classNames(className, 'relative h-auto')}>
            {error && <span className={`text-error mt-4 ${getSize(size)}`}>{error}</span>}
            {label && <label className={classNames(
                'absolute select-none pointer-events-none origin-left left-16 transition-all duration-250 text-grey-secondary mb-4',
                getSize(size),
                isInputFocused || (value && value?.length > 0)
                    ? 'translate-y-0 scale-75 top-0'
                    : {
                        'translate-y-1/2 scale-100 top-2': size === 'regular' || size === 'small',
                        'translate-y-1/2 scale-100 top-4': size === 'smaller',
                    },
            )}>{placeholder}</label>}
            <input
                className={classNames(
                    disabled
                        ? 'placeholder:text-grey-secondary bg-disabled text-grey-secondary cursor-not-allowed user-select-none py-12 px-16 rounded'
                        : [
                            'border transition-all duration-200 bg-black-secondary hover:bg-black-quaternary px-16 rounded text-grey placeholder:text-grey-secondary outline-none',
                            label && (isInputFocused || (value && value?.length > 0)) ? 'pt-16 pb-8' : 'pt-12 pb-12',
                            error ? 'border-error' : 'border-black-quaternary focus:border-primary',
                        ],
                    getSize(size),
                )}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder={label ? undefined : placeholder}
                type={type}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                disabled={disabled}
            />
        </div>
    )
}
