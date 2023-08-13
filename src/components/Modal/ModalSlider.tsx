import { Children, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { ModalSliderRefType } from '.'
import classNames from 'classnames'

type ModalSliderProps = {
    children: React.ReactNode | React.ReactNode[];
}

const ModalSlider = forwardRef<ModalSliderRefType, ModalSliderProps>(({ children }, globalRef) => {
    const [isReady, setIsReady] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [currentSlideHeight, setCurrentSlideHeight] = useState(0)
    const localRef = useRef<HTMLDivElement>(null)

    const previous = () => {
        if (children && currentSlide > 0) {
            setCurrentSlide(currentSlide - 1)
            setIsReady(true)
        }
    }

    const next = () => {
        if (children && currentSlide < Children.count(children) - 1) {
            setCurrentSlide(currentSlide + 1)
            setIsReady(true)
        }
    }

    const refreshHeight = () => {
        setCurrentSlideHeight(localRef.current?.children[currentSlide].clientHeight || 0)
    }

    const reset = () => {
        setCurrentSlide(0)
        setIsReady(false)
        refreshHeight()

        console.log('reset')
    }

    useEffect(() => {
        setCurrentSlideHeight(localRef.current?.children[currentSlide].clientHeight || 0)
    }, [currentSlide])

    useImperativeHandle(globalRef, () => ({
        previous,
        next,
        reset,
        refreshHeight,
        getCurrentIndex: () => currentSlide,
    }))

    return (
        <div
            ref={localRef}
            className={`relative w-full overflow-hidden transition-height ${isReady ? 'duration-200' : 'duration-0'}`}
            style={{ height: `${currentSlideHeight}px` }}
        >
            {Children.map(children, (child, index) => (
                <div
                    key={index}
                    className={classNames(
                        'w-full absolute left-0 top-0 transition-transform duration-250 justify-center',
                        currentSlide === index
                            ? 'translate-x-0'
                            : {
                                '-translate-x-full': currentSlide > index,
                                'translate-x-full': currentSlide < index,
                            })}
                >
                    {child}
                </div>
            ))}
        </div>
    )
})

ModalSlider.displayName = 'ModalSlider'

export default ModalSlider
