import React from 'react'
import Button from '../button/Button'
import S from './Counter.module.css'
import {ErrorType} from '../../App'

type CounterPropsType = {
    counter: number
    maxCount: number
    minCount: number
    changeCounter: () => void
    resetCounter: () => void
    onInputFocus: boolean
    error: ErrorType
}

const Counter = (props: CounterPropsType) => {

    const isCounterError = Object.values(props.error).some(error => error);

    const textStyles = `${S.counter__display} 
                               ${props.onInputFocus && S.onInputFocus}
                               ${props.counter === props.maxCount ? S.maxCount : ''}
                               ${isCounterError && S.error}
                               `
    const textValue =
        isCounterError
            ? 'Incorrect value🤬'
            : props.onInputFocus
                ? 'enter values and press \'SET\''
                : props.counter

    return (
        <section className={S.counter}>
            <span className={textStyles}>
                {textValue}
            </span>

            <div className={S.counter__btn_box}>
                <Button name={'INC'}
                        disabled={props.counter === props.maxCount || props.onInputFocus || isCounterError}
                        onClick={props.changeCounter}
                />
                <Button name={'RESET'}
                        disabled={props.counter === props.minCount || props.onInputFocus || isCounterError}
                        onClick={props.resetCounter}/>
            </div>
        </section>
    )
}

export default Counter