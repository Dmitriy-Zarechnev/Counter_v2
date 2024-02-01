import React from 'react'
import Button from '../button/Button'
import S from './Counter.module.css'

type CounterPropsType = {
    counter: number
    maxCount: number
    minCount: number
    changeCounter: () => void
    resetCounter: () => void
    setNewCounter: () => void
}

const Counter = (props: CounterPropsType) => {

    const textStyles = `${S.counter__display} 
                               ${props.counter === props.maxCount ? S.maxCount : ''}`

    return (
        <section className={S.counter}>
            <span className={textStyles}>
                {props.counter}
            </span>

            <div className={S.counter__btn_box}>
                <Button name={'INC'}
                        disabled={props.counter === props.maxCount}
                        onClick={props.changeCounter}
                />
                <Button name={'RESET'}
                        disabled={props.counter === props.minCount}
                        onClick={props.resetCounter}
                />
                <Button name={'SET'}
                        onClick={props.setNewCounter}
                />
            </div>
        </section>
    )
}

export default Counter