import React, { useState, useEffect, useRef } from 'react'
import type { HTMLAttributes } from 'react'
import type { Size } from '~/components/common'
import { getSize } from '~/components/common'
import { IconChevron } from '../icons'
import { useClickOutside } from '~/hooks/ui'
import classNames from 'classnames'

type DropdownOption = {
    label: string;
    value: string | number;
}

type DropdownProps = HTMLAttributes<HTMLDivElement> & {
    options: DropdownOption[];
    placeholder?: string;
    selected?: string | number;
    label?: boolean;
    value?: string;
    size?: Size;
    onChange?: (value: string | number) => void;
}

export default function Dropdown(props: DropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [selected, setSelected] = useState<DropdownOption | undefined>(undefined)
    const [isOpen, setIsOpen] = useState(false)

    const applyChoice = (option: DropdownOption) => {
        if (props.onChange) {
            props.onChange(String(option.value))
        }

        setSelected(props.options.find(item => item.value === option.value))
    }

    useClickOutside(dropdownRef, () => setIsOpen(false))

    useEffect(() => {
        if (props.selected) {
            setSelected(props.options.find(item => item.value === props.selected))
        }
    }, [props.selected, props.options])

    return (
        <div
            ref={dropdownRef}
            className={classNames(props.className, 'relative select-none')}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className={classNames(
                getSize(props.size),
                'flex flex-row items-center justify-between',
                'w-full cursor-pointer transition-all duration-200 bg-black-secondary hover:bg-black-quaternary pt-12 pb-12 px-16',
                'text-grey placeholder:text-grey-secondary outline-none border border-black-quaternary focus:border-primary',
                props.label ? 'pt-16 pb-8' : 'pt-12 pb-12',
                isOpen ? 'rounded-b-0 rounded-t' : 'rounded',
            )}>
                {props.label && <label className={`absolute select-none pointer-events-none origin-left left-16 text-grey-secondary mb-4 translate-y-0 scale-75 top-0 ${getSize(props.size)}`}>{props.placeholder}</label>}
                {selected ? selected.label : (props.placeholder || 'Select an option')}
                <IconChevron className={classNames('transition-transform duration-200', { 'rotate-180': isOpen })} />
            </div>

            {isOpen && (
                <div className='absolute top-full left-0 w-full bg-white rounded shadow-lg'>
                    {props.options.filter((item) => item.value !== selected?.value).map((item, index) => (
                        <div
                            key={item.value}
                            className={classNames(
                                'px-16 py-12 cursor-pointer bg-black-secondary border-b border-x border-black-quaternary hover:bg-black-quaternary',
                                { 'rounded-b': index === props.options.filter((item) => item.value !== selected?.value).length - 1 },
                            )}
                            onClick={() => {
                                applyChoice(item)
                                setIsOpen(false)
                            }}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
